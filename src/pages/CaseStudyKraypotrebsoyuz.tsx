import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";

import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Users, Clock, DollarSign } from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";

const CaseStudyKraypotrebsoyuz = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Article", "CaseStudy"],
        "@id": "https://aleksamois.ru/case-studies/kraypotrebsoyuz#article",
        "headline": "Крайпотребсоюз: автоматизация договоров с ROI 278%",
        "description": "Как региональное объединение кооперативов сократило время на обработку договоров на 92% при бюджете 25 000 ₽",
        "author": {
          "@type": "Person",
          "name": "Александра Моисеева",
          "url": "https://aleksamois.ru/"
        },
        "publisher": { "@id": "https://aleksamois.ru/#organization" },
        "datePublished": "2024-06-15",
        "dateModified": "2025-01-15",
        "mainEntityOfPage": "https://aleksamois.ru/case-studies/kraypotrebsoyuz",
        "about": {
          "@type": "Thing",
          "name": "Автоматизация договорного документооборота"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Organization",
          "name": "Крайпотребсоюз"
        },
        "reviewBody": "Александра показала, что автоматизация — это не про дорогие системы, а про правильную архитектуру. Мы получили решение, которое работает и которым команда может управлять самостоятельно. Окупились за 3 недели, а главное — освободили людей от рутины.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "HowTo",
        "name": "Как автоматизировать договорной документооборот",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Аудит процессов",
            "text": "Выявили 6 узких мест в процессе обработки договоров, определили точки максимальных потерь времени"
          },
          {
            "@type": "HowToStep",
            "name": "Архитектура решения",
            "text": "Выбрали платформу Bpium, спроектировали workflow: загрузка → проверка → согласование → архив"
          },
          {
            "@type": "HowToStep",
            "name": "Обучение команды",
            "text": "Провели практический тренинг, создали документацию, назначили администратора"
          }
        ],
        "totalTime": "P14D",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "RUB",
          "value": "25000"
        }
      }
    ]
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Крайпотребсоюз: автоматизация договоров с ROI 278% | Александра Моисеева</title>
        <meta name="description" content="Кейс автоматизации договорного документооборота для Краснодарского краевого союза потребительских кооперативов. Экономия 92% времени при бюджете 25 000 ₽." />
        <link rel="canonical" href="https://aleksamois.ru/case-studies/kraypotrebsoyuz" />
        <meta property="og:title" content="Крайпотребсоюз: автоматизация договоров с ROI 278%" />
        <meta property="og:description" content="Как региональное объединение кооперативов сократило время на обработку договоров на 92% при бюджете 25 000 ₽" />
        <meta property="og:url" content="https://aleksamois.ru/case-studies/kraypotrebsoyuz" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        
        <main>
        {/* Hero Section */}
        <section className="pt-32 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <Building2 className="w-12 h-12 text-primary" strokeWidth={1.5} />
              <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold text-foreground leading-tight">
                Крайпотребсоюз: автоматизация договоров с ROI 278%
              </h1>
            </div>
            
            <div className="bg-primary/10 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">О клиенте</h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Краснодарский краевой союз потребительских кооперативов — региональное объединение, управляющее сетью товарных кооперативов на территории Краснодарского края.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-card rounded-xl p-4">
                  <Users className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Штат</p>
                  <p className="text-lg font-semibold text-foreground">~50 человек</p>
                </div>
                <div className="bg-card rounded-xl p-4">
                  <Building2 className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Организаций</p>
                  <p className="text-lg font-semibold text-foreground">120+ членов</p>
                </div>
                <div className="bg-card rounded-xl p-4">
                  <Clock className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Договоров</p>
                  <p className="text-lg font-semibold text-foreground">Тысячи/год</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="section-title mb-8">Проблема: процессы не масштабируются</h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-3">Временные потери</h3>
                <p className="text-3xl font-bold text-red-600 mb-2">
                  <AnimatedNumber value={600} suffix="+ часов/мес" className="text-red-600" />
                </p>
                <p className="text-sm text-muted-foreground">на оформление и обработку договоров вручную</p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-3">Ресурсы</h3>
                <p className="text-3xl font-bold text-red-600 mb-2">
                  <AnimatedNumber value={8} suffix=" сотрудников" className="text-red-600" />
                </p>
                <p className="text-sm text-muted-foreground">только на эту операцию</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">Ключевые боли:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span className="text-muted-foreground">Бесконечные ошибки в документах и задержки согласования</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span className="text-muted-foreground">Невозможность масштабирования без увеличения штата</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span className="text-muted-foreground">Отсутствие прозрачности процесса обработки</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="section-title mb-8">Решение: системный подход к автоматизации</h2>
            
            <div className="bg-primary/10 rounded-2xl p-6 mb-8 border-l-4 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-primary" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-foreground">Бюджет проекта: ~25 000 ₽</h3>
              </div>
              <p className="text-sm text-muted-foreground">Показывает, что результат зависит не от размера бюджета, а от правильной архитектуры решения</p>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">Этап 1: Аудит процессов (1 неделя)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Выявили 6 узких мест в процессе обработки договоров</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Определили точки максимальных потерь времени</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Оценили зрелость данных и готовность команды</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">Этап 2: Архитектура решения (1 неделя)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Выбрали платформу Bpium (российская low-code система для бизнес-процессов)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Спроектировали workflow: загрузка → автоматическая проверка → согласование → архив</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Настроили интеграции с существующими системами</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">Этап 3: Обучение команды (2 дня)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Провели практический тренинг для всех сотрудников</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Создали инструкции и документацию</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Назначили внутреннего администратора системы</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="section-title mb-8">Результаты: измеримый эффект за 3 месяца</h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">
                  <AnimatedNumber value={92} suffix="%" className="text-primary" />
                </p>
                <p className="text-sm text-muted-foreground">Экономия времени на обработку<br />(~550 часов/месяц)</p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">
                  <AnimatedNumber value={80} suffix="%" className="text-primary" />
                </p>
                <p className="text-sm text-muted-foreground">Сокращение ФОТ<br />на эту операцию</p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">
                  <AnimatedNumber value={278} suffix="%" className="text-primary" />
                </p>
                <p className="text-sm text-muted-foreground">ROI<br />(окупилось за 3 недели)</p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">
                  <AnimatedNumber value={0} className="text-primary" />
                </p>
                <p className="text-sm text-muted-foreground">Ошибок в обработке<br />после внедрения</p>
              </div>
            </div>

            <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary">
              <h3 className="text-lg font-semibold text-foreground mb-3">Отзыв руководителя:</h3>
              <p className="text-base italic text-muted-foreground leading-relaxed mb-4">
                "Александра показала, что автоматизация — это не про дорогие системы, а про правильную архитектуру. 
                Мы получили решение, которое работает и которым команда может управлять самостоятельно. 
                Окупились за 3 недели, а главное — освободили людей от рутины."
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Представитель руководства Крайпотребсоюза</strong>
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Хотите получить похожий результат для вашей компании?
            </h2>
            <Button size="lg" asChild>
              <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                Пройти экспресс-аудит процессов
              </a>
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
