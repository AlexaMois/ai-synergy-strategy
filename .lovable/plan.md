

# Create SEOHead Component

## Key Finding
The project currently uses `react-helmet` (not `react-helmet-async`) across all 30+ pages. The provided code imports from `react-helmet-async`, which is a different package.

## Two Options

**Option A (Recommended): Use existing `react-helmet`**
- Change the import to `import { Helmet } from 'react-helmet'` to match the rest of the project
- No new dependencies needed
- Zero risk of breaking existing pages

**Option B: Migrate to `react-helmet-async`**
- Install `react-helmet-async`, wrap App in `HelmetProvider`, update all 30+ page imports
- More work, higher risk, not necessary for this task

## Plan (Option A)

### Step 1: Create `src/components/SEOHead.tsx`
```tsx
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '@/config/seoConfig';

export const SEOHead = () => {
  const location = useLocation();
  const path = location.pathname;
  const config = seoConfig[path] || seoConfig['/'];

  return (
    <Helmet>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <link rel="canonical" href={config.canonical} />
      <meta property="og:title" content={config.ogTitle} />
      <meta property="og:description" content={config.ogDescription} />
      <meta property="og:url" content={config.canonical} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={config.ogTitle} />
      <meta name="twitter:description" content={config.ogDescription} />
    </Helmet>
  );
};
```

Only difference from your code: `react-helmet` instead of `react-helmet-async` to stay consistent with the project.

No new dependencies needed. The `@/config` path alias already works (the `seoConfig.ts` file was just created there).

