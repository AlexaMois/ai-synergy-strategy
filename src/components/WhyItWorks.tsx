import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const WhyItWorks = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const principles = [
    {
      title: "Фокус на ROI",
      description:
        "Внедряю только решения с измеримой отдачей. Если ИИ не окупается — не внедряю.",
    },
    {
      title: "Системность",
      description:
        "Учитываю данные, процессы, людей и инфраструктуру. ИИ — часть системы, а не изолированный инструмент.",
    },
    {
      title: "Люди первичны",
      description:
        "ИИ усиливает команду, а не заменяет её. Обучаю людей работать с новыми технологиями.",
    },
    {
      title: "Этика и прозрачность",
      description:
        "Объясняю решения ИИ понятным языком. Закладываю этические принципы в архитектуру.",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Почему у меня получается
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Использую авторский AI Synergy Framework — метод, который объединяет 
            бизнес-цели, технологии и людей
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {principles.map((principle, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg bg-card border border-border hover:border-accent hover:shadow-lg hover:-translate-y-1 transition-all ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{principle.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="p-8 rounded-lg bg-secondary border-2 border-accent/20">
            <div className="flex items-center justify-center gap-8 text-center">
              <div className="flex-1">
                <p className="font-bold text-lg mb-2">Бизнес</p>
                <p className="text-sm text-muted-foreground">Цели и метрики</p>
              </div>
              <div className="text-accent text-4xl">↔</div>
              <div className="flex-1">
                <p className="font-bold text-lg mb-2">Люди</p>
                <p className="text-sm text-muted-foreground">Навыки и культура</p>
              </div>
              <div className="text-accent text-4xl">↔</div>
              <div className="flex-1">
                <p className="font-bold text-lg mb-2">Технологии</p>
                <p className="text-sm text-muted-foreground">ИИ и инфраструктура</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;
