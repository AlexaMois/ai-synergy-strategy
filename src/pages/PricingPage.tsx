import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Building2, Search, Layers, Users, Clock, Shield, TrendingUp, DollarSign } from "lucide-react";
import AnimatedMetric from "@/components/AnimatedMetric";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useNavigate, useLocation } from "react-router-dom";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import { trackCTAClick } from "@/utils/analytics";

const PricingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContact = () => {
    trackCTAClick({ location: 'pricing' });
    
    if (location.pathname !== '/') {
      navigate('/#contact');
      return;
    }
    const element = document.querySelector('#contact');
    if (element) {
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const companyServices = [
    {
      size: "10–50 человек",
      icon: Building2,
      description: "Малый бизнес и стартапы",
      services: [
        {
          name: "Аудит и диагностика",
          price: "6–15 тыс. ₽",
          duration: "3–4 недели",
          details: [
            "Анализ 3–5 ключевых процессов",
            "Оценка зрелости данных",
            "Roadmap с приоритетами",
            "2–3 встречи с командой"
          ]
        },
        {
          name: "Стратегия и архитектура",
          price: "60–120 тыс. ₽",
          duration: "4–6 недель",
          details: [
            "Проектирование AI-решения",
            "Выбор инструментов",
            "Расчёт ROI",
            "План внедрения"
          ]
        },
        {
          name: "Сопровождение",
          price: "50–80 тыс. ₽/мес",
          duration: "от 3 месяцев",
          details: [
            "Еженедельные встречи",
            "Контроль качества",
            "Обучение команды",
            "Корректировки процессов"
          ]
        },
        {
          name: "Полный цикл",
          price: "150–250 тыс. ₽",
          duration: "3–6 месяцев",
          details: [
            "Аудит + Архитектура + Сопровождение",
            "Гарантия результата",
            "Все метрики отслеживаются",
            "Команда работает самостоятельно"
          ]
        }
      ]
    },
    {
      size: "50–200 человек",
      icon: Building2,
      description: "Средний бизнес",
      services: [
        {
          name: "Аудит и диагностика",
          price: "25–60 тыс. ₽",
          duration: "4–5 недель",
          details: [
            "Анализ 5–8 процессов",
            "Оценка IT-инфраструктуры",
            "Roadmap с 3 сценариями",
            "3–4 встречи + отчёт"
          ]
        },
        {
          name: "Стратегия и архитектура",
          price: "150–300 тыс. ₽",
          duration: "6–8 недель",
          details: [
            "Комплексная архитектура",
            "Интеграции с системами",
            "3 варианта внедрения",
            "Управление бюджетом"
          ]
        },
        {
          name: "Сопровождение",
          price: "80–120 тыс. ₽/мес",
          duration: "от 3 месяцев",
          details: [
            "2 встречи в неделю",
            "Проверка подрядчиков",
            "Обучение отделов",
            "Отчёты и метрики"
          ]
        },
        {
          name: "Полный цикл",
          price: "300–500 тыс. ₽",
          duration: "4–8 месяцев",
          details: [
            "Полное сопровождение",
            "Несколько подразделений",
            "ROI-гарантии",
            "Передача знаний команде"
          ]
        }
      ]
    },
    {
      size: "200+ человек",
      icon: Building2,
      description: "Крупный бизнес и корпорации",
      services: [
        {
          name: "Аудит и диагностика",
          price: "80–200 тыс. ₽",
          duration: "5–7 недель",
          details: [
            "Глубокий анализ всех процессов",
            "Оценка всех систем",
            "Roadmap для масштабирования",
            "5+ встреч + презентация руководству"
          ]
        },
        {
          name: "Стратегия и архитектура",
          price: "250–400 тыс. ₽",
          duration: "8–12 недель",
          details: [
            "Enterprise архитектура",
            "Сложные интеграции",
            "Управление рисками",
            "Несколько сценариев масштабирования"
          ]
        },
        {
          name: "Сопровождение",
          price: "120–150 тыс. ₽/мес",
          duration: "от 6 месяцев",
          details: [
            "Еженедельные статус-коллы",
            "Координация подрядчиков",
            "Корпоративное обучение",
            "Compliance и безопасность"
          ]
        },
        {
          name: "Полный цикл",
          price: "500–700 тыс. ₽",
          duration: "6–12 месяцев",
          details: [
            "Корпоративное внедрение",
            "Несколько департаментов",
            "Change management",
            "Долгосрочное партнёрство"
          ]
        }
      ]
    }
  ];

  const additionalServices = [
    {
      name: "Экспресс-консультация",
      price: "Бесплатно",
      duration: "30 минут",
      icon: Clock,
      description: "Бесплатная диагностическая сессия для оценки потенциала AI в вашей компании"
    },
    {
      name: "Разовая консультация",
      price: "8 690 ₽/час",
      duration: "от 1 часа",
      icon: Users,
      description: "Экспертная консультация по конкретному вопросу без обязательств"
    },
    {
      name: "Обучение команды",
      price: "от 30 тыс. ₽",
      duration: "1–2 дня",
      icon: Users,
      description: "Тренинг для вашей команды по работе с AI-инструментами и системами"
    },
    {
      name: "Проверка подрядчика",
      price: "от 25 тыс. ₽",
      duration: "1–2 недели",
      icon: Shield,
      description: "Независимая экспертиза бюджета и технического задания от AI-подрядчика"
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Цены на AI-консалтинг — Александра Моисеева</title>
        <meta name="description" content="Прозрачные цены на AI-консалтинг. Аудит от 6 тыс. ₽, стратегия от 60 тыс. ₽, полный цикл от 150 тыс. ₽. ROI 200-400%, окупаемость 3-12 недель." />
        <meta name="keywords" content="цены AI консалтинг, стоимость внедрения ИИ, прайс AI услуги, ROI искусственный интеллект" />
        <link rel="canonical" href="https://aleksamois.ru/pricing" />
        <meta property="og:title" content="Цены на AI-консалтинг — Александра Моисеева" />
        <meta property="og:description" content="Прозрачные цены на AI-консалтинг. Аудит от 6 тыс. ₽, стратегия от 60 тыс. ₽. ROI 200-400%." />
        <meta property="og:url" content="https://aleksamois.ru/pricing" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.pricing())}
        </script>
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <PageBreadcrumbs currentPage="Цены" />
        
        <main>
        {/* Hero Section */}
        <section className="pt-32 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <DollarSign className="w-12 h-12 text-primary" strokeWidth={1.5} />
                <h1 className="text-[28px] sm:text-[32px] md:text-[36px] text-foreground leading-tight">
                  Прозрачные цены <span className="font-semibold">на AI-консалтинг</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Стоимость зависит от размера компании и глубины работы. Все цены включают обучение команды и техническую поддержку. Главное: я считаю ROI вашей компании, не мою комиссию.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-primary/10 rounded-2xl p-6 text-center">
                <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-foreground mb-2">ROI 200–400%</h3>
                <p className="text-sm text-muted-foreground">Средняя окупаемость для моих клиентов</p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-6 text-center">
                <Clock className="w-10 h-10 text-primary mx-auto mb-3" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-foreground mb-2">3–12 недель</h3>
                <p className="text-sm text-muted-foreground">До первых видимых результатов</p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-6 text-center">
                <Shield className="w-10 h-10 text-primary mx-auto mb-3" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-foreground mb-2">Гарантия возврата</h3>
                <p className="text-sm text-muted-foreground">Если не достигнем метрик за месяц</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing by Company Size */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="section-title text-center mb-12">Цены <span className="font-semibold">по размеру компании</span></h2>
            
            <div className="space-y-12">
              {companyServices.map((company, companyIndex) => {
                const Icon = company.icon;
                return (
                  <div key={companyIndex} className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-soft">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                      <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">{company.size}</h3>
                        <p className="text-sm text-muted-foreground">{company.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {company.services.map((service, serviceIndex) => (
                        <div
                          key={serviceIndex}
                          className="bg-muted rounded-2xl p-6 hover:bg-primary/10 transition-colors duration-200 border border-transparent hover:border-primary/20"
                        >
                          <h4 className="text-lg font-semibold text-foreground mb-2">{service.name}</h4>
                          <p className="text-2xl font-bold text-primary mb-1">{service.price}</p>
                          <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                            {service.duration}
                          </p>
                          
                          <ul className="space-y-2">
                            {service.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title text-center mb-12">Дополнительные <span className="font-semibold">услуги</span></h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {additionalServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow duration-200"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Icon className="w-8 h-8 text-primary flex-shrink-0" strokeWidth={1.5} />
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-foreground mb-1">{service.name}</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <p className="text-xl font-bold text-primary">{service.price}</p>
                          <p className="text-sm text-muted-foreground">{service.duration}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing FAQ */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title text-center mb-12">Вопросы <span className="font-semibold">о ценах</span></h2>
            
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-3">Почему такой большой разброс в ценах?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Каждая компания уникальна. Цена зависит от количества процессов, сложности интеграций, количества систем, размера команды и уровня зрелости данных. На первой встрече я оцениваю объём работы и называю конкретную цифру.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-3">Можно ли оплатить частями?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Да. Стандартная схема: 50% предоплата при старте, 30% после аудита/архитектуры, 20% после сдачи. Для долгосрочного сопровождения возможна помесячная оплата.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-3">Что если бюджет ограничен?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Начните с бесплатной экспресс-консультации. Я покажу, где AI даст максимальный эффект, и мы найдём решение под ваш бюджет. Например, можно начать с аудита одного процесса, а не всей компании.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-3">Входит ли техническая реализация в стоимость?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Нет. Я делаю аудит, архитектуру и консалтинг. Техническую реализацию (разработку кода) делают подрядчики, которых я помогаю выбрать и контролирую их работу. Моя задача — защитить ваши интересы и гарантировать результат.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-3">Как вы гарантируете результат?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Три уровня гарантий:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                    <span>Пилот перед масштабированием — тестируем на небольшой команде</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                    <span>Возврат ретейнера за месяц, если не достигнем метрик</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                    <span>Совместная ответственность — я сопровождаю до достижения результата</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real Example */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="section-title text-center mb-8">Реальный <span className="font-semibold">пример</span></h2>
            
            <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Грузовой Экспресс</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    Логистическая компания, 15 человек. Потратили всего 12 000 ₽ на автоматизацию через Telegram-бота.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-semibold mt-0.5">•</span>
                      <span className="text-sm text-muted-foreground">Экономия 3–4 часа в неделю</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-semibold mt-0.5">•</span>
                      <span className="text-sm text-muted-foreground">99% точность маршрутов</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-semibold mt-0.5">•</span>
                      <span className="text-sm text-muted-foreground">Окупаемость за 3 недели</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                  <p className="text-sm text-muted-foreground mb-2">Бюджет проекта</p>
                  <p className="text-4xl font-bold text-primary mb-4">12 000 ₽</p>
                  <p className="text-sm text-muted-foreground italic mb-4">
                    "Мой самый маленький бюджет, но крутейший результат. Показывает, что не нужно тратить миллионы на ИИ — важна правильная архитектура."
                  </p>
                  <Button asChild className="w-full">
                    <a href="/case-studies/cargo-express">
                      Смотреть детальный разбор →
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Узнайте точную стоимость для вашей компании
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Запишитесь на бесплатную 30-минутную консультацию. Я оценю ваши процессы и назову конкретную цифру с объяснением, за что вы платите.
            </p>
            <Button size="lg" onClick={scrollToContact}>
              Обсудить задачу
            </Button>
          </div>
        </section>
        
        <Contact />
        <Partners />
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default PricingPage;
