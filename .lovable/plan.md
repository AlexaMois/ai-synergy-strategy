

## План: полная замена контента PlaudGuidePage

### Структура файлов

Два файла вместо одного:

**1. `src/pages/materials/plaud-guide-sections.tsx`** (~1200 строк) — массив `sections` с JSX-контентом

Экспортирует:
- `GuideSection` interface: `{ id, icon, title, borderColor, tags, content: React.ReactNode, image, imageAlt }`
- `sections: GuideSection[]` — 18 секций + вводная (19 элементов)
- `faqItems: { question: string; answer: string }[]` — 10 вопросов для FAQ аккордеона

Каждая секция содержит inline JSX с:
- Нумерованные шаги — `bg-gray-50 rounded-xl p-4`, номер в `w-7 h-7 rounded-full bg-primary text-white`
- Таблицы — `Table` компонент с striped rows (`even:bg-gray-50`)
- Предупреждения ⚠️ — `bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4`
- Подсказки 💡 — `bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4`
- H3 подзаголовки внутри секций

Цвета полосок (только из конфига):
| Секция | border-l-4 цвет |
|---|---|
| Вводная (Что такое PLAUD) | border-violet-500 |
| Ч.1 Модели | border-blue-500 |
| Ч.2 Кнопки | border-red-500 |
| Ч.3 Приложение | border-green-500 |
| Ч.4 Личный кабинет | border-indigo-500 |
| Ч.5 Меню профиля | border-gray-400 |
| Ч.6 Membership Center | border-yellow-500 |
| Ч.7 Боковая панель | border-sky-500 |
| Ч.8 Папки | border-orange-500 |
| Ч.9 Открытый файл | border-slate-600 |
| Ч.10 Плеер | border-green-500 |
| Ч.11 Стенограмма | border-blue-500 |
| Ч.12 Саммари | border-violet-500 |
| Ч.13 Ask Plaud | border-emerald-500 |
| Ч.14 AutoFlow | border-yellow-500 |
| Ч.15 Тарифы | border-green-500 |
| Ч.16 Оплата из России | border-red-500 |
| Ч.17 Безопасность | border-slate-600 |
| Ч.18 FAQ | border-sky-500 |

**2. `src/pages/materials/PlaudGuidePage.tsx`** (~150 строк) — страница-оболочка

Импортирует `sections` и `faqItems` из `./plaud-guide-sections`.

Содержит:
- SEO: Helmet с title, description, canonical, OG/Twitter, JSON-LD HowTo schema (18 steps из sections)
- PageBreadcrumbs: Материалы → Ресурсы → Инструкция по PLAUD
- Hero: H1 «Инструкция по PLAUD на русском языке» + подзаголовок
- Поиск: Input + кнопка, `max-w-2xl`, `rounded-2xl`; `useMemo` фильтрация по `tags` и `title`
- Рендер карточек: `filteredSections.map()` — каждая карточка `bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow border-l-4`
  - Иконка + H2 в одной строке
  - `section.content` (JSX)
  - `<img>` с lazy loading
- Разделитель между частями: номер части в кружке + hr
- Часть 18 (FAQ): `Accordion` с `type="single" collapsible`, каждый `AccordionItem` с `value={`faq-${index}`}`, без defaultValue
- «Не нашли ответ?» блок с ссылкой на t.me/aleksamois
- Contact, Partners, Footer

### Контент секций (из документа)

Весь текст берётся дословно из загруженного документа:

- **Вводная**: 3 шага работы, текст про ИИ на 112 языках
- **Ч.1**: Таблица 4 модели (Note/Note Pro/NotePin/NotePin S), блок «Не знаете что выбрать?», список общих черт
- **Ч.2**: Переключатель режимов (серый/красный), кнопка записи (старт/стоп с вибрациями), NotePin, зарядка (30ч/20ч)
- **Ч.3**: 5 шагов первого запуска (скачать → зарегистрироваться → Bluetooth → синхронизировать → Generate)
- **Ч.4**: web.plaud.ai вход, что видно на главной (Recent files, длительность, дата, папки, три точки)
- **Ч.5**: Таблица меню профиля (Settings/Membership/Help/Download/Sign out)
- **Ч.6**: Блок тарифа, Transcription quota, три карточки статистики, Usage insights, Billing & subscription
- **Ч.7**: 6 пунктов боковой панели (Add audio/Search/Home/Ask Plaud/Template Community/Explore) с шагами
- **Ч.8**: Системные разделы (All files/Unfiled/Trash 30 дней), создание папки (5 шагов), перемещение (2 варианта)
- **Ч.9**: Export (таблица форматов), Share (4 шага + отзыв), Три точки (5 пунктов)
- **Ч.10**: Таблица элементов плеера (6 строк), лайфхак 1.5x
- **Ч.11**: Переименование спикеров (5 шагов), редактирование текста, поиск Ctrl+F
- **Ч.12**: Шаблоны (стандартные + профессиональные), смена шаблона (5 шагов), перегенерация бесплатна, кнопка +
- **Ч.13**: Готовые вопросы, своё поле ввода, примеры вопросов, 3 кнопки (черновик/задачи/пункты действий)
- **Ч.14**: Пример AutoFlow (3 шага), ⚠️ только мобильное приложение, 7 шагов настройки (WHEN/DO), пример использования
- **Ч.15**: Стартовый план (300 минут), когда кончатся, платные планы
- **Ч.16**: ⚠️ карты РФ не проходят, OplataZabugor (5 шагов), plaud.ru альтернатива
- **Ч.17**: 6 сертификатов, что значит на практике (3 пункта), отключение облака (3 шага)
- **Ч.18**: 10 FAQ в аккордеоне (интернет, точность, редактирование, спикеры, Zoom, лекции, языки, iPhone, хранение, интервью)

### Файлы для изменения

1. **Новый**: `src/pages/materials/plaud-guide-sections.tsx`
2. **Перезапись**: `src/pages/materials/PlaudGuidePage.tsx`

