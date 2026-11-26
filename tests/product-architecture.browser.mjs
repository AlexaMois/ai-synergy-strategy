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
const routes=["/","/services","/products","/services/neurotenderolog","/products/knowledge-management","/mini-agents","/ai-agents","/ai-agents/hermes","/ai-agents/custom","/services/automation","/expert","/pricing","/start","/faq","/services/digital-audit","/services/digital-tools-program","/about",...catalog.mini.map(x=>"/mini-agents/"+x.slug)];
const digits=s=>s.replace(/[^0-9]/g,"");
try {
  for(const viewport of [{width:1440,height:900},{width:390,height:844},{width:320,height:568}]){
    const context=await browser.newContext({viewport,reducedMotion:"reduce",serviceWorkers:"block"});
    await context.addInitScript(()=>{localStorage.setItem("cookie_consent",JSON.stringify({version:"v3",savedAt:new Date().toISOString(),consent:{necessary:true,analytics:false}}));localStorage.setItem("self-start-popup-suppressed-until-v1",String(Date.now()+86400000));});
    await context.route("**/*",route=>{const req=route.request();const url=new URL(req.url());return (url.origin===BASE.origin||["fonts.googleapis.com","fonts.gstatic.com"].includes(url.hostname))&&["GET","HEAD"].includes(req.method())?route.continue():route.abort("blockedbyclient");});
    const page=await context.newPage();const errors=[];let fontEvidence;page.on("pageerror",e=>errors.push(e.message));
    for(const path of routes){
      try {
        const response=await page.goto(new URL(path,BASE).href,{waitUntil:"domcontentloaded"});
        assert(response?.ok(),"HTTP "+path);
        await page.locator("main h1").first().waitFor({state:"visible",timeout:20000});
        await page.evaluate(()=>document.fonts.ready);
        if(path==="/"){fontEvidence=await page.evaluate(async()=>{const faces=[];for(const name of ["Golos Text","Raleway","Iriska"]){try{const loaded=await document.fonts.load(`600 18px "${name}"`,"НейроРешения");faces.push({name,loaded:loaded.some(f=>f.status==="loaded"),count:loaded.length});}catch(e){faces.push({name,loaded:false,error:String(e)});}}const imgs=[...document.querySelectorAll("header img,main img")].filter(x=>/Александра Моисеева|Нейрорешения/i.test(x.alt));return {faces,images:imgs.map(x=>({alt:x.alt,loaded:x.complete&&x.naturalWidth>0,width:x.naturalWidth}))};});report.push({width:viewport.width,path:"brand-assets",status:fontEvidence.faces.every(f=>f.loaded)&&fontEvidence.images.length>0&&fontEvidence.images.every(x=>x.loaded)?"pass":"fail",evidence:fontEvidence});}

        // Trigger existing on-scroll animations and lazy assets before recording a full page.
        await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=innerHeight){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,65));}window.scrollTo(0,0);await new Promise(r=>setTimeout(r,300));});
        await page.screenshot({path:folder+"/"+viewport.width+"-"+(path==="/"?"home":path.slice(1).replaceAll("/","-"))+".png",fullPage:true,animations:"disabled"});
        const geometry=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
        assert(geometry.width<=geometry.viewport+3,"overflow "+JSON.stringify(geometry));
        await page.waitForFunction(()=>document.querySelectorAll('link[rel="canonical"]').length===1,{},{timeout:10000});
        const canonical=await page.locator('link[rel="canonical"]').getAttribute("href");
        assert.equal(new URL(canonical).pathname.replace(/\/$/,""),path.replace(/\/$/,""),"canonical path "+path);
        assert.equal(await page.locator("main h1").count(),1);
        if(path==="/"){assert.equal(await page.locator("#industry-questions").count(),1);assert.equal(await page.locator("#commercial-directions .nr-dir").count(),5);await page.locator("#commercial-directions").screenshot({path:folder+"/"+viewport.width+"-block-home-directions.png"});await page.locator("#commercial-directions + section").screenshot({path:folder+"/"+viewport.width+"-block-home-mini.png"});}
        if(path==="/about"){const block=page.locator("#company-directions");assert.equal(await block.locator("ul a").count(),5);assert(!/сопровождение цифрового внедрения|стратегия цифрового развития/i.test(await block.innerText()));await block.screenshot({path:folder+"/"+viewport.width+"-block-about-directions.png"});}
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
    let stage="open product";let payload;
    try{
      await page.goto(new URL("/mini-agents/"+catalog.mini[0].slug,BASE).href);
      await page.locator('input[name="license"][value="plus"]').check();
      stage="select license and navigate";await page.locator("main a.nr-cta").first().click();
      await page.waitForURL(/offer=mini-01/);
      await page.locator("#contact form").waitFor();
      stage="wait for selected context";await page.waitForFunction(()=>JSON.parse(sessionStorage.getItem("aleksamois.contactIntent")||"null")?.licensePlan==="plus",null,{timeout:10000});
      await page.locator('[data-commercial-intent="mini-01"]').waitFor();
      const intent=await page.evaluate(()=>JSON.parse(sessionStorage.getItem("aleksamois.contactIntent")));
      assert.equal(intent.offerId,"mini-01");assert.equal(intent.sourcePath,"/mini-agents/"+catalog.mini[0].slug);
      stage="register mocked server";
      await context.route("https://forms.ci.invalid/short-lead",async route=>{
        const headers={"access-control-allow-origin":"*","access-control-allow-methods":"POST, OPTIONS","access-control-allow-headers":"content-type"};
        if(route.request().method()==="OPTIONS")return route.fulfill({status:204,headers});
        payload=route.request().postDataJSON();
        return route.fulfill({status:200,headers,contentType:"application/json",body:JSON.stringify({ok:true,recordId:"ci-test-only"})});
      });
      const form=page.locator("#contact form");
      await form.locator("#name").fill("CI Test");
      await form.locator("#phone").fill("+7 (999) 000-00-00");
      await form.locator("#comment").fill("Синтетическая проверка заявки, без отправки в CRM");
      stage="confirm form inputs";assert.equal(await form.locator("#phone").inputValue(),"+7 (999) 000-00-00");
      await form.locator("#consent").scrollIntoViewIfNeeded();await form.locator("#consent").click();assert.equal(await form.locator("#consent").getAttribute("aria-checked"),"true");
      const submit=form.locator('button[type="submit"]');await submit.evaluate(el=>el.scrollIntoView({block:"center",behavior:"instant"}));
      stage="submit and receive mocked response";const received=page.waitForResponse(r=>r.url()==="https://forms.ci.invalid/short-lead"&&r.request().method()==="POST",{timeout:10000});await submit.click();await received;
      stage="verify confirmation";await page.waitForFunction(()=>document.querySelector("#contact")?.textContent.includes("Спасибо"),null,{timeout:10000});
      assert.equal(payload?.offerId,"mini-01");assert.equal(payload?.licensePlan,"plus");assert.equal(payload?.format,"connect");assert.equal(payload?.sourcePath,"/mini-agents/"+catalog.mini[0].slug);
      assert(payload.task.includes("mini-01"));
      report.push({width:viewport.width,path:"commercial CTA and form intent",status:"pass"});
    }catch(e){report.push({width:viewport.width,path:"commercial CTA and form intent",status:"fail",stage,message:String(e),payloadReceived:!!payload,visibleErrors:await page.locator("#contact .text-destructive").allTextContents().catch(()=>[])});await page.screenshot({path:folder+"/"+viewport.width+"-form-failure.png",fullPage:true}).catch(()=>{});}
    if(errors.length)report.push({width:viewport.width,path:"runtime errors",status:"fail",message:errors.join("; ")});
    await context.close();
  }
}finally{await browser.close();await writeFile(folder+"/report.json",JSON.stringify(report,null,2));}
const failures=report.filter(x=>x.status==="fail");console.log(JSON.stringify({total:report.length,failures},null,2));assert.equal(failures.length,0,"Commercial architecture browser checks");
