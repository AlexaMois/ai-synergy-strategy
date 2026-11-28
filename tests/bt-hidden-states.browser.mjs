import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";
const base = new URL(process.env.TEST_BASE_URL || "http://127.0.0.1:4173");
assert(["localhost","127.0.0.1"].includes(base.hostname));
const parseRoutes = xml => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>new URL(x[1]).pathname);
const committed = parseRoutes(execFileSync("git",["show","HEAD:public/sitemap.xml"],{encoding:"utf8"}));
const generated = parseRoutes(await readFile(new URL("../dist/sitemap.xml",import.meta.url),"utf8"));
const indexed = [...new Set(generated)];
assert.equal(indexed.length,generated.length,"generated sitemap must have unique URLs");
const normalize = route => route.replace(/\/+$/,"") || "/";
const normalized = new Set(indexed.map(normalize));
assert(indexed.length>=64,"all 63 audited URLs and the tender service must be covered");
for(const route of [...committed,"/services/neurotenderolog"]) assert(normalized.has(normalize(route)),"missing from generated sitemap: "+route);
const routes = indexed;
const catalog=JSON.parse(await readFile(new URL("../src/data/commercialCatalog.json",import.meta.url),"utf8"));
const folder="artifacts/site-pr/bt-hidden-states";
await mkdir(folder,{recursive:true});
const browser=await chromium.launch();
const report=[], failures=[];
const sizes=[{width:1440,height:900},{width:1024,height:768},{width:768,height:1024},{width:390,height:844},{width:320,height:568}];
const visit=async(page,path)=>{const response=await page.goto(new URL(path,base).href,{waitUntil:"domcontentloaded"});assert(response?.ok(),path+" HTTP");await page.locator("h1").first().waitFor({state:"visible",timeout:15000});};
const screenshot=async(page,name,width)=>page.screenshot({path:folder+"/"+name+"-"+width+".png",animations:"disabled"});
const assertDialog=async(dialog,width)=>{
 await dialog.waitFor({state:"visible"});
 const evidence=await dialog.evaluate(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return {x:r.x,y:r.y,w:r.width,h:r.height,viewport:innerHeight,background:s.backgroundColor,font:s.fontFamily,scroll:el.scrollWidth-el.clientWidth}});
 assert(evidence.x>=-2&&evidence.x+evidence.w<=width+2,JSON.stringify(evidence));
 assert(evidence.h<=evidence.viewport+2,JSON.stringify(evidence));
 assert(evidence.scroll<=2,JSON.stringify(evidence));
 assert(evidence.font.includes("Raleway"),JSON.stringify(evidence));
 return evidence;
};
const assertCTA=async(locator,primary=true)=>{
 const s=await locator.evaluate(el=>({bg:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color,height:el.getBoundingClientRect().height}));
 assert.equal(s.bg,primary?"rgb(33, 33, 33)":"rgb(217, 217, 217)");
 assert.equal(s.color,primary?"rgb(255, 255, 255)":"rgb(33, 33, 33)");
 assert(s.height>=47,JSON.stringify(s));
};
const closeInside=async(dialog,close)=>{const a=await dialog.boundingBox(),b=await close.boundingBox();assert(a&&b&&b.x>=a.x-1&&b.y>=a.y-1&&b.x+b.width<=a.x+a.width+1&&b.y+b.height<=a.y+a.height+1,"close button inside modal");};
const record=async(width,name,page,action)=>{try{await action();report.push({width,state:name,status:"pass"});}catch(error){failures.push({width,state:name,error:String(error)});await screenshot(page,name+"-failure",width).catch(()=>{});}};
try{
 for(const viewport of sizes){
  const {width}=viewport;
  const context=await browser.newContext({viewport,reducedMotion:"reduce",serviceWorkers:"block"});
  let mockSuccess=false;
  await context.route("**/*",route=>{const req=route.request();if(!["GET","HEAD"].includes(req.method()))return route.abort("blockedbyclient");return route.continue()});
  await context.route("https://forms.ci.invalid/short-lead",route=>{
   const headers={"access-control-allow-origin":"*","access-control-allow-methods":"POST, OPTIONS","access-control-allow-headers":"content-type"};
   if(route.request().method()==="OPTIONS")return route.fulfill({status:204,headers});
   assert.equal(route.request().method(),"POST");
   return route.fulfill({status:mockSuccess?200:400,headers,contentType:"application/json",body:JSON.stringify(mockSuccess?{ok:true,recordId:"ci-only"}:{ok:false,error:"Тестовая ошибка отправки"})});
  });
  const page=await context.newPage();
  try{
   await record(width,"cookies",page,async()=>{
    await visit(page,"/");
    const cookies=page.locator(".bt-cookie-dialog");
    await assertDialog(cookies,width);
    await assertCTA(cookies.getByRole("button",{name:"Разрешить аналитику"}));
    await assertCTA(cookies.getByRole("button",{name:"Продолжить без аналитики"}),false);
    for(let i=0;i<6;i++){await page.keyboard.press("Tab");assert(await cookies.evaluate(el=>el.contains(document.activeElement)),"cookie focus contained");}
    await screenshot(page,"cookies",width);
    await cookies.getByRole("button",{name:"Продолжить без аналитики"}).click();
    await cookies.waitFor({state:"hidden"});
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem("cookie_consent")).consent.analytics),false);
   });
   // Isolate the following scenarios even if the cookie test found a defect.
   await page.evaluate(()=>{localStorage.setItem("cookie_consent",JSON.stringify({version:"v3",savedAt:new Date().toISOString(),consent:{necessary:true,analytics:false}}));localStorage.setItem("self-start-popup-suppressed-until-v1",String(Date.now()+86400000));});
   await record(width,"callback",page,async()=>{
    await visit(page,"/");
    await page.evaluate(()=>window.dispatchEvent(new CustomEvent("openCallbackModal",{detail:{variant:"callback"}})));
    const callback=page.locator(".bt-callback-dialog");
    await assertDialog(callback,width);
    await callback.locator("#cb-name").fill("CI Test");
    await callback.locator("#cb-phone").fill("+7 (999) 000-00-00");
    if(width<=390){await page.setViewportSize({width,height:360});await assertDialog(callback,width);await screenshot(page,"callback-reduced-viewport",width);await page.setViewportSize(viewport);}
    await callback.locator("#cb-consent").click();
    await assertCTA(callback.locator("button[type=submit]"));
    await screenshot(page,"callback",width);
    mockSuccess=false;
    await callback.locator("button[type=submit]").click();
    const error=page.locator("[data-sonner-toast]").filter({hasText:"Тестовая ошибка отправки"}).first();
    await error.waitFor({state:"visible"});
    assert.equal(await error.evaluate(el=>getComputedStyle(el).backgroundColor),"rgb(255, 255, 255)");
    await screenshot(page,"notification-error",width);
    mockSuccess=true;
    await callback.locator("button[type=submit]").click();
    await callback.getByText("Спасибо. Заявка отправлена").waitFor({state:"visible"});
    await screenshot(page,"callback-success",width);
    await page.keyboard.press("Escape");await callback.waitFor({state:"hidden"});
    assert(await page.evaluate(()=>document.body.style.overflow!=="hidden"),"callback scroll restored");
   });
   await record(width,"exit",page,async()=>{
    await visit(page,"/cases?popup_preview=1");
    const popup=page.locator(".bt-exit-dialog");
    await assertDialog(popup,width);
    const accent=await popup.locator("h2 span").first().evaluate(el=>({font:getComputedStyle(el).fontFamily,style:getComputedStyle(el).fontStyle,color:getComputedStyle(el).color}));
    assert(accent.font.includes("Georgia")&&accent.style==="italic"&&accent.color==="rgb(33, 33, 33)",JSON.stringify(accent));
    await assertCTA(popup.getByRole("button",{name:/Проверить процесс/}));
    await closeInside(popup,popup.getByRole("button",{name:"Закрыть приглашение"}));
    await page.evaluate(()=>window.dispatchEvent(new CustomEvent("openCallbackModal",{detail:{variant:"callback"}})));
    assert.equal(await page.locator(".bt-callback-dialog").count(),0,"callback must not overlap exit");
    await screenshot(page,"exit",width);
    await popup.getByRole("button",{name:"Продолжить просмотр"}).click();await popup.waitFor({state:"hidden"});
   });
   for(const path of routes){
    await record(width,path,page,async()=>{
     await visit(page,path);
     const evidence=await page.evaluate(()=>{const h=document.querySelector("h1"),style=h?getComputedStyle(h):null;return {title:document.title,h1:h?.textContent?.trim(),font:style?.fontFamily,color:style?.color,viewport:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth}});
     assert(evidence.h1&&!/^404\b/.test(evidence.title),path+" route");
     report.push({width,path,...evidence});
     assert(evidence.overflow<=2,path+" horizontal overflow "+JSON.stringify(evidence));
     const item=catalog.mini.find(x=>path==="/mini-agents/"+x.slug);
     if(item?.license==="standard"){
      const radios=page.locator(".nr-license input[type=radio]");assert.equal(await radios.count(),3);
      for(let i=0;i<3;i++){
       await radios.nth(i).check();const selected=page.locator(".nr-license.nr-selected");
       assert.equal(await selected.count(),1);
       const color=await selected.evaluate(el=>getComputedStyle(el).backgroundColor);
       assert(["rgb(242, 242, 242)","rgb(52, 57, 59)","rgb(217, 217, 217)"].includes(color),item.slug+" "+color);
       if(item.id==="mini-01")await screenshot(page,"license-"+i,width);
      }
     }
    });
   }
   await record(width,"bt-sketch-three-blocks",page,async()=>{
    for(const [path,selector,name,count] of [["/","#commercial-directions","home-sketches",4],["/expert",".nr-hero","expert-sketch",1],["/services/digital-audit","[data-bt-audit-hero]","audit-sketch",1]]){
     await visit(page,path);
     const block=page.locator(selector).first();await block.waitFor({state:"visible"});
     const art=block.locator("img[data-bt-sketch]");assert.equal(await art.count(),count,name+" artwork count");
     for(const node of await art.all()){
      await node.evaluate(img=>img.decode());
      const evidence=await node.evaluate(img=>{const r=img.getBoundingClientRect();return {loaded:img.complete&&img.naturalWidth>0,w:r.width,h:r.height,fit:getComputedStyle(img).objectFit};});
      assert(evidence.loaded&&evidence.w>0&&evidence.h>0&&evidence.fit==="contain",name+" "+JSON.stringify(evidence));
     }
     if(path==="/"){
      assert.deepEqual(await art.evaluateAll(nodes=>nodes.map(n=>n.getAttribute("data-bt-sketch"))),["automation","products","agents","audit"]);
      const geometry=await block.evaluate(el=>{const cards=[...el.querySelectorAll(".nr-dir")].map(n=>{const r=n.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right};});return {height:el.getBoundingClientRect().height,cards};});
      if(width>=1024){const [a,b,c,d]=geometry.cards;assert(geometry.height<=650,"one-screen home artwork "+JSON.stringify(geometry));assert(Math.abs(a.top-b.top)<3&&Math.abs(a.bottom-c.bottom)<3&&c.top>b.top&&Math.abs(b.left-c.left)<3&&d.top>=a.bottom,"approved card geometry");}
     }
     if(path==="/expert"){
      const surface=await art.first().evaluate(el=>{const s=getComputedStyle(el);return {background:s.backgroundColor,image:s.backgroundImage,shadow:s.boxShadow,radius:s.borderRadius,padding:s.padding};});
      assert.equal(surface.background,"rgba(0, 0, 0, 0)");assert.equal(surface.image,"none");assert.equal(surface.shadow,"none");assert.equal(surface.radius,"0px");assert.equal(surface.padding,"0px");
     }
     if(path.includes("digital-audit")){assert(await block.evaluate(el=>getComputedStyle(el).backgroundImage!=="none"),"steel surface retained");assert.equal(await block.getByRole("link").count(),2);}
     await block.screenshot({path:folder+"/"+name+"-"+width+".png",animations:"disabled",style:"[data-site-header], [data-floating-home], button.fixed {visibility:hidden!important}"});
    }
   });
   await record(width,"catalog-filters",page,async()=>{
    await visit(page,"/mini-agents");const filters=page.locator(".nr-filters button");
    assert(await filters.count()>1);
    for(let i=0;i<await filters.count();i++){
     await filters.nth(i).click();const cards=page.locator(".nr-mini-grid .nr-mini-card");
     assert(await cards.count()>0);
     for(const card of await cards.all())assert.equal(await card.evaluate(el=>getComputedStyle(el).backgroundColor),"rgb(255, 255, 255)");
     assert.equal(await filters.nth(i).evaluate(el=>getComputedStyle(el).backgroundColor),"rgb(33, 33, 33)");
     await screenshot(page,"catalog-filter-"+i,width);
    }
   });
   await record(width,"diploma-photo",page,async()=>{
    await visit(page,"/about");
    const credential=page.locator("button.bt-credential").first();await credential.click();
    const diploma=page.locator(".bt-credential-dialog");await assertDialog(diploma,width);await closeInside(diploma,diploma.getByRole("button",{name:"Закрыть"}));
    await screenshot(page,"diploma",width);await page.keyboard.press("Escape");await diploma.waitFor({state:"hidden"});
    const opener=page.locator("[data-bt-gallery-trigger]").first();await opener.click();
    const photo=page.locator(".bt-photo-dialog");await assertDialog(photo,width);await closeInside(photo,photo.getByRole("button",{name:"Закрыть"}));
    await screenshot(page,"photo",width);await page.keyboard.press("Escape");await photo.waitFor({state:"hidden"});
    assert(await opener.evaluate(el=>el===document.activeElement),"gallery focus restored");
   });
   await record(width,"reviews",page,async()=>{
    await visit(page,"/");const trigger=page.locator("[data-bt-review-trigger]").first();await trigger.focus();await page.keyboard.press("Enter");
    const review=page.locator(".bt-review-dialog");await assertDialog(review,width);await closeInside(review,review.getByRole("button",{name:"Закрыть"}));
    await screenshot(page,"review",width);await page.keyboard.press("Escape");await review.waitFor({state:"hidden"});
   });
   await record(width,"tender-viewer",page,async()=>{
    await visit(page,"/cases/neurotenderolog");await page.getByRole("button",{name:/Увеличить изображение:/}).first().click();
    const viewer=page.locator("dialog.bt-tender-viewer");await assertDialog(viewer,width);await closeInside(viewer,viewer.getByRole("button",{name:"Закрыть просмотр"}));
    await screenshot(page,"tender-viewer",width);await viewer.getByRole("button",{name:"Увеличить изображение в два раза"}).click();
    await screenshot(page,"tender-zoom",width);await page.keyboard.press("Escape");await viewer.waitFor({state:"hidden"});
   });
   await record(width,"blog-viewer",page,async()=>{
    let opener;
    for(const path of indexed.filter(p=>p.startsWith("/materials/blog/"))){await visit(page,path);const candidate=page.locator("[data-bt-gallery-trigger]").first();if(await candidate.count()){opener=candidate;break;}}
    assert(opener,"at least one published article has a gallery");await opener.click();
    const viewer=page.locator(".bt-photo-dialog");await assertDialog(viewer,width);await closeInside(viewer,viewer.getByRole("button",{name:"Закрыть"}));
    await screenshot(page,"blog-viewer",width);await page.keyboard.press("Escape");await viewer.waitFor({state:"hidden"});
   });
   if(width<1024)await record(width,"mobile-menu",page,async()=>{
    await visit(page,"/start");const toggle=page.getByRole("button",{name:"Toggle menu"});await toggle.click();
    const drawer=page.locator("#mobile-navigation");await page.waitForFunction(()=>document.querySelector("#mobile-navigation")?.getAttribute("data-bt-menu-open")==="true");await drawer.waitFor({state:"visible"});assert.equal(await drawer.getAttribute("data-bt-menu-open"),"true");
    const active=drawer.getByRole("link",{name:"С чего начать"});assert.equal(await active.evaluate(el=>getComputedStyle(el).backgroundColor),"rgb(33, 33, 33)");
    await page.evaluate(()=>window.dispatchEvent(new CustomEvent("openCallbackModal",{detail:{variant:"callback"}})));
    assert.equal(await page.locator(".bt-callback-dialog").count(),0,"callback must not overlap menu");
    await screenshot(page,"menu",width);await page.keyboard.press("Escape");await page.waitForFunction(()=>document.querySelector("#mobile-navigation")?.getAttribute("data-bt-menu-open")==="false");assert.equal(await drawer.getAttribute("data-bt-menu-open"),"false");
   });
  }finally{await context.close();}
 }
}finally{await writeFile(folder+"/report.json",JSON.stringify({indexed: indexed.length,routes:routes.length,viewports:sizes,report,failures},null,2));await browser.close();}
assert.equal(failures.length,0,JSON.stringify(failures,null,2));
console.log("BT hidden-state checks: "+indexed.length+" generated sitemap URLs × "+sizes.length+" viewports; overlays, filters, licenses and mocked forms.");
