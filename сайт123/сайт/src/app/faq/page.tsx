"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "Как получить привилегию после оплаты?", a: "Привилегии выдаются автоматически на Minecraft-ник, который ты указал при заказе. Обычно это происходит в течение 1–5 минут. Если ты онлайн — выйди и зайди на сервер снова. Если прошло более 15 минут — напиши в Discord-поддержку с номером заказа." },
  { q: "Ранги постоянные или временные?", a: "Все ранги в магазине — постоянные (без срока действия). Единственное исключение — ранги из «Кейса Привилегий», которые выдаются на 30 дней." },
  { q: "Что если я ввёл неправильный ник?", a: "Обратись в Discord-поддержку с номером заказа и правильным ником как можно скорее — до активации привилегии. После активации перенос невозможен без дополнительной проверки." },
  { q: "Можно ли вернуть деньги?", a: "Цифровые товары (ранги, монеты, кейсы) не подлежат возврату после активации в соответствии с Законом о защите прав потребителей (ст. 26.1). Если привилегия не была выдана по нашей вине — мы вернём средства или повторно активируем." },
  { q: "Какие способы оплаты доступны?", a: "Банковская карта (Visa / Mastercard / МИР), СБП (Система Быстрых Платежей), ЮMoney, QIWI. Все платежи защищены и обрабатываются через сертифицированный платёжный шлюз." },
  { q: "Включает ли высокий ранг привилегии низкого?", a: "Да! Каждый ранг включает все возможности предыдущих. Например, «Архонт» имеет всё, что есть у «Рыцаря», «Следопыта» и всех остальных рангов ниже." },
  { q: "Можно ли купить ранг для другого игрока?", a: "Да, просто укажи ник другого игрока в поле «Ник игрока» при оформлении заказа. Привилегия будет выдана именно этому игроку." },
  { q: "Что такое донат-валюта и где её тратить?", a: "Донат-валюта — внутриигровая валюта сервера Vexium. Она используется в игровом магазине (/shop в Minecraft) для покупки предметов, зелий и расходников." },
  { q: "Что в Кейсе Привилегий?", a: "При открытии кейса тебе выпадает случайный ранг на 30 дней. Вероятности указаны в описании кейса. Ранги выдаются мгновенно после покупки." },
  { q: "Сохраняется ли ранг после смены ника?", a: "Нет. Привилегии привязаны к нику. При смене ника в Minecraft ты потеряешь ранг. Свяжись с поддержкой заблаговременно, чтобы перенести ранг на новый ник." },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4"><span className="text-gradient">Часто задаваемые вопросы</span></h1>
          <p style={{ color: "#7b87a8" }}>Не нашёл ответа? Пиши в Discord — ответим быстро.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(13,17,32,0.9)",
                border: open === i ? "1px solid rgba(108,99,255,0.35)" : "1px solid rgba(108,99,255,0.12)",
                transition: "border-color 0.2s ease",
              }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-sm sm:text-base" style={{ color: "#e8eaf6" }}>{faq.q}</span>
                {open === i
                  ? <ChevronUp size={18} style={{ color: "#6c63ff", flexShrink: 0 }} />
                  : <ChevronDown size={18} style={{ color: "#7b87a8", flexShrink: 0 }} />}
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#a8b4d8" }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        <div
          className="mt-10 p-6 rounded-2xl text-center"
          style={{ background: "rgba(108,99,255,0.06)", border: "1px solid rgba(108,99,255,0.18)" }}
        >
          <p className="text-sm mb-3" style={{ color: "#a8b4d8" }}>Остались вопросы?</p>
          <a
            href="https://discord.gg/vexium"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
            style={{ background: "linear-gradient(135deg,#5865F2,#7289da)", color: "#fff", boxShadow: "0 4px 15px rgba(88,101,242,0.4)" }}
          >
            Написать в Discord
          </a>
        </div>
      </div>
    </div>
  );
}
