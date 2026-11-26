import { useEffect, useRef, useState } from "react";
import { industries, type Industry, type IndustryScenario as Question } from "@/data/industryScenarios";
import { Link } from "react-router-dom";
import { ArrowRight, MousePointerClick } from "lucide-react";
import { scrollToContact } from "@/lib/scrollToContact";
import PillButton from "@/components/PillButton";
import { Button } from "@/components/ui/button";
import chatDeco from "@/assets/industry-chat-deco.png";
import { requestDiagnosticAutostart } from "@/lib/diagnosticState";
import { setContactIntent } from "@/lib/contactIntent";

const CONTACT_CONTEXT_STORAGE_KEY = "aleksamois.contactContext";
const CONTACT_CONTEXT_EVENT = "aleksamois:contact-context";

const times = ["10:24", "10:26", "10:28", "10:31", "10:32", "10:35"];

// Разная ширина сообщений внутри колонки — как в живом чате.
const widths = ["md:max-w-[92%]", "md:max-w-[78%]", "md:max-w-[84%]", "md:max-w-[76%]", "md:max-w-[88%]", "md:max-w-[80%]"];

// Габариты окна переписки на компьютере оставлены прежними: сообщения плотнее,
// а свободное место равномерно распределяется между ними.
const chatMinH: Record<string, string> = {
  production: "md:min-h-[627.8px]",
  transport: "md:min-h-[586.5px]",
  construction: "md:min-h-[586.5px]",
  services: "md:min-h-[627.8px]",
};

