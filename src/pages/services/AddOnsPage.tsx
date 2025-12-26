import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Cpu, Blocks, GraduationCap, Shield } from "lucide-react";

const AddOnsPage = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Sparkles,
      title: "Персональный ИИ-агент",
      description: "Создание умного ассистента, который знает ваш бизнес, отвечает на вопросы клиентов и сотрудников, автоматизирует рутину.",
      features: ["Обучение на ваших данных", "Интеграция с CRM и мессенджерами", "Постоянное обновление знаний"],
    },
    {
      icon: Users,
      title: "Цифровые двойники сотрудников",
      description: "ИИ-копии ключевых специалистов для масштабирования экспертизы. Консультируют, обучают, отвечают на типовые вопросы.",
      features: ["Захват знаний экспертов", "Доступ 24/7", "Разгрузка специалистов"],
    },
    {
      icon: Cpu,
      title: "Настройка нейросетей и fine-tuning",
      description: "Дообучение языковых моделей на ваших данных для повышения точности и релевантности ответов в вашей предметной области.",
      features: ["Подготовка датасетов", "Fine-tuning моделей", "Оценка качества"],
    },
    {
      icon: Blocks,
      title: "Low-code автоматизация",
      description: "Настройка автоматизаций на платформах Bpium, Make, n8n без программирования. Быстрый запуск и простое сопровождение.",
      features: ["Интеграция сервисов", "Автоматические сценарии", "Визуальные редакторы"],
    },
    {
      icon: GraduationCap,
      title: "Корпоративное обучение",
      description: "Программы обучения для команд: как использовать ИИ в ежедневной работе, prompt-engineering, работа с нейросетями.",
      features: ["Практические воркшопы", "Методические материалы", "Сертификация"],
    },
    {
      icon: Shield,
      title: "Защищённые контуры",
      description: "Развёртывание ИИ-решений в изолированной инфраструктуре для работы с конфиденциальными данными и соответствия требованиям регуляторов.",
      features: ["On-premise решения", "Соответствие 152-ФЗ", "Аудит безопасности"],
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Дополнительные решения | Александра Моисеева</title>
        <meta name="description" content="Дополнительные AI-услуги: персональные агенты, цифровые двойники, fine-tuning, low-code автоматизация, обучение, защищённые контуры." />
        <link rel="canonical" href="https://aleksamois.ru/services/add-ons" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 md:px-6">
          <PageBreadcrumbs currentPage="Доп. решения" />

          {/* Hero */}
          <section className="py-12 md:py-20">
            <div className="max-w-4xl">
              <span className="text-primary font-medium mb-4 block">Услуги</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Дополнительные решения
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Специализированные услуги для расширения возможностей вашего бизнеса с помощью ИИ
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-12 border-t border-border">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors">
                  <service.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="py-12 border-t border-border">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Нужно специализированное решение?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Обсудим вашу задачу и подберём оптимальный подход
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

export default AddOnsPage;
