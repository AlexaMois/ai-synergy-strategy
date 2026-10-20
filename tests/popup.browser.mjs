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
    await popup.getByRole("button", { name: /Проверить процесс/ }).click();
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
    await page.getByRole("heading", { name: /Посмотрите, как мы решаем задачи бизнеса/ }).waitFor({ state: "visible" });
    await page.bringToFront();
    await page.clock.fastForward(61000);
    assert.equal(await page.getByRole("dialog", { name: /Превратите рабочую задачу/ }).count(), 0);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.clock.runFor(1200);
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
    await page.getByRole("heading", { name: /Система подбора и сопровождения сиделок/ }).waitFor({ state: "visible" });
    await page.clock.fastForward(61000);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.clock.runFor(1200);
    const popup = page.getByRole("dialog", { name: /Превратите рабочую задачу/ });
    await popup.waitFor({ state: "visible" });
    const bounds = await popup.boundingBox();
    assert(bounds && bounds.height <= 568 && bounds.width <= 322, "mobile popup fits 320x568");
  });

  await scenario("desktop engaged-visit fallback after 45 seconds and 35% scroll", { width: 1440, height: 900 }, async (page) => {
    await page.goto(BASE + "/cases");
    await page.getByRole("heading", { name: /Посмотрите, как мы решаем задачи бизнеса/ }).waitFor({ state: "visible" });
    await page.bringToFront();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.75));
    await page.clock.fastForward(46000);
    await page.getByRole("dialog", { name: /Превратите рабочую задачу/ }).waitFor({ state: "visible" });
    await page.getByRole("button", { name: "Закрыть приглашение" }).click();
  });

  await scenario("QA preview bypasses cooldown and stays reusable", { width: 1440, height: 900 }, async (page) => {
    await page.goto(BASE + "/cases");
    await page.evaluate(() => {
      localStorage.setItem("self-start-popup-suppressed-until-v1", String(Date.now() + 14 * 86400000));
      sessionStorage.setItem("self-start-popup-shown", "1");
      sessionStorage.setItem("self-start-form-started", "1");
    });
    await page.goto(BASE + "/cases?popup_preview=1");
    const popup = page.getByRole("dialog", { name: /Превратите рабочую задачу/ });
    await popup.waitFor({ state: "visible" });
    await popup.getByRole("button", { name: "Продолжить просмотр" }).click();
    await popup.waitFor({ state: "hidden" });
    await page.reload();
    await popup.waitFor({ state: "visible" });
    assert.equal(await page.evaluate(() => sessionStorage.getItem("self-start-popup-shown")), "1");
  });

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
    { width: 320, height: 568 },
  ]) {
    await scenario("popup visual geometry " + viewport.width + "x" + viewport.height, viewport, async (page) => {
      await page.goto(BASE + "/cases?popup_preview=1");
      const dialog = page.getByRole("dialog", { name: /Превратите рабочую задачу/ });
      await dialog.waitFor({ state: "visible" });
      await page.evaluate(() => document.fonts.ready);
      const result = await dialog.evaluate((node) => {
        const box = node.getBoundingClientRect();
        const inner = node.firstElementChild;
        const header = node.querySelector("h2");
        const close = node.querySelector("button[aria-label='Закрыть приглашение']");
        const primary = [...node.querySelectorAll("button")].find((b) => b.textContent?.includes("Проверить процесс"));
        const secondary = [...node.querySelectorAll("button")].find((b) => b.textContent?.includes("Продолжить просмотр"));
        const rect = (el) => el?.getBoundingClientRect();
        const inside = (r) => !!r && r.left >= box.left - 1 && r.right <= box.right + 1 &&
          r.top >= box.top - 1 && r.bottom <= box.bottom + 1;
        return {
          outerOverflow: node.scrollWidth - node.clientWidth,
          innerOverflow: inner.scrollWidth - inner.clientWidth,
          titleOverflow: header ? header.scrollWidth - header.clientWidth : 0,
          insideClose: inside(rect(close)),
          insidePrimary: inside(rect(primary)),
          insideSecondary: inside(rect(secondary)),
          closeSize: { w: rect(close)?.width, h: rect(close)?.height },
          headingPresent: !!header,
          bounds: { width: box.width, height: box.height },
          viewport: { w: window.innerWidth, h: window.innerHeight },
          verticalScroll: node.scrollHeight > node.clientHeight,
        };
      });
      assert(result.headingPresent, "popup heading present");
      assert(result.outerOverflow <= 1, "outer horizontal overflow " + JSON.stringify(result));
      assert(result.innerOverflow <= 1, "inner horizontal overflow " + JSON.stringify(result));
      assert(result.titleOverflow <= 1, "heading horizontal overflow " + JSON.stringify(result));
      assert(result.insideClose && result.insidePrimary && result.insideSecondary,
        "buttons must remain visible " + JSON.stringify(result));
      assert(result.closeSize.w >= 39 && result.closeSize.h >= 39, "close target");
      assert(result.bounds.width <= viewport.width + 1 && result.bounds.height <= viewport.height + 1,
        "popup fits screen");
      await page.screenshot({ path: "artifacts/popup-polished-" + viewport.width + ".png" });
    });
  }

    console.log("Browser scenarios passed:", passed);
} finally {
  await browser.close();
}
