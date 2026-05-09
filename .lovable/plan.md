# SEO-аудит сайта (статический crawl кодовой базы)

Прошёлся по всем `<Link to=...>`, `href`, `<Navigate>`, JSON-LD, canonical/og:url, sitemap и сверил с реальными маршрутами в `App.tsx`.

## Результаты

### 🔴 Критично — канонические/og:url ведут на легаси-маршруты (двойной адрес одной страницы)

Это самая болезненная для SEO ошибка после рефакторинга: страница доступна по новому пути, но `<link rel="canonical">` и `og:url` указывают на старый, который теперь 301-редиректит. Поисковик получает противоречивый сигнал.

| Файл | Канонический URL | Должно быть |
|---|---|---|
| `src/pages/ResourcesPage.tsx:168,171` | `/resources` | `/materials/resources` |
| `src/pages/CaseStudyKraypotrebsoyuz.tsx:46,57,71,74` | `/case-studies/kraypotrebsoyuz` (4 места, включая `@id` и `mainEntityOfPage` в JSON-LD) | `/cases/kraypotrebsoyuz` |
| `src/pages/GolossokPricing.tsx:109,112` | `/golossok-pricing` | `/products/voice-bot` |
| `src/pages/Consent.tsx:13` | `/consent` | `/legal/consent` |
| `src/pages/PrivacyPolicy.tsx:13` | `/privacy-policy` | `/legal/privacy-policy` |
| `src/pages/Terms.tsx:13` | `/terms` | `/legal/terms` |

### 🟡 Важно — ссылки/схемы на легаси-пути (вызывают лишний 301-хоп)

| Файл | Путь | Должно быть |
|---|---|---|
| `src/utils/breadcrumbSchema.ts:84` | `/blog` (BreadcrumbList JSON-LD) | `/materials/blog` |
| `src/utils/breadcrumbSchema.ts:115` | `/resources` | `/materials/resources` |
| `src/components/Contact.tsx:320` | `<Link to="/consent">` | `/legal/consent` |
| `src/config/routes.ts:42` | `ALLOWED_ROUTES` всё ещё разрешает `/case-studies/*` (легаси, остались только редиректы) | удалить или сузить до 3 конкретных |

### 🟢 Мелкое

- `src/pages/CaseStudyCargoExpress.tsx` — стоит проверить, нет ли у него тех же канонических ссылок на `/case-studies/cargo-express` (в выдаче grep его не было, но проверить руками стоит — паттерн повторяющийся).

### ✅ Что проверил и всё ок

- **Динамические `/cases/:slug`** — все 11 слагов (`ai-smm`, `school-assistant`, `neuro-tender`, `neuro-notes`, `vasya-secretary`, `neuro-fireman`, `neuro-farmer`, `samprodam-bot`, `digital-twin`, `corporate-docs`, `doc-classification`) определены в `CaseDetailPage.casesData`.
- **Файлы**: `/videos/doc-search-demo.mp4` существует. Все ссылки на `/resources/*.pdf|.docx|.xlsx` помечены `status: "coming-soon"` и задизейблены — пользователь до них не докликает, 404 не показывается.
- **Sitemap.xml** — нет ни одного легаси-URL, всё совпадает с действующими маршрутами.
- **Footer / Navigation / меню** — все ссылки на новые пути (`/legal/*`, `/materials/*`).
- **Внутренние 404 по статике**: не найдено.

## Что предлагаю сделать (если согласен — переключи в build)

1. Заменить canonical/og:url в 6 страницах на новые пути.
2. Поправить 2 пути в `breadcrumbSchema.ts` и 1 ссылку в `Contact.tsx`.
3. Убрать `/case-studies/` из `isRouteAllowed` (оставив только редиректы в `App.tsx`).
4. Заодно перечитать `CaseStudyCargoExpress.tsx` на тот же паттерн с canonical.

Замечание: реальный crawl задеплоенного сайта (например, через Firecrawl `/map` + `/scrape` каждой страницы) я могу запустить, но это требует подключённого коннектора Firecrawl и тратит кредиты. Статический аудит по коду покрывает все те же ошибки, кроме реальных HTTP-кодов от CDN — а они зависят от того, успела ли деплой-пайплайна догнать правки.
