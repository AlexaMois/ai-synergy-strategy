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
                <p className="text-[16px] font-normal text-background/85 leading-relaxed mb-5">На стратегической встрече разберём Вашу ситуацию, определим главное ограничение и выберем, какое действие стоит предпринять первым. Вы получите письменные выводы на одной странице: что менять, с чего начать и как проверить результат.</p>
                <p className="text-[20px] md:text-[22px] font-bold text-accent mb-1">17 000 ₽</p>
                <p className="text-sm md:text-base text-background/70 mb-7">Самостоятельная экспертная услуга. Дальнейшее сотрудничество необязательно.</p>
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
                      key={step.title}
                      className="flex items-baseline gap-4 border-b border-background/15 py-3.5"
                    >
                      <span className="text-base md:text-lg font-bold text-accent tabular-nums shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base md:text-lg text-background/85">
                        <span className="font-semibold text-background">{step.title}</span>
                        <span className="block text-sm md:text-base text-background/65 leading-snug mt-0.5">{step.text}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-base md:text-lg text-background/70 leading-snug">
                  Не каждую проблему нужно решать автоматизацией. Иногда достаточно изменить порядок работы, распределить ответственность или устранить лишние действия.
                </p>
              </div>

              <div className="md:col-span-7 md:pl-6">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.08] mb-6 md:mb-8">
                  Что Вы получите после разбора
                </h2>
                <ul className="mb-8 md:mb-10 border-t border-border">
                  {results.map((r) => (
                    <li key={r.title} className="flex items-start gap-4 border-b border-border py-5 md:py-6">
                      <Check className="w-6 h-6 text-accent mt-1 shrink-0" strokeWidth={2} />
                      <span className="text-lg md:text-2xl text-foreground leading-snug">
                        {r.title}
                        <span className="block text-sm md:text-base text-muted-foreground leading-snug mt-1">{r.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="rounded-2xl bg-accent px-5 py-4 text-sm md:text-base font-semibold text-accent-foreground leading-snug max-w-xl">
                  Все выводы Вы получите в одном документе на одной странице. Документ составляется по информации, полученной на встрече. Неподтверждённые причины и предполагаемые результаты обозначаются отдельно. Разбор является самостоятельной услугой. После встречи Вы сами решаете, реализовать рекомендации своими силами или продолжить работу с «НейроРешениями».
                </p>
                <PillButton onClick={bookMeeting} variant="dark" size="md" className="mt-6">Записаться на разбор</PillButton>
              </div>
            </div>
          </section>

        </main>

        <FAQTeaser
          items={[
            { question: "Что входит в стратегическую встречу за 17 000 ₽?", answer: "Разбираем Вашу задачу, текущую организацию работы, потери и ограничения. Определяем один главный приоритет и первый шаг. По итогам Вы получаете краткий письменный документ с рекомендациями и критерием проверки результата." },
            { question: "Чем встреча отличается от стратегии цифрового развития бизнеса?", answer: "Стратегическая встреча за 17 000 ₽ помогает собственнику определить, с чего начать, на основании обсуждения его ситуации.\n\nРазработка стратегии цифрового развития бизнеса за 78 000 ₽ предполагает более глубокую работу: анализ нескольких процессов, интервью с сотрудниками и план действий на 90 дней." },
            { question: "Нужно ли после встречи заказывать внедрение?", answer: "Нет. Вы получаете самостоятельный результат, который можете использовать внутри своей компании. Если потребуется дальнейшая помощь, возможные работы и их стоимость обсуждаются отдельно." },
            { question: "Что подготовить к встрече?", answer: "Достаточно описать одну конкретную проблему: как работа устроена сейчас, где возникают задержки или ошибки, что уже пробовали и какого результата хотите добиться.\n\nЕсли известны затраты времени, количество операций или стоимость ошибок, эти данные помогут оценить масштаб проблемы. Если цифр нет, определим, что нужно измерить." },
            { question: "Нужно ли заранее отправлять документы компании?", answer: "Нет, для первого обсуждения это необязательно. Не передавайте через открытую форму пароли, персональные данные третьих лиц и конфиденциальные документы. Если для дальнейшей работы потребуются материалы, отдельно согласуем состав и условия их передачи." },
            { question: "Как проходит встреча с компаниями из других регионов?", answer: "Стратегическую встречу можно провести дистанционно. Очный формат согласовывается отдельно." },
          ]}
        />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default StartPage;
