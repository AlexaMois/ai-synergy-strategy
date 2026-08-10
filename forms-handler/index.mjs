// Обработчик всех форм сайта aleksamois.ru.
// Площадка: сервер Timeweb, служба forms-handler слушает 127.0.0.1:8090, наружу её
// публикует nginx на forms.aleksamois.ru. HTTP-обёртка — в server.mjs.
// Маршрут ПДн: браузер → forms.aleksamois.ru → этот обработчик → Bpium. Уведомление уходит
// в API НейроСекретаря: только номер записи Bpium, тип заявки, страница и время.
// ПДн остаются в Bpium и на диске сервера не хранятся.
//
// Журналирование: requestId, время (ISO), имя формы, технический код результата.
// Никогда не логируются: значения полей, ответы Bpium, IP, токены, секреты.

import { z } from 'zod'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { enqueueNotifyRetry } from './notify-queue.mjs'

// Домен Bpium только из окружения: рабочий стенд один, но зашивать его в код нельзя.
const BPIUM_BASE = (process.env.BPIUM_BASE_URL || 'https://neiroresheniyasandra.bpium.ru').replace(/\/+$/, '')
const BPIUM_LOGIN = process.env.BPIUM_LOGIN ?? ''
const BPIUM_PASSWORD = process.env.BPIUM_PASSWORD ?? ''
const CATALOG_ID = process.env.BPIUM_CATALOG_ID ?? '81'

// Уведомления: готовый API НейроСекретаря (он сам доставляет сообщение в MAX).
const NOTIFY_URL =
  process.env.NEUROSECRETARY_NOTIFY_URL || 'https://bot.atslogistik.ru/vasya/internal/site-lead'
const NOTIFY_SECRET = process.env.NEUROSECRETARY_NOTIFY_SECRET ?? ''
// Первая попытка выполняется внутри пользовательского запроса и жёстко ограничена по
// времени: форма не должна ждать бота. Повторы идут вне запроса, см. notify-queue.mjs.
const NOTIFY_TIMEOUT_MS = 3000

// S3-совместимое хранилище Timeweb для фото анкеты нейростилиста.
// Адрес и регион — из окружения: провайдера меняли уже один раз.
const UPLOADS_BUCKET = process.env.UPLOADS_BUCKET ?? ''
const STORAGE_ENDPOINT = process.env.STORAGE_ENDPOINT || 'https://s3.timeweb.cloud'
const STORAGE_REGION = process.env.STORAGE_REGION || 'ru-1'

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ??
  'https://aleksamois.ru,https://www.aleksamois.ru').split(',').map((s) => s.trim())

// ─── Служебное ──────────────────────────────────────────────────────────────

const log = (requestId, form, code, event) =>
  console.log(JSON.stringify({ requestId, ts: new Date().toISOString(), form, code, event }))

// Лог уведомлений: только record_id, номер попытки, HTTP-код и технический статус.
const notifyLog = (recordId, attempt, code, status) =>
  console.log(JSON.stringify({ record_id: String(recordId), attempt, code, status }))

const corsHeaders = (origin) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
  Vary: 'Origin',
})

// Ограничение частоты. Ключ — SHA-256 от IP, сам IP не сохраняется и не логируется.
const RATE_WINDOW_MS = 60 * 60 * 1000
const rate = new Map()

const hashKey = async (value) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`forms:${value}`))
  return Buffer.from(buf).toString('base64url').slice(0, 22)
}

