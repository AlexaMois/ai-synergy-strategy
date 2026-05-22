import { useState, useRef, useCallback } from "react";
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
    },
    {
      icon: Map,
      situation: "Нужен план на 90 дней",
      format: "Разработка стратегии цифрового развития бизнеса",
    },
    {
      icon: Search,
      situation: "Нужно подробно разобрать процессы, документы и инструменты",
      format: "Глубокий аудит компании для цифровизации",
    },
    {
      icon: GraduationCap,
      situation: "Нужно обучить сотрудников",
      format: "Авторская программа «Цифровые инструменты для бизнеса»",
    },
    {
      icon: Wrench,
      situation: "Уже есть задача для внедрения",
      format: "Сопровождение цифрового внедрения",
    },
    {
      icon: Layers,
      situation: "Нужен конкретный цифровой инструмент",
      format: "Проектирование и разработка цифрового решения под бизнес-процесс",
    },
    {
      icon: LifeBuoy,
      situation: "Уже есть инструменты, нужна поддержка",
      format: "Сопровождение цифровых инструментов компании",
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
          {/* Hero Section */}
          <section className="py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold text-foreground leading-tight mb-6">
                С чего начать цифровое развитие компании
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Выберите формат под свою ситуацию. Если не уверены — пройдите короткий разбор ниже.
              </p>
            </div>
          </section>

          {/* Formats Section */}
          <section className="pb-12 md:pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {formats.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="bg-card border border-border rounded-2xl p-6 hover:shadow-card transition-shadow duration-300 flex flex-col"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.situation}</p>
                      <p className="text-base font-semibold text-foreground leading-snug">
                        {item.format}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Quiz teaser */}
          <section className="py-10 md:py-14 bg-muted">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-5">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-разбор</span>
              </div>
              <p className="text-lg md:text-xl text-foreground mb-6">
                Не уверены, какой формат выбрать? Пройдите короткий разбор и получите рекомендацию.
              </p>
              {!diagnosticStarted && (
                <Button
                  size="lg"
                  onClick={startDiagnostic}
                  className="text-lg px-8 py-6 h-auto"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Запустить разбор
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
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
