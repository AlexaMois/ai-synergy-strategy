import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useCountUp } from "@/hooks/use-count-up";
import { Button } from "./ui/button";
import { Building2, Mic, Truck } from "lucide-react";

const Cases = () => {
  const { ref, isVisible, getStaggeredClass } = useMobileAnimations({ threshold: 0.2 });

  const cases = [
    {
      icon: Building2,
      company: "Крайпотребсоюз (Красноярск)",
      task: "Задача: автоматизация договоров, внедрение ИИ.",
      solutions: [
        "проведён полный аудит и выдано заключение",
        "создана архитектура",
        "выбрана единая российская платформа",
        "корпоративное обучение + обучение каждого сотрудника",
        "автоматизированы юридический и финансово-экономический отделы"
      ],
      results: [
        "92% времени сэкономлено",
        "–80% ФОТ",
        "ROI 278%"
      ],
      mainMetric: { value: 278, prefix: "ROI ", suffix: "%" },
      bgColor: "#F0F9FB"
    },
    {
      icon: Mic,
      company: "Голосовой ассистент «GolossOK»",
      task: "Задача: голосовой интерфейс для корпоративных систем и задач.",
      solutions: [
        "архитектура голосового интерфейса",
        "API интеграции",
        "обучение модели",
        "внедрение в рабочие процессы"
      ],
      results: [
        "×5 скорость обработки",
        "Интеграция в CRM и Telegram",
        "Экономия времени маркетинга и SMM"
      ],
      mainMetric: { value: 5, prefix: "×", suffix: " скорость" },
      bgColor: "#F8F3FF"
    },
    {
      icon: Truck,
      company: "Грузовой Экспресс",
      task: "Задача: автоматизация поступления заявок, контроль менеджеров, быстрые отчёты.",
      solutions: [
        "Telegram",
        "Google Sheets",
        "голосовое управление",
        "полностью уложились в бюджет клиента"
      ],
      results: [
        "–3–4 часа работы менеджеров в неделю",
        "99% точность",
        "Окупаемость — 3 недели"
      ],
      mainMetric: { value: 3, prefix: "окупаемость ", suffix: " недели" },
      bgColor: "#F0F9FB"
    }
  ];

  return (
    <section id="cases" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Title */}
        <h2 className="section-title text-center leading-tight">
          Реальные кейсы, <span className="font-semibold">подтверждённый результат</span>
        </h2>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cases.map((caseItem, index) => {
            const Icon = caseItem.icon;
            const metricCount = useCountUp({
              end: caseItem.mainMetric.value,
              duration: 1800,
              isVisible,
              prefix: caseItem.mainMetric.prefix,
              suffix: caseItem.mainMetric.suffix
            });
            
            return (
              <div
                key={index}
                className={`p-6 rounded-[20px] bg-white shadow-card transition-all duration-300 hover:shadow-hover hover:-translate-y-1 hover:scale-[1.02] hover:bg-primary-light/15 flex flex-col gradient-border gradient-border-hover ${getStaggeredClass(index)}`}
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
                    {caseItem.results.map((result, idx) => (
                      <li key={idx} className="text-lg text-text-secondary leading-relaxed">
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Main Metric - at bottom */}
                <div 
                  className="mt-auto pt-4 border-t-2 border-primary/20"
                >
                  <p className="text-3xl font-semibold text-primary text-center">
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