const checkRate = (key, max) => {
  const now = Date.now()
  const rec = rate.get(key)
  if (!rec || now > rec.resetAt) {
    rate.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (rec.count >= max) return false
  rec.count += 1
  return true
}

const normalizePhone = (raw) => {
  let d = String(raw).replace(/\D/g, '')
  if (d.length === 11 && d.startsWith('8')) d = '7' + d.slice(1)
  if (d.length === 10) d = '7' + d
  return d ? `+${d}` : ''
}

// ─── Bpium ──────────────────────────────────────────────────────────────────

async function createBpiumRecord(values, requestId, form) {
  const res = await fetch(`${BPIUM_BASE}/api/v1/catalogs/${CATALOG_ID}/records`, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${BPIUM_LOGIN}:${BPIUM_PASSWORD}`).toString('base64'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values }),
  })
  if (!res.ok) {
    log(requestId, form, res.status, 'bpium_error')
    return null
  }
  let recordId = null
  try {
    recordId = (await res.json())?.id ?? null
  } catch {
    recordId = null
  }
  if (!recordId) {
    log(requestId, form, res.status, 'bpium_no_id')
    return null
  }
  return String(recordId)
}

// ─── Уведомление НейроСекретарю: только record_id, тип, страница, время ──────

// ISO 8601 с явным часовым поясом Красноярска (+07:00).
// Пояс указываем всегда: время без пояса бот трактует как московское, и заявка
// в сообщении уехала бы на четыре часа назад.
const isoWithOffset = (date = new Date()) => {
  const offsetMinutes = 420
  const shifted = new Date(date.getTime() + offsetMinutes * 60 * 1000)
  const sign = offsetMinutes >= 0 ? '+' : '-'
  const abs = Math.abs(offsetMinutes)
  const pad = (n) => String(n).padStart(2, '0')
  return `${shifted.toISOString().slice(0, 19)}${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
}

async function postNotification(payload) {
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), NOTIFY_TIMEOUT_MS)
  try {
  const res = await fetch(NOTIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${NOTIFY_SECRET}`,
    },
    body: JSON.stringify(payload),
      signal: ac.signal,
  })
  let ok = false
  try {
    ok = res.ok && (await res.json())?.ok === true
  } catch {
    ok = false
  }
  return { status: res.status, ok }
  } finally {
    clearTimeout(timer)
  }
}

// Контракт уведомления проверен в бою и на стороне бота не меняется:
// именно recordId / formName / pageUrl / createdAt. Snake_case бот отвергает
// с ответом 400 «recordId required».
export const buildNotifyPayload = (recordId, formType, pageUrl) => ({
  recordId: String(recordId),
  formName: formType,
  pageUrl: pageUrl || '',
  createdAt: isoWithOffset(),
})

// Запись Bpium уже создана: ошибка уведомления не откатывает её и не влияет на ответ формы.
// Внутри пользовательского запроса выполняется ровно одна попытка (таймаут 3 с).
// При ошибке сообщение уходит в очередь повторов и обрабатывается вне HTTP-запроса формы.
async function notifyNeurosecretary(recordId, formType, pageUrl) {
  if (!NOTIFY_SECRET) {
    notifyLog(recordId, 1, 0, 'notify_not_configured')
    return
  }
  const payload = buildNotifyPayload(recordId, formType, pageUrl)
  let status = 0
  let ok = false
  try {
    const result = await postNotification(payload)
    status = result.status
    ok = result.ok
  } catch {
    status = 0
  }
  if (ok) {
    notifyLog(recordId, 1, status, 'notify_sent')
    return
  }
  notifyLog(recordId, 1, status, 'notify_failed_attempt')
  // Заявка в Bpium уже создана. Повтор идёт вне пользовательского запроса,
  // состояние очереди лежит на диске и переживает перезапуск службы.
  await enqueueNotifyRetry(payload)
}

// ─── Схемы ──────────────────────────────────────────────────────────────────

const str = (max) => z.string().trim().min(1).max(max)
const ids = z.array(z.string().regex(/^\d{1,3}$/)).min(1).max(20)
const optId = z.string().regex(/^\d{1,3}$/)

const ShortLeadSchema = z.object({
  name: str(150),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(200).optional().or(z.literal('')),
  company: z.string().trim().max(200).optional().default(''),
  industry: z.string().trim().max(200).optional().default(''),
  task: z.string().trim().max(2000).optional().default(''),
  formName: z.string().trim().max(120).optional().default('Короткая заявка'),
  consent: z.literal(true),
  pageUrl: z.string().trim().max(300).optional().default(''),
  website: z.string().max(0).optional(),
})

const DiagnosticSchema = z.object({
  process: str(500),
  manualActions: ids,
  processDescription: str(3000),
  participants: z.number().int().min(1).max(100000),
  frequency: optId,
  hoursPerWeek: z.number().min(0).max(10000),
  losses: ids,
  consequences: str(3000),
  systems: ids,
  aiUsage: optId,
  dataStorage: optId,
  goal: str(3000),
  successCriteria: str(1000),
  urgency: optId,
  budget: optId,
  decisionMaker: optId,
  readyForCall: optId,
  companyOwner: z.string().trim().max(200).optional().default(''),
  companyName: str(200),
  industry: str(200),
  city: str(200),
  website: z.string().trim().max(300).optional().default(''),
  teamSize: optId,
  name: str(150),
  position: str(150),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(200).optional().or(z.literal('')),
  notes: z.string().trim().max(3000).optional().default(''),
  wantsDraft: optId,
  consent: z.literal(true),
  pageUrl: z.string().trim().max(300).optional().default(''),
  company_extra: z.string().max(0).optional(),
})

const StylistLeadSchema = z.object({
  name: str(150),
  contact: str(150),
  contact_type: z.enum(['telegram', 'phone', 'email', 'max']).default('telegram'),
  answers: z
    .array(z.object({ section: z.string().max(200), question: z.string().max(500), value: z.string().max(3000) }))
    .max(200),
  photos: z
    .array(z.object({ slotId: z.string().max(80), slotLabel: z.string().max(300), path: z.string().max(300) }))
    .max(30)
    .default([]),
  items_count: z.number().int().min(0).max(20).optional().default(0),
  pageUrl: z.string().trim().max(300).optional().default(''),
  website: z.string().max(0).optional(),
  test_mode: z.boolean().optional().default(false),
})

const UploadUrlSchema = z.object({
  fileName: str(200),
  contentType: z.enum(['image/jpeg', 'image/png', 'image/webp', 'image/heic']),
  size: z.number().int().min(1).max(15 * 1024 * 1024),
})

// ─── Маппинг Bpium ──────────────────────────────────────────────────────────

const serviceValues = {
  '41': '1', // источник: веб-форма
  '42': ['1'], // статус: Новая
  '44': '2', // квалификация: требуется уточнение
  '45': '6', // рекомендуемый продукт: пока не определён
  '47': 'Связаться с клиентом в MAX',
}

function shortLeadValues(d) {
  const values = {
    '51': ['1'], // тип обращения: Короткая заявка
    '2': d.name,
    '4': [{ contact: normalizePhone(d.phone) || d.phone }],
    '6': '3', // способ связи: MAX
    '31': true, // согласие на обработку
    ...serviceValues,
  }
  if (d.email) values['5'] = [{ contact: d.email }]
  if (d.company) values['8'] = d.company
  if (d.industry) values['9'] = d.industry
  if (d.task) values['14'] = d.task
  return values
}

function diagnosticValues(d) {
  const values = {
    '51': ['2'], // тип обращения: Полная диагностика
    '2': d.name,
    '3': d.position,
    '4': [{ contact: normalizePhone(d.phone) || d.phone }],
    '6': '3',
    '8': d.companyName,
    '9': d.industry,
    '10': d.city,
    '12': d.teamSize,
    '14': d.process,
    '15': d.manualActions,
    '16': d.losses,
    '32': d.processDescription,
    '33': d.participants,
    '34': d.frequency,
    '35': d.hoursPerWeek,
    '36': d.consequences,
    '18': d.systems,
    '19': d.aiUsage,
    '37': d.dataStorage,
    '21': d.goal,
    '22': d.urgency,
    '38': d.successCriteria,
    '24': d.budget,
    '25': d.decisionMaker,
    '26': d.readyForCall,
    '29': d.wantsDraft,
    '31': true,
    ...serviceValues,
  }
  if (d.email) values['5'] = [{ contact: d.email }]
  if (d.website) values['11'] = [{ contact: d.website }]
  if (d.companyOwner) values['30'] = d.companyOwner
  if (d.notes) values['28'] = d.notes
  return values
}

function stylistLeadValues(d) {
  const answersText = d.answers.map((a) => `[${a.section}] ${a.question}: ${a.value}`).join('\n')
  const photosText = d.photos.map((p) => `${p.slotLabel}: ${p.path}`).join('\n')
  const contactValue = d.contact_type === 'phone' ? normalizePhone(d.contact) || d.contact : d.contact
  const values = {
    '51': ['1'], // тип обращения: Короткая заявка (анкета нейростилиста)
    '2': d.name,
    '4': [{ contact: contactValue }],
    '6': '3',
    '31': true,
    '14': 'Анкета НейроСтилист',
    '28': [answersText, photosText && `Фото:\n${photosText}`].filter(Boolean).join('\n\n').slice(0, 20000),
    ...serviceValues,
  }
  return values
}

// ─── Presigned URL для фото (Object Storage, ru-central1) ───────────────────

async function issueUploadUrl(d) {
  if (!UPLOADS_BUCKET) return null
  const s3 = new S3Client({
    region: STORAGE_REGION,
    endpoint: STORAGE_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.STORAGE_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY ?? '',
    },
  })
  // Расширение берётся только из допустимого типа, имя файла клиента не используется в ключе.
  const extByType = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/heic': '.heic',
  }
  const ext = extByType[d.contentType]
  if (!ext) return null
  const key = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}${ext}`
  // Ссылка одноразовая по назначению: жёстко зафиксированы ключ, тип и точный размер,
  // срок действия — 5 минут. Приватный бакет: публичное чтение и листинг запрещены.
  const url = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: UPLOADS_BUCKET,
      Key: key,
      ContentType: d.contentType,
      ContentLength: d.size,
      ACL: 'private',
    }),
    { expiresIn: 300, signableHeaders: new Set(['content-type', 'content-length']) },
  )
  return { url, key }
}

