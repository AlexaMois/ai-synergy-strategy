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
import plaudExport from "@/assets/plaud/plaud-export.png";
import plaudWebapp from "@/assets/plaud/plaud-webapp.png";
import plaudSummary from "@/assets/plaud/plaud-summary.webp";
import plaudAsk from "@/assets/plaud/plaud-ask.png";
import plaudMultimodal from "@/assets/plaud/plaud-multimodal.webp";
import plaudDemo from "@/assets/plaud/plaud-demo.webm";
import {
  modelComparison,
  gettingStartedSteps,
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
  "Выберите экономичный вариант оплаты",
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
  { en: "Record", ru: "Запись", desc: "Запускает или обозначает запись разговора." },
  { en: "Meeting", ru: "Встреча", desc: "Режим для живого разговора, совещания, лекции или консультации." },
  { en: "Call", ru: "Звонок", desc: "Режим для записи телефонного разговора через устройство." },
  { en: "All files", ru: "Все файлы", desc: "Раздел, где находятся записи." },
  { en: "Generate", ru: "Сгенерировать / обработать", desc: "Запускает обработку записи, чтобы получить текст и краткое содержание." },
  { en: "Generate now", ru: "Сгенерировать сейчас", desc: "Подтверждает запуск обработки." },
  { en: "Transcript", ru: "Расшифровка", desc: "Показывает полный текст записи." },
  { en: "Summary", ru: "Краткое содержание", desc: "Показывает основные мысли, выводы и договорённости." },
  { en: "Ask PLAUD", ru: "Спросить PLAUD", desc: "Позволяет задавать вопросы по записи, например: «Какие задачи обсудили?» или «Что по срокам?»" },
  { en: "Templates", ru: "Шаблоны", desc: "Помогает выбрать формат обработки: встреча, интервью, конспект, задачи, протокол." },
  { en: "Auto generation", ru: "Автоматическая генерация", desc: "PLAUD сам выбирает шаблон, модель и язык обработки." },
  { en: "Custom generation", ru: "Ручная настройка генерации", desc: "Позволяет вручную выбрать шаблон, модель и язык." },
  { en: "Export", ru: "Выгрузить", desc: "Сохраняет или отправляет запись, расшифровку, краткое содержание или майнд-карту." },
  { en: "Search", ru: "Поиск", desc: "Помогает найти нужную запись или фрагмент." },
  { en: "Membership Center", ru: "Раздел тарифа и минут", desc: "Показывает тариф, остаток минут и варианты пополнения." },
  { en: "Private Cloud Sync", ru: "Облачная синхронизация", desc: "Синхронизирует записи и результаты между устройствами." },
  { en: "AutoFlow", ru: "Автоматический поток обработки", desc: "Может автоматически создавать расшифровку и краткое содержание после синхронизации или загрузки записи." },
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

const appFeatures: { en: string; ru: string; text: string }[] = [
  {
    en: "Transcript",
    ru: "Расшифровка",
    text: "Это полный текст записи. Нужен, когда важно найти точную формулировку, цитату, вопрос, договорённость или спорный момент.",
  },
  {
    en: "Summary",
    ru: "Краткое содержание",
    text: "Это сжатый пересказ записи. Нужен, чтобы быстро понять суть встречи без повторного прослушивания.",
  },
  {
    en: "Ask PLAUD",
    ru: "Вопросы по записи",
    text: "Можно задать вопрос по содержанию записи: какие задачи обсудили, какие сроки назвали, что обещал клиент, какие решения приняли.",
  },
  {
    en: "Templates",
    ru: "Шаблоны",
    text: "Шаблоны помогают получить результат в нужном виде: протокол встречи, список задач, конспект, интервью, разбор звонка или рабочее резюме.",
  },
  {
    en: "Export",
    ru: "Выгрузка",
    text: "Позволяет сохранить или отправить результат: аудио, текст, краткое содержание или майнд-карту.",
  },
  {
    en: "AutoFlow",
    ru: "Автоматическая обработка",
    text: "Автоматически запускает обработку после синхронизации или загрузки записи. Подходит тем, кто часто записывает встречи и хочет меньше ручных действий.",
  },
];

const generateSteps: { title: string; text: string; badges?: string[] }[] = [
  { title: "Откройте запись", text: "Перейдите в раздел All files и выберите нужный файл.", badges: ["All files"] },
  { title: "Нажмите Generate", text: "Кнопка Generate запускает обработку записи.", badges: ["Generate"] },
  {
    title: "Выберите способ генерации",
    text: "Auto generation подойдёт для простого старта: PLAUD сам подберёт параметры обработки. Custom generation подойдёт, когда нужно вручную выбрать шаблон, модель или язык.",
    badges: ["Auto generation", "Custom generation"],
  },
  { title: "Дождитесь результата", text: "После обработки появятся Transcript и Summary. Время обработки зависит от длины записи и соединения." },
  { title: "Проверьте текст", text: "Посмотрите, правильно ли распозналась речь, имена, термины, названия компаний и важные договорённости." },
  {
    title: "Используйте результат",
    text: "Скопируйте текст, задайте вопрос через Ask PLAUD, выберите шаблон или выгрузите результат через Export.",
    badges: ["Ask PLAUD", "Export"],
  },
];

const autoGenList = [
  "нужна быстрая обработка",
  "запись обычная: встреча, заметка, звонок",
  "не нужен специальный формат документа",
  "хочется получить результат без настроек",
];

const customGenList = [
  "нужен конкретный шаблон",
  "важен язык обработки",
  "нужна структура под протокол, интервью, задачи или консультацию",
  "запись будет использоваться как рабочий документ",
];

const templates: { en: string; ru: string; when: string; result: string }[] = [
  {
    en: "Meeting",
    ru: "Встреча",
    when: "для совещаний, планёрок, рабочих обсуждений.",
    result: "тему встречи, основные мысли, решения, задачи и следующие шаги.",
  },
  {
    en: "Client call",
    ru: "Звонок с клиентом",
    when: "для продаж, консультаций, переговоров, обсуждения условий.",
    result: "потребность клиента, вопросы, возражения, договорённости, задачи.",
  },
  {
    en: "Interview",
    ru: "Интервью",
    when: "для экспертных интервью, подкастов, исследований, сбора обратной связи.",
    result: "ключевые ответы, цитаты, темы, инсайты и выводы.",
  },
  {
    en: "Lecture",
    ru: "Лекция",
    when: "для обучения, вебинаров, курсов, выступлений.",
    result: "конспект, основные тезисы, структуру темы и важные определения.",
  },
  {
    en: "Action items",
    ru: "Список задач",
    when: "когда после разговора нужно быстро понять, что делать дальше.",
    result: "задачи, ответственных, сроки и следующие шаги, если они прозвучали в записи.",
  },
  {
    en: "Quick summary",
    ru: "Краткое резюме",
    when: "когда нужно быстро понять суть записи без деталей.",
    result: "короткий пересказ и главные выводы.",
  },
];

const exportSteps: { title: string; text: string; badges?: string[] }[] = [
  { title: "Откройте нужную запись", text: "Перейдите в All files и выберите файл, который хотите сохранить или отправить.", badges: ["All files"] },
  { title: "Нажмите кнопку экспорта", text: "Внутри записи найдите кнопку или иконку Export. Обычно она находится в меню файла.", badges: ["Export"] },
  { title: "Выберите, что выгружать", text: "Можно выгрузить аудио, Transcript, Summary или майнд-карту, если она доступна для этой записи.", badges: ["Audio", "Transcript", "Summary", "Mind map"] },
  { title: "Выберите формат", text: "Выберите удобный формат файла. Для текста подойдёт документ, для пересылки — файл или ссылка, для хранения — формат, который удобно открыть позже." },
  { title: "Проверьте важные настройки", text: "Если выгружаете Transcript, проверьте, нужны ли временные метки и разделение по говорящим." },
  { title: "Нажмите Export", text: "После этого сохраните файл или отправьте его нужному человеку.", badges: ["Export"] },
];

const exportOptions: { en: string; text: string }[] = [
  { en: "Transcript", text: "когда нужен полный текст разговора" },
  { en: "Summary", text: "когда нужно быстро передать суть" },
  { en: "Audio", text: "когда важно сохранить исходную запись" },
  { en: "Mind map", text: "когда нужен визуальный обзор темы" },
  { en: "DOCX / PDF", text: "когда нужно отправить результат коллегам или клиенту" },
];

const askGroups: { title: string; en: string; items: string[] }[] = [
  {
    title: "Для встречи",
    en: "Meeting",
    items: [
      "Какие решения приняли?",
      "Какие задачи обсудили?",
      "Какие сроки прозвучали?",
      "Кто за что отвечает?",
      "Какие вопросы остались открытыми?",
    ],
  },
  {
    title: "Для звонка с клиентом",
    en: "Client call",
    items: [
      "Что хочет клиент?",
      "Какие возражения были у клиента?",
      "Какие условия обсуждали?",
      "Что нужно отправить после звонка?",
      "Какие следующие шаги?",
    ],
  },
  {
    title: "Для обучения или лекции",
    en: "Lecture",
    items: [
      "Какие главные мысли?",
      "Какие термины нужно запомнить?",
      "Какие практические советы прозвучали?",
      "Составь краткий конспект.",
      "Сделай список действий после занятия.",
    ],
  },
  {
    title: "Для интервью",
    en: "Interview",
    items: [
      "Какие ключевые цитаты есть в записи?",
      "Какие проблемы повторялись?",
      "Какие инсайты можно использовать?",
      "Составь краткое резюме интервью.",
      "Выдели сильные формулировки.",
    ],
  },
];

const readyPrompts = [
  "Составь список задач по этой записи.",
  "Выдели договорённости и сроки.",
  "Напиши краткое резюме встречи.",
  "Найди риски и спорные моменты.",
  "Подготовь письмо по итогам разговора.",
  "Составь план следующих шагов.",
];

const minutesRules = [
  "В Starter каждый месяц доступно 300 бесплатных минут для расшифровки записей.",
  "Бесплатные минуты обновляются в новом расчётном периоде, остаток не переносится.",
  "Докупленные минуты тратятся только сверх бесплатного лимита.",
  "Чем длиннее запись, тем больше минут расходуется.",
  "Если запись удалить после обработки, потраченные минуты не возвращаются.",
  "Если минуты закончились, можно продолжать записывать аудио, но расшифровка будет недоступна до пополнения или обновления лимита.",
];

const planChoices: { situation: string; advice: string }[] = [
  { situation: "Редко записываете встречи", advice: "используйте бесплатные 300 минут Starter и докупайте дополнительные при необходимости." },
  { situation: "Записываете волнами: то много, то мало", advice: "докупать минуты выгоднее, чем держать постоянную подписку." },
  { situation: "Стабильно много встреч каждую неделю", advice: "сравните расход минут с тарифом Pro или Unlimited." },
  { situation: "Записываете каждый рабочий день", advice: "смотрите Pro или Unlimited, если регулярно не хватает бесплатного лимита." },
  { situation: "Нужны расширенные функции", advice: "проверьте тарифы, потому что часть функций может зависеть от плана." },
];

const beforePayQuestions = [
  "Сколько часов встреч я реально записываю в месяц?",
  "Бывают ли у меня месяцы почти без записей?",
  "Нужны ли мне расширенные функции или достаточно расшифровки и краткого содержания?",
];

const EnBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-accent/25 text-accent px-3 py-1 text-sm font-semibold ring-1 ring-accent/40">
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
                    без путаницы в английском интерфейсе
                  </h1>
                  <p className="text-lg md:text-xl text-foreground/75 mb-8 max-w-2xl leading-snug">
                    Показываю, что означают кнопки в приложении, как запустить запись, получить расшифровку и краткое содержание, где смотреть минуты и как не переплатить за подписку.
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
                        { icon: Sparkles, label: "Краткое содержание" },
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
                Все модели PLAUD записывают звук, синхронизируются с приложением и помогают получать расшифровку и краткое содержание. Разница — в формате устройства и сценарии использования.
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

        {/* 4. Быстрый старт */}
        <section id="getting-started" className="px-4 md:px-6 py-16 md:py-24">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl mb-10 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                Быстрый старт:{" "}
                <span className="font-iriska font-normal italic text-accent">первая запись</span>{" "}
                за 10 минут
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Этот блок нужен, чтобы быстро проверить устройство и приложение без долгого изучения настроек.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {quickStartSteps.map((s) => (
                <div key={s.n} className="rounded-[24px] bg-background p-6 shadow-card ring-1 ring-foreground/5 flex flex-col">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground font-bold mb-4">
                    {s.n}
                  </span>
                  <h3 className="font-semibold text-foreground text-lg mb-2 leading-snug">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-grow">{s.text}</p>
                  {s.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {s.badges.map((b) => (
                        <EnBadge key={b}>{b}</EnBadge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[28px] bg-surface-mint p-7 md:p-8 shadow-plate ring-1 ring-foreground/5">
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-2">Подсказка</p>
              <p className="text-lg md:text-xl text-foreground/85 leading-snug">
                Сначала сделайте короткую тестовую запись. Так вы спокойно проверите звук, режим и обработку до настоящей встречи.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Словарь кнопок */}
        <section className="px-4 md:px-6 pb-16 md:pb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl mb-10 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                Английский интерфейс PLAUD:{" "}
                <span className="font-iriska font-normal italic text-accent">словарь кнопок</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Большинство сложностей возникает из-за английских названий в приложении. Ниже — перевод основных кнопок простым языком.
              </p>
            </div>
            <div className="rounded-[32px] bg-background p-6 md:p-10 shadow-plate-lg ring-1 ring-foreground/5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {dictionary.map((d) => (
                  <div key={d.en} className="rounded-2xl bg-secondary/40 p-5 md:p-6 ring-1 ring-foreground/5">
                    <EnBadge>{d.en}</EnBadge>
                    <p className="font-bold text-foreground text-lg mt-3 mb-1">{d.ru}</p>
                    <p className="text-base text-muted-foreground leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 rounded-[28px] bg-accent text-white p-7 md:p-8 shadow-plate ring-1 ring-foreground/5">
              <p className="text-sm uppercase tracking-widest text-white/80 font-semibold mb-2">С чего достаточно начать</p>
              <p className="text-lg md:text-xl text-white/95 leading-snug">
                Главные кнопки для первого раза:{" "}
                <span className="font-semibold">All files → Generate → Transcript → Summary → Export</span>.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Как сделать первую запись */}
        <section className="px-4 md:px-6 pb-16 md:pb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl mb-10 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                Как сделать{" "}
                <span className="font-iriska font-normal italic text-accent">первую запись</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Для первой проверки выберите простую ситуацию: короткая заметка голосом или разговор на 1–2 минуты.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              <ol className="lg:col-span-7 space-y-4">
                {firstRecordingSteps.map((s, i) => (
                  <li key={i} className="rounded-2xl bg-background p-5 md:p-6 shadow-card ring-1 ring-foreground/5 flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-foreground text-background font-bold text-sm">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg mb-1 leading-snug">{s.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{s.text}</p>
                      {s.badges && s.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {s.badges.map((b) => (
                            <EnBadge key={b}>{b}</EnBadge>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              <aside className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="rounded-[28px] bg-surface-blush p-7 md:p-8 shadow-plate ring-1 ring-foreground/5">
                  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">Мини-чек</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-5">
                    Перед важной{" "}
                    <span className="font-iriska font-normal italic text-accent">встречей</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {miniCheck.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-foreground/85">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                        <span className="text-sm md:text-base">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 rounded-[24px] bg-foreground text-background p-6 md:p-7 shadow-plate">
                  <p className="text-sm uppercase tracking-widest text-background/70 font-semibold mb-2">Важно</p>
                  <p className="text-base md:text-lg leading-snug text-background/95">
                    Если минуты закончились, аудио всё равно можно записывать и хранить, но для расшифровки и краткого содержания потребуется пополнить минуты или дождаться обновления лимита по тарифу.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 7. Облако */}
        {/* 7. Приложение PLAUD: основные функции */}
        <section className="px-4 md:px-6 py-16 md:py-24">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl mb-10 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                Приложение PLAUD:{" "}
                <span className="font-iriska font-normal italic text-accent">что в нём главное</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-snug">
                После записи вся работа идёт в приложении: там вы открываете файл, запускаете обработку, смотрите текст, краткое содержание, задачи и выгружаете результат.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {appFeatures.map((f) => (
                <div key={f.en} className="rounded-[24px] bg-background p-6 md:p-7 shadow-card ring-1 ring-foreground/5 flex flex-col">
                  <div className="mb-3">
                    <EnBadge>{f.en}</EnBadge>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-3">{f.ru}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[28px] bg-surface-mint p-7 md:p-10 shadow-plate ring-1 ring-foreground/5">
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">Главное для первого раза</p>
              <p className="text-lg md:text-xl text-foreground/90 leading-snug">
                Для старта достаточно освоить четыре действия: открыть запись, нажать <span className="font-semibold">Generate</span>, посмотреть <span className="font-semibold">Transcript</span> и <span className="font-semibold">Summary</span>, затем выгрузить результат через <span className="font-semibold">Export</span>.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Как получить Transcript и Summary */}
        <section className="px-4 md:px-6 pb-16 md:pb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl mb-10 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                Как получить{" "}
                <span className="font-iriska font-normal italic text-accent">Transcript и Summary</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-snug">
                Transcript — это полный текст записи. Summary — краткое содержание. Они появляются после обработки файла.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              <ol className="lg:col-span-7 space-y-4">
                {generateSteps.map((s, i) => (
                  <li key={i} className="rounded-2xl bg-background p-5 md:p-6 shadow-card ring-1 ring-foreground/5 flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-foreground text-background font-bold text-sm">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg mb-1 leading-snug">{s.title}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{s.text}</p>
                      {s.badges && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {s.badges.map((b) => (
                            <EnBadge key={b}>{b}</EnBadge>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              <aside className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
                <div className="rounded-[28px] bg-surface-mint p-7 md:p-8 shadow-plate ring-1 ring-foreground/5">
                  <div className="mb-3"><EnBadge>Auto generation</EnBadge></div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-4">
                    Когда выбирать <span className="font-iriska font-normal italic text-accent">Auto</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {autoGenList.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-foreground/85">
                        <span className="mt-2 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                        <span className="text-base">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[28px] bg-surface-blush p-7 md:p-8 shadow-plate ring-1 ring-foreground/5">
                  <div className="mb-3"><EnBadge>Custom generation</EnBadge></div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-4">
                    Когда выбирать <span className="font-iriska font-normal italic text-accent">Custom</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {customGenList.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-foreground/85">
                        <span className="mt-2 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                        <span className="text-base">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 9. Templates: какой шаблон выбрать */}
        <section className="px-4 md:px-6 pb-16 md:pb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl mb-10 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                <span className="font-iriska font-normal italic text-accent">Templates</span>: какой шаблон выбрать
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-snug">
                Шаблон влияет на то, каким получится итоговый материал. Одна и та же запись может превратиться в конспект, протокол, список задач или краткое резюме.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((t) => (
                <div key={t.en} className="rounded-[24px] bg-background p-6 md:p-7 shadow-card ring-1 ring-foreground/5 flex flex-col">
                  <div className="mb-3"><EnBadge>{t.en}</EnBadge></div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-4">{t.ru}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-accent mb-1">Когда выбрать</p>
                      <p className="text-base text-muted-foreground leading-relaxed">{t.when}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-accent mb-1">Что получите</p>
                      <p className="text-base text-muted-foreground leading-relaxed">{t.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[28px] bg-surface-mint p-7 md:p-10 shadow-plate ring-1 ring-foreground/5">
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">Если не знаете, что выбрать</p>
              <p className="text-lg md:text-xl text-foreground/90 leading-snug">
                Начните с обычного <span className="font-semibold">Summary</span> или <span className="font-semibold">Meeting</span>. После этого можно повторно обработать запись в более подходящем формате — если нужен протокол, список задач или конспект.
              </p>
            </div>
            <div className="mt-6 rounded-[28px] bg-accent text-white p-7 md:p-10 shadow-plate ring-1 ring-foreground/5">
              <p className="text-sm uppercase tracking-widest text-white/80 font-semibold mb-3">Мой практический совет</p>
              <p className="text-lg md:text-xl text-white/95 leading-snug">
                Для рабочих встреч чаще всего полезны два результата: <span className="font-semibold">Summary</span> и <span className="font-semibold">Action items</span>. Summary помогает быстро понять суть, а Action items превращает разговор в задачи.
              </p>
            </div>
          </div>
        </section>

        {/* 10. Export */}
        <section className="px-4 md:px-6 py-16 md:py-24">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl mb-10 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                <span className="font-iriska font-normal italic text-accent">Export</span>: как сохранить и отправить результат
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-snug">
                Export нужен, когда вы хотите забрать результат из PLAUD и использовать его дальше: отправить коллеге, сохранить в документ, приложить к отчёту или перенести в рабочую систему.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              <ol className="lg:col-span-7 space-y-4">
                {exportSteps.map((s, i) => (
                  <li key={i} className="rounded-2xl bg-background p-5 md:p-6 shadow-card ring-1 ring-foreground/5 flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-foreground text-background font-bold text-sm">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg mb-1 leading-snug">{s.title}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{s.text}</p>
                      {s.badges && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {s.badges.map((b) => (
                            <EnBadge key={b}>{b}</EnBadge>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              <aside className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
                <div className="rounded-[28px] bg-surface-blush p-7 md:p-8 shadow-plate ring-1 ring-foreground/5">
                  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">Что лучше выгружать</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-5">
                    Выберите <span className="font-iriska font-normal italic text-accent">формат</span>
                  </h3>
                  <ul className="space-y-3">
                    {exportOptions.map((o) => (
                      <li key={o.en} className="flex items-start gap-3 rounded-2xl bg-background/80 px-4 py-3 ring-1 ring-foreground/5">
                        <div className="flex-shrink-0"><EnBadge>{o.en}</EnBadge></div>
                        <span className="text-base text-foreground/85 leading-snug">— {o.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[24px] bg-surface-mint p-6 md:p-7 shadow-plate ring-1 ring-foreground/5">
                  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-2">Подсказка</p>
                  <p className="text-base md:text-lg text-foreground/85 leading-snug">
                    Для работы чаще всего хватает <span className="font-semibold">Summary</span> и <span className="font-semibold">Transcript</span>. Summary удобно отправить руководителю или клиенту, а Transcript оставить себе как полную базу разговора.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 11. Ask PLAUD */}
        <section className="px-4 md:px-6 pb-16 md:pb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl mb-10 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                <span className="font-iriska font-normal italic text-accent">Ask PLAUD</span>: как задавать вопросы по записи
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-snug mb-4">
                Ask PLAUD помогает быстро найти нужную информацию внутри записи без повторного прослушивания всего разговора.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                После обработки записи можно задавать вопросы по её содержанию. Это удобно, если встреча была длинной, а вам нужно быстро понять решения, задачи, сроки, риски или позицию клиента.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {askGroups.map((g) => (
                <div key={g.title} className="rounded-[24px] bg-background p-6 md:p-7 shadow-card ring-1 ring-foreground/5 flex flex-col">
                  <div className="mb-3"><EnBadge>{g.en}</EnBadge></div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-4">{g.title}</h3>
                  <ul className="space-y-2.5">
                    {g.items.map((q) => (
                      <li key={q} className="flex items-start gap-3 text-foreground/85">
                        <span className="mt-2 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                        <span className="text-base leading-snug">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[28px] bg-surface-mint p-7 md:p-10 shadow-plate ring-1 ring-foreground/5">
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">Как задавать хороший вопрос</p>
              <p className="text-lg md:text-xl text-foreground/90 leading-snug">
                Лучше задавать конкретный вопрос, а не общий. Например, вместо «Что там было?» написать: «Какие задачи и сроки обсудили на встрече?» Так ответ будет точнее и полезнее.
              </p>
            </div>
            <div className="mt-6 rounded-[28px] bg-background p-7 md:p-8 shadow-plate ring-1 ring-foreground/5">
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Готовые вопросы для копирования</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {readyPrompts.map((p) => (
                  <div key={p} className="rounded-2xl bg-secondary/40 px-5 py-4 ring-1 ring-foreground/5 text-base text-foreground/85 leading-snug">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 12. Минуты и оплата */}
        <section className="px-4 md:px-6 pb-16 md:pb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl mb-10 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                Минуты и оплата:{" "}
                <span className="font-iriska font-normal italic text-accent">как не переплатить</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-snug mb-4">
                PLAUD использует минуты для расшифровки аудио в текст. Важно понимать разницу между записью аудио и обработкой записи.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Запись аудио и расшифровка — это разные действия. PLAUD может записывать аудио даже тогда, когда минуты закончились. Но для получения Transcript и Summary нужны минуты на обработку.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              <div className="lg:col-span-7 rounded-[28px] bg-background p-7 md:p-8 shadow-plate ring-1 ring-foreground/5">
                <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Как работают минуты</p>
                <ul className="space-y-3">
                  {minutesRules.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-foreground/85">
                      <span className="mt-2 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-base md:text-lg leading-snug">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-5 rounded-[28px] bg-surface-blush p-7 md:p-8 shadow-plate ring-1 ring-foreground/5">
                <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">Перед оплатой</p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-5">
                  Задайте себе{" "}
                  <span className="font-iriska font-normal italic text-accent">3 вопроса</span>
                </h3>
                <ol className="space-y-3">
                  {beforePayQuestions.map((q, i) => (
                    <li key={q} className="flex items-start gap-3 text-foreground/85">
                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold text-sm">{i + 1}</span>
                      <span className="text-base md:text-lg leading-snug">{q}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-8 rounded-[32px] bg-background p-6 md:p-8 shadow-plate-lg ring-1 ring-foreground/5">
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-5">Что выбрать</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {planChoices.map((c) => (
                  <div key={c.situation} className="rounded-2xl bg-secondary/40 p-5 md:p-6 ring-1 ring-foreground/5">
                    <p className="font-bold text-foreground text-lg leading-snug mb-2">{c.situation}</p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">Рекомендация:</span> {c.advice}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-[28px] bg-accent text-white p-7 md:p-10 shadow-plate ring-1 ring-foreground/5">
              <p className="text-sm uppercase tracking-widest text-white/80 font-semibold mb-3">Моя практическая рекомендация</p>
              <p className="text-lg md:text-xl text-white/95 leading-snug">
                Начните с бесплатных 300 минут Starter в месяц. Если иногда выходите за этот лимит, докупайте минуты по необходимости. Так сначала расходуется бесплатный лимит, а докупленные минуты становятся резервом сверх него. Постоянная подписка нужна тем, кто стабильно записывает много встреч каждую неделю.
              </p>
            </div>
            <div className="mt-6 rounded-[28px] bg-surface-mint p-7 md:p-8 shadow-plate ring-1 ring-foreground/5">
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">Важно про экономию</p>
              <p className="text-lg md:text-xl text-foreground/90 leading-snug">
                Ежемесячные минуты по тарифу обычно не переносятся на следующий месяц. Поэтому, если вы используете PLAUD нерегулярно, часть оплаченного лимита может просто сгореть. Докупленные дополнительные минуты удобнее для тех, кто записывает не каждый день, а периодами.
              </p>
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
              <p>Начните с короткой тестовой записи. Проверьте звук, режим Meeting или Call, затем нажмите Generate и посмотрите Transcript и Summary.</p>
              <p>Для рабочих встреч сохраняйте два результата: краткое содержание для быстрого просмотра и расшифровку как полную базу разговора. Если нужно передать итог коллегам или клиенту, выгрузите результат через Export.</p>
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
