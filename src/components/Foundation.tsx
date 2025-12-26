import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowRight, Search, Layers, Users, Coins } from "lucide-react";
import DisabledLink from "@/components/DisabledLink";
import { Link } from "react-router-dom";

const Foundation = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const services = [
    {
      icon: Search,
      title: "Диагностика",
      subtitle: "Как внедрить ИИ в бизнес правильно",
      description: "Консалтинг по внедрению искусственного интеллекта. За 30 минут проанализирую ваши бизнес-процессы и скажу честно: нужна ли вам нейросеть и где она даст результат в первый месяц.",
      pricing: "15 000 ₽",
      details: [
        "Диагностика ваших процессов (продажи, поддержка, производство)",
        "Честное заключение: нужна ли вам автоматизация с помощью ИИ"
      ],
      result: "Вы знаете, с чего начать внедрение. Или экономите миллионы, не начиная.",
      process: "Встреча (30 мин онлайн) → анализ → отчет с рекомендациями",
      link: "/services#audit",
      linkText: "Подробнее о диагностике"
    },
    {
      icon: Layers,
      title: "Архитектура",
      subtitle: "Внедрение AI решений под ключ для вашей компании",
      description: "Проектирование и разработка AI решения, которое встроится в вашу CRM, систему обслуживания и производственные процессы без переделок. Интеграция ChatGPT, GigaChat или локальных моделей в amoCRM, 1С, Telegram-бот.",
      pricing: "от 150 000 ₽",
      details: [
        "Выбор решения (чат-бот, голосовой ассистент, интеграция для автоматизации)",
        "План интеграции ИИ в существующие системы (CRM, коммуникации, аналитика)"
      ],
      result: "Готовая система, которая окупится за первый месяц через экономию часов работников.",
      process: "Анализ требований → проектирование (7-10 дней) → готовая архитектура",
      link: "/services#strategy",
      linkText: "Подробнее об архитектуре"
    },
    {
      icon: Users,
      title: "Сопровождение",
      subtitle: "Сопровождение внедрения ИИ до результата",
      description: "Не просто запускаю систему — контролирую результаты. Обучаю вашу команду работе с нейросетями, гарантирую метрики. Сопровождение включает еженедельный контроль качества и корректировки.",
      pricing: "от 60 000 ₽/месяц",
      details: [
        "Запуск и обучение команды (работа с ChatGPT, нейросетями, AI-агентами)",
        "Еженедельный контроль результатов, метрик и стоимости"
      ],
      result: "Система работает стабильно. Команда получила обучение. Метрики растут на 20-50% за месяц.",
      process: "Запуск → еженедельные встречи → аналитика → доделки → поддержка",
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
                  
                  <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Coins className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    <span className="text-xs sm:text-sm font-medium text-foreground">{service.pricing}</span>
                  </div>
                  
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm font-medium text-foreground mb-2">Включает:</p>
                    {service.details.map((detail, idx) => (
                      <p key={idx} className="text-xs sm:text-sm text-foreground leading-snug flex items-start gap-2 mb-1.5">
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
                        <span>{detail}</span>
                      </p>
                    ))}
                  </div>
                  
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm font-medium text-foreground mb-1">Результат:</p>
                    <p className="text-xs sm:text-sm text-foreground leading-snug">{service.result}</p>
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
