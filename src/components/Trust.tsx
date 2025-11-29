import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import { useCountUp } from "@/hooks/use-count-up";
import brushAccent from "@/assets/brush-accent-1.png";

const Trust = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const parallaxOffset = useParallax(0.4);
  const roiMin = useCountUp({ end: 200, duration: 2000, isVisible });
  const roiMax = useCountUp({ end: 400, duration: 2000, isVisible });
  
  const facts = [
    "36+ проектов",
    "350+ консультаций",
    `ROI клиентов ${roiMin}–${roiMax}%`,
    "Член НФИИ",
    "Резидент IT-Парк Казань",
    "Резидент КРИТБИ",
    "Бизнес-Успех 2025",
    "Зампред ИТ-комитета ОПОРЫ России",
  ];

  return (
    <section ref={ref} className="relative py-6 bg-secondary overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className={`absolute top-1/2 left-1/4 w-[350px] opacity-10 pointer-events-none transition-all duration-600 ease-out ${isVisible ? 'animate-fade-slide-up' : 'opacity-0'}`}
        style={{ 
          transform: `translateY(${-parallaxOffset * 0.6}px) rotate(60deg)`,
          animationDelay: '0.1s'
        }}
      />
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
