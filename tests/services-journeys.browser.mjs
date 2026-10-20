import assert from "node:assert/strict";
import { chromium } from "playwright";

const BASE = process.env.TEST_BASE_URL || "http://127.0.0.1:8080";
const paths = [
  "/services",
  "/services/automation",
  "/services/neurotenderolog",
  "/services/owner-digital-session",
  "/services/digital-development-strategy",
  "/services/digital-audit",
  "/services/digital-solution-design",
  "/services/implementation-support",
  "/services/digital-tools-support",
  "/services/digital-tools-program",
  "/services/avtomatizaciya-biznes-processov/",
  "/services/cifrovizaciya-biznesa/",
  "/services/vnedrenie-ii-v-biznes/",
];
const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of [{width:1440,height:900},{width:390,height:844}]) {
    const context = await browser.newContext({viewport, reducedMotion:"reduce"});
    await context.addInitScript(() => {
      localStorage.setItem("cookie_consent", JSON.stringify({
        version:"v3",savedAt:new Date().toISOString(),consent:{necessary:true,analytics:false}
      }));
    });
    const page=await context.newPage();
    const errors=[];
    page.on("pageerror", e=>errors.push(e.message));
    for(const route of paths) {
      await page.goto(BASE+route);
      const h1=page.locator("main h1");
      await h1.waitFor({state:"visible",timeout:20000});
      assert((await h1.innerText()).trim().length>15, "h1 is meaningful "+route);
      assert((await page.locator('link[rel="canonical"]').count())>=1,"canonical present "+route);
      assert.equal(await page.getByText("404", {exact:true}).count(),0,"route exists "+route);
      const scroll=await page.evaluate(()=>({content:document.documentElement.scrollWidth,viewport:innerWidth}));
      assert(scroll.content<=scroll.viewport+3, "horizontal page overflow on "+route+": "+JSON.stringify(scroll));
      assert.equal(errors.length,0,"uncaught JavaScript errors on "+route+": "+errors.join("; "));
      console.log("PASS",viewport.width,route,(await h1.innerText()).slice(0,56));
    }
    await page.goto(BASE+"/services");
    await page.getByRole("heading",{name:"Четыре маршрута для бизнеса"}).waitFor();
    const routeLinks = [
      "/services/automation",
      "/services/owner-digital-session",
      "/services/digital-tools-program",
      "/services/neurotenderolog",
    ];
    for(const target of routeLinks){
      assert(await page.locator('a[href="'+target+'"]').count()>0,"journey link "+target);
    }
    assert.equal(await page.locator("a[href^='/services/'][href$='-session']").count()>=1,true);
    if (viewport.width===390) await page.screenshot({path:"services-mobile.png",fullPage:true});
    await context.close();
  }
  console.log("PASS all service routes and four client journeys");
} finally {
  await browser.close();
}
