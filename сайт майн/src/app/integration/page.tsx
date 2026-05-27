import Link from "next/link";
import { Terminal, Database, Zap, ShoppingBag, Users, Coins } from "lucide-react";

export default function IntegrationPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.3)", color: "#a78bfa" }}
          >
            Для администраторов
          </div>
          <h1 className="text-4xl font-black mb-4">
            <span className="text-gradient">Интеграция</span> сервера и сайта
          </h1>
          <p style={{ color: "#7b87a8" }}>
            Как связать Minecraft-сервер с сайтом так, чтобы покупки, онлайн, ранги и ключи работали в реальном времени.
          </p>
        </div>

        {/* Architecture */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap size={18} style={{ color: "#6c63ff" }} /> Общая схема
          </h2>
          <div
            className="rounded-2xl p-6 text-sm leading-relaxed space-y-2"
            style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(108,99,255,0.2)" }}
          >
            <p style={{ color: "#a8b4d8" }}>
              <span className="font-bold" style={{ color: "#e8eaf6" }}>Покупатель</span> → оплачивает на сайте →{" "}
              <span className="font-bold" style={{ color: "#e8eaf6" }}>платёжный провайдер</span> (ЮКасса/ЮMoney) отправляет webhook →{" "}
              <span className="font-bold" style={{ color: "#e8eaf6" }}>API сайта</span> получает подтверждение →{" "}
              <span className="font-bold" style={{ color: "#e8eaf6" }}>RCON/HTTP к серверу</span> → выдаётся ранг/кейс.
            </p>
          </div>
        </section>

        {/* Step 1: Payment webhook */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ShoppingBag size={18} style={{ color: "#68d391" }} /> Шаг 1 — Платёжный провайдер
          </h2>
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(104,211,145,0.2)" }}
          >
            <p className="text-sm" style={{ color: "#a8b4d8" }}>
              Подключи <strong style={{ color: "#e8eaf6" }}>ЮКассу</strong> (yookassa.ru) — это самый простой вариант для РФ.
              Зарегистрируйся, создай магазин, получи <code style={{ color: "#a78bfa" }}>SHOP_ID</code> и <code style={{ color: "#a78bfa" }}>SECRET_KEY</code>.
            </p>
            <div
              className="rounded-xl p-4 font-mono text-xs"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(108,99,255,0.15)", color: "#a8b4d8" }}
            >
              <div style={{ color: "#7b87a8" }}># .env.local</div>
              <div>YOOKASSA_SHOP_ID=<span style={{ color: "#68d391" }}>1234567</span></div>
              <div>YOOKASSA_SECRET_KEY=<span style={{ color: "#68d391" }}>live_xxxxx</span></div>
              <div>WEBHOOK_SECRET=<span style={{ color: "#68d391" }}>свой-секрет-строка</span></div>
            </div>
            <p className="text-sm" style={{ color: "#a8b4d8" }}>
              В ЮКассе укажи URL webhook: <code style={{ color: "#a78bfa" }}>https://твойсайт.vercel.app/api/payment-webhook</code>
            </p>
          </div>
        </section>

        {/* Step 2: RCON */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Terminal size={18} style={{ color: "#4facfe" }} /> Шаг 2 — RCON (выдача привилегий)
          </h2>
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(79,172,254,0.2)" }}
          >
            <p className="text-sm" style={{ color: "#a8b4d8" }}>
              RCON — это встроенный в Minecraft протокол удалённых команд. Включи его в <code style={{ color: "#a78bfa" }}>server.properties</code>:
            </p>
            <div
              className="rounded-xl p-4 font-mono text-xs"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(108,99,255,0.15)", color: "#a8b4d8" }}
            >
              <div>enable-rcon=<span style={{ color: "#68d391" }}>true</span></div>
              <div>rcon.port=<span style={{ color: "#68d391" }}>25575</span></div>
              <div>rcon.password=<span style={{ color: "#68d391" }}>твой-пароль-rcon</span></div>
            </div>
            <p className="text-sm" style={{ color: "#a8b4d8" }}>
              Добавь переменные в Vercel:
            </p>
            <div
              className="rounded-xl p-4 font-mono text-xs"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(108,99,255,0.15)", color: "#a8b4d8" }}
            >
              <div>RCON_HOST=<span style={{ color: "#68d391" }}>IP-сервера</span></div>
              <div>RCON_PORT=<span style={{ color: "#68d391" }}>25575</span></div>
              <div>RCON_PASSWORD=<span style={{ color: "#68d391" }}>твой-пароль-rcon</span></div>
            </div>
            <p className="text-sm" style={{ color: "#a8b4d8" }}>
              Установи npm пакет: <code style={{ color: "#a78bfa" }}>bun add rcon-client</code>.
              После подтверждения оплаты API сайта подключается через RCON и выполняет команды:
            </p>
            <div
              className="rounded-xl p-4 font-mono text-xs"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(108,99,255,0.15)", color: "#a8b4d8" }}
            >
              <div style={{ color: "#7b87a8" }}>{"//"} Выдача ранга (плагин LuckPerms)</div>
              <div>{`lp user <НИК> parent set <ранг>`}</div>
              <div style={{ color: "#7b87a8" }}>{"//"} Пример для Стража:</div>
              <div style={{ color: "#ffd700" }}>{`lp user Steve parent set strazh`}</div>
              <div className="mt-2" style={{ color: "#7b87a8" }}>{"//"} Выдача кейса (кастомная команда)</div>
              <div style={{ color: "#ffd700" }}>{`givecase Steve privilege 1`}</div>
            </div>
          </div>
        </section>

        {/* Step 3: Online stats */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users size={18} style={{ color: "#ffd700" }} /> Шаг 3 — Онлайн в реальном времени
          </h2>
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(255,215,0,0.2)" }}
          >
            <p className="text-sm" style={{ color: "#a8b4d8" }}>
              Используй <strong style={{ color: "#e8eaf6" }}>Minecraft Server Status API</strong> — бесплатный публичный API, не требует настройки на сервере:
            </p>
            <div
              className="rounded-xl p-4 font-mono text-xs"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(108,99,255,0.15)", color: "#a8b4d8" }}
            >
              <div style={{ color: "#7b87a8" }}>{"//"} GET запрос с сайта к API</div>
              <div>https://api.mcsrvstat.us/3/<span style={{ color: "#68d391" }}>mc.vexium.ru</span></div>
              <div className="mt-2" style={{ color: "#7b87a8" }}>{"//"} Ответ содержит:</div>
              <div>{`{ "online": true, "players": { "online": 47, "max": 500 } }`}</div>
            </div>
            <p className="text-sm" style={{ color: "#a8b4d8" }}>
              В <code style={{ color: "#a78bfa" }}>src/app/api/server-status/route.ts</code> создай endpoint который кэширует этот запрос каждые 60 секунд и отдаёт на фронтенд. Затем в <code style={{ color: "#a78bfa" }}>page.tsx</code> замени статические числа на данные из API.
            </p>
          </div>
        </section>

        {/* Step 4: Database */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Database size={18} style={{ color: "#9f7aea" }} /> Шаг 4 — База данных заказов
          </h2>
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(159,122,234,0.2)" }}
          >
            <p className="text-sm" style={{ color: "#a8b4d8" }}>
              Сейчас заказы хранятся в памяти (теряются при перезапуске). Подключи <strong style={{ color: "#e8eaf6" }}>Supabase</strong> (бесплатный Postgres):
            </p>
            <ol className="space-y-2 text-sm" style={{ color: "#a8b4d8" }}>
              <li><span style={{ color: "#e8eaf6" }}>1.</span> Зарегистрируйся на supabase.com, создай проект.</li>
              <li><span style={{ color: "#e8eaf6" }}>2.</span> Скопируй <code style={{ color: "#a78bfa" }}>SUPABASE_URL</code> и <code style={{ color: "#a78bfa" }}>SUPABASE_ANON_KEY</code> в Vercel.</li>
              <li><span style={{ color: "#e8eaf6" }}>3.</span> Установи: <code style={{ color: "#a78bfa" }}>bun add @supabase/supabase-js</code>.</li>
              <li><span style={{ color: "#e8eaf6" }}>4.</span> Создай таблицу <code style={{ color: "#a78bfa" }}>orders</code> в Supabase и замени <code style={{ color: "#a78bfa" }}>orders.set()</code> в API на вставку в БД.</li>
            </ol>
          </div>
        </section>

        {/* Step 5: pp effects */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Coins size={18} style={{ color: "#f687b3" }} /> Шаг 5 — /pp эффекты на сервере
          </h2>
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(246,135,179,0.2)" }}
          >
            <p className="text-sm" style={{ color: "#a8b4d8" }}>
              Команда <code style={{ color: "#a78bfa" }}>/pp</code> предоставляется плагином <strong style={{ color: "#e8eaf6" }}>PlayerParticles</strong> (Paper/Spigot).
              Скачай с SpigotMC: <code style={{ color: "#a78bfa" }}>https://www.spigotmc.org/resources/playerparticles.40261/</code>
            </p>
            <p className="text-sm" style={{ color: "#a8b4d8" }}>
              В конфиге PlayerParticles настрой группы разрешений через LuckPerms. Каждому рангу выдай нужные permissions:
            </p>
            <div
              className="rounded-xl p-4 font-mono text-xs"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(108,99,255,0.15)", color: "#a8b4d8" }}
            >
              <div style={{ color: "#7b87a8" }}>{"//"} LuckPerms — права для эффектов по рангам</div>
              <div>playerparticles.effect.flame   <span style={{ color: "#7b87a8" }}>{"//"} Рыцарь+</span></div>
              <div>playerparticles.effect.leaf    <span style={{ color: "#7b87a8" }}>{"//"} Следопыт+</span></div>
              <div>playerparticles.effect.drip    <span style={{ color: "#7b87a8" }}>{"//"} Страж+</span></div>
              <div>playerparticles.effect.lava    <span style={{ color: "#7b87a8" }}>{"//"} Титан+</span></div>
              <div>playerparticles.effect.spell   <span style={{ color: "#7b87a8" }}>{"//"} Мистик+</span></div>
              <div>playerparticles.effect.heart   <span style={{ color: "#7b87a8" }}>{"//"} Хранитель+</span></div>
              <div>playerparticles.effect.fireworks <span style={{ color: "#7b87a8" }}>{"//"} Бессмертный+</span></div>
              <div>playerparticles.effect.totem   <span style={{ color: "#7b87a8" }}>{"//"} Повелитель+</span></div>
              <div>playerparticles.effect.*       <span style={{ color: "#ffd700" }}>{"//"} Архонт — все эффекты</span></div>
            </div>
            <p className="text-sm" style={{ color: "#a8b4d8" }}>
              После выдачи ранга через RCON игрок автоматически получает доступ к соответствующим эффектам в <code style={{ color: "#a78bfa" }}>/pp</code>.
            </p>
          </div>
        </section>

        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: "rgba(108,99,255,0.08)", border: "1px solid rgba(108,99,255,0.25)" }}
        >
          <p className="text-sm mb-4" style={{ color: "#a8b4d8" }}>
            Нужна помощь с настройкой? Напиши на почту vexium.help@gmail.com
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
}
