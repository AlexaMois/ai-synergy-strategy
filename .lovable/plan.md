

## Анализ: что ещё улучшить для органического трафика

Метаданные и H1 обновлены — это основа. Теперь есть несколько технических и контентных пробелов, которые тормозят органику.

---

### 1. Sitemap: нет `<lastmod>` дат

Сейчас `sitemap.xml` не содержит `<lastmod>`. Google и Яндекс используют `lastmod` для приоритизации crawl-бюджета — без него они не знают, когда страница обновлялась.

**Что сделать**: добавить `<lastmod>` с текущей датой в `vite-plugin-sitemap.ts`. Для блог-постов — брать `date` из `blogPosts.ts`.

---

### 2. FAQ Schema на главной отсутствует

На `/faq` есть `FAQPage` JSON-LD schema — это хорошо. Но на **главной** (`/`) есть компонент `FAQ` с 5+ вопросами, и для них **нет** `FAQPage` schema. Google показывает FAQ rich snippets только если есть разметка.

**Что сделать**: добавить `FAQPage` JSON-LD schema в компонент `FAQ.tsx` (или в `Index.tsx`) для вопросов главной страницы.

---

### 3. BlogPost: canonical URL отсутствует

`BlogPost.tsx` устанавливает meta через DOM manipulation (не Helmet), и **не ставит canonical URL**. Без canonical Google может индексировать дубли (например, с query-параметрами).

**Что сделать**: добавить `<link rel="canonical" href="https://aleksamois.ru/materials/blog/${slug}" />` в BlogPost.

---

### 4. BlogPost: нет `og:url` и `og:image`

Блог-посты не устанавливают `og:url` и `og:image`. При шеринге в соцсети/мессенджеры — превью будет неполным.

**Что сделать**: добавить og:url (canonical), og:image (introImage или дефолтный og-image).

---

### 5. Внутренняя перелинковка: блок «Связанные статьи» на страницах услуг

Страницы услуг (diagnostics, architecture, support) не ссылаются на релевантные блог-посты. Это упущенный сигнал для поисковиков и потеря глубины просмотра.

**Что сделать**: добавить блок «Полезные статьи по теме» (2-3 ссылки на блог) на каждую страницу услуг. Данные берём из `blogPosts.ts` по тегам/категориям.

---

### 6. `index.html`: title и description не синхронизированы с Helmet

В `index.html` (строки 96-97) title и description — старые. Для SPA это fallback для ботов, которые не исполняют JS (часть ботов Яндекса). Нужно синхронизировать с новым title/description главной.

---

### Приоритет реализации

| # | Задача | Влияние | Сложность |
|---|--------|---------|-----------|
| 1 | `index.html` title/description sync | Высокое (Яндекс) | 5 мин |
| 2 | Sitemap `lastmod` | Среднее | 15 мин |
| 3 | FAQ Schema на главной | Высокое (rich snippets) | 15 мин |
| 4 | BlogPost canonical + og tags | Среднее | 10 мин |
| 5 | Перелинковка услуг → блог | Среднее-высокое | 30 мин |

### Файлы

| Файл | Изменения |
|------|-----------|
| `index.html` | Обновить title и meta description на новые |
| `vite-plugin-sitemap.ts` | Добавить `<lastmod>` в XML |
| `src/components/FAQ.tsx` | Добавить FAQPage JSON-LD schema |
| `src/pages/BlogPost.tsx` | Добавить canonical, og:url, og:image |
| `src/pages/services/DiagnosticsPage.tsx` | Блок «Полезные статьи» с 2-3 ссылками |
| `src/pages/services/ArchitecturePage.tsx` | Блок «Полезные статьи» с 2-3 ссылками |
| `src/pages/services/SupportPage.tsx` | Блок «Полезные статьи» с 2-3 ссылками |

