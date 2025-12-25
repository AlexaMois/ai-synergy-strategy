import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Bot, Workflow, GraduationCap, Beaker, Shield } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const additionalServices = [
  {
    icon: Bot,
    title: "ИИ-ассистенты",
    description: "Для менеджеров, операционистов, аналитиков, бухгалтеров — под конкретные роли и задачи"
  },
  {
    icon: Workflow,
    title: "Low-code автоматизация",
    description: "Готовые решения за 2–3 недели на Бипиум, полностью под требования РФ"
  },
  {
    icon: GraduationCap,
    title: "Обучение команды",
    description: "Регулярные сессии, документация, чек-листы, встроенные в ваши процессы"
  },
  {
    icon: Beaker,
    title: "MVP-решения",
    description: "Проверить гипотезу перед полноценным внедрением, риск-менеджмент"
  },
  {
    icon: Shield,
    title: "Защищённые контуры",
    description: "Под требования ЦБ и РФ — для критичных данных, импортозамещение"
  }
];

const AdditionalServices = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
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

  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 
            className={`section-title text-center leading-tight mb-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            Дополнительные решения
          </h2>
          <p 
            className={`text-base sm:text-lg text-muted-foreground text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            Если основные три услуги не полностью закрывают вашу задачу:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.2 + index * 0.08}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div 
            className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.6s' }}
          >
            <Button size="lg" onClick={scrollToContact}>
              Обсудить вашу задачу →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;
