import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Trust = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const facts = [
    "Член НФИИ",
    "ROI 200-400%",
    "IT-Парк Казань",
    "Бизнес-Успех 2024",
  ];

  return (
    <section ref={ref} className="py-8 bg-secondary">
      <div className="container mx-auto px-4">
        <div className={`flex flex-wrap justify-center gap-8 md:gap-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {facts.map((fact, index) => (
            <div key={index} className="text-center">
              <p className="text-lg md:text-xl font-bold text-foreground">{fact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
