## План: Страница /neurostylist (НейроСтилист, MVP)

Полностью изолированный раздел сайта со своей визуальной системой (тёмный сливовый «цифровой бутик») — не пересекается с основным B2B-стилем. Никаких изменений в существующих компонентах главной страницы.

---

### 1. База данных

Новая таблица `public.stylist_leads` (миграция):

| Поле | Тип | Назначение |
|---|---|---|
| `id` | uuid PK | первичный ключ |
| `lead_id` | text default substring(uuid) | короткий публичный id |
| `name` | text | имя клиентки |
| `contact` | text | Telegram-ник или телефон |
| `contact_type` | text | `telegram` / `phone` |
| `answers` | jsonb | все ответы анкеты (гибкая структура) |
| `created_at` | timestamptz default now() | |
| `updated_at` | timestamptz default now() | |

RLS: включена. Единственная политика — `Deny public access to stylist_leads` (USING false, WITH CHECK false). Запись только через edge-функцию с service role key — как уже сделано для `leads`.

### 2. Edge-функция `save-stylist-lead`

Файл: `supabase/functions/save-stylist-lead/index.ts`. Конфиг в `supabase/config.toml`: `verify_jwt = false`.

Логика (по образцу `save-lead` + `send-to-telegram`):
- CORS: `https://aleksamois.ru` + preview-домены lovable.
- Rate limit: 5 заявок/час с IP (in-memory Map).
- Honeypot-поле `website` (если заполнено — возвращаем 200, ничего не делаем).
- Zod-валидация: `name` (1–100), `contact` (1–100), `contact_type` enum, `answers` — `z.record(z.unknown())` с лимитом размера через `JSON.stringify(...).length < 20_000`.
- INSERT в `stylist_leads` через service role key.
- Отправка сообщения в Telegram (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` уже есть в секретах) — формат:

```
👗 НейроСтилист — новая анкета
👤 Имя: ...
📨 Контакт: ...
🆔 lead_id: ...
🕐 Время: dd.mm.yyyy HH:MM (МСК)

— Ответы —
• <Вопрос>: <ответ>
...
```
с `escapeHtml`, `parse_mode: HTML`. Все вопросы/ответы перебираются из `answers` динамически.

### 3. Маршрут и SEO

`src/App.tsx`:
- Lazy-импорт `NeurostylistPage` и `Route path="/neurostylist"`.

`src/config/routes.ts`: добавить `/neurostylist` в `ALLOWED_ROUTES`.

`scripts/generate-sitemap.ts` / `public/sitemap.xml`: добавить URL `/neurostylist` (в sitemap включаем — индексируется; в навигацию **не** добавляем по решению пользователя).

Helmet на странице:
- title: «НейроСтилист — собери образ, в котором узнаешь себя сильнее»
- description: подзаголовок из ТЗ
- `robots: index, follow`
- canonical: `https://aleksamois.ru/neurostylist`

### 4. Визуальная система (изолированная)

Без правки `tailwind.config.ts` и `src/index.css` — чтобы не задеть основной сайт. Все цвета определяются локально через CSS-переменные на корневом `<div>` страницы и используются как inline-классы Tailwind в формате `bg-[hsl(var(--ns-plum))]` либо через локальный `style`-объект.

Палитра (HSL):
- `--ns-plum` (основной фон, глубокий сливовый): `295 35% 12%`
- `--ns-aubergine` (второй фон, баклажан): `290 30% 18%`
- `--ns-chocolate` (глубина): `300 20% 8%`
- `--ns-milk` (текст): `40 30% 95%`
- `--ns-rose-gold` (акцент): `20 60% 75%`
- `--ns-violet` (доп. акцент): `270 40% 65%`
- `--ns-cream` (мягкий свет): `45 60% 88%`

Эффекты:
- Стеклянные карточки: `bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.3)]`.
- Свечение CTA: `box-shadow: 0 0 40px hsl(var(--ns-rose-gold) / 0.4)` + hover-усиление.
- Тонкие линии-разделители, крупная типографика (заголовки 56–72px desktop / 32–40px mobile), плавные переходы (`transition-all duration-500 ease-out`).
- Фоновые «мягкие свечения» — два больших размытых круга `bg-[hsl(var(--ns-rose-gold))]/10 blur-[120px]` в углах.
- Шрифт — системный serif (Georgia/Playfair fallback) для заголовков, текущий sans для основного текста (без подключения новых шрифтов в MVP).

### 5. Структура страницы

`src/pages/neurostylist/NeurostylistPage.tsx` + локальные секции в той же папке:

1. **Hero** — заголовок «Собери образ, в котором ты узнаешь себя сильнее», подзаголовок, CTA «Собрать для меня образ» с подписью «Заполнить анкету». Без основной навигации сайта (страница standalone — `Navigation` рендерится глобально в App.tsx, **скрываем** его на этом маршруте через проверку `useLocation` в `Navigation.tsx` — единственная мини-правка существующего кода).
2. **«Образ складывается из деталей»** — 6 стеклянных карточек: Цвета, Силуэты, Макияж, Укладка, Аксессуары, Настроение образа. С иконками (lucide: `Palette`, `Shirt`, `Sparkles`, `Scissors`, `Gem`, `Heart`).
3. **«Как проходит»** — 5 шагов с нумерацией в кружках в розовом золоте.
4. **Повтор CTA** — заголовок «Твой образ уже можно собрать» + та же кнопка.
5. **Мини-футер** — копирайт + ссылки на «Политику конфиденциальности» и «Согласие». Без основного `Footer`.

### 6. Анкета

`src/pages/neurostylist/StylistQuiz.tsx` — полноэкранный модальный слой (`fixed inset-0 z-50`) с собственным фоном-градиентом палитры. Открывается по клику на CTA.

Архитектура — **config-driven**, чтобы заменить вопросы без переписывания UI:

`src/pages/neurostylist/quizConfig.ts`:
```ts
export type QuestionType = 'single' | 'multi' | 'text' | 'number' | 'contact';
export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}
export const QUIZ_QUESTIONS: Question[] = [ /* placeholder ~10 вопросов */ ];
```

В MVP кладём 10 вопросов-плейсхолдеров (настроение / основные цвета / силуэты / макияж / укладка / аксессуары / ритм жизни / 1 текстовое поле «что важно» / контакт). **Когда пользователь пришлёт точный список — заменим только содержимое `quizConfig.ts`, UI трогать не нужно.**

UI-возможности:
- Один вопрос на экране, плавный fade+slide.
- Прогресс-бар сверху (тонкая линия в розовом золоте).
- Кнопки «Назад» (ghost) и «Далее» (primary, glow). На последнем — «Отправить ответы».
- Клавиатура: Enter = далее.
- Финальный экран благодарности: «Спасибо. Александра свяжется с тобой в течение 24 часов» + кнопка «Закрыть».
- Хранение ответов в `useState<Record<string, any>>`.
- Honeypot-поле `website` (visually hidden) внутри формы.
- Submit: `supabase.functions.invoke('save-stylist-lead', { body: { name, contact, contact_type, answers, website } })`. Toast при ошибке (sonner). Loader на кнопке.

### 7. Адаптация под мобильные

- Hero: заголовок 32px, padding по краям 20px.
- Карточки «что собирается»: 1 колонка mobile / 2 — sm / 3 — md+.
- Шаги «как проходит»: вертикально на mobile.
- Анкета: полный экран, кнопки фиксированы внизу с safe-area, поля `text-base` (16px — без зума на iOS).

### 8. Что НЕ входит (явно из ТЗ — на следующий этап)

ИИ-разбор, PDF, личный кабинет, подбор вещей, генерация образов, агентная логика. Структура `answers jsonb` уже готова к расширению без миграций.

---

### Технические детали (краткая сводка для разработки)

**Файлы создаются:**
- Миграция БД: создание `stylist_leads` + RLS deny-all
- `supabase/functions/save-stylist-lead/index.ts`
- Блок в `supabase/config.toml`: `[functions.save-stylist-lead] verify_jwt = false`
- `src/pages/neurostylist/NeurostylistPage.tsx`
- `src/pages/neurostylist/StylistQuiz.tsx`
- `src/pages/neurostylist/quizConfig.ts`
- `src/pages/neurostylist/sections/` (Hero, WhatGathers, HowItGoes, RepeatCTA, MiniFooter)

**Файлы редактируются:**
- `src/App.tsx` — добавить lazy route
- `src/config/routes.ts` — добавить `/neurostylist`
- `src/components/Navigation.tsx` — скрывать nav на `/neurostylist` (через `useLocation`)
- `src/components/BackToHome.tsx` — проверить, чтобы не выводился (если выводится — скрыть на этом маршруте)
- `public/sitemap.xml` или `scripts/generate-sitemap.ts` — добавить URL

**Не трогаем:** `tailwind.config.ts`, `src/index.css`, любые компоненты главной/других страниц, существующие edge-функции, существующие таблицы.

После апрува плана сразу запускаем миграцию БД и реализуем код.