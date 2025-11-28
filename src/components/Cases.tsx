import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";

const Cases = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.25);
  const cases = [
    {
      title: "Крайпотребсоюз",
      result: "–92% времени",
      roi: "ROI 278%",
      description:
        "Автоматизация документооборота и аналитики. Сокращение рутинных операций с 8 часов до 40 минут.",
    },
    {
      title: "Голосовой ассистент",
      result: "70% автоматизация",
      roi: "ROI 340%",
      description:
        "Разработка голосового помощника для службы поддержки. Обработка без участия оператора.",
    },
    {
      title: "Грузовой экспресс",
      result: "–35% простоев",
      roi: "ROI 215%",
      description:
        "Внедрение ИИ для прогнозирования маршрутов. Снижение простоев и экономия топлива на 18%.",
    },
  ];

  return (
    <section id="cases" ref={ref} className="relative py-16 bg-secondary overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className="absolute top-40 left-12 w-72 opacity-25 pointer-events-none transition-transform duration-100 ease-out"
        style={{ 
          transform: `translateY(${parallaxOffset * 0.3}px) rotate(15deg)`,
          filter: 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.06))'
        }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center text-text-heading ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Кейсы
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((caseItem, index) => (
              <div
                key={index}
                className={`space-y-4 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-heading">{caseItem.title}</h3>
                  <div className="flex flex-col gap-1">
                    <p className="text-2xl font-bold text-accent">{caseItem.result}</p>
                    <p className="text-lg font-semibold text-text-subtle">{caseItem.roi}</p>
                  </div>
                </div>
                <p className="text-base text-text-body leading-relaxed">
                  {caseItem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cases;
