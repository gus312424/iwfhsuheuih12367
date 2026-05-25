"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Star, Key, Check, ShoppingCart, Info, Clock, Package } from "lucide-react";
import { RANK_TIERS, DONATE_KEYS, RANK_IDS, type Duration } from "@/lib/shop-data";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

function ShopContent() {
  const { addItem } = useCart();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("ranks");
  const [selectedDuration, setSelectedDuration] = useState<Duration>("2m");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#keys") setActiveTab("keys");
    else setActiveTab("ranks");
  }, [searchParams]);

  const handleAdd = (id: string, type: "rank" | "case" | "currency", name: string, price: number, color?: string) => {
    addItem({ id, type, name, price, color });
    toast.success(`${name} добавлен в корзину`, { description: `${price} ₽` });
  };

    const tabs = [
        { id: "ranks",    label: "Ранги",       icon: Star,    count: RANK_IDS.length },
        { id: "keys",     label: "Ключи",        icon: Key,     count: DONATE_KEYS.length },
        { id: "mods",     label: "Моды",         icon: Package, count: null },
      ];

  const visibleTiers = RANK_TIERS.filter((t) => t.duration === selectedDuration);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            <span className="text-gradient">Магазин VEXIUM</span>
          </h1>
          <p style={{ color: "#7b87a8" }}>
            Привилегии начисляются на ник автоматически после оплаты · Сервер 1.16.5 Forge
          </p>
        </div>

        {/* Табы */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-10 p-2 rounded-2xl w-fit mx-auto"
          style={{ background: "rgba(13,17,32,0.8)", border: "1px solid rgba(108,99,255,0.15)" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); window.history.replaceState(null, "", `#${tab.id}`); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: activeTab === tab.id ? "linear-gradient(135deg, #6c63ff, #4facfe)" : "transparent",
                color: activeTab === tab.id ? "#fff" : "#7b87a8",
                boxShadow: activeTab === tab.id ? "0 4px 15px rgba(108,99,255,0.4)" : "none",
              }}
            >
                <tab.icon size={16} />
                {tab.label}
                {tab.count !== null && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    background: activeTab === tab.id ? "rgba(255,255,255,0.2)" : "rgba(108,99,255,0.2)",
                    color: activeTab === tab.id ? "#fff" : "#6c63ff",
                  }}
                >
                  {tab.count}
                </span>
                )}
            </button>
          ))}
        </div>

        {/* РАНГИ */}
        {activeTab === "ranks" && (
          <div>
            {/* Инфо */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-6 max-w-2xl mx-auto"
              style={{ background: "rgba(108,99,255,0.08)", border: "1px solid rgba(108,99,255,0.2)" }}
            >
              <Info size={18} style={{ color: "#6c63ff", flexShrink: 0, marginTop: 2 }} />
              <p className="text-sm" style={{ color: "#a8b4d8" }}>
                Временные ранги. Ранг более высокого уровня включает все команды предыдущих.
                После окончания срока ранг снимается автоматически.
              </p>
            </div>

            {/* Переключатель срока */}
            <div className="flex justify-center mb-10">
              <div
                className="flex p-1 rounded-xl gap-1"
                style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(108,99,255,0.2)" }}
              >
                {([
                  { dur: "2m" as Duration, label: "2 месяца" },
                  { dur: "4m" as Duration, label: "4 месяца", badge: "Выгоднее" },
                ] as const).map(({ dur, label, badge }) => (
                  <button
                    key={dur}
                    onClick={() => setSelectedDuration(dur)}
                    className="relative flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
                    style={{
                      background: selectedDuration === dur ? "linear-gradient(135deg,#6c63ff,#4facfe)" : "transparent",
                      color: selectedDuration === dur ? "#fff" : "#7b87a8",
                      boxShadow: selectedDuration === dur ? "0 4px 12px rgba(108,99,255,0.4)" : "none",
                    }}
                  >
                    <Clock size={14} />
                    {label}
                    {badge && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                        style={{ background: "rgba(104,211,145,0.2)", color: "#68d391", border: "1px solid rgba(104,211,145,0.3)" }}
                      >
                        {badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Карточки */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleTiers.map((rank) => (
                <div
                  key={rank.id}
                  className="relative rounded-2xl p-6 flex flex-col transition-all duration-300"
                  style={{
                    background: "rgba(13,17,32,0.9)",
                    border: rank.popular ? `1px solid ${rank.gradientFrom}60` : `1px solid ${rank.gradientFrom}25`,
                    backdropFilter: "blur(10px)",
                    boxShadow: rank.popular ? `0 0 30px ${rank.gradientFrom}20` : "none",
                  }}
                >
                  {rank.badge && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
                      style={{
                        background:
                          rank.rankId === "arhont"
                            ? "linear-gradient(135deg,#6c63ff,#ffd700)"
                            : rank.rankId === "povelitel"
                            ? "linear-gradient(135deg,#ffd700,#ffb347)"
                            : "linear-gradient(135deg,#6c63ff,#4facfe)",
                        boxShadow: "0 4px 12px rgba(108,99,255,0.4)",
                      }}
                    >
                      {rank.badge}
                    </div>
                  )}

                  {/* Название */}
                  <div
                    className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-lg w-fit text-sm font-bold"
                    style={{ background: `${rank.gradientFrom}18`, border: `1px solid ${rank.gradientFrom}30`, color: rank.color }}
                  >
                    [{rank.nameRu}]
                  </div>

                  {/* Срок */}
                  <div
                    className="flex items-center gap-1.5 text-xs mb-4 px-2.5 py-1.5 rounded-lg w-fit"
                    style={{ background: "rgba(255,255,255,0.05)", color: "#a8b4d8" }}
                  >
                    <Clock size={11} />
                    {rank.durationLabel}
                  </div>

                  {/* Цена */}
                  <div className="text-3xl font-black mb-1" style={{ color: rank.color }}>{rank.price} ₽</div>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: "#7b87a8" }}>{rank.description}</p>

                  {/* Статы */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="rounded-lg p-2.5 text-center text-xs" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="font-bold text-sm">{rank.homes}</div>
                      <div style={{ color: "#7b87a8" }}>домов</div>
                    </div>
                    <div className="rounded-lg p-2.5 text-center text-xs" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="font-bold text-sm" style={{ color: rank.canCreateClan ? "#68d391" : "#fc8181" }}>
                        {rank.canCreateClan ? "Да" : "Нет"}
                      </div>
                      <div style={{ color: "#7b87a8" }}>кланы</div>
                    </div>
                  </div>

                  {/* Фичи */}
                  <ul className="space-y-1.5 mb-6 flex-1">
                    {rank.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#a8b4d8" }}>
                        <Check size={12} style={{ color: rank.color, flexShrink: 0, marginTop: 2 }} />
                        {f}
                      </li>
                    ))}
                    {rank.features.length > 4 && (
                      <li className="text-xs" style={{ color: "#7b87a8" }}>+ ещё {rank.features.length - 4} команд...</li>
                    )}
                  </ul>

                  <button
                    onClick={() => handleAdd(rank.id, "rank", `${rank.nameRu} (${rank.durationLabel})`, rank.price, rank.color)}
                    className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg,${rank.gradientFrom},${rank.gradientTo})`,
                      color: "#fff",
                      boxShadow: `0 4px 15px ${rank.gradientFrom}40`,
                    }}
                  >
                    <ShoppingCart size={15} /> Купить ранг · {rank.price} ₽
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* КЛЮЧИ */}
        {activeTab === "keys" && (
          <div>
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-8 max-w-2xl mx-auto"
              style={{ background: "rgba(108,99,255,0.08)", border: "1px solid rgba(108,99,255,0.2)" }}
            >
              <Info size={18} style={{ color: "#6c63ff", flexShrink: 0, marginTop: 2 }} />
              <p className="text-sm" style={{ color: "#a8b4d8" }}>
                Ключи используются для открытия кейсов в игре командой <span className="font-mono text-white">/keys</span>.
                Кейсы выдают случайный ранг или набор ресурсов.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {DONATE_KEYS.map((k) => (
                <div
                  key={k.id}
                  className="rounded-2xl p-8 flex flex-col"
                  style={{ background: "rgba(13,17,32,0.9)", border: `1px solid ${k.color}30`, backdropFilter: "blur(10px)" }}
                >
                  <div className="text-5xl mb-4">{k.icon}</div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: k.color }}>{k.name}</h3>
                  <div className="text-3xl font-black mb-3" style={{ color: k.color }}>{k.price} ₽</div>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: "#7b87a8" }}>{k.description}</p>
                  <div className="mb-6">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#7b87a8" }}>Содержимое:</div>
                    <ul className="space-y-1.5">
                      {k.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#a8b4d8" }}>
                          <span style={{ color: k.color }}>✦</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleAdd(k.id, "case", k.name, k.price, k.color)}
                    className="mt-auto w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg,${k.gradientFrom},${k.gradientTo})`,
                      color: "#fff",
                      boxShadow: `0 4px 15px ${k.gradientFrom}40`,
                    }}
                  >
                    <ShoppingCart size={15} /> Купить ключ · {k.price} ₽
                  </button>
                </div>
                ))}
              </div>
            </div>
          )}
        {/* МОДЫ */}
        {activeTab === "mods" && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
              style={{ background: "rgba(79,172,254,0.1)", border: "1px solid rgba(79,172,254,0.2)" }}
            >
              <Package size={40} style={{ color: "#4facfe" }} />
            </div>
            <h2 className="text-3xl font-black mb-3">Скачать моды</h2>
            <p className="mb-8 max-w-sm" style={{ color: "#7b87a8" }}>
              Для игры на VEXIUM нужен модпак. Перейди на страницу «Моды» чтобы скачать сборку и узнать как установить.
            </p>
            <a
              href="/mods"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-black transition-all duration-200 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #6c63ff, #4facfe)",
                color: "#fff",
                boxShadow: "0 8px 30px rgba(108,99,255,0.5)",
              }}
            >
              <Package size={20} />
              Перейти к модпаку
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center" style={{ color: "#7b87a8" }}>Загрузка...</div>}>
      <ShopContent />
    </Suspense>
  );
}
