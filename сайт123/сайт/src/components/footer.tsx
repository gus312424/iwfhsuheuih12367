import Link from "next/link";
import { Zap, Shield, Download } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "#060910", borderTop: "1px solid rgba(108,99,255,0.15)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Бренд */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6c63ff, #4facfe)", boxShadow: "0 0 20px rgba(108,99,255,0.4)" }}
              >
                <Zap size={20} className="text-white" />
              </div>
              <span
                className="text-xl font-bold"
                style={{ background: "linear-gradient(135deg, #6c63ff, #4facfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                VEXIUM
              </span>
            </div>
              <p className="text-sm leading-relaxed mb-4 max-w-xs" style={{ color: "#7b87a8" }}>
                Модовый Minecraft-сервер версии 1.16.5 Forge. Выживание, кланы, экономика, зомби-апокалипсис — Сезон 1 скоро.
              </p>
              <div
                className="inline-flex flex-col gap-1 px-4 py-3 rounded-xl"
                style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}
              >
                <div className="flex items-center gap-2 text-sm font-mono font-bold" style={{ color: "#00ff88" }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }} />
                  play.vexium.ru
                </div>
                <div className="text-xs" style={{ color: "#7b87a8" }}>Версия: 1.16.5 Forge · Моды обязательны</div>
              </div>
          </div>

          {/* Магазин */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#6c63ff" }}>Магазин</h4>
            <ul className="space-y-2">
              {[["Ранги", "/shop#ranks"], ["Ключи", "/shop#keys"], ["Корзина", "/cart"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: "#7b87a8" }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#6c63ff" }}>Информация</h4>
            <ul className="space-y-2">
              {[["Сборка", "/mods"], ["Правила сервера", "/rules"], ["FAQ", "/faq"], ["Политика возврата", "/refund"], ["Поддержка", "/contact"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: "#7b87a8" }}>{label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="/mods" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#6c63ff" }}>
                <Download size={14} /> Скачать модпак
              </Link>
            </div>
          </div>
        </div>

        {/* Нижняя полоса */}
          <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(108,99,255,0.1)" }}>
            <p className="text-xs" style={{ color: "#4a5568" }}>© 2026 Vexium. Не связан с Mojang / Microsoft.</p>
            <div className="flex items-center gap-4 text-xs" style={{ color: "#4a5568" }}>
              <div className="flex items-center gap-1.5">
                <Shield size={12} style={{ color: "#6c63ff" }} />
                <span>Безопасная оплата</span>
              </div>
            </div>
          </div>
      </div>
    </footer>
  );
}
