import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const HowIChoose = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const criteria = [
    {
      number: "01",
      title: "Объём и повторяемость",
      description: "Сколько раз в день/неделю выполняется задача"
    },
    {
      number: "02",
      title: "Стоимость ошибки",
      description: "Насколько критичны последствия неправильного решения"
    },
    {
      number: "03",
      title: "Готовность данных",
      description: "Есть ли структурированная информация для обучения"
    },
    {
      number: "04",
      title: "Срок окупаемости",
      description: "Когда инвестиции начнут приносить результат"
    }
  ];

  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h2 
          className={`text-2xl md:text-3xl font-medium text-foreground mb-10 md:mb-14 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Как я выбираю, <span className="font-semibold">автоматизировать или просто решить?</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {criteria.map((item, index) => (
            <div
              key={item.number}
              className={`bg-[hsl(var(--gray-50))] rounded-2xl p-6 shadow-card hover:shadow-hover gradient-border transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="text-primary text-sm font-medium mb-3 block">
                {item.number}
              </span>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIChoose;
