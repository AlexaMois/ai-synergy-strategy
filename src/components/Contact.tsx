import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";

const Contact = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.35);
  
  return (
    <section id="contact" ref={ref} className="relative py-16 bg-background overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className="absolute top-1/2 right-10 w-72 opacity-25 pointer-events-none transition-transform duration-100 ease-out"
        style={{ 
          transform: `translateY(${-parallaxOffset * 0.3}px) rotate(-12deg)`,
          filter: 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.06))'
        }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-8 text-text-heading ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Начните с диагностики
          </h2>
          
          <p className={`text-xl md:text-2xl text-text-body mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            Узнайте, что можно автоматизировать<br />уже сегодня
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <Button size="lg" className="h-12 px-8 text-base bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              Запросить диагностику
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-12 px-8 text-base border-2 border-text-heading text-text-heading hover:bg-text-heading hover:text-background font-bold"
            >
              Написать в Telegram
            </Button>
          </div>

          <div className={`mt-12 pt-12 border-t border-border ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="grid md:grid-cols-3 gap-6 text-base text-text-body">
              <div>
                <p className="font-bold text-text-heading mb-2">Email</p>
                <p>hello@neuro-solutions.ru</p>
              </div>
              <div>
                <p className="font-bold text-text-heading mb-2">Телефон</p>
                <p>+7 (912) 345-67-89</p>
              </div>
              <div>
                <p className="font-bold text-text-heading mb-2">Telegram</p>
                <p>@alexmoiseeva</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
