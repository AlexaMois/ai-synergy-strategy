

## План: SEO-оптимизация метаданных и H1/вводных текстов на 12 страницах

### Что делаем

Обновляем **три слоя** на каждой из 12 страниц по вашей таблице:
1. **Helmet** (title, description, keywords, og:title, og:description)
2. **H1** — заменяем текст заголовка
3. **Первый абзац** — заменяем вводный текст под H1

### Изменения по файлам

#### 1. Главная — `src/pages/Index.tsx` + `src/components/Hero.tsx`
- **Index.tsx** (строки 143-156): title → «Автоматизация бизнеса с ИИ — убираем рутину и бардак в процессах | Александра Моисеева», description → про директоров производства и торговли, keywords → «автоматизация бизнеса, автоматизация бизнес процессов...», og:title и og:description синхронно. Также обновить `organizationSchema.description` (строка 66).
- **Hero.tsx** (строки 219-230): H1 → «Автоматизация бизнеса с ИИ без лишнего «зоо ИТ»», подзаголовок → «Если у вас всё держится на нескольких людях...»

#### 2. Start — `src/pages/start/StartPage.tsx`
- Helmet (строки ~60-72): title, description, keywords, og:title, og:description
- H1 (строка ~77): → «Диагностика: где автоматизация и ИИ окупятся быстрее всего»
- Вводный абзац (строка ~81): → текст про «Часто директор чувствует...»

#### 3. Услуги — `src/pages/ServicesPage.tsx`
- Helmet (строки ~27-38): title, description, keywords
- H1 (строка ~53): → «Что именно мы автоматизируем в вашем бизнесе»
- Вводный текст (ul-список): заменить на абзац «Вместо абстрактного "внедрим ИИ"...»

#### 4. Диагностика — `src/pages/services/DiagnosticsPage.tsx`
- Helmet (строки 67-77): title, description, keywords + og:title, og:description
- H1 (строка 97-99): → «Аудит процессов: карта, где утекают время и деньги»
- Подзаголовок (строки 100-102): → текст про «Бизнес тонет в задачах...»

#### 5. Архитектура — `src/pages/services/ArchitecturePage.tsx`
- Helmet (строки 67-77): title, description, keywords + og:title, og:description
- H1 (строка 97-99): → «Архитектура: как собрать ИИ‑решение без зоопарка из сервисов»
- Подзаголовок (строки 100-102): → текст про «У многих компаний уже есть CRM, 1С...»

#### 6. Сопровождение — `src/pages/services/SupportPage.tsx`
- Helmet (строки 30-40): title, description, keywords + og:title, og:description
- H1 (строка 62-63): → «Сопровождение: чтобы системы не умирали через месяц после запуска»
- Подзаголовок (строки 65-66): → текст про «Большинство проектов умирает...»

#### 7. FAQ — `src/pages/FAQPage.tsx`
- Helmet (строки 304-310): title, description, keywords + og:title, og:description
- H1 (строки 337-339): → «Ответы на главные вопросы об автоматизации с ИИ»
- Подзаголовок (строки 340-343): → текст про «Директора чаще всего боятся трёх вещей...»

#### 8. About — `src/pages/About.tsx`
- Helmet (строки 179-195): title, description, keywords + og:title, og:description
- H1 (строки 207-209): → «Кто я и почему мне можно доверить ваши процессы» (вместо просто имени)
- Подзаголовок (строки 210-214): → текст про «Я работаю с владельцами и директорами...»

#### 9. Pricing — `src/pages/PricingPage.tsx`
- Helmet (строки 225-236): title, description, keywords + og:title, og:description
- H1 (строки 252-254): → «Сколько стоит убрать рутину и бардак в процессах»
- Подзаголовок (строки 256-258): → текст про «Вместо "цена за час консультанта"...»

#### 10. Cases — `src/pages/CasesPage.tsx`
- Helmet (строки 274-294): title, description, keywords + og:title, og:description
- H1 (строки 306-308): → «Реальные кейсы: что даёт автоматизация с ИИ в цифрах»
- Подзаголовок (строки 309-312): → текст про «Здесь собраны проекты, где мы убирали ручной ввод...»

#### 11. Blog — `src/pages/Blog.tsx`
- Helmet (строки 51-57): title → «Блог об автоматизации бизнеса с ИИ — практические разборы и гайды | Александра Моисеева»
- H1 (строки 69-71): → «Как использовать ИИ и автоматизацию так, чтобы это окупалось, а не «модно выглядело»»
- Подзаголовок (строки 72-74): → текст про «В блоге я разбираю конкретные сценарии...»

#### 12. Products — `src/pages/products/ProductsPage.tsx`
- Helmet (строки 49-63): title, description + og:title, og:description
- H1 (строки 73-75): → «Готовые AI‑ассистенты, которые снимают рутину с команды»
- Подзаголовок (строки 76-78): → текст про «Если вам важно получить результат быстро...»

#### Дополнительно — `src/config/seo.ts`
- Обновить `siteName` на новый title главной

### Файлы (14 файлов)

| Файл | Изменения |
|------|-----------|
| `src/pages/Index.tsx` | Helmet meta + JSON-LD description |
| `src/components/Hero.tsx` | H1 + подзаголовок |
| `src/pages/start/StartPage.tsx` | Helmet + H1 + абзац |
| `src/pages/ServicesPage.tsx` | Helmet + H1 + вводный текст |
| `src/pages/services/DiagnosticsPage.tsx` | Helmet + H1 + абзац |
| `src/pages/services/ArchitecturePage.tsx` | Helmet + H1 + абзац |
| `src/pages/services/SupportPage.tsx` | Helmet + H1 + абзац |
| `src/pages/FAQPage.tsx` | Helmet + H1 + абзац |
| `src/pages/About.tsx` | Helmet + H1 + абзац |
| `src/pages/PricingPage.tsx` | Helmet + H1 + абзац |
| `src/pages/CasesPage.tsx` | Helmet + H1 + абзац |
| `src/pages/Blog.tsx` | Helmet + H1 + абзац |
| `src/pages/products/ProductsPage.tsx` | Helmet + H1 + абзац |
| `src/config/seo.ts` | siteName |

### Риски

Минимальные. Все тексты из вашей таблицы. UI-структура не меняется — только строковые значения в Helmet-тегах и текстовых элементах.

