import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowRight, Search, Layers, Users, DollarSign, Clock, ShieldCheck, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesOverview = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const services = [
    {
      icon: Search,
      title: "Аудит и диагностика",
      description: "Определяю, где ИИ даст отдачу, а где не сработает. Выявляю точки потерь, зрелость данных и готовность команды.",
      pricing: [
        "Для компаний 10–50 человек: 6–15 тыс. ₽",
        "Для компаний 50–200 человек: 25–60 тыс. ₽",
        "Для компаний 200+ человек: 80–200 тыс. ₽"
      ],
      format: "Формат: 3–4 недели, 2–3 встречи, финальный отчёт с roadmap",
      link: "/services#audit",
      linkText: "Подробнее об аудите"
    },
    {
      icon: Layers,
      title: "Стратегия и архитектура",
      description: "Проектирую масштабируемую систему, безопасные интеграции, выбор технологий, последовательность внедрения, расчет эффекта",
      pricing: [
        "Зависит от сложности: от 60 тыс. до 400 тыс. ₽",
        "4–8 недель + управление внедрением"
      ],
      details: [
        "Анализ текущих процессов и систем",
        "Проектирование AI-решения под ваши данные",
        "Выбор инструментов (без привязки к вендорам)",
        "Расчёт ROI и бюджета",
        "План внедрения по этапам"
      ],
      detailsTitle: "Включает:",
      link: "/services#strategy",
      linkText: "Подробнее об архитектуре"
    },
    {
      icon: Users,
      title: "Сопровождение и независимая экспертиза",
      description: "Проверяю подрядчиков, контролирую качество, обучаю команду. Довожу решения до измеримого результата.",
      pricing: [
        "Месячный ретейнер: от 50 тыс. до 150 тыс. ₽",
        "Гарантия: если не достигнем метрик — вернём деньги за 1 месяц"
      ],
      details: [
        "Еженедельные контрольные встречи",
        "Проверка качества от подрядчиков",
        "Обучение вашей команды",
        "Корректировки процессов на лету",
        "Финальная сдача с метриками"
      ],
      detailsTitle: "Что входит:",
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
                    
                    <p className="text-base text-text-body leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    {/* Pricing */}
                    {service.pricing && (
                      <div className="mb-4 space-y-2">
                        {service.pricing.map((price, i) => {
                          // Определяем иконку по содержанию текста
                          let IconComponent = DollarSign;
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
                              <span className="text-sm text-text-body leading-snug">{price}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {/* Format */}
                    {service.format && (
                      <p className="text-sm text-text-body mb-4 italic">
                        {service.format}
                      </p>
                    )}
                    
                    {/* Details list */}
                    {service.details && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-text-heading mb-2">
                          {service.detailsTitle}
                        </p>
                        <ul className="space-y-1.5">
                          {service.details.map((detail, i) => (
                            <li key={i} className="text-sm text-text-body leading-snug flex items-start gap-2">
                              <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <Link 
                      to={service.link}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 mt-auto"
                    >
                      <span>{service.linkText} →</span>
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
