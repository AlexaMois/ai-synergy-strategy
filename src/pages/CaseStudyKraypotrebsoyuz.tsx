import { Helmet } from "react-helmet-async";

import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import PillButton from "@/components/PillButton";
import { Building2, TrendingUp, Users, Clock, DollarSign, Target, CheckCircle2, ArrowRight, Handshake } from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";
import { scrollToContact } from "@/lib/scrollToContact";

// Photos
import heroImage from "@/assets/cases/kraypotrebsoyuz/kraypotrebsoyuz-hero.jpg";
import auditImage from "@/assets/cases/kraypotrebsoyuz/kraypotrebsoyuz-audit.jpg";
import meetingImage1 from "@/assets/cases/kraypotrebsoyuz/kraypotrebsoyuz-meeting-1.jpg";
import meetingImage2 from "@/assets/cases/kraypotrebsoyuz/kraypotrebsoyuz-meeting-2.jpg";
import meetingImage3 from "@/assets/cases/kraypotrebsoyuz/kraypotrebsoyuz-meeting-3.jpg";

const CaseStudyKraypotrebsoyuz = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Article", "CaseStudy"],
        "@id": "https://aleksamois.ru/cases/kraypotrebsoyuz#article",
        "headline": "Крайпотребсоюз: как совместно выстроили ИИ-архитектуру и отказались от серверов за 1,5 млн ₽",
        "description": "Как региональное объединение кооперативов сэкономило 1,3 млн ₽ благодаря правильной архитектуре вместо покупки серверов",
        "author": {
          "@type": "Person",
          "name": "Александра Моисеева",
          "url": "https://aleksamois.ru/"
        },
        "publisher": { "@id": "https://aleksamois.ru/#organization" },
        "dateModified": "2025-12-26",
        "mainEntityOfPage": "https://aleksamois.ru/cases/kraypotrebsoyuz",
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
        <link rel="canonical" href="https://aleksamois.ru/cases/kraypotrebsoyuz/" />
        <meta property="og:title" content="Крайпотребсоюз: ИИ-архитектура вместо серверов за 1,5 млн ₽" />
        <meta property="og:description" content="Как региональное объединение кооперативов сэкономило 1,3 млн ₽ благодаря правильной архитектуре" />
        <meta property="og:url" content="https://aleksamois.ru/cases/kraypotrebsoyuz" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
      </Helmet>
      <div className="min-h-screen">
        
        <PageBreadcrumbs 
          currentPage="Крайпотребсоюз" 
          parentPages={[{ label: "Кейсы", href: "/cases" }]} 
        />
        
        <main className="bg-background">
        {/* Hero Section */}
        <section className="px-4 md:px-6 pt-8 md:pt-12 pb-8">
          <div className="mx-auto max-w-7xl rounded-[32px] md:rounded-[40px] bg-surface-mint p-6 md:p-12 shadow-card ring-1 ring-foreground/5">
            <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-center">
              <div className="lg:col-span-7 min-w-0">
                <p className="text-xs font-semibold text-primary-dark uppercase tracking-widest mb-5"><span>КЕЙС</span> · ПОТРЕБИТЕЛЬСКАЯ КООПЕРАЦИЯ</p>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                  Крайпотребсоюз: как совместно выстроили ИИ-архитектуру <span className="font-bold">и отказались от серверов за <span className="whitespace-nowrap">1,5 млн ₽</span></span>
                </h1>
                <dl className="mt-8 pt-6 border-t border-foreground/15">
                  <dd className="text-4xl md:text-5xl font-bold text-foreground mb-2">1,3 млн ₽</dd>
                  <dt className="text-sm text-muted-foreground leading-relaxed">экономия капитальных затрат<br />(отказ от серверного оборудования)</dt>
                </dl>
              </div>
              
              {/* Hero Image - fixed aspect ratio with object-position top for face visibility */}
              <img 
                src={heroImage} 
                alt="Александра Моисеева у карты Крайпотребсоюза" 
                className="lg:col-span-5 w-full aspect-[4/3] object-cover object-top rounded-[28px]"
              />
            </div>
          </div>
        </section>

        {/* Situation Section - Two columns */}
        <section className="px-4 md:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground mb-6">Ситуация: запрос <span className="font-semibold">на внедрение ИИ</span></h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Летом руководство Крайпотребсоюза поставило задачу — начать внедрение ИИ в управленческие и операционные процессы.
                </p>
                
                <div className="border-t border-foreground/10 pt-6">
                  <p className="text-base text-foreground mb-4">На старте рассматривался классический сценарий:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-dark font-bold">•</span>
                      <span className="text-foreground">собственный сервер</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-dark font-bold">•</span>
                      <span className="text-foreground">локальная языковая модель</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-dark font-bold">•</span>
                      <span className="text-foreground">кастомная разработка</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-dark font-bold">•</span>
                      <span className="text-foreground">отдельная IT-инфраструктура</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border-l-2 border-accent pl-5 py-2 flex items-center">
                <p className="text-lg font-medium text-foreground">
                  Оценка инвестиций — около <span className="text-primary-dark font-bold">1,5 млн ₽</span> на оборудование. Стоимость сопровождения и масштабирования рассчитывается отдельно.
                </p>
              </div>
            </div>
