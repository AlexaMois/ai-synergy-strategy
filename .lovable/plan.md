# Картинки «НейроТендеролога» на aleksamois.ru

## Результат проверки (только чтение)

| Файл | aleksamois.ru | www.aleksamois.ru |
|---|---|---|
| tender_card_public.webp | 404, text/html, 686 байт, начинается с `<!DOCTYPE` | 301 на aleksamois.ru, затем такой же 404 |
| tender_daily_match_public.webp | 404, text/html, 686 байт | 301, затем 404 |
| tender_daily_zero_public.webp | 404, text/html, 686 байт | 301, затем 404 |

Сервер домена — GitHub.com (GitHub Pages). Адрес `/__l5e/assets-v1/...` работает только на хостинге Lovable (aleksamois.lovable.app отдаёт 200, image/webp, 36 454 байта). На aleksamois.ru после публикации три картинки не покажутся.

## Предлагаемое исправление (после одобрения)

1. Скачать три оригинала с aleksamois.lovable.app и положить в `public/cases/neurotenderolog/` под теми же именами.
2. В `src/pages/cases/CaseDetailPage.tsx` заменить три `import ...asset.json` на пути `/cases/neurotenderolog/<имя>.webp`. Тексты, подписи, размеры и порядок не меняются.
3. Ссылки на CDN-объекты не удалять (они нужны старым версиям preview); файлы `.asset.json` просто перестают использоваться.
4. Проверить: сборка, 10 тестов, наличие трёх файлов в `dist/cases/neurotenderolog/`, страница кейса на компьютере и телефоне. Не публиковать.

Почему `public`: GitHub Pages отдаёт содержимое `dist` как есть, файлы копируются туда без изменений и одинаково работают и на Lovable, и на aleksamois.ru. Внешний абсолютный адрес на lovable.app не рекомендую: сайт зависел бы от второго хостинга.
