// Повторная доставка уведомлений НейроСекретарю.
// Триггер: Yandex Message Queue (очередь notify-retry) → эта Cloud Function.
// Повторы выполняются ВНЕ пользовательского HTTP-запроса формы.
// Запись в Bpium уже создана — здесь только уведомление.
// Логи: record_id, номер попытки, HTTP-код, технический статус. ПДн не передаются.

const NOTIFY_URL =
  process.env.NEUROSECRETARY_NOTIFY_URL || 'https://bot.atslogistik.ru/vasya/internal/site-lead'
const NOTIFY_SECRET = process.env.NEUROSECRETARY_NOTIFY_SECRET ?? ''
const NOTIFY_TIMEOUT_MS = 10000
const MAX_ATTEMPTS = Number(process.env.NOTIFY_MAX_ATTEMPTS ?? 6)

const notifyLog = (recordId, attempt, code, status) =>
  console.log(JSON.stringify({ record_id: String(recordId), attempt, code, status }))

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

// Одно сообщение очереди = одна заявка. Успех — только 200 {"ok": true}.
// Неуспех: бросаем ошибку, чтобы YMQ вернул сообщение в очередь
// (повтор по visibility timeout, далее — DLQ по redrive policy).
async function processMessage(raw) {
  let payload
  try {
    payload = JSON.parse(raw)
  } catch {
    notifyLog('unknown', 0, 0, 'notify_retry_bad_message')
    return
  }
  const attempt = Number(payload.attempt ?? 2)
  let status = 0
  let ok = false
  try {
    const result = await postNotification({
      record_id: payload.record_id,
      form_type: payload.form_type,
      page_url: payload.page_url,
      created_at: payload.created_at,
    })
    status = result.status
    ok = result.ok
  } catch {
    status = 0
  }
  if (ok) {
    notifyLog(payload.record_id, attempt, status, 'notify_sent')
    return
  }
  if (attempt >= MAX_ATTEMPTS) {
    notifyLog(payload.record_id, attempt, status, 'notify_failed_final')
    return
  }
  notifyLog(payload.record_id, attempt, status, 'notify_failed_attempt')
  throw new Error('notify_retry')
}

export const handler = async (event) => {
  const messages = event?.messages ?? []
  for (const m of messages) {
    await processMessage(m?.details?.message?.body ?? '')
  }
  return { statusCode: 200 }
}
