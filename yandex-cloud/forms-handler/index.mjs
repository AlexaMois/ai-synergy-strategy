// Обработчик всех форм сайта aleksamois.ru.
// Площадка: Yandex Cloud Function, регион ru-central1. Вызов через API Gateway на forms.aleksamois.ru.
// Маршрут ПДн: браузер → forms.aleksamois.ru → эта функция → Bpium. В Telegram уходит только
// внутренний номер записи Bpium, имя формы и время. Персональные данные за пределы РФ не передаются.
//
// Журналирование: requestId, время (ISO), имя формы, технический код результата.
// Никогда не логируются: значения полей, ответы Bpium, IP, токены, секреты.

import { z } from 'zod'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const BPIUM_BASE = (process.env.BPIUM_BASE_URL ?? '').replace(/\/+$/, '')
const BPIUM_LOGIN = process.env.BPIUM_LOGIN ?? ''
const BPIUM_PASSWORD = process.env.BPIUM_PASSWORD ?? ''
const CATALOG_ID = process.env.BPIUM_CATALOG_ID ?? '81'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? ''
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? ''

// Object Storage (ru-central1) для фото анкеты нейростилиста
const UPLOADS_BUCKET = process.env.UPLOADS_BUCKET ?? ''
const STORAGE_ENDPOINT = 'https://storage.yandexcloud.net'

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ??
  'https://aleksamois.ru,https://www.aleksamois.ru').split(',').map((s) => s.trim())

// ─── Служебное ──────────────────────────────────────────────────────────────

const log = (requestId, form, code, event) =>
  console.log(JSON.stringify({ requestId, ts: new Date().toISOString(), form, code, event }))

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

// ─── Telegram: только номер записи, имя формы и время ───────────────────────

async function notifyTelegram(formName, recordId, requestId) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return
  const text =
    `Новая заявка\n` +
    `Форма: ${formName}\n` +
    `Номер записи: ${recordId}\n` +
    `Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} (МСК)\n\n` +
    `Содержимое заявки — в CRM.`
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
    })
    log(requestId, formName, res.status, res.ok ? 'notify_sent' : 'notify_failed')
  } catch {
    log(requestId, formName, 0, 'notify_failed')
  }
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
    region: 'ru-central1',
    endpoint: STORAGE_ENDPOINT,
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

export const handler = async (event) => {
  const requestId = crypto.randomUUID()
  const origin = event?.headers?.origin ?? event?.headers?.Origin ?? ''
  const headers = { ...corsHeaders(origin), 'Content-Type': 'application/json' }
  const reply = (body, statusCode = 200) => ({ statusCode, headers, body: JSON.stringify(body) })

  const method = event?.httpMethod ?? 'POST'
  if (method === 'OPTIONS') return { statusCode: 204, headers: corsHeaders(origin), body: '' }
  if (method !== 'POST') return reply({ error: 'Method not allowed' }, 405)

  const path = (event?.requestContext?.apiGateway?.operationContext?.path ?? event?.path ?? '').replace(/\/+$/, '')
  const route = ROUTES[path]
  const isUploadUrl = path === '/upload-url'
  if (!route && !isUploadUrl) return reply({ error: 'Not found' }, 404)

  let body
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body
    body = JSON.parse(raw || '{}')
  } catch {
    log(requestId, path, 400, 'bad_json')
    return reply({ error: 'Некорректный запрос' }, 400)
  }

  const ip = event?.headers?.['X-Forwarded-For']?.split(',')[0]?.trim() ?? 'unknown'
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

  if (!checkRate(`${path}:${rateKey}`, route.max)) {
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
  await notifyTelegram(route.formName(d), recordId, requestId)

  return reply({ ok: true, recordId })
}