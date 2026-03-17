

## План: Добавить og:image и twitter:card на все страницы

### Страницы без og:image и twitter:card (13 файлов)

| Файл | og:image | twitter:card |
|------|----------|-------------|
| `src/pages/services/DiagnosticsPage.tsx` | ❌ | ❌ |
| `src/pages/services/ArchitecturePage.tsx` | ❌ | ❌ |
| `src/pages/services/SupportPage.tsx` | ❌ | ❌ |
| `src/pages/demo/DemoPage.tsx` | ❌ | ❌ |
| `src/pages/GolossokDemo.tsx` | ❌ | ❌ |
| `src/pages/GolossokPricing.tsx` | ❌ | ❌ |
| `src/pages/ChecklistPage.tsx` | ❌ | ❌ |
| `src/pages/CaseStudyCargoExpress.tsx` | ❌ | ❌ |
| `src/pages/CaseStudyKraypotrebsoyuz.tsx` | ❌ | ❌ |
| `src/pages/CaseStudyDocSearch.tsx` | ❌ | ❌ |
| `src/pages/cases/CaseDetailPage.tsx` | ❌ | ❌ |
| `src/pages/cases/DocSearchCasePage.tsx` | ❌ | ❌ |
| `src/pages/ResourcesPage.tsx` | ❌ | ❌ |
| `src/pages/materials/Checklist30Page.tsx` | ❌ | ❌ |

**Не трогаем** (noindex или утилитарные): `LegalPage`, `PortalPage`, `PortalAdminPage`, `CookiesPolicy`, `Consent`, `Terms`, `NewYearGreeting`, `NotFound`, `Redirect`, `TestPage`.

### Изменение

В каждый из 14 файлов добавить 3 строки перед `</Helmet>`:

```html
<meta property="og:image" content="https://aleksamois.ru/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://aleksamois.ru/og-image.png" />
```

Также добавить `og:type` где отсутствует (DemoPage, GolossokDemo, GolossokPricing, ChecklistPage, CaseStudyCargoExpress, CaseStudyDocSearch, CaseDetailPage, DocSearchCasePage, Checklist30Page).

### Файлы (14)

| Файл | Строки вставки |
|------|---------------|
| `DiagnosticsPage.tsx` | после строки 76 (og:type) |
| `ArchitecturePage.tsx` | после строки 76 (og:type) |
| `SupportPage.tsx` | после строки 39 (og:type) |
| `DemoPage.tsx` | после строки 35 (canonical) |
| `GolossokDemo.tsx` | после строки 20 (og:url) |
| `GolossokPricing.tsx` | после строки 112 (og:url) |
| `ChecklistPage.tsx` | после строки 97 (og:url) |
| `CaseStudyCargoExpress.tsx` | после строки 42 (og:url) |
| `CaseStudyKraypotrebsoyuz.tsx` | после строки 75 (og:type) |
| `CaseStudyDocSearch.tsx` | после строки 159 (og:url) |
| `CaseDetailPage.tsx` | после строки 311 (canonical) |
| `DocSearchCasePage.tsx` | после строки 95 (canonical) |
| `ResourcesPage.tsx` | после строки 182 (og:url) |
| `Checklist30Page.tsx` | после строки 126 (og:url) |

