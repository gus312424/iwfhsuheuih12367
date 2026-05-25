"use client";

import Link from "next/link";
import { ArrowRight, Zap, Users, Shield, Sword, Star, Key, Download } from "lucide-react";
import { ParticlesBackground } from "@/components/particles";
import { CountUp } from "@/components/count-up";
import { RANKS } from "@/lib/shop-data";

const STATS = [
  { label: "Игроков онлайн",   value: 0,     suffix: "",  display: "Скоро" },
  { label: "Ожидают старта",   value: 0,     suffix: "",  display: "∞" },
  { label: "Версия",           value: 1165,  suffix: "",  display: "1.16.5" },
  { label: "Сезон",            value: 0,     suffix: "",  display: "1" },
];

const FEATURES = [
  { icon: Zap,    title: "Стабильный сервер без лагов", desc: "Мощное железо и оптимизированные настройки — никаких фризов и тормозов во время игры.", color: "#6c63ff" },
  { icon: Shield, title: "Защита от читеров",           desc: "Анти-чит система блокирует нарушителей в реальном времени. Честная игра для всех.",    color: "#4facfe" },
  { icon: Users,  title: "Сбалансированная экономика",  desc: "Торгуй на рынке, зарабатывай монеты честным путём. Без Pay2Win — побеждает умение.",   color: "#00f2fe" },
  { icon: Sword,  title: "Удобный старт для новичков",  desc: "Пошаговая инструкция, готовый модпак и дружелюбное комьюнити помогут быстро войти.",   color: "#ffd700" },
];

