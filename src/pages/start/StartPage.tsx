import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet-async";
import { Sparkles, ArrowRight } from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import AIDiagnostic from "@/components/ai-calculator/AIDiagnostic";
import FAQTeaser from "@/components/FAQTeaser";
import { DiagnosticData, CalculationResult } from "@/components/ai-calculator/types";
import { trackCTAClick } from "@/utils/analytics";
import chatHeartSketch from "@/assets/sketches/chat-heart-sketch.png";
import routeWarmSketch from "@/assets/sketches/route-warm-sketch.png";
import auditCareSketch from "@/assets/sketches/audit-care-sketch.png";
import bookAiSketch from "@/assets/sketches/book-ai-sketch.png";
import handsChipSketch from "@/assets/sketches/hands-chip-sketch.png";
import blueprintPlantSketch from "@/assets/sketches/blueprint-plant-sketch.png";
import teaLaptopSketch from "@/assets/sketches/tea-laptop-sketch.png";
import brainHeartSketch from "@/assets/sketches/brain-heart-sketch.png";

const PillButton = ({
  to,
  onClick,
  children,
  variant = "dark",
  className = "",
}: {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "dark" | "light" | "turquoise";
  className?: string;
}) => {
  const styles = {
    dark: "bg-foreground text-background hover:bg-foreground/90",
    light: "bg-background text-foreground hover:bg-background/90",
    turquoise: "bg-accent text-accent-foreground hover:bg-primary-dark",
  }[variant];
  const iconBg = {
    dark: "bg-accent text-accent-foreground",
    light: "bg-foreground text-background",
    turquoise: "bg-background text-foreground",
  }[variant];
  const cls = `group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 ${styles} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span
        className={`flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full ${iconBg} group-hover:translate-x-0.5 transition-transform`}
      >
        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
      </span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
};

const StartPage = () => {
  const [diagnosticStarted, setDiagnosticStarted] = useState(false);
  
  const diagnosticRef = useRef<HTMLDivElement>(null);

  const startDiagnostic = () => {
    setDiagnosticStarted(true);
    setTimeout(() => {
      diagnosticRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDiagnosticComplete = useCallback((data: DiagnosticData, result: CalculationResult) => {
    // Results handled within AIDiagnostic component
  }, []);

  const handleCTA = useCallback(() => {
    trackCTAClick({ location: 'other', buttonText: 'Start Page CTA' });
  }, []);

  const formats = [
    {
      sketch: chatHeartSketch,
      situation: "Нужно быстро понять первый шаг",
      format: "Стратегическая встреча по цифровизации для собственника",
      to: "/services/owner-digital-session",
    },
    {
      sketch: routeWarmSketch,
      situation: "Нужен план на 90 дней",
      format: "Разработка стратегии цифрового развития бизнеса",
      to: "/services/digital-development-strategy",
    },
    {
      sketch: auditCareSketch,
      situation: "Нужно подробно разобрать процессы, документы и инструменты",
      format: "Глубокий аудит компании для цифровизации",
      to: "/services/digital-audit",
    },
    {
      sketch: bookAiSketch,
      situation: "Нужно обучить сотрудников",
      format: "Авторская программа «Цифровые инструменты для бизнеса»",
      to: "/services/digital-tools-program",
    },
    {
      sketch: handsChipSketch,
      situation: "Уже есть задача для внедрения",
      format: "Сопровождение цифрового внедрения",
      to: "/services/implementation-support",
    },
    {
      sketch: blueprintPlantSketch,
      situation: "Нужен конкретный цифровой инструмент",
      format: "Проектирование и разработка цифрового решения под бизнес-процесс",
      to: "/services/digital-solution-design",
    },
    {
      sketch: teaLaptopSketch,
      situation: "Уже есть инструменты, нужна поддержка",
      format: "Сопровождение цифровых инструментов компании",
      to: "/services/digital-tools-support",
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>С чего начать цифровое развитие бизнеса — выбор формата работы</title>
        <meta name="description" content="Выберите подходящий формат работы: стратегическая встреча, стратегия цифрового развития, глубокий аудит, обучение, внедрение, разработка или сопровождение." />
        <meta name="keywords" content="диагностика бизнес процессов, аудит автоматизации, где внедрять ИИ, ROI автоматизации, экспресс аудит процессов" />
        <link rel="canonical" href="https://aleksamois.ru/start" />
        <meta property="og:title" content="С чего начать цифровое развитие бизнеса — выбор формата работы" />
        <meta property="og:description" content="Выберите подходящий формат работы: стратегическая встреча, стратегия цифрового развития, глубокий аудит, обучение, внедрение, разработка или сопровождение." />
        <meta property="og:url" content="https://aleksamois.ru/start" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.start())}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <PageBreadcrumbs currentPage="С чего начать" />
        
        <main>
          {/* HERO — большая розовая плашка (контраст с бирюзовой главной) */}
          <section className="pt-8 md:pt-12 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="relative rounded-[32px] md:rounded-[40px] bg-surface-blush overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
                <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 py-12 md:py-20">
                  <div className="md:col-span-7">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6">
                      С чего начать
                    </p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.02] tracking-tight text-foreground mb-6">
                      С чего начать{" "}
                      <span className="font-iriska font-normal italic text-accent">
                        цифровое развитие
                      </span>{" "}
                      компании
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/75 mb-6 max-w-xl leading-snug">
                      Помогу выбрать первый шаг: стратегическую встречу, аудит, обучение, внедрение, разработку или сопровождение
                    </p>
                    <p className="text-lg md:text-xl text-foreground/75 mb-10 max-w-xl leading-snug">
                      Если пока не уверены, пройдите короткий аудит
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <PillButton onClick={startDiagnostic} variant="dark">
                        Запустить разбор
                      </PillButton>
                      <Link
                        to="/services"
                        className="inline-flex items-center text-foreground/80 hover:text-foreground underline-offset-4 hover:underline font-semibold text-base md:text-lg px-2 py-2"
                      >
                        Все форматы работы <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                  <div className="md:col-span-5 flex justify-center md:justify-end">
                    <img
                      src={brainHeartSketch}
                      alt=""
                      width={800}
                      height={800}
                      className="w-56 md:w-72 lg:w-80 h-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Formats — сетка плашек в стиле главной */}
          <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                Выберите{" "}
                <span className="font-iriska font-normal italic text-accent">формат</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Каждый формат закрывает конкретную управленческую задачу: от первого разбора
                процессов до внедрения и регулярного сопровождения цифровых инструментов.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[260px] lg:grid-flow-dense">
              {formats.map((item, i) => {
                const palettes = [
                  { bg: "bg-surface-mint", text: "text-foreground", muted: "text-foreground/70" },
                  { bg: "bg-accent", text: "text-white", muted: "text-white/85" },
                  { bg: "bg-surface-sand", text: "text-foreground", muted: "text-foreground/70" },
                  { bg: "bg-surface-lavender", text: "text-foreground", muted: "text-foreground/70" },
                  { bg: "bg-surface-blush", text: "text-foreground", muted: "text-foreground/70" },
                  { bg: "bg-card", text: "text-foreground", muted: "text-muted-foreground" },
                  { bg: "bg-foreground", text: "text-background", muted: "text-background/70" },
                ];
                // Асимметричная masonry-сетка на 12 колонок.
                // Карточка #1 (стратегия) — флагман: широкая и в две строки.
                // Карточки #5 и #6 — широкие нижние полосы.
                const layouts = [
                  { span: "lg:col-span-4 lg:row-span-1", size: "sm" }, // 0 чат
                  { span: "lg:col-span-5 lg:row-span-2", size: "xl" }, // 1 стратегия — флагман
                  { span: "lg:col-span-3 lg:row-span-1", size: "sm" }, // 2 аудит
                  { span: "lg:col-span-4 lg:row-span-1", size: "md" }, // 3 обучение
                  { span: "lg:col-span-3 lg:row-span-1", size: "sm" }, // 4 внедрение
                  { span: "lg:col-span-7 lg:row-span-1", size: "wide" },// 5 проектирование — широкая
                  { span: "lg:col-span-5 lg:row-span-1", size: "wide" },// 6 поддержка — широкая тёмная
                ];
                const p = palettes[i % palettes.length];
                const l = layouts[i];
                const isFlagship = l.size === "xl";
                const isWide = l.size === "wide";
                const sketchCls = isFlagship
                  ? "w-52 md:w-72 lg:w-80"
                  : isWide
                  ? "w-40 md:w-48"
                  : "w-32 md:w-40";
                const titleCls = isFlagship
                  ? "text-2xl md:text-3xl lg:text-4xl"
                  : isWide
                  ? "text-xl md:text-2xl"
                  : "text-lg md:text-xl";
                return (
                  <Link
                    key={i}
                    to={item.to}
                    className={`group relative flex flex-col rounded-[28px] ${p.bg} p-7 md:p-8 overflow-hidden shadow-card hover:shadow-plate hover:-translate-y-1 transition-all duration-300 ring-1 ring-foreground/5 ${l.span} min-h-[260px]`}
                  >
                    <img
                      src={item.sketch}
                      alt=""
                      width={512}
                      height={512}
                      loading="lazy"
                      className={`absolute -bottom-4 -right-4 ${sketchCls} h-auto object-contain opacity-90 pointer-events-none`}
                    />
                    <p className={`text-sm ${p.muted} mb-2 relative max-w-[80%]`}>{item.situation}</p>
                    <h3 className={`${titleCls} font-bold ${p.text} leading-[1.05] mb-6 relative max-w-[80%]`}>
                      {item.format}
                    </h3>
                    <div className="mt-auto flex items-center justify-between relative">
                      <span className={`text-sm font-semibold ${p.text}`}>Подробнее</span>
                      <ArrowRight className={`h-5 w-5 ${p.text} opacity-70 group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* AI-разбор — бирюзовая плашка с приглашением */}
          <section className="px-4 md:px-6 pb-16 md:pb-24">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[32px] md:rounded-[40px] bg-accent overflow-hidden shadow-plate ring-1 ring-foreground/5">
                <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 py-14 md:py-20">
                  <div className="md:col-span-7">
                    <div className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full mb-5">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-semibold">AI-разбор</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.05] mb-5">
                      Не уверены, какой{" "}
                      <span className="font-iriska font-normal italic text-white">формат</span>{" "}
                      выбрать?
                    </h2>
                    <p className="text-base md:text-lg text-white/85 mb-10 max-w-xl">
                      Пройдите короткий разбор. Он займёт несколько минут и поможет понять,
                      что сейчас актуальнее: стратегическая встреча, стратегия цифрового
                      развития, глубокий аудит, обучение, внедрение, разработка или сопровождение.
                    </p>
                    {!diagnosticStarted && (
                      <PillButton onClick={startDiagnostic} variant="light">
                        Запустить разбор
                      </PillButton>
                    )}
                  </div>
                  <div className="md:col-span-5 flex justify-center md:justify-end">
                    <img
                      src={chatHeartSketch}
                      alt=""
                      width={800}
                      height={800}
                      loading="lazy"
                      className="w-56 md:w-72 lg:w-80 h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Diagnostic Section */}
          {diagnosticStarted && (
            <section ref={diagnosticRef} className="py-10 md:py-16 bg-muted">
              <div className="container mx-auto px-4">
                <AIDiagnostic 
                  onComplete={handleDiagnosticComplete}
                  onCTA={handleCTA}
                />
              </div>
            </section>
          )}
        </main>

        <FAQTeaser
          items={[
            { question: "Как понять, какой формат мне подходит?", answer: "Начните с текущей задачи. Если нужен первый шаг — подойдёт стратегическая встреча. Если нужен план на 90 дней — стратегия цифрового развития. Если требуется подробный разбор процессов, данных и инструментов — глубокий аудит." },
            { question: "Можно начать с короткого разбора?", answer: "Да. Короткий разбор помогает быстро определить, какая задача сейчас главная: стратегия, аудит, обучение, внедрение, разработка или сопровождение." },
            { question: "Что нужно подготовить перед первым обращением?", answer: "Достаточно кратко описать компанию, текущую задачу и процессы, которые забирают больше всего времени. Документы, таблицы и примеры можно подключить уже на следующем этапе." },
            { question: "Что я получу после выбора формата?", answer: "Вы получите понятный следующий шаг: какой формат подходит, какие процессы стоит разобрать первыми и как двигаться дальше без лишних действий." },
          ]}
        />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default StartPage;
