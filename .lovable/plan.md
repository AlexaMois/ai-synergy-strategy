

## Plan: UI/UX Redesign of `/materials/plaud-guide`

Two files to modify. Content stays identical — only classes, wrappers, and anchor navigation change.

### File 1: `src/pages/materials/plaud-guide-sections.tsx`

**Helper components restyled:**

- `Step`: change to `flex items-start gap-3 rounded-xl bg-sky-50/70 px-4 py-3`, circle becomes `mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-semibold text-white`, text becomes `text-sm md:text-base text-slate-700`
- `Steps`: change wrapper from `bg-gray-50 rounded-xl p-4 space-y-3` to `space-y-3` (background now on each Step)
- `Warning`: change to `flex gap-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900` (remove border-l-4)
- `Tip`: change to `flex gap-3 rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-900` (remove border-l-4)
- All `h3` inside sections: change from `text-lg font-semibold text-foreground` to `mt-2 text-base md:text-lg font-semibold text-slate-900`
- Tables: wrap all `<Table>` in `<div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">` for mobile scrolling

**Remove `borderColor` field** from all section objects (no longer used since border-l-4 is removed).

### File 2: `src/pages/materials/PlaudGuidePage.tsx`

**1. Hero section** — wrap H1+subtitle+search in gradient background:
```
<section className="bg-gradient-to-b from-sky-50/60 via-white to-white pb-10 pt-16 md:pt-24">
```
- H1: `text-4xl md:text-5xl font-bold tracking-tight text-slate-900`
- Subtitle: `text-lg md:text-xl text-slate-500 mt-3 max-w-2xl mx-auto`
- Search input: `bg-white border-2 border-sky-100 rounded-2xl px-5 py-3 shadow-sm focus-visible:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-100`
- Search button: `rounded-2xl px-6 py-3 bg-sky-500 text-white font-semibold hover:bg-sky-600`

**2. Anchor navigation** — add 3 pill-buttons below hero:
```jsx
<div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
  <a href="#plaud-device" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-sky-50 transition-colors">📱 Устройство</a>
  <a href="#plaud-interface" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-sky-50 transition-colors">💻 Интерфейс</a>
  <a href="#plaud-service" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-sky-50 transition-colors">⚙️ Сервис и безопасность</a>
</div>
```
Add `id="plaud-device"` on section id=1, `id="plaud-interface"` on section id=4, `id="plaud-service"` on section id=14.

**3. Page background**: `bg-slate-50/60` on the sections wrapper.

**4. Cards restyled**:
- Remove `border-l-4 ${section.borderColor}`
- New: `rounded-2xl border border-slate-100 bg-white/80 shadow-sm px-4 py-5 md:px-8 md:py-7 flex flex-col gap-4 hover:shadow-md transition-shadow`
- Icon: `w-9 h-9 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center`
- H2: `text-xl md:text-2xl font-semibold text-slate-900`
- Space between cards: `space-y-6 md:space-y-8`

**5. FAQ section restyled**:
- Add `mt-12` to FAQ wrapper
- `AccordionTrigger`: `flex w-full items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 text-left text-sm md:text-base font-medium text-slate-900 hover:bg-slate-50 transition-colors`
- `AccordionContent`: `px-4 pb-4 pt-2 text-sm md:text-base text-slate-700 bg-slate-50/60 rounded-b-xl`

**6. Mobile adjustments**: container `px-4` (already is), cards `px-4 py-5` on mobile via responsive classes.

### Files changed
1. `src/pages/materials/plaud-guide-sections.tsx` — restyle helpers (Step, Steps, Warning, Tip), update h3 classes, wrap tables for mobile, remove `borderColor`
2. `src/pages/materials/PlaudGuidePage.tsx` — hero gradient, anchor nav, card restyling, FAQ restyling, page background

