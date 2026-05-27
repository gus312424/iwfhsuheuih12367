"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle, ArrowRight, Home, Copy } from "lucide-react";
import { useState } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("order") || "—";
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
      {/* Glow blob */}
      <div
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(104,211,145,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="relative z-10">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8 mx-auto"
          style={{
            background: "rgba(104,211,145,0.1)",
            border: "1px solid rgba(104,211,145,0.3)",
            boxShadow: "0 0 50px rgba(104,211,145,0.2)",
          }}
        >
          <CheckCircle size={48} style={{ color: "#68d391" }} />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: "#68d391" }}>
          Оплата прошла!
        </h1>
        <p className="text-lg mb-2" style={{ color: "rgba(232,234,246,0.7)" }}>
          Привилегии будут выданы в течение нескольких минут
        </p>
        <p className="text-sm mb-8" style={{ color: "#7b87a8" }}>
          Зайди на сервер <span className="font-mono text-white">mc.vexium.ru</span> — все команды уже доступны.
        </p>

        {/* Order ID */}
        <div
          className="inline-flex items-center gap-3 px-5 py-3 rounded-xl text-sm mb-10 cursor-pointer"
          style={{
            background: "rgba(13,17,32,0.8)",
            border: "1px solid rgba(108,99,255,0.2)",
          }}
          onClick={copy}
          title="Скопировать номер заказа"
        >
          <span style={{ color: "#7b87a8" }}>Номер заказа:</span>
          <span className="font-mono font-bold" style={{ color: "#6c63ff" }}>
            #{orderId}
          </span>
          <Copy size={14} style={{ color: copied ? "#68d391" : "#7b87a8" }} />
          {copied && <span className="text-xs" style={{ color: "#68d391" }}>Скопировано!</span>}
        </div>

        {/* Steps */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-xl mx-auto text-left"
          style={{
            background: "rgba(13,17,32,0.6)",
            border: "1px solid rgba(108,99,255,0.12)",
            borderRadius: 16,
            padding: "1.5rem",
          }}
        >
          {[
            { icon: "🎮", title: "Зайди на сервер", desc: "mc.vexium.ru (1.16.5)" },
            { icon: "⚡", title: "Получи ранг", desc: "Введи /rank check для проверки" },
            { icon: "🎉", title: "Наслаждайся", desc: "Все привилегии активированы" },
          ].map((step) => (
            <div key={step.title} className="flex flex-col items-center text-center p-3">
              <div className="text-3xl mb-2">{step.icon}</div>
              <div className="text-sm font-bold mb-1">{step.title}</div>
              <div className="text-xs" style={{ color: "#7b87a8" }}>{step.desc}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary flex items-center gap-2 justify-center">
            <Home size={18} />
            На главную
          </Link>
          <Link
            href="/shop"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm justify-center transition-all"
            style={{
              background: "rgba(108,99,255,0.1)",
              border: "1px solid rgba(108,99,255,0.25)",
              color: "#a8b4d8",
            }}
          >
            Ещё товары <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ color: "#7b87a8" }}>
        Загрузка...
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
