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
// Element-only evidence excludes fixed site chrome; full-page screenshots above retain it.
const blockStyle="header, button.fixed, [data-floating-home] { visibility: hidden !important; }";
try {
  for(const viewport of [{width:1440,height:900},{width:390,height:844},{width:320,height:568}]){
    const context=await browser.newContext({viewport,isMobile:viewport.width<600,hasTouch:viewport.width<600,deviceScaleFactor:1,reducedMotion:"reduce",serviceWorkers:"block"});
    await context.addInitScript(()=>{localStorage.setItem("cookie_consent",JSON.stringify({version:"v3",savedAt:new Date().toISOString(),consent:{necessary:true,analytics:false}}));localStorage.setItem("self-start-popup-suppressed-until-v1",String(Date.now()+86400000));});
    await context.route("**/*",route=>{const req=route.request();const url=new URL(req.url());return (url.origin===BASE.origin||["fonts.googleapis.com","fonts.gstatic.com"].includes(url.hostname))&&["GET","HEAD"].includes(req.method())?route.continue():route.abort("blockedbyclient");});
    const page=await context.newPage();const errors=[];let fontEvidence;page.on("pageerror",e=>errors.push(e.message));
    for(const path of routes){
      try {
        const response=await page.goto(new URL(path,BASE).href,{waitUntil:"domcontentloaded"});
        assert(response?.ok(),"HTTP "+path);
        await page.locator("main h1").first().waitFor({state:"visible",timeout:20000});
        await page.evaluate(()=>document.fonts.ready);

        // Trigger existing on-scroll animations and lazy assets before recording a full page.
        await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=innerHeight){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,65));}window.scrollTo(0,0);await new Promise(r=>setTimeout(r,300));});
        if(path==="/"){
          // Deferred stylesheet is initially media=print. Wait for actual font-face registration.
          await page.waitForFunction(()=>["Golos Text","Raleway","Iriska"].every(name=>[...document.fonts].some(f=>f.family.replace(/["']/g,"")===name)),null,{timeout:15000}).catch(()=>{});
          fontEvidence=await page.evaluate(async()=>{
            const faces=[];
            for(const name of ["Golos Text","Raleway","Iriska"]){
              try{const loaded=await document.fonts.load(`600 18px "${name}"`,"НейроРешения");faces.push({name,loaded:loaded.some(f=>f.status==="loaded"),count:loaded.length});}
              catch(e){faces.push({name,loaded:false,error:String(e)});}
            }
            const imgs=[...document.querySelectorAll("header img,main img")].filter(x=>/Александра Моисеева|Нейрорешения/i.test(x.alt));
            await Promise.all(imgs.map(x=>x.decode().catch(()=>{})));
            return {faces,images:imgs.map(x=>({alt:x.alt,loaded:x.complete&&x.naturalWidth>0,width:x.naturalWidth})),fontStyles:[...document.querySelectorAll('link[rel="stylesheet"]')].filter(x=>x.href.includes("fonts.googleapis.com")).map(x=>({media:x.media,loaded:!!x.sheet}))};
          });
          report.push({width:viewport.width,path:"brand-assets",status:fontEvidence.faces.every(f=>f.loaded)&&fontEvidence.images.length>0&&fontEvidence.images.every(x=>x.loaded)?"pass":"fail",evidence:fontEvidence});
        }
        if(path==="/"){
          const hero=page.locator("#brand-hero");
          const signature=hero.locator("[data-brand-signature]");
          await signature.waitFor({state:"visible"});
          assert.equal((await signature.innerText()).trim(),"Моисеева");
          const evidence=await hero.evaluate(async el=>{
            const sig=el.querySelector("[data-brand-signature]");
            const title=el.querySelector("h1");
            const panel=el.querySelector("[data-brand-panel]");
            const loaded=await document.fonts.load('400 24px "Iriska"',"Моисеева");
            const rgb=v=>v.match(/[\d.]+/g).slice(0,3).map(Number);
            const lum=v=>rgb(v).map(c=>c/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((sum,c,i)=>sum+c*[.2126,.7152,.0722][i],0);
            const ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
            const bg=getComputedStyle(panel).backgroundColor;
            const text=[...el.querySelectorAll("h1,p,[data-brand-signature],[data-brand-accent]")].map(n=>({text:n.textContent.trim().slice(0,60),ratio:ratio(getComputedStyle(n).color,bg)}));
            const ctas=[...el.querySelectorAll("button,a")].map(n=>({text:n.textContent.trim(),ratio:ratio(getComputedStyle(n).color,getComputedStyle(n).backgroundColor)}));
            const bounds=panel.getBoundingClientRect();
            const fit=[...el.querySelectorAll("h1,p,[data-brand-signature],button,a")].every(n=>{const r=n.getBoundingClientRect();return r.left>=bounds.left-1&&r.right<=bounds.right+1&&n.scrollWidth<=n.clientWidth+1;});
            return {font:getComputedStyle(sig).fontFamily,titleFont:getComputedStyle(title).fontFamily,titleFit:title.scrollWidth<=title.clientWidth+1,accent:getComputedStyle(el.querySelector("[data-brand-accent]")).color,signatureColor:getComputedStyle(sig).color,loaded:loaded.some(f=>f.status==="loaded"),text,ctas,fit};
          });
          assert(evidence.font.includes("Iriska")&&evidence.loaded,"Iriska signature "+JSON.stringify(evidence));
          assert(evidence.titleFont.includes("Golos Text"),"Hero title font");
          assert(evidence.titleFit,"Hero title must fit "+JSON.stringify(evidence));
          assert.equal(evidence.accent,evidence.signatureColor,"Matching original blue accents");
          assert.equal(await page.locator("header img[alt=\"Нейрорешения\"]").first().getAttribute("src")!==null,true);
          assert(evidence.text.every(x=>x.ratio>=7),"Hero text contrast "+JSON.stringify(evidence));
          assert(evidence.ctas.length===3&&evidence.ctas.every(x=>x.ratio>=4.5),"Hero CTA contrast "+JSON.stringify(evidence));
          assert(evidence.fit,"Hero text or CTA overflow "+JSON.stringify(evidence));
          assert.equal(await hero.getByRole("link",{name:"Выбрать решение",exact:true}).getAttribute("href"),"/services");
          await hero.getByRole("button",{name:"Узнать свою задачу",exact:true}).waitFor();
          await hero.getByRole("button",{name:"Обсудить задачу",exact:true}).waitFor();
          await hero.screenshot({path:folder+"/"+viewport.width+"-brand-hero.png",animations:"disabled"});
          await page.screenshot({path:folder+"/"+viewport.width+"-first-screen.png",animations:"disabled"});
          report.push({width:viewport.width,path:"brand-hero",status:"pass",evidence});
        }
        await page.screenshot({path:folder+"/"+viewport.width+"-"+(path==="/"?"home":path.slice(1).replaceAll("/","-"))+".png",fullPage:true,animations:"disabled"});
        const geometry=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
        assert(geometry.width<=geometry.viewport+3,"overflow "+JSON.stringify(geometry));
        await page.waitForFunction(()=>document.querySelectorAll('link[rel="canonical"]').length===1,{},{timeout:10000});
        const canonical=await page.locator('link[rel="canonical"]').getAttribute("href");
        assert.equal(new URL(canonical).pathname.replace(/\/$/,""),path.replace(/\/$/,""),"canonical path "+path);
        assert.equal(await page.locator("main h1").count(),1);
        if(path==="/"){assert.equal(await page.locator("#industry-questions").count(),1);assert.equal(await page.locator("#commercial-directions .nr-dir").count(),4);
          const typography=await page.locator(".nr-home-commerce").evaluate(async el=>{
            const accents=[...el.querySelectorAll("h2 em")];
            const headings=[...el.querySelectorAll("h2,h3")];
            const text=[...el.querySelectorAll(".nr-dir p,.nr-mini-card p:not(.nr-eyebrow)")];
            const faces=await Promise.all([document.fonts.load('400 30px "Iriska"',"вашего бизнеса Один МиниАгент"),document.fonts.load('600 22px "Golos Text"',"Решения для бизнеса"),document.fonts.load('400 16px "Raleway"',"Выберите решение")]);
            return {accents:accents.map(n=>({text:n.textContent,font:getComputedStyle(n).fontFamily,weight:getComputedStyle(n).fontWeight})),headings:headings.map(n=>({text:n.textContent,font:getComputedStyle(n).fontFamily,weight:getComputedStyle(n).fontWeight,wrap:getComputedStyle(n).overflowWrap,fit:n.scrollWidth<=n.clientWidth+1})),text:text.map(n=>({font:getComputedStyle(n).fontFamily,weight:getComputedStyle(n).fontWeight})),fonts:faces.map(f=>f.some(x=>x.status==="loaded"))};
          });
          assert(typography.accents.length===2&&typography.accents.every(x=>x.font.includes("Iriska")&&x.weight==="400"),"Iriska accents "+JSON.stringify(typography));
          assert(typography.headings.every(x=>x.font.includes("Golos Text")&&x.weight==="600"&&x.wrap==="normal"&&x.fit),"Home heading typography "+JSON.stringify(typography));
          assert(typography.text.every(x=>x.font.includes("Raleway")&&x.weight==="400")&&typography.fonts.every(Boolean),"Home body and loaded Cyrillic fonts "+JSON.stringify(typography));
          report.push({width:viewport.width,path:"homepage-typography",status:"pass",evidence:typography});await page.locator("#commercial-directions").screenshot({path:folder+"/"+viewport.width+"-block-home-directions.png",style:blockStyle});await page.locator("#commercial-directions + section").screenshot({path:folder+"/"+viewport.width+"-block-home-mini.png",style:blockStyle});}
        if(path==="/ai-agents"){const formats=page.locator(".nr-agent-formats > a");assert.deepEqual(await formats.evaluateAll(nodes=>nodes.map(x=>x.getAttribute("href"))),["/mini-agents","/ai-agents/hermes","/ai-agents/custom"]);assert.equal(await formats.count(),3);assert.equal(await page.getByRole("heading",{name:"ИИ-агенты для бизнеса",exact:true}).count(),1);await page.locator(".nr-agent-formats").screenshot({path:folder+"/"+viewport.width+"-agent-formats.png",style:blockStyle});}
        if(path==="/expert"){assert.equal(await page.locator("#onsite h2").innerText(),"Выездная консультация");assert.match(await page.locator("#onsite").innerText(),/8\s*000\s*₽/);assert.equal(await page.locator("#dpo").count(),1);}
        if(path==="/about"){const block=page.locator("#company-directions");assert.equal(await block.locator("ul a").count(),4);assert(!/сопровождение цифрового внедрения|стратегия цифрового развития/i.test(await block.innerText()));const contrast=await block.evaluate(el=>{const lum=c=>c.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);const bg=lum(getComputedStyle(el).backgroundColor);return [...el.querySelectorAll("p, h2, ul a")].map(n=>{const fg=lum(getComputedStyle(n).color);return {text:n.textContent.slice(0,70),ratio:(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05)};});});assert(contrast.every(x=>x.ratio>=7),"About commercial block contrast "+JSON.stringify(contrast));await block.screenshot({path:folder+"/"+viewport.width+"-block-about-directions.png",style:blockStyle});}
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
    // The compact navigation must preserve every approved destination on desktop and mobile.
    try {
      await page.goto(new URL("/",BASE).href,{waitUntil:"domcontentloaded"});
      await page.locator("main h1").first().waitFor({state:"visible"});
      const desktop=viewport.width>=1024;
      const nav=page.getByRole("navigation",{name:desktop?"Основное меню":"Мобильное меню",exact:true});
      if(!desktop) await page.getByRole("button",{name:"Toggle menu"}).click();
      const topLabels=await nav.locator(":scope > div > a, :scope > div > button, :scope > a").allTextContents();
      assert.deepEqual(topLabels.map(x=>x.trim()),["С чего начать","Продукты и автоматизация","Экспертная работа","Кейсы","Об Александре"]);
      for(const [label,expected] of [
        ["Продукты и автоматизация",["/services/neurotenderolog","/products/knowledge-management","/ai-agents","/services/automation"]],
        ["Экспертная работа",["/expert#onsite","/services/digital-audit","/services/digital-tools-program","/expert#dpo"]]
      ]){
        const trigger=nav.getByRole(desktop?"link":"button",{name:label,exact:true});
        if(desktop) await trigger.hover(); else await trigger.click();
        const group=trigger.locator("..");
        for(const href of expected) await group.locator('a[href="'+href+'"]').last().waitFor({state:"visible"});
        const links=await group.locator("div a").evaluateAll(nodes=>nodes.map(x=>x.getAttribute("href")));
        assert.deepEqual(links,expected);
        if(!desktop) assert.equal(await trigger.getAttribute("aria-expanded"),"true");
        const dims=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
        assert(dims.width<=dims.viewport+3,"navigation overflow");
        await page.screenshot({path:folder+"/"+viewport.width+"-menu-"+(label==="Продукты и автоматизация"?"solutions":"expert")+".png",animations:"disabled"});
      }
      await nav.getByRole("link",{name:"Корпоративное обучение",exact:true}).click();
      await page.waitForURL(url=>url.pathname.replace(/\/$/,"")==="/services/digital-tools-program");
      if(!desktop) assert.equal(await page.getByRole("button",{name:"Toggle menu"}).getAttribute("aria-expanded"),"false");
      if(!desktop) await page.getByRole("button",{name:"Toggle menu"}).click();
      await page.getByRole("button",{name:"Обсудить задачу",exact:true}).first().waitFor({state:"visible"});
      if(!desktop) await page.getByRole("button",{name:"Toggle menu"}).click();
      report.push({width:viewport.width,path:"compact navigation and approved destinations",status:"pass"});
    }catch(e){report.push({width:viewport.width,path:"compact navigation and approved destinations",status:"fail",message:String(e)});await page.screenshot({path:folder+"/"+viewport.width+"-menu-failure.png"}).catch(()=>{});}
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
      // A successful submit clears the intent and shows confirmation. A same-document navigation to the identical hash URL is not a fresh visit.
      stage="restore context from URL";assert.equal(await page.evaluate(()=>sessionStorage.getItem("aleksamois.contactIntent")),null);
      await page.goto(new URL("/mini-agents/"+catalog.mini[0].slug,BASE).href);
      await page.goto(new URL("/start?offer=mini-01&format=connect&license=plus#contact",BASE).href);
      await page.locator('[data-commercial-intent="mini-01"]').waitFor({timeout:10000});
      await page.reload();await page.locator('[data-commercial-intent="mini-01"]').waitFor({timeout:10000});
      const restored=await page.evaluate(()=>JSON.parse(sessionStorage.getItem("aleksamois.contactIntent")));assert.equal(restored.sourcePath,"/mini-agents/max-files");assert.equal(restored.licensePlan,"plus");
      stage="reset commercial context";await page.getByRole("button",{name:"Обычное обращение",exact:true}).click();await page.waitForURL(url=>!url.searchParams.has("offer"));assert.equal(await page.locator("[data-commercial-intent]").count(),0);
      for(const [route,id] of [["/services/digital-audit","expert-audit"],["/services/digital-solution-design","automation-custom-software"],["/services/digital-tools-program","expert-training"]]){stage="service route "+id;await page.goto(new URL(route,BASE).href);await page.locator('main a[href*="offer='+id+'"]').first().click();await page.waitForURL(url=>url.searchParams.get("offer")===id);await page.locator('[data-commercial-intent="'+id+'"]').waitFor();assert.equal(await page.evaluate(()=>JSON.parse(sessionStorage.getItem("aleksamois.contactIntent")).offerId),id);}
      report.push({width:viewport.width,path:"commercial CTA and form intent",status:"pass"});
    }catch(e){report.push({width:viewport.width,path:"commercial CTA and form intent",status:"fail",stage,message:String(e),payloadReceived:!!payload,visibleErrors:await page.locator("#contact .text-destructive").allTextContents().catch(()=>[])});await page.screenshot({path:folder+"/"+viewport.width+"-form-failure.png",fullPage:true}).catch(()=>{});}
    if(errors.length)report.push({width:viewport.width,path:"runtime errors",status:"fail",message:errors.join("; ")});
    await context.close();
  }
}finally{await browser.close();await writeFile(folder+"/report.json",JSON.stringify(report,null,2));}
const failures=report.filter(x=>x.status==="fail");console.log(JSON.stringify({total:report.length,failures},null,2));assert.equal(failures.length,0,"Commercial architecture browser checks");
