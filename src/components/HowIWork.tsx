import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import { Button } from "@/components/ui/button";
import brushAccent from "@/assets/brush-accent-1.png";

const HowIWork = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.3);
  const steps = [
    {
      number: "1",
      title: "Подайте заявку",
      description: "Заполните форму или свяжитесь со мной напрямую",
    },
    {
      number: "2",
      title: "Диагностика процессов",
      description: "Изучаю ваши процессы, данные и определяю точки роста",
    },
    {
      number: "3",
      title: "Проектирование решения",
      description: "Создаю архитектуру и выбираю инструменты для внедрения",
    },
  ];

  return (
    <section id="how" ref={ref} className="relative py-32 bg-secondary overflow-hidden">
      {/* Brush Accent */}
      <img 
        src={brushAccent} 
        alt="" 
        className="absolute top-32 right-16 w-[420px] opacity-15 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px) rotate(-20deg)` }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-bold mb-24 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Как начать работу
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-24 h-24 mx-auto mb-8 rounded-full border-4 border-accent flex items-center justify-center">
                  <span className="text-4xl font-bold text-accent">{step.number}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-lg text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Button size="lg" className="h-16 px-8 text-lg bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              Начать сейчас
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
