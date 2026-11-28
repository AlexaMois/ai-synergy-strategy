import assert from "node:assert/strict";
import { chromium } from "playwright";

const BASE = process.env.TEST_BASE_URL || "http://127.0.0.1:8080";
const paths = [
  "/services",
  "/start",
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
  for (const viewport of [{width:1440,height:900},{width:390,height:844},{width:320,height:568}]) {
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
      assert((await h1.innerText()).trim().length>3, "h1 is meaningful "+route);
      assert((await page.locator('link[rel="canonical"]').count())>=1,"canonical present "+route);
      assert.equal(await page.getByText("404", {exact:true}).count(),0,"route exists "+route);
      const scroll=await page.evaluate(()=>({content:document.documentElement.scrollWidth,viewport:innerWidth}));
      assert(scroll.content<=scroll.viewport+3, "horizontal page overflow on "+route+": "+JSON.stringify(scroll));
      // Brand palette regression: legacy surfaces must resolve to neutral graphite/silver.
      const palette = await page.evaluate(() => {
        const names = ["--soft-sand", "--surface-sand", "--surface-lavender", "--surface-blush"];
        const lum = rgb => rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
        const graphite = lum([33,33,33]);
        return names.map(name=>{
          const el=document.createElement("div");
          el.style.backgroundColor="hsl(var("+name+"))";
          (document.querySelector("main") || document.body).append(el);
          const color=getComputedStyle(el).backgroundColor;
          el.remove();
          const rgb=(color.match(/[\d.]+/g)||[]).slice(0,3).map(Number);
          return {name,color,spread:Math.max(...rgb)-Math.min(...rgb),contrast:(lum(rgb)+.05)/(graphite+.05)};
        });
      });
      for (const item of palette) assert(item.spread<=14 && item.contrast>=7,"neutral brand surface "+route+" "+JSON.stringify(item));
      if(route==="/services/digital-audit"){
        await page.locator("main .bg-surface-sand").first().waitFor({state:"visible"});
        const surface=await page.locator("main .bg-surface-sand").first().evaluate(el=>getComputedStyle(el).backgroundColor);
        assert.equal(surface,palette.find(item=>item.name==="--surface-sand").color,"audit hero uses silver");
        await page.screenshot({path:"services-audit-"+viewport.width+".png",fullPage:true});
      }
      if(route==="/start"){
        const startPalette=await page.evaluate(()=>{
          const root=document.querySelector("#start-brand-page");
          const bg=n=>getComputedStyle(n).backgroundColor;
          const lum=v=>v.match(/[\d.]+/g).slice(0,3).map(Number).map(c=>c/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((sum,c,i)=>sum+c*[.2126,.7152,.0722][i],0);
          const ratio=(fg,b)=>(Math.max(lum(fg),lum(b))+.05)/(Math.min(lum(fg),lum(b))+.05);
          const material=(selector,stops)=>{const n=root.querySelector(selector);if(!n)throw new Error("Missing Start material "+selector);return {background:bg(n),image:getComputedStyle(n).backgroundImage,text:[...n.querySelectorAll("h2,h3,p")].map(t=>Math.min(...stops.map(stop=>ratio(getComputedStyle(t).color,stop))))};};
          return {cards:[material(".bt-start-free",["rgb(67,67,67)","rgb(16,16,16)"]),material(".bt-start-paid",["rgb(180,180,180)","rgb(242,242,242)"])],flow:material(".bt-start-steps",["rgb(80,86,89)","rgb(39,43,45)"]),summary:material(".bt-start-document",["rgb(180,180,180)","rgb(242,242,242)"]),faq:bg(root.querySelector(":scope > section:not(#contact)"))};
        });
        assert.deepEqual(startPalette.cards.map(c=>c.background),["rgb(33, 33, 33)","rgb(217, 217, 217)"],"Start offer surfaces");
        assert(startPalette.cards.every(c=>c.text.every(r=>r>=4.5)),"Start offer text contrast "+JSON.stringify(startPalette));
        assert(startPalette.cards[0].image.includes("linear-gradient") && startPalette.cards[1].image.includes("repeating-linear-gradient"),"Start offer materials");
        assert.equal(startPalette.flow.background,"rgb(52, 57, 59)","Titan consultation process");
        assert(startPalette.flow.image.includes("linear-gradient") && startPalette.flow.text.every(r=>r>=7),"Consultation contrast");
        assert(startPalette.summary.image.includes("repeating-linear-gradient"),"Steel result callout");
        assert.equal(startPalette.faq,"rgb(242, 242, 242)","Light FAQ surface");
        await page.getByRole("button",{name:/Проверить свой процесс/}).click();
        await page.locator("#self-check").waitFor({state:"visible"});
        const radio=page.locator("#self-check [role=radio]").first();
        if(await radio.count()){
          await radio.click();
          assert.equal(await radio.getAttribute("aria-checked"),"true");
          assert.equal(await radio.evaluate(n=>getComputedStyle(n).backgroundColor),"rgb(224, 245, 245)","Diagnostic selected state");
        }
        console.log("START PALETTE",viewport.width,JSON.stringify(startPalette));
      }
      // Check contrast of dark presentation cards against their actual background.
      const darkContrast = await page.evaluate(() => {
        const elements = [...document.querySelectorAll("article.bg-foreground h3, section.bg-foreground h2, section.bg-foreground h3, div.bg-foreground h2")];
        const rgb = (value) => [...value.matchAll(/[\d.]+/g)].slice(0,3).map(m => Number(m[0]));
        const lum = (value) => {
          const channels = rgb(value).map(c => {
            const n=c/255;
            return n<=0.04045?n/12.92:((n+0.055)/1.055)**2.4;
          });
          return channels[0]*0.2126+channels[1]*0.7152+channels[2]*0.0722;
        };
        return elements.map(element=>{
          const dark = element.closest("article.bg-foreground, section.bg-foreground, div.bg-foreground");
          const fg = getComputedStyle(element).color;
          const bg = getComputedStyle(dark).backgroundColor;
          const [l1,l2]=[lum(fg),lum(bg)].sort((a,b)=>b-a);
          return {name:element.textContent.trim().slice(0,65),color:fg,background:bg,ratio:Math.round(((l1+0.05)/(l2+0.05))*10)/10};
        });
      });
      for(const item of darkContrast)assert(item.ratio>=4.5,"dark heading contrast "+route+" "+JSON.stringify(item));
      assert.equal(errors.length,0,"uncaught JavaScript errors on "+route+": "+errors.join("; "));
      console.log("PASS",viewport.width,route,(await h1.innerText()).slice(0,56));
    }
    await page.goto(BASE+"/services");
    await page.getByRole("heading",{name:"Решения для рабочих задач вашего бизнеса"}).waitFor();
    const solutionsPalette = await page.evaluate(() => {
      const root=document.querySelector("main.nr-solutions");
      const bg=n=>getComputedStyle(n).backgroundColor;
      const lum=v=>(v.match(/[\d.]+/g)||[]).slice(0,3).map(Number).map(c=>c/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((sum,c,i)=>sum+c*[.2126,.7152,.0722][i],0);
      const ratio=(fg,b)=>(Math.max(lum(fg),lum(b))+.05)/(Math.min(lum(fg),lum(b))+.05);
      const selectors=[".bt-sol-products",".bt-sol-ai",".bt-sol-automation",".bt-sol-expert"];
      const stops=[["rgb(255,255,255)"],["rgb(80,86,89)","rgb(39,43,45)"],["rgb(67,67,67)","rgb(16,16,16)"],["rgb(180,180,180)","rgb(242,242,242)"]];
      const panels=selectors.map((selector,i)=>{const n=root.querySelector(selector);if(!n)throw new Error("Missing Solutions panel "+selector);return {background:bg(n),image:getComputedStyle(n).backgroundImage,text:[...n.querySelectorAll("h3,p,em")].map(t=>Math.min(...stops[i].map(stop=>ratio(getComputedStyle(t).color,stop))))};});
      const cta=root.querySelector(".bt-sol-cta");
      return {panels,hero:bg(root.querySelector(".bt-sol-hero-art")),cta:bg(cta),ctaContrast:ratio(getComputedStyle(cta).color,bg(cta))};
    });
    assert.deepEqual(solutionsPalette.panels.map(p=>p.background),["rgb(255, 255, 255)","rgb(52, 57, 59)","rgb(33, 33, 33)","rgb(217, 217, 217)"],"Solutions approved colors");
    assert.equal(solutionsPalette.hero,"rgb(33, 33, 33)","Solutions gloss hero");
    assert(solutionsPalette.panels.slice(1).every(p=>p.image.includes("linear-gradient")) && solutionsPalette.panels[3].image.includes("repeating-linear-gradient"),"Solutions approved materials");
    assert(solutionsPalette.panels.every(p=>p.text.length>0 && p.text.every(r=>r>=7)),"Solutions primary text contrast "+JSON.stringify(solutionsPalette));
    assert.equal(solutionsPalette.cta,"rgb(33, 33, 33)");
    assert(solutionsPalette.ctaContrast>=7,"Solutions CTA contrast");
    console.log("SOLUTIONS PALETTE",viewport.width,JSON.stringify(solutionsPalette));
    const routeLinks = [
      "/products",
      "/ai-agents",
      "/services/automation",
      "/expert",
    ];
    for(const target of routeLinks){
      assert(await page.locator('a[href="'+target+'"]').count()>0,"journey link "+target);
    }
    assert.equal(await page.locator("main a[href^='/services/'][href$='-session']").count(),0);
    assert.equal(await page.getByRole("heading",{name:/Опишите одну операцию, которая отнимает время/}).count(),0,
      "redundant CTA panel removed before contact form");
    assert.equal(await page.locator("section#contact form").count(),1,"single real lead form");
    if(viewport.width===1440)await page.screenshot({path:"services-desktop.png",fullPage:true});
    if(viewport.width===390)await page.screenshot({path:"services-mobile.png",fullPage:true});
    if(viewport.width===320)await page.screenshot({path:"services-mobile-small.png",fullPage:true});
    // Regression: every entry of the real navigation menu must be a working link.
    const menuEntries = [
      ["С чего начать", "/start"],
      ["Продукты и автоматизация", "/services"],
      ["НейроТендеролог", "/services/neurotenderolog", "Продукты и автоматизация"],
      ["Корпоративный портал знаний", "/products/knowledge-management", "Продукты и автоматизация"],
      ["ИИ-агенты для бизнеса", "/ai-agents", "Продукты и автоматизация"],
      ["Комплексная автоматизация", "/services/automation", "Продукты и автоматизация"],
      ["Экспертная работа", "/expert"],
      ["Выездная консультация", "/expert#onsite", "Экспертная работа"],
      ["Аудит бизнес-процессов", "/services/digital-audit", "Экспертная работа"],
      ["Корпоративное обучение", "/services/digital-tools-program", "Экспертная работа"],
      ["ДПО", "/expert#dpo", "Экспертная работа"],
      ["Кейсы", "/cases"],
      ["Об Александре", "/about"]
    ];
    for (const [label,target,parent] of menuEntries) {
      const desktop = viewport.width>=1024;
      // On mobile the two section headers expand exactly the four requested submenu items.
      if (!desktop && !parent && ["/services","/expert"].includes(target)) continue;
      await page.goto(BASE+"/cases");
      const nav=page.getByRole("navigation",{name:desktop?"Основное меню":"Мобильное меню",exact:true});
      if (!desktop) await page.getByRole("button",{name:"Toggle menu"}).click();
      if (parent) {
        const trigger=nav.getByRole(desktop?"link":"button",{name:parent,exact:true});
        if (desktop) await trigger.hover(); else await trigger.click();
      }
      const link=nav.getByRole("link",{name:label,exact:true});
      await link.waitFor({state:"visible"});
      assert.equal(await link.getAttribute("href"),target);
      await link.click();
      const expected=new URL(target,BASE);
      await page.waitForURL(url=>url.pathname.replace(/\/$/,"")===expected.pathname&&url.hash===expected.hash,{timeout:8000});
      await page.locator("main h1").first().waitFor({state:"visible"});
      if(expected.hash) {
        const anchor=page.locator(expected.hash);
        await anchor.waitFor({state:"visible"});
        await page.waitForFunction(id=>{const r=document.querySelector(id)?.getBoundingClientRect();return r&&r.top>=0&&r.top<innerHeight;},expected.hash);
      }
      console.log("PASS menu",viewport.width,label,target);
    }
    await page.goto(BASE+"/pricing");
    await page.locator("main h1").first().waitFor({state:"visible"});
    await context.close();
  }
  console.log("PASS all service routes and commercial navigation");
} finally {
  await browser.close();
}
