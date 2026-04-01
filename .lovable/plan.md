

## Plan: Add noindex to NotFound page

**File: `src/pages/NotFound.tsx`**

Add `react-helmet-async` import and a `<Helmet>` block with `<meta name="robots" content="noindex, nofollow" />` and a proper title, matching the pattern used across all other pages in the project.

