import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";
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
import {
  modelComparison,
  gettingStartedSteps,
  usageItems,
  features,
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

const PlaudGuidePage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>PLAUD: инструкция на русском языке | Александра Мойс</title>
        <meta name="description" content="Подробная инструкция по PLAUD AI: настройка, функции, облако, оплата, частые ошибки и FAQ." />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 pt-24 pb-4">
          <PageBreadcrumbs
            currentPage="Инструкция PLAUD AI"
            parentPages={[
              { label: "Главная", href: "/" },
              { label: "Материалы", href: "/materials/resources" },
            ]}
          />
        </div>

        {/* 1. Header */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              PLAUD: инструкция на русском языке
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              Показываю, как выбрать модель, запустить запись, разобраться в приложении, понять работу облака и настроить всё без путаницы.
            </p>
            <p className="text-sm text-muted-foreground">
              Официальный сайт: <PlaudLink />
            </p>
          </div>
        </section>

        {/* 2. Что такое PLAUD */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Что такое PLAUD — простыми словами</h2>
            <div className="space-y-3 text-muted-foreground mb-4">
              <p><a href={PLAUD_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline underline-offset-2">PLAUD</a> записывает разговор, переводит речь в текст и формирует краткое содержание.</p>
              <p>Пользователь запускает запись, открывает файл в приложении и запускает обработку. Система показывает расшифровку, саммари и выделяет ключевые мысли и договорённости.</p>
              <p>PLAUD экономит время и избавляет от ручных конспектов.</p>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              PLAUD подходит для встреч, переговоров, звонков, лекций, интервью и личных заметок.
            </p>
            <ScreenshotPlaceholder text="Устройство PLAUD и приложение" imageSrc={plaudHeroDevice} />
          </div>
        </section>

        {/* 3. Какую модель выбрать */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">Какую модель выбрать</h2>
            <p className="text-muted-foreground mb-6">
              Все модели PLAUD записывают звук, синхронизируются с приложением и формируют текст и саммари. Разница заключается в формате устройства и сценарии использования. Подробности — на <PlaudLink>официальном сайте</PlaudLink>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Модель</TableHead>
                      <TableHead>Кому подходит</TableHead>
                      <TableHead>Когда использовать</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modelComparison.map((m) => (
                      <TableRow key={m.name}>
                        <TableCell className="font-medium">{m.name}</TableCell>
                        <TableCell>{m.audience}</TableCell>
                        <TableCell>{m.useCase}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <ScreenshotPlaceholder text="PLAUD Note на телефоне" imageSrc={plaudNotePhone} />
            </div>
            <div className="bg-secondary/30 rounded-xl px-5 py-3 text-sm text-muted-foreground">
              Пользователь выбирает модель по сценарию: офис и звонки — Note, перемещение и выезды — NotePin, переговорные — Note Pro.
            </div>
          </div>
        </section>

        {/* 4. Как начать */}
        <section className="py-12 md:py-16 bg-secondary/30">
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
