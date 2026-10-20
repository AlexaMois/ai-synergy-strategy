import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.TEST_BASE_URL || "http://127.0.0.1:8080";
const browser = await chromium.launch({ headless: true });
mkdirSync("artifacts", { recursive: true });
let passed = 0;

async function scenario(title, viewport, test) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  await context.addInitScript(() => {
    localStorage.setItem("cookie_consent", JSON.stringify({
      version: "v3",
      savedAt: new Date().toISOString(),
      consent: { necessary: true, analytics: false },
    }));
  });
  const page = await context.newPage();
  await page.clock.install();
  try {
    await test(page, context);
    console.log("PASS", title);
    passed++;
  } finally {
    await context.close();
  }
}

async function openFromDesktop(page, path = "/cases") {
  await page.goto(BASE + path);
  await page.locator("body").waitFor();
  await page.bringToFront();
  await page.clock.fastForward(31000);
  await page.evaluate(() => document.dispatchEvent(new MouseEvent("mouseleave", { clientY: 0, bubbles: false })));
  await page.getByRole("dialog", { name: /Превратите рабочую задачу/ }).waitFor({ state: "visible" });
}

try {
  await scenario("desktop threshold, CTA and automatic questionnaire", { width: 1440, height: 900 }, async (page) => {
    await page.goto(BASE + "/cases");
    await page.bringToFront();
    await page.clock.fastForward(15000);
    await page.evaluate(() => document.dispatchEvent(new MouseEvent("mouseleave", { clientY: 0 })));
    assert.equal(await page.getByRole("dialog", { name: /Превратите рабочую задачу/ }).count(), 0);
    await page.clock.fastForward(16000);
    await page.evaluate(() => document.dispatchEvent(new MouseEvent("mouseleave", { clientY: 0 })));
    const popup = page.getByRole("dialog", { name: /Превратите рабочую задачу/ });
    await popup.waitFor({ state: "visible" });
    await page.screenshot({ path: "artifacts/popup-desktop.png" });
    await popup.getByRole("button", { name: /Проверить свой процесс/ }).click();
    await page.waitForURL(/\/start\/?$/);
    await page.getByText("Самостоятельная проверка одного процесса").waitFor({ state: "visible" });
    assert.equal(await page.evaluate(() => sessionStorage.getItem("self-start-source")), "exit_popup");
    assert.equal(await page.evaluate(() => Number(localStorage.getItem("self-start-popup-suppressed-until-v1")) > Date.now()), true);
  });

  await scenario("dismiss, reload and different tab respect 14-day cooldown", { width: 1440, height: 900 }, async (page, context) => {
    await openFromDesktop(page);
    await page.getByRole("button", { name: "Продолжить просмотр" }).click();
    await page.getByRole("dialog", { name: /Превратите рабочую задачу/ }).waitFor({ state: "hidden" });
    await page.reload();
    await page.clock.fastForward(31000);
    await page.evaluate(() => document.dispatchEvent(new MouseEvent("mouseleave", { clientY: 0 })));
    assert.equal(await page.getByRole("dialog", { name: /Превратите рабочую задачу/ }).count(), 0);
    const anotherTab = await context.newPage();
    await anotherTab.clock.install();
    await anotherTab.goto(BASE + "/cases");
    await anotherTab.clock.fastForward(31000);
    await anotherTab.evaluate(() => document.dispatchEvent(new MouseEvent("mouseleave", { clientY: 0 })));
    assert.equal(await anotherTab.getByRole("dialog", { name: /Превратите рабочую задачу/ }).count(), 0);
  });

  await scenario("form interaction and excluded routes", { width: 1440, height: 900 }, async (page) => {
    await page.goto(BASE + "/start");
    await page.clock.fastForward(31000);
    await page.evaluate(() => document.dispatchEvent(new MouseEvent("mouseleave", { clientY: 0 })));
    assert.equal(await page.getByRole("dialog", { name: /Превратите рабочую задачу/ }).count(), 0);
    await page.goto(BASE + "/legal/privacy-policy");
    await page.clock.fastForward(31000);
    await page.evaluate(() => document.dispatchEvent(new MouseEvent("mouseleave", { clientY: 0 })));
    assert.equal(await page.getByRole("dialog", { name: /Превратите рабочую задачу/ }).count(), 0);
  });

  await scenario("mobile time+scroll and bottom sheet", { width: 390, height: 844 }, async (page) => {
    await page.goto(BASE + "/cases");
    await page.bringToFront();
    await page.clock.fastForward(61000);
    assert.equal(await page.getByRole("dialog", { name: /Превратите рабочую задачу/ }).count(), 0);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.clock.runFor(1200);
    console.log("MOBILE DEBUG", JSON.stringify(await page.evaluate(() => ({ scrollY: scrollY, max: document.documentElement.scrollHeight - innerHeight, hidden: document.hidden, focused: document.hasFocus(), active: document.activeElement?.tagName, cookie: !!localStorage.getItem("cookie_consent"), dialog: !!document.querySelector("[role=dialog][data-state=open]"), started: sessionStorage.getItem("self-start-form-started"), shown: sessionStorage.getItem("self-start-popup-shown") }))));
    await page.screenshot({ path: "artifacts/mobile-precondition.png" });
    const popup = page.getByRole("dialog", { name: /Превратите рабочую задачу/ });
    await popup.waitFor({ state: "visible" });
    await page.screenshot({ path: "artifacts/popup-mobile.png" });
    const viewport = page.viewportSize();
    const bounds = await popup.boundingBox();
    assert(bounds && viewport, "mobile dialog has a bounding box");
    assert(bounds.x >= -2 && bounds.x + bounds.width <= viewport.width + 2, "dialog fits viewport");
    await popup.getByRole("button", { name: "Закрыть приглашение" }).click();
  });

  await scenario("completion records 90-day cooldown", { width: 1440, height: 900 }, async (page) => {
    await page.goto(BASE + "/start");
    await page.evaluate(() => {
      const form = {
        process: "Обработка входящих заявок",
        processDescription: "Менеджер вручную заносит заявки из звонков и чатов в таблицу, часть обращений теряется",
        manualActions: ["1"], participants: "3", frequency: "2", hoursPerWeek: "12",
        losses: ["2"], consequences: "Клиенты ожидают ответа", systems: ["5"], dataStorage: "2",
        goal: "Общий журнал заявок", successCriteria: "Доля потерянных заявок",
      };
      sessionStorage.setItem("diagnostic-draft-v2", JSON.stringify({ step: 5, form, sourceQuestion: "" }));
      sessionStorage.setItem("self-start-form-started", "1");
    });
    await page.reload();
    await page.getByText("Шаг 5 из 5").waitFor();
    await page.getByRole("button", { name: /Показать результат/ }).click();
    await page.getByText("Самостоятельная проверка · результат").waitFor();
    assert.equal(await page.evaluate(() => Number(localStorage.getItem("self-start-popup-completed-until-v1")) - Date.now() > 89 * 86400000), true);
    await page.getByRole("button", { name: /Личный разбор · 17 000 ₽/ }).click();
    assert.equal(await page.evaluate(() => Boolean(sessionStorage.getItem("aleksamois.contactIntent"))), true);
  });

  await scenario("small mobile viewport and direct route", { width: 320, height: 568 }, async (page) => {
    await page.goto(BASE + "/cases/caregiver-matching");
    assert(await page.getByText("Система подбора и сопровождения сиделок").count());
    await page.clock.fastForward(61000);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.clock.runFor(1200);
    const popup = page.getByRole("dialog", { name: /Превратите рабочую задачу/ });
    await popup.waitFor({ state: "visible" });
    const bounds = await popup.boundingBox();
    assert(bounds && bounds.height <= 568 && bounds.width <= 322, "mobile popup fits 320x568");
  });

  console.log("Browser scenarios passed:", passed);
} finally {
  await browser.close();
}
