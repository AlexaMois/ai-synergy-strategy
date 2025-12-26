import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Check, Clock, FileText, Target, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DiagnosticsPage = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    { icon: Target, title: "Точечный анализ", description: "Выявляю конкретные процессы, где ИИ даст максимальный эффект" },
    { icon: Clock, title: "Быстрый результат", description: "За 2-4 недели получаете полную картину и план действий" },
    { icon: FileText, title: "Детальный отчёт", description: "Roadmap с приоритетами, сроками и тремя сценариями бюджета" },
    { icon: Zap, title: "Экономия ресурсов", description: "Не тратите деньги на неработающие решения" },
  ];

  const includes = [
    "Интервью с ключевыми сотрудниками",
    "Анализ текущих бизнес-процессов",
    "Оценка IT-инфраструктуры и данных",
    "Выявление точек потерь времени и денег",
    "Определение приоритетных задач для автоматизации",
    "Расчёт потенциального ROI",
    "Roadmap внедрения с 3 сценариями бюджета",
    "Рекомендации по выбору инструментов",
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Диагностика бизнес-процессов | Александра Моисеева</title>
        <meta name="description" content="Аудит и анализ процессов для внедрения ИИ. За 2-4 недели определю, где искусственный интеллект принесёт максимальную пользу вашему бизнесу." />
        <link rel="canonical" href="https://aleksamois.ru/services/diagnostics" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 md:px-6">
          <PageBreadcrumbs currentPage="Диагностика" />

          {/* Hero */}
          <section className="py-12 md:py-20">
            <div className="max-w-4xl">
              <span className="text-primary font-medium mb-4 block">Услуга</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Диагностика бизнес-процессов
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Определю, где ваш бизнес теряет время и деньги, и покажу, как ИИ решит эти проблемы с измеримым результатом.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={scrollToContact}>
                  Заказать диагностику
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/pricing')}>
                  Узнать стоимость
                </Button>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="py-12 border-t border-border">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="text-muted-foreground mb-2">Малый бизнес</div>
                <div className="text-3xl font-bold text-foreground mb-2">6 000 – 15 000 ₽</div>
                <div className="text-muted-foreground">10-50 сотрудников</div>
              </div>
              <div className="bg-card rounded-2xl p-8 border border-primary/30 ring-2 ring-primary/20">
                <div className="text-primary mb-2">Средний бизнес</div>
                <div className="text-3xl font-bold text-foreground mb-2">25 000 – 60 000 ₽</div>
                <div className="text-muted-foreground">50-200 сотрудников</div>
              </div>
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="text-muted-foreground mb-2">Крупный бизнес</div>
                <div className="text-3xl font-bold text-foreground mb-2">80 000 – 200 000 ₽</div>
                <div className="text-muted-foreground">200+ сотрудников</div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8">Что вы получите</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border">
                  <benefit.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What's included */}
          <section className="py-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8">Что входит в диагностику</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {includes.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="py-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8">Как проходит диагностика</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Знакомство", description: "Бесплатная консультация 30 минут для понимания задач" },
                { step: "02", title: "Исследование", description: "Интервью с командой, анализ процессов и данных" },
                { step: "03", title: "Анализ", description: "Выявление точек роста и расчёт потенциального ROI" },
                { step: "04", title: "Отчёт", description: "Презентация результатов и roadmap внедрения" },
              ].map((phase, index) => (
                <div key={index} className="relative">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{phase.step}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{phase.title}</h3>
                  <p className="text-muted-foreground">{phase.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="py-12 border-t border-border">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Готовы узнать, где ИИ принесёт пользу вашему бизнесу?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Начнём с бесплатной 30-минутной консультации, чтобы понять ваши задачи
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
