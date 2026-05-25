## Что делаю

Перестраиваю hero на странице `/about` по схеме главной: бирюзовый блок во всю ширину, светлый текст, справа — ваше фото с удалённым задним фоном и тенями (как у «человечка» на главной).

## Шаги

1. **Фото**: копирую `user-uploads://photo_2026-05-25_18-16-19.jpg` → `src/assets/alexandra-about.png` и через `imagegen--edit_image` с `transparent_background=true` получаю прозрачный PNG (тот же файл).
2. **`src/pages/About.tsx`, hero-секция**:
   - Меняю плашку `bg-surface-mint` → `bg-accent` (бирюза) с тем же `rounded-[40px]` и `shadow-plate-lg`.
   - Возвращаю двухколоночную сетку `md:grid-cols-12`, левая колонка `md:col-span-7`, правая `md:col-span-5`.
   - Тексты перекрашиваю в светлые тона: заголовок `text-background`, акцентное «Моисеева» `text-background/95` курсивом, подзаголовок `text-background/90`, абзац `text-background/80`. Эйбраун «Обо мне» — `text-background/70`.
   - Кнопки: `PillButton variant="light"` и `variant="ghost-light"` (как на главной), чтобы читались на бирюзовом.
   - Правая колонка: фото `src/assets/alexandra-about.png`, выравнивание `items-end self-end`, под фото — мягкая «земляная» тень эллипсом (`absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-6 rounded-[50%] bg-black/30 blur-xl`), у самой картинки — двойной `drop-shadow` фильтр, как у hero-character на главной.
3. Убираю прежний контейнер с белой рамкой/блюром (`bg-background/55 backdrop-blur-md ring-1 ring-foreground/10 shadow-plate p-2 md:p-3`) — фото будет «вписано» в бирюзу без рамки.

## Нюансы

- Старый `alexandraHeadshot` остаётся в импортах для других секций страницы (если используется ниже) — трогаю только hero. Если он больше нигде не нужен, удалю импорт.
- Если после удаления фона по краям останется светлый ореол — повторю обработку с уточнённым промптом.
- Текст и CTA не меняю (оставляю как сейчас): заголовок, подзаголовок, абзац про агентство, две кнопки.
