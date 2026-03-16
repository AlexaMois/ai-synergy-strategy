import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { TrendingUp, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Fork = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Левая колонка */}
          <div
            className={`bg-card border border-gray-200/60 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-soft hover-lift-card transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-start gap-2.5 md:gap-3 mb-3 md:mb-4">
              <TrendingUp className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <h3 className="text-base md:text-lg lg:text-xl font-medium text-foreground leading-tight">
                У вас уходит время на то, что должно работать само
              </h3>
            </div>
            <p className="text-sm md:text-base text-foreground mb-3 md:mb-4">
              Ручные отчёты, потери заявок, просроченные договоры, рутина вместо решений. Автоматизируем конкретный процесс — первый результат за 2 недели.
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
              <span className="font-medium text-foreground">Подходит, если:</span> в компании 5–300 человек, есть повторяющиеся задачи и ощущение, что команда тонет в операционке.
            </p>
            <Button asChild className="w-full text-sm md:text-base">
              <Link to="/cases">→ Смотреть кейсы</Link>
            </Button>
          </div>

          {/* Правая колонка */}
          <div
            className={`bg-card border border-gray-200/60 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-soft hover-lift-card transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="flex items-start gap-2.5 md:gap-3 mb-3 md:mb-4">
              <Settings className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <h3 className="text-base md:text-lg lg:text-xl font-medium text-foreground leading-tight">
                Хотите внедрить ИИ, но боитесь потратить деньги впустую
              </h3>
            </div>
            <p className="text-sm md:text-base text-foreground mb-3 md:mb-4">
              Рынок полон интеграторов с КП на 500к+. Мы задаём неудобные вопросы до старта и говорим честно, когда простое решение лучше дорогого.
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
              <span className="font-medium text-foreground">Подходит, если:</span> уже получали КП на 500к+, хотите разобраться — реально ли это стоит таких денег, или нужна независимая оценка.
            </p>
            <Button asChild className="w-full text-sm md:text-base">
              <Link to="/cases">→ Смотреть кейсы</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fork;
