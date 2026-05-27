import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiter (per IP, resets on cold start)
const ipMap = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || now > entry.reset) {
    ipMap.set(ip, { count: 1, reset: now + windowMs });
    return false;
  }
  if (entry.count >= max) return true;
  entry.count++;
  return false;
}

// Clean stale entries every ~5 min
let lastClean = Date.now();
function maybeClean() {
  if (Date.now() - lastClean > 300_000) {
    const now = Date.now();
    for (const [k, v] of ipMap) {
      if (now > v.reset) ipMap.delete(k);
    }
    lastClean = Date.now();
  }
}

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(self)",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};

export function middleware(req: NextRequest) {
  maybeClean();

  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  // Stricter rate limit on API routes
  const isApi = req.nextUrl.pathname.startsWith("/api/");
  const maxReq = isApi ? 20 : 100;
  const window = isApi ? 60_000 : 60_000;

  if (isRateLimited(ip, maxReq, window)) {
    return new NextResponse(
      JSON.stringify({ error: "Too Many Requests. Попробуй позже." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
          ...SECURITY_HEADERS,
        },
      }
    );
  }

  // Block obviously malicious paths
  const path = req.nextUrl.pathname;
  const blockedPaths = [
    /\.\.(\/|\\)/,           // Path traversal
    /\.(php|asp|aspx|jsp)$/i, // Server-side script extensions
    /<script/i,               // XSS in URL
    /union.*select/i,         // SQL injection patterns
    /eval\(/i,
    /base64_decode/i,
    /\x00/,                   // Null bytes
  ];

  for (const pattern of blockedPaths) {
    if (pattern.test(path)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  const response = NextResponse.next();

  // Apply all security headers
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  // Remove server fingerprint headers
  response.headers.delete("X-Powered-By");
  response.headers.set("Server", "Vexium");

  return response;
}

export const config = {
  matcher: [
    // Apply to all routes except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
