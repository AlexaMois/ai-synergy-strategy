import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
const BASE=new URL(process.env.TEST_BASE_URL || "http://127.0.0.1:4173");
assert(["localhost","127.0.0.1"].includes(BASE.hostname));
const catalog=JSON.parse(await readFile(new URL("../src/data/commercialCatalog.json",import.meta.url),"utf8"));
assert.deepEqual(catalog.mini.map(x=>x.price),[35000,50000,25000,45000,40000,65000,65000,75000,45000,40000,60000,95000,145000,45000,95000]);
assert.deepEqual(catalog.licenses.map(x=>x.price),[990,1490,3990]);
assert.deepEqual(catalog.hermes.map(x=>x.price),[36000,126000]);
const folder="artifacts/site-pr/product-architecture";
await mkdir(folder,{recursive:true});
const browser=await chromium.launch({headless:true});
const report=[];
const routes=["/","/services","/products","/services/neurotenderolog","/products/knowledge-management","/mini-agents","/ai-agents","/ai-agents/hermes","/ai-agents/custom","/services/automation","/expert","/pricing","/start","/faq","/services/digital-audit","/services/digital-tools-program",...catalog.mini.map(x=>"/mini-agents/"+x.slug)];
const digits=s=>s.replace(/[^0-9]/g,"");
try {
  for(const viewport of [{width:1440,height:900},{width:390,height:844},{width:320,height:568}]){
    const context=await browser.newContext({viewport,reducedMotion:"reduce",serviceWorkers:"block"});
    await context.addInitScript(()=>{localStorage.setItem("cookie_consent",JSON.stringify({version:"v3",savedAt:new Date().toISOString(),consent:{necessary:true,analytics:false}}));localStorage.setItem("self-start-popup-suppressed-until-v1",String(Date.now()+86400000));});
    await context.route("**/*",route=>{const req=route.request();return new URL(req.url()).origin===BASE.origin&&["GET","HEAD"].includes(req.method())?route.continue():route.abort("blockedbyclient");});
    const page=await context.newPage();const errors=[];page.on("pageerror",e=>errors.push(e.message));
    for(const path of routes){
      try {
        const response=await page.goto(new URL(path,BASE).href,{waitUntil:"domcontentloaded"});
        assert(response?.ok(),"HTTP "+path);
        await page.locator("main h1").first().waitFor({state:"visible",timeout:20000});
        await page.evaluate(()=>document.fonts.ready);
        await page.screenshot({path:folder+"/"+viewport.width+"-"+(path==="/"?"home":path.slice(1).replaceAll("/","-"))+".png",fullPage:true,animations:"disabled"});
        const geometry=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
        assert(geometry.width<=geometry.viewport+3,"overflow "+JSON.stringify(geometry));
        assert.equal(await page.locator('link[rel="canonical"]').count(),1);
        assert.equal(await page.locator("main h1").count(),1);
        if(path==="/"){assert.equal(await page.locator("#industry-questions").count(),1);assert.equal(await page.locator("#commercial-directions .nr-dir").count(),5);}
        if(path==="/mini-agents"){
          assert.equal(await page.locator("#catalog .nr-mini-card").count(),15);
          for(const item of catalog.mini){const card=page.locator('#catalog a[href="/mini-agents/'+item.slug+'"]');assert.equal(await card.count(),1);assert(digits(await card.locator(".nr-card-bottom").innerText()).includes(String(item.price)));}
          await page.locator(".nr-filters button").filter({hasText:catalog.mini[0].group}).click();assert.equal(await page.locator("#catalog .nr-mini-card").count(),catalog.mini.filter(x=>x.group===catalog.mini[0].group).length);
          await page.getByRole("button",{name:"Все",exact:true}).click();assert.equal(await page.locator("#catalog .nr-mini-card").count(),15);
        }
        const item=catalog.mini.find(x=>path==="/mini-agents/"+x.slug);
        if(item){assert(digits(await page.locator(".nr-hero .nr-price").innerText()).includes(String(item.price)));
          if(item.license==="standard"){for(const license of catalog.licenses){await page.locator('input[name="license"][value="'+license.id+'"]').check();assert.equal(await page.locator("[data-year-total]").getAttribute("data-year-total"),String(item.price+12*license.price));}
            const link=page.locator("main a.nr-cta").first();assert((await link.getAttribute("href")).includes("license=managed"));
          }else assert.equal(await page.locator("[data-year-total]").count(),0);
        }
        report.push({width:viewport.width,path,status:"pass"});
      }catch(e){report.push({width:viewport.width,path,status:"fail",message:String(e)});}
    }
    try{
      await page.goto(new URL("/mini-agents/"+catalog.mini[0].slug,BASE).href);
      await page.locator('input[name="license"][value="plus"]').check();
      await page.locator("main a.nr-cta").first().click();
      await page.waitForURL(/offer=mini-01/);
      await page.locator("#contact form").waitFor();
      await page.waitForFunction(()=>JSON.parse(sessionStorage.getItem("aleksamois.contactIntent")||"null")?.licensePlan==="plus");
      const intent=await page.evaluate(()=>JSON.parse(sessionStorage.getItem("aleksamois.contactIntent")));
      assert.equal(intent.offerId,"mini-01");assert.equal(intent.sourcePath,"/mini-agents/"+catalog.mini[0].slug);
      report.push({width:viewport.width,path:"commercial CTA and form intent",status:"pass"});
    }catch(e){report.push({width:viewport.width,path:"commercial CTA and form intent",status:"fail",message:String(e)});}
    if(errors.length)report.push({width:viewport.width,path:"runtime errors",status:"fail",message:errors.join("; ")});
    await context.close();
  }
}finally{await browser.close();await writeFile(folder+"/report.json",JSON.stringify(report,null,2));}
const failures=report.filter(x=>x.status==="fail");console.log(JSON.stringify({total:report.length,failures},null,2));assert.equal(failures.length,0,"Commercial architecture browser checks");
