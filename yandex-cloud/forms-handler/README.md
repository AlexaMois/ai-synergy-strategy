# Обработчик форм в Yandex Cloud (этап 2)

Целевая схема маршрута персональных данных:

```text
браузер (aleksamois.ru)
  → https://forms.aleksamois.ru            (API Gateway, ru-central1)
  → Cloud Function forms-handler           (ru-central1)
  → Bpium (каталог 81)                     — единственное хранилище содержимого заявок
  → API НейроСекретаря (bot.atslogistik.ru) — только record_id, form_type, page_url, created_at
  → MAX (доставку сообщения выполняет сам НейроСекретарь)
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

## Три раздельные учётные записи

Пароль личной учётной записи, роль владельца каталога и постоянные ключи основного
аккаунта не используются. Доступ на развёртывание — временный, отзывается после приёмки.

| Учётная запись | Назначение | Роли |
| --- | --- | --- |
| `forms-deployer-sa` | только развёртывание (временный доступ) | `functions.admin`, `api-gateway.editor`, `lockbox.editor` |
| `forms-gateway-sa` | вызов функции из API Gateway | `functions.functionInvoker` |
| `forms-handler-sa` | рабочая учётная запись функции | `logging.writer`, `lockbox.payloadViewer`, `storage.uploader` |

```bash
yc iam service-account create --name forms-deployer-sa
yc iam service-account create --name forms-gateway-sa
yc iam service-account create --name forms-handler-sa

FOLDER=<folder-id>
yc resource-manager folder add-access-binding $FOLDER --service-account-name forms-deployer-sa --role functions.admin
yc resource-manager folder add-access-binding $FOLDER --service-account-name forms-deployer-sa --role api-gateway.editor
yc resource-manager folder add-access-binding $FOLDER --service-account-name forms-deployer-sa --role lockbox.editor

yc resource-manager folder add-access-binding $FOLDER --service-account-name forms-gateway-sa --role functions.functionInvoker

yc resource-manager folder add-access-binding $FOLDER --service-account-name forms-handler-sa --role logging.writer
yc resource-manager folder add-access-binding $FOLDER --service-account-name forms-handler-sa --role lockbox.payloadViewer
yc resource-manager folder add-access-binding $FOLDER --service-account-name forms-handler-sa --role storage.uploader
```

`forms-deployer-sa` не имеет `lockbox.payloadViewer` — развёртывание не даёт доступа к
значениям секретов и к содержимому заявок. Ключ развёртывания удаляется после приёмки:

```bash
yc iam access-key delete <key-id>
yc iam key delete <key-id>
```

## Закрытый бакет для фотографий

```bash
yc storage bucket create --name <bucket> \
  --default-storage-class standard --max-size 10737418240

# публичное чтение и листинг запрещены
yc storage bucket update --name <bucket> --public-read=false --public-list=false --public-config-read=false

# автоудаление объектов через 90 дней
yc storage bucket update --name <bucket> \
  --lifecycle-rule id=expire-90d,enabled=true,days-to-expiration=90
```

Доступ к объектам — только по приватным подписанным ссылкам через `forms-handler-sa`
(роль `storage.uploader`, без `storage.viewer`).

Ограничения подписанных ссылок на загрузку (`POST /upload-url`):

- срок действия — 5 минут;
- допустимые типы — `image/jpeg`, `image/png`, `image/webp`, `image/heic`;
- размер — до 15 МБ, подписывается точный `Content-Length` (иной размер отклоняется);
- ключ объекта генерируется сервером (`ГГГГ-ММ-ДД/UUID.ext`), имя файла клиента не используется;
- частота — не более 60 ссылок в час на один хешированный IP.

## Секреты (Yandex Lockbox)

`BPIUM_BASE_URL`, `BPIUM_LOGIN`, `BPIUM_PASSWORD`, `NEUROSECRETARY_NOTIFY_SECRET`,
`STORAGE_ACCESS_KEY_ID`, `STORAGE_SECRET_ACCESS_KEY`.

Нечувствительные переменные: `BPIUM_CATALOG_ID=81`, `UPLOADS_BUCKET`,
`NEUROSECRETARY_NOTIFY_URL=https://bot.atslogistik.ru/vasya/internal/site-lead`,
`ALLOWED_ORIGINS=https://aleksamois.ru,https://www.aleksamois.ru`.

