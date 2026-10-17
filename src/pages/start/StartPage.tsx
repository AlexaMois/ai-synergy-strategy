import { useState, useRef, useEffect } from "react";
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
import { setContactIntent } from "@/lib/contactIntent";
import {
  consumeDiagnosticAutostart,
  isDiagnosticStarted,
  markDiagnosticStarted,
} from "@/lib/diagnosticState";

const StartPage = () => {
  const [diagnosticStarted, setDiagnosticStarted] = useState(
    () => hasDiagnosticDraft() || isDiagnosticStarted()
  );

  const diagnosticRef = useRef<HTMLDivElement>(null);

  const startDiagnostic = () => {
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
    if (consumeDiagnosticAutostart()) startDiagnostic();
    const onOpen = () => startDiagnostic();
    window.addEventListener("self-start:open", onOpen);
    return () => window.removeEventListener("self-start:open", onOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookMeeting = () => {
    setContactIntent({ kind: "meeting" });
    scrollToContact();
  };


  const flow = [
    "Задача бизнеса",
    "Текущий процесс",
    "Потери времени и денег",
    "Ограничения",
    "Варианты решения",
    "Первый приоритет",
  ];

  const results = [
    "приоритетная задача",
    "решение для первой проверки",
    "ключевые ограничения и риски",
    "понятный следующий шаг",
  ];


  return (
    <PageTransition>
      <Helmet>
        <title>Бесплатная проверка процесса и личный разбор · 17 000 ₽ | Александра Моисеева</title>
        <meta
          name="description"
          content="Самостоятельная проверка одного процесса бесплатно с результатом и PDF или личный разбор с Александрой за 17 000 ₽. Онлайн по всей России."
        />
        <meta
          name="keywords"
          content="разбор цифровых задач, автоматизация процессов, с чего начать автоматизацию, стратегия цифрового развития, аудит процессов"
        />
        <link rel="canonical" href="https://aleksamois.ru/start/" />
        <meta property="og:title" content="Бесплатная проверка процесса и личный разбор · 17 000 ₽ | Александра Моисеева" />
        <meta
          property="og:description"
          content="Бесплатная проверка одного процесса с PDF или личный разбор с Александрой за 17 000 ₽."
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

      <div className="min-h-screen bg-background">
        <PageBreadcrumbs currentPage="С чего начать" />

        <main>
          <section className="container mx-auto max-w-7xl px-4 pt-6 md:pt-12 pb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">С чего начать</h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Не знаете, что стоит менять первым? Проверьте один рабочий процесс самостоятельно или обсудите ситуацию с экспертом.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-[28px] bg-surface-mint shadow-card p-6 md:p-8 flex flex-col items-start">
                <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">Самостоятельно</p>
                <h2 className="!text-[20px] md:!text-[24px] !font-bold !leading-[1.2] text-foreground mb-4">Узнайте, где процесс забирает время</h2>
                <p className="text-[16px] font-normal text-muted-foreground leading-relaxed mb-5">Ответьте на вопросы о работе сотрудников, задержках и ошибках. Получите предварительные выводы и первый шаг для проверки.</p>
                <p className="text-[20px] md:text-[22px] font-bold text-foreground mb-1">Бесплатно</p>
                <p className="text-sm md:text-base text-muted-foreground mb-7">Без регистрации и обязательного звонка.</p>
                <PillButton onClick={startDiagnostic} variant="dark" size="md" className="mt-auto">Проверить свой процесс →</PillButton>
              </div>
              <div className="rounded-[28px] bg-foreground shadow-card p-6 md:p-8 flex flex-col items-start">
                <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-background/60 mb-4">С Александрой</p>
                <h2 className="!text-[20px] md:!text-[24px] !font-bold !leading-[1.2] text-background mb-4">Разберём, что менять в первую очередь</h2>
                <p className="text-[16px] font-normal text-background/85 leading-relaxed mb-5">На личной встрече разберём вашу ситуацию, ограничения и варианты решения. Определим приоритет и дальнейшие действия.</p>
                <p className="text-[20px] md:text-[22px] font-bold text-accent mb-1">17 000 ₽</p>
                <p className="text-sm md:text-base text-background/70 mb-7">Самостоятельная экспертная услуга.</p>
                <PillButton onClick={bookMeeting} variant="turquoise" size="md" className="mt-auto">Записаться на разбор →</PillButton>
              </div>
            </div>
            <p className="mt-6 text-base md:text-lg text-foreground">
              Уже знаете, что хотите внедрить?{" "}
              <button
                type="button"
                onClick={scrollToContact}
                className="font-semibold text-accent underline-offset-4 hover:underline"
              >
                Сразу обсудить задачу →
              </button>
            </p>
          </section>
          {diagnosticStarted && (
            <section ref={diagnosticRef} id="self-check" className="container mx-auto px-4 pt-6 pb-12 scroll-mt-24">
              <DiagnosticForm />
            </section>
          )}
          {/* 3. Что происходит на встрече + что Вы получите */}
          <section
            id="result"
            className="bg-background container mx-auto max-w-7xl px-4 pt-8 md:pt-12 pb-12 md:pb-16 scroll-mt-24"
          >
            <div className="grid md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-5 rounded-[24px] md:rounded-[32px] bg-foreground text-background px-6 md:px-8 py-8 md:py-10 shadow-card">
                <h2 className="text-2xl md:text-4xl font-bold text-background leading-[1.08] mb-6 md:mb-8">
                  Что происходит на встрече
                </h2>
                <div className="border-t border-background/15 mb-6 md:mb-8">
                  {flow.map((step, i) => (
                    <div
                      key={step}
                      className="flex items-baseline gap-4 border-b border-background/15 py-3.5"
                    >
                      <span className="text-base md:text-lg font-bold text-accent tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base md:text-lg text-background/85">{step}</span>
                    </div>
                  ))}
                </div>
                <p className="text-base md:text-lg text-background/70 leading-snug">
                  Каждый инструмент должен работать в привычной среде компании, снижать ручную нагрузку и помогать руководителю видеть ситуацию яснее
                </p>
              </div>

              <div className="md:col-span-7 md:pl-6">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.08] mb-6 md:mb-8">
                  Что Вы получите после разбора
                </h2>
                <ul className="mb-8 md:mb-10 border-t border-border">
                  {results.map((r) => (
                    <li key={r} className="flex items-start gap-4 border-b border-border py-5 md:py-6">
                      <Check className="w-6 h-6 text-accent mt-1 shrink-0" strokeWidth={2} />
                      <span className="text-lg md:text-2xl text-foreground leading-snug">{r}</span>
                    </li>
                  ))}
                </ul>
                <p className="rounded-2xl bg-accent px-5 py-4 text-sm md:text-base font-semibold text-accent-foreground leading-snug max-w-xl">
                  Разбор является самостоятельным продуктом. После встречи Вы сами решаете, двигаться дальше с «НейроРешениями» или использовать рекомендации внутри компании.
                </p>
                <PillButton onClick={bookMeeting} variant="dark" size="md" className="mt-6">Записаться на разбор</PillButton>
              </div>
            </div>
          </section>

        </main>

        <FAQTeaser
          items={[
            { question: "Что такое разбор цифровых задач для собственника?", answer: "Это онлайн/офлайн встреча, на которой мы разбираем задачу бизнеса, текущий процесс, ручную нагрузку и потери, а затем определяем первый приоритет и подходящий формат решения" },
            { question: "Нужно ли продолжать работу после разбора?", answer: "Нет. Разбор является самостоятельным законченным продуктом. Решение о продолжении работы с «НейроРешениями» Вы принимаете отдельно." },
            { question: "Что подготовить к разбору?", answer: "Достаточно кратко описать компанию, текущую задачу и процессы, которые забирают больше всего времени. Документы и примеры можно подключить на следующем этапе." },
            { question: "Как проходит работа с компаниями из других регионов?", answer: "Разбор задачи и разработка стратегии проходят дистанционно. Для глубокого аудита при необходимости подключается очный этап." },
          ]}
        />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default StartPage;
