import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import catalog from "@/data/commercialCatalog.json";
import { getIndustryScenario, scenarioContext } from "@/data/industryScenarios";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet-async";
import { Check } from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import DiagnosticForm, { hasDiagnosticDraft } from "@/components/diagnostic/DiagnosticForm";
import FAQTeaser from "@/components/FAQTeaser";
import { scrollToContact } from "@/lib/scrollToContact";
import PillButton from "@/components/PillButton";
import { readContactIntent, setContactIntent, setIndustryContext } from "@/lib/contactIntent";
import {
  consumeDiagnosticAutostart,
  isDiagnosticStarted,
  markDiagnosticStarted,
} from "@/lib/diagnosticState";

const StartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const requestedOffer = new URLSearchParams(location.search).get("offer");
  const scenario = getIndustryScenario(new URLSearchParams(location.search).get("scenario"));
  const scenarioId = scenario?.id || "";
  const [diagnosticStarted, setDiagnosticStarted] = useState(
    () => !!scenario || (!requestedOffer && (hasDiagnosticDraft(scenarioId) || isDiagnosticStarted()))
  );

  const diagnosticRef = useRef<HTMLDivElement>(null);

  const startDiagnostic = () => {
    setContactIntent(null);
    if (requestedOffer) navigate("/start", {replace:true});
    setDiagnosticStarted(true);
    markDiagnosticStarted();
    setTimeout(() => {
      const target = diagnosticRef.current;
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      const field = diagnosticRef.current?.querySelector<HTMLElement>(
        "input, textarea, select, button"
      );
      field?.focus({ preventScroll: true });
    }, 120);
  };

  useEffect(() => {
    setIndustryContext(scenario ? scenarioContext(scenario) : null);
    const requested = consumeDiagnosticAutostart();
    const intent = readContactIntent();
    if ((requested && !requestedOffer) || (scenarioId && intent?.context?.scenarioId !== scenarioId) || (!scenarioId && intent?.context?.scenarioId)) setContactIntent(null);
    if (scenario || (requested && !requestedOffer)) startDiagnostic();
    const onOpen = () => startDiagnostic();
    window.addEventListener("self-start:open", onOpen);
    return () => window.removeEventListener("self-start:open", onOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioId]);

  const bookMeeting = () => {
    setContactIntent({ kind: "onsite", offerId:"expert-onsite", offerLabel:"Выездная консультация — 8 000 ₽",format:"onsite",sourcePath:"/start",context:null });
    scrollToContact();
  };
  useEffect(() => {
    const q=new URLSearchParams(location.search); const id=q.get("offer");
    if(!id) { if(readContactIntent()?.offerId) setContactIntent(null); return; }
    const offerNames:Record<string,string> = {"product-neurotenderolog":"НейроТендеролог","product-knowledge-management":"Корпоративный портал знаний","custom-agent":"Индивидуальная разработка ИИ-агентов","expert-onsite":"Выездная консультация — 8 000 ₽","expert-audit":"Комплексный аудит","expert-training":"Авторская программа «Цифровые инструменты для бизнеса»","automation-process":"Автоматизация бизнеса","automation-corporate-system":"Корпоративная информационная система","automation-integration":"Интеграция бизнес-систем","automation-custom-software":"Индивидуальное программное решение"};
    const title=catalog.mini.find(x=>x.id===id)?.name||catalog.hermes.find(x=>x.id===id)?.name||offerNames[id];
    if(!title)return;
    const previous=readContactIntent(); const fmt=q.get("format")||"connect"; const license=q.get("license");
    const format=["demo","connect","setup","adaptation","project","onsite","audit","training"].includes(fmt)?fmt:"connect";
    const licensePlan=catalog.mini.some(m=>m.id===id&&m.license==="standard")&&catalog.licenses.some(l=>l.id===license)?license||undefined:undefined;
    const mini=catalog.mini.find(x=>x.id===id);
    const fallbackSource=mini?"/mini-agents/"+mini.slug:catalog.hermes.some(x=>x.id===id)?"/ai-agents/hermes":({"product-neurotenderolog":"/services/neurotenderolog","product-knowledge-management":"/products/knowledge-management","custom-agent":"/ai-agents/custom","expert-onsite":"/expert","expert-audit":"/services/digital-audit","expert-training":"/services/digital-tools-program"} as Record<string,string>)[id]||"/services/automation";
    const sourcePath=previous?.offerId===id&&previous.sourcePath?previous.sourcePath:fallbackSource;
    setContactIntent({kind:id==="expert-onsite"?"onsite":"implementation",offerId:id,offerLabel:title,format,licensePlan,sourcePath,context:null,process:title});
    const frame=window.requestAnimationFrame(()=>document.getElementById("contact")?.scrollIntoView({behavior:"instant" as ScrollBehavior,block:"start"}));return ()=>window.cancelAnimationFrame(frame);
  }, [location.search]);


  const flow = [
    { title: "Задача бизнеса", text: "Какого результата Вы хотите добиться и что сегодня этому мешает." },
    { title: "Текущий процесс", text: "Как сейчас выполняется работа, кто участвует и какие инструменты используются." },
    { title: "Потери времени, денег и контроля", text: "Где возникают задержки, повторные действия, ошибки и необходимость постоянного участия руководителя." },
    { title: "Люди и ответственность", text: "Кто выполняет работу, кто принимает решения, у кого находится необходимая информация и что мешает изменениям." },
    { title: "Главное ограничение", text: "Что важнее устранить первым: проблему в процессе, ответственности, данных или инструментах." },
    { title: "Первый шаг и проверка результата", text: "Какое действие предпринять, кому его можно поручить и по какому показателю оценить пользу." },
  ];

  const results = [
    { title: "Главный приоритет", text: "Какую проблему стоит решать первой и почему." },
    { title: "Первое конкретное действие", text: "С чего начать, какие данные потребуются и кто должен участвовать." },
    { title: "Ограничения и риски", text: "Что может помешать результату и какие предположения ещё необходимо проверить." },
    { title: "Критерий результата", text: "Как понять, что изменение действительно принесло пользу бизнесу." },
  ];


  return (
    <PageTransition>
      <Helmet>
        <title>С чего начать: бесплатная проверка и выездная консультация | НейроРешения</title>
        <meta
          name="description"
          content="Бесплатная проверка бизнес-процесса с PDF или выездная консультация за 8 000 ₽ в Красноярске."
        />
        <meta
          name="keywords"
          content="разбор цифровых задач, автоматизация процессов, с чего начать автоматизацию, стратегия цифрового развития, аудит процессов"
        />
        <link rel="canonical" href="https://aleksamois.ru/start/" />
        <meta property="og:title" content="С чего начать: бесплатная проверка и выездная консультация | НейроРешения" />
        <meta
          property="og:description"
          content="Бесплатная проверка бизнес-процесса с PDF или выездная консультация за 8 000 ₽ в Красноярске."
        />
        <meta property="og:url" content="https://aleksamois.ru/start/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbs.start())}</script>
      </Helmet>

      <div id="start-brand-page" className="min-h-screen bg-white">

        <style>{`
          /* Scoped Start-page palette. Existing diagnostic logic, PDF and other routes are untouched. */
          #start-brand-page main, #start-brand-page > section {
            --background: 0 0% 100%;
            --foreground: 0 0% 12.941176%;
            --card: 0 0% 100%;
            --muted: 0 0% 94.901961%;
            --muted-foreground: 0 0% 23.921569%;
            --border: 0 0% 85.098039%;
            --primary: 191.739130 62.727273% 56.862745%;
            --accent: 191.739130 62.727273% 56.862745%;
            --primary-dark: 193.939394 87.610619% 22.156863%;
            --accent-foreground: 0 0% 12.941176%;
          }
          #start-brand-page main [class~="text-muted-foreground"],
          #start-brand-page > section [class~="text-muted-foreground"] { color:#3D3D3D; }
          #start-brand-page #self-check [class~="text-accent"],
          #start-brand-page > section a[href="/faq"] { color:#07536A!important; }
          #start-brand-page #self-check [role="radio"],
          #start-brand-page #self-check [role="checkbox"] { color:#212121!important; border-color:#707070; background:#FFFFFF; }
          #start-brand-page #self-check [aria-checked="true"] { border-color:#07536A; background:#E0F5F5; }
          #start-brand-page #self-check [aria-checked="true"] [class~="border-accent"] { border-color:#07536A; }
          #start-brand-page #self-check [aria-checked="true"] [class~="bg-accent"] { background:#07536A; }
          #start-brand-page #self-check [aria-checked="true"] svg { color:#FFFFFF; }
          #start-brand-page #self-check [class~="border-foreground/25"],
          #start-brand-page #self-check [class~="border-foreground/10"] { border-color:#707070; }
          #start-brand-page #self-check [aria-checked="true"] { border-color:#07536A; }
          #start-brand-page #self-check [class~="bg-muted"] { background:#D9D9D9; }
          #start-brand-page #self-check [class~="rounded-t-[28px]"] { background:#3D3D3D; }
          #start-brand-page #self-check [class~="rounded-t-[28px]"] h2 { color:#FFFFFF!important; }
          #start-brand-page #self-check [class~="bg-[#F3F5F6]"] { background:#F2F2F2; }
          #start-brand-page #self-check [class~="bg-[#DEF2F7]"] { background:#E0F5F5; }
          #start-brand-page #self-check [class~="border-[#E5E7EB]"] { border-color:#D9D9D9; }
          #start-brand-page #self-check [class~="text-[#616161]"] { color:#3D3D3D; }
          #start-brand-page #self-check [class~="text-[#116078]"] { color:#07536A; }
          #start-brand-page #self-check [class~="!border-[#616161]"] { border-color:#707070!important; }
          #start-brand-page #self-check [class~="hover:!bg-[#F3F5F6]"]:hover { background:#F2F2F2!important; }
          #start-brand-page #self-check [class~="hover:!bg-[#333333]"]:hover { background:#3D3D3D!important; }
          #start-brand-page main :is(a,button,input,textarea,select):focus-visible,
          #start-brand-page > section :is(a,button):focus-visible { outline-color:#07536A; }
          #start-brand-page main [class~="bg-[#07536A]"] button:focus-visible { outline-color:#FFFFFF; }
          #start-brand-page > section { background:#F2F2F2; }

          #start-brand-page{--bt-cyan:#3ddce8;--bt-gloss:linear-gradient(154deg,#434343 0%,#292929 19%,#1d1d1d 39%,#151515 55%,#252525 56%,#191919 75%,#101010 100%);--bt-titan:linear-gradient(135deg,#505659,#34393b 44%,#272b2d);--bt-steel:repeating-linear-gradient(0deg,#ffffff12 0px,#ffffff12 1px,#00000005 1px,#00000005 2px),linear-gradient(110deg,#b4b4b4,#d9d9d9 18%,#f2f2f2 37%,#c2c2c2 57%,#e5e5e5 82%,#bcbcbc);--bt-shadow:0 12px 26px #21212117,0 3px 7px #21212109}
          #start-brand-page .bt-start-wrap{width:min(1240px,calc(100% - 64px));margin:auto;color:#212121;font-family:Raleway,Arial,sans-serif;font-size:17px;line-height:1.55}
          #start-brand-page :is(.bt-start-hero,.bt-start-choices,.bt-start-consult) :is(h1,h2,h3){font-family:"Golos Text",Arial,sans-serif!important;font-weight:700!important;line-height:1.12!important;letter-spacing:-.035em;color:inherit!important;margin:0}
          #start-brand-page .bt-start-wrap em{font-family:Georgia,"Times New Roman",serif!important;font-style:italic;font-weight:400!important;color:inherit!important}
          #start-brand-page .bt-start-hero{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);align-items:end;gap:40px;padding:24px 0 36px}
          #start-brand-page .bt-start-hero h1{font-size:clamp(36px,5.7vw,76px)!important;line-height:1.04!important;letter-spacing:-.045em}
          #start-brand-page .bt-start-hero p{font-size:20px;max-width:480px;line-height:1.5;color:#3d3d3d;margin:0}
          #start-brand-page .bt-start-line{display:block;width:60px;height:4px;background:var(--bt-cyan);margin-bottom:24px}
          #start-brand-page .bt-start-choices{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,1fr);gap:20px}
          #start-brand-page .bt-start-tile{border-radius:30px;padding:36px;display:flex;flex-direction:column;align-items:flex-start;min-width:0;box-shadow:var(--bt-shadow)}
          #start-brand-page .bt-start-free{background:#212121 var(--bt-gloss);color:#fff}
          #start-brand-page .bt-start-paid{background:#d9d9d9 var(--bt-steel);color:#212121}
          #start-brand-page .bt-start-tile h2{font-size:clamp(27px,3.1vw,42px)!important;margin-bottom:16px;max-width:540px}
          #start-brand-page .bt-start-tile p{color:inherit!important;margin:0;max-width:540px}
          #start-brand-page .bt-start-tile .bt-start-eyebrow{font-family:"Golos Text",Arial,sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.17em;font-size:12px;margin-bottom:32px}
          #start-brand-page .bt-start-free .bt-start-eyebrow{color:var(--bt-cyan)!important}
          #start-brand-page .bt-start-tile .bt-start-price{font-family:"Golos Text",Arial,sans-serif;font-size:clamp(39px,4.2vw,62px)!important;font-weight:700;letter-spacing:-.05em;line-height:1.07;margin-top:30px;margin-bottom:7px}
          #start-brand-page .bt-start-free .bt-start-price{color:var(--bt-cyan)!important}
          #start-brand-page .bt-start-tile .bt-start-terms{font-size:15px;margin-bottom:28px}
          #start-brand-page .bt-start-tags{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0 0}
          #start-brand-page .bt-start-tags span{font-size:13px;font-weight:700;border:1px solid #21212166;border-radius:999px;padding:5px 12px}
          #start-brand-page .bt-start-tile .bt-start-summary{margin-top:15px;font-size:15px}
          #start-brand-page .bt-start-cta{max-width:100%;min-height:52px;white-space:normal;text-align:left;background:#212121!important;color:#fff!important;font-size:15px}
          #start-brand-page .bt-start-tile .bt-start-cta{margin-top:auto}
          #start-brand-page .bt-start-cta>span:last-child{background:var(--bt-cyan)!important;color:#212121!important;flex-shrink:0}
          #start-brand-page .bt-start-free .bt-start-cta{background:#fff!important;color:#212121!important}
          #start-brand-page .bt-start-free .bt-start-cta>span:last-child{background:var(--bt-gloss)!important;color:#fff!important}
          #start-brand-page .bt-start-other{display:flex;justify-content:space-between;align-items:center;gap:20px;padding-top:24px;font-size:15px;color:#212121}
          #start-brand-page .bt-start-other :is(a,button){color:#212121!important;font-weight:700;text-decoration:underline;text-underline-offset:5px}
          #start-brand-page .bt-start-consult{padding:80px 0;display:grid;grid-template-columns:minmax(0,1.02fr) minmax(0,1fr);gap:52px;align-items:start}
          #start-brand-page .bt-start-steps{background:#34393b var(--bt-titan);color:#fff;border-radius:30px;padding:32px}
          #start-brand-page .bt-start-steps h2{font-size:30px!important;margin-bottom:25px}
          #start-brand-page .bt-start-steps .bt-start-step{display:grid;grid-template-columns:43px minmax(0,1fr);gap:12px;border-top:1px solid #ffffff35;padding:16px 0}
          #start-brand-page .bt-start-step h3{font-size:18px!important}#start-brand-page .bt-start-step p{font-size:15px;color:#fff!important;margin:4px 0 0}#start-brand-page .bt-start-number{font-family:"Golos Text",Arial,sans-serif;font-size:20px;font-weight:600}
          #start-brand-page .bt-start-note{font-size:15px;color:#fff!important;margin-top:18px;padding-top:18px;border-top:1px solid #ffffff35}
          #start-brand-page .bt-start-results{padding:20px 0;min-width:0}
          #start-brand-page .bt-start-results h2{font-size:clamp(29px,3.1vw,46px)!important;margin-bottom:22px}
          #start-brand-page .bt-start-result{display:grid;grid-template-columns:30px minmax(0,1fr);gap:15px;padding:18px 0;border-top:1px solid #d9d9d9}
          #start-brand-page .bt-start-result h3{font-size:21px!important}#start-brand-page .bt-start-result p{font-size:16px;color:#3d3d3d;margin:5px 0 0}
          #start-brand-page .bt-start-result svg{background:var(--bt-cyan);color:#212121!important;border-radius:50%;padding:5px;width:25px;height:25px;margin-top:2px}
          #start-brand-page .bt-start-document{background:var(--bt-steel);border-radius:24px;padding:25px;color:#212121!important;font-size:16px;font-weight:600;margin:14px 0 22px}
          #start-brand-page .bt-start-wrap :is(a,button):focus-visible{outline:3px solid #212121;outline-offset:4px}
          #start-brand-page .bt-start-free button:focus-visible{outline-color:var(--bt-cyan)}
          #start-brand-page #self-check [class~="rounded-t-[28px]"]{background:#212121 var(--bt-gloss)}
          #start-brand-page > section:not(#contact)>.container:has(>h2){max-width:1240px;display:grid;grid-template-columns:minmax(0,.65fr) minmax(0,1.35fr);gap:0 70px}
          #start-brand-page > section:not(#contact)>.container:has(>h2)>h2{text-align:left;grid-row:1/3;margin:0;font-size:clamp(29px,3.1vw,46px)!important}
          #start-brand-page > section:not(#contact) [data-state][class*="rounded-xl"]{border:0;border-bottom:1px solid #c6c6c6;border-radius:0;background:transparent;padding-inline:0}
          #start-brand-page > section:not(#contact) a[href="/faq"]{color:#212121!important;text-decoration:underline;text-underline-offset:5px}
          #start-brand-page #contact{background:#fff;padding:70px 0}
          #start-brand-page #contact>.container>div{max-width:1240px!important;background:#212121 var(--bt-gloss);border-radius:32px;padding:42px}
          #start-brand-page #contact .grid:has(>form){grid-template-columns:minmax(0,.83fr) minmax(0,1.17fr);gap:50px}
          #start-brand-page #contact .section-title,#start-brand-page #contact .section-title+p{color:#fff!important}
          #start-brand-page #contact .section-title .font-semibold{font-family:Georgia,"Times New Roman",serif!important;color:#fff!important;font-weight:400!important;font-style:italic}
          #start-brand-page #contact form{background:#fff;color:#212121;min-width:0}
          @media(max-width:800px){
            #start-brand-page .bt-start-wrap{width:calc(100% - 36px)}
            #start-brand-page .bt-start-hero,#start-brand-page .bt-start-choices,#start-brand-page .bt-start-consult{grid-template-columns:minmax(0,1fr);gap:22px}
            #start-brand-page .bt-start-hero{padding:14px 0 26px}#start-brand-page .bt-start-hero p{font-size:17px}
            #start-brand-page .bt-start-tile{padding:25px;border-radius:24px}#start-brand-page .bt-start-tile .bt-start-eyebrow{margin-bottom:20px}#start-brand-page .bt-start-tile .bt-start-price{margin-top:24px}
            #start-brand-page .bt-start-other{flex-direction:column;align-items:flex-start;gap:12px}
            #start-brand-page .bt-start-consult{padding:50px 0}#start-brand-page .bt-start-steps{padding:23px}#start-brand-page .bt-start-steps .bt-start-step{grid-template-columns:35px minmax(0,1fr);gap:9px}#start-brand-page .bt-start-results{padding:0}
            #start-brand-page > section:not(#contact)>.container:has(>h2){display:block}#start-brand-page > section:not(#contact)>.container:has(>h2)>h2{margin-bottom:24px}
            #start-brand-page #contact{padding:40px 0}#start-brand-page #contact>.container>div{padding:23px;border-radius:24px}#start-brand-page #contact .grid:has(>form){grid-template-columns:minmax(0,1fr);gap:22px}#start-brand-page #contact form{padding:17px}
          }
          @media(max-width:359px){#start-brand-page .bt-start-wrap{width:calc(100% - 28px)}#start-brand-page .bt-start-tile{padding:20px}#start-brand-page .bt-start-tile .bt-start-price{font-size:35px!important}#start-brand-page #contact>.container>div{padding:16px}}
        `}</style>
        <PageBreadcrumbs currentPage="С чего начать" />

        <main>
          <div className="bt-start-wrap">
            <section className="bt-start-hero">
              <div><span className="bt-start-line" aria-hidden="true"/><h1>С чего <em>начать</em></h1></div>
              <p>Не знаете, что стоит менять первым? Проверьте один рабочий процесс самостоятельно или обсудите ситуацию с экспертом.</p>
            </section>
            <section className="bt-start-choices" aria-label="Форматы начала работы">
              <article className="bt-start-tile bt-start-free">
                <p className="bt-start-eyebrow">Самостоятельно</p>
                <h2>Узнайте, где компания <em>теряет деньги</em></h2>
                <p>Ответьте на вопросы о работе сотрудников, задержках и ошибках. Получите предварительные выводы и первый шаг для проверки.</p>
                <p className="bt-start-price">Бесплатно</p>
                <p className="bt-start-terms">Без регистрации и обязательного звонка.</p>
                <PillButton onClick={startDiagnostic} variant="light" size="md" className="bt-start-cta">Проверить свой процесс</PillButton>
              </article>
              <article className="bt-start-tile bt-start-paid">
                <p className="bt-start-eyebrow">С Александрой</p>
                <h2>Выездная <em>консультация</em></h2>
                <p>На месте изучим один рабочий процесс, выясним, где теряются время и деньги, определим приоритетную задачу.</p>
                <div className="bt-start-tags"><span>Красноярск</span><span>До 1 часа</span></div>
                <p className="bt-start-summary">Результат: краткое письменное заключение с рекомендациями, возможным решением, ориентиром бюджета и следующим шагом.</p>
                <p className="bt-start-price">8 000 ₽</p>
                <p className="bt-start-terms">Стоимость полностью засчитывается в оплату последующего проекта автоматизации. Место и время согласуем заранее.</p>
                <PillButton onClick={bookMeeting} variant="dark" size="md" className="bt-start-cta">Пригласить специалиста</PillButton>
              </article>
            </section>
            <div className="bt-start-other">
              <Link to="/services">Выбрать решение из каталога ↗</Link>
              <div>Уже знаете, что хотите внедрить?{" "}<button type="button" onClick={() => { setContactIntent(null); if(requestedOffer) navigate("/start#contact",{replace:true}); scrollToContact(); }}>Сразу обсудить задачу →</button></div>
            </div>
            {diagnosticStarted && (
            <section ref={diagnosticRef} id="self-check" className="container mx-auto px-4 pt-6 pb-12 scroll-mt-24">
              <DiagnosticForm key={scenarioId || "universal"} scenario={scenario} />
            </section>
          )}
            <section id="result" className="bt-start-consult scroll-mt-24">
              <article className="bt-start-steps">
                <h2>Что происходит на выездной <em>консультации</em></h2>
                {flow.map((step,i)=><div className="bt-start-step" key={step.title}><span className="bt-start-number">{String(i+1).padStart(2,"0")}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></div>)}
                <p className="bt-start-note">Не каждую проблему нужно решать автоматизацией. Иногда достаточно изменить порядок работы, распределить ответственность или устранить лишние действия.</p>
              </article>
              <article className="bt-start-results">
                <h2>Что Вы получите после <em>консультации</em></h2>
                {results.map(r=><div className="bt-start-result" key={r.title}><Check aria-hidden="true"/><div><h3>{r.title}</h3><p>{r.text}</p></div></div>)}
                <p className="bt-start-document">Вы получите краткое письменное заключение с рекомендациями, возможным решением, ориентиром бюджета и следующим шагом. Гипотезы и предполагаемые результаты выделяются отдельно. Дальнейшие действия Вы выбираете самостоятельно.</p>
                <PillButton onClick={bookMeeting} variant="dark" size="md" className="bt-start-cta">Пригласить специалиста</PillButton>
              </article>
            </section>
          </div>
        </main>

        <FAQTeaser
          items={[
            { question: "Что входит в выездную консультацию за 8 000 ₽?", answer: "Один рабочий процесс на территории клиента в Красноярске, до одного часа. Краткое письменное заключение с рекомендациями, возможным решением, ориентиром бюджета и следующим шагом." },
            { question: "Как засчитывается стоимость консультации?", answer: "Оплаченные 8 000 ₽ полностью засчитываются в оплату последующего проекта автоматизации." },
            { question: "Нужно ли после встречи заказывать внедрение?", answer: "Нет. Вы получаете самостоятельный результат, который можете использовать внутри своей компании. Если потребуется дальнейшая помощь, возможные работы и их стоимость обсуждаются отдельно." },
            { question: "Что подготовить к встрече?", answer: "Достаточно описать одну конкретную проблему: как работа устроена сейчас, где возникают задержки или ошибки, что уже пробовали и какого результата хотите добиться.\n\nЕсли известны затраты времени, количество операций или стоимость ошибок, эти данные помогут оценить масштаб проблемы. Если цифр нет, определим, что нужно измерить." },
            { question: "Нужно ли заранее отправлять документы компании?", answer: "Нет, для первого обсуждения это необязательно. Не передавайте через открытую форму пароли, персональные данные третьих лиц и конфиденциальные документы. Если для дальнейшей работы потребуются материалы, отдельно согласуем состав и условия их передачи." },
            { question: "Как начать работу из другого региона?", answer: "Выберите бесплатную проверку, готовое решение или обсудите задачу дистанционно. Выездная консультация проводится в Красноярске." },
          ]}
        />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default StartPage;
