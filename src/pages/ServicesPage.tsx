import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet-async";
import ServicesDetailed from "@/components/ServicesDetailed";
import AdditionalServices from "@/components/AdditionalServices";
import FAQTeaser from "@/components/FAQTeaser";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Target, Users, Cog, Database, Layers, Award, ShieldCheck, Search, ListChecks, Rocket, ClipboardCheck } from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const systemElements = [
  { icon: Target, label: "Смысл задачи" },
  { icon: Users, label: "Люди" },
  { icon: Cog, label: "Процессы" },
  { icon: Database, label: "Данные" },
  { icon: Layers, label: "Архитектура" },
];

const processSteps = [
  {
    icon: Search,
    title: "Разбираем текущую ситуацию",
    text: "Смотрим процессы, данные, документы, роли, текущие инструменты и ручную нагрузку."
  },
  {
    icon: ListChecks,
    title: "Определяем приоритеты",
    text: "Выбираем задачи, которые дают понятный эффект по времени, деньгам и управляемости."
  },
  {
    icon: Rocket,
    title: "Запускаем выбранный формат",
    text: "Проводим встречу, стратегию, аудит, обучение, внедрение, разработку или сопровождение."
  },
  {
    icon: ClipboardCheck,
    title: "Фиксируем результат",
    text: "Передаём план, рекомендации, инструкции, рабочие сценарии, цифровой инструмент или отчёт по сопровождению."
  }
];

