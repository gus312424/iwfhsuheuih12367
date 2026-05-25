"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, User } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { validateMinecraftUsername } from "@/lib/security";
import { useState } from "react";

export default function CartPage() {
  const { items, username, setUsername, removeItem, updateQty, total, clearCart } = useCart();
  const [usernameError, setUsernameError] = useState("");

  const handleUsernameChange = (v: string) => {
    setUsername(v);
    const { valid, error } = validateMinecraftUsername(v);
    setUsernameError(valid ? "" : (error || ""));
  };

  const canCheckout = items.length > 0 && !usernameError && username.trim().length >= 3;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}
        >
          <ShoppingCart size={40} style={{ color: "#6c63ff" }} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
        <p className="text-base mb-8" style={{ color: "#7b87a8" }}>
          Перейди в магазин и добавь что-нибудь
        </p>
        <Link href="/shop" className="btn-primary flex items-center gap-2">
          В магазин <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-8">
          <span className="text-gradient">Корзина</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Username input */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(13,17,32,0.9)",
                border: "1px solid rgba(108,99,255,0.2)",
              }}
            >
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                <User size={16} style={{ color: "#6c63ff" }} />
                Ник игрока в Minecraft
                <span style={{ color: "#fc8181" }}>*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                placeholder="Введи свой ник..."
                maxLength={16}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(108,99,255,0.08)",
                  border: `1px solid ${usernameError ? "#fc8181" : "rgba(108,99,255,0.25)"}`,
                  color: "#e8eaf6",
                }}
              />
              {usernameError && (
                <p className="text-xs mt-2" style={{ color: "#fc8181" }}>
                  {usernameError}
                </p>
              )}
              {!usernameError && username.trim().length >= 3 && (
                <p className="text-xs mt-2" style={{ color: "#68d391" }}>
                  ✓ Ник корректный — товары придут на «{username}»
                </p>
              )}
              <p className="text-xs mt-2" style={{ color: "#7b87a8" }}>
                Убедись что ник написан верно — привилегии выдаются по нику автоматически
              </p>
            </div>

            {/* Cart items */}
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl p-5 flex items-center gap-4"
                style={{
                  background: "rgba(13,17,32,0.9)",
                  border: `1px solid ${item.color ? item.color + "25" : "rgba(108,99,255,0.15)"}`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${item.color || "#6c63ff"}18` }}
                >
                  {item.type === "rank" ? "⚔️" : item.type === "case" ? "🎁" : "🪙"}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className="font-bold text-sm mb-0.5 truncate"
                    style={{ color: item.color || "#e8eaf6" }}
                  >
                    {item.type === "rank" ? `Ранг: [${item.name}]` : item.name}
                  </div>
                  <div className="text-xs" style={{ color: "#7b87a8" }}>
                    {item.price} ₽ за штуку
                  </div>
                </div>

                {/* Quantity controls */}
                <div
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <button
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center rounded-lg transition-colors"
                    style={{ color: "#7b87a8" }}
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center rounded-lg transition-colors"
                    style={{ color: "#7b87a8" }}
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="text-right">
                  <div className="font-bold">{item.price * item.quantity} ₽</div>
                </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-2 p-1.5 rounded-lg btn-trash"
                  >
                    <Trash2 size={15} />
                  </button>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-xs transition-colors btn-clear"
            >
              Очистить корзину
            </button>
          </div>

          {/* Summary */}
          <div>
            <div
              className="rounded-2xl p-6 sticky top-24"
              style={{
                background: "rgba(13,17,32,0.9)",
                border: "1px solid rgba(108,99,255,0.2)",
              }}
            >
              <h2 className="text-lg font-bold mb-5">Итого</h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span style={{ color: "#7b87a8" }} className="truncate mr-2 flex-1">
                      {item.name} ×{item.quantity}
                    </span>
                    <span className="flex-shrink-0">{item.price * item.quantity} ₽</span>
                  </div>
                ))}
              </div>

              <div
                className="border-t pt-4 mb-6"
                style={{ borderColor: "rgba(108,99,255,0.15)" }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold">К оплате:</span>
                  <span className="text-2xl font-black text-gradient">{total} ₽</span>
                </div>
              </div>

              {!username.trim() && (
                <p
                  className="text-xs text-center mb-4"
                  style={{ color: "#fc8181" }}
                >
                  Введи ник игрока чтобы продолжить
                </p>
              )}

              <Link
                href={canCheckout ? "/checkout" : "#"}
                className="block w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
                style={{
                  background: canCheckout
                    ? "linear-gradient(135deg, #6c63ff, #4facfe)"
                    : "rgba(108,99,255,0.2)",
                  color: canCheckout ? "#fff" : "#7b87a8",
                  cursor: canCheckout ? "pointer" : "not-allowed",
                  boxShadow: canCheckout ? "0 6px 20px rgba(108,99,255,0.4)" : "none",
                  pointerEvents: canCheckout ? "auto" : "none",
                }}
              >
                Оформить заказ →
              </Link>

              <div className="mt-4 space-y-2">
                {[
                  "🔒 Безопасная оплата",
                  "⚡ Выдача после оплаты",
                  "🛡️ Гарантия возврата",
                ].map((text) => (
                  <div key={text} className="text-xs text-center" style={{ color: "#7b87a8" }}>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
