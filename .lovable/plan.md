

## Plan: 30-Question Checklist — Lead Magnet Page + Blog & Resources Integration

### 1. Create `src/pages/materials/Checklist30Page.tsx`

Standalone page at `/materials/checklist-30`, following existing `ChecklistPage.tsx` pattern (Navigation, Footer, Contact, Partners, PageBreadcrumbs, Helmet SEO, `window.print()`).

**Structure:**
- **Header**: Title "Чек-лист: 30 вопросов для тестирования ИИ-ассистента по базе знаний компании" + micro-CTA subtitle: *«Используйте как шаблон для аудита вашего корпоративного ИИ-ассистента»*
- **Author block**: portrait + "Александра Моисеева, НейроРешения" (same pattern as existing checklist)
- **"How to use" card**: 4-step instructions + 80% threshold callout
- **6 Accordion blocks** with Tables (3 columns: #, Тип вопроса, Пример — web-readable, no fillable fields):
  - Блок 1: Точность извлечения факта (questions 1-5)
  - Блок 2: Исключения и граничные условия (6-10)
  - Блок 3: Многошаговые и составные запросы (11-15)
  - Блок 4: Отсутствующая информация (16-20, includes Эталон column since it has meaningful reference answers)
  - Блок 5: Ловушки с ложными предпосылками (21-25, includes Эталон)
  - Блок 6: Конфликты между документами (26-30, includes Эталон)
- **Summary results table**: 6 blocks + totals
- **Interpretation table**: 4 rows with color-coded badges (90-100% green, 70-89% yellow, 50-69% orange, <50% red)
- **Error patterns**: 6 mini-cards (numbered, same style as blog post cards)
- **Double CTA at bottom**: "Распечатать / Сохранить PDF" (`window.print()`) + "Запросить аудит вашей системы" (scrolls to contact)

### 2. Edit `src/App.tsx`

- Add lazy import: `const Checklist30Page = lazy(() => import("./pages/materials/Checklist30Page"))`
- Add route `<Route path="/materials/checklist-30" element={<Checklist30Page />} />` near other materials routes

### 3. Edit `src/config/routes.ts`

- Add `/materials/checklist-30` to `ALLOWED_ROUTES`

### 4. Edit `src/pages/BlogPost.tsx`

Insert a lead-magnet banner between conclusion (line ~313) and FAQ (line ~316) for slug `testirovanie-ii-assistenta-baza-znanii`:
- Gradient card with left accent border, ClipboardCheck icon
- Headline: "Скачать чек-лист: 30 вопросов для проверки ИИ-ассистента"
- Link button to `/materials/checklist-30`

### 5. Edit `src/pages/ResourcesPage.tsx`

Add new resource item at top of array:
- id: 11, category: "checklists", title: "Чек-лист «30 вопросов для тестирования ИИ-ассистента»", status: "ready", link: "/materials/checklist-30"

### Files
- **Create**: `src/pages/materials/Checklist30Page.tsx`
- **Edit**: `src/App.tsx`, `src/config/routes.ts`, `src/pages/BlogPost.tsx`, `src/pages/ResourcesPage.tsx`

