import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useCountUp } from "@/hooks/use-count-up";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "./ui/button";
import { Building2, Mic, Truck } from "lucide-react";

const Cases = () => {
  const { ref, isVisible, getStaggeredClass } = useMobileAnimations({ threshold: 0.2 });
  const { ref: counterRef, isVisible: counterVisible } = useIntersectionObserver({ threshold: 0.3 });

  const cases = [
    {
      icon: Building2,
      company: "Крайпотребсоюз",
      task: "Задача: автоматизация договоров, наведение порядка в процессах.",
      solutions: [
        "аудит",
        "архитектура",
        "обучение",
        "российская платформа"
      ],
      results: [
        "экономия 92% времени",
        "сокращение ФОТ на 80%",
        "ROI 278%"
      ],
      mainMetric: { value: 278, prefix: "ROI ", suffix: "%" },
      bgColor: "#F0F9FB"
    },
    {
      icon: Mic,
      company: "Голосовой ассистент «GolossOK»",
      task: "Задача: голосовой интерфейс для корпоративных задач.",
      solutions: [
        "архитектура",
        "API-интеграции",
        "обучение модели",
        "внедрение"
      ],
      results: [
        "×5 скорость обработки",
        "интеграция в CRM и Telegram"
      ],
      mainMetric: { value: 5, prefix: "×", suffix: " скорость" },
      bgColor: "#F8F3FF"
    },
    {
      icon: Truck,
      company: "Грузовой Экспресс",
      task: "Задача: автоматизация заявок и контроль менеджеров.",
      solutions: [
        "Telegram + Google Sheets + голосовое управление"
      ],
      results: [
        "экономия 3–4 часа в неделю",
        "точность 99%",
        "окупаемость 3 недели"
      ],
      mainMetric: { value: 3, prefix: "окупаемость ", suffix: " недели" },
      bgColor: "#F0F9FB"
    }
  ];

  return (
    <section id="cases" className="py-10 md:py-16 lg:py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Title */}
        <h2 className="section-title text-center leading-tight">
          Реальные кейсы, <span className="font-semibold">подтверждённый результат</span>
        </h2>

        {/* Cases Grid */}
        <div ref={counterRef as any} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cases.map((caseItem, index) => {
            const Icon = caseItem.icon;
            const metricCount = useCountUp({
              end: caseItem.mainMetric.value,
              duration: 1800,
              isVisible: counterVisible,
              prefix: caseItem.mainMetric.prefix,
              suffix: caseItem.mainMetric.suffix
            });
            
            // Animated counters for individual metrics
            const count92 = useCountUp({ end: 92, duration: 1800, isVisible: counterVisible });
            const count80 = useCountUp({ end: 80, duration: 1800, isVisible: counterVisible });
            const count278 = useCountUp({ end: 278, duration: 1800, isVisible: counterVisible });
            const count5 = useCountUp({ end: 5, duration: 1800, isVisible: counterVisible });
            const count99 = useCountUp({ end: 99, duration: 1800, isVisible: counterVisible });
            const count3 = useCountUp({ end: 3, duration: 1800, isVisible: counterVisible });
            
            return (
              <div
                key={index}
                className={`p-4 sm:p-6 rounded-[20px] bg-white shadow-card transition-all duration-300 hover:shadow-hover hover:-translate-y-1 hover:scale-[1.02] hover:bg-primary-light/15 flex flex-col gradient-border gradient-border-hover ${getStaggeredClass(index)}`}
              >
                {/* Icon and Company */}
                <div className="flex items-start gap-4 mb-4">
                  <Icon className="w-9 h-9 flex-shrink-0" style={{ color: '#49BED8' }} strokeWidth={1.5} />
                  <h3 className="text-lg font-medium text-text-heading leading-tight pt-2">
                    {caseItem.company}
                  </h3>
                </div>

                {/* Task */}
                <p className="text-lg text-text-body mb-4 leading-relaxed">
                  {caseItem.task}
                </p>

                {/* Divider */}
                <div className="h-px bg-gray-200 my-4"></div>

                {/* Solutions */}
                <div className="mb-4">
                  <p className="text-handwriting mb-2">Решение:</p>
                  <ul className="space-y-1.5">
                    {caseItem.solutions.map((solution, idx) => (
                      <li key={idx} className="text-lg text-text-secondary leading-relaxed flex">
                        <span className="mr-2">–</span>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 my-4"></div>

                {/* Results */}
                <div className="mb-6">
                  <p className="text-handwriting mb-2">Результаты:</p>
                  <ul className="space-y-1.5">
                    {index === 0 && (
                      <>
                        <li className="text-lg text-text-secondary leading-relaxed">
                          экономия <span className="font-semibold text-primary">{count92}%</span> времени
                        </li>
                        <li className="text-lg text-text-secondary leading-relaxed">
                          сокращение ФОТ на <span className="font-semibold text-primary">{count80}%</span>
                        </li>
                        <li className="text-lg text-text-secondary leading-relaxed">
                          ROI <span className="font-semibold text-primary">{count278}%</span>
                        </li>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <li className="text-lg text-text-secondary leading-relaxed">
                          ×<span className="font-semibold text-primary">{count5}</span> скорость обработки
                        </li>
                        <li className="text-lg text-text-secondary leading-relaxed">
                          интеграция в CRM и Telegram
                        </li>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <li className="text-lg text-text-secondary leading-relaxed">
                          экономия <span className="font-semibold text-primary">{count3}–4</span> часа в неделю
                        </li>
                        <li className="text-lg text-text-secondary leading-relaxed">
                          точность <span className="font-semibold text-primary">{count99}%</span>
                        </li>
                        <li className="text-lg text-text-secondary leading-relaxed">
                          окупаемость <span className="font-semibold text-primary">{count3}</span> недели
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Main Metric - at bottom */}
                <div 
                  className="mt-auto pt-4 border-t-2 border-primary/20"
                >
                  <p className="text-2xl sm:text-3xl font-semibold text-primary text-center">
                    {metricCount}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8"
              asChild
            >
              <a href="/cases">Посмотреть все кейсы</a>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default Cases;
