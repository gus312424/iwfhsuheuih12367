import Link from "next/link";
import { Zap, MessageCircle, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        background: "#060910",
        borderTop: "1px solid rgba(108,99,255,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6c63ff, #4facfe)",
                  boxShadow: "0 0 20px rgba(108,99,255,0.4)",
                }}
              >
                <Zap size={20} className="text-white" />
              </div>
              <span
                className="text-xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #6c63ff, #4facfe)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                VEXIUM
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-4 max-w-xs"
              style={{ color: "#7b87a8" }}
            >
              Minecraft сервер версии 1.16.5 с модами. Выживание, кланы,
              экономика — всё что нужно для лучшей игры.
            </p>
            <div className="flex items-center gap-2 text-sm font-mono">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }}
              />
              <span style={{ color: "#7b87a8" }}>play.vexium.ru</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: "#6c63ff" }}
            >
              Магазин
            </h4>
            <ul className="space-y-2">
              {[
                  ["Ранги", "/shop#ranks"],
                  ["Кейсы", "/shop#cases"],
                  ["Донат-валюта", "/shop#currency"],
                  ["Корзина", "/cart"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm footer-link"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: "#6c63ff" }}
            >
              Информация
            </h4>
            <ul className="space-y-2">
              {[
                  ["Правила сервера", "/rules"],
                  ["FAQ", "/faq"],
                  ["Политика возврата", "/refund"],
                  ["Связаться с нами", "/contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm footer-link"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(108,99,255,0.1)" }}
        >
          <p className="text-xs" style={{ color: "#4a5568" }}>
            © 2024 Vexium. Не связан с Mojang / Microsoft.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: "#4a5568" }}>
            <div className="flex items-center gap-1.5">
              <Shield size={12} style={{ color: "#6c63ff" }} />
              <span>Безопасная оплата</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle size={12} style={{ color: "#6c63ff" }} />
              <span>Discord-поддержка</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
