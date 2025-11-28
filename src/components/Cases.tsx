import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Cases = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
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
    <section id="cases" ref={ref} className="py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-bold mb-24 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Кейсы
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {cases.map((caseItem, index) => (
              <div
                key={index}
                className={`space-y-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{caseItem.title}</h3>
                  <div className="flex flex-col gap-1">
                    <p className="text-3xl font-bold text-accent">{caseItem.result}</p>
                    <p className="text-xl font-semibold text-muted-foreground">{caseItem.roi}</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
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
