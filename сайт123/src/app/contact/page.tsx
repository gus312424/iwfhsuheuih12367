import { MessageCircle, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4">
            <span className="text-gradient">Поддержка</span>
          </h1>
          <p style={{ color: "#7b87a8" }}>
            Есть вопрос по заказу или серверу? Мы поможем.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <a
              href="https://discord.gg/vexium"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl p-6 flex flex-col items-center text-center card-discord"
              style={{
                background: "rgba(88,101,242,0.08)",
                border: "1px solid rgba(88,101,242,0.25)",
              }}
            >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgba(88,101,242,0.15)" }}
            >
              <MessageCircle size={28} style={{ color: "#7289da" }} />
            </div>
            <h3 className="font-bold mb-1">Discord</h3>
            <p className="text-sm mb-3" style={{ color: "#7b87a8" }}>
              Самый быстрый способ связи
            </p>
            <span
              className="text-sm font-semibold"
              style={{ color: "#7289da" }}
            >
              discord.gg/vexium →
            </span>
          </a>

          <div
            className="rounded-2xl p-6 flex flex-col items-center text-center"
            style={{
              background: "rgba(13,17,32,0.9)",
              border: "1px solid rgba(108,99,255,0.15)",
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgba(108,99,255,0.1)" }}
            >
              <Mail size={28} style={{ color: "#6c63ff" }} />
            </div>
            <h3 className="font-bold mb-1">Email</h3>
            <p className="text-sm mb-3" style={{ color: "#7b87a8" }}>
              Для деловых вопросов
            </p>
            <span className="text-sm font-mono" style={{ color: "#6c63ff" }}>
              support@vexium.ru
            </span>
          </div>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(13,17,32,0.9)",
            border: "1px solid rgba(108,99,255,0.15)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock size={18} style={{ color: "#6c63ff" }} />
            <h2 className="font-bold">Время ответа</h2>
          </div>
          <ul className="space-y-3">
            {[
              { label: "Discord (поддержка)", time: "до 2 часов", color: "#68d391" },
              { label: "Discord (технические вопросы)", time: "до 6 часов", color: "#4facfe" },
              { label: "Email", time: "до 24 часов", color: "#ffd700" },
            ].map((row) => (
              <li key={row.label} className="flex items-center justify-between text-sm">
                <span style={{ color: "#a8b4d8" }}>{row.label}</span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: `${row.color}18`,
                    border: `1px solid ${row.color}30`,
                    color: row.color,
                  }}
                >
                  {row.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
