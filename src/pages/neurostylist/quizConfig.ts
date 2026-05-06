// Config-driven questionnaire for НейроСтилист (16 screens)
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
  otherValue?: string; // value that triggers free input
  otherPlaceholder?: string;
}

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
  // Screen 3 — Main goal
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
  // Screen 4 — Impression
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
  // Screen 5 — Boldness scale
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
  // Screen 6 — Lifestyle
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
  // Screen 7 — Appearance
  {
    id: "appearance",
    type: "multifield",
    title: "Внешность",
    subtitle: "Несколько коротких деталей для точного разбора",
    required: true,
    fields: [
      { id: "height", label: "Рост", placeholder: "Например: 168 см", required: true },
      { id: "size", label: "Размер одежды", placeholder: "Например: 44 / M", required: true },
      { id: "hair_color", label: "Цвет волос", placeholder: "Например: тёмно-русый", required: true },
      { id: "eye_color", label: "Цвет глаз", placeholder: "Например: карие", required: true },
    ],
  },
  // Screen 8 — Figure (zones to highlight)
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
  // Screen 8 part 2 — Fit
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
  // Screen 9 — Colors
  {
    id: "colors",
    type: "longtext",
    title: "Какие цвета тебе нравятся?",
    subtitle: "Например: сливовый, фиолетовый, молочный, шоколадный, голубой, красный, чёрный",
    placeholder: "Перечисли свободно…",
  },
  // Screen 10 — Clothes worn often
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
  // Screen 11 — Wardrobe wishes
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
  // Screen 12 — Makeup
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
  // Screen 12 part 2 — Hair
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
  // Screen 13 — Accessories
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
  // Screen 14 — Photos (required, min 1)
  {
    id: "photos",
    type: "photo",
    title: "Фото сделают разбор точнее",
    subtitle: "Загрузи хотя бы одно фото — это сильно поможет",
    required: true,
    minPhotos: 1,
    slots: [
      { id: "face", label: "Фото лица" },
      { id: "full", label: "Фото в полный рост" },
      { id: "outfit", label: "Фото образа, который ты часто носишь" },
      { id: "refs", label: "Скриншоты образов, которые нравятся" },
    ],
  },
  // Screen 15 — Final phrase
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
