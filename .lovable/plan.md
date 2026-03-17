

## Plan: Convert PLAUD Guide from Manual to Conversion Landing Page

Complete rewrite of both files. Current 18-section reference manual → 8-section conversion landing page with visual rhythm, accent blocks, and product-level design.

### File 1: `src/pages/materials/plaud-guide-sections.tsx` → DELETE old content, replace with new landing sections

No more `sections` array with 18 items. Instead, export lightweight data for the new 8 blocks. The page itself will render each section as a unique layout component (not uniform cards).

### File 2: `src/pages/materials/PlaudGuidePage.tsx` → Full rewrite

**8 sections, each with distinct visual format for rhythm:**

#### 1. Hero (full-width gradient)
- H1: «Как использовать PLAUD, чтобы не терять ни одной мысли»
- Subtitle: «Показываю, как за 5 минут превратить голос в структурированный текст, задачи и выводы»
- Badge below: «Подходит для бизнеса, встреч, обучения и ежедневной работы»
- Gradient bg `from-slate-50 via-white to-white`, centered, max-w-3xl

#### 2. Value cards (4-column grid on desktop, 2 on mobile)
- H2: «Что это даёт»
- 4 cards: 🎧 Записывает / 🧠 Конспект / 📄 Главное / ⏱ Экономит
- Each card: `bg-white rounded-2xl border shadow-sm p-6`, emoji icon top, bold title, `→ result` in muted text
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`

#### 3. How it works (accent block — full-width colored bg)
- H2: «Как PLAUD превращает голос в результат»
- Visual flow: 4 steps in horizontal chain with arrows (vertical on mobile)
- `Ты говоришь → записывает → анализирует → готовый текст`
- Accent callout: `bg-slate-900 text-white rounded-2xl p-8` with large text «Не просто расшифровка, а уже структурированная информация»

#### 4. Interface breakdown (3 columns with icons)
- H2: «Интерфейс PLAUD: что здесь важно»
- 3 blocks side-by-side: Запись / Обработка / Результат
- Each: icon top, H3, bullet list
- Placeholder image slot: `bg-slate-100 rounded-xl aspect-video` with text «Скриншот интерфейса»

#### 5. Step-by-step scenario (numbered steps, alternating layout)
- H2: «Как использовать PLAUD — простой сценарий»
- 4 large steps, each in a card with big number, title, description
- Step 4 has sub-bullets (задача / документ / контент)

#### 6. Use cases (3-column cards with icons)
- H2: «Где это реально полезно»
- 3 cards: В бизнесе / В обучении / В жизни
- Each with emoji, H3, bullet list of examples
- `bg-white rounded-2xl shadow-sm border p-6`

#### 7. Common mistakes (accent callout style)
- H2: «Частые ошибки»
- 3 items in `bg-amber-50 rounded-xl` blocks
- Each: ❌ Error title → ✅ Why it matters
- Builds trust through transparency

#### 8. Summary + CTA
- H2: «Что в итоге»
- Large accent text: «PLAUD — это не диктофон. Это инструмент, который превращает речь в результат.»
- CTA button linking to Contact or Telegram

### Visual rhythm (as requested)
```
text → cards → accent block → columns+image → steps → cards → warnings → CTA
```

Every 1–2 blocks format changes. Max 3 lines of text before whitespace.

### Accent block component
Large number/phrase in `bg-slate-900 text-white rounded-2xl` or `bg-sky-50 rounded-2xl` — used for «5 минут вместо часа» style callouts.

### SEO preserved
- Helmet with updated title/description matching new copy
- JSON-LD HowTo schema with 4 steps
- Canonical URL unchanged

### Files changed
1. **Rewrite** `src/pages/materials/plaud-guide-sections.tsx` — slim data file with card items, steps, use cases, mistakes, FAQ
2. **Rewrite** `src/pages/materials/PlaudGuidePage.tsx` — 8-section landing page with distinct visual layouts per block

### What's removed
- 18-section manual format
- Search bar (no longer needed — page is short and scannable)
- Anchor navigation pills (page is linear now)
- Part number dividers

