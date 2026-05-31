import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, ArrowRight, Mic, FileText, Sparkles, ListChecks } from "lucide-react";
import plaudHeroDevice from "@/assets/plaud/plaud-hero-device.png";
import plaudTranscriptView from "@/assets/plaud/plaud-transcript-view.png";
import plaudButtonPress from "@/assets/plaud/plaud-button-press.png";
import plaudNotePhone from "@/assets/plaud/plaud-note-phone.png";
import plaudEcosystem from "@/assets/plaud/plaud-ecosystem.png";
import plaudAutoflow from "@/assets/plaud/plaud-autoflow.png";
import plaudExport from "@/assets/plaud/plaud-export.png";
import plaudWebapp from "@/assets/plaud/plaud-webapp.png";
import plaudSummary from "@/assets/plaud/plaud-summary.webp";
import plaudAsk from "@/assets/plaud/plaud-ask.png";
import plaudMultimodal from "@/assets/plaud/plaud-multimodal.webp";
import plaudDemo from "@/assets/plaud/plaud-demo.webm";
import {
  modelComparison,
  gettingStartedSteps,
  cloudInfo,
  paymentInfo,
  mistakes,
  faqItems,
  conclusionSteps,
} from "./plaud-guide-sections";

const PLAUD_URL = "https://www.plaud.ai/";

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как начать пользоваться PLAUD AI",
  description: "Пошаговая инструкция по настройке и использованию PLAUD AI",
  step: gettingStartedSteps.map((s) => ({
    "@type": "HowToStep",
    position: s.number,
    name: s.title,
    text: s.desc,
  })),
};

// Map feature titles to images
const featureImageMap: Record<string, string> = {
  "Transcript": plaudTranscriptView,
  "Summary": plaudSummary,
  "Ask PLAUD": plaudAsk,
  "Templates": plaudWebapp,
  "Export": plaudExport,
  "Search": plaudWebapp,
};

// Map usage item index to images
const usageImageMap: Record<number, string> = {
  0: plaudMultimodal,    // Режим записи
  1: plaudButtonPress,   // Запустите запись
  2: plaudButtonPress,   // Остановите запись
  3: plaudButtonPress,   // Отметьте момент
};

// Map getting started step to images
const stepImageMap: Record<number, string> = {
  1: plaudNotePhone,     // Зарядите
  2: plaudEcosystem,     // Установите приложение
  3: plaudMultimodal,    // Подключите устройство
  4: plaudButtonPress,   // Запустите запись
  5: plaudTranscriptView, // Обработайте запись
};

const ScreenshotPlaceholder = ({ text = "Сюда будет добавлен скриншот", className = "", imageSrc }: { text?: string; className?: string; imageSrc?: string }) => {
  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={text}
        loading="lazy"
        className={`rounded-xl w-full h-auto object-contain ${className}`}
      />
    );
  }
  return (
    <div
      className={`rounded-xl border-2 border-dashed border-border/40 bg-secondary/30 aspect-video flex items-center justify-center ${className}`}
    >
      <p className="text-sm text-muted-foreground text-center px-4">{text}</p>
    </div>
  );
};

