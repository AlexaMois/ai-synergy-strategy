// Config-driven questionnaire for НейроСтилист
// Source of truth — change here to update the quiz UI.

export type QuestionType =
  | "welcome"
  | "single"
  | "multi"
  | "text"
  | "longtext"
  | "scale"
  | "multifield"
  | "photo"
  | "review_items"
  | "single_with_other";

export interface QuestionOption {
  value: string;
  label: string;
}

export interface FieldDef {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "tel";
}

export interface PhotoTypeOption {
  value: string;
  label: string;
}

export interface ReviewItemQuestionOption {
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
  maxSelect?: number;
  section?: string;
  ctaLabel?: string;
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: Record<number, string>;
  fields?: FieldDef[];
  photoTypes?: PhotoTypeOption[];
  maxPhotos?: number;
  photoHint?: string[];
  maxItems?: number;
  reviewQuestionOptions?: ReviewItemQuestionOption[];
  otherValue?: string;
  otherPlaceholder?: string;
}

// ---- Section labels (used for progress display + Telegram grouping) ----
export const SECTIONS = [
  "Данные клиентки",
  "Образ жизни",
  "Желаемый образ",
  "Силуэт и посадка",
  "Цвета",
  "Гардероб",
  "Покупки и бюджет",
  "Волосы и макияж",
  "Стилевые режимы",
  "Фото",
  "5 вещей для разбора",
  "Финальный комментарий",
] as const;

// ---- Shared option sets ----
const STYLE_MODE_OPTIONS: QuestionOption[] = [
  { value: "everyday_base", label: "База на каждый день" },
  { value: "sport_casual", label: "Спорт / кэжуал" },
  { value: "city_bold", label: "Городская дерзость" },
  { value: "romantic", label: "Романтика" },
  { value: "business_status", label: "Бизнес / статус" },
  { value: "evening_out", label: "Вечер / выход" },
  { value: "bright_accents", label: "Яркие акценты" },
  { value: "event_shoot", label: "Событие / фотосессия" },
  { value: "travel", label: "Путешествия" },
  { value: "home_comfort", label: "Дом / комфорт" },
];

export const PHOTO_TYPES: PhotoTypeOption[] = [
  { value: "face", label: "Лицо / портрет" },
  { value: "full", label: "Полный рост" },
  { value: "outfit_like", label: "Мой образ, который нравится" },
  { value: "outfit_dislike", label: "Мой образ, который не нравится" },
  { value: "wardrobe_item", label: "Вещь из моего гардероба" },
  { value: "item_for_review", label: "Вещь на разбор" },
  { value: "want_to_buy", label: "Вещь, которую хочу купить" },
  { value: "reference", label: "Референс / нравится настроение" },
  { value: "event_outfit", label: "Разовый образ / мероприятие" },
  { value: "other", label: "Другое" },
];

const REVIEW_QUESTION_OPTIONS: ReviewItemQuestionOption[] = [
  { value: "keep_or_remove", label: "Оставить или убрать" },
  { value: "what_to_wear", label: "С чем носить" },
  { value: "modernize", label: "Как осовременить" },
  { value: "color_fit", label: "Подходит ли по цвету" },
  { value: "shape_fit", label: "Подходит ли по фигуре" },
  { value: "buy_pair", label: "Стоит ли докупить к ней пару" },
  { value: "for_work", label: "Можно ли носить на работу" },
  { value: "for_evening", label: "Можно ли носить на выход" },
  { value: "other", label: "Другое" },
];

