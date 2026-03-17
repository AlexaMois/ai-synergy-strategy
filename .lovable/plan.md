

## План: Страница `/materials/plaud-guide`

### Изменения

**1. Новый файл: `src/pages/materials/PlaudGuidePage.tsx`**

Страница-инструкция по PLAUD AI:
- **SEO (Helmet):** title "Инструкция по PLAUD на русском языке | Александра Моисеева", description, canonical `/materials/plaud-guide`, OG/Twitter tags, JSON-LD `@type: HowTo` schema
- **Breadcrumbs:** Главная → Материалы → Ресурсы → Инструкция по PLAUD (через `PageBreadcrumbs`)
- **H1:** «Инструкция по PLAUD на русском языке», подзаголовок под ним
- **Поиск:** `Input` + кнопка «Найти», `max-w-2xl`, centered. Client-side `useMemo` фильтрация по `tags` массиву и заголовку (toLowerCase includes). Если 0 результатов — «Не нашли ответ? Напишите нам в Telegram»
- **10 секций-карточек:** каждая с Lucide иконкой, **H2** заголовком, текст инструкции, `<img src="/images/plaud/section-N.jpg" loading="lazy">` с русским alt. Подпункты внутри — H3
- Анимация фильтрации: `transition-all opacity`
- Footer: `Contact`, `Partners`, `Footer`
- Паттерн: аналогично `FAQPage.tsx` / `Checklist30Page.tsx`

**2. `src/App.tsx`** — lazy import + route `/materials/plaud-guide`

**3. `src/config/routes.ts`** — добавить `/materials/plaud-guide` в `ALLOWED_ROUTES`

