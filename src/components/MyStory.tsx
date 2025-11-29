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
    <section id="about" ref={ref} className="relative py-16 bg-secondary overflow-hidden">
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
        <h2 className={`text-4xl font-bold mb-12 text-center text-text-heading ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          Моя позиция
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <OptimizedImage
              src={alexandraPortrait}
              alt="Александра Моисеева"
              className="rounded-lg w-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className={`space-y-5 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <p className="text-lg text-text-body leading-relaxed">
              ИИ — инструмент, а не повод "повесить" на бизнес лишние расходы.<br />
              Любой проект должен давать эффект, а не создавать видимость инноваций.<br />
              Если ИИ не нужен — я честно скажу об этом сразу.<br />
              Диагностика — фильтр, без которого нельзя начинать.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStory;
