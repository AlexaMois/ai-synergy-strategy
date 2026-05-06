// Config-driven questionnaire for НейроСтилист
// Replace QUIZ_QUESTIONS array contents to update questions without touching UI.

export type QuestionType = "single" | "multi" | "text" | "longtext";

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: QuestionOption[];
  placeholder?: string;
  required?: boolean;
  maxSelect?: number; // for multi
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: "mood",
    type: "single",
    title: "Какое настроение твоего образа сейчас ближе всего?",
    subtitle: "Выбери одно — то, что хочется носить чаще",
    required: true,
    options: [
      { value: "soft", label: "Мягкое и женственное" },
      { value: "strong", label: "Сильное и уверенное" },
      { value: "playful", label: "Игривое и лёгкое" },
      { value: "minimal", label: "Спокойное и минималистичное" },
      { value: "bold", label: "Дерзкое и яркое" },
      { value: "elegant", label: "Элегантное и сдержанное" },
    ],
  },
  {
    id: "colors_love",
    type: "multi",
    title: "Какие цвета ты любишь носить?",
    subtitle: "Можно выбрать несколько",
    maxSelect: 6,
    options: [
      { value: "black", label: "Чёрный" },
      { value: "white", label: "Белый и молочный" },
      { value: "beige", label: "Бежевый и карамель" },
      { value: "brown", label: "Шоколад и кофе" },
      { value: "pastel", label: "Пастельные" },
      { value: "burgundy", label: "Бордовый и сливовый" },
      { value: "rose", label: "Розовый" },
      { value: "blue", label: "Синий и джинс" },
      { value: "green", label: "Зелёный и оливковый" },
      { value: "bright", label: "Яркие акценты" },
    ],
  },
  {
    id: "colors_avoid",
    type: "text",
    title: "Есть ли цвета, которые ты точно не носишь?",
    placeholder: "Например: оранжевый, неоновый зелёный…",
  },
  {
    id: "silhouette",
    type: "multi",
    title: "Какие силуэты тебе нравятся?",
    subtitle: "Выбери всё, что откликается",
    maxSelect: 6,
    options: [
      { value: "fitted", label: "Облегающие" },
      { value: "loose", label: "Свободные и oversize" },
      { value: "wrap", label: "Запах и мягкие линии" },
      { value: "structured", label: "Структурные и графичные" },
      { value: "feminine", label: "Подчёркнуто женственные" },
      { value: "androgynous", label: "Андрогинные" },
      { value: "long", label: "Длинные и струящиеся" },
    ],
  },
  {
    id: "appearance",
    type: "longtext",
    title: "Расскажи о своей внешности",
    subtitle: "Цвет волос, глаз, тон кожи, рост, особенности фигуры — что считаешь важным",
    placeholder: "Например: тёмные волосы, светлая кожа, рост 168, фигура «песочные часы»…",
    required: true,
  },
  {
    id: "wardrobe",
    type: "longtext",
    title: "Что есть в твоём гардеробе сейчас?",
    subtitle: "Базовые вещи, любимые комплекты, чего не хватает",
    placeholder: "Расскажи свободно…",
  },
  {
    id: "makeup",
    type: "single",
    title: "Как ты обычно выглядишь по макияжу?",
    options: [
      { value: "none", label: "Почти без макияжа" },
      { value: "natural", label: "Натуральный, лёгкий" },
      { value: "daily", label: "Дневной, аккуратный" },
      { value: "expressive", label: "Выразительный, акценты" },
      { value: "evening", label: "Вечерний, яркий" },
    ],
  },
  {
    id: "hair",
    type: "single",
    title: "Как ты обычно носишь волосы?",
    options: [
      { value: "loose", label: "Распущенные" },
      { value: "ponytail", label: "Хвост или пучок" },
      { value: "styled", label: "С укладкой" },
      { value: "short", label: "Короткие, без укладки" },
      { value: "varies", label: "По-разному" },
    ],
  },
  {
    id: "accessories",
    type: "multi",
    title: "Какие аксессуары ты носишь?",
    maxSelect: 6,
    options: [
      { value: "earrings", label: "Серьги" },
      { value: "rings", label: "Кольца" },
      { value: "necklaces", label: "Цепочки и подвески" },
      { value: "bracelets", label: "Браслеты" },
      { value: "watch", label: "Часы" },
      { value: "scarves", label: "Платки и шарфы" },
      { value: "bags", label: "Сумки — это важно" },
      { value: "minimal", label: "Минимум, почти ничего" },
    ],
  },
  {
    id: "lifestyle",
    type: "longtext",
    title: "Как выглядит твой ритм жизни?",
    subtitle: "Работа, встречи, спорт, дети, путешествия — что чаще всего",
    placeholder: "Например: офис 3 дня в неделю, остальное удалёнка, спорт, ужины с друзьями…",
  },
  {
    id: "wishes",
    type: "longtext",
    title: "Что важно учесть в твоём образе?",
    subtitle: "Пожелания, ограничения, чего хочется добиться",
    placeholder: "Свободное поле…",
  },
  {
    id: "name",
    type: "text",
    title: "Как тебя зовут?",
    placeholder: "Имя",
    required: true,
  },
  {
    id: "contact",
    type: "text",
    title: "Как с тобой связаться?",
    subtitle: "Telegram-ник или телефон — Александра напишет в течение 24 часов",
    placeholder: "@nickname или +7 …",
    required: true,
  },
];