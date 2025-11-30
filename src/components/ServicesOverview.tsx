import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowRight, Search, Layers, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesOverview = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const services = [
    {
      icon: Search,
      title: "Аудит и диагностика",
      description: "Определяю, где ИИ даст отдачу, а где не сработает. Выявляю точки потерь, зрелость данных и готовность команды.",
      link: "/services#audit",
      linkText: "Подробнее об аудите"
    },
    {
      icon: Layers,
      title: "Стратегия и архитектура",
      description: "Проектирую масштабируемую систему, безопасные интеграции, выбор технологий, последовательность внедрения, расчет эффекта",
      link: "/services#strategy",
      linkText: "Подробнее об архитектуре"
    },
    {
      icon: Users,
      title: "Сопровождение и независимая экспертиза",
      description: "Проверяю подрядчиков, контролирую качество, обучаю команду. Довожу решения до измеримого результата.",
      link: "/services#support",
      linkText: "Подробнее о сопровождении"
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="section-title text-center leading-tight mb-4">
              Системное внедрение ИИ под задачи компании
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`bg-[hsl(var(--gray-50))] rounded-2xl p-6 shadow-card transition-all duration-300 hover:shadow-hover hover:scale-[1.02] hover:bg-primary-light/20 gradient-border gradient-border-hover ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-heading mb-3 leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-base text-text-body leading-relaxed mb-4 flex-grow">
                      {service.description}
                    </p>
                    
                    <Link 
                      to={service.link}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
                    >
                      <span>{service.linkText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
