

## Plan: Add New Blog Post with Inline Images

### What needs to change

The current `BlogPost` interface does not support images or FAQ sections. We need to extend it, add the article data, copy images, and update the renderer.

### 1. Copy uploaded images to project

- `user-uploads://🖼️_ИЗОБРАЖЕНИЯ_-_visual_selection.png` -> `src/assets/blog/rag-system-schema.png` (RAG schema)
- `user-uploads://🖼️_ИЗОБРАЖЕНИЯ_-_visual_selection_1.png` -> `src/assets/blog/llm-hallucinations.png` (hallucination levels)
- `user-uploads://image-145.png` -> `src/assets/blog/test-questions-1.png` (test questions table)
- `user-uploads://image-146.png` -> `src/assets/blog/test-questions-2.png` (test questions table)
- `user-uploads://image-147.png` -> `src/assets/blog/test-questions-3.png` (test questions table)

### 2. Extend BlogPost interface (`src/data/blogPosts.ts`)

Add optional fields to sections and the post:

```typescript
export interface BlogPost {
  // ...existing fields...
  content: {
    intro: string;
    introImage?: { src: string; alt: string }; // image after intro
    sections: {
      heading: string;
      content: string;
      list?: string[];
      image?: { src: string; alt: string }; // image after section
      images?: { src: string; alt: string }[]; // multiple images (for test screenshots)
    }[];
    conclusion: string;
    faq?: { question: string; answer: string }[]; // FAQ block
  };
  // ...
}
```

### 3. Add the new article to `blogPosts` array

Insert at position 0 (newest first) with all 6 sections, FAQ, intro, conclusion, and image references pointing to the imported assets.

- `introImage`: No uploaded image for intro (user said "specialist at laptop" but no file provided — skip or use placeholder text note). Actually, looking again, user said image 1 after intro but didn't provide a separate file for it. The 5 uploaded images map to: RAG schema, LLM hallucinations, and 3 test question screenshots. Let me re-read...

User mapping:
- Image 1 (after intro) — "Specialist at laptop" — no file uploaded for this. Skip.
- Image 2 (after section_2) — RAG schema → `🖼️_ИЗОБРАЖЕНИЯ_-_visual_selection.png`
- Image 3 (after section_3) — LLM hallucinations → `🖼️_ИЗОБРАЖЕНИЯ_-_visual_selection_1.png`
- Image 4 (after section_4) — Test questions screenshots → `image-145.png`, `image-146.png`, `image-147.png`

### 4. Update BlogPost renderer (`src/pages/BlogPost.tsx`)

After the intro paragraph, render `introImage` if present. In the sections loop, after each section's list, render `section.image` or `section.images` as styled `<figure>` elements with rounded corners, shadow, alt text caption.

### 5. Add FAQ rendering in BlogPost.tsx

After the conclusion block, render `post.content.faq` as an accordion or simple Q&A list if present.

### Files to modify
- `src/data/blogPosts.ts` — extend interface + add article
- `src/pages/BlogPost.tsx` — render images and FAQ
- Copy 5 image files to `src/assets/blog/`

### Visual treatment for images
- Rounded corners (`rounded-xl`), subtle shadow, max-width constrained
- Alt text shown as caption below in `text-sm text-muted-foreground`
- Multiple images (test screenshots) displayed in a grid or vertical stack with lightbox support using existing `PhotoLightbox` component

