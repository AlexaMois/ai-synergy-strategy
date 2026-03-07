

## SEO Analysis: Why Organic Traffic Dropped

### Root Cause

Your site is a **client-side SPA** (Single Page Application). This means:
- When a search engine bot visits any page, it first sees only the `index.html` shell
- Page-specific content (titles, descriptions, text) is rendered by JavaScript
- **Yandex bot has limited JavaScript rendering** — it may see only the generic `index.html` title/description for ALL 25+ pages instead of page-specific content

This was always the case, but Yandex periodically re-evaluates rendering quality, and recent algorithm changes may have started penalizing SPA sites more heavily.

### Issues Found

1. **No prerendering/SSG** — the biggest issue. All 25+ pages return the same HTML to bots. Yandex sees one title for everything.

2. **Duplicate `<Navigation />` rendering** — `App.tsx` line 84 renders `<Navigation />` globally, but many pages (ServicesPage, GolossokDemo, DemoPage, etc.) also render their own `<Navigation />`. This creates duplicate navbars.

3. **Duplicate/conflicting meta tags** — `index.html` has `og:title`/`og:description` at lines 319-322, AND each page sets its own via `react-helmet`. Bots may see conflicting signals.

4. **Missing pages in sitemap** — `sitemap.xml` doesn't include `/materials/checklist-30`, individual blog post URLs, or `/legal` page.

5. **Blog posts not in sitemap** — Blog posts are dynamic (`/materials/blog/:slug`) but none appear in the sitemap. These are your most keyword-rich pages.

---

### Plan: Improve SEO for SPA

#### 1. Add prerendering plugin to Vite (`vite.config.ts`)

Install `vite-plugin-prerender` to generate static HTML for all key routes at build time. This gives search bots real HTML content with correct titles, descriptions, and text — the single most impactful fix.

Routes to prerender: `/`, `/start`, `/services`, `/services/diagnostics`, `/services/architecture`, `/services/support`, `/about`, `/cases`, `/pricing`, `/faq`, `/products`, `/materials`, `/materials/blog`, all blog post slugs, all case study pages.

#### 2. Fix duplicate Navigation (`App.tsx` + page files)

Remove the global `<Navigation />` from `App.tsx` line 84, since most pages already render their own. OR remove page-level Navigation from all pages and keep only the global one. Either way, fix the duplication — it adds unnecessary DOM weight and confuses crawlers.

#### 3. Update sitemap with all actual URLs (`public/sitemap.xml`)

Add missing pages:
- `/materials/checklist-30`
- `/legal`
- `/legal/cookies`
- All blog post URLs (extract slugs from `blogPosts.ts`)
- Remove any URLs that no longer exist

#### 4. Clean up conflicting meta tags (`index.html`)

Remove the duplicate `og:title`, `og:description`, `twitter:title`, `twitter:description` at lines 319-322 that conflict with page-level `react-helmet` tags.

#### 5. Switch from `react-helmet` to `react-helmet-async`

`react-helmet` is unmaintained and has known issues with tag deduplication. `react-helmet-async` is the maintained fork and handles meta tag updates more reliably.

---

### Impact Estimate

- **Prerendering** = highest impact. Yandex will finally see unique content per page.
- **Sitemap update** = medium impact. Helps crawlers discover all pages.
- **Meta cleanup** = low-medium. Removes confusing signals.
- **Navigation fix** = low. Reduces page weight, cleaner DOM.

### Files to Edit
- `vite.config.ts` — add prerender plugin
- `package.json` — add `vite-plugin-prerender` dependency
- `src/App.tsx` — fix duplicate Navigation
- `public/sitemap.xml` — add all missing URLs
- `index.html` — remove duplicate meta tags at lines 319-322
- Multiple page files — switch `react-helmet` → `react-helmet-async`

