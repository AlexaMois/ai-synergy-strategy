import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";

const AdditionalServices = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const additionalServices = [
    "ИИ-ассистенты под конкретные роли — для менеджеров, операционистов, аналитиков, бухгалтеров",
    "Low-code автоматизация на Бипиум — готовые решения за 2–3 недели, полностью под требования РФ, без облачных сервисов",
    "Обучение команды работе с ИИ — регулярные сессии, документация, чек-листы, встроенные в ваши процессы",
    "MVP-решения для пилотов — проверить гипотезу перед полноценным внедрением, риск-менеджмент",
    "Защищённые контуры под требования ЦБ и РФ — для критичных данных, все хранится в РФ, соответствие импортозамещению"
  ];

  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 
            className={`section-title text-center leading-tight mb-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            Дополнительные решения
          </h2>
          <p 
            className={`text-base sm:text-lg text-foreground text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            Если основные три услуги не полностью закрывают вашу задачу:
          </p>

          <div className="space-y-4 mb-12">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-shadow duration-200 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.2 + index * 0.05}s` }}
              >
                <p className="text-base text-foreground leading-relaxed">
                  {service}
                </p>
              </div>
            ))}
          </div>

          <div 
            className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.5s' }}
          >
            <Button size="lg" asChild>
              <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                Обсудить вашу задачу →
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;
