import alexandraPortrait from "@/assets/alexandra-portrait.jpg";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";

const MyStory = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.3);
  
  return (
    <section id="about" ref={ref} className="relative py-32 bg-secondary overflow-hidden">
      {/* Brush Accent */}
      <img 
        src={brushAccent} 
        alt="" 
        className="absolute bottom-20 right-10 w-[450px] opacity-15 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px) rotate(-30deg)` }}
      />
      <div className="container mx-auto px-4">
        <h2 className={`text-5xl md:text-6xl font-bold mb-24 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          Александра Моисеева
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <img
              src={alexandraPortrait}
              alt="Александра Моисеева"
              className="rounded-lg w-full"
            />
          </div>

          <div className={`space-y-8 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="space-y-6 text-xl">
              <p className="leading-relaxed">
                <span className="font-bold text-2xl">15 лет опыта</span> в цифровой трансформации
              </p>
              <p className="leading-relaxed">
                <span className="font-bold text-2xl">30+ проектов</span> внедрения ИИ
              </p>
              <p className="leading-relaxed">
                <span className="font-bold text-2xl">Член НФИИ</span> — Национальной Федерации ИИ
              </p>
              <p className="leading-relaxed">
                <span className="font-bold text-2xl">Эксперт-практик</span>, а не теоретик
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStory;
