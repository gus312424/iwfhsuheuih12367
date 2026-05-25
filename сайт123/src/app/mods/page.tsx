"use client";

import Link from "next/link";
import { Download, CheckCircle, AlertTriangle, ExternalLink, Cpu, FolderOpen, Play, Server, Package } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Cpu,
    title: "Установи Minecraft Forge 1.16.5",
    color: "#6c63ff",
    content: [
      "Перейди на официальный сайт Forge: forge.minecraftforge.net",
      "Скачай версию Forge для Minecraft 1.16.5 (раздел «Download Recommended»)",
      "Запусти скачанный .jar установщик",
      "Выбери «Install client» и нажми ОК",
      "Открой лаунчер Minecraft — в списке версий появится «forge-1.16.5»",
    ],
  },
  {
    num: "02",
    icon: Download,
    title: "Скачай модпак VEXIUM",
    color: "#4facfe",
    content: [
      "Нажми большую кнопку «Скачать модпак VEXIUM» на этой странице",
      "Сохрани архив vexium-modpack.zip в удобное место (например, на рабочий стол)",
      "Распакуй архив — получишь папку с модами и конфигами",
    ],
  },
  {
    num: "03",
    icon: FolderOpen,
    title: "Перенеси файлы в .minecraft",
    color: "#00f2fe",
    content: [
      "Открой папку .minecraft: нажми Win+R, введи %appdata%\\.minecraft и нажми Enter",
      "Из распакованного архива скопируй папку mods в папку .minecraft (если папка mods уже есть — замени/объедини)",
      "Если в архиве есть папки config, resourcepacks — перенеси их тоже",
      "Убедись что в .minecraft/mods лежат все .jar файлы из архива",
    ],
  },
  {
    num: "04",
    icon: Play,
    title: "Запусти Minecraft через Forge",
    color: "#68d391",
    content: [
      "Открой лаунчер Minecraft",
      "В выборе версии выбери «forge-1.16.5»",
      "Нажми «Играть»",
      "Дождись загрузки (первый запуск с модами занимает 2–5 минут — это нормально)",
    ],
  },
  {
    num: "05",
    icon: Server,
    title: "Зайди на сервер VEXIUM",
    color: "#f6ad55",
    content: [
      "В главном меню выбери «Мультиплеер»",
      "Нажми «Добавить сервер»",
      "Адрес сервера: play.vexium.ru",
      "Нажми «Готово» и подключайся!",
    ],
  },
];