const TOP_RANKS = RANKS.slice(6, 9);

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticlesBackground />

      {/* СЕЗОН 1 АНОНС-БАННЕР */}
      <section
        className="relative pt-28 pb-0 px-4"
        style={{ paddingTop: "calc(4rem + 56px)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-5 sm:p-6 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(180,50,20,0.18) 0%, rgba(80,20,10,0.25) 40%, rgba(30,10,5,0.4) 100%)",
              border: "1px solid rgba(220,80,30,0.45)",
              boxShadow: "0 0 40px rgba(200,60,20,0.25)",
            }}
          >
            {/* Декоративные угли */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 20% 50%, rgba(220,60,20,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(180,30,10,0.1) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                style={{ background: "rgba(220,60,20,0.2)", border: "1px solid rgba(220,60,20,0.5)", color: "#ff7043" }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#ff4500",
                    boxShadow: "0 0 8px #ff4500",
                    animation: "pulse 1.5s infinite",
                  }}
                />
                Анонс · Скоро
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: "#ffe0d0" }}>
                🔥 VEXIUM — Сезон 1 скоро начнётся!
              </h2>
              <p className="text-sm sm:text-base mb-4" style={{ color: "rgba(255,200,170,0.8)" }}>
                Зомби-апокалипсис, моды, выживание, кланы — первый сезон уже на горизонте.
                Скачай модпак заранее и будь готов с первой минуты.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/mods"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #ff4500, #ff7043)",
                    color: "#fff",
                    boxShadow: "0 6px 20px rgba(255,69,0,0.4)",
                  }}
                >
                  <Download size={16} /> Скачать модпак
                </Link>
                <Link
                  href="/mods#steps"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200"
                  style={{
                    background: "rgba(255,69,0,0.1)",
                    border: "1px solid rgba(255,69,0,0.4)",
                    color: "#ff7043",
                  }}
                >
                  Как зайти на сервер <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="relative pt-12 pb-24 px-4 bg-hero bg-grid">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)", filter: "blur(40px)", zIndex: 1 }}
        />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.3)", color: "#a78bfa" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#ff7043", boxShadow: "0 0 6px #ff7043" }} />
            Сезон 1 скоро · Minecraft 1.16.5 Forge
          </div>

          <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-none tracking-tight">
            <span className="text-gradient">VEXIUM</span>
            <br />
            <span className="text-2xl sm:text-3xl font-semibold" style={{ color: "rgba(232,234,246,0.7)" }}>
              Модовый выживач нового поколения
            </span>
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10" style={{ color: "rgba(232,234,246,0.55)", lineHeight: 1.7 }}>
            Зомби-апокалипсис. Моды. Кланы. Экономика.
            <br />Присоединяйся к первому сезону VEXIUM — сервер 1.16.5 с уникальной сборкой.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/mods" className="btn-primary flex items-center gap-2 text-base">
              <Download size={18} /> Скачать модпак
            </Link>
            <Link
              href="/shop"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200"
              style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.3)", color: "#a8b4d8" }}
            >
              Магазин <ArrowRight size={18} />
            </Link>
            <div
              className="flex items-center gap-3 px-6 py-3 rounded-lg cursor-pointer select-all font-mono text-sm"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,99,255,0.2)", color: "#a8b4d8" }}
              onClick={() => navigator.clipboard?.writeText("play.vexium.ru")}
              title="Нажми чтобы скопировать"
            >
              <span className="w-2 h-2 rounded-full" style={{ background: "#ff7043", boxShadow: "0 0 6px #ff7043" }} />
              play.vexium.ru
            </div>
          </div>
        </div>
      </section>

      {/* СТАТИСТИКА */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl p-8"
            style={{ background: "rgba(13,17,32,0.8)", border: "1px solid rgba(108,99,255,0.15)", backdropFilter: "blur(20px)" }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-black mb-1 text-gradient">
                  {stat.display ? stat.display : <><CountUp end={stat.value} />{stat.suffix}</>}
                </div>
                <div className="text-xs" style={{ color: "#7b87a8" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ФИЧИ */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Почему <span className="text-gradient">VEXIUM</span>?</h2>
            <p style={{ color: "#7b87a8" }}>Всё что нужно для идеальной игры — в одном месте</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass glass-hover rounded-2xl p-6 text-center">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}
                >
                  <f.icon size={26} style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7b87a8" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* КАК НАЧАТЬ */}
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Скачай сборку — <span className="text-gradient">заходи и играй</span>
            </h2>
            <p className="mb-10 text-base" style={{ color: "#7b87a8" }}>
              Три простых шага — и ты уже на сервере вместе с нами
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {[
                { num: "1", icon: "📦", title: "Скачай сборку", desc: "Нажми кнопку ниже и скачай готовый модпак VEXIUM" },
                { num: "2", icon: "⚙️", title: "Установи моды", desc: "Распакуй архив и перенеси моды в папку .minecraft/mods" },
                { num: "3", icon: "🎮", title: "Заходи и играй", desc: "Запусти Minecraft Forge 1.16.5 и подключись к play.vexium.ru" },
              ].map((s) => (
                <div key={s.num} className="glass rounded-2xl p-6 text-center relative">
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <div
                    className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ background: "linear-gradient(135deg,#6c63ff,#4facfe)" }}
                  >{s.num}</div>
                  <h3 className="font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-sm" style={{ color: "#7b87a8" }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <Link href="/mods" className="btn-primary inline-flex items-center gap-2 text-base">
              <Download size={18} /> Скачать сборку VEXIUM
            </Link>
          </div>
        </section>

        {/* КАК ЗАЙТИ — блок */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-8 sm:p-10 text-center"
            style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(108,99,255,0.25)", backdropFilter: "blur(10px)" }}
          >
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">Нужны моды для входа на сервер</h2>
            <p className="mb-6" style={{ color: "#7b87a8" }}>
              VEXIUM — модовый сервер 1.16.5 Forge. Скачай нашу сборку и заходи в пару кликов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mods" className="btn-primary flex items-center justify-center gap-2">
                <Download size={18} /> Скачать модпак VEXIUM
              </Link>
              <Link
                href="/mods"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.3)", color: "#a8b4d8" }}
              >
                Инструкция по установке <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ПРЕВЬЮ МАГАЗИНА */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Магазин <span className="text-gradient">привилегий</span></h2>
            <p style={{ color: "#7b87a8" }}>Временные ранги и ключи — без Pay2Win, только комфорт</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              { href: "/shop#ranks", icon: Star, color: "#6c63ff", bg: "linear-gradient(135deg,#6c63ff22,#4facfe22)", title: "Ранги",  desc: "9 уникальных рангов с командами, цветными никами и привилегиями", from: "от 59 ₽" },
              { href: "/shop#keys",  icon: Key,  color: "#9f7aea", bg: "linear-gradient(135deg,#9f7aea22,#f687b322)", title: "Ключи",  desc: "Донат-ключ и Шалкер-ключ — случайный ранг или набор ресурсов",    from: "от 125 ₽" },
            ].map((cat) => (
              <Link key={cat.href} href={cat.href} className="glass glass-hover rounded-2xl p-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: cat.bg, border: `1px solid ${cat.color}30` }}
                >
                  <cat.icon size={30} style={{ color: cat.color }} />
                </div>
                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-sm mb-4" style={{ color: "#7b87a8" }}>{cat.desc}</p>
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: cat.color }}>
                  {cat.from} <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TOP_RANKS.map((rank) => (
              <div
                key={rank.id}
                className="rounded-xl p-5 flex items-center justify-between"
                style={{ background: "rgba(13,17,32,0.8)", border: `1px solid ${rank.gradientFrom}30`, backdropFilter: "blur(10px)" }}
              >
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: rank.color }}>
                    [{rank.nameRu}]
                  </div>
                  <div className="font-bold text-sm">{rank.homes} домов · {rank.canCreateClan ? "Кланы" : "Без кланов"}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black" style={{ color: rank.color }}>от {rank.price} ₽</div>
                  <Link href="/shop" className="text-xs" style={{ color: "#7b87a8" }}>Купить →</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
              Все товары <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* КАК КУПИТЬ */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Как <span className="text-gradient">купить</span>?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Выбери товар",  desc: "Перейди в магазин, выбери ранг или ключ и нажми «Купить».",                             color: "#6c63ff" },
              { step: "02", title: "Введи ник",     desc: "Укажи свой Minecraft-ник в корзине — именно на него придёт привилегия.",                color: "#4facfe" },
              { step: "03", title: "Оплати",        desc: "Выбери удобный способ оплаты. Ранг выдаётся автоматически после подтверждения оплаты.", color: "#00f2fe" },
            ].map((item) => (
              <div key={item.step} className="text-center glass rounded-2xl p-8">
                <div
                  className="text-4xl font-black mb-4"
                  style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: "#7b87a8" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
