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
  Building2
} from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";

const ArchitecturePage = () => {
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
      content: "Для тех, кто хочет внедрять ИИ не «точечно», а как часть управленческой логики. Для компаний, которые знают что внедрять, но не знают как."
    },
    {
      icon: AlertTriangle,
      heading: "Какая боль закрывает",
      list: [
        "Решения работают отдельно, не усиливают друг друга",
        "Бизнес сталкивается с перегруженными «коробками» инструментов",
        "Нет ясности что выбрать: какую платформу, какой язык модели, свой сервер или облако",
        "Смета подрядчиков неочевидна и кажется завышена",
        "Каждый инструмент живёт своей жизнью, нет интеграции"
      ]
    },
    {
      icon: Info,
      heading: "Почему это важно",
      content: "ИИ работает только тогда, когда идёт в связке с процессами. Если логики нет — эффект не появится, даже при дорогих технологиях."
    },
    {
      icon: Cog,
      heading: "Как это работает",
      list: [
        "Формулируем что должно измениться в бизнесе",
        "Строю архитектуру: интеграции, маршруты данных, взаимодействие ролей",
        "Выбираю инструменты без привязки к вендорам (только нужные)",
        "Учитываю требования РФ: где данные, какие контуры, импортозамещение",
        "Проектирую три сценария внедрения: быстрый / оптимальный / фундаментальный",
        "Формирую карту внедрения с шагами, рисками, сроками"
      ]
    },
    {
      icon: Package,
      heading: "Что вы получаете",
      list: [
        "Ясную обоснованную архитектуру, которую понимают управленцы и ИТ",
        "Три сценария внедрения с разными затратами и сроками",
        "Прозрачные критерии выбора подрядчиков",
        "Конкретные требования к инструментам (а не размытые)",
        "Техническое задание для разработки",
        "Понимание где простота важнее мощности, а где наоборот",
        "Реальный бюджет и сроки разработки"
      ]
    },
    {
      icon: Lightbulb,
      heading: "В чём отличие",
      content: "Я соединяю управленческое мышление и инженерную точность. Смотрю на систему так же, как собственник или CTO."
    },
    {
      icon: FileText,
      heading: "Реальный пример",
      content: "Компания хотела внедрить 14 инструментов. После архитектуры осталось 3 — самые простые и недорогие. Эффект от трёх инструментов оказался в разы выше, чем от первоначального плана."
    },
    {
      icon: TrendingUp,
      heading: "Результат",
      content: "Компании часто сокращают бюджет внедрения ×3–5, сохраняя качество. Понимание что внедрять и в каком порядке."
    }
  ];

  const metrics = [
    { value: "×3-5", label: "экономия на внедрении" },
    { value: "3", label: "сценария реализации" },
    { value: "100%", label: "готовое ТЗ" }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Архитектура ИИ-решений | Александра Моисеева</title>
        <meta name="description" content="Проектирование AI-решения, которое встраивается в ваш процесс. Выбор технологий без лишних затрат, интеграция с CRM, 1С, готовое техническое задание." />
        <link rel="canonical" href="https://aleksamois.ru/services/architecture" />
        <meta property="og:title" content="Архитектура ИИ-решений | Александра Моисеева" />
        <meta property="og:description" content="Проектирование AI-решения для вашего бизнеса. Выбор технологий, интеграция с CRM и 1С." />
        <meta property="og:url" content="https://aleksamois.ru/services/architecture" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.servicesArchitecture())}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 md:px-6">
          <PageBreadcrumbs 
            currentPage="Архитектура" 
            parentPages={[{ label: "Услуги", href: "/services" }]}
          />

          {/* Hero */}
          <section className="py-12 md:py-20">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <span className="text-primary font-medium">Услуга 02</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Архитектура
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
                Проектирование AI-решения, которое встраивается в ваш процесс. Выбираем технологии без лишних затрат, определяем интеграцию с CRM, 1С, производственными системами, готовим техническое задание для разработчиков.
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
                  <div className="text-3xl font-bold text-primary">от 60 000 ₽</div>
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
                Нужна архитектура ИИ-решения?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Обсудим ваш проект и спроектируем систему, которая работает
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

export default ArchitecturePage;
