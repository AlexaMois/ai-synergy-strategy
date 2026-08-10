// Повторная доставка уведомлений НейроСекретарю.
//
// Заявка в Bpium первична: она уже создана к моменту, когда сюда что-то попадает.
// Уведомление вторично, поэтому его неудача не влияет ни на ответ формы, ни на
// сохранность заявки. Задача очереди — не потерять уведомление молча.
//
// Заменяет прежнюю связку Yandex Message Queue + отдельная Cloud Function:
// на одном сервере очередь из внешнего сервиса не нужна, достаточно файла.
//
// Состояние лежит на диске (STATE_DIR, по умолчанию каталог systemd StateDirectory)
// и переживает перезапуск службы: после рестарта незавершённые уведомления
// подхватываются и досылаются.
//
// В логи идут только record_id, номер попытки, HTTP-код и технический статус.
// Персональные данные сюда не попадают: в payload их нет по построению.

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const STATE_DIR = process.env.STATE_DIR || '/var/lib/forms-handler'
const QUEUE_FILE = path.join(STATE_DIR, 'notify-queue.json')

const NOTIFY_URL =
  process.env.NEUROSECRETARY_NOTIFY_URL || 'https://bot.atslogistik.ru/vasya/internal/site-lead'
const NOTIFY_SECRET = process.env.NEUROSECRETARY_NOTIFY_SECRET ?? ''
const NOTIFY_TIMEOUT_MS = 10000

// Нарастающие интервалы: минута, пять, пятнадцать, час, три часа, шесть.
// Короткое начало ловит мигнувшую сеть, длинный хвост не долбит недоступного
// бота весь день. Всего попыток: одна в запросе формы плюс шесть здесь.
const RETRY_DELAYS_MS = [60_000, 5 * 60_000, 15 * 60_000, 60 * 60_000, 3 * 60 * 60_000, 6 * 60 * 60_000]

// Как часто проверяем очередь. Интервалы выше заданы в минутах и часах,
// поэтому раз в полминуты достаточно и процессор не греется.
const TICK_MS = 30_000

const notifyLog = (recordId, attempt, code, status) =>
  console.log(JSON.stringify({ record_id: String(recordId), attempt, code, status }))

// Запись в очереди: payload уведомления, номер следующей попытки и время,
// раньше которого пробовать не нужно.
let queue = []
let timer = null
let writing = null

async function loadQueue() {
  try {
    if (!existsSync(QUEUE_FILE)) return []
    const raw = await readFile(QUEUE_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    // Битый файл не должен мешать приёму новых заявок: начинаем с пустой очереди,
    // но говорим об этом вслух.
    notifyLog('-', 0, 0, 'notify_queue_unreadable')
    return []
  }
}

// Пишем через временный файл: если процесс умрёт посреди записи, на диске
// останется целый предыдущий вариант, а не половина JSON.
async function saveQueue() {
  await (writing = (async () => {
    try {
      await mkdir(STATE_DIR, { recursive: true })
      const tmp = `${QUEUE_FILE}.tmp`
      await writeFile(tmp, JSON.stringify(queue), 'utf8')
      await rename(tmp, QUEUE_FILE)
    } catch {
      notifyLog('-', 0, 0, 'notify_queue_save_failed')
    }
  })())
}

async function postNotification(payload) {
  const ac = new AbortController()
  const t = setTimeout(() => ac.abort(), NOTIFY_TIMEOUT_MS)
  try {
    const res = await fetch(NOTIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${NOTIFY_SECRET}` },
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
    clearTimeout(t)
  }
}

// Повторная отправка того же recordId безопасна: бот сам отсекает дубли по нему
// и второго сообщения в MAX не будет.
async function processDue() {
  const now = Date.now()
  const due = queue.filter((item) => item.nextAt <= now)
  if (!due.length) return

  for (const item of due) {
    const attempt = item.attempt
    let status = 0
    let ok = false
    try {
      const result = await postNotification(item.payload)
      status = result.status
      ok = result.ok
    } catch {
      status = 0
    }

    if (ok) {
      queue = queue.filter((q) => q !== item)
      notifyLog(item.payload.recordId, attempt, status, 'notify_sent_retry')
      continue
    }

    if (attempt >= RETRY_DELAYS_MS.length) {
      // Попытки исчерпаны. Заявка в Bpium на месте, поэтому теряется только
      // сообщение в MAX — об этом должно остаться заметное свидетельство.
      queue = queue.filter((q) => q !== item)
      notifyLog(item.payload.recordId, attempt, status, 'notify_gave_up')
      continue
    }

    item.attempt = attempt + 1
    item.nextAt = now + RETRY_DELAYS_MS[attempt]
    notifyLog(item.payload.recordId, attempt, status, 'notify_retry_scheduled')
  }

  await saveQueue()
}

async function tick() {
  try {
    await processDue()
  } catch {
    notifyLog('-', 0, 0, 'notify_queue_tick_failed')
  }
}

/** Поставить уведомление в очередь повторов. Вызывается после неудачной первой попытки. */
export async function enqueueNotifyRetry(payload) {
  queue.push({
    payload,
    attempt: 1,                       // первая попытка уже сделана в запросе формы
    nextAt: Date.now() + RETRY_DELAYS_MS[0],
  })
  await saveQueue()
  notifyLog(payload.recordId, 1, 0, 'notify_retry_enqueued')
  return true
}

/** Поднять очередь с диска и запустить обработку. Вызывается один раз при старте. */
export async function startNotifyQueue() {
  queue = await loadQueue()
  if (queue.length) {
    notifyLog('-', 0, 0, `notify_queue_restored:${queue.length}`)
  }
  timer = setInterval(tick, TICK_MS)
  timer.unref?.()
  return queue.length
}

/** Остановить обработку и дописать состояние. Для корректного завершения службы. */
export async function stopNotifyQueue() {
  if (timer) clearInterval(timer)
  timer = null
  await saveQueue()
  await writing
}

export const _queueSizeForTests = () => queue.length
