

## Plan: Expand PLAUD Guide to Full Content Landing Page

### Problem
Current page has only 8 short sections (~100 lines of data). The original 18-section detailed guide content was removed during the landing page conversion. Need to restore all content while keeping the landing page visual style.

### Approach
Rewrite both files. Keep the landing page visual rhythm (alternating card grids, accent blocks, tables, steps, accordions) but add back all ~15 content sections from the original document.

### Structure (13 sections in PlaudGuidePage.tsx)

| # | Section | Visual Format |
|---|---------|--------------|
| 1 | Hero | Gradient bg, H1, subtitle, badge |
| 2 | Что такое PLAUD | 3 value cards + accent "5 минут" block |
| 3 | Что вы получите | 4-col benefit cards (emoji + text) |
| 4 | Какую модель выбрать | Comparison table (Note/Note Pro/NotePin/NotePin S) + tip callout |
| 5 | Как начать | 5 numbered steps (download → register → Bluetooth → sync → generate) |
| 6 | Разбор интерфейса | 3-col cards (Запись/Обработка/Результат) + screenshot placeholder |
| 7 | Важные функции | Grid of feature cards: Transcript, Summary, Ask Plaud, Templates, Export, Search |
| 8 | AutoFlow | Accent block (bg-slate-900), 3-step example, 7-step setup |
| 9 | Тарифы | Cards for free/paid plans, quota info |
| 10 | Оплата из России | Warning callout (bg-red-50), 5-step OplataZabugor guide, plaud.ru alternative |
| 11 | Безопасность | 6 certificates list, 3 practical points, disable-cloud steps |
| 12 | FAQ | Accordion with 10 questions (unique `value={`faq-${i}`}`) |
| 13 | Итог + CTA | 3 tips + Telegram CTA button |

### File changes

**1. `src/pages/materials/plaud-guide-sections.tsx`** — complete rewrite (~600 lines)
- Export data arrays for each section: `modelComparison`, `gettingStartedSteps`, `features`, `autoFlowSteps`, `plans`, `paymentSteps`, `securityCerts`, `faqItems`, plus existing `valueCards`, `mistakes`
- All content in plain data (strings/arrays), no JSX — page renders it

**2. `src/pages/materials/PlaudGuidePage.tsx`** — complete rewrite (~500 lines)
- 13 sections with alternating visual formats
- Uses existing components: `Accordion`, `Table`, `Contact`, `Footer`, `Partners`
- Each section has distinct bg: alternating white / `bg-slate-50/60` / accent blocks
- Tables wrapped in `overflow-x-auto` for mobile
- FAQ uses `AccordionItem value={`faq-${index}`}`, no defaultValue
- SEO: updated HowTo schema with all steps

### Key content to restore (from conversation history)

- **Models table**: Note (карточка), Note Pro (карточка+динамик), NotePin (значок), NotePin S (мини) — форм-фактор, запись, память, батарея
- **Getting started**: 5 steps (скачать → зарегистрироваться → Bluetooth → синхронизировать → Generate)
- **Features**: Transcript (переименование спикеров, редактирование, Ctrl+F), Summary (шаблоны стандартные + проф, смена, перегенерация), Ask Plaud (готовые вопросы, черновик/задачи/пункты), Export (форматы: TXT/PDF/SRT/DOCX), Search
- **AutoFlow**: WHEN (триггер) → DO (действие), 7 шагов настройки, пример: запись → email с саммари; only mobile app
- **Plans**: Starter 300 мин бесплатно, что делать когда кончатся, платные планы
- **Payment from Russia**: ⚠️ карты РФ не проходят, OplataZabugor (5 шагов: регистрация → пополнение → виртуальная карта → оплата → проверка), plaud.ru альтернатива
- **Security**: SOC 2 Type II, ISO 27001, GDPR, HIPAA, AES-256, TLS 1.2+; отключение облака 3 шага
- **FAQ**: 10 вопросов (интернет, точность, редактирование, спикеры, Zoom, лекции, языки, iPhone, хранение, интервью)
- **Conclusion**: "PLAUD — не диктофон", 3 совета (говори структурно, используй шаблоны, превращай в действие), CTA

### Visual rhythm
```
gradient hero → cards → accent block → comparison table → numbered steps → 
3-col cards + image → feature grid → dark accent (AutoFlow) → plan cards → 
red warning (payment) → info block (security) → accordion (FAQ) → CTA
```

No two adjacent sections use the same format.

