
## Цель
Каждый публичный URL должен отдавать в HTML-ответе (до запуска JS) свои `<title>`, `<meta name="description">`, `<link rel="canonical">` и `og:*`. Без этого Google и Яндекс будут видеть дубли с canonical на корень — это и есть текущая блокирующая SEO-проблема.

## Диагноз
- На всех страницах уже стоит `<Helmet>` с правильными тегами — но он применяется только после исполнения JS. Боты-превью (LinkedIn, VK, Telegram, часть краулеров Яндекса) JS не выполняют.
- Текущий пре-рендер на Puppeteer ненадёжен в GitHub Actions: при любой ошибке он молча падает в `process.exit(0)` и кладёт в `dist/*/index.html` копию SPA-shell с canonical=`/`. По факту так и происходит на проде.
- Решение: отказаться от Puppeteer как обязательного шага и собирать мета прямо из исходников за один проход Node-скрипта. Это быстрее, детерминированно и не требует браузера.

## План

### 1. Per-route метаданные на этапе сборки (главное)
- Создать `scripts/route-meta.ts` — единый источник правды: массив `{ path, title, description, canonical, ogTitle, ogDescription, ogImage?, robots?, jsonLd? }` для всех маршрутов из sitemap.
- Переписать `scripts/generate-static-routes.mjs`:
  - убрать Puppeteer и `sirv` (или оставить как опциональный `ENABLE_PUPPETEER=1`);
  - для каждого маршрута из sitemap читать `dist/index.html`, в `<head>` заменять/вставлять `<title>`, `description`, `canonical`, `og:url`, `og:title`, `og:description`, `twitter:*`, `robots`;
  - писать в `dist/<route>/index.html`;
  - для блог-постов брать данные из `src/data/blogPosts.ts` (slug → title/excerpt).
- Удалить `predev`-генерацию sitemap, если она перетирает руками поправленный файл (проверить `package.json`); оставить только `prebuild`.
- Helmet в рантайме остаётся как есть — он перезапишет head на клиенте при навигации.

### 2. Legacy-редиректы (`/services/diagnostics` и пр.)
- На GitHub Pages настоящих 301 нет — оставляем текущие HTML-стабы с `<link rel=canonical>` на новый URL, `meta refresh` и JS-редиректом (это и есть рекомендованный способ для статического хостинга, Google трактует как soft-redirect).
- Добавить `<meta name="robots" content="noindex,follow">` (уже есть) и убедиться, что стабы не попадают в `sitemap.xml` (сейчас не попадают — проверить).
- В `src/App.tsx` маршруты `<Navigate>` оставить для пользователей, которые уже внутри SPA.

### 3. `/newyear` и временные лендинги
- В `NewYearGreeting.tsx` в `<Helmet>` поставить `robots: noindex,nofollow`.
- Убедиться, что `/newyear` отсутствует в `public/sitemap.xml` (уже отсутствует) и в `ALLOWED_ROUTES` пре-рендера.
- То же правило применить к `/portal`, `/portal/admin`, `/neurostylist`, `/redirect`, `/old-home` — `noindex` через Helmet, исключить из sitemap и из набора пре-рендера.

### 4. sitemap и robots
- В `public/sitemap.xml` добавить `<lastmod>` (текущая дата сборки) — сгенерировать в том же `scripts/route-meta.ts`, чтобы один список маршрутов питал и sitemap, и инжектор мета.
- `robots.txt` уже корректен (`Sitemap: https://aleksamois.ru/sitemap.xml`) — не трогаем.

### 5. Кнопка «Посмотреть услуги» на главной
- Воспроизвести в браузере (`PillButton to="/services"` в `NewHome.tsx`, строка 137). Скорее всего перекрывает декоративный элемент с `position:absolute` или `FloatingCTA` без `pointer-events:none`.
- Проверить z-index/`pointer-events` оверлеев в Hero-блоке и `FloatingCTA`. Починить минимальной правкой — добавить `pointer-events-none` на декор и `pointer-events-auto` на интерактив, либо поднять z-index самой кнопки.

### 6. Проверка
- После сборки локально: `grep -c "canonical.*aleksamois.ru/services/automation" dist/services/automation/index.html` должен вернуть `1`, и canonical должен указывать на `/services/automation`, а не на `/`.
- На проде после деплоя: `curl -s https://aleksamois.ru/services/automation | grep -E "canonical|og:url|<title>"` — должны быть уникальные значения.
- Прогнать SEO-скан через `seo_chat--trigger_scan`.

## Технические детали
- `scripts/route-meta.ts` — TypeScript-модуль, запускается через `bunx tsx` или компилируется в `.mjs`. Содержит:
  ```ts
  export const routeMeta: Record<string, RouteMeta> = {
    "/": { title: "...", description: "...", ... },
    "/services": { ... },
    // ...
  };
  export const blogMeta = blogPosts.map(p => ({
    path: `/materials/blog/${p.slug}`,
    title: p.metaTitle ?? p.title,
    description: p.excerpt,
    ...
  }));
  ```
- Инжектор делает простые `string.replace` по якорным комментариям в `index.html` (добавить маркеры `<!--HEAD-META-->` или искать по `<link rel="canonical"`).
- Сборка проходит за <2 сек, не требует системных зависимостей, не падает.
- В `.github/workflows/deploy.yml` удалить установку Chromium и `apt-get` шаги — упростить пайплайн.

## Что НЕ делаем
- Не переезжаем на SSR/Next.js — это всё ещё SPA на GitHub Pages.
- Не трогаем дизайн и копирайтинг страниц.
- Не меняем рантайм-роутинг и существующий Helmet — он остаётся как fallback и для клиентской навигации.
