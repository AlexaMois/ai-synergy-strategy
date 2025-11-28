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
        className="absolute bottom-0 left-0 w-1/2 h-2/3 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url(${nPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '100px',
          filter: 'hue-rotate(20deg) saturate(1.5)',
        }}
      />
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className="absolute bottom-32 right-20 w-60 opacity-30 pointer-events-none transition-transform duration-100 ease-out"
        style={{ 
          transform: `translateY(${parallaxOffset * 0.3}px) rotate(-45deg)`,
          filter: 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.06))'
        }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold mb-6 text-text-heading">
              AI Synergy Framework
            </h2>
            <p className="text-xl text-text-body">
              Авторский метод, который объединяет бизнес-цели, технологии и людей
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-3">ROI</div>
              <p className="text-lg text-text-body">Фокус на измеримой отдаче</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-3">Люди</div>
              <p className="text-lg text-text-body">Команда первична</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-3">Этика</div>
              <p className="text-lg text-text-body">Прозрачность решений</p>
            </div>
          </div>

          <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <blockquote className="text-handwriting">
              "Я заставляю ИИ работать,<br />а не производить впечатление"
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;
