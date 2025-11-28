import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";

const Trust = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const parallaxOffset = useParallax(0.4);
  const facts = [
    "Член НФИИ",
    "ROI 200-400%",
    "IT-Парк Казань",
    "Бизнес-Успех 2024",
  ];

  return (
    <section ref={ref} className="relative py-6 bg-secondary overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className="absolute top-1/2 left-1/4 w-[350px] opacity-10 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallaxOffset * 0.6}px) rotate(60deg)` }}
      />
      <div className="container mx-auto px-4">
        <div className={`flex flex-wrap justify-center gap-8 md:gap-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {facts.map((fact, index) => (
            <div key={index} className="text-center">
              <p className="text-lg md:text-xl font-bold text-text-heading">{fact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