export const QUIZ_QUESTIONS: Question[] = [
  // Welcome
  {
    id: "welcome",
    type: "welcome",
    title: "Начинаем собирать твой образ",
    subtitle:
      "Ответы помогут понять твой стиль, внешность, характер, ритм жизни и детали, которые делают образ сильнее.",
    ctaLabel: "Начать",
  },

  // ===== 1. Данные клиентки =====
  {
    id: "contacts",
    section: "Данные клиентки",
    type: "multifield",
    title: "Как с тобой связаться",
    subtitle: "Эти данные нужны, чтобы прислать готовый разбор",
    required: true,
    fields: [
      { id: "name", label: "Имя", placeholder: "Имя", required: true },
      { id: "contact", label: "Телефон или Telegram", placeholder: "@nickname или +7 …", required: true },
      { id: "city", label: "Город", placeholder: "Город", required: true },
    ],
  },
  {
    id: "client_data",
    section: "Данные клиентки",
    type: "multifield",
    title: "Параметры и размеры",
    subtitle: "Базовые данные — помогают точнее подобрать посадку",
    required: true,
    fields: [
      { id: "age", label: "Возраст", placeholder: "Например: 32", required: true },
      { id: "height", label: "Рост, см", placeholder: "Например: 168", required: true },
      { id: "clothing_size", label: "Размер одежды", placeholder: "Например: M / 44", required: true },
      { id: "shoe_size", label: "Размер обуви", placeholder: "Например: 38", required: true },
      { id: "measurements", label: "Параметры: грудь / талия / бёдра", placeholder: "По желанию" },
      { id: "weight", label: "Вес, кг", placeholder: "По желанию" },
    ],
  },
  {
    id: "weight_change",
    section: "Данные клиентки",
    type: "single",
    title: "Менялся ли вес за последние 6–12 месяцев?",
    options: [
      { value: "stable", label: "Вес стабилен" },
      { value: "slightly", label: "Немного меняется" },
      { value: "losing", label: "Сейчас худею" },
      { value: "gaining", label: "Сейчас набираю" },
      { value: "after_birth", label: "После родов / восстановления" },
      { value: "skip", label: "Не хочу отвечать" },
    ],
  },

  // ===== 2. Образ жизни =====
  {
    id: "occupation",
    section: "Образ жизни",
    type: "longtext",
    title: "Чем вы занимаетесь?",
    subtitle: "Работа, бизнес, декрет, учёба, публичная деятельность, свободный график и т.д.",
    placeholder: "Несколько слов о роде деятельности",
    required: true,
  },
  {
    id: "work_format",
    section: "Образ жизни",
    type: "multi",
    title: "Какой у вас формат жизни и работы?",
    required: true,
    maxSelect: 8,
    options: [
      { value: "office", label: "Офис" },
      { value: "remote", label: "Удалёнка" },
      { value: "own_business", label: "Своё дело" },
      { value: "frequent_meetings", label: "Частые встречи" },
      { value: "city_moves", label: "Много перемещаюсь по городу" },
      { value: "home_family", label: "Дом / семья / дети" },
      { value: "sport_active", label: "Спорт / активный день" },
      { value: "public_speaking", label: "Публичные выступления" },
      { value: "events", label: "Мероприятия" },
      { value: "other", label: "Другое" },
    ],
  },
  {
    id: "dress_code",
    section: "Образ жизни",
    type: "single",
    title: "Есть ли дресс-код?",
    required: true,
    options: [
      { value: "strict", label: "Да, строгий" },
      { value: "soft", label: "Да, мягкий" },
      { value: "none", label: "Нет" },
      { value: "sometimes", label: "Иногда" },
      { value: "collected_no_code", label: "Хочу выглядеть собранно, даже без дресс-кода" },
    ],
  },
  {
    id: "life_scenarios",
    section: "Образ жизни",
    type: "multi",
    title: "Для каких 3 сценариев в первую очередь нужен стиль?",
    subtitle: "Максимум 3 варианта",
    required: true,
    maxSelect: 3,
    options: [
      { value: "work", label: "Работа" },
      { value: "business_meetings", label: "Деловые встречи" },
      { value: "everyday_city", label: "Город на каждый день" },
      { value: "walks", label: "Прогулки" },
      { value: "dates", label: "Свидания" },
      { value: "restaurant_evening", label: "Ресторан / вечер" },
      { value: "sport_active", label: "Спорт / активный день" },
      { value: "travel", label: "Поездки" },
      { value: "events", label: "Мероприятия" },
      { value: "photoshoot", label: "Фотосессия" },
      { value: "home_comfort", label: "Дом / комфорт" },
      { value: "family_kids", label: "Семья / дети" },
      { value: "public_speaking", label: "Публичные выступления" },
      { value: "other", label: "Другое" },
    ],
  },

  // ===== 3. Желаемый образ =====
  {
    id: "goal",
    section: "Желаемый образ",
    type: "multi",
    title: "Какой образ хочется собрать?",
    subtitle: "Выбери то, что откликается",
    required: true,
    maxSelect: 6,
    options: [
      { value: "modern", label: "Современный" },
      { value: "expensive", label: "Дорогой" },
      { value: "feminine", label: "Женственный" },
      { value: "bold", label: "Дерзкий" },
      { value: "sexy", label: "Сексуальный" },
      { value: "soft", label: "Мягкий" },
      { value: "status", label: "Статусный" },
      { value: "creative", label: "Творческий" },
      { value: "free", label: "Свободный" },
      { value: "collected", label: "Собранный" },
      { value: "bright", label: "Яркий" },
      { value: "calm_character", label: "Спокойный с характером" },
    ],
  },
  {
    id: "impression",
    section: "Желаемый образ",
    type: "multi",
    title: "Какое впечатление должен создавать твой образ?",
    required: true,
    maxSelect: 6,
    options: [
      { value: "confident", label: "Уверенная" },
      { value: "expensive", label: "Дорогая" },
      { value: "noticeable", label: "Заметная" },
      { value: "feminine", label: "Женственная" },
      { value: "mysterious", label: "Загадочная" },
      { value: "light", label: "Лёгкая" },
      { value: "strong", label: "Сильная" },
      { value: "creative", label: "Творческая" },
      { value: "free", label: "Свободная" },
      { value: "sexy", label: "Сексуальная" },
      { value: "intellectual", label: "Интеллектуальная" },
      { value: "groomed", label: "Ухоженная" },
    ],
  },
  {
    id: "boldness",
    section: "Желаемый образ",
    type: "scale",
    title: "Насколько смело собираем образ?",
    subtitle: "Шкала от 1 до 10",
    required: true,
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: { 1: "мягкое обновление", 5: "заметное обновление", 10: "вау-образ" },
  },
  {
    id: "wardrobe_change",
    section: "Желаемый образ",
    type: "multi",
    title: "Что сейчас хочется изменить в гардеробе?",
    required: true,
    maxSelect: 6,
    options: [
      { value: "more_color", label: "Добавить цвета" },
      { value: "more_feminine", label: "Добавить женственности" },
      { value: "more_bold", label: "Добавить дерзости" },
      { value: "look_more_expensive", label: "Выглядеть дороже" },
      { value: "everyday_looks", label: "Собрать образы на каждый день" },
      { value: "work_looks", label: "Собрать образы для работы" },
      { value: "date_looks", label: "Собрать образы для свиданий" },
      { value: "accessories", label: "Добавить аксессуары" },
      { value: "makeup_hair", label: "Обновить макияж и волосы" },
      { value: "whole_style", label: "Собрать цельный стиль" },
    ],
  },
  {
    id: "lifestyle",
    section: "Желаемый образ",
    type: "multi",
    title: "Где образ должен работать чаще всего?",
    maxSelect: 6,
    options: [
      { value: "work", label: "Работа" },
      { value: "meetings", label: "Встречи" },
      { value: "dates", label: "Свидания" },
      { value: "walks", label: "Прогулки" },
      { value: "events", label: "Мероприятия" },
      { value: "shoots", label: "Съёмки" },
      { value: "social", label: "Соцсети" },
      { value: "travel", label: "Путешествия" },
      { value: "everyday", label: "Повседневная жизнь" },
      { value: "all", label: "Всё вместе" },
    ],
  },
  {
    id: "avoid_image",
    section: "Желаемый образ",
    type: "multi",
    title: "Что точно не хочется видеть в образе?",
    maxSelect: 10,
    options: [
      { value: "too_strict", label: "Слишком строго" },
      { value: "too_boring", label: "Слишком скучно" },
      { value: "too_mature", label: "Слишком взросло" },
      { value: "too_sexy", label: "Слишком сексуально" },
      { value: "too_sporty", label: "Слишком спортивно" },
      { value: "too_bright", label: "Слишком ярко" },
      { value: "too_simple", label: "Слишком просто" },
      { value: "too_romantic", label: "Слишком романтично" },
      { value: "too_official", label: "Слишком официально" },
      { value: "too_youth", label: "Слишком молодёжно" },
      { value: "other", label: "Другое" },
    ],
  },
  {
    id: "disliked_looks",
    section: "Желаемый образ",
    type: "longtext",
    title: "Какие образы вам точно не нравятся?",
    placeholder: "Можно написать своими словами или привести примеры",
  },
  {
    id: "final_phrase",
    section: "Желаемый образ",
    type: "single_with_other",
    title: "Какой фразой хочется описать новый образ?",
    required: true,
    otherValue: "own",
    otherPlaceholder: "Свой вариант…",
    options: [
      { value: "expensive_free", label: "Я выгляжу дороже и свободнее" },
      { value: "bright_collected", label: "Я выгляжу ярче и собраннее" },
      { value: "feminine_strong", label: "Я выгляжу женственнее и сильнее" },
      { value: "modern_character", label: "Я выгляжу современно и с характером" },
      { value: "as_wanted", label: "Я выгляжу так, как давно хотела" },
      { value: "own", label: "Свой вариант" },
    ],
  },

  // ===== 4. Силуэт и посадка =====
  {
    id: "highlight_zones",
    section: "Силуэт и посадка",
    type: "multi",
    title: "Какие зоны хочется подчеркнуть?",
    required: true,
    maxSelect: 5,
    options: [
      { value: "waist", label: "Талия" },
      { value: "legs", label: "Ноги" },
      { value: "shoulders", label: "Плечи" },
      { value: "collarbones", label: "Ключицы" },
      { value: "back", label: "Спина" },
      { value: "chest", label: "Грудь" },
      { value: "hips", label: "Бёдра" },
      { value: "face", label: "Лицо" },
      { value: "arms", label: "Руки" },
    ],
  },
  {
    id: "fit",
    section: "Силуэт и посадка",
    type: "multi",
    title: "Что важно по посадке?",
    required: true,
    maxSelect: 5,
    options: [
      { value: "all_day_comfort", label: "Комфорт на весь день" },
      { value: "chest_support", label: "Поддержка груди" },
      { value: "loose_fit", label: "Свободная посадка" },
      { value: "waist_accent", label: "Акцент на талии" },
      { value: "open_back", label: "Открытая спина" },
      { value: "open_shoulders", label: "Открытые плечи" },
      { value: "soft_fabric", label: "Мягкая ткань" },
      { value: "structured", label: "Чёткая форма" },
    ],
  },
  {
    id: "never_wear",
    section: "Силуэт и посадка",
    type: "multi",
    title: "Что вы точно не носите?",
    required: true,
    maxSelect: 16,
    options: [
      { value: "heels", label: "Каблуки" },
      { value: "mini", label: "Мини" },
      { value: "deep_neckline", label: "Глубокое декольте" },
      { value: "open_belly", label: "Открытый живот" },
      { value: "tight", label: "Облегающее" },
      { value: "oversize", label: "Оверсайз" },
      { value: "bright_colors", label: "Яркие цвета" },
      { value: "prints", label: "Принты" },
      { value: "synthetic", label: "Синтетику" },
      { value: "dresses", label: "Платья" },
      { value: "skirts", label: "Юбки" },
      { value: "jeans", label: "Джинсы" },
      { value: "suits", label: "Костюмы" },
      { value: "leather", label: "Кожу" },
      { value: "massive_jewelry", label: "Массивные украшения" },
      { value: "other", label: "Другое" },
    ],
  },
  {
    id: "physical_discomfort",
    section: "Силуэт и посадка",
    type: "longtext",
    title: "Какие вещи физически неудобны?",
    placeholder: "Например: жмёт талия, натирает обувь, неудобны каблуки, не люблю плотные ткани",
  },

  // ===== 5. Цвета =====
  {
    id: "colors",
    section: "Цвета",
    type: "longtext",
    title: "Какие цвета тебе нравятся?",
    subtitle: "Например: сливовый, фиолетовый, молочный, шоколадный, голубой, красный, чёрный",
    placeholder: "Перечисли свободно…",
    required: true,
  },
  {
    id: "colors_compliments",
    section: "Цвета",
    type: "longtext",
    title: "В каких цветах вам чаще делают комплименты?",
    placeholder: "Перечисли свободно…",
  },
  {
    id: "colors_disliked",
    section: "Цвета",
    type: "longtext",
    title: "Какие цвета вы не любите?",
    required: true,
    placeholder: "Перечисли свободно…",
  },
  {
    id: "colors_to_test",
    section: "Цвета",
    type: "longtext",
    title: "Какие цвета хотите проверить — идут вам или нет?",
    placeholder: "Например: сиреневый, сливовый, красный, молочный, голубой",
  },
  {
    id: "brightness_readiness",
    section: "Цвета",
    type: "scale",
    title: "Насколько готовы к ярким цветам?",
    subtitle: "1 — только спокойные, 10 — готова к ярким акцентам",
    required: true,
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: { 1: "только спокойные", 5: "сдержанные акценты", 10: "готова к ярким" },
  },

  // ===== 6. Гардероб =====
  {
    id: "clothes",
    section: "Гардероб",
    type: "multi",
    title: "Какие вещи ты носишь чаще всего?",
    required: true,
    maxSelect: 8,
    options: [
      { value: "jeans", label: "Джинсы" },
      { value: "trousers", label: "Брюки" },
      { value: "dresses", label: "Платья" },
      { value: "skirts", label: "Юбки" },
      { value: "shirts", label: "Рубашки" },
      { value: "jackets", label: "Жакеты" },
      { value: "tshirts", label: "Футболки" },
      { value: "hoodies", label: "Худи" },
      { value: "suits", label: "Костюмы" },
      { value: "tops", label: "Топы" },
      { value: "leather", label: "Кожаные вещи" },
      { value: "sport", label: "Спортивные вещи" },
    ],
  },
  {
    id: "orphan_items",
    section: "Гардероб",
    type: "longtext",
    title: "Какие вещи есть, но не знаете, с чем их носить?",
    placeholder: "Перечисли свободно…",
  },
  {
    id: "unused_items",
    section: "Гардероб",
    type: "longtext",
    title: "Какие вещи покупали, но почти не носите?",
    placeholder: "Перечисли свободно…",
  },
  {
    id: "keep_in_style",
    section: "Гардероб",
    type: "longtext",
    title: "Что хочется оставить в своём стиле?",
    placeholder: "Перечисли свободно…",
  },
  {
    id: "replace_items",
    section: "Гардероб",
    type: "longtext",
    title: "Что хочется заменить или убрать из гардероба?",
    placeholder: "Перечисли свободно…",
  },

  // ===== 7. Покупки и бюджет =====
  {
    id: "shopping_places",
    section: "Покупки и бюджет",
    type: "multi",
    title: "Где обычно покупаете одежду?",
    required: true,
    maxSelect: 15,
    options: [
      { value: "wildberries", label: "Wildberries" },
      { value: "ozon", label: "Ozon" },
      { value: "lamoda", label: "Lamoda" },
      { value: "lime", label: "Lime" },
      { value: "zarina", label: "Zarina" },
      { value: "love_republic", label: "Love Republic" },
      { value: "12storeez", label: "12Storeez" },
      { value: "befree", label: "Befree" },
      { value: "gloria_jeans", label: "Gloria Jeans" },
      { value: "sela", label: "Sela" },
      { value: "ru_designers", label: "Российские дизайнеры" },
      { value: "massmarket", label: "Массмаркет" },
      { value: "premium", label: "Премиум" },
      { value: "resale", label: "Ресейл / секонд" },
      { value: "other", label: "Другое" },
    ],
  },
  {
    id: "budget_per_item",
    section: "Покупки и бюджет",
    type: "single",
    title: "Комфортный бюджет на одну вещь",
    required: true,
    options: [
      { value: "u2k", label: "До 2 000 ₽" },
      { value: "2_5k", label: "2 000 – 5 000 ₽" },
      { value: "5_10k", label: "5 000 – 10 000 ₽" },
      { value: "10_20k", label: "10 000 – 20 000 ₽" },
      { value: "20k_plus", label: "20 000 ₽ и выше" },
      { value: "depends", label: "Зависит от вещи" },
    ],
  },
  {
    id: "budget_wardrobe",
    section: "Покупки и бюджет",
    type: "single",
    title: "Бюджет на обновление гардероба в ближайшее время",
    options: [
      { value: "sort_first", label: "Пока хочу разобраться с тем, что есть" },
      { value: "u10k", label: "До 10 000 ₽" },
      { value: "10_30k", label: "10 000 – 30 000 ₽" },
      { value: "30_50k", label: "30 000 – 50 000 ₽" },
      { value: "50_100k", label: "50 000 – 100 000 ₽" },
      { value: "100k_plus", label: "100 000 ₽ и выше" },
      { value: "undecided", label: "Пока не решила" },
    ],
  },
  {
    id: "priorities_to_buy",
    section: "Покупки и бюджет",
    type: "multi",
    title: "Что хочется докупить в первую очередь?",
    maxSelect: 14,
    options: [
      { value: "tops", label: "Верх" },
      { value: "bottoms", label: "Низ" },
      { value: "dresses", label: "Платья" },
      { value: "jackets", label: "Жакеты" },
      { value: "outerwear", label: "Верхняя одежда" },
      { value: "shoes", label: "Обувь" },
      { value: "bags", label: "Сумки" },
      { value: "jewelry", label: "Украшения" },
      { value: "belts", label: "Ремни" },
      { value: "base", label: "База под одежду" },
      { value: "work", label: "Вещи для работы" },
      { value: "evening", label: "Вещи для выхода" },
      { value: "active", label: "Вещи для активного дня" },
      { value: "dont_know", label: "Пока не знаю" },
    ],
  },

  // ===== 8. Волосы и макияж =====
  {
    id: "makeup",
    section: "Волосы и макияж",
    type: "single",
    title: "Какой макияж тебе ближе?",
    required: true,
    options: [
      { value: "natural", label: "Натуральный" },
      { value: "glow", label: "Сияющий" },
      { value: "eyes", label: "С акцентом на глаза" },
      { value: "lips", label: "С акцентом на губы" },
      { value: "soft_evening", label: "Мягкий вечерний" },
      { value: "graphic", label: "Графичный" },
      { value: "fresh", label: "Свежий на каждый день" },
    ],
  },
  {
    id: "makeup_change",
    section: "Волосы и макияж",
    type: "longtext",
    title: "Что хочется изменить в макияже?",
    placeholder: "По желанию",
  },
  {
    id: "hair",
    section: "Волосы и макияж",
    type: "single",
    title: "Что хочется по волосам?",
    required: true,
    options: [
      { value: "keep", label: "Сохранить текущую форму" },
      { value: "update_style", label: "Обновить укладку" },
      { value: "more_volume", label: "Добавить объём" },
      { value: "new_cut", label: "Изменить стрижку" },
      { value: "new_color", label: "Изменить цвет" },
      { value: "face_shape", label: "Подобрать форму у лица" },
    ],
  },
  {
    id: "hair_length",
    section: "Волосы и макияж",
    type: "single",
    title: "Текущая длина волос",
    options: [
      { value: "short", label: "Короткие" },
      { value: "to_shoulders", label: "До плеч" },
      { value: "below_shoulders", label: "Ниже плеч" },
      { value: "long", label: "Длинные" },
      { value: "other", label: "Другое" },
    ],
  },
  {
    id: "hair_color_current",
    section: "Волосы и макияж",
    type: "text",
    title: "Текущий цвет волос",
    placeholder: "Например: тёмно-русый, окрашенный блонд",
    required: true,
  },
  {
    id: "haircut_change_readiness",
    section: "Волосы и макияж",
    type: "scale",
    title: "Готовность менять стрижку",
    subtitle: "1 — оставить как есть, 10 — готова на смену",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: { 1: "оставить как есть", 5: "обсуждаемо", 10: "готова менять" },
  },
  {
    id: "haircolor_change_readiness",
    section: "Волосы и макияж",
    type: "scale",
    title: "Готовность менять цвет волос",
    subtitle: "1 — оставить, 10 — готова на смену",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: { 1: "оставить как есть", 5: "обсуждаемо", 10: "готова менять" },
  },
  {
    id: "styling_time",
    section: "Волосы и макияж",
    type: "single",
    title: "Сколько времени готовы тратить на укладку?",
    options: [
      { value: "u5", label: "До 5 минут" },
      { value: "5_10", label: "5–10 минут" },
      { value: "10_20", label: "10–20 минут" },
      { value: "longer", label: "Готова дольше" },
      { value: "almost_none", label: "Почти не укладываюсь" },
    ],
  },
  {
    id: "accessories",
    section: "Волосы и макияж",
    type: "multi",
    title: "Какие детали хочется добавить?",
    maxSelect: 6,
    options: [
      { value: "earrings", label: "Серьги" },
      { value: "bracelets", label: "Браслеты" },
      { value: "rings", label: "Кольца" },
      { value: "belts", label: "Ремни" },
      { value: "bags", label: "Сумки" },
      { value: "shoes", label: "Обувь" },
      { value: "glasses", label: "Очки" },
      { value: "necklaces", label: "Украшения на шею" },
      { value: "accent", label: "Акцентные детали" },
    ],
  },

  // ===== 9. Стилевые режимы =====
  {
    id: "style_modes",
    section: "Стилевые режимы",
    type: "multi",
    title: "Какие стилевые режимы вам нужны?",
    subtitle: "Чтобы стиль не получался одним жёстким образом",
    required: true,
    maxSelect: STYLE_MODE_OPTIONS.length,
    options: STYLE_MODE_OPTIONS,
  },
  {
    id: "main_mode",
    section: "Стилевые режимы",
    type: "single",
    title: "Какой режим самый важный сейчас?",
    required: true,
    options: STYLE_MODE_OPTIONS,
  },

  // ===== 10. Фото =====
  {
    id: "photos",
    section: "Фото",
    type: "photo",
    title: "Фото помогают собрать образ точнее",
    subtitle:
      "Загрузите до 20 фото. Обязательно минимум 1 фото лица и 1 фото в полный рост. Для каждого выберите тип.",
    required: true,
    maxPhotos: 20,
    photoTypes: PHOTO_TYPES,
    photoHint: [
      "минимум 1 фото лица при дневном свете",
      "минимум 1 фото в полный рост",
      "2–3 образа, которые вам нравятся",
      "1–2 образа, которые вам не нравятся",
      "до 5 вещей, которые хотите разобрать",
      "до 5 референсов, если есть",
    ],
  },

  // ===== 11. 5 вещей для разбора =====
  {
    id: "review_items",
    section: "5 вещей для разбора",
    type: "review_items",
    title: "5 вещей для стартового разбора",
    subtitle:
      "Загрузите до 5 вещей, которые хотите разобрать в первую очередь. Это могут быть вещи, которые вы носите, не знаете с чем сочетать, хотите оставить или заменить.",
    maxItems: 5,
    reviewQuestionOptions: REVIEW_QUESTION_OPTIONS,
  },

  // ===== 12. Финальный комментарий =====
  {
    id: "good_result",
    section: "Финальный комментарий",
    type: "longtext",
    title: "Что для вас будет хорошим результатом после разбора?",
    placeholder: "Опишите свободно…",
    required: true,
  },
  {
    id: "life_fit",
    section: "Финальный комментарий",
    type: "longtext",
    title: "Что важно учесть, чтобы рекомендации были реально удобны в жизни?",
    placeholder: "Например: ритм дня, физическая активность, погода, дети, бюджет…",
    required: true,
  },
  {
    id: "never_propose",
    section: "Финальный комментарий",
    type: "longtext",
    title: "Что точно нельзя предлагать?",
    placeholder: "Опишите свободно…",
    required: true,
  },
];
