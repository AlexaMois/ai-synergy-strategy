import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const WhoIWorkWith = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-bold mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            С кем я работаю
          </h2>
          
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <p className="text-2xl md:text-3xl leading-relaxed">
              Компании с <span className="font-bold text-accent">20-300 сотрудников</span>, 
              которые хотят <span className="font-bold">реальной эффективности</span>, 
              а не модного слова
            </p>
            
            <div className="pt-12 pb-8">
              <div className="w-32 h-1 bg-accent mx-auto"></div>
            </div>
            
            <p className="text-xl text-muted-foreground italic">
              Не работаю с фрилансерами и проектами ради хайпа
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIWorkWith;