const ServicesPage = () => {
  const navigate = useNavigate();
  return <PageTransition>
      <Helmet>
        <title>Услуги по цифровому развитию бизнеса — Александра Моисеева, НейроРешения</title>
        <meta name="description" content="Стратегическая встреча, стратегия цифрового развития, глубокий аудит, обучение, внедрение, разработка и сопровождение цифровых инструментов для бизнеса." />
        <meta name="keywords" content="цифровое развитие бизнеса, стратегия цифровизации, аудит цифровизации, внедрение цифровых инструментов, сопровождение, НейроРешения" />
        <link rel="canonical" href="https://aleksamois.ru/services" />
        <meta property="og:title" content="Услуги по цифровому развитию бизнеса — Александра Моисеева, НейроРешения" />
        <meta property="og:description" content="Стратегическая встреча, стратегия цифрового развития, глубокий аудит, обучение, внедрение, разработка и сопровождение цифровых инструментов для бизнеса." />
        <meta property="og:url" content="https://aleksamois.ru/services" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.services())}
        </script>
      </Helmet>
      <div className="min-h-screen">
        <PageBreadcrumbs currentPage="Услуги" />
      
        <main>
        {/* Hero Section */}
        <section className="pt-20 pb-0 bg-background">
          <div className="container mx-auto px-4">
            {/* Two column layout: Text left, Infographic right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-0">
              {/* Left column - Text */}
              <div className="mb-0 mt-[20px] ml-[30px]">
                <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-medium text-foreground mb-6 leading-tight">
                  Услуги по <span className="font-semibold">цифровому развитию бизнеса</span>
                </h1>
                <p className="text-base sm:text-lg text-foreground leading-relaxed mb-4">
                  Стратегия, аудит, обучение, внедрение, разработка и сопровождение цифровых инструментов для компаний, которые хотят снизить ручную нагрузку и усилить управляемость.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                  Работаю с конкретными задачами бизнеса: ручной ввод и проверка данных, разрозненный документооборот, потерянные заявки, слабый контроль по производству, отчётам и рабочим процессам.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                  Помогаю выбрать процессы, которые тормозят деньги, спроектировать решение и довести его до стабильной работы в вашей связке CRM, 1С, порталов, таблиц и внутренних сервисов.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" onClick={() => navigate('/start')}>
                    Подобрать формат работы →
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/pricing')}>
                    Посмотреть цены →
                  </Button>
                </div>
              </div>

              {/* Right column - Infographic */}
              <div className="flex justify-center lg:flex lg:items-center lg:justify-center pt-10">
                <div className="relative w-[380px] h-[380px] sm:w-[420px] sm:h-[420px]">
                  {/* Connecting lines from center to elements */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 420 420">
                    {systemElements.map((_, index) => {
                      const angle = (index * 72 - 90) * (Math.PI / 180);
                      const innerRadius = 60;
                      const outerRadius = 130;
                      const x1 = 210 + Math.cos(angle) * innerRadius;
                      const y1 = 210 + Math.sin(angle) * innerRadius;
                      const x2 = 210 + Math.cos(angle) * outerRadius;
                      const y2 = 210 + Math.sin(angle) * outerRadius;
                      return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="6 4" />;
                    })}
                  </svg>
                  
                  {/* Center circle - turquoise filled */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-primary flex items-center justify-center z-10 shadow-card ring-1 ring-primary/20">
                    <span className="text-xs sm:text-sm font-semibold text-white text-center leading-tight px-2">Система<br />как целое</span>
                  </div>
                  
                  {/* Elements around the circle */}
                  {systemElements.map((element, index) => {
                    const angle = (index * 72 - 90) * (Math.PI / 180);
                    const radius = 160;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const Icon = element.icon;
                    return (
                      <div 
                        key={index} 
                        className="absolute flex flex-col items-center justify-center gap-1 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-card shadow-card ring-1 ring-border/50 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        <span className="text-[8px] sm:text-[9px] font-medium text-foreground text-center leading-tight px-1">
                          {element.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Full width description block */}
            
          </div>
        </section>

        {/* Trust Badge Section */}
        <section className="py-6 bg-muted/50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm md:text-base font-medium text-foreground">
                  Дипломированный специалист по ИИ
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm md:text-base font-medium text-foreground">
                  Квалификация KAEO уровень 5
                </span>
              </div>
              <Link 
                to="/about#qualifications" 
                className="text-primary hover:text-primary/80 hover:underline text-sm font-medium transition-colors"
              >
                Смотреть сертификаты →
              </Link>
            </div>
          </div>
        </section>

        <ServicesDetailed />
        <AdditionalServices />

        {/* How we work — process steps */}
        <section className="py-10 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="section-title text-center leading-tight mb-10">
                Как <span className="font-semibold">проходит работа</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={index}
                      className="relative p-6 rounded-2xl bg-card border border-border ring-1 ring-border/30 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="absolute -top-3 -left-3 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-card">
                        {index + 1}
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <FAQTeaser
          items={[
            { question: "С чего начинается работа?", answer: "Работа начинается с выбора формата. Для быстрого первого шага подходит стратегическая встреча. Для плана на 90 дней подходит стратегия цифрового развития. Для подробного разбора компании подходит глубокий аудит." },
            { question: "Можно заказать одну услугу?", answer: "Да. Можно начать с одной встречи, отдельного аудита, обучения, разработки или сопровождения. После первого этапа становится понятен следующий шаг." },
            { question: "Сколько длится внедрение?", answer: "Срок зависит от задачи, количества процессов и готовности данных. Небольшие решения запускаются быстрее. Более сложные внедрения идут поэтапно: разбор, проектирование, запуск, обучение команды и сопровождение." },
            { question: "Что входит в сопровождение?", answer: "В сопровождение входит контроль задач, донастройка процессов, разбор ошибок, консультации команды, обновление инструкций и развитие сценариев." },
          ]}
        />

        {/* Final CTA */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="section-title leading-tight mb-4">
                Начните с <span className="font-semibold">подходящего формата</span>
              </h2>
              <p className="text-base sm:text-lg text-foreground leading-relaxed mb-8">
                Выберите услугу на этой странице или перейдите на страницу выбора формата, чтобы понять, какой вариант подходит компании сейчас.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" onClick={() => navigate('/start')}>
                  Подобрать формат работы →
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/pricing')}>
                  Посмотреть цены →
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Contact />
        <Partners />
        </main>
      
        <Footer />
      </div>
    </PageTransition>;
};
export default ServicesPage;