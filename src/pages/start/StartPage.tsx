import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check } from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import DiagnosticForm, { hasDiagnosticDraft } from "@/components/diagnostic/DiagnosticForm";
import FAQTeaser from "@/components/FAQTeaser";
import { openTaskModal } from "@/components/CallbackModal";
import brainHeartSketch from "@/assets/sketches/brain-heart-sketch.webp";

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
  const [diagnosticStarted, setDiagnosticStarted] = useState(() => hasDiagnosticDraft());
  
  const diagnosticRef = useRef<HTMLDivElement>(null);
  const diagnosticIntroRef = useRef<HTMLDivElement>(null);

  const startDiagnostic = () => {
    setDiagnosticStarted(true);
    setTimeout(() => {
      diagnosticRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Кнопка первого экрана: раскрыть анкету и сразу прокрутить к ней
  const goToDiagnostic = () => {
    setDiagnosticStarted(true);
    setTimeout(() => {
      (diagnosticRef.current ?? diagnosticIntroRef.current)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 120);
  };

  const formats = [
    { title: "Стратегическая встреча", note: "быстро определить первый шаг", to: "/services/owner-digital-session" },
    { title: "Стратегия на 90 дней", note: "получить последовательный план изменений", to: "/services/digital-development-strategy" },
    { title: "Глубокий аудит", note: "подробно разобрать процессы, данные и инструменты", to: "/services/digital-audit" },
    { title: "Обучение", note: "подготовить сотрудников к работе с цифровыми инструментами", to: "/services/digital-tools-program" },
    { title: "Сопровождение внедрения", note: "реализовать выбранную задачу", to: "/services/implementation-support" },
    { title: "Разработка решения", note: "создать конкретный цифровой инструмент", to: "/services/digital-solution-design" },
    { title: "Поддержка", note: "сопровождать действующую систему", to: "/services/digital-tools-support" },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>С чего начать оптимизацию бизнеса</title>
        <meta name="description" content="Найдём один процесс, где автоматизация быстрее всего сэкономит время, снизит количество ошибок и вернёт руководителю контроль." />
        <meta name="keywords" content="диагностика бизнес процессов, аудит автоматизации, где внедрять ИИ, ROI автоматизации, экспресс аудит процессов" />
        <link rel="canonical" href="https://aleksamois.ru/start/" />
        <meta property="og:title" content="С чего начать оптимизацию бизнеса" />
        <meta property="og:description" content="Найдём один процесс, где автоматизация быстрее всего сэкономит время, снизит количество ошибок и вернёт руководителю контроль." />
        <meta property="og:url" content="https://aleksamois.ru/start/" />
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
          <section className="pt-6 md:pt-12 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="relative rounded-[24px] md:rounded-[40px] bg-surface-blush overflow-hidden shadow-card ring-1 ring-foreground/5">
                <div className="grid md:grid-cols-12 gap-6 md:gap-4 items-center px-5 md:px-10 lg:px-14 py-7 md:py-14">
                  <div className="md:col-span-7">
                    <p className="text-xs sm:text-sm uppercase tracking-widest text-accent font-semibold mb-4 md:mb-6">
                      С чего начать
                    </p>
                    <h1 className="text-[1.6rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.12] sm:leading-[1.05] md:leading-[1.02] tracking-tight text-foreground mb-4 md:mb-6">
                      С чего начать оптимизацию бизнеса
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-foreground/75 mb-5 max-w-xl leading-snug">
                      Найдём один процесс, где автоматизация быстрее всего сэкономит время, снизит количество ошибок и вернёт руководителю контроль.
                    </p>
                    <ul className="space-y-2.5 mb-6 md:mb-8">
                      {[
                        "определим главное узкое место",
                        "выберем реалистичный первый шаг",
                        "определим первый шаг и дальнейший маршрут",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/70">
                          <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                      <PillButton onClick={openTaskModal} variant="turquoise" className="w-full sm:w-auto justify-center">
                        Обсудить задачу
                      </PillButton>
                      <PillButton onClick={goToDiagnostic} variant="dark" className="w-full sm:w-auto justify-center">
                        Пройти диагностику
                      </PillButton>
                      <Link
                        to="/services"
                        className="inline-flex items-center justify-center sm:justify-start text-foreground/80 hover:text-foreground underline-offset-4 hover:underline font-semibold text-base md:text-lg px-2 py-3 sm:py-2"
                      >
                        Посмотреть услуги <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                  <div className="md:col-span-5 flex justify-center md:justify-end md:pr-2">
                    <img
                      src={brainHeartSketch}
                      alt="Цифровизация бизнеса — выбор первого процесса для автоматизации"
                      width={800}
                      height={800}
                      loading="lazy"
                      className="w-36 sm:w-44 md:w-60 lg:w-72 h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Предварительная диагностика — вводный блок */}
          <section ref={diagnosticIntroRef} className="px-4 md:px-6 pt-8 md:pt-12 pb-0">
            <div className="container mx-auto max-w-3xl text-center">
              <span className="block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                Предварительная диагностика
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.12] mb-4">
                Разберите один ключевой процесс
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                За 7–10 минут вы опишете один процесс, его масштаб, основные проблемы и
                желаемый результат. Ответы помогут подготовить предметный разговор и
                определить следующий шаг.
              </p>
              {!diagnosticStarted && (
                <div className="mt-10 mb-2">
                  <PillButton onClick={startDiagnostic}>Начать диагностику</PillButton>
                </div>
              )}
            </div>
          </section>

          {/* Анкета из 8 шагов */}
          {diagnosticStarted && (
            <section ref={diagnosticRef} className="pt-10 md:pt-14 pb-10 md:pb-14">
              <div className="container mx-auto px-4">
                <DiagnosticForm />
              </div>
            </section>
          )}

          {/* Возможные следующие шаги — форматы работы */}
          <section className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
            <div className="max-w-3xl mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-[1.12] mb-3">
                Что может быть следующим шагом
              </h2>
              <p className="text-base text-muted-foreground">
                Подходящий формат определим после диагностики или короткого разговора.
              </p>
            </div>
            <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
              {formats.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex items-start justify-between gap-4 px-5 py-4 md:px-6 md:py-5 hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm md:text-base text-foreground">
                      <span className="font-semibold">{item.title}</span>
                      <span className="text-muted-foreground"> — {item.note}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 mt-1 shrink-0 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-start">
              <PillButton to="/services" variant="dark">
                Посмотреть все услуги
              </PillButton>
            </div>
          </section>
        </main>

        <FAQTeaser
          items={[
            { question: "Как понять, какой формат мне подходит?", answer: "Начните с текущей задачи. Если нужен первый шаг — подойдёт стратегическая встреча. Если нужен план на 90 дней — стратегия цифрового развития. Если требуется подробный разбор процессов, данных и инструментов — глубокий аудит." },
            { question: "Можно начать с короткого разбора?", answer: "Да. Короткий разбор помогает быстро определить, какая задача сейчас главная: стратегия, аудит, обучение, внедрение, разработка или сопровождение." },
            { question: "Что нужно подготовить перед первым обращением?", answer: "Достаточно кратко описать компанию, текущую задачу и процессы, которые забирают больше всего времени. Документы, таблицы и примеры можно подключить уже на следующем этапе." },
            { question: "Что произойдёт после диагностики или первого разговора?", answer: "Вы получите понятный следующий шаг: какой формат подходит, какие процессы стоит разобрать первыми и как двигаться дальше без лишних действий." },
          ]}
        />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default StartPage;
