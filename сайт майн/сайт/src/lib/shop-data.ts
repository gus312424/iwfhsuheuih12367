// Все данные магазина VEXIUM

export type Duration = "2m" | "4m";

export interface RankTier {
  id: string;             // rytsar-2m, rytsar-4m
  rankId: string;         // rytsar
  nameRu: string;         // Рыцарь
  nameEn: string;         // Rytsar
  duration: Duration;
  durationLabel: string;  // "2 месяца" / "4 месяца"
  price: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  homes: number;
  canCreateClan: boolean;
  features: string[];
  popular?: boolean;
  badge?: string;
  description: string;
}

export interface DonateKey {
  id: string;
  name: string;
  price: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
  description: string;
  features: string[];
}

// ——— Конфигурация рангов ———
const RANK_CONFIGS = [
  {
    rankId: "rytsar",
    nameRu: "Рыцарь",
    nameEn: "Rytsar",
    color: "#7b93c4",
    gradientFrom: "#7b93c4",
    gradientTo: "#9bb5e8",
    homes: 2,
    canCreateClan: false,
    prices: { "2m": 59, "4m": 99 },
    features: [
      "/compass — показывает компас",
      "/depth — глубина под поверхностью",
      "/biome — текущий биом",
      "/getpos — точные координаты",
      "Все базовые команды: /spawn, /sethome, /home",
      "/tpa, /tpaccept, /tpdeny",
      "/warp, /bal, /pay, /msg, /r",
    ],
    description: "Комфортный донат для выживания на VEXIUM без Pay2Win. Базовые привилегии для новичков.",
  },
  {
    rankId: "sledopyt",
    nameRu: "Следопыт",
    nameEn: "Sledopyt",
    color: "#68d391",
    gradientFrom: "#68d391",
    gradientTo: "#9ae6b4",
    homes: 3,
    canCreateClan: false,
    prices: { "2m": 119, "4m": 199 },
    features: [
      "Всё что у Рыцаря",
      "/enderchest — открыть эндер-сундук",
      "/hat — надеть предмет на голову",
      "/workbench — переносной верстак",
    ],
    description: "Улучшенный набор команд для уверенного выживания на VEXIUM.",
  },
  {
    rankId: "strazh",
    nameRu: "Страж",
    nameEn: "Strazh",
    color: "#4299e1",
    gradientFrom: "#4299e1",
    gradientTo: "#63b3ed",
    homes: 4,
    canCreateClan: true,
    prices: { "2m": 199, "4m": 339 },
    features: [
      "Всё что у Следопыта",
      "Создание кланов",
      "/itemdb — информация о предмете",
      "/recipe — рецепт крафта предмета",
    ],
    description: "Создавай кланы и захватывай территории на сервере VEXIUM.",
    popular: true,
    badge: "Хит продаж",
  },
  {
    rankId: "titan",
    nameRu: "Титан",
    nameEn: "Titan",
    color: "#ed8936",
    gradientFrom: "#ed8936",
    gradientTo: "#f6ad55",
    homes: 5,
    canCreateClan: true,
    prices: { "2m": 299, "4m": 499 },
    features: [
      "Всё что у Стража",
      "Цветной ник в чате",
      "Форматирование своего ника (цвет, стиль)",
    ],
    description: "Выделись цветным ником и расширенными командами на VEXIUM.",
  },
  {
    rankId: "mistik",
    nameRu: "Мистик",
    nameEn: "Mistik",
    color: "#9f7aea",
    gradientFrom: "#9f7aea",
    gradientTo: "#b794f4",
    homes: 6,
    canCreateClan: true,
    prices: { "2m": 399, "4m": 679 },
    features: [
      "Всё что у Титана",
      "/msgtoggle — отключить личные сообщения",
      "/ignore — заблокировать игрока",
      "Курсив/жирный шрифт в чате",
    ],
    description: "Расширенное форматирование чата и дополнительный комфорт игры.",
  },
  {
    rankId: "hranitel",
    nameRu: "Хранитель",
    nameEn: "Hranitel",
    color: "#f687b3",
    gradientFrom: "#f687b3",
    gradientTo: "#fbb6ce",
    homes: 7,
    canCreateClan: true,
    prices: { "2m": 549, "4m": 949 },
    features: [
      "Всё что у Мистика",
      "/nick — смена игрового ника",
      "Цветной текст в чате",
      "Расширенные цвета ника",
    ],
    description: "Полная свобода кастомизации ника и чата на VEXIUM.",
  },
  {
    rankId: "bessmertny",
    nameRu: "Бессмертный",
    nameEn: "Bessmertny",
    color: "#fc8181",
    gradientFrom: "#fc8181",
    gradientTo: "#fed7d7",
    homes: 8,
    canCreateClan: true,
    prices: { "2m": 749, "4m": 1299 },
    features: [
      "Всё что у Хранителя",
      "Максимум свободы по цветам/форматам",
      "Все форматы ника и чата",
      "VIP поддержка",
    ],
    description: "VIP-статус и максимум возможностей для кастомизации на VEXIUM.",
  },
  {
    rankId: "povelitel",
    nameRu: "Повелитель",
    nameEn: "Povelitel",
    color: "#ffd700",
    gradientFrom: "#ffd700",
    gradientTo: "#ffb347",
    homes: 9,
    canCreateClan: true,
    prices: { "2m": 999, "4m": 1699 },
    features: [
      "Всё что у Бессмертного",
      "Расширенный /me",
      "/itemname — переименовать предмет",
      "/itemlore — описание к предмету",
    ],
    description: "Элитный ранг с уникальными командами для настоящих властителей VEXIUM.",
    badge: "Топ-выбор",
  },
  {
    rankId: "arhont",
    nameRu: "Архонт",
    nameEn: "Arhont",
    color: "#ffffff",
    gradientFrom: "#6c63ff",
    gradientTo: "#ffd700",
    homes: 10,
    canCreateClan: true,
    prices: { "2m": 1499, "4m": 2499 },
    features: [
      "Всё что у Повелителя",
      "Максимум косметики: все цвета/форматы",
      "Эксклюзивные декоративные команды",
      "Приоритет при особых возможностях",
      "Звание самого крутого на сервере",
    ],
    description: "Легендарный статус сервера VEXIUM. Эксклюзивные привилегии первого сезона.",
    badge: "Легенда",
  },
];

