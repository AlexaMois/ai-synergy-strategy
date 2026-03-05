

## Plan: Redesign Blog Post Layout — Images Side-by-Side with Text

### Problem
Images are full-width and visually overwhelming. The article feels flat — no visual anchors, no rhythm, monotonous text blocks.

### Changes to `src/pages/BlogPost.tsx`

**1. Images: 1/3 width, floated alongside text**

Replace the `BlogPostImage` component and image rendering logic:

- Single images (`section.image`): render in a **2-column grid** — 2/3 text + 1/3 image side-by-side, alternating left/right per section (even sections: image right, odd: image left)
- Multiple images (`section.images`): render in a **compact horizontal grid** (2-3 columns) with smaller thumbnails, not stacked vertically
- `introImage`: same 1/3 treatment, floated right next to intro text

**2. Visual improvements for readability**

- Add **section numbering** or **accent left border** on section headings (a thin primary-color bar) to create visual rhythm
- Style the **numbered list items** in section_2 (6 types of checks) as **mini-cards** with a number badge, subtle background, and border — making them scannable
- Add **subtle dividers** or **alternating background tints** between sections to break monotony
- Make the **conclusion block** more visually distinct — add an icon or quote-style treatment
- FAQ section: add subtle card styling to each accordion item

**3. Specific CSS/layout changes**

- `BlogPostImage`: change from `w-full` to `max-w-[280px] md:max-w-[320px]` with `rounded-xl shadow-soft`
- Section with image: wrap in `flex flex-col md:flex-row gap-6 items-start`, text in `flex-1`, image in `md:w-1/3`
- Multiple images: `grid grid-cols-2 md:grid-cols-3 gap-4` with smaller thumbnails
- Section headings: add `border-l-4 border-primary pl-4` accent
- Section_2 list items: styled as cards with number badges

### Files to modify
- `src/pages/BlogPost.tsx` — layout restructure, visual enhancements

