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
          {/* Левая колонка - Продажи */}
          <div
            className={`bg-card border border-gray-200/60 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-soft hover-lift-card transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-start gap-2.5 md:gap-3 mb-3 md:mb-4">
              <TrendingUp className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <h3 className="text-base md:text-lg lg:text-xl font-medium text-foreground leading-tight">
                ИИ для <span className="font-semibold">продаж</span>
              </h3>
            </div>
            <p className="text-sm md:text-base text-foreground mb-4 md:mb-6">
              Заявки 24/7, контроль менеджеров, +30-40% сделок.
            </p>
            <Button asChild className="w-full text-sm md:text-base">
              <Link to="/cases">Смотреть AI-решения для продаж</Link>
            </Button>
          </div>

          {/* Правая колонка - Процессы */}
          <div
            className={`bg-card border border-gray-200/60 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-soft hover-lift-card transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="flex items-start gap-2.5 md:gap-3 mb-3 md:mb-4">
              <Settings className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <h3 className="text-base md:text-lg lg:text-xl font-medium text-foreground leading-tight">
                ИИ для <span className="font-semibold">производства</span>
              </h3>
            </div>
            <p className="text-sm md:text-base text-foreground mb-4 md:mb-6">
              Прогноз спроса, закупки, контроль качества, +300K/мес.
            </p>
            <Button asChild className="w-full text-sm md:text-base">
              <Link to="/cases">Смотреть AI-решения для производства</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fork;
