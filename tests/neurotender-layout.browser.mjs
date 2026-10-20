import assert from "node:assert/strict";
import { chromium } from "playwright";
const BASE = process.env.TEST_BASE_URL || "http://127.0.0.1:8080";
const browser = await chromium.launch({headless:true});
try {
  for (const viewport of [{width:1440,height:900},{width:390,height:844},{width:320,height:568}]) {
    const context=await browser.newContext({viewport,reducedMotion:"reduce"});
    await context.addInitScript(()=>{
      localStorage.setItem("cookie_consent", JSON.stringify({
        version:"v3",savedAt:new Date().toISOString(),consent:{necessary:true,analytics:false}
      }));
    });
    const page=await context.newPage();
    const errors=[];
    page.on("pageerror",error=>errors.push(error.message));
    await page.goto(BASE+"/cases/neurotenderolog");
    const section=page.locator("section[aria-labelledby='tender-evidence']");
    await section.waitFor({state:"visible"});
    const rows=section.locator("article");
    assert.equal(await rows.count(),3);
    const images=section.getByRole("button",{name:/Увеличить изображение/});
    assert.equal(await images.count(),3);
    for(let i=0;i<3;i++){
      const row=rows.nth(i), figure=row.locator("figure");
      const img=figure.locator("img");
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(el => el.decode());
      assert(await img.evaluate(el=>el.complete&&el.naturalWidth>0),"image loaded");
      if(viewport.width>=1024){
        const t=await row.locator("h3").boundingBox(), p=await figure.boundingBox();
        assert(t&&p&&t.x<t.x+t.width&&p.x>t.x,"copy left of image");
      }
      const href=page.url();
      await images.nth(i).click();
      const dialog=page.locator("dialog[open]");
      await dialog.waitFor({state:"visible"});
      assert.equal(page.url(),href);
      assert(await dialog.getByRole("button",{name:"Закрыть просмотр"}).isVisible());
      await page.keyboard.press("Escape");
      await dialog.waitFor({state:"hidden"});
      assert.equal(page.url(),href);
    }
    assert.equal(errors.length,0,"console errors");
    const evidenceOverflow=await section.evaluate(el => {
      const width=el.clientWidth;
      return [...el.querySelectorAll("article, figure, img")].some(child => child.getBoundingClientRect().width > window.innerWidth + 2);
    });
    assert.equal(evidenceOverflow,false,"evidence area fits viewport");
    console.log("PASS tender layout "+viewport.width+"x"+viewport.height);
    await context.close();
  }
}finally{await browser.close();}
