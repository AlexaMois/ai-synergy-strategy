import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";

const Services = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.4);
  const services = [
    {
      number: "01",
      title: "Аудит и диагностика",
      description:
        "Выявляю процессы, где ИИ даст реальную отдачу. Оцениваю зрелость данных и готовность команды. Формирую дорожную карту внедрения.",
    },
    {
      number: "02",
      title: "Стратегия и архитектура",
      description:
        "Проектирую архитектуру ИИ-решений под задачи бизнеса. Выбираю технологии и поставщиков. Закладываю основу для масштабирования.",
    },
    {
      number: "03",
      title: "Консалтинг и сопровождение",
      description:
        "Обучаю команду работе с ИИ. Сопровождаю пилоты и запуски. Помогаю избежать ошибок и достичь целевых метрик.",
    },
  ];

  return (
    <section id="services" ref={ref} className="relative py-16 bg-background overflow-hidden">
      {/* Brush Accent */}
      <img 
        src={brushAccent} 
        alt="" 
        className="absolute top-20 left-10 w-[500px] opacity-15 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallaxOffset * 0.8}px) rotate(12deg)` }}
      />
      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-12 text-center">
            Мои направления работы
          </h2>

          <div className="space-y-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-[100px_1fr] gap-6 items-start pb-12 border-b border-border last:border-0 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-6xl font-bold text-accent/20">
                  {service.number}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
