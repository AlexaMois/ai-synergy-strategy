import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowRight } from "lucide-react";

const Foundation = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const steps = [
    {
      number: "01",
      title: "Диагностика",
      description: "Анализ процессов и выявление точек роста"
    },
    {
      number: "02",
      title: "Архитектура",
      description: "Проектирование решения под задачи бизнеса"
    },
    {
      number: "03",
      title: "Сопровождение",
      description: "Внедрение и контроль результата"
    }
  ];

  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h2 
          className={`text-2xl md:text-3xl font-medium text-foreground mb-10 md:mb-14 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Фундамент, <span className="font-semibold">три этапа работы</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center gap-4 md:gap-6">
              <div
                className={`bg-[hsl(var(--gray-50))] rounded-2xl p-6 shadow-card hover:shadow-hover gradient-border transition-all duration-500 w-full md:w-[280px] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <span className="text-primary text-sm font-medium mb-2 block">
                  {step.number}
                </span>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <ArrowRight 
                  className="hidden md:block text-primary w-6 h-6 flex-shrink-0" 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Foundation;
