// HTTP-обёртка обработчика форм.
//
// Единственная задача этого файла — принять запрос от nginx и передать его в
// логику из index.mjs. Раньше эту роль играл интерфейс Yandex Cloud Function
// плюс API Gateway; ни валидации, ни маппинга Bpium здесь нет и быть не должно.
//
// Слушает только 127.0.0.1: наружу сервис публикует nginx, напрямую из интернета
// он недоступен.

import http from 'node:http'
import { handleRequest } from './index.mjs'
import { startNotifyQueue, stopNotifyQueue } from './notify-queue.mjs'

const HOST = process.env.HOST || '127.0.0.1'
const PORT = Number(process.env.PORT || 8090)

// Заявки маленькие: самая большая, анкета нейростилиста, укладывается в десятки
// килобайт. Лимит отсекает мусор до разбора JSON. Тот же предел стоит в nginx —
// здесь он на случай обращения в обход прокси.
const MAX_BODY_BYTES = Number(process.env.MAX_BODY_BYTES || 64 * 1024)

const log = (event, extra = {}) =>
  console.log(JSON.stringify({ ts: new Date().toISOString(), event, ...extra }))

/** Тело запроса с жёстким лимитом. null означает, что лимит превышен.
 *
 * При превышении лимита поток ставится на паузу, но НЕ уничтожается: сокет
 * нужен живым, чтобы отдать клиенту честный ответ 413. Уничтожение здесь
 * рвало соединение раньше ответа, и браузер видел обрыв вместо кода ошибки.
 */
function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    let done = false
    req.on('data', (chunk) => {
      if (done) return
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        done = true
        req.pause()
        resolve(null)
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      if (done) return
      done = true
      resolve(Buffer.concat(chunks).toString('utf8'))
    })
    req.on('error', (err) => {
      if (done) return
      done = true
      reject(err)
    })
  })
}

const server = http.createServer(async (req, res) => {
  // Служебная проверка живости для systemd и ручной диагностики.
  // Ничего не раскрывает и в логику форм не заходит.
  if (req.method === 'GET' && (req.url === '/health' || req.url === '/healthz')) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: true }))
    return
  }

  try {
    const url = new URL(req.url || '/', 'http://localhost')
    const rawBody = req.method === 'POST' ? await readBody(req) : ''

    if (rawBody === null) {
      log('body_too_large', { path: url.pathname })
      // Connection: close — остаток тела дочитывать не будем, соединение
      // закрывается сразу после ответа. Сокет рвём только когда ответ ушёл.
      res.writeHead(413, { 'Content-Type': 'application/json', Connection: 'close' })
      res.end(JSON.stringify({ error: 'Слишком большой запрос' }), () => req.destroy())
      return
    }

    const result = await handleRequest({
      method: req.method || 'POST',
      path: url.pathname,
      rawBody,
      headers: req.headers,
    })

    res.writeHead(result.statusCode, result.headers)
    res.end(result.body)
  } catch (err) {
    // Ни текст ошибки, ни содержимое запроса наружу не отдаём: пользователю
    // общая фраза, подробности только в журнал службы.
    log('unhandled_error', { name: err?.name || 'Error' })
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Сервис временно недоступен. Попробуйте позже.' }))
  }
})

// Медленный клиент не должен занимать соединение бесконечно.
server.headersTimeout = 10_000
server.requestTimeout = 30_000

const shutdown = async (signal) => {
  log('shutdown', { signal })
  server.close()
  await stopNotifyQueue()
  process.exit(0)
}

process.on('SIGTERM', () => void shutdown('SIGTERM'))
process.on('SIGINT', () => void shutdown('SIGINT'))

const restored = await startNotifyQueue()
server.listen(PORT, HOST, () => {
  log('started', { host: HOST, port: PORT, restored_notifications: restored })
})
