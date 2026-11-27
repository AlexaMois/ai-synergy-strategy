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
        `}</style>
        <PageBreadcrumbs currentPage="С чего начать" />

        <main>
          <section className="container mx-auto max-w-7xl px-4 pt-6 md:pt-12 pb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">С чего <span className="font-iriska font-normal italic text-accent">начать</span></h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Не знаете, что стоит менять первым? Проверьте один рабочий процесс самостоятельно или обсудите ситуацию с экспертом.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-[28px] bg-[#F2F2F2] shadow-card p-6 md:p-8 flex flex-col items-start">
                <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">Самостоятельно</p>
                <h2 className="!text-[20px] md:!text-[24px] !font-bold !leading-[1.2] text-foreground mb-4">Узнайте, где компания теряет деньги</h2>
                <p className="text-[16px] font-normal text-muted-foreground leading-relaxed mb-5">Ответьте на вопросы о работе сотрудников, задержках и ошибках. Получите предварительные выводы и первый шаг для проверки.</p>
                <p className="text-[20px] md:text-[22px] font-bold text-foreground mb-1">Бесплатно</p>
                <p className="text-sm md:text-base text-muted-foreground mb-7">Без регистрации и обязательного звонка.</p>
                <PillButton onClick={startDiagnostic} variant="dark" size="md" className="mt-auto !bg-[#212121] !text-white hover:!bg-[#3D3D3D] [&>span:last-child]:!text-[#212121]">Проверить свой процесс →</PillButton>
              </div>
              <div className="rounded-[28px] bg-[#07536A] shadow-card p-6 md:p-8 flex flex-col items-start">
                <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] !text-white mb-4">С Александрой</p>
                <h2 className="!text-[20px] md:!text-[24px] !font-bold !leading-[1.2] text-white mb-4">Выездная консультация</h2>
                <p className="text-[16px] font-normal !text-white leading-relaxed mb-5">На месте изучим один рабочий процесс, выясним, где теряются время и деньги, определим приоритетную задачу. Красноярск · до 1 часа. Результат: краткое письменное заключение с рекомендациями, возможным решением, ориентиром бюджета и следующим шагом.</p>
                <p className="text-[20px] md:text-[22px] font-bold !text-white mb-1">8 000 ₽</p>
                <p className="text-sm md:text-base !text-white mb-7">Стоимость полностью засчитывается в оплату последующего проекта автоматизации. Место и время согласуем заранее.</p>
                <PillButton onClick={bookMeeting} variant="light" size="md" className="mt-auto !bg-white !text-[#07536A] hover:!bg-[#F2F2F2] [&>span:last-child]:!bg-[#07536A] [&>span:last-child]:!text-white">Пригласить специалиста →</PillButton>
              </div>
            </div>
            <p className="mt-6 text-base md:text-lg text-foreground">
              <Link className="font-semibold text-[#07536A] underline underline-offset-4" to="/services">Выбрать решение из каталога</Link>. Уже знаете, что хотите внедрить?{" "}
              <button
                type="button"
                onClick={() => { setContactIntent(null); if(requestedOffer) navigate("/start#contact",{replace:true}); scrollToContact(); }}
                className="font-semibold text-[#07536A] underline-offset-4 hover:underline"
              >
                Сразу обсудить задачу →
              </button>
            </p>
          </section>
          {diagnosticStarted && (
            <section ref={diagnosticRef} id="self-check" className="container mx-auto px-4 pt-6 pb-12 scroll-mt-24">
              <DiagnosticForm key={scenarioId || "universal"} scenario={scenario} />
            </section>
          )}
          {/* 3. Что происходит на выездной консультации + что Вы получите */}
          <section
            id="result"
            className="bg-white container mx-auto max-w-7xl px-4 pt-8 md:pt-12 pb-12 md:pb-16 scroll-mt-24"
          >
            <div className="grid md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-5 rounded-[24px] md:rounded-[32px] bg-[#3D3D3D] text-white px-6 md:px-8 py-8 md:py-10 shadow-card">
                <h2 className="text-2xl md:text-4xl font-bold text-white leading-[1.08] mb-6 md:mb-8">
                  Что происходит на выездной консультации
                </h2>
                <div className="border-t border-background/15 mb-6 md:mb-8">
                  {flow.map((step, i) => (
                    <div
                      key={step.title}
                      className="flex items-baseline gap-4 border-b border-background/15 py-3.5"
                    >
                      <span className="text-base md:text-lg font-bold text-white tabular-nums shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base md:text-lg text-white">
                        <span className="font-semibold text-white">{step.title}</span>
                        <span className="block text-sm md:text-base text-white leading-snug mt-0.5">{step.text}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-base md:text-lg !text-white leading-snug">
                  Не каждую проблему нужно решать автоматизацией. Иногда достаточно изменить порядок работы, распределить ответственность или устранить лишние действия.
                </p>
              </div>

              <div className="md:col-span-7 md:pl-6">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.08] mb-6 md:mb-8">
                  Что Вы получите после консультации
                </h2>
                <ul className="mb-8 md:mb-10 border-t border-border">
                  {results.map((r) => (
                    <li key={r.title} className="flex items-start gap-4 border-b border-border py-5 md:py-6">
                      <Check className="w-6 h-6 text-[#07536A] mt-1 shrink-0" strokeWidth={2} />
                      <span className="text-lg md:text-2xl text-foreground leading-snug">
                        {r.title}
                        <span className="block text-sm md:text-base text-muted-foreground leading-snug mt-1">{r.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="rounded-2xl bg-[#B3B3B3] px-5 py-4 text-sm md:text-base font-semibold !text-[#212121] leading-snug max-w-xl">
                  Вы получите краткое письменное заключение с рекомендациями, возможным решением, ориентиром бюджета и следующим шагом. Гипотезы и предполагаемые результаты выделяются отдельно. Дальнейшие действия Вы выбираете самостоятельно.
                </p>
                <PillButton onClick={bookMeeting} variant="dark" size="md" className="mt-6 !bg-[#212121] !text-white hover:!bg-[#3D3D3D] [&>span:last-child]:!text-[#212121]">Пригласить специалиста</PillButton>
              </div>
            </div>
          </section>

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
