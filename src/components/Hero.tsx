import { Button } from "@/components/ui/button";
import alexandraPortrait from "@/assets/alexandra-portrait.jpg";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
const Hero = () => {
  const {
    ref,
    isVisible
  } = useIntersectionObserver({
    threshold: 0.2
  });
  return <section ref={ref} className="relative bg-background overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 relative z-10 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative">
              <div className="absolute -left-4 top-0 w-2 h-24 bg-accent" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Помогаю компаниям внедрять искусственный интеллект{" "}
                <span className="text-accent">без хаоса и иллюзий</span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Провожу диагностику, проектирую архитектуру решений и сопровождаю 
              внедрение до результата. Честно. Понятно. Результативно.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-golos font-semibold">
                Узнать, что можно автоматизировать
              </Button>
              <Button size="lg" variant="outline" className="border-accent text-foreground hover:bg-accent/10 font-golos font-semibold">
                Скачать чек-лист
              </Button>
            </div>
          </div>
          
          <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="absolute -top-8 -right-8 w-72 h-72 border-2 border-accent/20 rounded-lg" />
            
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;