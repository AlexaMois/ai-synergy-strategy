import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import nPattern from "@/assets/n-pattern.png";
import brushAccent from "@/assets/brush-accent-1.png";

const WhyItWorks = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.25);

  return (
    <section ref={ref} className="relative py-10 md:py-16 lg:py-20 overflow-hidden" style={{
      background: 'linear-gradient(180deg, #F8FCFD 0%, #FAFBFC 100%)'
    }}>
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
        <div className="max-w-5xl mx-auto py-16">
          <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold mb-6 text-text-heading">
              Почему мне доверяют
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              className={`p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ 
                background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)',
                animationDelay: '0.1s'
              }}
            >
              <p className="text-base text-text-body leading-[1.7] text-center">
                12+ лет в управлении, финансах и технологиях
              </p>
            </div>
            
            <div 
              className={`p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ 
                background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)',
                animationDelay: '0.15s'
              }}
            >
              <p className="text-base text-text-body leading-[1.7] text-center">
                Победитель Национальной премии "Бизнес-Успех", 2025
              </p>
            </div>
            
            <div 
              className={`p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ 
                background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)',
                animationDelay: '0.2s'
              }}
            >
              <p className="text-base text-text-body leading-[1.7] text-center">
                Член Национального фонда искусственного интеллекта
              </p>
            </div>
            
            <div 
              className={`p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ 
                background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)',
                animationDelay: '0.25s'
              }}
            >
              <p className="text-base text-text-body leading-[1.7] text-center">
                Резидент IT-Парк Казань и КРИТБИ
              </p>
            </div>
            
            <div 
              className={`p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ 
                background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)',
                animationDelay: '0.3s'
              }}
            >
              <p className="text-base text-text-body leading-[1.7] text-center">
                Сопровождаю проекты до результата — без иллюзий, без хаоса, без "магии ИИ"
              </p>
            </div>
            
            <div 
              className={`p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ 
                background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)',
                animationDelay: '0.35s'
              }}
            >
              <p className="text-base text-text-body leading-[1.7] text-center">
                ПРИДУМАТЬ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;
