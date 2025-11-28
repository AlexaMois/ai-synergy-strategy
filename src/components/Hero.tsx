import { Button } from "@/components/ui/button";
import alexandraPortrait from "@/assets/alexandra-portrait.jpg";
import nPattern from "@/assets/n-pattern.png";
import brushAccent from "@/assets/brush-accent-2.png";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";

const Hero = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.3);

  return (
    <section ref={ref} className="relative bg-background pt-32 pb-20 overflow-hidden">
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
      <img 
        src={brushAccent} 
        alt="" 
        className="absolute top-1/4 right-1/4 w-64 opacity-20 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallaxOffset}px) rotate(-15deg)` }}
      />
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className={`space-y-10 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-bold tracking-wider uppercase text-accent">
                  для руководителей и владельцев бизнеса
                </span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
                <span className="text-foreground">ИИ</span>
                <br />
                <span className="text-muted-foreground">БЕЗ ХАОСА</span>
                <br />
                <span className="text-accent">И ИЛЛЮЗИЙ</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
              Диагностирую, проектирую и внедряю искусственный интеллект. 
              <span className="block mt-4 text-2xl md:text-3xl font-iriska text-accent">
                Честно. Понятно. Результативно.
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-16 px-8 text-lg bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                Узнать, что автоматизировать
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-8 text-lg border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold"
              >
                Скачать чек-лист
              </Button>
            </div>
          </div>
          
          <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <img 
              src={alexandraPortrait} 
              alt="Александра Моисеева - AI консультант" 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;