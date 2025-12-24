import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { TrendingUp, Settings } from "lucide-react";

const Fork = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-gradient-to-b from-gray-100 to-gray-50 section-gradient-bottom-bg">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Левая колонка - Продажи */}
          <div
            className={`bg-card border border-gray-200/60 rounded-2xl p-6 md:p-8 shadow-soft hover-lift-card ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-primary" strokeWidth={1.5} />
              <h3 className="text-xl md:text-2xl font-medium text-foreground">
                Увеличиваем продажи и не теряем клиентов
              </h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Автоматизация воронки продаж, обработки заявок и работы с клиентами
            </p>
            <Button variant="outline" className="w-full md:w-auto">
              Смотреть все решения для продаж
            </Button>
          </div>

          {/* Правая колонка - Процессы */}
          <div
            className={`bg-card border border-gray-200/60 rounded-2xl p-6 md:p-8 shadow-soft hover-lift-card ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-8 h-8 text-primary" strokeWidth={1.5} />
              <h3 className="text-xl md:text-2xl font-medium text-foreground">
                Наводим порядок в процессах
              </h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Оптимизация внутренних процессов, документооборота и коммуникаций
            </p>
            <Button variant="outline" className="w-full md:w-auto">
              Смотреть все решения для процессов
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fork;
