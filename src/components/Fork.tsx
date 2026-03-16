import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Fork = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const cards = [
    {
      icon: Zap,
      title: "У вас уходит время на то, что должно работать само",
      description:
        "Ручные отчёты, потери заявок, просроченные договоры, рутина вместо решений. Автоматизируем конкретный процесс — первый результат за 2 недели.",
      fit: "в компании 5–300 человек, есть повторяющиеся задачи и ощущение, что команда тонет в операционке.",
      delay: "0ms",
    },
    {
      icon: Shield,
      title: "Хотите внедрить ИИ, но боитесь потратить деньги впустую",
      description:
        "Рынок полон интеграторов с КП на 500к+. Мы задаём неудобные вопросы до старта и говорим честно, когда простое решение лучше дорогого.",
      fit: "уже получали КП на 500к+, хотите разобраться — реально ли это стоит таких денег, или нужна независимая оценка.",
      delay: "150ms",
    },
  ];

  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`group relative bg-card rounded-2xl md:rounded-3xl overflow-hidden shadow-soft hover-lift-card transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: card.delay }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-5 md:p-7 lg:p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                    <Icon
                      className="w-5 h-5 md:w-7 md:h-7 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground leading-snug mb-3 md:mb-4">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-5">
                    {card.description}
                  </p>

                  {/* Fit box */}
                  <div className="bg-secondary/80 rounded-xl p-3 md:p-4 mb-5 md:mb-6 border border-border/50">
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">
                        Подходит, если:
                      </span>{" "}
                      {card.fit}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Button asChild className="w-full text-sm md:text-base">
                      <Link to="/cases">→ Смотреть кейсы</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Fork;
