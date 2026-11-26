import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

// Public-page smoke tests only. Never send real leads or use production services.
const BASE = new URL(process.env.TEST_BASE_URL || "http://127.0.0.1:4173");
assert(["127.0.0.1", "localhost"].includes(BASE.hostname), "Tests require a local preview");
await mkdir("artifacts/site-pr", { recursive: true });
const browser = await chromium.launch({ headless: true });
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

try {
  for (const { name, width, height } of viewports) {
    const context = await browser.newContext({
      viewport: { width, height },
      isMobile: name === "mobile",
      hasTouch: name === "mobile",
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      serviceWorkers: "block",
    });
    await context.route("**/*", async route => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin !== BASE.origin || !["GET", "HEAD"].includes(request.method())) {
        return route.abort("blockedbyclient");
      }
      return route.continue();
    });
    await context.addInitScript(() => {
      localStorage.setItem("cookie_consent", JSON.stringify({
        version: "v3", savedAt: new Date().toISOString(),
        consent: { necessary: true, analytics: false },
      }));
      // Suppress an unrelated exit popup while exercising the main journeys.
      localStorage.setItem("self-start-popup-suppressed-until-v1", String(Date.now() + 86400000));
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    const visible = async locator => locator.waitFor({ state: "visible", timeout: 20000 });
    const inView = async selector => page.waitForFunction(sel => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < innerHeight - 20 && rect.bottom > 20;
    }, selector, { timeout: 15000 });
    const checkLayout = async label => {
      const dimensions = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth, viewport: innerWidth,
      }));
      assert(dimensions.width <= dimensions.viewport + 3,
        label + ": horizontal overflow " + JSON.stringify(dimensions));
    };
    const goto = async path => {
      const response = await page.goto(new URL(path, BASE).href, { waitUntil: "domcontentloaded" });
      assert(response?.ok(), "HTTP error on " + path);
      const heading = page.locator("main h1").first();
      await visible(heading);
      assert((await heading.innerText()).trim().length > 3, "Missing meaningful heading on " + path);
      assert.equal(await page.getByText("404", { exact: true }).count(), 0, "404 on " + path);
      await checkLayout(path);
    };

    try {
      await goto("/");
      const main = page.locator("main");
      const industries = page.locator("#industry-questions");
      const contact = page.locator("#contact form");
      assert.equal(await contact.count(), 1, "Exactly one contact form");
      // Compare generated root metadata with the rendered page.
      const html = await (await context.request.get(BASE.href)).text();
      const staticMeta = await page.evaluate(markup => {
        const doc = new DOMParser().parseFromString(markup, "text/html");
        return {
          title: doc.title,
          description: doc.querySelector('meta[name="description"]')?.content,
          ogTitle: doc.querySelector('meta[property="og:title"]')?.content,
          ogDescription: doc.querySelector('meta[property="og:description"]')?.content,
        };
      }, html);
      assert(staticMeta.description && staticMeta.ogTitle && staticMeta.ogDescription, "Missing static metadata");
      await page.waitForFunction(expected => document.title === expected.title &&
        document.querySelector('meta[name="description"]')?.content === expected.description &&
        document.querySelector('meta[property="og:title"]')?.content === expected.ogTitle &&
        document.querySelector('meta[property="og:description"]')?.content === expected.ogDescription,
        staticMeta, { timeout: 10000 });
      await page.screenshot({ path: "artifacts/site-pr/" + name + "-home.png", fullPage: true });

      // Hero, industry selection, and the expandable answer.
      await main.getByRole("button", { name: "Узнать свою задачу", exact: true }).click();
      await inView("#industry-questions");
      for (const label of ["Производство", "Транспорт", "Строительство", "Услуги"]) {
        const tab = industries.getByRole("button", { name: label, exact: true });
        await tab.click();
        assert.equal(await tab.getAttribute("aria-pressed"), "true", "Industry tab " + label);
        const question = industries.locator('button[aria-controls="industry-question-answer"]').first();
        await question.click();
        await visible(page.locator("#industry-question-answer"));
        assert.equal(await question.getAttribute("aria-expanded"), "true", "Question expanded: " + label);
      }
      await checkLayout("expanded industry");
      await main.getByRole("button", { name: "Пригласить специалиста", exact: true }).click();
      await inView("#contact");
      await visible(contact.locator("#name"));
      await visible(contact.locator("#phone"));
      await visible(contact.locator("#comment"));
      await visible(contact.locator("#consent"));

      // Free self-check must navigate and automatically open the diagnostic.
      await main.getByRole("link", { name: "Проверить свой процесс бесплатно", exact: true }).click();
      await page.waitForURL(url => url.pathname.replace(/\/$/, "") === "/start");
      await visible(page.locator("#self-check"));
      await visible(page.locator("#self-check").locator("input, textarea, select, button").first());
      await checkLayout("self-check");
      await page.screenshot({ path: "artifacts/site-pr/" + name + "-self-check.png", fullPage: true });

      await goto("/");
      // The paid offer and secondary journey are explicit current homepage contracts.
      const offer = main.getByRole("heading", { name: "Выездная диагностика бизнес-процесса" });
      await visible(offer);
      await offer.scrollIntoViewIfNeeded();
      const offerCard = offer.locator("..");
      await visible(offerCard.getByText("Красноярск · До 1 часа", { exact: true }));
      await visible(offerCard.getByText(/Стоимость диагностики полностью засчитывается/));
      await visible(offerCard.getByText(/8[\s\u00a0\u202f]*000\s*₽/));
      await main.getByRole("link", { name: "Все решения", exact: true }).click();
      await page.waitForURL(url => url.pathname.replace(/\/$/, "") === "/services");
      await visible(page.locator("main h1").first());
      await checkLayout("/services");
      await goto("/cases");
      const footerContact = page.locator("footer").getByRole("link", { name: "Контакты", exact: true });
      await visible(footerContact);
      assert.equal(await footerContact.getAttribute("href"), "#contact");
      await footerContact.click();
      await inView("#contact");
      await checkLayout("/cases");
      assert.deepEqual(errors, [], name + ": uncaught JavaScript errors");
      console.log("PASS", name, "homepage, metadata, industries, contact, self-check, services, cases");
    } catch (error) {
      await page.screenshot({ path: "artifacts/site-pr/" + name + "-failure.png", fullPage: true }).catch(() => {});
      throw error;
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
