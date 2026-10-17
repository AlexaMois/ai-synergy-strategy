import { expect, test } from "bun:test";
import { handleRequest } from "../forms-handler/index.mjs";

test("existing short lead maps a full voluntary result into catalog task once", async () => {
  const original = globalThis.fetch;
  const calls: { url: string; body: { values?: Record<string, unknown> } }[] = [];
  globalThis.fetch = (async (url, init) => {
    calls.push({ url: String(url), body: JSON.parse(String(init?.body || "{}")) });
    return new Response(JSON.stringify({ id: "test-record" }), { status: 200 });
  }) as typeof fetch;
  const task = `Запрос на услугу: Личный разбор с Александрой — 17 000 ₽.\nГлавная проблема: ${"Задержки. ".repeat(350)}\nПервый шаг: проверить один процесс.`;
  try {
    const response = await handleRequest({ path: "/short-lead", rawBody: JSON.stringify({ name: "Тест", phone: "+79990000000", industry: "Транспорт", task, consent: true }), headers: { "x-forwarded-for": "test-assessment" } });
    expect(response.statusCode).toBe(200);
    const records = calls.filter(call => call.url.includes("/records"));
    expect(records.length).toBe(1);
    expect(records[0]?.url).toContain("/catalogs/81/records");
    expect(records[0]?.body.values?.["14"]).toBe(task);
    expect(records[0]?.body.values?.["9"]).toBe("Транспорт");
    expect(records[0]?.body.values?.["31"]).toBe(true);
  } finally { globalThis.fetch = original; }
});