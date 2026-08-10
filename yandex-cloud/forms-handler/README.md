# Обработчик форм в Yandex Cloud (этап 2)

Целевая схема маршрута персональных данных:

```text
браузер (aleksamois.ru)
  → https://forms.aleksamois.ru            (API Gateway, ru-central1)
  → Cloud Function forms-handler           (ru-central1)
  → Bpium (каталог 81)                     — единственное хранилище содержимого заявок
  → MAX, бот «НейроСекретарь»               — только тип заявки, номер записи, страница, время
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

`BPIUM_BASE_URL`, `BPIUM_LOGIN`, `BPIUM_PASSWORD`, `MAX_BOT_TOKEN`, `MAX_CHAT_ID`,
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
  --secret name=MAX_BOT_TOKEN,id=<lockbox-id>,version-id=<ver>,key=MAX_BOT_TOKEN \
  --secret name=MAX_CHAT_ID,id=<lockbox-id>,version-id=<ver>,key=MAX_CHAT_ID
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
3. уведомление пришло в MAX от бота «НейроСекретарь» (`@id245906802500_2_bot`)
   в формате: «Новая заявка с сайта / Тип заявки / Запись Bpium / Страница / Дата и время».

Дополнительно: в логах отсутствуют значения полей и IP, фото доступны только по приватной ссылке.

## Уведомления в MAX

Бот: «НейроСекретарь», `@id245906802500_2_bot`, https://max.ru/id245906802500_2_bot

Переменные: `MAX_BOT_TOKEN` (токен бота из MasterBot), `MAX_CHAT_ID` (идентификатор диалога
с получателем). Хост зафиксирован в коде: `https://platform-api2.max.ru`.

Вызов: `POST https://platform-api2.max.ru/messages?chat_id=${MAX_CHAT_ID}`
с заголовком `Authorization: ${MAX_BOT_TOKEN}` и телом `{ "text": "…" }`.
Токен в URL не передаётся, `botapi.max.ru` не используется.

Как получить `MAX_CHAT_ID`: открыть диалог с ботом, отправить `/start` (событие
`bot_started`), затем `GET https://platform-api2.max.ru/updates` с заголовком
`Authorization: ${MAX_BOT_TOKEN}` и взять `chat_id` из события. Значение сохранить
в Lockbox как ключ `MAX_CHAT_ID` и смонтировать в функцию (см. раздел развёртывания).

Ошибки MAX: запись Bpium уже создана и не откатывается; уведомление повторяется
ещё один раз через 1 секунду. Каждая неудача пишется в лог как
`notify_failed_attempt_N`, окончательная — `notify_failed_final`.

Telegram из маршрута заявок сайта выведён полностью: функции `send-to-telegram`,
`telegram-webhook` и `save-lead` удалены, переменные `TELEGRAM_*` обработчику не нужны.

## Отключение старых функций

Фронтенд больше не вызывает ни одну из старых функций. После приёмки они удаляются
Уже удалены: `save-lead`, `send-to-telegram`, `telegram-webhook`.
Остались неиспользуемыми и удаляются после приёмки: `submit-short-lead`,
`submit-diagnostic`, `save-stylist-lead`.

Таблицы `leads`, `stylist_leads` и бакет `stylist-uploads` НЕ удаляются до отдельного
письменного подтверждения и акта технической проверки.
