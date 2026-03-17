

## Plan: Rewrite PLAUD Guide as Practical Instruction Manual

Complete rewrite of both files. Strip all marketing, dark blocks, CTAs, fake pricing. Replace with clean instruction page where every block = text + screenshot placeholder.

### Data file: `src/pages/materials/plaud-guide-sections.tsx`

**Remove:** `valueCards`, `benefitCards`, `plans`, `conclusionTips`, `paymentSteps`, `securityCerts`, `securityTips`, `disableCloudSteps`

**Keep (with edits):** `modelComparison`, `gettingStartedSteps`, `interfaceBlocks`, `features`, `autoFlowSteps`, `faqItems`, `mistakes`

**Add:**
- `usageItems` — array of button/mode descriptions (e.g. "Кнопка записи", "Режим звонка", "Пауза") each with `title`, `what`, `when` fields
- `cloudInfo` — object with 4 fields: `onDevice`, `inCloud`, `whyCloud`, `withoutCloud` (string each)
- `paymentInfo` — object with fields: `howLimitWorks`, `whenRunsOut`, `whereToCheck`, `howToBuyMore` (strings)
- Add to `faqItems`: `{ q: "Что делать, если устройство не работает?", a: "..." }`

**Remove from features:** emoji field (no decorative icons)

### Page file: `src/pages/materials/PlaudGuidePage.tsx`

**Remove entirely:**
- `Contact`, `Partners` components
- All `sky-*` colors → use site palette (`#49BED8` for step numbers only)
- Dark `bg-slate-900` AutoFlow section
- Red `bg-red-50` payment section
- Tariff cards section
- Security certificates grid
- CTA "Обсудить в Telegram" button
- `benefitCards` / `valueCards` sections
- "5 минут вместо часа" accent block
- Gradient on hero
- All Lucide icons except possibly ChevronDown in accordion

**Screenshot placeholder (reused everywhere):**
```jsx
<div className="rounded-xl border-2 border-dashed border-border/40 bg-secondary/30 aspect-video flex items-center justify-center">
  <p className="text-sm text-muted-foreground">Сюда будет добавлен скриншот</p>
</div>
```

**10 sections, each with specific layout:**

#### 1. Header
- White bg, `max-w-4xl`, centered
- H1: `text-foreground` font-bold
- One line subtitle in `text-muted-foreground`
- No badge, no buttons, no cards

#### 2. Что такое PLAUD
- 2–3 short paragraphs of text
- Below: full-width screenshot placeholder (large, `aspect-video`)

#### 3. Какую модель выбрать
- `Table` component (keep existing data)
- Below table: one-line tip in light callout (`bg-secondary/30 rounded-xl px-5 py-3`)
- No screenshot needed

#### 4. Как начать (KEY BLOCK)
- Each of the 5 steps rendered as:
  - **Desktop**: 2-col grid — left: step card (number circle `bg-[#49BED8]` + title + 1-line desc), right: screenshot placeholder
  - **Mobile**: stack vertically (step card, then placeholder below)
- `grid grid-cols-1 md:grid-cols-2 gap-6` per step, `space-y-8` between steps

#### 5. Как пользоваться (кнопки / режимы)
- Each usage item as 2-col block:
  - Left: title, "Что делает", "Когда использовать"
  - Right: screenshot placeholder
- Stacks on mobile

#### 6. Приложение (функции)
- NO icon cards. Each feature (Transcript, Summary, Ask PLAUD, Templates, Export, Search) as:
  - 2-col block: left = what/why/how text, right = screenshot placeholder
  - `space-y-10` between features
  - Light divider between them (`border-b border-border/30`)

#### 7. Облако
- 2-col layout:
  - Left: 4 sub-sections as short text blocks (что на устройстве / что в облаке / зачем / можно ли без)
  - Right: screenshot placeholder
- Light bg `bg-secondary/30` to highlight importance

#### 8. Как оплачивать
- Plain text with structured list items (no cards, no colors):
  - Как работает лимит минут
  - Что происходит, когда минуты заканчиваются
  - Где посмотреть остаток
  - Как купить дополнительные минуты
- One screenshot placeholder at bottom (optional)

#### 9. Частые ошибки
- 3 simple cards: light bg `bg-secondary/30 rounded-xl p-5`
- Text only: error title (bold) + consequence (muted)
- No red, no icons

#### 10. FAQ
- Accordion, same as now but cleaner:
  - No custom styling on trigger — use default accordion
  - Add "Что делать, если устройство не работает?" question
  - No decorative elements

**Footer:** just `<Footer />` — no Contact, no Partners

### Styling rules
- All text: `text-foreground` (#212121) for headings, `text-muted-foreground` (#6B6B6B) for body
- Accent `bg-[#49BED8]` only on step number circles
- Cards: `rounded-xl border border-border/30 bg-white shadow-soft p-5`
- Section spacing: `py-12 md:py-16`
- Alternating white / `bg-secondary/30` backgrounds
- No gradients, no dark sections, no red/amber colors

### Files changed
1. `src/pages/materials/plaud-guide-sections.tsx` — trim to instruction data only
2. `src/pages/materials/PlaudGuidePage.tsx` — rewrite as 10-section instruction manual

