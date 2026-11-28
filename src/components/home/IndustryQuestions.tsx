import { useEffect, useRef, useState } from "react";
import { industries, type Industry, type IndustryScenario as Question } from "@/data/industryScenarios";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { scrollToContact } from "@/lib/scrollToContact";
import PillButton from "@/components/PillButton";
import { Button } from "@/components/ui/button";
import { requestDiagnosticAutostart } from "@/lib/diagnosticState";
import { setContactIntent } from "@/lib/contactIntent";

const CONTACT_CONTEXT_STORAGE_KEY = "aleksamois.contactContext";
const CONTACT_CONTEXT_EVENT = "aleksamois:contact-context";

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

  const QuestionRow = ({ item }: { item: (typeof items)[number] }) => {
    const isOpen = openId === item.q.id;
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
        className="bt-industry-row group"
      >
        <span><span aria-hidden="true">{String(item.idx + 1).padStart(2, "0")}</span><span>{item.short}</span><ChevronRight size={16} aria-hidden="true" /></span>
      </Button>
    );
  };

  return (
    <section id="industry-questions" className="scroll-mt-20 px-4 md:px-6 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="relative rounded-[32px] md:rounded-[40px] bg-foreground overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-10 lg:px-14 py-12 md:py-14">
          <div className="relative grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 lg:gap-8 items-center">
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
              <div className="bt-industry-panel relative flex flex-col">
                <div className="flex items-center gap-3 px-5 md:px-6 py-4 md:py-3 border-b border-background/10">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-background leading-tight">Вопросы собственников · {industry.label}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-3">
                  {items.map((it) => <QuestionRow key={it.q.id} item={it} />)}
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
