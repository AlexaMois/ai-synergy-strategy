import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  AlertTriangle, 
  Info, 
  Cog, 
  Package, 
  Lightbulb, 
  FileText, 
  TrendingUp,
  Clock,
  Compass
} from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";

const DiagnosticsPage = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = [
    {
      icon: Users,
      heading: "Для кого это",
      content: "CEO, COO, ИТ-директора, которые хотят принимать технологические решения на основе фактов, а не предположений подрядчиков."
    },
    {
      icon: AlertTriangle,
      heading: "Какая боль закрывает",
      list: [
        "Сложно понять что именно стоит автоматизировать",
        "Подрядчики предлагают разные решения, каждое «лучшее»",
        "Есть страх вложиться в инструмент, который не принесёт пользы",
        "Люди боятся изменений и не понимают зачем они нужны",
        "Нет единой картины процессов — только гипотезы"
      ]
    },
    {
      icon: Info,
      heading: "Почему это важно",
      content: "Часто компании внедряют решения, которые технически работают, но не приносят результата для бизнеса. Честный анализ помогает избежать этой ошибки."
    },
    {
      icon: Cog,
      heading: "Как это работает",
      list: [
        "Разбираю цели бизнеса и контекст",
        "Исследую процессы: где теряются время, деньги, контроль",
        "Оцениваю зрелость данных и ИТ-ландшафт",
        "Смотрю что уже есть и что можно усилить без замены",
        "Формирую карту решений: полезные → возможные → лишние"
      ]
    },
    {
      icon: Package,
      heading: "Что вы получаете",
      list: [
        "Четкий ответ где ИИ даст эффект, а где нет",
        "Список решений, которые можно внедрить в ближайшие 2–6 недель",
        "Процессы которые нужно починить прежде чем автоматизировать",
        "Сценарии по уровню вложений: минимальный / оптимальный / расширенный",
        "Прозрачный прогноз нагрузки на команду",
        "Понимание где простота важнее мощности, а где наоборот"
      ]
    },
    {
      icon: Lightbulb,
      heading: "В чём отличие",
      content: "Я не оцениваю только технологии. Смотрю на смысл задачи, процессы, людей, данные и архитектуру вместе."
    },
    {
      icon: FileText,
      heading: "Реальный пример",
      content: "В одной компании было шесть внедренных автоматизаций — ни одна не использовалась. После диагностики оказалось: решение лежало прямо под руками, просто было неправильно встроено в процесс."
    },
    {
      icon: TrendingUp,
      heading: "Результат",
      content: "Снижение потерь времени на 20–60%. Четкое понимание: где внедрять ИИ, за сколько, за какое время, что чинить прежде чем автоматизировать."
    }
  ];

  const metrics = [
    { value: "20-60%", label: "снижение потерь времени" },
    { value: "2-6 нед", label: "до внедрения решений" },
    { value: "3", label: "сценария бюджета" }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Диагностика бизнес-процессов | Александра Моисеева</title>
        <meta name="description" content="Аудит и анализ процессов для внедрения ИИ. Честный разбор где ИИ даст результат за месяц, где нужна подготовка процессов, где он вообще не нужен." />
        <link rel="canonical" href="https://aleksamois.ru/services/diagnostics" />
        <meta property="og:title" content="Диагностика бизнес-процессов | Александра Моисеева" />
        <meta property="og:description" content="Аудит и анализ процессов для внедрения ИИ. Честный разбор где ИИ даст результат." />
        <meta property="og:url" content="https://aleksamois.ru/services/diagnostics" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.servicesDiagnostics())}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 md:px-6">
          <PageBreadcrumbs 
            currentPage="Диагностика" 
            parentPages={[{ label: "Услуги", href: "/services" }]}
          />

          {/* Hero */}
          <section className="py-12 md:py-20">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Compass className="w-6 h-6 text-primary" />
                </div>
                <span className="text-primary font-medium">Услуга 01</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Диагностика
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
                Анализ ваших процессов и ИТ-ландшафта. Честный разбор где ИИ даст результат за месяц, где нужна подготовка процессов, где он вообще не нужен.
              </p>
              <Button size="lg" onClick={scrollToContact}>
                Обсудить задачу
              </Button>
            </div>
          </section>

          {/* Metrics */}
          <section className="py-8 border-t border-border">
            <div className="grid grid-cols-3 gap-4 p-6 bg-primary/5 rounded-xl">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {metric.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All Sections */}
          <section className="py-12 border-t border-border">
            <div className="grid md:grid-cols-2 gap-8">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div key={index} className="bg-card rounded-xl p-6 border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {section.heading}
                      </h3>
                    </div>
                    {section.content && (
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    )}
                    {section.list && (
                      <ul className="space-y-2">
                        {section.list.map((item, iIndex) => (
                          <li key={iIndex} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Pricing */}
          <section className="py-12 border-t border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 bg-primary/5 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Стоимость</div>
                  <div className="text-3xl font-bold text-primary">от 15 000 ₽</div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Срок</div>
                    <div className="font-medium text-foreground">7–10 дней</div>
                  </div>
                </div>
              </div>
              <Button size="lg" onClick={scrollToContact}>
                Обсудить задачу
              </Button>
            </div>
          </section>

          {/* CTA */}
          <section className="py-12 border-t border-border">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Готовы узнать, где ИИ принесёт пользу вашему бизнесу?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Начнём с честного разбора ваших процессов и определим точки роста
              </p>
              <Button size="lg" onClick={scrollToContact}>
                Обсудить задачу
              </Button>
            </div>
          </section>
        </div>

        <Contact />
      </main>

      <Footer />
    </PageTransition>
  );
};

export default DiagnosticsPage;
