// Приём анкеты «Первичная диагностика процессов компании» и создание записи в Bpium (каталог 81).
// Секреты Bpium читаются только на сервере.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const BASE = (Deno.env.get('BPIUM_BASE_URL') ?? '').replace(/\/+$/, '')
const LOGIN = Deno.env.get('BPIUM_LOGIN') ?? ''
const PASSWORD = Deno.env.get('BPIUM_PASSWORD') ?? ''
const CATALOG_ID = '81'

// Простая защита от спама: не более 3 анкет в час с одного IP
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const MAX_PER_IP = 3
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

const str = (max: number) => z.string().trim().min(1).max(max)
const ids = z.array(z.string().regex(/^\d{1,3}$/)).min(1).max(20)

const Schema = z.object({
  // Шаг 1 — процесс
  process: str(500),
  manualActions: ids,
  processDescription: str(3000),
  // Шаг 2 — масштаб
  participants: z.number().int().min(1).max(100000),
  frequency: z.string().regex(/^\d{1,3}$/),
  hoursPerWeek: z.number().min(0).max(10000),
  // Шаг 3 — проблемы
  losses: ids,
  consequences: str(3000),
  // Шаг 4 — системы
  systems: ids,
  aiUsage: z.string().regex(/^\d{1,3}$/),
  dataStorage: z.string().regex(/^\d{1,3}$/),
  // Шаг 5 — цель
  goal: str(3000),
  successCriteria: str(1000),
  urgency: z.string().regex(/^\d{1,3}$/),
  // Шаг 6 — бюджет и решение
  budget: z.string().regex(/^\d{1,3}$/),
  decisionMaker: z.string().regex(/^\d{1,3}$/),
  readyForCall: z.string().regex(/^\d{1,3}$/),
  companyOwner: z.string().trim().max(200).optional().default(''),
  // Шаг 7 — компания
  companyName: str(200),
  industry: str(200),
  city: str(200),
  website: z.string().trim().max(300).optional().default(''),
  teamSize: z.string().regex(/^\d{1,3}$/),
  // Шаг 8 — контакт
  name: str(150),
  position: str(150),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(200).optional().or(z.literal('')),
  notes: z.string().trim().max(3000).optional().default(''),
  wantsDraft: z.string().regex(/^\d{1,3}$/),
  consent: z.literal(true),
  // honeypot
  company_extra: z.string().max(0).optional(),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRate(ip)) {
    return json({ error: 'Слишком много отправок. Попробуйте позже.' }, 429)
  }

  let parsed
  try {
    parsed = Schema.safeParse(await req.json())
  } catch (_e) {
    return json({ error: 'Некорректный запрос' }, 400)
  }
  if (!parsed.success) {
    console.error('validation_error', JSON.stringify(parsed.error.flatten().fieldErrors))
    return json({ error: 'Проверьте заполнение полей анкеты', fields: parsed.error.flatten().fieldErrors }, 400)
  }
  const d = parsed.data

  const values: Record<string, unknown> = {
    // Тип обращения: Полная диагностика
    '51': '2',
    // 1. Контактные данные
    '2': d.name,
    '3': d.position,
    '4': [{ contact: d.phone }],
    '6': '3', // MAX
    // 2. О компании
    '8': d.companyName,
    '9': d.industry,
    '10': d.city,
    '12': d.teamSize,
    // 3. Что хотите улучшить
    '14': d.process,
    '15': d.manualActions,
    '16': d.losses,
    '32': d.processDescription,
    '33': d.participants,
    '34': d.frequency,
    '35': d.hoursPerWeek,
    '36': d.consequences,
    // 4. Системы и инструменты
    '18': d.systems,
    '19': d.aiUsage,
    '37': d.dataStorage,
    // 5. Цель и срочность
    '21': d.goal,
    '22': d.urgency,
    '38': d.successCriteria,
    // 6. Бюджет и решение
    '24': d.budget,
    '25': d.decisionMaker,
    '26': d.readyForCall,
    // 7. Дополнительно
    '29': d.wantsDraft,
    '31': true,
    // Служебные
    '41': '1',        // источник: веб-форма
    '42': ['1'],      // статус: Новая
    '44': '2',        // квалификация: требуется уточнение
    '45': '6',        // рекомендуемый продукт: пока не определён
    '47': 'Связаться с клиентом в MAX',
  }
  if (d.email) values['5'] = [{ contact: d.email }]
  if (d.website) values['11'] = [{ contact: d.website }]
  if (d.companyOwner) values['30'] = d.companyOwner
  if (d.notes) values['28'] = d.notes

  try {
    const res = await fetch(`${BASE}/api/v1/catalogs/${CATALOG_ID}/records`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${LOGIN}:${PASSWORD}`),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    })
    const text = await res.text()
    if (!res.ok) {
      console.error('bpium_error', res.status, text)
      return json({ error: 'Не удалось отправить анкету. Попробуйте ещё раз или напишите на ai@aleksamois.ru' }, 502)
    }
    let recordId: string | null = null
    try { recordId = JSON.parse(text)?.id ?? null } catch { /* ignore */ }
    if (!recordId) {
      console.error('bpium_no_id', text)
      return json({ error: 'Не удалось отправить анкету. Попробуйте ещё раз или напишите на ai@aleksamois.ru' }, 502)
    }
    console.log('diagnostic_created', recordId)
    return json({ ok: true, recordId })
  } catch (e) {
    console.error('bpium_request_failed', String(e))
    return json({ error: 'Сервис временно недоступен. Попробуйте позже или напишите на ai@aleksamois.ru' }, 502)
  }
})
