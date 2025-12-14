import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowRight, Search, Layers, Users, Coins } from "lucide-react";
import DisabledLink from "@/components/DisabledLink";

const Foundation = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const services = [
    {
      icon: Search,
      title: "Диагностика",
      subtitle: "Аудит зрелости",
      description: "Честная оценка: нужен ли вам ИИ и где он окупится.",
      pricing: "от 15 000 ₽",
      details: [
        "Анализ процессов",
        "Оценка зрелости данных",
        "Карта рисков",
        "Расчет ROI",
        "План внедрения",
        "Честный ответ: где ИИ не нужен"
      ],
      link: "/services#audit",
      linkText: "Подробнее об аудите"
    },
    {
      icon: Layers,
      title: "Архитектура",
      subtitle: "Проектирование решений",
      description: "Проект системы, которая встраивается в бизнес, а не ломает его.",
      pricing: "от 60 000 ₽",
      details: [
        "Проектирование AI-архитектуры",
        "Выбор технологий (без комиссий)",
        "Схема интеграции",
        "ТЗ для подрядчиков",
        "Расчет бюджета",
        "Документация и регламенты"
      ],
      link: "/services#strategy",
      linkText: "Подробнее об архитектуре"
    },
    {
      icon: Users,
      title: "Сопровождение",
      subtitle: "Контроль внедрения",
      description: "Ваша страховка: контроль подрядчиков и обучение команды.",
      pricing: "от 50 000 ₽/мес",
      details: [
        "Еженедельный контроль",
        "Проверка подрядчиков",
        "Обучение команды",
        "Регламенты работы",
        "Корректировки без доплат",
        "Гарантия до метрик"
      ],
      link: "/services#support",
      linkText: "Подробнее о сопровождении"
    }
  ];

  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h2 
          className={`section-title text-center mb-10 md:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Фундамент, <span className="font-semibold">три этапа работы</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="relative">
                <DisabledLink 
                  to={service.link}
                  className={`bg-[hsl(var(--gray-50))] rounded-2xl p-4 sm:p-6 shadow-card sm:hover:shadow-hover sm:hover:scale-[1.02] gradient-border transition-all duration-500 w-full flex flex-col cursor-pointer h-full ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-medium text-foreground mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-primary mb-2 sm:mb-3">{service.subtitle}</p>
                  
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Coins className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    <span className="text-xs sm:text-sm font-medium text-foreground">{service.pricing}</span>
                  </div>
                  
                  <div className="mb-3 sm:mb-4 flex-grow">
                    <p className="text-xs sm:text-sm font-medium text-foreground mb-2">Включает:</p>
                    <ul className="space-y-1 sm:space-y-1.5">
                      {service.details.map((detail, i) => (
                        <li key={i} className="text-xs sm:text-sm text-muted-foreground leading-snug flex items-start gap-2">
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <span className="inline-flex items-center gap-2 text-primary font-medium mt-auto text-sm sm:text-base">
                    {service.linkText} →
                  </span>
                </DisabledLink>
                
                {index < services.length - 1 && (
                  <ArrowRight 
                    className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-primary w-5 h-5 flex-shrink-0" 
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Foundation;