`MAX_BOT_TOKEN` и `MAX_CHAT_ID` обработчику больше не нужны — удалите их из окружения
функции (прямой вызов MAX API из forms-handler убран).

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
  --memory 256m --execution-timeout 300s \
  --service-account-id <forms-handler-sa-id> \
  --source-path ../forms-handler.zip \
  --environment BPIUM_CATALOG_ID=81,UPLOADS_BUCKET=<bucket>,NEUROSECRETARY_NOTIFY_URL=https://bot.atslogistik.ru/vasya/internal/site-lead \
  --secret name=BPIUM_BASE_URL,id=<lockbox-id>,version-id=<ver>,key=BPIUM_BASE_URL \
  --secret name=BPIUM_LOGIN,id=<lockbox-id>,version-id=<ver>,key=BPIUM_LOGIN \
  --secret name=BPIUM_PASSWORD,id=<lockbox-id>,version-id=<ver>,key=BPIUM_PASSWORD \
  --secret name=NEUROSECRETARY_NOTIFY_SECRET,id=<lockbox-id>,version-id=<ver>,key=NEUROSECRETARY_NOTIFY_SECRET
```

Таймаут увеличен: повторы уведомления идут с интервалом 60 секунд (до 3 попыток).

## API Gateway и TLS

Спецификация — `gateway.yaml` в этой папке:

```bash
yc serverless api-gateway create --name forms-gw --spec gateway.yaml
```

DNS у регистратора: `CNAME forms → <gateway-id>.apigw.yandexcloud.net`.
Сертификат — Certificate Manager, домен `forms.aleksamois.ru`, проверка DNS-записью
`CNAME _acme-challenge.forms`, затем привязка домена к API Gateway.

## Переключение фронтенда

Обязательная переменная сборки:

```
VITE_FORMS_BASE_URL=https://forms.aleksamois.ru
```

Автоматического возврата к прежним функциям Lovable больше нет. Если переменная не задана,
любая отправка формы завершается безопасной ошибкой («Отправка форм временно недоступна»),
данные при этом не покидают браузер.

## Проверка после развёртывания (пять форм)

1. «Обсудить задачу» (/start) → `POST /short-lead`
2. «Заказать звонок» (шапка, FloatingCTA) → `POST /short-lead`
3. Форма обратной связи (главная) → `POST /short-lead`
4. Первичная диагностика процессов (/start) → `POST /diagnostic`
5. Анкета НейроСтилист (/neurostylist) → `POST /upload-url` + `POST /stylist-lead`

Критерии приёмки по каждой форме отдельно:

1. запись фактически создана в Bpium (каталог 81);
2. ответ обработчика содержит `recordId` (успехом считается только он);
3. `POST` на `NEUROSECRETARY_NOTIFY_URL` вернул `200 {"ok": true}`, и сообщение
   пришло Александре в MAX от бота «НейроСекретарь».

Дополнительно: в логах отсутствуют значения полей и IP, фото доступны только по приватной ссылке.

## Уведомления через API НейроСекретаря

Прямой вызов MAX API из обработчика удалён. После создания записи в Bpium выполняется:

```http
POST https://bot.atslogistik.ru/vasya/internal/site-lead
Content-Type: application/json
Authorization: Bearer ${NEUROSECRETARY_NOTIFY_SECRET}

{
  "record_id": "6",
  "form_type": "Первичная диагностика",
  "page_url": "https://aleksamois.ru/start",
  "created_at": "2026-08-10T19:40:00+07:00"
}
```

Успех — только `200 {"ok": true}`. При ошибке: до 3 попыток с интервалом 60 секунд,
после успеха повторы прекращаются. Запись Bpium сохраняется в любом случае.
ПДн клиента остаются только в Bpium.

Формат лога уведомлений (ничего кроме этих полей):

```json
{"record_id":"6","attempt":1,"code":200,"status":"notify_sent"}
```

Статусы: `notify_sent`, `notify_failed_attempt`, `notify_failed_final`,
`notify_not_configured`.

Telegram из маршрута заявок сайта выведён полностью: функции `send-to-telegram`,
`telegram-webhook` и `save-lead` удалены, переменные `TELEGRAM_*` обработчику не нужны.

## Отключение старых функций

Фронтенд больше не вызывает ни одну из старых функций. После приёмки они удаляются
Уже удалены: `save-lead`, `send-to-telegram`, `telegram-webhook`.
Остались неиспользуемыми и удаляются после приёмки: `submit-short-lead`,
`submit-diagnostic`, `save-stylist-lead`.

Таблицы `leads`, `stylist_leads` и бакет `stylist-uploads` НЕ удаляются до отдельного
письменного подтверждения и акта технической проверки.
