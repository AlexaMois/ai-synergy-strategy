import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Compass, Map, Search, GraduationCap, Wrench, Layers, LifeBuoy, ArrowRight } from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import AIDiagnostic from "@/components/ai-calculator/AIDiagnostic";
import FAQTeaser from "@/components/FAQTeaser";
import { DiagnosticData, CalculationResult } from "@/components/ai-calculator/types";
import { trackCTAClick } from "@/utils/analytics";
import compassSketch from "@/assets/sketches/compass-sketch.png";
import chatSketch from "@/assets/sketches/chat-sketch.png";

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
      icon: Compass,
      situation: "Нужно быстро понять первый шаг",
      format: "Стратегическая встреча по цифровизации для собственника",
      to: "/services/owner-digital-session",
    },
    {
      icon: Map,
      situation: "Нужен план на 90 дней",
      format: "Разработка стратегии цифрового развития бизнеса",
      to: "/services/digital-development-strategy",
    },
    {
      icon: Search,
      situation: "Нужно подробно разобрать процессы, документы и инструменты",
      format: "Глубокий аудит компании для цифровизации",
      to: "/services/digital-audit",
    },
    {
      icon: GraduationCap,
      situation: "Нужно обучить сотрудников",
      format: "Авторская программа «Цифровые инструменты для бизнеса»",
      to: "/services/digital-tools-program",
    },
    {
      icon: Wrench,
      situation: "Уже есть задача для внедрения",
      format: "Сопровождение цифрового внедрения",
      to: "/services/implementation-support",
    },
    {
      icon: Layers,
      situation: "Нужен конкретный цифровой инструмент",
      format: "Проектирование и разработка цифрового решения под бизнес-процесс",
      to: "/services/digital-solution-design",
    },
    {
      icon: LifeBuoy,
      situation: "Уже есть инструменты, нужна поддержка",
      format: "Сопровождение цифровых инструментов компании",
      to: "/services/digital-tools-support",
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Диагностика автоматизации бизнес‑процессов — где ИИ окупится за 3–6 месяцев | Александра Моисеева</title>
        <meta name="description" content="Онлайн‑диагностика: находим 3–5 процессов, где автоматизация с ИИ даёт быстрый ROI без переделки всей IT‑системы и найма армии интеграторов." />
        <meta name="keywords" content="диагностика бизнес процессов, аудит автоматизации, где внедрять ИИ, ROI автоматизации, экспресс аудит процессов" />
        <link rel="canonical" href="https://aleksamois.ru/start" />
        <meta property="og:title" content="Диагностика автоматизации бизнес‑процессов — где ИИ окупится за 3–6 месяцев | Александра Моисеева" />
        <meta property="og:description" content="Онлайн‑диагностика: находим 3–5 процессов, где автоматизация с ИИ даёт быстрый ROI без переделки всей IT‑системы и найма армии интеграторов." />
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
          {/* HERO — большая бирюзовая плашка */}
          <section className="pt-8 md:pt-12 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="relative rounded-[32px] md:rounded-[40px] bg-accent overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
                <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 py-12 md:py-20">
                  <div className="md:col-span-7">
                    <p className="text-sm uppercase tracking-widest text-background/80 font-semibold mb-6">
                      С чего начать
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-background mb-6">
                      Подберём{" "}
                      <span className="font-iriska font-normal italic text-background/95">
                        формат работы
                      </span>{" "}
                      под вашу ситуацию
                    </h1>
                    <p className="text-lg md:text-xl text-background/90 mb-10 max-w-xl leading-snug">
                      Выберите формат под свою задачу. Если не уверены — пройдите короткий разбор,
                      и я подскажу, с чего начать.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <PillButton onClick={startDiagnostic} variant="light">
                        Запустить разбор
                      </PillButton>
                      <Link
                        to="/services"
                        className="inline-flex items-center text-background/90 hover:text-background underline-offset-4 hover:underline font-semibold text-base md:text-lg px-2 py-2"
                      >
                        Все форматы работы <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                  <div className="md:col-span-5 flex justify-center md:justify-end">
                    <img
                      src={compassSketch}
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
              <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-5">
                Выберите{" "}
                <span className="font-iriska font-normal italic text-accent">формат</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Каждый формат закрывает конкретную управленческую задачу: от первого разбора до
                внедрения и регулярного сопровождения цифровых инструментов.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {formats.map((item, i) => {
                const Icon = item.icon;
                const palettes = [
                  { bg: "bg-surface-mint", text: "text-foreground", muted: "text-foreground/70", iconBg: "bg-accent/15 text-accent" },
                  { bg: "bg-accent", text: "text-background", muted: "text-background/80", iconBg: "bg-background/20 text-background" },
                  { bg: "bg-surface-sand", text: "text-foreground", muted: "text-foreground/70", iconBg: "bg-accent/15 text-accent" },
                  { bg: "bg-surface-lavender", text: "text-foreground", muted: "text-foreground/70", iconBg: "bg-accent/15 text-accent" },
                  { bg: "bg-surface-blush", text: "text-foreground", muted: "text-foreground/70", iconBg: "bg-accent/15 text-accent" },
                  { bg: "bg-card", text: "text-foreground", muted: "text-muted-foreground", iconBg: "bg-accent/15 text-accent" },
                  { bg: "bg-foreground", text: "text-background", muted: "text-background/70", iconBg: "bg-accent/20 text-accent" },
                ];
                const p = palettes[i % palettes.length];
                return (
                  <Link
                    key={i}
                    to={item.to}
                    className={`group relative flex flex-col rounded-[28px] ${p.bg} p-7 md:p-8 min-h-[240px] overflow-hidden shadow-card hover:shadow-plate hover:-translate-y-1 transition-all duration-300 ring-1 ring-foreground/5`}
                  >
                    <div className={`w-11 h-11 rounded-xl ${p.iconBg} flex items-center justify-center mb-5`}>
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <p className={`text-sm ${p.muted} mb-2`}>{item.situation}</p>
                    <h3 className={`text-lg md:text-xl font-bold ${p.text} leading-tight mb-6`}>
                      {item.format}
                    </h3>
                    <div className="mt-auto flex items-center justify-between">
                      <span className={`text-sm font-semibold ${p.text}`}>Подробнее</span>
                      <ArrowRight className={`h-5 w-5 ${p.text} opacity-70 group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* AI-разбор — плашка с приглашением */}
          <section className="px-4 md:px-6 pb-16 md:pb-24">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[32px] md:rounded-[40px] bg-surface-blush overflow-hidden shadow-plate ring-1 ring-foreground/5">
                <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 py-14 md:py-20">
                  <div className="md:col-span-7">
                    <div className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-2 rounded-full mb-5">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-semibold">AI-разбор</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] mb-5">
                      Не уверены, какой{" "}
                      <span className="font-iriska font-normal italic text-accent">формат</span>{" "}
                      выбрать?
                    </h2>
                    <p className="text-base md:text-lg text-foreground/75 mb-10 max-w-xl">
                      Пройдите короткий разбор — он займёт несколько минут. На выходе получите
                      рекомендацию по формату работы под вашу ситуацию.
                    </p>
                    {!diagnosticStarted && (
                      <PillButton onClick={startDiagnostic} variant="dark">
                        Запустить разбор
                      </PillButton>
                    )}
                  </div>
                  <div className="md:col-span-5 flex justify-center md:justify-end">
                    <img
                      src={chatSketch}
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
            { question: "Сколько времени занимает диагностика?", answer: "Около 30 минут на онлайн-разговор и до недели на разбор материалов и подготовку выводов." },
            { question: "Нужно ли готовить что-то заранее?", answer: "Нет. Достаточно общего описания процессов. Всё остальное разберём вместе на встрече." },
            { question: "Это платно?", answer: "Первая 30-минутная консультация — бесплатно. Полная диагностика — оплачивается отдельно по фиксированной стоимости." },
            { question: "Что я получу на выходе?", answer: "Карту процессов, перечень задач под автоматизацию, расчёт экономики и рекомендованный план внедрения." },
          ]}
        />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default StartPage;
