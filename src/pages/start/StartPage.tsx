import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowDown, Check } from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import DiagnosticForm, { hasDiagnosticDraft } from "@/components/diagnostic/DiagnosticForm";
import FAQTeaser from "@/components/FAQTeaser";
import { openTaskModal } from "@/components/CallbackModal";
import PillButton from "@/components/PillButton";
import compassSketch from "@/assets/sketches/compass-sketch.webp";
import handshakeSketch from "@/assets/sketches/handshake-sketch.webp";

const StartPage = () => {
  const [diagnosticStarted, setDiagnosticStarted] = useState(() => hasDiagnosticDraft());

  const diagnosticRef = useRef<HTMLDivElement>(null);
  const diagnosticIntroRef = useRef<HTMLDivElement>(null);

  const startDiagnostic = () => {
    setDiagnosticStarted(true);
    setTimeout(() => {
      (diagnosticRef.current ?? diagnosticIntroRef.current)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  };

  const scrollToResult = () => {
    document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const situations = [
    "В компании много ручной работы, и нужно выбрать первый процесс для изменений.",
    "Есть конкретная задача, и нужно понять, окупятся ли вложения в её решение.",
    "Команда предлагает разные сервисы, а собственнику нужен единый план действий.",
    "Автоматизация уже запускалась, и результат оказался слабее ожиданий.",
    "Перед разработкой нужно определить приоритет, эффект и следующий шаг.",
  ];

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

  const route = [
    {
      title: "Разбор цифровых задач для собственника · 17 000 ₽",
      text: "Определяем первый приоритет.",
      bg: "bg-surface-mint",
    },
    {
      title: "Стратегия цифрового развития · 78 000 ₽",
      text: "Формируем план цифрового развития на 90 дней.",
      bg: "bg-surface-lavender",
    },
    {
      title: "Глубокий аудит · от 116 000 ₽",
      text: "Разбираем несколько процессов, данные, документы и работу команды.",
      bg: "bg-surface-sand",
    },
    {
      title: "Внедрение и сопровождение",
      text: "Запускаем изменения и доводим решение до рабочего результата.",
      bg: "bg-surface-blush",
    },
  ];

  const cases = [
    {
      client: "АкТрансСервис · логистика",
      change: "5 цифровых инструментов за 2 месяца для работы с 53 000 позиций.",
      metric: "1,7 млн ₽ сохранено за квартал",
      to: "/cases/aktransservice",
      bg: "bg-surface-mint",
    },
    {
      client: "Крайпотребсоюз · межрегиональная структура",
      change: "Архитектура позволила отказаться от покупки серверного оборудования.",
      metric: "1,3 млн ₽ разовой экономии капитальных затрат",
      to: "/cases/kraypotrebsoyuz",
      bg: "bg-surface-lavender",
    },
    {
      client: "Производственная компания · техническая документация",
      change: "Поиск по технической документации сократился с 25 минут до 3 секунд.",
      metric: "3 секунды вместо 25 минут ручного поиска",
      to: "/cases/production-doc-search",
      bg: "bg-surface-sand",
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Разбор цифровых задач для собственника · 17 000 ₽ | Александра Моисеева</title>
        <meta
          name="description"
          content="Разбор цифровых задач для собственника за 17 000 ₽: где компания теряет время и деньги, что автоматизировать первым и какой следующий шаг. Онлайн по всей России."
        />
        <meta
          name="keywords"
          content="разбор цифровых задач, автоматизация процессов, с чего начать автоматизацию, стратегия цифрового развития, аудит процессов"
        />
        <link rel="canonical" href="https://aleksamois.ru/start/" />
        <meta property="og:title" content="Разбор цифровых задач для собственника · 17 000 ₽ | Александра Моисеева" />
        <meta
          property="og:description"
          content="Разберём, где компания теряет время и деньги, что автоматизировать первым и какой следующий шаг. Онлайн по всей России."
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
          {/* 1. HERO */}
          <section className="pt-6 md:pt-12 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="relative rounded-[24px] md:rounded-[40px] bg-surface-mint overflow-hidden shadow-card ring-1 ring-foreground/5">
                <div className="px-5 md:px-10 lg:px-14 py-7 md:py-14">
                  <div className="max-w-4xl">
                    <p className="text-xs sm:text-sm uppercase tracking-widest text-accent font-semibold mb-4 md:mb-6">
                      Первый шаг
                    </p>
                    <h1 className="text-[1.7rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.12] sm:leading-[1.05] md:leading-[1.02] tracking-tight text-foreground mb-4 md:mb-6">
                      Разбор задачи с собственником
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-foreground/75 mb-5 max-w-3xl leading-snug">
                      За одну встречу определим, где компания теряет время и деньги, что стоит автоматизировать первым и какой следующий шаг даст наибольший эффект.
                    </p>

                    <div className="inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl bg-background/80 px-4 py-3 mb-5 shadow-card ring-1 ring-foreground/5">
                      <span className="text-2xl md:text-3xl font-bold text-foreground">17 000 ₽</span>
                      <span className="text-sm md:text-base text-muted-foreground">· фиксированная стоимость</span>
                    </div>

                    <div className="text-sm sm:text-base text-foreground/70 mb-6 md:mb-8 max-w-2xl space-y-1">
                      <p>
                        Александра Моисеева, основатель «НейроРешений», проводит разбор лично.
                      </p>
                      <p>Дистанционно по всей России.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                      <PillButton
                        onClick={openTaskModal}
                        variant="turquoise"
                        className="w-full sm:w-auto justify-center"
                      >
                        Записаться на разбор
                      </PillButton>
                      <button
                        type="button"
                        onClick={scrollToResult}
                        className="inline-flex items-center justify-center sm:justify-start text-foreground/80 hover:text-foreground underline-offset-4 hover:underline font-semibold text-base md:text-lg px-2 py-3 sm:py-2"
                      >
                        Что получите после разбора <ArrowDown className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Когда стоит начать с разбора */}
          <section className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.08] mb-8 md:mb-10 max-w-3xl">
              Когда стоит начать с{" "}
              <span className="font-iriska font-normal italic text-accent">разбора</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {situations.map((s, i) => (
                <div
                  key={i}
                  className="rounded-[24px] bg-card p-5 md:p-6 shadow-card ring-1 ring-foreground/5"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm mb-3">
                    {i + 1}
                  </span>
                  <p className="text-sm md:text-base text-foreground/80 leading-snug">{s}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Что происходит на встрече */}
          <section className="px-4 md:px-6 pb-14 md:pb-20">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[24px] md:rounded-[40px] bg-secondary px-5 md:px-10 lg:px-14 py-8 md:py-14 shadow-card ring-1 ring-foreground/5">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.08] mb-6 md:mb-8">
                  Что происходит на встрече
                </h2>
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
                  {flow.map((step, i) => (
                    <span key={step} className="flex items-center gap-2 md:gap-3">
                      <span className="rounded-full bg-background px-4 py-2 text-sm md:text-base font-semibold text-foreground shadow-card">
                        {step}
                      </span>
                      {i < flow.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-base md:text-lg text-foreground/75 max-w-3xl leading-snug">
                  Разбираем задачу, текущий процесс, потери и ограничения. Затем выбираем первый приоритет и следующий шаг.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Результат */}
          <section id="result" className="container mx-auto max-w-7xl px-4 pb-14 md:pb-20 scroll-mt-24">
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.08] mb-4">
                  Что Вы получите после разбора
                </h2>
                <img
                  src={compassSketch}
                  alt=""
                  width={512}
                  height={512}
                  loading="lazy"
                  className="hidden md:block w-40 h-auto object-contain mt-6"
                />
              </div>
              <div className="md:col-span-7">
                <ul className="space-y-3 mb-6">
                  {results.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-card ring-1 ring-foreground/5"
                    >
                      <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <span className="text-sm md:text-base text-foreground/80">{r}</span>
                    </li>
                  ))}
                </ul>
                <p className="rounded-2xl bg-accent px-5 py-4 text-sm md:text-base font-semibold text-white leading-snug">
                  Разбор является самостоятельным продуктом. После встречи Вы сами решаете, двигаться дальше с «НейроРешениями» или использовать рекомендации внутри компании.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Продуктовый маршрут */}
          <section className="container mx-auto max-w-7xl px-4 pb-14 md:pb-20">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.08] mb-8 md:mb-10">
              Что может быть{" "}
              <span className="font-iriska font-normal italic text-accent">дальше</span>
            </h2>
            <ol className="space-y-3">
              {route.map((step, i) => (
                <li key={i}>
                  <div
                    className={`rounded-[24px] ${step.bg} p-5 md:p-6 shadow-card ring-1 ring-foreground/5 flex items-start gap-4`}
                  >
                    <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-background font-bold text-foreground shadow-card">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-foreground leading-[1.2] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-foreground/70">{step.text}</p>
                    </div>
                  </div>
                  {i < route.length - 1 && (
                    <div className="flex justify-center py-1.5">
                      <ArrowDown className="h-5 w-5 text-accent" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex justify-center">
              <PillButton to="/services" variant="dark">
                Посмотреть все услуги
              </PillButton>
            </div>
          </section>

          {/* 6. О «НейроРешениях» */}
          <section className="px-4 md:px-6 pb-14 md:pb-20">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[24px] md:rounded-[40px] bg-surface-lavender px-5 md:px-10 lg:px-14 py-8 md:py-14 shadow-card ring-1 ring-foreground/5">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.08] mb-6">
                  От решения до рабочего внедрения
                </h2>
                <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                  <div className="md:col-span-7 space-y-4 text-base md:text-lg text-foreground/75 leading-snug">
                    <p>
                      Александра Моисеева лично отвечает за разбор, архитектуру и ключевые решения. Команда «НейроРешений» подключается к внедрению и сопровождению.
                    </p>
                    <p>
                      Цель каждого проекта: измеримый результат, экономия времени, снижение потерь и рост управляемости.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7. Кейсы */}
          <section className="container mx-auto max-w-7xl px-4 pb-14 md:pb-20">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.08] mb-8 md:mb-10">
              Подтверждённые{" "}
              <span className="font-iriska font-normal italic text-accent">результаты</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <Link
                  key={c.client}
                  to={c.to}
                  className={`group flex flex-col rounded-[24px] ${c.bg} p-5 md:p-6 shadow-card hover:shadow-plate hover:-translate-y-1 transition-all duration-300 ring-1 ring-foreground/5`}
                >
                  <p className="text-xs text-foreground/60 mb-2">{c.client}</p>
                  <p className="text-sm md:text-base text-foreground/80 mb-4 leading-snug">{c.change}</p>
                  <p className="text-base md:text-lg font-bold text-foreground mt-auto">{c.metric}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    Подробнее
                    <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* 8. Работа по России */}
          <section className="px-4 md:px-6 pb-14 md:pb-20">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[24px] md:rounded-[40px] bg-surface-sand px-5 md:px-10 lg:px-14 py-8 md:py-12 shadow-card ring-1 ring-foreground/5 grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-[1.1] mb-3">
                    Работаю с компаниями по всей России
                  </h2>
                  <p className="text-base md:text-lg text-foreground/75 leading-snug">
                    Разбор и стратегия проходят дистанционно по всей России. Для глубокого аудита и отдельных проектов подключается очный этап.
                  </p>
                </div>
                <div className="md:col-span-4 flex justify-center md:justify-end">
                  <img
                    src={handshakeSketch}
                    alt=""
                    width={512}
                    height={512}
                    loading="lazy"
                    className="w-28 md:w-40 h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 9. Короткое описание задачи */}
          <section ref={diagnosticIntroRef} className="px-4 md:px-6 pb-4">
            <div className="container mx-auto max-w-3xl text-center">
              <span className="block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                Опишите задачу самостоятельно
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.12] mb-4">
                Кратко опишите задачу
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                За 7–10 минут опишите один процесс. Ответы помогут подготовиться к предметному разговору.
              </p>
              {!diagnosticStarted && (
                <div className="mt-8 mb-2 flex justify-center">
                  <PillButton onClick={startDiagnostic} variant="dark">
                    Описать задачу
                  </PillButton>
                </div>
              )}
            </div>
          </section>

          {diagnosticStarted && (
            <section ref={diagnosticRef} className="pt-10 md:pt-14 pb-4">
              <div className="container mx-auto px-4">
                <DiagnosticForm />
              </div>
            </section>
          )}

          {/* 10. Финальный CTA */}
          <section className="px-4 md:px-6 py-14 md:py-20">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[24px] md:rounded-[40px] bg-surface-blush px-5 md:px-10 lg:px-14 py-10 md:py-16 shadow-card ring-1 ring-foreground/5 text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.1] mb-4 max-w-3xl mx-auto">
                  Определим первый шаг для Вашей компании
                </h2>
                <p className="text-base md:text-lg text-foreground/75 max-w-2xl mx-auto mb-7">
                  Разберём одну ключевую задачу, оценим её экономический смысл и зафиксируем следующий шаг.
                </p>
                <div className="flex justify-center">
                  <PillButton onClick={openTaskModal} variant="turquoise">
                    Записаться на разбор
                  </PillButton>
                </div>
                <p className="mt-4 text-sm text-foreground/60">
                  Александра Моисеева · лично · онлайн по всей России
                </p>
              </div>
            </div>
          </section>
        </main>

        <FAQTeaser
          items={[
            { question: "Что такое разбор цифровых задач для собственника?", answer: "Это отдельная встреча за 17 000 ₽, на которой мы разбираем задачу бизнеса, текущий процесс, ручную нагрузку и потери, а затем определяем первый приоритет и подходящий формат решения." },
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
