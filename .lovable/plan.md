

## Plan: Fix Print Mode, Summary Table UX, and Audit CTA Navigation

### Issues to Fix

1. **Print/PDF mode**: Accordion blocks are collapsed when printing — need `@media print` styles to force them open, hide navigation/buttons/contact form, and add logo + phone number header
2. **Summary results table**: The dashes ("—") are confusing — redesign as a fillable template with empty cells and clear labels
3. **"Запросить аудит" button**: Uses `scrollToContact()` which navigates to homepage instead of scrolling to the Contact section on the same page

---

### 1. Add print styles to `src/index.css`

Add `@media print` block:
- Force all accordion content visible (`[data-state=closed]` → display block, no animation)
- Hide: Navigation, Footer, Partners, PageBreadcrumbs, CTA buttons, Contact form, cookie consent
- Add a print-only header block with logo (`logo-horizontal.png`) and phone number `+7 995 078 88 37`
- Hide the "Что дальше?" double CTA section
- Ensure tables don't break across pages (`break-inside: avoid`)

### 2. Add print-only header to `src/pages/materials/Checklist30Page.tsx`

Add a hidden-on-screen, visible-on-print block at the top of `<main>` with:
- Logo image (import `logoHorizontal`)
- Phone: `+7 995 078 88 37`
- Email: `ai@aleksamois.ru`

### 3. Redesign Summary Results Table in `src/pages/materials/Checklist30Page.tsx`

Replace dashes with empty cells that have light dotted borders (visual cue "fill in here"). Add a print-friendly checkbox column or simply leave cells blank with enough space. Change column headers to be clearer:
- "Блок" | "Вопросов" | "✅ Точно" | "⚠️ Частично" | "❌ Неверно" | "% точных"
- Empty cells instead of "—" so it's obvious this is a template to fill in
- Add a subtle instruction line above the table: "Заполните таблицу по результатам тестирования"

### 4. Fix `scrollToContact` in `src/pages/materials/Checklist30Page.tsx`

The current logic checks `location.pathname !== '/'` and navigates to `/#contact`. Since we're on `/materials/checklist-30`, it always navigates away. Fix: scroll directly to `#contact` on the current page (Contact component is already rendered on this page).

```typescript
const scrollToContact = () => {
  const element = document.querySelector('#contact');
  if (element) {
    const navHeight = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};
```

### Files to Edit
- **`src/index.css`** — add `@media print` styles for accordion expansion, element hiding
- **`src/pages/materials/Checklist30Page.tsx`** — fix scrollToContact, redesign summary table, add print-only header with logo/phone