// Генерируем RankTier для каждого ранга и каждого срока
export const RANK_TIERS: RankTier[] = RANK_CONFIGS.flatMap((r) =>
  (["2m", "4m"] as Duration[]).map((dur) => ({
    id: `${r.rankId}-${dur}`,
    rankId: r.rankId,
    nameRu: r.nameRu,
    nameEn: r.nameEn,
    duration: dur,
    durationLabel: dur === "2m" ? "2 месяца" : "4 месяца",
    price: r.prices[dur],
    color: r.color,
    gradientFrom: r.gradientFrom,
    gradientTo: r.gradientTo,
    homes: r.homes,
    canCreateClan: r.canCreateClan,
    features: r.features,
    popular: r.popular,
    badge: r.badge,
    description: r.description,
  }))
);

// Удобный доступ к рангам сгруппированным по rankId
export const RANKS_BY_ID = RANK_CONFIGS.reduce((acc, r) => {
  acc[r.rankId] = r;
  return acc;
}, {} as Record<string, (typeof RANK_CONFIGS)[number]>);

export const RANK_IDS = RANK_CONFIGS.map((r) => r.rankId);

export const DONATE_KEYS: DonateKey[] = [
  {
    id: "key-donat",
    name: "Ключ Донат",
    price: 125,
    color: "#9f7aea",
    gradientFrom: "#9f7aea",
    gradientTo: "#b794f4",
    icon: "🗝️",
    description: "Открой донат-кейс и получи случайный временный ранг на 30 дней. Шанс выпасть редкому рангу реален.",
    features: [
      "Рыцарь (30 дней) — 30%",
      "Следопыт (30 дней) — 20%",
      "Страж (30 дней) — 15%",
      "Титан (30 дней) — 12%",
      "Мистик (30 дней) — 10%",
      "Хранитель (30 дней) — 7%",
      "Бессмертный (30 дней) — 4%",
      "Повелитель (30 дней) — 1.5%",
      "Архонт (30 дней) — 0.5%",
    ],
  },
  {
    id: "key-shulker",
    name: "Ключ Шалкер",
    price: 200,
    color: "#4facfe",
    gradientFrom: "#4facfe",
    gradientTo: "#00f2fe",
    icon: "📦",
    description: "Открой шалкер-кейс и получи набор ресурсов в шалкерах. Идеально для старта в первом сезоне VEXIUM.",
    features: [
      "Шалкер с алмазами (32–64шт)",
      "Шалкер с железом (3 стака)",
      "Шалкер с едой на выбор",
      "Шалкер с редкими материалами",
      "Бонус: случайный зачарованный инструмент",
    ],
  },
];

// Оставляем для обратной совместимости (могут использоваться в других местах)
export const RANKS = RANK_CONFIGS.map((r) => ({
  id: r.rankId,
  nameRu: r.nameRu,
  nameEn: r.nameEn,
  price: r.prices["2m"],
  color: r.color,
  gradientFrom: r.gradientFrom,
  gradientTo: r.gradientTo,
  homes: r.homes,
  canCreateClan: r.canCreateClan,
  rtpDesc: "",
  features: r.features,
  popular: r.popular,
  badge: r.badge,
}));
