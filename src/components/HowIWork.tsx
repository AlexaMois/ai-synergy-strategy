import OptimizedImage from "@/components/OptimizedImage";
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
    <section id="how" ref={ref} className="relative py-16 bg-secondary overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className="absolute top-32 right-16 w-[420px] opacity-15 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px) rotate(-20deg)` }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center text-text-heading ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Как начать работу
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-accent flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-text-heading">{step.title}</h3>
                <p className="text-base text-text-body">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="h-12 px-6 text-base bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              Начать сейчас
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
