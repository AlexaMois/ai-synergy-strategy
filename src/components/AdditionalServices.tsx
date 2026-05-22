import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Compass, Map, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatCards = [
  {
    icon: Compass,
    title: "Нужен первый шаг",
    description: "Подходит стратегическая встреча по цифровизации для собственника. Формат помогает быстро определить текущую точку А и первый управленческий шаг."
  },
  {
    icon: Map,
    title: "Нужен план на 90 дней",
    description: "Подходит разработка стратегии цифрового развития бизнеса. Формат помогает собрать приоритеты, этапы и последовательность действий."
  },
  {
    icon: FileText,
    title: "Нужен подробный разбор компании",
    description: "Подходит глубокий аудит компании для цифровизации. Формат помогает разобрать процессы, данные, документы, инструменты и готовность к внедрению."
  }
];

const AdditionalServices = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 
            className={`section-title text-center leading-tight mb-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            Как <span className="font-semibold">выбрать формат</span>
          </h2>
          <div className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {formatCards.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl bg-card border border-border ring-1 ring-border/30 shadow-card hover:shadow-elevated hover:-translate-y-2 transition-all duration-300 ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.2 + index * 0.08}s` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shadow-xs group-hover:shadow-soft flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div 
            className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.6s' }}
          >
            <Button size="lg" onClick={() => navigate('/start')}>
              Подобрать формат работы →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;
