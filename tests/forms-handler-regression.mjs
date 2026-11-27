import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

process.env.BPIUM_BASE_URL = 'https://bpium.invalid'
process.env.BPIUM_CATALOG_ID = '81'
process.env.BPIUM_LOGIN = 'mock'
process.env.BPIUM_PASSWORD = 'mock'
process.env.NEUROSECRETARY_NOTIFY_URL = 'https://notify.invalid'
process.env.NEUROSECRETARY_NOTIFY_SECRET = 'mock'
process.env.STATE_DIR = mkdtempSync(join(tmpdir(), 'forms-handler-ci-'))
process.on('exit', () => rmSync(process.env.STATE_DIR, { recursive: true, force: true }))

const records = []
const notices = []
globalThis.fetch = async (url, init) => {
  const target = new URL(url)
  if (target.origin === 'https://bpium.invalid') {
    records.push(JSON.parse(init.body).values)
    return new Response(JSON.stringify({ id: `mock-${records.length}` }), { status: 200 })
  }
  if (target.origin === 'https://notify.invalid') {
    notices.push(JSON.parse(init.body))
    return new Response('{"ok":true}', { status: 200 })
  }
  throw new Error(`Unexpected outbound request: ${target.origin}`)
}

const { handleRequest } = await import('../forms-handler/index.mjs')
const offers = [
  ...Array.from({ length: 15 }, (_, i) => `mini-${String(i + 1).padStart(2, '0')}`),
  'product-neurotenderolog', 'product-knowledge-management',
  'hermes-basic', 'hermes-advanced', 'custom-agent',
  'automation-process', 'automation-corporate-system', 'automation-integration',
  'automation-custom-software', 'expert-onsite', 'expert-training', 'expert-audit',
]
const send = (body, ip) => handleRequest({
  path: '/short-lead', rawBody: JSON.stringify(body),
  headers: { origin: 'https://aleksamois.ru', 'x-forwarded-for': ip },
})
for (const [i, offerId] of offers.entries()) {
  const body = {
    name: 'Синтетическая проверка', phone: '+79990000000', task: 'Тест маршрута',
    consent: true, offerId, format: 'connect', licensePlan: 'plus',
    sourcePath: '/start', test_mode: true,
  }
  const response = await send(body, `192.0.2.${i + 1}`)
  assert.equal(response.statusCode, 200, offerId)
  const values = records.at(-1)
  assert.equal(values['52'], true, offerId)
  assert.equal(values.intake_next_action, values['47'], offerId)
  assert.match(values['14'], new RegExp(offerId))
  assert.equal(values['45'], offerId.startsWith('product-') ? '6' : offerId === 'expert-onsite' || offerId === 'expert-audit' ? '2' : offerId === 'expert-training' ? '3' : '5')
  assert.equal(values['14'].includes('Лицензия: plus'), offerId.startsWith('mini-') && offerId !== 'mini-15')
  if (i === 0) {
    const again = await send(body, '192.0.2.1')
    assert.equal(again.statusCode, 200)
    assert.equal(JSON.parse(again.body).duplicate, true)
    assert.equal(records.length, 1)
    assert.equal(notices.length, 1)
  }
}
assert.equal(records.length, 27)
assert.equal(notices.length, 27)
assert.deepEqual(Object.keys(notices[0]).sort(), ['createdAt', 'formName', 'pageUrl', 'recordId'])
const legacy = await send({ name: 'Синтетическая проверка', phone: '+79990000000', consent: true }, '192.0.2.100')
assert.equal(legacy.statusCode, 200)
assert.equal(records.at(-1)['14'], 'Заявка с сайта: запрос не указан')
assert.equal(records.at(-1)['45'], '6')
assert.equal(records.at(-1)['52'], undefined)
const invalid = await send({ name: 'Синтетическая проверка', phone: '+79990000000', consent: true, offerId: 'unknown' }, '192.0.2.101')
assert.equal(invalid.statusCode, 400)
assert.equal(records.length, 28)
console.log('PASS: 27 commercial routes, duplicate, test_mode, legacy, invalid offer; no live requests')