const PlaudLink = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <a
    href={PLAUD_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-1 text-primary hover:text-primary/80 underline underline-offset-2 transition-colors ${className}`}
  >
    {children || "plaud.ai"}
    <ExternalLink className="w-3.5 h-3.5" />
  </a>
);

const heroBullets = [
  "Разберёте английский интерфейс",
  "Запустите первую запись",
  "Получите текст и краткое содержание",
  "Поймёте, как работают минуты",
  "Выберете экономичный вариант оплаты",
];

const outputItems = [
  { en: "Transcript", ru: "полный текст разговора" },
  { en: "Summary", ru: "краткое содержание" },
  { en: "Tasks", ru: "задачи и договорённости" },
  { en: "Ask PLAUD", ru: "вопросы по записи" },
  { en: "Export", ru: "выгрузка результата" },
];

const plaudModels = [
  {
    name: "PLAUD Note",
    audience: "офиса, встреч, звонков, рабочих задач",
    pick: "хотите универсальный вариант для телефона, переговоров и обычной работы",
    bg: "bg-surface-mint",
  },
  {
    name: "PLAUD Note Pro",
    audience: "совещаний, переговорных, командных встреч",
    pick: "часто записываете обсуждения в помещении и хотите более уверенный формат для рабочих встреч",
    bg: "bg-surface-sand",
  },
  {
    name: "PLAUD NotePin",
    audience: "выездов, лекций, интервью, мероприятий",
    pick: "часто перемещаетесь и хотите носить устройство на себе",
    bg: "bg-surface-lavender",
  },
  {
    name: "PLAUD NotePin S",
    audience: "частых коротких записей в течение дня",
    pick: "хотите быстро фиксировать мысли, разговоры и задачи на ходу",
    bg: "bg-surface-blush",
  },
];

const quickStartSteps = [
  {
    n: 1,
    title: "Зарядите устройство",
    text: "Подключите PLAUD к зарядке и дождитесь, пока устройство будет готово к работе. Для первой проверки достаточно короткой тестовой записи.",
    badges: [] as string[],
  },
  {
    n: 2,
    title: "Установите приложение PLAUD",
    text: "Установите приложение PLAUD AI на телефон и войдите в аккаунт. Если интерфейс на английском, не пугайтесь: основные кнопки разобраны ниже.",
    badges: [],
  },
  {
    n: 3,
    title: "Подключите устройство",
    text: "Включите Bluetooth, откройте приложение и подключите PLAUD. После подключения устройство появится в приложении.",
    badges: [],
  },
  {
    n: 4,
    title: "Выберите режим записи",
    text: "Для живой встречи используйте режим Meeting. Для телефонного разговора — режим Call. Правильный режим сильно влияет на качество записи.",
    badges: ["Meeting", "Call"],
  },
  {
    n: 5,
    title: "Сделайте тестовую запись",
    text: "Запишите 1–2 минуты обычной речи. Это поможет проверить звук, режим и синхронизацию до важной встречи.",
    badges: [],
  },
  {
    n: 6,
    title: "Откройте запись в приложении",
    text: "После завершения записи откройте файл в приложении. Обычно записи находятся в разделе All files.",
    badges: ["All files"],
  },
  {
    n: 7,
    title: "Нажмите Generate",
    text: "Кнопка Generate запускает обработку записи. После этого PLAUD формирует расшифровку и краткое содержание.",
    badges: ["Generate"],
  },
  {
    n: 8,
    title: "Проверьте Transcript и Summary",
    text: "Transcript — это полный текст записи. Summary — краткое содержание. Проверьте, насколько хорошо система распознала речь.",
    badges: ["Transcript", "Summary"],
  },
];

const dictionary = [
  { en: "Record", ru: "Запись", desc: "запускает или обозначает запись разговора." },
  { en: "Meeting", ru: "Встреча", desc: "режим для живого разговора, совещания, лекции или консультации." },
  { en: "Call", ru: "Звонок", desc: "режим для записи телефонного разговора через устройство." },
  { en: "All files", ru: "Все файлы", desc: "раздел, где находятся записи." },
  { en: "Generate", ru: "Сгенерировать / обработать", desc: "запускает обработку записи, чтобы получить текст и краткое содержание." },
  { en: "Generate now", ru: "Сгенерировать сейчас", desc: "подтверждает запуск обработки." },
  { en: "Transcript", ru: "Расшифровка", desc: "показывает полный текст записи." },
  { en: "Summary", ru: "Краткое содержание", desc: "показывает основные мысли, выводы и договорённости." },
  { en: "Ask PLAUD", ru: "Спросить PLAUD", desc: "позволяет задавать вопросы по записи, например: «Какие задачи обсудили?» или «Что по срокам?»" },
  { en: "Templates", ru: "Шаблоны", desc: "помогает выбрать формат обработки: встреча, интервью, конспект, задачи, протокол." },
  { en: "Auto generation", ru: "Автоматическая генерация", desc: "PLAUD сам выбирает шаблон, модель и язык обработки." },
  { en: "Custom generation", ru: "Ручная настройка генерации", desc: "пользователь сам выбирает шаблон, модель и язык." },
  { en: "Export", ru: "Выгрузить", desc: "позволяет сохранить или отправить запись, расшифровку, саммари или майнд-карту." },
  { en: "Search", ru: "Поиск", desc: "помогает найти нужную запись или фрагмент." },
  { en: "Membership Center", ru: "Раздел тарифа и минут", desc: "показывает тариф, остаток минут и варианты пополнения." },
  { en: "Private Cloud Sync", ru: "Облачная синхронизация", desc: "синхронизирует записи и результаты между устройствами." },
  { en: "AutoFlow", ru: "Автоматический поток обработки", desc: "может автоматически создавать расшифровку и саммари после синхронизации или загрузки записи." },
];

const firstRecordingSteps = [
  { title: "Откройте приложение PLAUD AI", text: "Убедитесь, что устройство подключено и видно в приложении." },
  { title: "Выберите режим", text: "Meeting — для живого разговора. Call — для телефонного звонка.", badges: ["Meeting", "Call"] },
  { title: "Запустите запись", text: "Нажмите кнопку записи в приложении или используйте кнопку на устройстве. Убедитесь, что запись началась." },
  { title: "Положите устройство правильно", text: "Для встречи положите PLAUD ближе к говорящим. Для звонка используйте режим Call и расположите устройство так, как рекомендует приложение." },
  { title: "Завершите запись", text: "Остановите запись после разговора. Устройство сохранит файл." },
  { title: "Дождитесь синхронизации", text: "Откройте приложение и дождитесь, пока запись появится в списке файлов." },
  { title: "Откройте файл и нажмите Generate", text: "После обработки появятся Transcript и Summary.", badges: ["Generate", "Transcript", "Summary"] },
  { title: "Проверьте результат", text: "Посмотрите, правильно ли распозналась речь. Если запись тестовая, оцените качество звука и выбранный режим." },
];

const miniCheck = [
  "устройство заряжено",
  "приложение открывается",
  "Bluetooth включён",
  "устройство подключено",
  "выбран правильный режим: Meeting или Call",
  "сделана тестовая запись",
  "хватает минут для расшифровки",
  "понятно, куда потом нажать: All files → Generate",
];

const EnBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-accent/15 text-accent px-2.5 py-0.5 text-xs font-semibold ring-1 ring-accent/30">
    {children}
  </span>
);

const PlaudGuidePage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>PLAUD Note: инструкция и сценарии применения</title>
        <meta name="description" content="Практическая инструкция по PLAUD Note: запись встреч, расшифровки, выводы, задачи и применение устройства в рабочем процессе." />
        <link rel="canonical" href="https://aleksamois.ru/materials/plaud-guide" />
        <meta property="og:title" content="PLAUD Note: инструкция и сценарии применения" />
        <meta property="og:description" content="Практическая инструкция по PLAUD Note: запись встреч, расшифровки, выводы, задачи и применение устройства в рабочем процессе." />
        <meta property="og:url" content="https://aleksamois.ru/materials/plaud-guide" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 pt-24 pb-4 relative z-20">
          <PageBreadcrumbs
            currentPage="Инструкция PLAUD AI"
            parentPages={[
              { label: "Материалы", href: "/materials" },
            ]}
          />
        </div>

        {/* 1. HERO */}
        <section className="pt-4 md:pt-8 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="relative rounded-[32px] md:rounded-[40px] bg-surface-mint overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
              <div className="grid md:grid-cols-12 gap-8 items-center px-6 md:px-12 lg:px-16 py-12 md:py-20">
                <div className="md:col-span-7">
                  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6">
                    Инструкция PLAUD AI
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-foreground mb-6">
                    PLAUD Note на русском:{" "}
                    <span className="font-iriska font-normal italic text-accent">
                      понятная инструкция
                    </span>{" "}
                    без английской путаницы
                  </h1>
                  <p className="text-lg md:text-xl text-foreground/75 mb-8 max-w-2xl leading-snug">
                    Показываю, что означают кнопки в приложении, как запустить запись, получить расшифровку и саммари, где смотреть минуты и как не переплатить за подписку.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2 mb-10 max-w-2xl">
                    {heroBullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 rounded-2xl bg-background/70 px-4 py-3 ring-1 ring-foreground/5">
                        <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                        <span className="text-sm md:text-base text-foreground/85">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="#getting-started"
                      className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 bg-foreground text-background hover:bg-foreground/90"
                    >
                      <span>Перейти к инструкции</span>
                      <span className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-accent text-accent-foreground group-hover:translate-x-0.5 transition-transform">
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                      </span>
                    </a>
                    <a
                      href="#choose-model"
                      className="inline-flex items-center text-foreground/80 hover:text-foreground underline-offset-4 hover:underline font-semibold text-base md:text-lg px-2 py-2"
                    >
                      Сначала понять, какую модель выбрать <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                </div>
                <div className="md:col-span-5">
                  <div className="rounded-[28px] bg-background p-6 md:p-7 shadow-plate ring-1 ring-foreground/5">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-5">
                      Как это работает
                    </p>
                    <ol className="space-y-3">
                      {[
                        { icon: Mic, label: "Запись" },
                        { icon: FileText, label: "Расшифровка" },
                        { icon: Sparkles, label: "Саммари" },
                        { icon: ListChecks, label: "Задачи" },
                      ].map((s, i, arr) => {
                        const Icon = s.icon;
                        return (
                          <li key={s.label} className="flex items-center gap-4">
                            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-accent text-accent-foreground flex-shrink-0">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="font-semibold text-foreground text-lg">{s.label}</span>
                            {i < arr.length - 1 && (
                              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                  <p className="text-xs text-foreground/60 mt-4 text-center">
                    Официальный сайт: <PlaudLink />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Что такое PLAUD */}
        <section className="px-4 md:px-6 py-16 md:py-24">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="md:col-span-7">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-6">
                  Что такое{" "}
                  <span className="font-iriska font-normal italic text-accent">PLAUD</span>{" "}
                  — простыми словами
                </h2>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground">
                  <p>
                    <PlaudLink>PLAUD</PlaudLink> — это устройство и приложение, которые помогают записывать встречи, звонки, лекции, консультации и голосовые заметки.
                  </p>
                  <p>
                    Главная польза PLAUD не в самой записи, а в том, что после разговора вы получаете рабочий материал: полный текст, краткое содержание, ключевые мысли, задачи и договорённости.
                  </p>
                  <p>
                    PLAUD особенно полезен тем, кто много общается по работе: собственникам, руководителям, консультантам, преподавателям, менеджерам, юристам, экспертам и специалистам, которые проводят встречи и хотят не держать всё в голове.
                  </p>
                </div>
                <video
                  src={plaudDemo}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  poster={plaudHeroDevice}
                  className="w-full rounded-2xl mt-8 shadow-card"
                />
              </div>
              <div className="md:col-span-5">
                <div className="rounded-[28px] bg-surface-blush p-7 md:p-8 shadow-plate ring-1 ring-foreground/5">
                  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                    Что получается на выходе
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6">
                    Готовый рабочий{" "}
                    <span className="font-iriska font-normal italic text-accent">материал</span>{" "}
                    после разговора
                  </h3>
                  <ul className="space-y-3">
                    {outputItems.map((o) => (
                      <li key={o.en} className="flex items-baseline gap-3 rounded-2xl bg-background/80 px-4 py-3 ring-1 ring-foreground/5">
                        <span className="font-bold text-foreground">{o.en}</span>
                        <span className="text-muted-foreground">— {o.ru}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Какую модель выбрать */}
        <section id="choose-model" className="px-4 md:px-6 pb-16 md:pb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl mb-10 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                Какую{" "}
                <span className="font-iriska font-normal italic text-accent">модель</span>{" "}
                PLAUD выбрать
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Все модели PLAUD записывают звук, синхронизируются с приложением и помогают получать расшифровку и саммари. Разница — в формате устройства и сценарии использования.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {plaudModels.map((m) => (
                <div
                  key={m.name}
                  className={`rounded-[28px] ${m.bg} p-7 md:p-8 shadow-card ring-1 ring-foreground/5 flex flex-col`}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
                    {m.name}
                  </h3>
                  <p className="text-foreground/80 mb-3">
                    <span className="font-semibold text-foreground">Подходит для:</span> {m.audience}.
                  </p>
                  <p className="text-foreground/80">
                    <span className="font-semibold text-foreground">Выбирайте, если:</span> {m.pick}.
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[28px] bg-accent text-white p-7 md:p-10 shadow-plate ring-1 ring-foreground/5">
              <p className="text-sm uppercase tracking-widest text-white/80 font-semibold mb-3">
                Короткая рекомендация
              </p>
              <p className="text-lg md:text-xl leading-snug text-white/95">
                Если выбираете первый PLAUD и хотите самый понятный старт, чаще всего достаточно начать с <span className="font-semibold">PLAUD Note</span>. Если у вас много выездов, интервью и живых встреч вне офиса — смотрите в сторону <span className="font-semibold">NotePin</span>. Если основная задача — переговорные и совещания, смотрите <span className="font-semibold">Note Pro</span>.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Как начать */}
        <section id="getting-started" className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">Как начать пользоваться PLAUD</h2>
            <p className="text-muted-foreground mb-8">
              Пользователь проходит последовательность действий и получает готовую запись с расшифровкой и саммари.
            </p>
            <div className="space-y-8">
              {gettingStartedSteps.map((step) => (
                <div key={step.number} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="rounded-xl border border-border/30 bg-background p-5 shadow-soft">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {step.number}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                  <ScreenshotPlaceholder text={step.screenshot} imageSrc={stepImageMap[step.number]} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Как пользоваться */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">Как пользоваться PLAUD</h2>
            <p className="text-muted-foreground mb-8">
              Пользователь управляет устройством через одну кнопку и выбирает режим записи в зависимости от ситуации.
            </p>
            <div className="space-y-8">
              {usageItems.map((item, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.what}</p>
                    {item.detail && (
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{item.detail}</p>
                    )}
                  </div>
                  <ScreenshotPlaceholder text={item.screenshot} imageSrc={usageImageMap[i]} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Приложение */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">Приложение PLAUD: основные функции</h2>
            <p className="text-muted-foreground mb-8">
              Приложение показывает записи, обрабатывает их и формирует результат в удобном виде. Скачать приложение можно на <PlaudLink>официальном сайте</PlaudLink>.
            </p>
            <div className="space-y-10">
              {features.map((f, i) => {
                const matchedImage = Object.entries(featureImageMap).find(([key]) => f.title.includes(key));
                return (
                  <div key={i}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg mb-2">{f.title}</h3>
                        <p className="text-sm text-muted-foreground">{f.what}</p>
                      </div>
                      <ScreenshotPlaceholder
                        text={f.screenshot}
                        imageSrc={matchedImage?.[1]}
                      />
                    </div>
                    {i < features.length - 1 && <div className="border-b border-border/30 mt-10" />}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. Облако */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Как работает облако в PLAUD</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-5">
                <div className="space-y-2 text-sm text-muted-foreground">
                  {cloudInfo.intro.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Что хранится где</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{cloudInfo.storage}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Как отключить облако</h3>
                  <p className="text-sm text-muted-foreground">{cloudInfo.disable}</p>
                </div>
              </div>
              <ScreenshotPlaceholder text="AutoFlow — автоматическая обработка записей" imageSrc={plaudAutoflow} />
            </div>
          </div>
        </section>

        {/* 8. Как оплачивать */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Как работает оплата</h2>
            <div className="space-y-2 text-muted-foreground mb-6">
              {paymentInfo.intro.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Где посмотреть остаток</h3>
                <p className="text-sm text-muted-foreground">{paymentInfo.whereToCheck}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Что происходит при окончании минут</h3>
                <p className="text-sm text-muted-foreground">{paymentInfo.whenRunsOut}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Как пополнить минуты</h3>
                <p className="text-sm text-muted-foreground">{paymentInfo.howToBuyMore}</p>
              </div>
            </div>
            <div className="mt-8">
              <ScreenshotPlaceholder text="Веб-приложение PLAUD — список записей и шаблоны" imageSrc={plaudWebapp} />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Подробнее об условиях — на <PlaudLink>официальном сайте</PlaudLink>.
            </p>
          </div>
        </section>

        {/* 9. Частые ошибки */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Частые ошибки при работе с PLAUD</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mistakes.map((m, i) => (
                <div key={i} className="rounded-xl bg-secondary/30 p-5">
                  <p className="font-semibold text-foreground mb-2">{m.error}</p>
                  <p className="text-sm text-muted-foreground">{m.consequence}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FAQ */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Ответы на частые вопросы</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-foreground">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 11. Итог */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">Как использовать PLAUD эффективно</h2>
            <div className="space-y-3 text-muted-foreground mb-6">
              <p>PLAUD фиксирует разговор, превращает речь в текст и помогает быстро получить результат.</p>
              <p>Пользователь запускает запись, обрабатывает файл и использует готовую информацию в работе.</p>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Что сделать сейчас:</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                {conclusionSteps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-xl bg-secondary/30 p-5 text-center">
              <p className="text-muted-foreground mb-2">Узнать больше о PLAUD и выбрать устройство:</p>
              <a
                href={PLAUD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 underline underline-offset-4 transition-colors"
              >
                Перейти на plaud.ai
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </PageTransition>
  );
};

export default PlaudGuidePage;