</div>
</div>
          </div>
        </section>

        {/* Decision Point Section - Two columns */}
        <section className="px-4 md:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground mb-6">Совместная точка <span className="font-semibold">принятия решения</span></h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  На первых встречах мы с командой Крайпотребсоюза начали с анализа задач и проверки технических вариантов.
                </p>
                
                <div className="border-t border-foreground/10 pt-6">
                  <p className="text-base text-foreground mb-4">Вместо этого совместно разобрали ключевой вопрос:</p>
                  <p className="text-xl font-medium text-primary-dark italic leading-relaxed">
                    «Какую управленческую задачу должна решить эта инфраструктура и есть ли более простой путь к тому же результату?»
                  </p>
                </div>
              </div>
              
              <div className="border-t border-foreground/10 pt-6 flex flex-col justify-center">
                <p className="text-base font-medium text-foreground mb-3">Было принято решение:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">начать с аудита процессов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">оценить реальные точки эффекта</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">и только потом выбирать архитектуру</span>
                  </li>
                </ul>
              </div>
            </div>
</div>
</div>
          </div>
        </section>

        {/* Stage 1 Section - Two columns with photo on the right */}
        <section className="px-4 md:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 shrink-0 text-primary-dark font-bold text-3xl tabular-nums">1</div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">Совместный аудит и разбор процессов</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  В течение первого месяца мы вместе с командой:
                </p>
                
                <div className="border-t border-foreground/10 pt-6 mb-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-dark font-bold">•</span>
                      <span className="text-foreground">разобрали ключевые договорные и управленческие процессы</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-dark font-bold">•</span>
                      <span className="text-foreground">выявили <strong>6 точек максимального эффекта</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-dark font-bold">•</span>
                      <span className="text-foreground">отделили реальные боли от гипотез</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-dark font-bold">•</span>
                      <span className="text-foreground">оценили готовность данных и сотрудников</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  Параллельно было запущено обучение сотрудников работе с ИИ, чтобы снять опасения и подготовить команду к изменениям.
                </p>
                
                <div className="border-l-2 border-accent pl-5 py-2">
                  <p className="text-base font-medium text-foreground">
                    <span className="text-primary">Результат этапа:</span> стало понятно, что значительную часть задач можно решить на более экономичной инфраструктуре.
                  </p>
                </div>
              </div>
              
              {/* Audit Photo - fixed aspect ratio with center positioning for group photo */}
              <div className="flex items-center">
                <img 
                  src={auditImage} 
                  alt="Рабочая встреча с командой Крайпотребсоюза" 
                  className="w-full aspect-[4/3] object-cover object-center rounded-[28px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stage 2 Section */}
        <section className="px-4 md:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><div className="flex items-center gap-4 mb-6">
              <div className="w-10 shrink-0 text-primary-dark font-bold text-3xl tabular-nums">2</div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">Выбор архитектуры решения</h2>
            </div></div>
