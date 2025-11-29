import OptimizedImage from "@/components/OptimizedImage";
import alexandraPortrait from "@/assets/alexandra-portrait.jpg";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import { useCountUp } from "@/hooks/use-count-up";
import brushAccent from "@/assets/brush-accent-1.png";

const MyStory = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.3);
  const yearsCount = useCountUp({ end: 15, duration: 1800, isVisible });
  const projectsCount = useCountUp({ end: 30, duration: 1800, isVisible, suffix: '+' });
  
  return (
    <section id="about" ref={ref} className="relative py-20 overflow-hidden" style={{
      background: 'linear-gradient(180deg, #F6F8FA 0%, #FAFBFC 100%)'
    }}>
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className={`absolute bottom-20 right-10 w-[450px] opacity-15 pointer-events-none transition-all duration-600 ease-out ${isVisible ? 'animate-fade-slide-up' : 'opacity-0'}`}
        style={{ 
          transform: `translateY(${parallaxOffset * 0.5}px) rotate(-30deg)`,
          animationDelay: '0.2s'
        }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto px-12 py-16 md:px-16 md:py-20">
          <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
          <h2 className={`text-4xl font-bold mb-12 text-center text-text-heading ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Моя позиция
          </h2>

          <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="space-y-6 text-center">
              <p className="text-lg text-text-body leading-[1.6]">
                ИИ — инструмент, а не повод "повесить" на бизнес лишние расходы.
              </p>
              <div className="w-16 h-px bg-gray-200 mx-auto"></div>
              <p className="text-lg text-text-body leading-[1.6]">
                Любой проект должен давать эффект, а не создавать видимость инноваций.
              </p>
              <div className="w-16 h-px bg-gray-200 mx-auto"></div>
              <p className="text-lg text-text-body leading-[1.6]">
                Если ИИ не нужен — я честно скажу об этом сразу.
              </p>
              <div className="w-16 h-px bg-gray-200 mx-auto"></div>
              <p className="text-lg text-text-body leading-[1.6]">
                Диагностика — фильтр, без которого нельзя начинать.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStory;
