

## План: Исправить недостающие мета-теги на /blog и /start

### Проблема
- `/blog` — нет canonical, og:url, og:image, og:type
- `/start` — нет og:url, og:image

### Изменения

#### 1. `src/pages/Blog.tsx` (строки 51-57)
Добавить после keywords:
```
<link rel="canonical" href="https://aleksamois.ru/materials/blog" />
<meta property="og:title" content="Блог об автоматизации бизнеса с ИИ — практические разборы и гайды | Александра Моисеева" />
<meta property="og:description" content="Статьи о внедрении искусственного интеллекта: диагностика, ROI, архитектура, ошибки проектов..." />
<meta property="og:url" content="https://aleksamois.ru/materials/blog" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://aleksamois.ru/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://aleksamois.ru/og-image.png" />
```

#### 2. `src/pages/start/StartPage.tsx` (строки 40-41)
Добавить после og:description:
```
<meta property="og:url" content="https://aleksamois.ru/start" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://aleksamois.ru/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://aleksamois.ru/og-image.png" />
```

### Файлы (2)
| Файл | Изменения |
|------|-----------|
| `src/pages/Blog.tsx` | canonical + og:url/image/type + twitter |
| `src/pages/start/StartPage.tsx` | og:url/image/type + twitter |

