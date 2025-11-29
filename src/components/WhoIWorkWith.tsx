import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";

const WhoIWorkWith = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.35);

  return (
    <section ref={ref} className="relative py-20 bg-background overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className={`absolute bottom-20 left-16 w-[380px] opacity-15 pointer-events-none transition-all duration-600 ease-out ${isVisible ? 'animate-fade-slide-up' : 'opacity-0'}`}
        style={{ 
          transform: `translateY(${-parallaxOffset * 0.6}px) rotate(35deg)`,
          animationDelay: '0.15s'
        }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`section-title text-center leading-tight ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            С кем я работаю, <span className="font-semibold">и с кем — нет</span>
          </h2>
          
          <div className={`space-y-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <p className="text-lg leading-relaxed text-text-body">
              Компании с <span className="font-medium text-accent">20-300 сотрудников</span>, 
              которые хотят <span className="font-medium">реальной эффективности</span>, 
              а не модного слова
            </p>
            
            <div className="pt-8 pb-6">
              <div className="w-24 h-0.5 bg-accent mx-auto"></div>
            </div>
            
            <p className="text-sm text-text-subtle italic">
              Не работаю с фрилансерами и проектами ради хайпа
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIWorkWith;
