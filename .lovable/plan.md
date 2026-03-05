

## Plan: Content & Visual Enhancements for Blog Post

### Changes to `src/data/blogPosts.ts`

**1. Add "promise" paragraph after intro**
Append to `intro` field: "После этой статьи вы сможете самостоятельно оценить качество вашего ИИ-ассистента, выявить скрытые ошибки и понять, где система нуждается в доработке."

**2. Restructure section_2 (6 types of checks)**
Move the 6 items from `content` string into `list` array as numbered items ("1. Точность извлечения факта — ..."), so renderer displays them as mini-cards with number badges. Keep only the introductory sentence in `content`.

**3. Rename section_4 heading**
Change "Как выглядит правильное тестирование RAG-системы на практике" → "Тестирование RAG-системы по базе знаний компании: как это выглядит на практике" (closes the target search query).

**4. Update excerpt with "корпоративный ИИ-помощник"**
Change excerpt to: "Как проверить, что корпоративный ИИ-помощник работает точно по внутренним документам и не галлюцинирует. 6 типов тестов для RAG-системы с примерами, чек-листом и реальными кейсами."

**5. Add SEO keyword**
Add "корпоративный ИИ-помощник" to `seo.keywords`.

**6. Update conclusion**
Append personal CTA paragraph: "Если хочется понять, как выглядит тест-план именно под вашу базу знаний — приходите с документами на консультацию, разберём на живых примерах."

### Changes to `src/pages/BlogPost.tsx`

**7. Update CTA block text**
Change heading to: "Хотите проверить вашего ИИ-ассистента?" with subtext "Запросите аудит — разберём на примерах ваших документов" and button text "Запросить аудит ИИ-ассистента".

### Files to modify
- `src/data/blogPosts.ts` — content updates (items 1-6)
- `src/pages/BlogPost.tsx` — CTA block text (item 7)

