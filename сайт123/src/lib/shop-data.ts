// All shop items data for Vexium server

export type Duration = "2m" | "4m";

export interface Rank {
  id: string;
  nameRu: string;
  nameEn: string;
  price: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  homes: number;
  canCreateClan: boolean;
  rtpDesc: string;
  features: string[];
  popular?: boolean;
  badge?: string;
  ppEffects: PpEffect[];
}

export interface RankTier extends Rank {
  rankId: string;
  duration: Duration;
  durationLabel: string;
}

export interface PpEffect {
  id: string;
  name: string;
  description: string;
  inherited?: boolean;
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

export interface DonateCurrency {
  id: string;
  amount: number;
  bonus: number;
  price: number;
  popular?: boolean;
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
    rtpDesc: "Обычный /rtp без выбора миров",
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
    ppEffects: [
      { id: "flame_trail", name: "Огненный след", description: "Частицы пламени под ногами при ходьбе" },
    ],
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
    rtpDesc: "Обычный /rtp без выбора миров",
    prices: { "2m": 119, "4m": 199 },
    features: [
      "Всё что у Рыцаря",
      "/enderchest — открыть эндер-сундук",
      "/hat — надеть предмет на голову",
      "/workbench — переносной верстак",
    ],
    ppEffects: [
      { id: "flame_trail", name: "Огненный след", description: "Частицы пламени под ногами при ходьбе", inherited: true },
      { id: "leaf_aura", name: "Листва вокруг", description: "Листья кружатся вокруг игрока" },
    ],
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
    rtpDesc: "/rtp с увеличенным радиусом и попытками",
    prices: { "2m": 199, "4m": 339 },
    features: [
      "Всё что у Следопыта",
      "Создание кланов",
      "/itemdb — информация о предмете",
      "/recipe — рецепт крафта предмета",
    ],
    popular: true,
    badge: "Хит продаж",
    ppEffects: [
      { id: "flame_trail", name: "Огненный след", description: "Частицы пламени под ногами", inherited: true },
      { id: "leaf_aura", name: "Листва вокруг", description: "Листья кружатся вокруг игрока", inherited: true },
      { id: "water_ripple", name: "Водяная рябь", description: "Брызги воды при каждом шаге" },
    ],
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
    rtpDesc: "/rtp с увеличенным радиусом и попытками",
    prices: { "2m": 299, "4m": 499 },
    features: [
      "Всё что у Стража",
      "Цветной ник в чате",
      "Форматирование своего ника (цвет, стиль)",
    ],
    ppEffects: [
      { id: "flame_trail", name: "Огненный след", description: "Частицы пламени под ногами", inherited: true },
      { id: "leaf_aura", name: "Листва вокруг", description: "Листья кружатся вокруг игрока", inherited: true },
      { id: "water_ripple", name: "Водяная рябь", description: "Брызги воды при каждом шаге", inherited: true },
      { id: "lava_burst", name: "Лавовый взрыв", description: "Частицы лавы при прыжке" },
    ],
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
    rtpDesc: "/rtp с увеличенным радиусом и попытками",
    prices: { "2m": 399, "4m": 679 },
    features: [
      "Всё что у Титана",
      "/msgtoggle — отключить личные сообщения",
      "/ignore — заблокировать игрока",
      "Курсив/жирный шрифт в чате",
    ],
    ppEffects: [
      { id: "flame_trail", name: "Огненный след", description: "Частицы пламени под ногами", inherited: true },
      { id: "leaf_aura", name: "Листва вокруг", description: "Листья кружатся вокруг игрока", inherited: true },
      { id: "water_ripple", name: "Водяная рябь", description: "Брызги воды при каждом шаге", inherited: true },
      { id: "lava_burst", name: "Лавовый взрыв", description: "Частицы лавы при прыжке", inherited: true },
      { id: "magic_spiral", name: "Магическая спираль", description: "Фиолетовые частицы зачарования по спирали" },
    ],
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
    rtpDesc: "/rtp с максимальным радиусом",
    prices: { "2m": 549, "4m": 949 },
    features: [
      "Всё что у Мистика",
      "/nick — смена игрового ника",
      "Цветной текст в чате",
      "Расширенные цвета ника",
    ],
    ppEffects: [
      { id: "flame_trail", name: "Огненный след", description: "Частицы пламени под ногами", inherited: true },
      { id: "leaf_aura", name: "Листва вокруг", description: "Листья кружатся вокруг игрока", inherited: true },
      { id: "water_ripple", name: "Водяная рябь", description: "Брызги воды при каждом шаге", inherited: true },
      { id: "lava_burst", name: "Лавовый взрыв", description: "Частицы лавы при прыжке", inherited: true },
      { id: "magic_spiral", name: "Магическая спираль", description: "Фиолетовые частицы зачарования по спирали", inherited: true },
      { id: "heart_aura", name: "Аура сердец", description: "Сердечки парят вокруг игрока" },
    ],
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
    rtpDesc: "/rtp с максимальным радиусом",
    prices: { "2m": 749, "4m": 1299 },
    features: [
      "Всё что у Хранителя",
      "Максимум свободы по цветам/форматам",
      "Все форматы ника и чата",
      "VIP поддержка",
    ],
    ppEffects: [
      { id: "flame_trail", name: "Огненный след", description: "Частицы пламени под ногами", inherited: true },
      { id: "leaf_aura", name: "Листва вокруг", description: "Листья кружатся вокруг игрока", inherited: true },
      { id: "water_ripple", name: "Водяная рябь", description: "Брызги воды при каждом шаге", inherited: true },
      { id: "lava_burst", name: "Лавовый взрыв", description: "Частицы лавы при прыжке", inherited: true },
      { id: "magic_spiral", name: "Магическая спираль", description: "Фиолетовые частицы зачарования по спирали", inherited: true },
      { id: "heart_aura", name: "Аура сердец", description: "Сердечки парят вокруг игрока", inherited: true },
    ],
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
    rtpDesc: "/rtp — без ограничений",
    prices: { "2m": 999, "4m": 1699 },
    features: [
      "Всё что у Бессмертного",
      "Расширенный /me",
      "/itemname — переименовать предмет",
      "/itemlore — описание к предмету",
    ],
    badge: "Топ-выбор",
    ppEffects: [
      { id: "flame_trail", name: "Огненный след", description: "Частицы пламени под ногами", inherited: true },
      { id: "leaf_aura", name: "Листва вокруг", description: "Листья кружатся вокруг игрока", inherited: true },
      { id: "water_ripple", name: "Водяная рябь", description: "Брызги воды при каждом шаге", inherited: true },
      { id: "lava_burst", name: "Лавовый взрыв", description: "Частицы лавы при прыжке", inherited: true },
      { id: "magic_spiral", name: "Магическая спираль", description: "Фиолетовые частицы зачарования по спирали", inherited: true },
      { id: "heart_aura", name: "Аура сердец", description: "Сердечки парят вокруг игрока", inherited: true },
    ],
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
    rtpDesc: "/rtp — без ограничений",
    prices: { "2m": 1499, "4m": 2499 },
    features: [
      "Всё что у Повелителя",
      "Максимум косметики: все цвета/форматы",
      "Эксклюзивные декоративные команды",
      "Приоритет при особых возможностях",
      "Звание самого крутого на сервере",
    ],
    badge: "Легенда",
    ppEffects: [
      { id: "flame_trail", name: "Огненный след", description: "Частицы пламени под ногами", inherited: true },
      { id: "leaf_aura", name: "Листва вокруг", description: "Листья кружатся вокруг игрока", inherited: true },
      { id: "water_ripple", name: "Водяная рябь", description: "Брызги воды при каждом шаге", inherited: true },
      { id: "lava_burst", name: "Лавовый взрыв", description: "Частицы лавы при прыжке", inherited: true },
      { id: "magic_spiral", name: "Магическая спираль", description: "Фиолетовые частицы зачарования по спирали", inherited: true },
      { id: "heart_aura", name: "Аура сердец", description: "Сердечки парят вокруг игрока", inherited: true },
    ],
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
    rtpDesc: r.rtpDesc,
    features: r.features,
    popular: r.popular,
    badge: r.badge,
    ppEffects: r.ppEffects,
  }))
);

