import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowRight, Search, Layers, Users, Coins, Clock, ShieldCheck, Building2 } from "lucide-react";
import DisabledLink from "@/components/DisabledLink";

const ServicesOverview = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const services = [
    {
      icon: Search,
      title: "Аудит зрелости",
      description: "Честная оценка: нужен ли вам ИИ и где он окупится.",
      pricing: [
        "от 15 000 ₽"
      ],
      details: [
        "Анализ процессов",
        "Оценка зрелости данных",
        "Карта рисков",
        "Расчет ROI",
        "План внедрения",
        "Честный ответ: где ИИ не нужен"
      ],
      detailsTitle: "Включает:",
      link: "/services#audit",
      linkText: "Подробнее об аудите"
    },
    {
      icon: Layers,
      title: "Архитектура",
      description: "Проект системы, которая встраивается в бизнес, а не ломает его.",
      pricing: [
        "от 60 000 ₽"
      ],
      details: [
        "Проектирование AI-архитектуры",
        "Выбор технологий (без комиссий)",
        "Схема интеграции",
        "ТЗ для подрядчиков",
        "Расчет бюджета",
        "Документация и регламенты"
      ],
      detailsTitle: "Включает:",
      link: "/services#strategy",
      linkText: "Подробнее об архитектуре"
    },
    {
      icon: Users,
      title: "Сопровождение",
      description: "Ваша страховка: контроль подрядчиков и обучение команды.",
      pricing: [
        "от 50 000 ₽/мес"
      ],
      details: [
        "Еженедельный контроль",
        "Проверка подрядчиков",
        "Обучение команды",
        "Регламенты работы",
        "Корректировки без доплат",
        "Гарантия до метрик"
      ],
      detailsTitle: "Включает:",
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
              Системное внедрение ИИ, <span className="font-semibold">под задачи компании</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`bg-muted rounded-2xl p-6 shadow-soft transition-all duration-300 hover:shadow-card hover:bg-primary/10 border border-border ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-xl font-medium text-foreground mb-3 leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-base text-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    {/* Pricing */}
                    {service.pricing && (
                      <div className="mb-4 space-y-2">
                        {service.pricing.map((price, i) => {
                          // Определяем иконку по содержанию текста
                          let IconComponent = Coins;
                          if (price.toLowerCase().includes('компани') || price.toLowerCase().includes('человек')) {
                            IconComponent = Building2;
                          } else if (price.toLowerCase().includes('недел') || price.toLowerCase().includes('месяц') || price.toLowerCase().includes('управление')) {
                            IconComponent = Clock;
                          } else if (price.toLowerCase().includes('гарантия') || price.toLowerCase().includes('вернём')) {
                            IconComponent = ShieldCheck;
                          }
                          
                          return (
                            <div key={i} className="flex items-start gap-2">
                              <IconComponent className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                              <span className="text-sm text-foreground leading-snug">{price}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {/* Details list */}
                    {service.details && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-foreground mb-2">
                          {service.detailsTitle}
                        </p>
                        <ul className="space-y-1.5">
                          {service.details.map((detail, i) => (
                            <li key={i} className="text-sm text-foreground leading-snug flex items-start gap-2">
                              <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <DisabledLink 
                      to={service.link}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 mt-auto"
                    >
                      <span>{service.linkText} →</span>
                    </DisabledLink>
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
