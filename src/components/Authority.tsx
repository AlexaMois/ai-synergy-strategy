import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";

const Authority = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.4);
  const achievements = [
    "Спикер AI Summit Russia",
    "Forbes: 'ИИ без иллюзий'",
    "YouTube канал",
    "Подкаст про ИИ",
  ];

  return (
    <section ref={ref} className="relative py-16 bg-secondary overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className="absolute top-1/2 right-20 w-56 opacity-20 pointer-events-none transition-transform duration-100 ease-out"
        style={{ 
          transform: `translateY(${-parallaxOffset * 0.3}px) rotate(-50deg)`,
          filter: 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.06))'
        }}
      />
      <div className="container mx-auto px-4">
        <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h3 className="text-2xl font-bold mb-8 text-text-heading">
            Выступления и публикации
          </h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-base text-text-body">
                {achievement}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authority;
