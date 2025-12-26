import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Check, HeadphonesIcon, LineChart, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SupportPage = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    { icon: Shield, title: "Защита интересов", description: "Контролирую качество работы подрядчиков и защищаю ваш бюджет" },
    { icon: Users, title: "Обучение команды", description: "Ваши сотрудники научатся работать с новыми инструментами" },
    { icon: LineChart, title: "Метрики результата", description: "Еженедельный контроль KPI и корректировка процессов" },
    { icon: HeadphonesIcon, title: "Постоянная связь", description: "Оперативная поддержка и ответы на вопросы" },
  ];

  const includes = [
    "Еженедельные контрольные встречи",
    "Проверка качества работы подрядчиков",
    "Валидация бюджетов и требований",
    "Обучение команды работе с ИИ",
    "Корректировка процессов в реальном времени",
    "Контроль достижения метрик",
    "Финальная сдача с подтверждением результата",
    "Документация и передача знаний",
  ];

  const guarantee = {
    title: "Гарантия результата",
    description: "Если согласованные метрики не достигнуты за первый месяц — возвращаю стоимость этого месяца",
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Сопровождение внедрения ИИ | Александра Моисеева</title>
        <meta name="description" content="Контроль внедрения AI-решений до результата. Еженедельный мониторинг, обучение команды, гарантия достижения метрик." />
        <link rel="canonical" href="https://aleksamois.ru/services/support" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 md:px-6">
          <PageBreadcrumbs currentPage="Сопровождение" />

          {/* Hero */}
          <section className="py-12 md:py-20">
            <div className="max-w-4xl">
              <span className="text-primary font-medium mb-4 block">Услуга</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Сопровождение внедрения
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Не просто запускаю систему — контролирую результат. Обучаю команду, проверяю подрядчиков, гарантирую метрики.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={scrollToContact}>
                  Обсудить сопровождение
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/pricing')}>
                  Узнать стоимость
                </Button>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="py-12 border-t border-border">
            <div className="bg-card rounded-2xl p-8 border border-border max-w-xl">
              <div className="text-muted-foreground mb-2">Ежемесячный ретейнер</div>
              <div className="text-3xl font-bold text-foreground mb-2">50 000 – 150 000 ₽</div>
              <div className="text-muted-foreground">В зависимости от объёма работ</div>
            </div>
          </section>

          {/* Guarantee */}
          <section className="py-12 border-t border-border">
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{guarantee.title}</h3>
                  <p className="text-muted-foreground">{guarantee.description}</p>
                </div>
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
            <h2 className="text-3xl font-bold text-foreground mb-8">Что входит в сопровождение</h2>
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
            <h2 className="text-3xl font-bold text-foreground mb-8">Как это работает</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                { step: "01", title: "Запуск", description: "Старт проекта и настройка процессов" },
                { step: "02", title: "Встречи", description: "Еженедельный контроль и синхронизация" },
                { step: "03", title: "Аналитика", description: "Мониторинг метрик и KPI" },
                { step: "04", title: "Корректировки", description: "Оперативные изменения процессов" },
                { step: "05", title: "Сдача", description: "Финальная проверка и передача" },
              ].map((phase, index) => (
                <div key={index} className="relative">
                  <div className="text-4xl font-bold text-primary/20 mb-4">{phase.step}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="py-12 border-t border-border">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Нужен контроль внедрения с гарантией результата?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Обсудим ваш проект и определим метрики успеха
              </p>
              <Button size="lg" onClick={scrollToContact}>
                Обсудить сопровождение
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
