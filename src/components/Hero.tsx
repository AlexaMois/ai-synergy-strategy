import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import alexandraPortrait from "@/assets/alexandra-portrait.jpg";
import nPattern from "@/assets/n-pattern.png";
import brushAccent from "@/assets/brush-accent-1.png";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";

const Hero = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.3);

  return (
    <section ref={ref} className="relative bg-background pt-16 pb-12 overflow-hidden">
      {/* N Pattern Background */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url(${nPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px'
        }}
      />
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className="absolute top-1/4 right-1/4 w-80 opacity-20 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallaxOffset * 0.5}px) rotate(-15deg)` }}
      />
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-sm font-bold tracking-wider uppercase text-accent">
                  для руководителей и владельцев бизнеса
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-foreground">ИИ</span>
                <br />
                <span className="text-muted-foreground">БЕЗ ХАОСА</span>
                <br />
                <span className="text-accent">И ИЛЛЮЗИЙ</span>
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Диагностирую, проектирую и внедряю искусственный интеллект. 
              <span className="block mt-3 text-xl md:text-2xl font-iriska font-bold text-accent">
                Честно. Понятно. Результативно.
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button size="lg" className="h-12 px-6 text-base bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                Узнать, что автоматизировать
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 px-6 text-base border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold"
              >
                Скачать чек-лист
              </Button>
            </div>
          </div>
          
          <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <OptimizedImage 
              src={alexandraPortrait} 
              alt="Александра Моисеева - AI консультант" 
              className="rounded-lg w-full h-auto object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;