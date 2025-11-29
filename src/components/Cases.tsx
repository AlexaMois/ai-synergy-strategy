import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "./ui/button";
import { Building2, Mic, Truck } from "lucide-react";

const Cases = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

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
      mainMetric: "ROI 278%",
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
      mainMetric: "×5 скорость",
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
      mainMetric: "окупаемость 3 недели",
      bgColor: "#F0F9FB"
    }
  ];

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Title */}
        <h2 className="text-[42px] font-semibold text-text-heading text-center mb-12">
          Реальные кейсы
        </h2>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cases.map((caseItem, index) => {
            const Icon = caseItem.icon;
            return (
              <div
                key={index}
                className={`p-8 rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 flex flex-col ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{
                  backgroundColor: caseItem.bgColor,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Icon and Company */}
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #49BED8 0%, #B8A6E0 100%)',
                      boxShadow: '0 8px 24px rgba(73, 190, 216, 0.3), 0 0 20px rgba(184, 166, 224, 0.2)'
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-heading leading-tight pt-2">
                    {caseItem.company}
                  </h3>
                </div>

                {/* Task */}
                <p className="text-base text-text-body mb-4">
                  {caseItem.task}
                </p>

                {/* Divider */}
                <div className="h-px bg-gray-200 my-4"></div>

                {/* Solutions */}
                <div className="mb-4">
                  <p className="text-base font-medium text-text-body mb-2">Решение:</p>
                  <ul className="space-y-1.5">
                    {caseItem.solutions.map((solution, idx) => (
                      <li key={idx} className="text-[15px] text-text-secondary leading-relaxed flex">
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
                  <p className="text-base font-medium text-text-body mb-2">Результаты:</p>
                  <ul className="space-y-1.5">
                    {caseItem.results.map((result, idx) => (
                      <li key={idx} className="text-[15px] text-text-secondary leading-relaxed">
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
                    {caseItem.mainMetric}
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
          >
            Посмотреть все кейсы
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cases;
