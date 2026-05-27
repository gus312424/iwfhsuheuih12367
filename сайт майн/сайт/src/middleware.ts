import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiter (для продакшена — Redis/Upstash)
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

// Заголовки безопасности
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

// Паттерны для блокировки вредоносных запросов
const BLOCKED_PATTERNS = [
  /\.\.(\/|\\)/,             // Path traversal
  /\.(php|asp|aspx|jsp)$/i,  // Серверные скрипты
  /<script/i,                // XSS в URL
  /union.*select/i,          // SQL injection
  /eval\(/i,
  /base64_decode/i,
  /\x00/,                    // Null bytes
  /\/etc\/passwd/i,          // LFI попытки
  /\/wp-admin/i,             // WordPress сканнеры
  /\/\.env/i,                // .env файлы
];

export function middleware(req: NextRequest) {
  maybeClean();

  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  // Строгий rate limit для API, мягче для страниц
  const isApi = req.nextUrl.pathname.startsWith("/api/");
  const maxReq = isApi ? 20 : 150;
  const windowMs = 60_000;

  if (isRateLimited(ip, maxReq, windowMs)) {
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

  // Блокировка вредоносных путей
  const path = req.nextUrl.pathname;
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(path)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  // Блокировка слишком больших User-Agent (боты)
  const ua = req.headers.get("user-agent") || "";
  if (ua.length > 500) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const response = NextResponse.next();

  // Применяем заголовки безопасности
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  // Убираем отпечатки сервера
  response.headers.delete("X-Powered-By");
  response.headers.set("Server", "Vexium");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
