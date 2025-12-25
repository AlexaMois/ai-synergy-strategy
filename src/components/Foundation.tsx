import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowRight, Search, Layers, Users, Coins } from "lucide-react";
import DisabledLink from "@/components/DisabledLink";

const Foundation = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const services = [
    {
      icon: Search,
      title: "Диагностика",
      subtitle: "Как внедрить ИИ в ваш бизнес",
      description: "Консалтинг по внедрению искусственного интеллекта: анализируем ваш бизнес, показываем где ИИ даст результат за месяц, а где нужна переделка процессов на полгода. Честный ответ — нужен ли AI вашей компании.",
      pricing: "15 000 ₽",
      details: [
        "Анализ ваших процессов — продаж, производства",
        "Карта возможностей AI — что даст результат немедленно",
        "Расчет ROI — сколько потратите, сколько сэкономите",
        "Приоритезация внедрений — с чего начать",
        "Сроки и риски реально, без обещаний",
        "Вывод: стоит ли вам внедрять AI и почему"
      ],
      process: "Звоните → встреча/онлайн (30 мин) → анализ 3-5 дней → отчет с рекомендациями",
      link: "/services#audit",
      linkText: "Подробнее о диагностике"
    },
    {
      icon: Layers,
      title: "Архитектура",
      subtitle: "Система под вашу компанию",
      description: "Проектирование AI-решения, которое встраивается в ваш текущий процесс без переделки всего. Выбираем технологии, схему интеграции с CRM, 1С, производственными системами.",
      pricing: "от 150 000 ₽",
      details: [
        "Архитектура решения под объемы вашей компании",
        "Выбор AI-технологий без лишних затрат",
        "Интеграция с текущими системами — CRM, 1С, MES, WMS",
        "Техническое задание для разработчиков",
        "Бюджет и реальные сроки внедрения",
        "Документация и регламенты работы"
      ],
      process: "ТЗ от диагностики → проектирование (7-10 дней) → согласование → ТЗ для разработки",
      link: "/services#strategy",
      linkText: "Подробнее об архитектуре"
    },
    {
      icon: Users,
      title: "Сопровождение",
      subtitle: "Контроль, чтобы результат был гарантирован",
      description: "Я контролирую качество разработки, учу команду работать с AI-системой, гарантирую что вы получите обещанный результат. Платите за результат, а не обещания.",
      pricing: "от 60 000 ₽/месяц",
      details: [
        "Еженедельный контроль результатов и метрик",
        "Проверка качества разработки AI-решения",
        "Обучение команды работе с системой",
        "Регламенты и инструкции для всех",
        "Доделки без расчета если не работает",
        "Гарантия достижения метрик (обещали +30% → получаете +30%)"
      ],
      process: "Разработка идет → еженедельные встречи → доделки → запуск → поддержка",
      link: "/services#support",
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
          Фундамент, <span className="font-semibold">три этапа работы</span>
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
                  
                  <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Coins className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    <span className="text-xs sm:text-sm font-medium text-foreground">{service.pricing}</span>
                  </div>
                  
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm font-medium text-foreground mb-2">Включает:</p>
                    <p className="text-xs sm:text-sm text-foreground leading-snug flex items-start gap-2 mb-2">
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <span>{service.details[0]}</span>
                    </p>
                    <span className="text-xs sm:text-sm text-primary hover:underline">
                      Подробнее что включает →
                    </span>
                  </div>
                  
                  <div className="mb-3 sm:mb-4 flex-grow">
                    <p className="text-xs sm:text-sm font-medium text-foreground mb-2">Процесс:</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-snug">{service.process}</p>
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
