import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Check, Blocks, GitBranch, Shield, Workflow } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArchitecturePage = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    { icon: Blocks, title: "Модульная архитектура", description: "Решения, которые легко масштабировать и дорабатывать" },
    { icon: GitBranch, title: "Интеграции", description: "Бесшовное подключение к CRM, 1С, Telegram и другим системам" },
    { icon: Shield, title: "Безопасность", description: "Защита данных и соответствие требованиям регуляторов" },
    { icon: Workflow, title: "Автоматизация", description: "Процессы работают без постоянного участия людей" },
  ];

  const includes = [
    "Детальный анализ требований и ограничений",
    "Выбор оптимального стека технологий",
    "Проектирование архитектуры решения",
    "Схемы интеграций с существующими системами",
    "Расчёт нагрузки и масштабирования",
    "Три сценария реализации (быстрый/оптимальный/комплексный)",
    "Техническое задание для разработки",
    "Рекомендации по выбору подрядчиков",
  ];

  const technologies = [
    "Make / n8n / Zapier",
    "OpenAI API / GigaChat / YandexGPT",
    "amoCRM / Bitrix24 / 1С",
    "Telegram Bot API",
    "Python / Node.js",
    "PostgreSQL / MongoDB",
    "Docker / Kubernetes",
    "Собственные LLM-модели",
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Архитектура ИИ-решений | Александра Моисеева</title>
        <meta name="description" content="Проектирование и разработка AI-решений под ключ. Интеграция ChatGPT, GigaChat в CRM, 1С, Telegram с гарантией результата." />
        <link rel="canonical" href="https://aleksamois.ru/services/architecture" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 md:px-6">
          <PageBreadcrumbs currentPage="Архитектура" />

          {/* Hero */}
          <section className="py-12 md:py-20">
            <div className="max-w-4xl">
              <span className="text-primary font-medium mb-4 block">Услуга</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Архитектура ИИ-решений
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Проектирую системы, которые встраиваются в ваш бизнес без переделок. От выбора технологий до готового ТЗ для разработки.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={scrollToContact}>
                  Обсудить проект
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
              <div className="text-muted-foreground mb-2">Стоимость</div>
              <div className="text-3xl font-bold text-foreground mb-2">от 60 000 ₽</div>
              <div className="text-muted-foreground mb-4">Срок: 4-8 недель</div>
              <p className="text-muted-foreground">
                Финальная стоимость зависит от сложности проекта и количества интеграций
              </p>
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
            <h2 className="text-3xl font-bold text-foreground mb-8">Что входит в услугу</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {includes.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Technologies */}
          <section className="py-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8">Технологии</h2>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <span key={index} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="py-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8">Этапы работы</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Анализ требований", description: "Глубокое погружение в бизнес-процессы и задачи" },
                { step: "02", title: "Проектирование", description: "Выбор технологий и создание архитектуры" },
                { step: "03", title: "Документация", description: "ТЗ, схемы интеграций, план реализации" },
                { step: "04", title: "Сопровождение", description: "Помощь в выборе подрядчиков и старте разработки" },
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
                Нужна архитектура ИИ-решения?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Обсудим ваш проект и подберём оптимальное решение
              </p>
              <Button size="lg" onClick={scrollToContact}>
                Обсудить проект
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
