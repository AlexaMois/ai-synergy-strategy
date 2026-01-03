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
  Cog, 
  Package, 
  Lightbulb, 
  FileText, 
  TrendingUp,
  Clock,
  Compass,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import { trackCTAClick } from "@/utils/analytics";

const DiagnosticsPage = () => {
  const scrollToContact = () => {
    trackCTAClick({ location: 'services', buttonText: 'Диагностика CTA' });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const painPoints = [
    "Сложно понять, что именно стоит автоматизировать",
    "Подрядчики предлагают разные решения, каждое «лучшее»",
    "Есть страх вложиться в инструмент, который не принесёт пользы",
    "Нет единой картины процессов — только гипотезы",
    "Неясно, с чего начать и какой бюджет закладывать",
    "ИТ-отдел и бизнес говорят на разных языках"
  ];

  const process = [
    { title: "Разбираю цели бизнеса и контекст", desc: "Понимаю стратегические приоритеты и ограничения" },
    { title: "Исследую процессы", desc: "Где теряются время и деньги, какие узкие места" },
    { title: "Оцениваю зрелость данных и ИТ-ландшафт", desc: "Что уже есть, что можно использовать" },
    { title: "Анализирую готовность команды", desc: "Кто будет работать с решениями, какие навыки нужны" },
    { title: "Формирую карту решений", desc: "Полезные → возможные → лишние" }
  ];

  const deliverables = [
    "Чёткий ответ: где ИИ даст эффект, а где нет",
    "Список решений для внедрения в ближайшие 2–6 недель",
    "Сценарии по уровню вложений: минимальный / оптимальный / расширенный",
    "Понимание, где простота важнее мощности",
    "Приоритизация задач по ROI",
    "Карта рисков и зависимостей"
  ];

  const whyImportant = [
    { metric: "70%", text: "ИИ-проектов не достигают целей без диагностики" },
    { metric: "3-6 мес", text: "среднее время на исправление ошибок внедрения" },
    { metric: "×5-10", text: "стоимость переделки выше первоначального внедрения" }
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
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.servicesDiagnostics())}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <PageBreadcrumbs 
            currentPage="Диагностика" 
            parentPages={[{ label: "Услуги", href: "/services" }]}
          />

          {/* Hero - Compact */}
          <section className="py-8 md:py-12">
            <div className="grid lg:grid-cols-[1fr,auto] gap-8 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-4">
                  <Compass className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Услуга 01</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Диагностика
                </h1>
                <p className="text-lg text-foreground/80 max-w-2xl">
                  Анализ процессов и ИТ-ландшафта. Честный разбор где ИИ даст результат, где нужна подготовка, где он не нужен.
                </p>
              </div>
              
              {/* Metrics Card */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 lg:min-w-[280px]">
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-primary">20-60%</div>
                    <div className="text-xs text-foreground/60">снижение потерь</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-primary">2-6 нед</div>
                    <div className="text-xs text-foreground/60">до внедрения</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-primary">3</div>
                    <div className="text-xs text-foreground/60">сценария бюджета</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Two Column Grid - Pain & Process */}
          <section className="py-8 grid md:grid-cols-2 gap-6">
            {/* Pain Points */}
            <div className="bg-card rounded-xl p-5 border border-border shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h2 className="font-semibold text-foreground">Какую боль закрывает</h2>
              </div>
              <ul className="space-y-2.5">
                {painPoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="bg-card rounded-xl p-5 border border-border shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <Cog className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Как это работает</h2>
              </div>
              <ul className="space-y-3">
                {process.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 font-medium mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.title}</div>
                      <div className="text-xs text-foreground/60">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Why Important */}
          <section className="py-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h2 className="font-semibold text-foreground">Почему это важно</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {whyImportant.map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-amber-700">{item.metric}</div>
                    <div className="text-xs text-foreground/70">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Deliverables */}
          <section className="py-8">
            <div className="bg-gradient-to-r from-gray-50 to-background rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <Package className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Что вы получаете</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Three Cards Row */}
          <section className="py-8 grid md:grid-cols-3 gap-4">
            {/* For Who */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <Users className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2 text-sm">Для кого</h3>
              <p className="text-sm text-foreground/70">
                Для компаний, которые хотят внедрить ИИ, но не понимают, с чего начать. Для тех, кто уже пробовал и разочаровался. Для руководителей, которым важно принять решение на основе фактов, а не обещаний подрядчиков.
              </p>
            </div>

            {/* Difference */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <Lightbulb className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2 text-sm">В чём отличие</h3>
              <p className="text-sm text-foreground/70">
                Я не продаю конкретное решение — я ищу, что действительно нужно. Могу сказать «вам ИИ не нужен» или «начните с простого». Честность важнее продажи. Фокус на экономике, а не на технологиях ради технологий.
              </p>
            </div>

            {/* Example */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <FileText className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2 text-sm">Реальный пример</h3>
              <p className="text-sm text-foreground/70">
                Логистическая компания хотела внедрить «умного бота». После диагностики выяснилось: 80% обращений — типовые вопросы. Вместо дорогого ИИ внедрили простую базу знаний. Экономия: <span className="text-primary font-semibold">400 000 ₽</span> в год.
              </p>
            </div>
          </section>

          {/* Result Highlight */}
          <section className="py-8">
            <div className="bg-primary/5 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">Результат</span>
              </div>
              <p className="text-foreground/80 flex-1">
                Снижение потерь времени на <span className="text-primary font-semibold">20–60%</span>. 
                Четкое понимание: где внедрять ИИ, за сколько, за какое время.
              </p>
            </div>
          </section>

          {/* Pricing CTA */}
          <section className="py-8">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-6 md:gap-10">
                  <div>
                    <div className="text-xs text-foreground/60 uppercase tracking-wide mb-1">Стоимость</div>
                    <div className="text-2xl md:text-3xl font-bold text-primary">от 15 000 ₽</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-foreground/60" />
                    <div>
                      <div className="text-xs text-foreground/60">Срок</div>
                      <div className="font-medium text-foreground">7–10 дней</div>
                    </div>
                  </div>
                </div>
                <Button size="lg" onClick={scrollToContact} className="gap-2">
                  Заказать звонок
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
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
