

## Аудит: что уже есть и чего не хватает

### Уже реализовано (хорошо)
- robots.txt с разрешениями для основных ботов (Google, Yandex, Bing, Perplexity)
- sitemap.xml с автогенерацией через Vite-плагин
- JSON-LD: Organization, Person, LocalBusiness, ProfessionalService, WebSite, BreadcrumbList
- FAQPage schema на /faq
- BlogPosting schema на блог-постах
- OG/Twitter мета-теги на всех страницах
- Canonical URLs, hreflang для RU/СНГ
- Yandex.Metrica + Google Analytics

### Что нужно добавить

#### 1. Файл `public/llms.txt` — стандарт для AI-поисковиков
Новый стандарт (аналог robots.txt для нейросетей). Perplexity, ChatGPT Search, Gemini и другие AI-системы читают этот файл, чтобы понять суть сайта и какие страницы важны. Содержит краткое описание бизнеса, ключевые страницы, услуги, контакты.

#### 2. Файл `public/llms-full.txt` — расширенная версия
Подробное описание каждой услуги, кейсов, экспертизы — для AI-систем, которые хотят глубокий контекст.

#### 3. Разрешить AI-ботов в `robots.txt`
Добавить явные разрешения для:
- `GPTBot` (OpenAI/ChatGPT Search)
- `Google-Extended` (Gemini)
- `ClaudeBot` (Anthropic)
- `ChatGPT-User`
- `Applebot-Extended` (Apple Intelligence)
- `cohere-ai`

#### 4. Добавить `Speakable` schema на главную
Google использует Speakable для голосовых ответов — пометить ключевые блоки текста (description, услуги) как "озвучиваемые".

#### 5. Улучшить BlogPosting schema
Сейчас `datePublished` содержит русскую дату ("5 марта 2026") — поисковики ожидают ISO формат. Добавить `mainEntityOfPage`, `image`, `dateModified`, `wordCount`, `inLanguage`.

#### 6. Добавить `SiteNavigationElement` schema
Помогает поисковикам и AI понять структуру навигации сайта.

---

### Файлы и изменения

| Файл | Действие |
|------|----------|
| `public/llms.txt` | Создать — краткое описание для AI |
| `public/llms-full.txt` | Создать — полное описание для AI |
| `public/robots.txt` | Добавить GPTBot, ClaudeBot и др. |
| `src/pages/Index.tsx` | Добавить Speakable + SiteNavigationElement schema |
| `src/pages/BlogPost.tsx` | Исправить datePublished на ISO, добавить поля |

