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
import handshakeSketch from "@/assets/sketches/handshake-sketch.webp";
import alexandraPortrait from "@/assets/about/portrait-formal-new.jpg";

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

          {/* 2. Когда стоит начать с разбора — открытые строки */}
          <section className="bg-background container mx-auto max-w-7xl px-4 py-16 md:py-24">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-10 md:mb-14 max-w-3xl">
              Когда стоит начать с{" "}
              <span className="font-iriska font-normal italic text-accent">разбора</span>
            </h2>
            <div className="border-t border-border">
              {situations.map((s, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-12 gap-2 md:gap-8 items-baseline border-b border-border py-5 md:py-7"
                >
                  <div className="md:col-span-2 text-3xl md:text-4xl font-bold text-accent leading-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="md:col-span-10 text-base md:text-xl text-foreground/80 leading-snug">
                    {s}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Что происходит на встрече + что Вы получите */}
          <section
            id="result"
            className="bg-background container mx-auto max-w-7xl px-4 pb-16 md:pb-24 scroll-mt-24"
          >
            <div className="grid md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-5">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.08] mb-6 md:mb-8">
                  Что происходит на встрече
                </h2>
                <div className="border-t border-border mb-6 md:mb-8">
                  {flow.map((step, i) => (
                    <div
                      key={step}
                      className="flex items-baseline gap-4 border-b border-border py-3.5"
                    >
                      <span className="text-base md:text-lg font-bold text-accent tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base md:text-lg text-foreground/80">{step}</span>
                    </div>
                  ))}
                </div>
                <p className="text-base md:text-lg text-foreground/70 leading-snug">
                  Разбираем задачу, текущий процесс, потери и ограничения. Затем выбираем первый приоритет и следующий шаг.
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
                <p className="rounded-2xl bg-accent px-5 py-4 text-sm md:text-base font-semibold text-white leading-snug max-w-xl">
                  Разбор является самостоятельным продуктом. После встречи Вы сами решаете, двигаться дальше с «НейроРешениями» или использовать рекомендации внутри компании.
                </p>
              </div>
            </div>
          </section>

          {/* 4. После разбора — асимметричная продуктовая композиция */}
          <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-10 md:mb-14">
              После{" "}
              <span className="font-iriska font-normal italic text-accent">разбора</span>
            </h2>
            <div className="grid md:grid-cols-12 gap-4 md:gap-6">
              <div className="md:col-span-7 rounded-[24px] md:rounded-[32px] bg-surface-mint p-7 md:p-12 shadow-card ring-1 ring-foreground/5 flex flex-col justify-between min-h-[260px] md:min-h-[340px]">
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.08] mb-2">
                    Стратегия цифрового развития
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-accent">78 000 ₽</p>
                </div>
                <p className="mt-8 text-base md:text-xl text-foreground/75 leading-snug max-w-md">
                  Формируем план цифрового развития на 90 дней.
                </p>
              </div>

              <div className="md:col-span-5 grid gap-4 md:gap-6 content-stretch">
                <div className="rounded-[24px] md:rounded-[32px] bg-surface-sand p-6 md:p-8 shadow-card ring-1 ring-foreground/5">
                  <h3 className="text-lg md:text-2xl font-bold text-foreground leading-[1.1] mb-1">
                    Глубокий аудит
                  </h3>
                  <p className="text-base md:text-lg font-bold text-accent mb-3">от 116 000 ₽</p>
                  <p className="text-sm md:text-base text-foreground/70 leading-snug">
                    Разбираем несколько процессов, данные, документы и работу команды.
                  </p>
                </div>
                <div className="rounded-[24px] md:rounded-[32px] bg-card border-t-2 border-accent/40 p-6 md:p-8">
                  <h3 className="text-lg md:text-2xl font-bold text-foreground leading-[1.1] mb-3">
                    Внедрение и сопровождение
                  </h3>
                  <p className="text-sm md:text-base text-foreground/70 leading-snug">
                    Запускаем изменения и доводим решение до рабочего результата.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/services"
                className="inline-flex items-center text-accent hover:underline font-medium"
              >
                Посмотреть все услуги <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* 5. От решения до рабочего внедрения — фото + текст */}
          <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-28">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-5">
                <img
                  src={alexandraPortrait}
                  alt="Александра Моисеева"
                  width={900}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-sm md:max-w-none aspect-[3/4] object-cover rounded-[24px] md:rounded-[32px] shadow-plate"
                />
              </div>
              <div className="md:col-span-7 md:pl-8 py-4 md:py-10">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.08] mb-8 md:mb-10">
                  От решения до рабочего внедрения
                </h2>
                <div className="space-y-6 md:space-y-8 text-base md:text-xl text-foreground/75 leading-snug max-w-2xl">
                  <p>
                    Александра Моисеева лично отвечает за разбор, архитектуру и ключевые решения. Команда «НейроРешения» подключается к внедрению и сопровождению.
                  </p>
                  <p>
                    Цель каждого проекта: измеримый результат, экономия времени, снижение потерь и рост управляемости.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Подтверждённые результаты — bento */}
          <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-10 md:mb-14">
              Подтверждённые{" "}
              <span className="font-iriska font-normal italic text-accent">результаты</span>
            </h2>
            <div className="grid md:grid-cols-12 gap-4">
              <Link
                to="/cases/aktransservice"
                className="md:col-span-7 md:row-span-2 group flex flex-col justify-between rounded-2xl bg-foreground text-background p-8 md:p-10 min-h-[320px] shadow-plate hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
                    Кейс · Логистика
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-background">
                    АкТрансСервис
                  </h3>
                  <p className="text-sm md:text-base text-background/70 leading-relaxed max-w-md">
                    5 цифровых инструментов за 2 месяца для работы с 53 000 позиций.
                  </p>
                </div>
                <div className="mt-8 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-accent leading-none mb-1">
                      1,7 млн ₽
                    </div>
                    <p className="text-xs text-background/60">сохранено за квартал</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-accent group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                to="/cases/kraypotrebsoyuz"
                className="md:col-span-5 group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 md:p-7 min-h-[150px] shadow-soft hover:shadow-card hover:-translate-y-1 hover:border-accent transition-all duration-300"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Кейс · Межрегиональная структура
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                    Крайпотребсоюз
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Архитектура позволила отказаться от покупки серверного оборудования.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-2xl font-bold text-accent leading-none">1,3 млн ₽</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      разовой экономии капитальных затрат
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-foreground/60 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </Link>

              <Link
                to="/cases/production-doc-search"
                className="md:col-span-5 group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 md:p-7 min-h-[150px] shadow-soft hover:shadow-card hover:-translate-y-1 hover:border-accent transition-all duration-300"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Кейс · Техническая документация
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                    Производственная компания
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Поиск по технической документации сократился с 25 минут до 3 секунд.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-2xl font-bold text-accent leading-none">3 секунды</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      вместо 25 минут ручного поиска
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-foreground/60 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </Link>
            </div>
          </section>

          {/* 7. По всей России */}
          <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="md:col-span-5">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
                  <span className="font-iriska font-normal italic text-accent">По всей России</span>
                </h2>
              </div>
              <div className="md:col-span-7 flex items-center gap-6">
                <p className="text-base md:text-xl text-foreground/75 leading-snug">
                  Разбор и стратегия проходят дистанционно по всей России. Для глубокого аудита и отдельных проектов подключается очный этап.
                </p>
                <img
                  src={handshakeSketch}
                  alt=""
                  width={512}
                  height={512}
                  loading="lazy"
                  className="hidden sm:block w-20 md:w-28 h-auto object-contain opacity-70 shrink-0"
                />
              </div>
            </div>
          </section>

          {/* 9. Короткое описание задачи */}
          <section ref={diagnosticIntroRef} className="px-4 md:px-6 pt-4 pb-10 md:pt-8 md:pb-16">
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
