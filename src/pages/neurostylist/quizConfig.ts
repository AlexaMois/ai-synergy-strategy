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

export interface PhotoSlot {
  id: string;
  label: string;
  required?: boolean;
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
  // welcome / final
  ctaLabel?: string;
  // scale
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: Record<number, string>;
  // multifield
  fields?: FieldDef[];
  // photo
  slots?: PhotoSlot[];
  minPhotos?: number;
  // single_with_other
  otherValue?: string;
  otherPlaceholder?: string;
}

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

export const QUIZ_QUESTIONS: Question[] = [
  // Screen 1 — Welcome
  {
    id: "welcome",
    type: "welcome",
    title: "Начинаем собирать твой образ",
    subtitle:
      "Ответы помогут понять твой стиль, внешность, характер, ритм жизни и детали, которые делают образ сильнее.",
    ctaLabel: "Начать",
  },

  // Screen 2 — Contacts
  {
    id: "contacts",
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

  // ===== Блок 1. Данные о клиентке =====
  {
    id: "client_data",
    type: "multifield",
    title: "Параметры и размеры",
    subtitle: "Базовые данные — помогают точнее подобрать посадку",
    required: true,
    fields: [
      { id: "age", label: "Возраст", placeholder: "Например: 32", required: true },
      { id: "height", label: "Рост, см", placeholder: "Например: 168", required: true },
      { id: "clothing_size", label: "Размер одежды", placeholder: "Например: M / 44", required: true },
      { id: "shoe_size", label: "Размер обуви", placeholder: "Например: 38", required: true },
      { id: "measurements", label: "Параметры: грудь / талия / бёдра", placeholder: "Можно пропустить, если не хотите указывать" },
      { id: "weight", label: "Вес, кг", placeholder: "По желанию" },
    ],
  },
  {
    id: "weight_change",
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

  // ===== Блок 2. Образ жизни =====
  {
    id: "occupation",
    type: "longtext",
    title: "Чем вы занимаетесь?",
    subtitle: "Работа, бизнес, декрет, учёба, публичная деятельность, свободный график и т.д.",
    placeholder: "Несколько слов о роде деятельности",
    required: true,
  },
  {
    id: "work_format",
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

  // ===== Желаемый образ (существующие) =====
  {
    id: "goal",
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
    type: "scale",
    title: "Насколько смело собираем образ?",
    subtitle: "Шкала от 1 до 10",
    required: true,
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: {
      1: "мягкое обновление",
      5: "заметное обновление",
      10: "вау-образ",
    },
  },

  // ===== Блок 4. Ограничения =====
  {
    id: "avoid_image",
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
    id: "never_wear",
    type: "multi",
    title: "Что вы точно не носите?",
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
    type: "longtext",
    title: "Какие вещи физически неудобны?",
    placeholder: "Например: жмёт талия, натирает обувь, неудобны каблуки, не люблю плотные ткани",
  },
  {
    id: "disliked_looks",
    type: "longtext",
    title: "Какие образы вам точно не нравятся?",
    placeholder: "Можно написать своими словами или привести примеры",
  },

  // ===== Где образ должен работать (существующий) =====
  {
    id: "lifestyle",
    type: "multi",
    title: "Где образ должен работать чаще всего?",
    required: true,
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

  // ===== Блок 3. Стилевые режимы =====
  {
    id: "style_modes",
    type: "multi",
    title: "Какие стилевые режимы вам нужны?",
    subtitle: "Чтобы стиль не получался одним жёстким образом",
    required: true,
    maxSelect: STYLE_MODE_OPTIONS.length,
    options: STYLE_MODE_OPTIONS,
  },
  {
    id: "main_mode",
    type: "single",
    title: "Какой режим самый важный сейчас?",
    required: true,
    options: STYLE_MODE_OPTIONS,
  },

  // ===== Фигура (существующие) =====
  {
    id: "highlight_zones",
    type: "multi",
    title: "Какие зоны хочется подчеркнуть?",
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
    type: "multi",
    title: "Что важно по посадке?",
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

  // ===== Блок 5. Цвета =====
  {
    id: "colors",
    type: "longtext",
    title: "Какие цвета тебе нравятся?",
    subtitle: "Например: сливовый, фиолетовый, молочный, шоколадный, голубой, красный, чёрный",
    placeholder: "Перечисли свободно…",
  },
  {
    id: "colors_compliments",
    type: "longtext",
    title: "В каких цветах вам чаще делают комплименты?",
    placeholder: "Перечисли свободно…",
  },
  {
    id: "colors_disliked",
    type: "longtext",
    title: "Какие цвета вы не любите?",
    required: true,
    placeholder: "Перечисли свободно…",
  },
  {
    id: "colors_to_test",
    type: "longtext",
    title: "Какие цвета хотите проверить — идут вам или нет?",
    placeholder: "Например: сиреневый, сливовый, красный, молочный, голубой",
  },
  {
    id: "brightness_readiness",
    type: "scale",
    title: "Насколько готовы к ярким цветам?",
    subtitle: "1 — только спокойные, 10 — готова к ярким акцентам",
    required: true,
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: {
      1: "только спокойные",
      5: "сдержанные акценты",
      10: "готова к ярким",
    },
  },

  // ===== Гардероб =====
  {
    id: "clothes",
    type: "multi",
    title: "Какие вещи ты носишь чаще всего?",
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
    id: "wardrobe_change",
    type: "multi",
    title: "Что сейчас хочется изменить в гардеробе?",
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
  // ===== Блок 6. Гардероб — детально =====
  {
    id: "orphan_items",
    type: "longtext",
    title: "Какие вещи есть, но не знаете, с чем их носить?",
    required: true,
    placeholder: "Перечисли свободно…",
  },
  {
    id: "unused_items",
    type: "longtext",
    title: "Какие вещи покупали, но почти не носите?",
    placeholder: "Перечисли свободно…",
  },
  {
    id: "keep_in_style",
    type: "longtext",
    title: "Что хочется оставить в своём стиле?",
    placeholder: "Перечисли свободно…",
  },
  {
    id: "replace_items",
    type: "longtext",
    title: "Что хочется заменить или убрать из гардероба?",
    placeholder: "Перечисли свободно…",
  },

  // ===== Блок 7. Покупки и бюджет =====
  {
    id: "shopping_places",
    type: "multi",
    title: "Где обычно покупаете одежду?",
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
    type: "single",
    title: "Комфортный бюджет на одну вещь",
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

  // ===== Макияж / волосы (существующие) =====
  {
    id: "makeup",
    type: "single",
    title: "Какой макияж тебе ближе?",
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
    id: "hair",
    type: "single",
    title: "Что хочется по волосам?",
    options: [
      { value: "keep", label: "Сохранить текущую форму" },
      { value: "update_style", label: "Обновить укладку" },
      { value: "more_volume", label: "Добавить объём" },
      { value: "new_cut", label: "Изменить стрижку" },
      { value: "new_color", label: "Изменить цвет" },
      { value: "face_shape", label: "Подобрать форму у лица" },
    ],
  },

  // ===== Блок 8. Волосы и макияж — расширение =====
  {
    id: "hair_length",
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
    type: "text",
    title: "Текущий цвет волос",
    placeholder: "Например: тёмно-русый, окрашенный блонд",
    required: true,
  },
  {
    id: "haircut_change_readiness",
    type: "scale",
    title: "Готовность менять стрижку",
    subtitle: "1 — оставить как есть, 10 — готова на смену",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: { 1: "оставить как есть", 5: "обсуждаемо", 10: "готова менять" },
  },
  {
    id: "haircolor_change_readiness",
    type: "scale",
    title: "Готовность менять цвет волос",
    subtitle: "1 — оставить, 10 — готова на смену",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: { 1: "оставить как есть", 5: "обсуждаемо", 10: "готова менять" },
  },
  {
    id: "styling_time",
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
    id: "makeup_change",
    type: "longtext",
    title: "Что хочется изменить в макияже?",
    placeholder: "По желанию",
  },

  // ===== Аксессуары (существующий) =====
  {
    id: "accessories",
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

  // ===== Фото (существующее) =====
  {
    id: "photos",
    type: "photo",
    title: "Фото помогают собрать образ точнее",
    subtitle: "Можно загрузить здесь, прислать ссылку или отправить отдельно",
    required: false,
    minPhotos: 0,
    slots: [
      { id: "face", label: "Фото лица" },
      { id: "full", label: "Фото в полный рост" },
      { id: "outfit", label: "Фото образа, который ты часто носишь" },
      { id: "refs", label: "Скриншоты образов, которые нравятся" },
    ],
  },

  // ===== Финальная фраза =====
  {
    id: "final_phrase",
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
];