<div className="md:col-span-8 min-w-0">
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              По итогам аудита совместно было принято решение:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="border-t border-foreground/10 pt-6 text-center">
                <div className="text-muted-foreground text-3xl mb-2">✕</div>
                <p className="text-foreground">отказаться от покупки серверов и локальной LLM на старте</p>
              </div>
              <div className="bg-surface-mint rounded-[28px] p-6 md:p-8 text-center">
                <div className="text-primary-dark text-3xl mb-2">✓</div>
                <p className="text-foreground">пойти по пути более гибкой архитектуры</p>
              </div>
            </div>
            
            <div className="border-t border-foreground/10 pt-6 mb-6">
              <p className="text-base font-medium text-foreground mb-4">В качестве основы выбрали:</p>
              <div className="border-l border-foreground/15 pl-5 py-2 mb-4">
                <p className="text-lg font-semibold text-primary">Bpium — российская low-code платформа</p>
              </div>
              
              <p className="text-base font-medium text-foreground mb-3">Решение включало:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">автоматизацию контроля сроков договоров</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">уведомления и прозрачность согласований</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">встраивание в существующие процессы</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">подготовку команды к самостоятельной работе с системой</span>
                </li>
              </ul>
            </div>
            
</div>
</div>
          </div>
        </section>

        {/* Stage 3 Section - Horizontal month cards */}
        <section className="px-4 md:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><div className="flex items-center gap-4 mb-6">
              <div className="w-10 shrink-0 text-primary-dark font-bold text-3xl tabular-nums">3</div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">Внедрение и развитие</h2>
            </div></div>
<div className="md:col-span-8 min-w-0">
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Проект развивался поэтапно:
            </p>
            
            {/* Horizontal grid for month cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="border-t border-foreground/10 pt-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-primary-dark uppercase tracking-widest">Месяц 1</span>
                </div>
                <ul className="space-y-1 text-foreground">
                  <li>— аудит и обучение</li>
                  <li>— согласование архитектуры</li>
                </ul>
              </div>
              
              <div className="border-t border-foreground/10 pt-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-primary-dark uppercase tracking-widest">Месяц 2–3</span>
                </div>
                <ul className="space-y-1 text-foreground">
                  <li>— внедрение Bpium</li>
                  <li>— автоматический контроль сроков договоров</li>
                  <li className="text-muted-foreground text-sm">(юридический и кадровый блок)</li>
                </ul>
              </div>
              
              <div className="border-t border-foreground/10 pt-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-primary-dark uppercase tracking-widest">Месяц 3–4</span>
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
</div>
          </div>
        </section>

        {/* Economics Section */}
        <section className="px-4 md:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-7xl rounded-[32px] md:rounded-[40px] bg-surface-mint p-6 md:p-12 ring-1 ring-foreground/5">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground mb-8">Экономика и эффект</h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="border-t border-foreground/10 pt-6 text-center">
                <DollarSign className="hidden w-12 h-12 text-primary-dark mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary-dark mb-2">
                  ~<AnimatedNumber value={250} className="text-primary" /> тыс ₽
                </p>
                <p className="text-sm text-muted-foreground">инвестиции во внедрение и сопровождение</p>
              </div>
              
              <div className="border-t border-foreground/15 pt-6 text-center">
                <TrendingUp className="hidden w-12 h-12 text-primary-dark mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary-dark mb-2">
                  ~<AnimatedNumber value={1.3} decimals={1} className="text-primary" /> млн ₽
                </p>
                <p className="text-sm text-foreground font-medium">экономия капитальных затрат</p>
                <p className="text-xs text-muted-foreground mt-1">(отказ от серверного оборудования)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Photo - Full width */}
        <section className="px-4 md:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <img 
              src={meetingImage2} 
              alt="Александра Моисеева выступает на собрании Крайпотребсоюза" 
              className="w-full h-auto rounded-[28px]"
            />
            <div className="mt-6 text-center">
              <p className="text-lg font-semibold text-foreground mb-2">
                Ключевые решения Совета Крайпотребсоюза
              </p>
              <p className="text-base text-muted-foreground mb-3">
                17 декабря 2025 года состоялось расширенное заседание Совета Крайпотребсоюза, с участием членов Совета, руководителей районных кооперативных организаций, собственных хозяйств, главных бухгалтеров, ведущих специалистов по направлениям деятельности и ветеранов.
              </p>
              <a 
                href="https://www.krayps.ru/news/main_news/?ELEMENT_ID=19160" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-primary-dark hover:underline text-sm"
              >
                Источник <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="px-4 md:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground mb-8">Результаты</h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border-t border-foreground/10 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="hidden w-8 h-8 text-primary" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold text-foreground">Управленческий эффект</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">совместно выстроена устойчивая архитектура</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">снижена зависимость от тяжёлой инфраструктуры</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">создан задел для масштабирования</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-foreground/10 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="hidden w-8 h-8 text-primary" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold text-foreground">Операционный эффект</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground"><strong>2 сотрудника</strong> освобождены от рутинных операций</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">сроки договоров находятся под контролем</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">финансовый отдел экономит <strong>4–6 часов в неделю</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">команда уверенно работает с ИИ-инструментами</span>
                  </li>
                </ul>
              </div>
            </div>
