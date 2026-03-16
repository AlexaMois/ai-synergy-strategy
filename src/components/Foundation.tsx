import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowRight, Search, Layers, Users, Coins } from "lucide-react";
import DisabledLink from "@/components/DisabledLink";
import { Link } from "react-router-dom";
import AnimatedMetric from "./AnimatedMetric";

const Foundation = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const services = [
    {
      icon: Search,
      title: "Диагностика / Аудит",
      subtitle: "За одну встречу узнаете, нужен ли вам ИИ и где он принесёт деньги",
      description: "Анализируем процессы, говорим прямо: где окупится, а где — лишние расходы.",
      pricing: "от 15 000 ₽",
      result: "Дорожная карта с расчётом ROI. Средняя экономия клиентов — от 150 000 ₽/мес.",
      link: "/services/diagnostics",
      linkText: "Подробнее о диагностике"
    },
    {
      icon: Layers,
      title: "Архитектура",
      subtitle: "Рабочая схема под вашу инфраструктуру — через 7–10 дней",
      description: "Проектируем AI-решение под ваши задачи. Вы получаете ТЗ и BPMN-схемы — документы, с которыми работает любая команда.",
      pricing: "от 150 000 ₽",
      result: "Готовая архитектура и план интеграции.",
      link: "/services/architecture",
      linkText: "Подробнее об архитектуре"
    },
    {
      icon: Users,
      title: "Сопровождение",
      subtitle: "Система запущена, команда работает с ИИ, метрики растут",
      description: "Запускаем, обучаем команду, настраиваем под задачи. Еженедельно контролируем результаты.",
      pricing: "от 60 000 ₽/мес",
      result: "Скорость обработки задач растёт на 20–50% за месяц.",
      link: "/services/support",
      linkText: "Подробнее о сопровождении"
    }
  ];

  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50/50 section-gradient-bottom-light">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h2 
          className={`section-title text-center mb-10 md:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Как внедрить ИИ <span className="font-semibold">и не потерять бюджет</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="relative">
                <DisabledLink 
                  to={service.link}
                  className={`bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-soft hover-lift-card w-full flex flex-col cursor-pointer h-full ${
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
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                      <AnimatedMetric text={service.pricing} isVisible={isVisible} />
                    </span>
                  </div>
                  
                  <div className="mb-3 sm:mb-4 flex-grow">
                    <p className="text-xs sm:text-sm font-medium text-foreground mb-1">Результат:</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-snug">{service.result}</p>
                  </div>
                  
                  <span className="inline-flex items-center gap-2 text-primary font-medium mt-auto text-sm sm:text-base">
                    {service.linkText} →
                  </span>
                </DisabledLink>
                
                {index < services.length - 1 && (
                  <ArrowRight 
                    className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-primary w-5 h-5 flex-shrink-0" 
                    strokeWidth={1.5}
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
