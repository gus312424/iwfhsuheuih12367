// Утилиты безопасности Vexium

import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiter (для продакшена использовать Redis/Upstash)
const ipRequestMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(
  ip: string,
  maxRequests = 10,
  windowMs = 60_000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry || now > entry.resetTime) {
    ipRequestMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count };
}

// Очистка старых записей раз в 5 минут
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of ipRequestMap.entries()) {
    if (now > value.resetTime) ipRequestMap.delete(key);
  }
}, 300_000);

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    "unknown"
  );
}

// Санитизация строк — убирает HTML-теги и опасные символы
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>'"`;]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim()
    .slice(0, 500);
}

// Валидация Minecraft-ника
export function validateMinecraftUsername(username: string): {
  valid: boolean;
  error?: string;
} {
  const cleaned = username.trim();
  if (!cleaned) return { valid: false, error: "Введите ник игрока" };
  if (cleaned.length < 3 || cleaned.length > 16)
    return { valid: false, error: "Ник должен быть от 3 до 16 символов" };
  if (!/^[a-zA-Z0-9_]+$/.test(cleaned))
    return { valid: false, error: "Ник может содержать только буквы, цифры и _" };
  return { valid: true };
}

// Генерация CSRF-токена
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  }
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Заголовки безопасности
export function getSecurityHeaders(): Record<string, string> {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
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
}

export function createSecureResponse(data: unknown, status = 200): NextResponse {
  const response = NextResponse.json(data, { status });
  const headers = getSecurityHeaders();
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }
  return response;
}
