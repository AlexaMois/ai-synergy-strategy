## Что меняем

Сейчас на главной (`NewHome.tsx`) и на странице «Обо мне» (`About.tsx`) hero‑заголовок задан как `text-5xl md:text-7xl lg:text-8xl` — на десктопе это ~96px, что и видно на присланном скрине (огромное «Александра Моисеева»). На остальных страницах hero уже скромнее (`text-3xl md:text-5xl` ≈ 48px на десктопе), но между страницами есть разнобой.

Привожу H1 первых блоков на всех ключевых страницах к единому адекватному размеру:

**Новый размер для H1 hero:** `text-3xl md:text-4xl lg:text-5xl` (≈ 30 / 36 / 48px).

## Затрагиваемые файлы и строки

- `src/pages/NewHome.tsx:122` — было `text-5xl md:text-7xl lg:text-8xl`
- `src/pages/About.tsx:229` — было `text-5xl md:text-7xl lg:text-8xl`
- `src/pages/services/AddOnsPage.tsx:85` — было `text-4xl md:text-5xl lg:text-6xl`
- `src/pages/start/StartPage.tsx:167` — было `text-3xl md:text-5xl` → выравниваем
- `src/pages/ServicesPage.tsx:116` — было `text-3xl md:text-5xl` → выравниваем
- `src/pages/CasesPage.tsx:157` — было `text-3xl md:text-5xl` → выравниваем
- `src/pages/PricingPage.tsx:208` — было `text-3xl md:text-5xl` → выравниваем
- `src/pages/FAQPage.tsx:278` — было `text-3xl md:text-4xl lg:text-5xl` (уже ок, оставляем)
- `src/pages/Blog.tsx:77` — уже маленький, не трогаем
- `src/pages/services/ServiceDetailPage.tsx:48` — было `text-3xl md:text-5xl` → выравниваем
- `src/pages/services/DiagnosticsPage.tsx`, `ArchitecturePage.tsx`, `AutomationHubPage.tsx`, `SupportPage.tsx` — уже `text-3xl md:text-4xl lg:text-5xl` (оставляем)

## Что НЕ трогаем

- H2 внутренних секций (`text-3xl md:text-5xl`) — остаются как есть, чтобы сохранить визуальную иерархию.
- Шрифт «Iriska» (рукописный «Моисеева») — размер не меняется, только основной H1.
- Кнопки, отступы, изображения hero.

## Результат

На десктопе hero‑заголовок главной уменьшится примерно в 2 раза (с 96px до ~48px) и станет визуально сопоставим с остальными разделами. На мобильных изменения минимальны (30–36px), так что верстка не «съедет».
