import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const browser = await chromium.launch({ headless: true });
const BASE = process.env.TEST_BASE_URL || "http://127.0.0.1:8080";
mkdirSync("artifacts", { recursive: true });

const evidence = [
  { key: "card", title: "Карточка закупки после ИИ-анализа", file: "tender_card_public.webp" },
  { key: "match", title: "Результат отбора · 7 октября 2026", file: "tender_daily_match_public.webp" },
  { key: "zero", title: "Результат отбора · 18 октября 2026", file: "tender_daily_zero_public.webp" },
];

async function runViewport(width, height, testZoom = false) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" });
  await context.addInitScript(() => {
    localStorage.setItem("cookie_consent", JSON.stringify({
      version: "v3", savedAt: new Date().toISOString(),
      consent: { necessary: true, analytics: false },
    }));
    sessionStorage.setItem("self-start-popup-shown", "1");
  });
  const page = await context.newPage();
  // Third-party RUM endpoint rejects localhost CORS; isolate UI tests from this external service.
  await page.route("https://cloudflareinsights.com/**", route => route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*" }, body: "" }));
  const errors = [];
  page.on("pageerror", error => errors.push(String(error)));
  page.on("console", msg => { if (msg.type() === "error") errors.push(msg.text()); });
  try {
    await page.goto(BASE + "/cases/neurotenderolog");
    if (testZoom) await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    await page.getByRole("heading", { name: "НейроТендеролог", exact: true }).waitFor({ state: "visible" });
    await page.getByRole("heading", { name: "Три рабочих сценария" }).scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    const scenarioRows = page.locator("section[aria-labelledby=tender-evidence] article");
    assert.equal(await scenarioRows.count(), 3, "three editorial scenario rows");
    const benefits = page.locator("section[aria-labelledby=tender-outcomes] article");
    assert.equal(await benefits.count(), 4, "four benefit cards");
    for (let i = 0; i < 3; i++) {
      const row = scenarioRows.nth(i);
      assert.equal(await row.locator("img").count(), 1, "one image in each scenario");
      assert.equal(await row.locator("figure > button > img").count(), 1, "screenshot is a direct image inside its zoom button");
      assert.equal(await row.locator("figure .bg-card").count(), 0, "no background card around screenshot");
      await row.scrollIntoViewIfNeeded();
      if (width >= 1024) {
        const geometry = await row.evaluate(el => {
          const text = el.firstElementChild.getBoundingClientRect();
          const picture = el.querySelector("figure").getBoundingClientRect();
          return { textRight: text.right, pictureLeft: picture.left, textTop: text.top, pictureTop: picture.top, imgWidth: el.querySelector("img").getBoundingClientRect().width };
        });
        assert(geometry.textRight <= geometry.pictureLeft + 3, "text must be left of screenshot");
        assert(geometry.imgWidth >= 320, "screenshot must be large and readable");
      }
    }
    await page.screenshot({ path: "artifacts/tender-evidence-" + width + (testZoom ? "-200" : "") + ".png", fullPage: true });

    const beforeUrl = page.url();
    const priorTabs = context.pages().length;
    for (const shot of evidence) {
      const preview = page.getByRole("button", { name: "Увеличить изображение: " + shot.title });
      await preview.scrollIntoViewIfNeeded();
      await preview.focus();
      await page.keyboard.press("Enter");
      const dialog = page.locator("dialog[open]");
      await dialog.waitFor({ state: "visible" });
      assert.equal(page.url(), beforeUrl, "opening image keeps URL");
      assert.equal(context.pages().length, priorTabs, "opening image keeps same tab");
      const state = await dialog.evaluate(node => {
        const image = node.querySelector("img");
        const r = node.getBoundingClientRect();
        return {
          modal: node.matches(":modal"), imageLoaded: image?.complete && image?.naturalWidth > 0,
          width: r.width, height: r.height, focused: node.contains(document.activeElement),
          locked: document.body.style.overflow === "hidden",
        };
      });
      assert(state.modal && state.focused && state.locked, "native modal, focus and scroll lock");
      assert(state.imageLoaded, "real screenshot loaded");
      assert(state.width <= width * 0.95 + 1, "modal narrower than 95vw");
      assert(state.height <= height * 0.90 + 1, "modal shorter than 90vh");
      const dialogImage = dialog.locator("img");
      await dialogImage.click();
      assert.equal(await dialog.count(), 1, "clicking image keeps dialog open");
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "hidden" });
      await page.waitForFunction((el) => document.activeElement === el, await preview.elementHandle());
      assert.equal(page.url(), beforeUrl, "closing image keeps URL");
      await page.waitForFunction(() => document.body.style.overflow !== "hidden", null, { timeout: 5000 });
    }

    const first = page.getByRole("button", { name: "Увеличить изображение: " + evidence[0].title });
    await first.click();
    const dialog = page.locator("dialog[open]");
    await dialog.getByRole("button", { name: "Увеличить изображение в два раза" }).click();
    await dialog.getByRole("button", { name: "Уменьшить изображение" }).click();
    await dialog.getByRole("button", { name: "Закрыть просмотр" }).click();
    await dialog.waitFor({ state: "hidden" });
    await first.focus();
    await page.keyboard.press("Space");
    await dialog.waitFor({ state: "visible" });
    await dialog.evaluate(el => el.click()); // backdrop click, target = dialog
    await dialog.waitFor({ state: "hidden" });

    const horizontal = await page.evaluate(() => ({
      body: document.body.scrollWidth,
      document: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    assert(horizontal.body <= horizontal.viewport + 2 && horizontal.document <= horizontal.viewport + 2,
      "no page-level horizontal scrolling " + JSON.stringify(horizontal));
    assert.equal(errors.length, 0, "no console/runtime errors: " + errors.join("; "));
    console.log("PASS tender screenshots, focus and responsive geometry " + width + "x" + height + (testZoom ? " 200%" : ""));
  } finally {
    await context.close();
  }
}

try {
  await runViewport(1440, 900);
  await runViewport(390, 844);
  await runViewport(320, 568);
  // 200% text-size simulation on a narrow browser viewport
  await runViewport(720, 900, true);
} finally {
  await browser.close();
}
