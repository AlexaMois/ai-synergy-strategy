

## Plan: Fix breadcrumb click overlap

### Single change

**File: `src/pages/materials/PlaudGuidePage.tsx`** (line ~116)

Add `relative z-20` to the breadcrumb container div:

```tsx
<div className="container mx-auto px-4 pt-24 pb-4 relative z-20">
```

This ensures breadcrumb links sit above the overflowing logo click area without touching `Navigation.tsx`.

### Post-fix verification
After applying, test:
- Click "Материалы" breadcrumb → should go to `/materials`
- Click "Главная" → should go to `/`
- Header logo and nav still work on desktop/mobile