const IndustryQuestions = () => {
  const [activeId, setActiveId] = useState(industries[0].id);
  const [openId, setOpenId] = useState<string | null>(null);
  const industry = industries.find((i) => i.id === activeId) ?? industries[0];
  const openItem = industry.questions.find(q => q.id === openId) ?? null;
  const items = industry.questions.map((q, idx) => ({ q, idx, short: q.bubble }));
  const answerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!openId) return;
    const el = answerRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 100 || top > window.innerHeight - 120) {
      el.scrollIntoView({block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
    }
  }, [openId]);

  const saveContactContext = (nextIndustry: Industry, question?: Question) => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(
      CONTACT_CONTEXT_STORAGE_KEY,
      JSON.stringify({
        industry: nextIndustry.label,
        question: question?.q ?? "",
        topic: question?.topic ?? "",
        scenarioId: question?.id ?? "",
      }),
    );
    window.dispatchEvent(new CustomEvent(CONTACT_CONTEXT_EVENT));
  };

  const Bubble = ({ item, side }: { item: (typeof items)[number]; side: "l" | "r" }) => {
    const isOpen = openId === item.q.id;
    const lit = isOpen;
    const bubbleEl = (
      <span
        className={`relative min-w-0 px-4 pt-2.5 pb-2 md:px-4 md:pt-1.5 md:pb-1 text-sm md:text-[17px] font-medium leading-snug md:leading-[1.4] transition-all duration-300 rounded-[22px] ${
          lit
            ? "bg-primary-dark text-accent-foreground"
            : "bg-background/[0.09] text-card ring-1 ring-background/10 group-hover:bg-background/[0.14] group-hover:ring-accent/50"
        } ${side === "l" ? "rounded-bl-none" : "rounded-br-none"}`}
      >

        <span aria-hidden className={`absolute bottom-0 h-3 w-3 ${lit ? "bg-primary-dark" : "bg-background/[0.09]"} ${side === "l" ? "-left-2 [clip-path:polygon(100%_0,100%_100%,0_100%)]" : "-right-2 [clip-path:polygon(0_0,100%_100%,0_100%)]"}`} />
        {item.short}
        <span
          className={`mt-1 block text-right text-[11px] leading-none font-medium md:mt-[6px] md:ml-2 md:inline md:float-right ${
            lit ? "text-accent-foreground/60" : "text-card/50"
          }`}
        >
          {times[item.idx % times.length]}
        </span>
        <span className="absolute -top-3 right-4 z-10 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-semibold whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none">
          <MousePointerClick className="h-3.5 w-3.5" /> Нажмите
        </span>
      </span>
    );
    return (
      <Button
        type="button"
        variant="ghost"
        aria-label={item.short}
        aria-expanded={isOpen}
        aria-controls="industry-question-answer"
        onClick={() => {
          setOpenId(isOpen ? null : item.q.id);
          setContactIntent(null);
          saveContactContext(industry, isOpen ? undefined : item.q);
        }}
        className={`group flex h-auto items-end gap-2.5 w-fit max-w-[94%] p-0 whitespace-normal text-left cursor-pointer hover:bg-transparent hover:text-inherit hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none transition-transform duration-300 ${widths[item.idx % widths.length]} ${
          side === "r" ? "self-end" : "self-start"
        }`}
      >
        {bubbleEl}
      </Button>
    );
  };

  return (
    <section id="industry-questions" className="scroll-mt-20 px-4 md:px-6 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="relative rounded-[32px] md:rounded-[40px] bg-foreground overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-10 lg:px-14 py-12 md:py-14">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="none">
              <path d="M700 0 C 860 90, 980 140, 1200 200" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.45" />
              <path d="M560 120 C 660 320, 480 480, 620 700" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.28" />
              <path d="M0 600 C 180 540, 320 690, 520 620" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.35" />
              <path d="M780 360 C 920 460, 1010 410, 1200 520" stroke="hsl(var(--accent))" strokeWidth="0.7" fill="none" opacity="0.22" />
            </svg>
          </div>

          <div className="relative grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-14 items-center">
            <div>
            <p className="text-[15px] uppercase tracking-[0.22em] text-accent font-semibold mb-4">Отрасли</p>
            <h2 className="text-4xl md:text-5xl font-bold text-background leading-[1.05] mb-5">
              Узнаёте <span className="font-iriska font-normal italic text-accent">свой бизнес</span>?
            </h2>
            <p className="text-base md:text-lg text-background/75 mb-7">
              Выберите свою сферу и найдите задачи, которые каждый день приходится решать вам и вашей команде.
            </p>

            <div className="flex flex-wrap gap-2.5 mb-5">
              {industries.map((ind) => (
                <Button
                  key={ind.id}
                  type="button"
                  variant="ghost"
                  aria-pressed={activeId === ind.id}
                  onClick={() => {
                    setActiveId(ind.id);
                    setOpenId(null);
                    setContactIntent(null);
                    saveContactContext(ind);
                  }}
                  className={`h-auto px-6 md:px-8 py-3 rounded-full font-semibold text-sm md:text-base border transition-all duration-300 ${
                    activeId === ind.id
                      ? "bg-accent border-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"
                      : "bg-background/5 border-background/20 text-background hover:bg-background/10 hover:text-background hover:border-accent/70"
                  }`}
                >
                  {ind.label}
                </Button>
              ))}
            </div>

            <p className="text-sm md:text-base text-background/60 mb-8">Нажмите на вопрос, чтобы увидеть, что можно сделать</p>

            <PillButton onClick={() => scrollToContact()} variant="turquoise">
              Обсудить задачу
            </PillButton>
            </div>

            <div className="relative">
              <img
                src={chatDeco}
                alt=""
                width={1024}
                height={1024}
                loading="lazy"
                className="pointer-events-none absolute -top-14 -right-6 md:-right-10 z-10 w-24 md:w-36"
              />
              <div className={`relative flex flex-col rounded-[28px] bg-background/[0.04] ring-1 ring-background/10 backdrop-blur-sm overflow-hidden ${chatMinH[industry.id] ?? ""}`}>
                <div className="flex items-center gap-3 px-5 md:px-6 py-4 md:py-3 border-b border-background/10">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-background leading-tight">Вопросы собственников · {industry.label}</p>
                    <p className="text-xs text-background/50 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> на связи
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-3 md:gap-2.5 px-4 md:px-6 py-5 md:py-4">
                  {items.map((it) => <Bubble key={it.q.id} item={it} side={it.idx % 2 === 0 ? "l" : "r"} />)}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {openItem && (
              <div ref={answerRef} id="industry-question-answer" aria-live="polite" className="scroll-mt-24 mt-10 rounded-2xl bg-background/5 ring-1 ring-background/10 p-6 md:p-8">
                {openItem.topic && <p className="mb-3 text-sm font-semibold text-accent">{openItem.topic}</p>}
                <p className="font-semibold text-background text-lg mb-5">{openItem.q}</p>
                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Проблема</p>
                    <p className="text-base text-background/70 leading-relaxed">{openItem.problem}</p>
                    <p className="mt-4 text-xs uppercase tracking-widest text-accent font-semibold mb-2">Возможная причина</p>
                    <p className="text-base text-background/70 leading-relaxed">{openItem.cause}</p>
                    <p className="mt-4 text-xs uppercase tracking-widest text-accent font-semibold mb-2">Ручные действия</p>
                    <ul className="list-disc pl-5 text-base text-background/70 leading-relaxed">{openItem.actions.map(a => <li key={a.id}>{a.label}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Возможное решение</p>
                    <p className="text-base text-background leading-relaxed">{openItem.solution}</p>
                    <p className="mt-4 text-xs uppercase tracking-widest text-accent font-semibold mb-2">Как измерить результат</p>
                    <p className="text-base text-background leading-relaxed">{openItem.criterion}</p>
                    {!openItem.caseRef && <p className="mt-4 text-sm text-background/70 leading-relaxed">{openItem.evidence}</p>}
                  </div>
                </div>
                {openItem.caseRef && (
                  <div className="mt-6 rounded-xl bg-accent/10 ring-1 ring-accent/20 p-5">
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1.5">Похожий проект</p>
                    <p className="text-sm font-semibold text-background leading-snug">{openItem.caseRef.title}</p>
                    <p className="mt-1 text-sm text-background/70 leading-relaxed">{openItem.caseRef.text}</p>
                    {openItem.caseRef.to && (
                      <Link to={openItem.caseRef.to} className="mt-2 inline-flex items-center text-sm font-semibold text-accent hover:underline">
                        Читать кейс <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    )}
                  </div>
                )}
                <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                  <PillButton variant="turquoise" size="md" onClick={() => {
                    saveContactContext(industry, openItem);
                    setContactIntent(null);
                    scrollToContact();
                  }}>Обсудить такую задачу</PillButton>
                  <PillButton variant="light" size="md" to={`/start?scenario=${encodeURIComponent(openItem.id)}`} onClick={() => {
                    saveContactContext(industry, openItem);
                    setContactIntent(null);
                    requestDiagnosticAutostart();
                  }}>Проверить этот процесс бесплатно</PillButton>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryQuestions;
