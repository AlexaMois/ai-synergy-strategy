import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import nPattern from "@/assets/n-pattern.png";
import brushAccent from "@/assets/brush-accent-1.png";

const WhyItWorks = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.25);

  return (
    <section ref={ref} className="relative py-16 bg-background overflow-hidden">
      {/* N Pattern Background */}
      <div 
        className="absolute bottom-0 left-0 w-1/2 h-2/3 opacity-[0.02] pointer-events-none transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `url(${nPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '100px',
          transform: `translateY(${parallaxOffset * 0.08}px)`
        }}
      />
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className={`absolute bottom-32 right-20 w-96 opacity-20 pointer-events-none transition-all duration-600 ease-out ${isVisible ? 'animate-fade-slide-up' : 'opacity-0'}`}
        style={{ 
          transform: `translateY(${parallaxOffset * 0.6}px) rotate(-45deg)`,
          animationDelay: '0.25s'
        }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold mb-8 text-text-heading">
              Почему мне доверяют
            </h2>
            <p className="text-lg text-text-body leading-relaxed max-w-2xl mx-auto">
              12+ лет в управлении, финансах и технологиях.<br />
              Победитель Национальной премии "Бизнес-Успех", 2025.<br />
              Член Национального фонда искусственного интеллекта.<br />
              Резидент IT-Парк Казань и КРИТБИ.<br />
              Сопровождаю проекты до результата — без иллюзий, без хаоса, без "магии ИИ".
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;