export const RANK_IDS = RANK_CONFIGS.map((r) => r.rankId);

// Для обратной совместимости — RANKS с ценами за 2 месяца
export const RANKS: Rank[] = RANK_CONFIGS.map((r) => ({
  id: r.rankId,
  nameRu: r.nameRu,
  nameEn: r.nameEn,
  price: r.prices["2m"],
  color: r.color,
  gradientFrom: r.gradientFrom,
  gradientTo: r.gradientTo,
  homes: r.homes,
  canCreateClan: r.canCreateClan,
  rtpDesc: r.rtpDesc,
  features: r.features,
  popular: r.popular,
  badge: r.badge,
  ppEffects: r.ppEffects,
}));

export const DONATE_KEYS: DonateKey[] = [
  {
    id: "key-donat",
    name: "Ключ Донат",
    price: 125,
    color: "#9f7aea",
    gradientFrom: "#9f7aea",
    gradientTo: "#b794f4",
    icon: "🗝️",
    description: "Открой донат-кейс и получи случайный временный ранг на 30 дней.",
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
    description: "Открой шалкер-кейс и получи набор ресурсов в шалкерах.",
    features: [
      "Шалкер с алмазами (32–64шт)",
      "Шалкер с железом (3 стака)",
      "Шалкер с едой на выбор",
      "Шалкер с редкими материалами",
      "Бонус: случайный зачарованный инструмент",
    ],
  },
];

// Оставляем для совместимости (старый код использует DONATE_CASES)
export const DONATE_CASES = DONATE_KEYS.map((k) => ({
  id: k.id,
  name: k.name,
  description: k.description,
  price: k.price,
  items: k.features,
  color: k.color,
  icon: k.icon,
}));

export const DONATE_CURRENCY: DonateCurrency[] = [
  { id: "dc-100", amount: 100, bonus: 0, price: 49 },
  { id: "dc-300", amount: 300, bonus: 30, price: 139, popular: true },
  { id: "dc-600", amount: 600, bonus: 100, price: 269 },
  { id: "dc-1000", amount: 1000, bonus: 200, price: 429 },
  { id: "dc-2500", amount: 2500, bonus: 750, price: 999 },
];
