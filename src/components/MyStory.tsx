import alexandraPortrait from "@/assets/alexandra-portrait.jpg";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const MyStory = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  
  return (
    <section ref={ref} className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Моя история</h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-lg">
                  <span className="font-bold">15 лет опыта</span> в цифровой трансформации 
                  и управлении проектами
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-lg">
                  <span className="font-bold">30+ успешных проектов</span> внедрения ИИ 
                  в различных отраслях
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-lg">
                  <span className="font-bold">Член НФИИ</span> — Национальной Федерации 
                  Искусственного Интеллекта
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-lg">
                  <span className="font-bold">Эксперт-практик</span>, а не теоретик — 
                  каждое решение проверено на реальном бизнесе
                </p>
              </div>
            </div>

            <div className="p-6 bg-background rounded-lg border-l-4 border-accent mt-8">
              <p className="text-xl italic text-muted-foreground">
                "Я заставляю ИИ работать, а не производить впечатление."
              </p>
            </div>
          </div>

          <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-accent/30 rounded-lg" />
            <img
              src={alexandraPortrait}
              alt="Александра Моисеева"
              className="relative z-10 rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStory;
