

## Найдена критическая проблема: `index.html` — сломанные ссылки на изображения

### Что не так

Файл `index.html` — это **фоллбэк для всех поисковых роботов**, которые не выполняют JavaScript. Сейчас в нём **6 ссылок на Google Storage**, которые ненадёжны и могут сломаться:

| Строка | Тег | Текущее значение |
|--------|-----|-----------------|
| 113 | `og:image` | `storage.googleapis.com/gpt-engineer-file-uploads/...` |
| 122 | `twitter:image` | `storage.googleapis.com/gpt-engineer-file-uploads/...` |
| 152 | JSON-LD Organization `logo` | `storage.googleapis.com/...` |
| 179 | JSON-LD Person `image` | `storage.googleapis.com/...` |
| 202 | JSON-LD LocalBusiness `image` | `storage.googleapis.com/...` |

Helmet на страницах перезаписывает meta-теги, но **JSON-LD в `index.html` остаётся как есть** и виден всем роботам.

### Что нужно сделать

**1 файл: `index.html`** — заменить все Google Storage URL:

- `og:image` и `twitter:image` → `https://aleksamois.ru/og-image.png`
- JSON-LD `logo` (Organization) → `https://aleksamois.ru/og-image.png`
- JSON-LD `image` (Person) → `https://aleksamois.ru/og-image.png`
- JSON-LD `image` (LocalBusiness) → `https://aleksamois.ru/og-image.png`

Это последнее, что осталось. После этого все ссылки на изображения по всему сайту будут указывать на ваш собственный домен — надёжно и постоянно.

На дизайн и контент сайта это **не влияет** — все изменения только в `<head>`.

