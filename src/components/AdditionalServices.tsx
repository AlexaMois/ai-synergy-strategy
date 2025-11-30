import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";

const AdditionalServices = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const additionalServices = [
    "ИИ-ассистенты под конкретные роли",
    "MVP-решения для пилотов",
    "Обучение сотрудников работе с ИИ",
    "Инструкции, регламенты и пользовательские сценарии",
    "Проектирование low-code/no-code решений",
    "Построение защищённых контуров под требования РФ"
  ];

  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 
            className={`section-title text-center leading-tight mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            Дополнительные решения
          </h2>
          <p 
            className={`text-lg text-text-body text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            Для отдельных задач или быстрых улучшений
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-[20px] bg-white shadow-card hover:shadow-hover transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/20 gradient-border gradient-border-hover ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.2 + index * 0.05}s` }}
              >
                <p className="text-base text-text-heading leading-relaxed">
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
                Обсудить вашу задачу
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;
