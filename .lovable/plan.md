

## Plan: Fix Print — Force Accordion Content Into DOM

### Root Cause
Radix Accordion **removes content from the DOM** when closed (no `forceMount`). CSS cannot show elements that don't exist in the DOM. That's why print CSS selectors have no effect — there's nothing to target.

### Fix

**File: `src/pages/materials/Checklist30Page.tsx`**

1. Add `forceMount` prop to every `<AccordionContent>` so content is always in the DOM regardless of open/close state
2. Radix will set `data-state="closed"` with `height: 0; overflow: hidden` on screen — existing behavior unchanged
3. Print CSS already targets `[data-state="closed"].overflow-hidden` with `height: auto !important` — will now work because content IS in the DOM

Single change at line ~200:
```tsx
<AccordionContent forceMount>
```

**File: `src/index.css`** — minor tweak to ensure `forceMount` closed state is properly hidden on screen but visible in print:

Add a rule outside `@media print` to ensure `forceMount` closed content stays visually hidden on screen:
```css
/* Ensure forceMount accordion content hidden on screen when closed */
[data-radix-accordion-content][data-state="closed"] {
  height: 0 !important;
  overflow: hidden !important;
}
```

The existing `@media print` block already has the override rules — they'll now actually work since content is in the DOM.

### Files
- **Edit**: `src/pages/materials/Checklist30Page.tsx` (add `forceMount` to `AccordionContent`)
- **Edit**: `src/index.css` (add screen-only hide rule for forceMount closed state)

