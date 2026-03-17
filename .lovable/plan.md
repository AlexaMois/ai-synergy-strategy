

## Plan: Fix Breadcrumbs + Add Video to Block 2

### 3 changes in 1 file + 1 asset copy

**1. Copy video asset**
- Copy `user-uploads://0a1c83a122774c59aa8a.webm` → `src/assets/plaud/plaud-demo.webm`

**2. Edit `src/pages/materials/PlaudGuidePage.tsx`**

**a) Add video import** (after line 18):
```tsx
import plaudDemo from "@/assets/plaud/plaud-demo.webm";
```

**b) Fix breadcrumbs** (lines 118-121): Remove duplicate "Главная" and fix materials href:
```tsx
parentPages={[
  { label: "Материалы", href: "/materials" },
]}
```

**c) Replace Block 2 visual** (line 152): Replace the `ScreenshotPlaceholder` with a video element:
```tsx
<video
  src={plaudDemo}
  controls
  muted
  playsInline
  preload="metadata"
  className="w-full rounded-xl"
  poster={plaudHeroDevice}
/>
```
This uses the hero device image as poster frame and falls back gracefully if video fails to load.

### Files changed
- `src/assets/plaud/plaud-demo.webm` — new (copied from upload)
- `src/pages/materials/PlaudGuidePage.tsx` — 3 edits (import, breadcrumbs, video)

