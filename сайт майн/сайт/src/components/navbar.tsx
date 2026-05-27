"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Zap, Download } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/",        label: "Главная" },
  { href: "/shop",    label: "Магазин" },
  { href: "/mods",    label: "Моды" },
  { href: "/rules",   label: "Правила" },
  { href: "/faq",     label: "FAQ" },
];

export function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,11,20,0.97)" : "rgba(8,11,20,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(108,99,255,0.2)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
      }}
    >
      {/* Верхняя строка брендинга */}
      <div
        className="w-full text-center py-1 text-xs font-semibold tracking-widest"
        style={{ background: "linear-gradient(90deg,#6c63ff22,#4facfe22,#6c63ff22)", color: "#a8b4d8", borderBottom: "1px solid rgba(108,99,255,0.15)" }}
      >
        VEXIUM &bull; 1.16.5 &bull; Модовый сервер &bull; Сезон 1 — скоро старт!
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6c63ff, #4facfe)", boxShadow: "0 0 15px rgba(108,99,255,0.5)" }}
            >
              <Zap size={18} className="text-white" />
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ background: "linear-gradient(135deg, #6c63ff, #4facfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              VEXIUM
            </span>
          </Link>

          {/* Десктоп навигация */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: pathname === link.href ? "#6c63ff" : "rgba(232,234,246,0.7)",
                  background: pathname === link.href ? "rgba(108,99,255,0.1)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-2">
            <Link
              href="/mods"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#6c63ff,#4facfe)", color: "#fff", boxShadow: "0 0 12px rgba(108,99,255,0.4)" }}
            >
              <Download size={13} /> Модпак
            </Link>

            <div
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
              style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)", color: "#a8b4d8" }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }} />
              play.vexium.ru
            </div>

            {/* Корзина */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
              style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}
            >
              <ShoppingCart size={18} style={{ color: "#a8b4d8" }} />
              {count > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ background: "linear-gradient(135deg, #6c63ff, #4facfe)", boxShadow: "0 0 8px rgba(108,99,255,0.6)" }}
                >
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>

            {/* Мобильное меню */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              {mobileOpen ? <X size={18} style={{ color: "#a8b4d8" }} /> : <Menu size={18} style={{ color: "#a8b4d8" }} />}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t" style={{ borderColor: "rgba(108,99,255,0.15)" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium mb-1"
                style={{
                  color: pathname === link.href ? "#6c63ff" : "rgba(232,234,246,0.7)",
                  background: pathname === link.href ? "rgba(108,99,255,0.1)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mx-4 mt-3">
              <Link
                href="/mods"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold"
                style={{ background: "linear-gradient(135deg,#6c63ff,#4facfe)", color: "#fff" }}
              >
                <Download size={15} /> Скачать модпак
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
