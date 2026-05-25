import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import {
  rateLimit,
  getClientIp,
  sanitizeInput,
  validateMinecraftUsername,
  createSecureResponse,
} from "@/lib/security";
import { RANKS, DONATE_CASES, DONATE_CURRENCY } from "@/lib/shop-data";

// Valid item IDs lookup
const VALID_RANK_IDS = new Set(RANKS.map((r) => r.id));
const VALID_CASE_IDS = new Set(DONATE_CASES.map((c) => c.id));
const VALID_CURRENCY_IDS = new Set(DONATE_CURRENCY.map((d) => d.id));
const VALID_PAY_METHODS = new Set(["card", "sbp", "qiwi", "yoomoney"]);

// In-memory order store — replace with DB (Postgres/Supabase/etc.) in production
const orders = new Map<string, object>();

interface OrderItem {
  id: string;
  type: "rank" | "case" | "currency";
  name: string;
  price: number;
  quantity: number;
}

function lookupPrice(id: string, type: string): number | null {
  if (type === "rank") return RANKS.find((r) => r.id === id)?.price ?? null;
  if (type === "case") return DONATE_CASES.find((c) => c.id === id)?.price ?? null;
  if (type === "currency") return DONATE_CURRENCY.find((d) => d.id === id)?.price ?? null;
  return null;
}

export async function POST(req: NextRequest) {
  // Per-IP rate limit: 10 orders per minute
  const ip = getClientIp(req);
  const rl = rateLimit(ip, 10, 60_000);
  if (!rl.allowed) {
    return createSecureResponse(
      { error: "Слишком много запросов. Подожди минуту." },
      429
    );
  }

  // Content-type check
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    return createSecureResponse({ error: "Неверный Content-Type" }, 415);
  }

  // Body size guard (~16 KB max)
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 16_384) {
    return createSecureResponse({ error: "Запрос слишком большой" }, 413);
  }

  let body: {
    username?: unknown;
    items?: unknown;
    total?: unknown;
    paymentMethod?: unknown;
  };

  try {
    body = await req.json();
  } catch {
    return createSecureResponse({ error: "Неверный JSON" }, 400);
  }

  // ── Validate username ─────────────────────────────────────────────────────
  if (typeof body.username !== "string") {
    return createSecureResponse({ error: "Ник обязателен" }, 400);
  }
  const usernameRaw = sanitizeInput(body.username);
  const { valid: usernameValid, error: usernameError } =
    validateMinecraftUsername(usernameRaw);
  if (!usernameValid) {
    return createSecureResponse({ error: usernameError }, 400);
  }

  // ── Validate payment method ───────────────────────────────────────────────
  if (
    typeof body.paymentMethod !== "string" ||
    !VALID_PAY_METHODS.has(body.paymentMethod)
  ) {
    return createSecureResponse({ error: "Неверный способ оплаты" }, 400);
  }

  // ── Validate items ────────────────────────────────────────────────────────
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return createSecureResponse({ error: "Корзина пуста" }, 400);
  }
  if (body.items.length > 20) {
    return createSecureResponse({ error: "Слишком много товаров" }, 400);
  }

  const validatedItems: OrderItem[] = [];
  let serverTotal = 0;

  for (const rawItem of body.items) {
    if (typeof rawItem !== "object" || rawItem === null) {
      return createSecureResponse({ error: "Неверный товар" }, 400);
    }
    const item = rawItem as Record<string, unknown>;

    const id = typeof item.id === "string" ? sanitizeInput(item.id) : null;
    const type = item.type as string;
    const quantity =
      typeof item.quantity === "number"
        ? Math.floor(item.quantity)
        : parseInt(String(item.quantity));

    if (!id) return createSecureResponse({ error: "Отсутствует ID товара" }, 400);
    if (!["rank", "case", "currency"].includes(type)) {
      return createSecureResponse({ error: "Неверный тип товара" }, 400);
    }
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 99) {
      return createSecureResponse({ error: "Неверное количество" }, 400);
    }

    // Validate ID exists in our catalogue
    const validId =
      (type === "rank" && VALID_RANK_IDS.has(id)) ||
      (type === "case" && VALID_CASE_IDS.has(id)) ||
      (type === "currency" && VALID_CURRENCY_IDS.has(id));
    if (!validId) {
      return createSecureResponse({ error: `Товар не найден: ${id}` }, 400);
    }

    // Server-side price lookup (never trust client price)
    const price = lookupPrice(id, type);
    if (price === null) {
      return createSecureResponse({ error: `Цена не найдена: ${id}` }, 400);
    }

    const name = typeof item.name === "string" ? sanitizeInput(item.name) : id;
    serverTotal += price * quantity;
    validatedItems.push({ id, type, name, price, quantity });
  }

  // Verify total matches server-computed total (anti-tamper)
  const clientTotal =
    typeof body.total === "number" ? body.total : parseFloat(String(body.total));
  if (!Number.isFinite(clientTotal) || Math.abs(clientTotal - serverTotal) > 0.01) {
    return createSecureResponse(
      { error: "Несоответствие суммы заказа. Обнови страницу." },
      400
    );
  }

  // ── Create order ──────────────────────────────────────────────────────────
  const orderId = uuidv4().replace(/-/g, "").slice(0, 12).toUpperCase();
  const order = {
    orderId,
    username: usernameRaw,
    items: validatedItems,
    total: serverTotal,
    paymentMethod: body.paymentMethod,
    status: "pending_payment",
    createdAt: new Date().toISOString(),
    ip, // logged for fraud detection
  };

  orders.set(orderId, order);

  // TODO: In production, persist to DB and generate payment URL from provider:
  //   const paymentUrl = await createYooMoneyPayment({ orderId, amount: serverTotal, ... });
  //   return createSecureResponse({ orderId, paymentUrl }, 201);

  return createSecureResponse(
    {
      orderId,
      total: serverTotal,
      // paymentUrl: "https://payment-provider.com/pay?id=..."  ← add when real payment integrated
      message: "Заказ создан. Перенаправляем на оплату...",
    },
    201
  );
}

// Order status lookup
export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(ip, 30, 60_000);
  if (!rl.allowed) {
    return createSecureResponse({ error: "Too many requests" }, 429);
  }

  const orderId = req.nextUrl.searchParams.get("id");
  if (!orderId || !/^[A-Z0-9]{12}$/.test(orderId)) {
    return createSecureResponse({ error: "Неверный ID заказа" }, 400);
  }

  const order = orders.get(orderId);
  if (!order) {
    return createSecureResponse({ error: "Заказ не найден" }, 404);
  }

  // Return safe subset (no IP)
  const { ip: _ip, ...safeOrder } = order as Record<string, unknown>;
  void _ip;
  return createSecureResponse(safeOrder, 200);
}
