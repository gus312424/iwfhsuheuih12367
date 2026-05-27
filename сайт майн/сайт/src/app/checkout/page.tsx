"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { validateMinecraftUsername, sanitizeInput } from "@/lib/security";
import { CreditCard, Shield, Check, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const PAYMENT_METHODS = [
  { id: "card",     label: "Банковская карта", icon: "💳", desc: "Visa / Mastercard / МИР" },
  { id: "sbp",      label: "СБП",             icon: "⚡", desc: "Быстрые платежи" },
  { id: "qiwi",     label: "QIWI",            icon: "🥝", desc: "QIWI кошелёк" },
  { id: "yoomoney", label: "ЮMoney",          icon: "💰", desc: "ЮMoney кошелёк" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, username, total, clearCart } = useCart();
  const [payMethod, setPayMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const usernameValidation = validateMinecraftUsername(username);

  if (items.length === 0) {
    router.replace("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!usernameValidation.valid) { setError("Неверный ник игрока. Вернитесь в корзину и исправьте."); return; }
    if (!agreed) { setError("Необходимо принять условия сервиса"); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: sanitizeInput(username),
          items: items.map((i) => ({ id: i.id, type: i.type, name: sanitizeInput(i.name), price: i.price, quantity: i.quantity })),
          total,
          paymentMethod: payMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error || "Ошибка при создании заказа"); return; }

      clearCart();
      router.push(`/checkout/success?order=${data.orderId}`);
    } catch {
      setError("Ошибка соединения. Попробуй ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-8"><span className="text-gradient">Оформление заказа</span></h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Получатель */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(108,99,255,0.2)" }}>
                <h2 className="font-bold mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black" style={{ background: "linear-gradient(135deg,#6c63ff,#4facfe)", color: "#fff" }}>1</span>
                  Получатель
                </h2>
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "rgba(104,211,145,0.08)", border: "1px solid rgba(104,211,145,0.25)" }}>
                  <Check size={18} style={{ color: "#68d391" }} />
                  <div>
                    <div className="text-sm font-bold">{username}</div>
                    <div className="text-xs" style={{ color: "#7b87a8" }}>Minecraft ник — привилегии будут выданы этому игроку</div>
                  </div>
                  <Link href="/cart" className="ml-auto text-xs" style={{ color: "#6c63ff" }}>Изменить</Link>
                </div>
              </div>

              {/* Способ оплаты */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(108,99,255,0.2)" }}>
                <h2 className="font-bold mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black" style={{ background: "linear-gradient(135deg,#6c63ff,#4facfe)", color: "#fff" }}>2</span>
                  Способ оплаты
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPayMethod(pm.id)}
                      className="flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200"
                      style={{
                        background: payMethod === pm.id ? "rgba(108,99,255,0.12)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${payMethod === pm.id ? "rgba(108,99,255,0.4)" : "rgba(255,255,255,0.07)"}`,
                      }}
                    >
                      <span className="text-2xl">{pm.icon}</span>
                      <div>
                        <div className="text-sm font-semibold">{pm.label}</div>
                        <div className="text-xs" style={{ color: "#7b87a8" }}>{pm.desc}</div>
                      </div>
                      {payMethod === pm.id && <Check size={16} className="ml-auto flex-shrink-0" style={{ color: "#6c63ff" }} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Соглашение */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(108,99,255,0.15)" }}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    className="mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
                    style={{ background: agreed ? "linear-gradient(135deg,#6c63ff,#4facfe)" : "transparent", border: agreed ? "none" : "2px solid rgba(108,99,255,0.4)" }}
                    onClick={() => setAgreed(!agreed)}
                  >
                    {agreed && <Check size={12} className="text-white" />}
                  </div>
                  <span className="text-sm" style={{ color: "#a8b4d8" }}>
                    Я соглашаюсь с{" "}
                    <Link href="/rules" style={{ color: "#6c63ff" }}>правилами сервера</Link>
                    {" "}и подтверждаю, что цифровые товары не подлежат возврату после активации.
                  </span>
                </label>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "rgba(252,129,129,0.1)", border: "1px solid rgba(252,129,129,0.3)" }}>
                  <AlertCircle size={18} style={{ color: "#fc8181" }} />
                  <span className="text-sm" style={{ color: "#fc8181" }}>{error}</span>
                </div>
              )}
            </div>

            {/* Сайдбар */}
            <div>
              <div className="rounded-2xl p-6 sticky top-24" style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(108,99,255,0.2)" }}>
                <h2 className="font-bold mb-4">Ваш заказ</h2>
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span style={{ color: "#7b87a8" }} className="truncate mr-2 flex-1">{item.name} ×{item.quantity}</span>
                      <span>{item.price * item.quantity} ₽</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mb-6" style={{ borderColor: "rgba(108,99,255,0.15)" }}>
                  <div className="flex justify-between">
                    <span className="font-bold">Итого:</span>
                    <span className="text-2xl font-black text-gradient">{total} ₽</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading || !agreed}
                  className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                  style={{
                    background: loading || !agreed ? "rgba(108,99,255,0.2)" : "linear-gradient(135deg,#6c63ff,#4facfe)",
                    color: loading || !agreed ? "#7b87a8" : "#fff",
                    cursor: loading || !agreed ? "not-allowed" : "pointer",
                    boxShadow: !loading && agreed ? "0 6px 20px rgba(108,99,255,0.4)" : "none",
                  }}
                >
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Обработка...</> : <><CreditCard size={18} /> Оплатить {total} ₽</>}
                </button>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs" style={{ color: "#7b87a8" }}>
                  <Shield size={12} style={{ color: "#6c63ff" }} /> Защищённое соединение
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
