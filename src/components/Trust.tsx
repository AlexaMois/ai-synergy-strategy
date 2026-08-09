import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Trust = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const facts = [
    "360 разборов бизнес-процессов",
    "40 внедрённых проектов",
    "7 городов",
    "10 отраслей",
    "4+ года практики в ИИ",
    "80% клиентов приходят по рекомендации",
    "85% клиентов возвращаются",
    
    "Резидент IT-Парк Казань",
    "Резидент КРИТБИ",
    "Бизнес-Успех 2025",
    "Зампред ИТ-комитета ОПОРЫ России",
  ];

  return (
    <section ref={ref} className="relative py-6 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {facts.map((fact, index) => (
            <div 
              key={index} 
              className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <p className="text-lg font-semibold text-text-heading">{fact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
