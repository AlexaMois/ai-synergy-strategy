# Обработчик форм в Yandex Cloud (этап 2)

Целевая схема маршрута персональных данных:

```text
браузер (aleksamois.ru)
  → https://forms.aleksamois.ru            (API Gateway, ru-central1)
  → Cloud Function forms-handler           (ru-central1)
  → Bpium (каталог 81)                     — единственное хранилище содержимого заявок
  → Telegram                               — только имя формы, номер записи, время
```

Supabase Edge Functions в маршруте ПДн не участвуют. Фронтенд переключается одной
переменной сборки `VITE_FORMS_BASE_URL=https://forms.aleksamois.ru`.

## Endpoints

| Endpoint | Форма |
| --- | --- |
| `POST /short-lead` | «Обсудить задачу» (/start), CallbackModal, Contact |
| `POST /diagnostic` | Полная диагностика (/start) |
| `POST /stylist-lead` | Анкета /neurostylist |
| `POST /upload-url` | Предподписанная ссылка на загрузку фото в Object Storage (ru-central1) |

## Журналирование

Единственный формат записи:

```json
{"requestId":"…","ts":"2026-08-06T11:00:00.000Z","form":"Короткая заявка","code":200,"event":"record_created"}
```

Не логируются: значения полей, ответы Bpium, IP, токены, секреты. IP используется только
в оперативной памяти для ограничения частоты и предварительно хешируется (SHA-256).

Срок хранения логов — 7 дней:

```bash
yc logging group update --name forms-logs --retention-period 168h
```

## Сервисная учётная запись (минимальные права)

Пароль личной учётной записи и роль владельца каталога не используются.

```bash
yc iam service-account create --name forms-handler-sa

yc resource-manager folder add-access-binding <folder-id> \
  --service-account-name forms-handler-sa --role functions.functionInvoker
yc resource-manager folder add-access-binding <folder-id> \
  --service-account-name forms-handler-sa --role logging.writer
yc resource-manager folder add-access-binding <folder-id> \
  --service-account-name forms-handler-sa --role lockbox.payloadViewer
yc resource-manager folder add-access-binding <folder-id> \
  --service-account-name forms-handler-sa --role storage.uploader
```

Для развёртывания из CI — отдельная учётная запись с `functions.admin` и
`api-gateway.editor`, без доступа к содержимому заявок.

## Секреты (Yandex Lockbox)

`BPIUM_BASE_URL`, `BPIUM_LOGIN`, `BPIUM_PASSWORD`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`,
`STORAGE_ACCESS_KEY_ID`, `STORAGE_SECRET_ACCESS_KEY`.

Нечувствительные переменные: `BPIUM_CATALOG_ID=81`, `UPLOADS_BUCKET`,
`ALLOWED_ORIGINS=https://aleksamois.ru,https://www.aleksamois.ru`.

## Развёртывание

```bash
cd yandex-cloud/forms-handler
npm install --omit=dev
zip -r ../forms-handler.zip . -x '*.md'

yc serverless function create --name forms-handler
yc serverless function version create \
  --function-name forms-handler \
  --runtime nodejs18 \
  --entrypoint index.handler \
  --memory 256m --execution-timeout 30s \
  --service-account-id <forms-handler-sa-id> \
  --source-path ../forms-handler.zip \
  --environment BPIUM_CATALOG_ID=81,UPLOADS_BUCKET=<bucket> \
  --secret name=BPIUM_BASE_URL,id=<lockbox-id>,version-id=<ver>,key=BPIUM_BASE_URL \
  --secret name=BPIUM_LOGIN,id=<lockbox-id>,version-id=<ver>,key=BPIUM_LOGIN \
  --secret name=BPIUM_PASSWORD,id=<lockbox-id>,version-id=<ver>,key=BPIUM_PASSWORD \
  --secret name=TELEGRAM_BOT_TOKEN,id=<lockbox-id>,version-id=<ver>,key=TELEGRAM_BOT_TOKEN \
  --secret name=TELEGRAM_CHAT_ID,id=<lockbox-id>,version-id=<ver>,key=TELEGRAM_CHAT_ID
```

## API Gateway и TLS

Спецификация — `gateway.yaml` в этой папке:

```bash
yc serverless api-gateway create --name forms-gw --spec gateway.yaml
```

DNS у регистратора: `CNAME forms → <gateway-id>.apigw.yandexcloud.net`.
Сертификат — Certificate Manager, домен `forms.aleksamois.ru`, проверка DNS-записью
`CNAME _acme-challenge.forms`, затем привязка домена к API Gateway.

## Переключение фронтенда

После проверки эндпоинтов задать переменную сборки:

```
VITE_FORMS_BASE_URL=https://forms.aleksamois.ru
```

Пока переменная не задана, формы работают по прежнему маршруту — переключение обратимо.

## Отключение старых функций

После успешной миграции: `save-lead` (не вызывается фронтендом) удаляется первой,
затем `submit-short-lead`, `submit-diagnostic`, `save-stylist-lead`, `send-to-telegram`.
Таблицы `leads`, `stylist_leads` и бакет `stylist-uploads` не удаляются до отдельного
подтверждения и акта технической проверки.
