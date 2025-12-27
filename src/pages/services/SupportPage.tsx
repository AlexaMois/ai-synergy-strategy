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
  Handshake,
  Shield
} from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";

const SupportPage = () => {
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
      content: "Для компаний, которые хотят снизить риски и не быть заложниками технических подрядчиков. Для тех, кто разочарован предыдущими проектами."
    },
    {
      icon: AlertTriangle,
      heading: "Какая боль закрывает",
      list: [
        "Сложно понять адекватна ли смета подрядчика",
        "Внедрения затягиваются и становятся сложнее",
        "Команды боятся ИИ или не понимают что с ним делать",
        "Подрядчики предлагают лишние функции, раздувают проект",
        "Решение сделано, но им никто не пользуется, оно «лежит на полке»"
      ]
    },
    {
      icon: Info,
      heading: "Почему это важно",
      content: "ИИ — это не только про код. Это про людей, функции, процессы и ответственность. Если одного из этого нет — система не сработает."
    },
    {
      icon: Cog,
      heading: "Как это работает",
      list: [
        "Проверяю сметы, архитектуру, техническое задание",
        "Контролирую ход работ еженедельно и качество разработки",
        "Обучаю сотрудников работать с ИИ простым языком",
        "Помогаю встроить решение в реальные процессы",
        "Оцениваю результат на реальных цифрах и метриках",
        "Гарантирую достижение обещанных результатов"
      ]
    },
    {
      icon: Package,
      heading: "Что вы получаете",
      list: [
        "Решение которое работает и используется, а не «лежит на полке»",
        "Минимизацию лишних затрат и функций",
        "Управляемый процесс внедрения (еженедельный контроль)",
        "Уверенность что подрядчики делают нужное",
        "Команду которая понимает инструмент и может его развивать",
        "Гарантию достижения метрик"
      ]
    },
    {
      icon: Lightbulb,
      heading: "В чём отличие",
      content: "Я стою на стороне клиента. Моя задача — защитить бизнес, а не оправдать подрядчика."
    },
    {
      icon: FileText,
      heading: "Реальный пример",
      content: "В одной компании подрядчик предложил решение за 2 млн. После экспертизы: половина функций не нужна, а задача решается за 0 ₽ — тем, что уже стоит в системе."
    },
    {
      icon: TrendingUp,
      heading: "Результат",
      content: "Компании сокращают бюджет внедрения на 20–80%. Система работает, результаты достигаются, команда не боится ИИ."
    }
  ];

  const metrics = [
    { value: "20-80%", label: "экономия бюджета" },
    { value: "100%", label: "гарантия результата" },
    { value: "1×/нед", label: "контроль работ" }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Сопровождение внедрения ИИ | Александра Моисеева</title>
        <meta name="description" content="Контроль разработки и реализации, обучение команды, гарантия результата. Проверяю что подрядчик делает правильно и что обещанные метрики достигаются." />
        <link rel="canonical" href="https://aleksamois.ru/services/support" />
        <meta property="og:title" content="Сопровождение внедрения ИИ | Александра Моисеева" />
        <meta property="og:description" content="Контроль разработки, обучение команды, гарантия результата. Проверяю что метрики достигаются." />
        <meta property="og:url" content="https://aleksamois.ru/services/support" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.servicesSupport())}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 md:px-6">
          <PageBreadcrumbs 
            currentPage="Сопровождение" 
            parentPages={[{ label: "Услуги", href: "/services" }]}
          />

          {/* Hero */}
          <section className="py-12 md:py-20">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-primary" />
                </div>
                <span className="text-primary font-medium">Услуга 03</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground mb-6">
                <span className="font-bold">Сопровождение</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
                Контроль разработки и реализации, обучение команды, гарантия результата. Я проверяю что подрядчик делает правильно и что обещанные метрики действительно достигаются.
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

          {/* Guarantee */}
          <section className="py-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Гарантия результата</h3>
                  <p className="text-muted-foreground">
                    Если согласованные метрики не достигнуты за первый месяц — возвращаю стоимость этого месяца
                  </p>
                </div>
              </div>
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
                  <div className="text-3xl font-bold text-primary">от 50 000 ₽/месяц</div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Срок</div>
                    <div className="font-medium text-foreground">2–3 месяца</div>
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
                Нужен контроль внедрения с гарантией результата?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Обсудим ваш проект и определим метрики успеха
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

export default SupportPage;