</div>
</div>
          </div>
        </section>

        {/* Continuation Section */}
        <section className="px-4 md:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground mb-6">Продолжение сотрудничества</h2></div>
<div className="md:col-span-8 min-w-0">
            
            {/* Text block at top */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <p className="text-lg text-foreground leading-relaxed">
                По итогам внедрения я была приглашена на ежегодное общее собрание Крайпотребсоюза, где Председатель Правления Вячеслав Васильевич подтвердил результаты проекта.
              </p>
              
              <div className="bg-surface-mint rounded-[28px] p-6 md:p-8">
                <p className="text-base font-medium text-foreground mb-4">На собрании было принято решение:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Handshake className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">продолжить сотрудничество на весь <strong>2026 год</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Handshake className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">подключить собственные хозяйства Крайпотребсоюза</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Handshake className="hidden w-5 h-5 text-primary-dark mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">далее масштабировать решения на региональные подразделения</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Meeting Photos Gallery - two photos only */}
            <div className="grid grid-cols-2 gap-4">
              <img 
                src={meetingImage1} 
                alt="Участники собрания Крайпотребсоюза" 
                className="w-full aspect-[4/3] object-cover object-center rounded-[28px]"
              />
              <img 
                src={meetingImage3} 
                alt="Конференц-зал собрания Крайпотребсоюза" 
                className="w-full aspect-[4/3] object-cover object-center rounded-[28px]"
              />
            </div>
</div>
</div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section className="px-4 md:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-7xl rounded-[32px] md:rounded-[40px] bg-foreground p-6 md:p-12 [&_h2]:!text-background [&_p]:!text-background [&_li]:!text-background [&_span]:!text-background [&_div]:border-background/15">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground mb-6">Главный вывод кейса</h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="py-2 mb-6">
              <p className="text-xl text-foreground leading-relaxed mb-6">
                Проект показал, что устойчивые решения по ИИ возникают благодаря <strong>совместной работы</strong>:
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-6">
                <span className="py-2 text-accent font-semibold">бизнеса</span>
                <span className="py-2 text-accent font-semibold">команды</span>
                <span className="py-2 text-accent font-semibold">архитектурного подхода</span>
              </div>
              
              <p className="text-lg text-foreground leading-relaxed text-center italic">
                Одну и ту же задачу можно решать по-разному. В этом проекте мы совместно выбрали путь, который оказался <span className="text-primary-dark font-semibold">проще, дешевле и устойчивее</span>.
              </p>
            </div>
</div>
</div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-7xl rounded-[32px] md:rounded-[40px] bg-foreground p-6 md:p-12 shadow-card [&_h2]:!text-background">
            <h2 className="text-2xl md:text-4xl font-bold text-background leading-tight mb-6">
              Хотите получить похожий результат для вашей компании?
            </h2>
            <PillButton variant="light" size="md" onClick={scrollToContact}>
              Обсудить похожую задачу
            </PillButton>
          </div>
        </section>
        <Partners />
        </main>
        
        <Footer />
        
      </div>
    </PageTransition>
  );
};

export default CaseStudyKraypotrebsoyuz;
