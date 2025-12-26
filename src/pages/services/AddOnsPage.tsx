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
      title: "Personal ИИ-агент",
      description: "Умный помощник для CEO или собственника. Анализирует данные, готовит сводки, предлагает решения, напоминает о важном, принимает решения в пределах вашего регламента."
    },
    {
      icon: Users,
      title: "Цифровые двойники сотрудников",
      description: "Виртуальная копия эксперта, которая работает вместо него или дублирует его знания. Может заменять в отпусках, обучать новичков, принимать стандартные решения."
    },
    {
      icon: Cpu,
      title: "Настройка нейросетей и fine-tuning",
      description: "Обучение моделей на ваших данных для точности. Оптимизация промптов, настройка параметров, кастомизация под вашу специфику."
    },
    {
      icon: Blocks,
      title: "Low-code автоматизация",
      description: "Готовые решения за 2–3 недели на Бипиум. Полностью под требования РФ, работает в ваших процессах сразу."
    },
    {
      icon: GraduationCap,
      title: "Корпоративное обучение",
      description: "Программа для всей команды: от базовых до продвинутых техник. Как использовать ИИ в работе, безопасность данных, лучшие практики, кейсы."
    },
    {
      icon: Shield,
      title: "Защищённые контуры",
      description: "Для критичных данных под требования ЦБ и РФ. Все хранится в РФ, импортозамещение, соответствие регуляторам, изолированные от интернета системы."
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Дополнительные решения | Александра Моисеева</title>
        <meta name="description" content="Дополнительные AI-решения: персональные агенты, цифровые двойники, fine-tuning нейросетей, low-code автоматизация, корпоративное обучение, защищённые контуры." />
        <link rel="canonical" href="https://aleksamois.ru/services/add-ons" />
        <meta property="og:title" content="Дополнительные решения | Александра Моисеева" />
        <meta property="og:description" content="AI-решения: персональные агенты, цифровые двойники, корпоративное обучение." />
        <meta property="og:url" content="https://aleksamois.ru/services/add-ons" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 md:px-6">
          <PageBreadcrumbs 
            currentPage="Доп. решения" 
            parentPages={[{ label: "Услуги", href: "/services" }]}
          />

          {/* Hero */}
          <section className="py-12 md:py-20">
            <div className="max-w-4xl">
              <span className="text-primary font-medium mb-4 block">Услуги</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Дополнительные решения
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Если основные три услуги не полностью закрывают вашу задачу:
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-12 border-t border-border">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 flex-shrink-0">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="py-12 border-t border-border">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
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
