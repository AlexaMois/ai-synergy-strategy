import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Users, Clock, DollarSign, Target, CheckCircle2, ArrowRight, Handshake } from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";
import { useNavigate, useLocation } from "react-router-dom";

// Photos
import heroImage from "@/assets/cases/kraypotrebsoyuz/kraypotrebsoyuz-hero.jpg";
import auditImage from "@/assets/cases/kraypotrebsoyuz/kraypotrebsoyuz-audit.jpg";
import meetingImage1 from "@/assets/cases/kraypotrebsoyuz/kraypotrebsoyuz-meeting-1.jpg";
import meetingImage2 from "@/assets/cases/kraypotrebsoyuz/kraypotrebsoyuz-meeting-2.jpg";
import meetingImage3 from "@/assets/cases/kraypotrebsoyuz/kraypotrebsoyuz-meeting-3.jpg";

const CaseStudyKraypotrebsoyuz = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContact = () => {
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Article", "CaseStudy"],
        "@id": "https://aleksamois.ru/case-studies/kraypotrebsoyuz#article",
        "headline": "Крайпотребсоюз: как совместно выстроили ИИ-архитектуру и отказались от серверов за 1,5 млн ₽",
        "description": "Как региональное объединение кооперативов сэкономило 1,3 млн ₽ благодаря правильной архитектуре вместо покупки серверов",
        "author": {
          "@type": "Person",
          "name": "Александра Моисеева",
          "url": "https://aleksamois.ru/"
        },
        "publisher": { "@id": "https://aleksamois.ru/#organization" },
        "datePublished": "2024-06-15",
        "dateModified": "2025-12-26",
        "mainEntityOfPage": "https://aleksamois.ru/case-studies/kraypotrebsoyuz",
        "about": {
          "@type": "Thing",
          "name": "ИИ-архитектура и автоматизация договорного документооборота"
        }
      }
    ]
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Крайпотребсоюз: ИИ-архитектура вместо серверов за 1,5 млн ₽ | Александра Моисеева</title>
        <meta name="description" content="Кейс: как совместно выстроили ИИ-архитектуру и сэкономили 1,3 млн ₽ на серверном оборудовании. Внедрение Bpium, автоматизация договоров." />
        <link rel="canonical" href="https://aleksamois.ru/case-studies/kraypotrebsoyuz" />
        <meta property="og:title" content="Крайпотребсоюз: ИИ-архитектура вместо серверов за 1,5 млн ₽" />
        <meta property="og:description" content="Как региональное объединение кооперативов сэкономило 1,3 млн ₽ благодаря правильной архитектуре" />
        <meta property="og:url" content="https://aleksamois.ru/case-studies/kraypotrebsoyuz" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <PageBreadcrumbs 
          currentPage="Крайпотребсоюз" 
          parentPages={[{ label: "Кейсы", href: "/cases" }]} 
        />
        
        <main>
        {/* Hero Section */}
        <section className="pt-32 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">КЕЙС</p>
                <h1 className="text-[28px] sm:text-[32px] md:text-[36px] text-foreground leading-tight">
                  Крайпотребсоюз: как совместно выстроили ИИ-архитектуру <span className="font-semibold">и отказались от серверов за 1,5 млн ₽</span>
                </h1>
              </div>
              
              {/* Hero Image - fixed aspect ratio with object-position top for face visibility */}
              <img 
                src={heroImage} 
                alt="Александра Моисеева у карты Крайпотребсоюза" 
                className="w-full aspect-[4/3] object-cover object-top rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Situation Section - Two columns */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-6">Ситуация: запрос <span className="font-semibold">на внедрение ИИ</span></h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Летом руководство Крайпотребсоюза поставило задачу — начать внедрение ИИ в управленческие и операционные процессы.
                </p>
                
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <p className="text-base text-foreground mb-4">На старте рассматривался классический сценарий:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-foreground">собственный сервер</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-foreground">локальная языковая модель</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-foreground">кастомная разработка</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-foreground">отдельная IT-инфраструктура</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary flex items-center">
                <p className="text-lg font-medium text-foreground">
                  Оценка инвестиций — около <span className="text-primary font-bold">1,5 млн ₽</span> только на оборудование, без учёта сопровождения и масштабирования.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Point Section - Two columns */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-6">Совместная точка <span className="font-semibold">принятия решения</span></h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  На первых встречах мы с командой Крайпотребсоюза осознанно не стали выбирать технологию сразу.
                </p>
                
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <p className="text-base text-foreground mb-4">Вместо этого совместно разобрали ключевой вопрос:</p>
                  <p className="text-xl font-medium text-primary italic leading-relaxed">
                    «Какую управленческую задачу должна решить эта инфраструктура и есть ли более простой путь к тому же результату?»
                  </p>
                </div>
              </div>
              
              <div className="bg-muted rounded-2xl p-6 flex flex-col justify-center">
                <p className="text-base font-medium text-foreground mb-3">Было принято решение:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">начать с аудита процессов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">оценить реальные точки эффекта</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">и только потом выбирать архитектуру</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stage 1 Section - Two columns with photo on the right */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">1</div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Совместный аудит и диагностика</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  В течение первого месяца мы вместе с командой:
                </p>
                
                <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-foreground">разобрали ключевые договорные и управленческие процессы</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-foreground">выявили <strong>6 точек максимального эффекта</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-foreground">отделили реальные боли от гипотез</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-foreground">оценили готовность данных и сотрудников</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Параллельно было запущено обучение сотрудников работе с ИИ, чтобы снять опасения и подготовить команду к изменениям.
                </p>
                
                <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary">
                  <p className="text-base font-medium text-foreground">
                    <span className="text-primary">Результат этапа:</span> стало понятно, что значительная часть задач может быть решена без тяжёлой серверной инфраструктуры.
                  </p>
                </div>
              </div>
              
              {/* Audit Photo - fixed aspect ratio with center positioning for group photo */}
              <div className="flex items-center">
                <img 
                  src={auditImage} 
                  alt="Рабочая встреча с командой Крайпотребсоюза" 
                  className="w-full aspect-[4/3] object-cover object-center rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stage 2 Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">2</div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Выбор архитектуры решения</h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              По итогам аудита совместно было принято решение:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-muted rounded-2xl p-6 text-center">
                <div className="text-red-500 text-3xl mb-2">✕</div>
                <p className="text-foreground">отказаться от покупки серверов и локальной LLM на старте</p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-6 text-center">
                <div className="text-primary text-3xl mb-2">✓</div>
                <p className="text-foreground">пойти по пути более гибкой архитектуры</p>
              </div>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
              <p className="text-base font-medium text-foreground mb-4">В качестве основы выбрали:</p>
              <div className="bg-muted rounded-xl p-4 mb-4">
                <p className="text-lg font-semibold text-primary">Bpium — российская low-code платформа</p>
                <p className="text-sm text-muted-foreground">на 100% соответствующая требованиям законодательства РФ.</p>
              </div>
              
              <p className="text-base font-medium text-foreground mb-3">Решение включало:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">автоматизацию контроля сроков договоров</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">уведомления и прозрачность согласований</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">встраивание в существующие процессы</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">подготовку команды к самостоятельной работе с системой</span>
                </li>
              </ul>
            </div>
            
          </div>
        </section>

        {/* Stage 3 Section - Horizontal month cards */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">3</div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Внедрение и развитие</h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Проект развивался поэтапно:
            </p>
            
            {/* Horizontal grid for month cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-card rounded-2xl p-6 shadow-soft h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Месяц 1</span>
                </div>
                <ul className="space-y-1 text-foreground">
                  <li>— аудит и обучение</li>
                  <li>— согласование архитектуры</li>
                </ul>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Месяц 2–3</span>
                </div>
                <ul className="space-y-1 text-foreground">
                  <li>— внедрение Bpium</li>
                  <li>— автоматический контроль сроков договоров</li>
                  <li className="text-muted-foreground text-sm">(юридический и кадровый блок)</li>
                </ul>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Месяц 3–4</span>
                </div>
                <ul className="space-y-1 text-foreground">
                  <li>— запуск OCR-распознавания входящей отчётности</li>
                  <li className="text-muted-foreground text-sm">(финансово-экономический отдел)</li>
                </ul>
              </div>
            </div>
            
            <p className="text-base text-muted-foreground italic">
              OCR на текущий момент внедрён в формате пилота, проходит тестирование и масштабируется.
            </p>
          </div>
        </section>

        {/* Economics Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">Экономика и эффект</h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">
                  ~<AnimatedNumber value={250} className="text-primary" /> тыс ₽
                </p>
                <p className="text-sm text-muted-foreground">инвестиции во внедрение и сопровождение</p>
              </div>
              
              <div className="bg-primary/10 rounded-2xl p-6 text-center border-2 border-primary/30">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">
                  ~<AnimatedNumber value={1.3} decimals={1} className="text-primary" /> млн ₽
                </p>
                <p className="text-sm text-foreground font-medium">экономия капитальных затрат</p>
                <p className="text-xs text-muted-foreground mt-1">(отказ от серверного оборудования)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">Результаты</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold text-foreground">Управленческий эффект</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">совместно выстроена устойчивая архитектура</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">снижена зависимость от тяжёлой инфраструктуры</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">создан задел для масштабирования</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold text-foreground">Операционный эффект</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground"><strong>2 сотрудника</strong> освобождены от рутинных операций</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">сроки договоров больше не теряются</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">финансовый отдел экономит <strong>4–6 часов в неделю</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">команда уверенно работает с ИИ-инструментами</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Continuation Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-6">Продолжение сотрудничества</h2>
            
            {/* Text block at top */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <p className="text-lg text-foreground leading-relaxed">
                По итогам внедрения я была приглашена на ежегодное общее собрание Крайпотребсоюза, где Председатель Правления Вячеслав Васильевич подтвердил результаты проекта.
              </p>
              
              <div className="bg-primary/10 rounded-2xl p-6">
                <p className="text-base font-medium text-foreground mb-4">На собрании было принято решение:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Handshake className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">продолжить сотрудничество на весь <strong>2026 год</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Handshake className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">подключить собственные хозяйства Крайпотребсоюза</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Handshake className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">далее масштабировать решения на региональные подразделения</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Meeting Photos Gallery - large, full width */}
            <div className="grid grid-cols-3 gap-4">
              <img 
                src={meetingImage1} 
                alt="Участники собрания Крайпотребсоюза" 
                className="w-full aspect-[4/3] object-cover object-center rounded-2xl"
              />
              <img 
                src={meetingImage2} 
                alt="Александра Моисеева выступает на собрании Крайпотребсоюза" 
                className="w-full aspect-[4/3] object-cover object-center rounded-2xl"
              />
              <img 
                src={meetingImage3} 
                alt="Конференц-зал собрания Крайпотребсоюза" 
                className="w-full aspect-[4/3] object-cover object-center rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-6">Главный вывод кейса</h2>
            
            <div className="bg-card rounded-2xl p-8 shadow-soft mb-6">
              <p className="text-xl text-foreground leading-relaxed mb-6">
                Проект показал, что устойчивые решения по ИИ возникают не из технологий, а из <strong>совместной работы</strong>:
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-6">
                <span className="px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">бизнеса</span>
                <span className="px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">команды</span>
                <span className="px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">архитектурного подхода</span>
              </div>
              
              <p className="text-lg text-foreground leading-relaxed text-center italic">
                Одну и ту же задачу можно решать по-разному. В этом проекте мы совместно выбрали путь, который оказался <span className="text-primary font-semibold">проще, дешевле и устойчивее</span>.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Хотите получить похожий результат для вашей компании?
            </h2>
            <Button size="lg" onClick={scrollToContact}>
              Пройти экспресс-аудит процессов
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

export default CaseStudyKraypotrebsoyuz;
