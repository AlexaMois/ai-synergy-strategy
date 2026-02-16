import { Helmet } from "react-helmet";
import { SEOHead } from "@/components/SEOHead";
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
  Building2,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import { trackCTAClick } from "@/utils/analytics";

const ArchitecturePage = () => {
  const scrollToContact = () => {
    trackCTAClick({ location: 'services', buttonText: 'Архитектура CTA' });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const painPoints = [
    "Непонятно, какую технологию выбрать: Make, n8n, API, готовые платформы",
    "Риск vendor lock-in — привязка к одному поставщику",
    "Сложность масштабирования: решение работает сейчас, но не вырастет",
    "Интеграционный хаос: системы не связаны между собой",
    "Вопросы безопасности данных и compliance остаются открытыми",
    "Нет понимания, как измерять успех внедрения"
  ];

  const process = [
    { title: "Анализ требований и ограничений", desc: "Понимаю, что нужно бизнесу, какие системы уже есть" },
    { title: "Проектирование архитектуры", desc: "Выбираю оптимальный стек: LLM, интеграции, хранение данных" },
    { title: "Валидация рисков", desc: "Проверяю узкие места, безопасность, масштабируемость" },
    { title: "Тестирование гипотез", desc: "Прототипирование ключевых сценариев до полного внедрения" },
    { title: "Формирование roadmap", desc: "Пошаговый план с контрольными точками и метриками" }
  ];

  const deliverables = [
    "Архитектурная схема решения с описанием компонентов",
    "Выбор технологий с обоснованием (LLM, платформы, API)",
    "Три сценария реализации: быстрый / оптимальный / комплексный",
    "Анализ рисков и план их митигации",
    "Критерии приёмки и KPI для каждого этапа",
    "Roadmap развития системы на 6-12 месяцев"
  ];

  const whyImportant = [
    { metric: "60%", text: "проектов проваливаются из-за плохой архитектуры" },
    { metric: "×3-5", text: "экономия при правильном проектировании" },
    { metric: "0", text: "переделок при грамотном планировании" }
  ];

  return (
    <PageTransition>
      <SEOHead />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.servicesArchitecture())}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <PageBreadcrumbs 
            currentPage="Архитектура" 
            parentPages={[{ label: "Услуги", href: "/services" }]}
          />

          {/* Hero - Compact */}
          <section className="py-8 md:py-12">
            <div className="grid lg:grid-cols-[1fr,auto] gap-8 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-4">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Услуга 02</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Архитектура
                </h1>
                <p className="text-lg text-foreground/80 max-w-2xl">
                  Проектирование AI-решения, которое встраивается в ваш процесс. Выбор технологий без лишних затрат, готовое ТЗ для разработчиков.
                </p>
              </div>
              
              {/* Metrics Card */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 lg:min-w-[280px]">
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-primary">×3-5</div>
                    <div className="text-xs text-foreground/60">экономия на внедрении</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-primary">3</div>
                    <div className="text-xs text-foreground/60">сценария реализации</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
                    <div className="text-xs text-foreground/60">готовое ТЗ</div>
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
                Для компаний, которые уже прошли диагностику и понимают, что им нужно ИИ-решение. Для тех, кто хочет избежать типичных ошибок: vendor lock-in, невозможность масштабирования, интеграционный хаос.
              </p>
            </div>

            {/* Difference */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <Lightbulb className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2 text-sm">В чём отличие</h3>
              <p className="text-sm text-foreground/70">
                Я не привязана к конкретным вендорам и выбираю технологии под задачу, а не под партнёрские комиссии. Архитектура проектируется с учётом роста. Каждое решение обосновано экономически.
              </p>
            </div>

            {/* Example */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <FileText className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2 text-sm">Реальный пример</h3>
              <p className="text-sm text-foreground/70">
                Производственная компания планировала enterprise-платформу за <span className="text-primary font-semibold">8 млн ₽</span>. После проектирования нашли решение на n8n + GigaChat + 1С за <span className="text-primary font-semibold">1,5 млн ₽</span> с теми же возможностями.
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
                Сокращение бюджета внедрения в <span className="text-primary font-semibold">3–5 раз</span> с сохранением качества. 
                Понимание что внедрять и в каком порядке.
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
                    <div className="text-2xl md:text-3xl font-bold text-primary">от 60 000 ₽</div>
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

export default ArchitecturePage;
