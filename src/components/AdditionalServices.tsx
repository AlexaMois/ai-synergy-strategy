import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Cpu, Blocks, GraduationCap, Shield } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const additionalServices = [
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
                  className={`group p-6 rounded-2xl bg-card border border-border ring-1 ring-border/30 shadow-card hover:shadow-elevated hover:-translate-y-2 transition-all duration-300 ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.2 + index * 0.08}s` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shadow-xs group-hover:shadow-soft flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {service.title}
                    </h3>
                  </div>
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