export default function ModsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Заголовок */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.3)", color: "#a78bfa" }}
          >
            <Package size={16} />
            Minecraft 1.16.5 Forge · Моды обязательны
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            <span className="text-gradient">Скачивание модов</span>
          </h1>
          <p className="text-lg" style={{ color: "#7b87a8" }}>
            Чтобы играть на сервере, необходимо установить моды.
            <br />Следуй инструкции ниже — это займёт 5–10 минут.
          </p>
        </div>

        {/* Предупреждение */}
        <div
          className="flex items-start gap-4 p-5 rounded-2xl mb-10"
          style={{ background: "rgba(252,129,74,0.08)", border: "1px solid rgba(252,129,74,0.3)" }}
        >
          <AlertTriangle size={22} style={{ color: "#fc814a", flexShrink: 0, marginTop: 2 }} />
          <div>
            <div className="font-bold mb-1" style={{ color: "#fc814a" }}>Без модов сервер не пустит!</div>
            <p className="text-sm" style={{ color: "#a8b4d8" }}>
              Если тебя отключает при входе с ошибкой «mod mismatch» или «missing mods» —
              скачай модпак с этой страницы и следуй инструкции ниже.
            </p>
          </div>
        </div>

        {/* Большая кнопка скачивания */}
        <div
          className="rounded-2xl p-8 mb-12 text-center"
          style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(108,99,255,0.3)", backdropFilter: "blur(10px)" }}
        >
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-2xl font-black mb-2">Модпак VEXIUM</h2>
          <p className="text-sm mb-2" style={{ color: "#7b87a8" }}>
            Полная сборка модов для Minecraft 1.16.5 · Forge
          </p>
          <p className="text-xs mb-6" style={{ color: "#4a5568" }}>
            Версия: Сезон 1 · Размер: ~150–300 МБ
          </p>
            <a
              href="https://gofile.io/d/bBUbFh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-black transition-all duration-200 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #6c63ff, #4facfe)",
                color: "#fff",
                boxShadow: "0 8px 30px rgba(108,99,255,0.5)",
              }}
            >
              <Download size={22} />
              Скачать модпак VEXIUM
            </a>
            <div className="mt-6 rounded-xl p-4 text-left" style={{ background: "rgba(0,242,254,0.06)", border: "1px solid rgba(0,242,254,0.2)" }}>
              <p className="text-sm font-bold mb-2" style={{ color: "#4facfe" }}>После скачивания:</p>
              <ol className="text-sm space-y-1" style={{ color: "#a8b4d8" }}>
                <li>1. Распакуй архив</li>
                <li>2. Нажми <kbd className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: "rgba(255,255,255,0.08)" }}>Win + R</kbd>, введи <code className="px-1 rounded text-xs font-mono" style={{ background: "rgba(255,255,255,0.08)", color: "#4facfe" }}>%appdata%\.minecraft</code> и нажми Enter</li>
                <li>3. Перенеси все <code className="px-1 rounded text-xs font-mono" style={{ background: "rgba(255,255,255,0.08)", color: "#4facfe" }}>.jar</code> файлы из архива в папку <code className="px-1 rounded text-xs font-mono" style={{ background: "rgba(255,255,255,0.08)", color: "#4facfe" }}>mods</code></li>
              </ol>
            </div>
        </div>

        {/* Шаги */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Пошаговая <span className="text-gradient">инструкция</span>
        </h2>
        <div className="space-y-4 mb-12">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl p-6"
              style={{ background: "rgba(13,17,32,0.9)", border: `1px solid ${step.color}25`, backdropFilter: "blur(10px)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}
                >
                  <step.icon size={22} style={{ color: step.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-black" style={{ color: step.color }}>{step.num}</span>
                    <h3 className="font-bold text-lg">{step.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {step.content.map((line, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#a8b4d8" }}>
                        <CheckCircle size={14} style={{ color: step.color, flexShrink: 0, marginTop: 2 }} />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* IP сервера */}
        <div
          className="rounded-2xl p-6 mb-8 text-center"
          style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(0,255,136,0.3)" }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 10px #00ff88" }} />
            <span className="font-bold text-lg">Сервер онлайн</span>
          </div>
          <div
            className="inline-block font-mono text-xl font-black px-6 py-3 rounded-xl cursor-pointer select-all mb-2"
            style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88" }}
            onClick={() => navigator.clipboard?.writeText("play.vexium.ru")}
            title="Нажми чтобы скопировать"
          >
            play.vexium.ru
          </div>
          <p className="text-sm" style={{ color: "#7b87a8" }}>
            Версия: 1.16.5 Forge · Нажми на IP чтобы скопировать
          </p>
        </div>

        {/* Проблемы */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(108,99,255,0.2)" }}
        >
          <h3 className="font-bold text-lg mb-4" style={{ color: "#a8b4d8" }}>Частые проблемы</h3>
          <div className="space-y-3">
            {[
              {
                q: "Отключает с ошибкой «mod mismatch»",
                a: "Перекачай модпак заново. Версии модов на клиенте и сервере должны совпадать.",
              },
              {
                q: "Minecraft не запускается / вылетает",
                a: "Убедись что в лаунчере выделено минимум 4 ГБ оперативной памяти под Minecraft (настройки JVM: -Xmx4G).",
              },
              {
                q: "Не вижу версию Forge в лаунчере",
                a: "После установки Forge перезапусти лаунчер. Версия должна называться «forge-1.16.5-...»",
              },
              {
                q: "Ошибка «Could not connect to server»",
                a: "Проверь IP — play.vexium.ru без порта. Если не помогает — сервер временно недоступен, попробуй позже.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="font-semibold text-sm mb-1">{item.q}</div>
                <div className="text-sm" style={{ color: "#7b87a8" }}>{item.a}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" style={{ borderColor: "rgba(108,99,255,0.1)" }}>
            <span className="text-sm" style={{ color: "#7b87a8" }}>Остались вопросы? Напиши в поддержку</span>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: "#6c63ff" }}
            >
              Связаться с нами <ExternalLink size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
