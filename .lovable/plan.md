# План проверки SEO-метаданных на проде

Цель — подтвердить три факта по живому сайту `https://aleksamois.ru`, без правок кода.

## 1. Уникальные метатеги на каждом URL

Скрипт обходит все URL из `public/sitemap.xml` + ключевые контрольные точки (`/`, `/services`, `/services/automation`, `/services/digital-tools-program`, `/products/voice-bot`, `/cases/aktransservice`, `/materials/blog/<один из постов>`, `/about`, `/pricing`, `/faq`). Для каждого URL делает `curl -s` (без JS) и извлекает:

- `<title>`
- `<meta name="description">`
- `<link rel="canonical">`
- `<meta property="og:url">`, `og:title`, `og:description`, `og:type`
- `<meta name="robots">`

Собирает в таблицу и проверяет:
- ни один `<title>` и `description` не повторяется между разными URL;
- `canonical` и `og:url` совпадают с самим URL (а не с `/`);
- блоговые посты отдают `og:type=article`.

Вывод: список URL с дублями/несоответствиями (если найдутся) или подтверждение «все уникальны».

## 2. Служебные и временные страницы → noindex,nofollow

Проверяемые маршруты:
- `/portal`, `/portal/admin`
- `/newyear`
- `/old-home`
- `/neurostylist` (по решению — индексируется или нет; уточним по факту)
- `/legal`, `/legal/consent`, `/legal/privacy-policy`, `/legal/cookies`, `/legal/terms` (ожидаем `noindex,follow`)

Для каждого `curl` → ищем `<meta name="robots">` и сверяем с ожидаемым значением. Дополнительно проверяем, что эти URL **отсутствуют** в `sitemap.xml`.

## 3. Legacy-адреса не индексируются и ведут на актуальные

Проверяемые:
- `/services/diagnostics` → `/services/digital-audit`
- `/services/architecture` → `/services/digital-solution-design`
- `/services/support` → `/services/implementation-support`
- `/services/add-ons` → `/services`

Для каждого:
- `curl -s` → должен прийти HTML-стаб с `<meta name="robots" content="noindex,follow">`, `<link rel="canonical" href="…новый URL…">` и `<meta http-equiv="refresh" content="0; url=…">`;
- проверить, что URL **не** в `sitemap.xml`;
- проверить, что `canonical` указывает на актуальную страницу из списка выше.

## Технические детали

Один bash-скрипт в `/tmp` (без правок репозитория):

```bash
for url in "${URLS[@]}"; do
  html=$(curl -sL -A "Mozilla/5.0 (compatible; SEO-Audit)" "$url")
  title=$(echo "$html" | grep -oP '(?<=<title>).*?(?=</title>)')
  desc=$(echo "$html" | grep -oP '<meta name="description" content="\K[^"]+')
  canon=$(echo "$html" | grep -oP '<link rel="canonical" href="\K[^"]+')
  robots=$(echo "$html" | grep -oP '<meta name="robots" content="\K[^"]+')
  echo -e "$url\t$title\t$desc\t$canon\t$robots"
done
```

Результат — три отдельные таблицы (по одной на каждый пункт) + итог: PASS / FAIL по каждой проверке. Если что-то не совпадёт с ожиданиями — отдельным списком, что именно править (без правок в этом проходе).

## Что НЕ делаем

- Не меняем код, sitemap, роуты.
- Не запускаем сборку и не деплоим.
- Не трогаем `Helmet` и пререндер-скрипт.
