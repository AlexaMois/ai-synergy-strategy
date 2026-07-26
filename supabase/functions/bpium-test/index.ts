// Служебная тестовая функция: проверка интеграции с Bpium (каталог 81).
// Не используется интерфейсом сайта. Секреты читаются только на сервере.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const BASE = (Deno.env.get('BPIUM_BASE_URL') ?? '').replace(/\/+$/, '')
const LOGIN = Deno.env.get('BPIUM_LOGIN') ?? ''
const PASSWORD = Deno.env.get('BPIUM_PASSWORD') ?? ''

function authHeaders() {
  return {
    Authorization: 'Basic ' + btoa(`${LOGIN}:${PASSWORD}`),
    'Content-Type': 'application/json',
  }
}

async function bpium(path: string, init: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { ...authHeaders(), ...(init.headers ?? {}) },
  })
  const text = await res.text()
  let body: unknown = text
  try { body = JSON.parse(text) } catch { /* keep text */ }
  return { status: res.status, ok: res.ok, body }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const url = new URL(req.url)
  const action = url.searchParams.get('action') ?? 'schema'
  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data, null, 2), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  try {
    if (action === 'schema') {
      const r = await bpium('/api/v1/catalogs/81')
      return json(r, r.ok ? 200 : 502)
    }

    if (action === 'record') {
      const id = url.searchParams.get('id')
      const r = await bpium(`/api/v1/catalogs/81/records/${id}`)
      return json(r, r.ok ? 200 : 502)
    }

    if (action === 'get') {
      const path = url.searchParams.get('path') ?? '/api/v1/catalogs/81'
      const r = await bpium(path)
      return json(r, r.ok ? 200 : 502)
    }

    if (action === 'diag') {
      const r = await bpium(`/api/v1/catalogs/81?_=${Date.now()}`, {
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
      })
      const body = r.body as any
      const fields = Array.isArray(body?.fields) ? body.fields : []
      const f51 = fields.find((f: any) => String(f.id) === '51') ?? null
      const cats = await bpium('/api/v1/catalogs')
      const catList = Array.isArray((cats.body as any)) ? (cats.body as any) : []
      return json({
        domain: (() => { try { return new URL(BASE).host } catch { return 'invalid BASE URL' } })(),
        catalogRequested: '81',
        status: r.status,
        catalogName: body?.name ?? null,
        catalogPrivilegeCode: body?.privilegeCode ?? null,
        fieldPrivilegeCodes: body?.fieldPrivilegeCodes ?? null,
        fieldsCount: fields.length,
        lastFieldIds: fields.slice(-12).map((f: any) => f.id),
        allFieldIds: fields.map((f: any) => f.id),
        field51: f51,
        catalogsVisible: catList.map((c: any) => ({ id: c.id, name: c.name })),
      }, r.ok ? 200 : 502)
    }

    if (action === 'delete') {
      const id = url.searchParams.get('id')
      const r = await bpium(`/api/v1/catalogs/81/records/${id}`, { method: 'DELETE' })
      return json(r, r.ok ? 200 : 502)
    }

    if (action === 'create') {
      const payload = await req.json()
      const r = await bpium('/api/v1/catalogs/81/records', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      return json({ sentPayload: payload, bpium: r }, r.ok ? 200 : 502)
    }

    if (action === 'patch') {
      const id = url.searchParams.get('id')
      const payload = await req.json()
      const r = await bpium(`/api/v1/catalogs/81/records/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      })
      return json({ sentPayload: payload, bpium: r }, r.ok ? 200 : 502)
    }

    return json({ error: 'unknown action' }, 400)
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})
