import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  modelComparison,
  gettingStartedSteps,
  usageItems,
  features,
  cloudInfo,
  paymentInfo,
  mistakes,
  faqItems,
} from "./plaud-guide-sections";

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

const ScreenshotPlaceholder = ({ className = "" }: { className?: string }) => (
  <div
    className={`rounded-xl border-2 border-dashed border-border/40 bg-secondary/30 aspect-video flex items-center justify-center ${className}`}
  >
    <p className="text-sm text-muted-foreground">Сюда будет добавлен скриншот</p>
  </div>
);

const PlaudGuidePage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Инструкция PLAUD AI — как пользоваться | Александра Мойс</title>
        <meta name="description" content="Подробная инструкция по PLAUD AI: настройка, функции, облако, оплата, частые ошибки и FAQ." />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 pt-24 pb-4">
          <PageBreadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Материалы", href: "/materials/resources" },
              { label: "Инструкция PLAUD AI" },
            ]}
          />
        </div>

        {/* 1. Header */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Инструкция по PLAUD AI
            </h1>
            <p className="text-muted-foreground text-lg">
              Всё, что нужно знать: от первого включения до ежедневного использования.
            </p>
          </div>
        </section>

        {/* 2. Что такое PLAUD */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Что такое PLAUD</h2>
            <div className="space-y-3 text-muted-foreground mb-8">
              <p>PLAUD — это компактное устройство для записи разговоров с автоматической расшифровкой и конспектированием через ИИ.</p>
              <p>Вы записываете встречу, лекцию или звонок. Приложение превращает аудио в текст, выделяет ключевые мысли и формирует список задач.</p>
              <p>Работает через мобильное приложение PLAUD AI (iOS и Android).</p>
            </div>
            <ScreenshotPlaceholder />
          </div>
        </section>

        {/* 3. Какую модель выбрать */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Какую модель выбрать</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Модель</TableHead>
                    <TableHead>Форм-фактор</TableHead>
                    <TableHead>Запись</TableHead>
                    <TableHead>Память</TableHead>
                    <TableHead>Батарея</TableHead>
                    <TableHead>Лучше всего для</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modelComparison.map((m) => (
                    <TableRow key={m.name}>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell>{m.formFactor}</TableCell>
                      <TableCell>{m.recording}</TableCell>
                      <TableCell>{m.memory}</TableCell>
                      <TableCell>{m.battery}</TableCell>
                      <TableCell>{m.best}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 bg-secondary/30 rounded-xl px-5 py-3 text-sm text-muted-foreground">
              Если не уверены — берите PLAUD Note. Это универсальная модель для большинства задач.
            </div>
          </div>
        </section>

        {/* 4. Как начать */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">Как начать</h2>
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
                  <ScreenshotPlaceholder />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Как пользоваться (кнопки / режимы) */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">Как пользоваться: кнопки и режимы</h2>
            <div className="space-y-8">
              {usageItems.map((item, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><span className="font-medium text-foreground">Что делает:</span> {item.what}</p>
                      <p><span className="font-medium text-foreground">Когда использовать:</span> {item.when}</p>
                    </div>
                  </div>
                  <ScreenshotPlaceholder />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Приложение: основные функции */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">Приложение: основные функции</h2>
            <div className="space-y-10">
              {features.map((f, i) => (
                <div key={i}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground text-lg">{f.title}</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><span className="font-medium text-foreground">Что это:</span> {f.what}</p>
                        <p><span className="font-medium text-foreground">Зачем:</span> {f.why}</p>
                        <p><span className="font-medium text-foreground">Как использовать:</span> {f.how}</p>
                      </div>
                    </div>
                    <ScreenshotPlaceholder />
                  </div>
                  {i < features.length - 1 && <div className="border-b border-border/30 mt-10" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Облако */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">Что такое облако и зачем оно</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-5">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Что хранится на устройстве</h3>
                  <p className="text-sm text-muted-foreground">{cloudInfo.onDevice}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Что в облаке</h3>
                  <p className="text-sm text-muted-foreground">{cloudInfo.inCloud}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Зачем облако</h3>
                  <p className="text-sm text-muted-foreground">{cloudInfo.whyCloud}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Можно ли без него</h3>
                  <p className="text-sm text-muted-foreground">{cloudInfo.withoutCloud}</p>
                </div>
              </div>
              <ScreenshotPlaceholder />
            </div>
          </div>
        </section>

        {/* 8. Как оплачивать */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Как оплачивать</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Как работает лимит минут</h3>
                <p className="text-sm text-muted-foreground">{paymentInfo.howLimitWorks}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Что происходит, когда минуты заканчиваются</h3>
                <p className="text-sm text-muted-foreground">{paymentInfo.whenRunsOut}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Где посмотреть остаток</h3>
                <p className="text-sm text-muted-foreground">{paymentInfo.whereToCheck}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Как купить дополнительные минуты</h3>
                <p className="text-sm text-muted-foreground">{paymentInfo.howToBuyMore}</p>
              </div>
            </div>
            <div className="mt-8">
              <ScreenshotPlaceholder />
            </div>
          </div>
        </section>

        {/* 9. Частые ошибки */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Частые ошибки</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Частые вопросы</h2>
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
      </div>

      <Footer />
    </PageTransition>
  );
};

export default PlaudGuidePage;
