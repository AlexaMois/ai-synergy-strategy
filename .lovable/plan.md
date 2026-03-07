

## Plan: Professional Print-Ready Checklist

### Problem
1. Accordion CSS selectors for print don't match Radix's actual DOM — blocks stay collapsed
2. Print output looks like a webpage screenshot, not a professional working tool with checkboxes
3. Need logo + contact info in print header, no buttons/CTA

### Fix 1: Correct print CSS selectors (`src/index.css`)

Replace current `@media print` block with correct Radix accordion selectors:
```css
/* Radix accordion content uses [data-state] directly on the content element */
[data-state="closed"][role="region"],
[data-state="closed"].overflow-hidden {
  display: block !important;
  height: auto !important;
  overflow: visible !important;
  opacity: 1 !important;
  animation: none !important;
}
```

Also hide: accordion trigger chevrons/expand-text, Partners section, the accordion trigger indicators.

### Fix 2: Add checkbox columns to question tables for print (`src/pages/materials/Checklist30Page.tsx`)

Add 3 extra columns to each question table that are hidden on screen but visible in print:
- ✅ (Точно) | ⚠️ (Частично) | ❌ (Неверно) — each as an empty checkbox cell `☐`

This makes it a real working tool: print → go through questions → check boxes.

Add CSS class `print-only-col` for these columns (hidden on screen, visible in print).

### Fix 3: Print-only footer with contact info

Add a print-only footer block at the bottom with:
- `+7 995 078 88 37` | `ai@aleksamois.ru` | `aleksamois.ru`
- "Для профессионального аудита — свяжитесь с НейроРешения"

### Files to Edit
- **`src/index.css`** — rewrite `@media print` with correct selectors, add `print-only-col` utility
- **`src/pages/materials/Checklist30Page.tsx`** — add print-only checkbox columns to tables, add print-only footer