// ─── Роутер ─────────────────────────────────────────────────────────────────

const ROUTES = {
  '/short-lead': {
    schema: ShortLeadSchema,
    max: 5,
    form: 'Короткая заявка',
    values: shortLeadValues,
    formName: (d) => d.formName || 'Короткая заявка',
  },
  '/diagnostic': {
    schema: DiagnosticSchema,
    max: 3,
    form: 'Полная диагностика',
    values: diagnosticValues,
    formName: () => 'Первичная диагностика процессов',
  },
  '/stylist-lead': {
    schema: StylistLeadSchema,
    max: 5,
    form: 'НейроСтилист',
    values: stylistLeadValues,
    formName: () => 'Анкета НейроСтилист',
  },
}

// Точка входа обработчика. На вход — уже разобранный запрос от server.mjs:
// method, path, сырое тело и заголовки. На выход — статус, заголовки и тело.
// Раньше здесь была сигнатура Yandex Cloud Function (event с httpMethod,
// isBase64Encoded и путём внутри requestContext.apiGateway); заменена только она,
// маршруты, схемы и маппинг Bpium ниже не менялись.
export const handleRequest = async ({ method = 'POST', path = '', rawBody = '', headers: reqHeaders = {} }) => {
  const requestId = crypto.randomUUID()
  const header = (name) => reqHeaders[name] ?? reqHeaders[name.toLowerCase()] ?? ''
  const origin = header('origin')
  const headers = { ...corsHeaders(origin), 'Content-Type': 'application/json' }
  const reply = (body, statusCode = 200) => ({ statusCode, headers, body: JSON.stringify(body) })

  if (method === 'OPTIONS') return { statusCode: 204, headers: corsHeaders(origin), body: '' }
  if (method !== 'POST') return reply({ error: 'Method not allowed' }, 405)

  const cleanPath = String(path).replace(/\/+$/, '')
  const route = ROUTES[cleanPath]
  const isUploadUrl = cleanPath === '/upload-url'
  if (!route && !isUploadUrl) return reply({ error: 'Not found' }, 404)

  let body
  try {
    body = JSON.parse(rawBody || '{}')
  } catch {
    log(requestId, cleanPath, 400, 'bad_json')
    return reply({ error: 'Некорректный запрос' }, 400)
  }

  // IP приходит от nginx в X-Forwarded-For. Сам адрес не хранится и не логируется:
  // для ограничения частоты используется только его хеш.
  const ip = String(header('x-forwarded-for')).split(',')[0]?.trim() || 'unknown'
  const rateKey = await hashKey(ip)

  if (isUploadUrl) {
    const parsed = UploadUrlSchema.safeParse(body)
    if (!parsed.success) {
      log(requestId, 'upload-url', 400, 'validation_error')
      return reply({ error: 'Некорректный файл' }, 400)
    }
    if (!checkRate(`up:${rateKey}`, 60)) return reply({ error: 'Слишком много загрузок. Попробуйте позже.' }, 429)
    const issued = await issueUploadUrl(parsed.data)
    if (!issued) {
      log(requestId, 'upload-url', 500, 'storage_not_configured')
      return reply({ error: 'Загрузка файлов временно недоступна' }, 500)
    }
    log(requestId, 'upload-url', 200, 'url_issued')
    return reply({ ok: true, ...issued })
  }

  if (!checkRate(`${cleanPath}:${rateKey}`, route.max)) {
    log(requestId, route.form, 429, 'rate_limited')
    return reply({ error: 'Слишком много отправок. Попробуйте позже.' }, 429)
  }

  const parsed = route.schema.safeParse(body)
  if (!parsed.success) {
    log(requestId, route.form, 400, 'validation_error')
    return reply(
      { error: 'Проверьте заполнение полей', fields: parsed.error.flatten().fieldErrors },
      400,
    )
  }
  const d = parsed.data

  if (d.phone !== undefined && !normalizePhone(d.phone)) {
    log(requestId, route.form, 400, 'bad_phone')
    return reply({ error: 'Некорректный номер телефона' }, 400)
  }

  let recordId
  try {
    recordId = await createBpiumRecord(route.values(d), requestId, route.form)
  } catch {
    log(requestId, route.form, 502, 'bpium_request_failed')
    return reply({ error: 'Сервис временно недоступен. Попробуйте позже или напишите на ai@aleksamois.ru' }, 502)
  }
  if (!recordId) {
    return reply({ error: 'Не удалось отправить заявку. Попробуйте ещё раз или напишите на ai@aleksamois.ru' }, 502)
  }

  log(requestId, route.form, 200, 'record_created')
  await notifyNeurosecretary(recordId, route.formName(d), d.pageUrl)

  return reply({ ok: true, recordId })
}