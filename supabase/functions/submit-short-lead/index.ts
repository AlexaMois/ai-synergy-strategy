// Короткая заявка «Обсудить задачу» → запись в Bpium (каталог 81, тип обращения = Короткая заявка).
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const BASE = (Deno.env.get('BPIUM_BASE_URL') ?? '').replace(/\/+$/, '')
const LOGIN = Deno.env.get('BPIUM_LOGIN') ?? ''
const PASSWORD = Deno.env.get('BPIUM_PASSWORD') ?? ''
const CATALOG_ID = '81'

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const MAX_PER_IP = 5
const rate = new Map<string, { count: number; resetAt: number }>()

function checkRate(ip: string) {
  const now = Date.now()
  const rec = rate.get(ip)
  if (!rec || now > rec.resetAt) {
    rate.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (rec.count >= MAX_PER_IP) return false
  rec.count += 1
  return true
}

const normalizePhone = (raw: string) => {
  let d = raw.replace(/\D/g, '')
  if (d.length === 11 && d.startsWith('8')) d = '7' + d.slice(1)
  if (d.length === 10) d = '7' + d
  return d ? `+${d}` : ''
}

const Schema = z.object({
  name: z.string().trim().min(1).max(150),
  phone: z.string().trim().min(6).max(30),
  task: z.string().trim().max(2000).optional().default(''),
  email: z.string().trim().email().max(200).optional().or(z.literal('')),
  company: z.string().trim().max(200).optional().default(''),
  industry: z.string().trim().max(200).optional().default(''),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  const requestId = crypto.randomUUID()
  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRate(ip)) return json({ error: 'Слишком много отправок. Попробуйте позже.' }, 429)

  let parsed
  try {
    parsed = Schema.safeParse(await req.json())
  } catch (_e) {
    return json({ error: 'Некорректный запрос' }, 400)
  }
  if (!parsed.success) {
    console.error('validation_error', requestId, Object.keys(parsed.error.flatten().fieldErrors).join(','))
    return json({ error: 'Проверьте заполнение полей', fields: parsed.error.flatten().fieldErrors }, 400)
  }
  const d = parsed.data

  const phone = normalizePhone(d.phone)
  if (!phone) return json({ error: 'Некорректный номер телефона' }, 400)

  const values: Record<string, unknown> = {
    '51': ['1'],        // тип обращения: Короткая заявка
    '2': d.name,
    '4': [{ contact: phone }],
    '6': '3',         // способ связи: MAX
    '31': true,       // согласие на обработку
    '41': '1',        // источник: веб-форма
    '42': ['1'],      // статус: Новая
    '44': '2',        // квалификация: требуется уточнение
    '45': '6',        // рекомендуемый продукт: пока не определён
    '47': 'Связаться с клиентом в MAX',
  }
  if (d.task) values['14'] = d.task
  if (d.email) values['5'] = [{ contact: d.email }]
  if (d.company) values['8'] = d.company
  if (d.industry) values['9'] = d.industry

  const post = (v: Record<string, unknown>) =>
    fetch(`${BASE}/api/v1/catalogs/${CATALOG_ID}/records`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${LOGIN}:${PASSWORD}`),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: v }),
    })

  try {
    const res = await post(values)
    const text = await res.text()
    if (!res.ok) {
      console.error('bpium_error', requestId, res.status)
      return json({ error: 'Не удалось отправить заявку. Попробуйте ещё раз или напишите на ai@aleksamois.ru' }, 502)
    }
    let recordId: string | null = null
    try { recordId = JSON.parse(text)?.id ?? null } catch { /* ignore */ }
    if (!recordId) {
      console.error('bpium_no_id', requestId, res.status)
      return json({ error: 'Не удалось отправить заявку. Попробуйте ещё раз или напишите на ai@aleksamois.ru' }, 502)
    }
    console.log('short_lead_created', requestId, recordId)
    return json({ ok: true, recordId })
  } catch (e) {
    console.error('bpium_request_failed', requestId)
    return json({ error: 'Сервис временно недоступен. Попробуйте позже или напишите на ai@aleksamois.ru' }, 502)
  }
})
