import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCountUp } from "@/hooks/use-count-up";
import { Building2, Mic, Truck, Store, Hospital, GraduationCap } from "lucide-react";

const CasesPage = () => {
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
    },
    {
      icon: Store,
      company: "Сеть розничных магазинов",
      task: "Задача: автоматизация учета товаров и прогнозирование спроса.",
      solutions: [
        "внедрение системы учета с ИИ",
        "прогнозирование продаж на основе исторических данных",
        "интеграция с 1С",
        "обучение персонала"
      ],
      results: [
        "–40% излишков товара",
        "+25% точность прогнозов",
        "ROI 215%"
      ],
      mainMetric: { value: 215, prefix: "ROI ", suffix: "%" },
      bgColor: "#E8E0F5"
    },
    {
      icon: Hospital,
      company: "Медицинская клиника",
      task: "Задача: автоматизация записи пациентов и обработки медицинской документации.",
      solutions: [
        "голосовой бот для записи",
        "автоматическая обработка медкарт",
        "интеграция с медицинской системой",
        "GDPR-совместимость"
      ],
      results: [
        "–60% времени администраторов",
        "98% точность распознавания",
        "Окупаемость — 2 месяца"
      ],
      mainMetric: { value: 60, prefix: "–", suffix: "% времени" },
      bgColor: "#DFF0F0"
    },
    {
      icon: GraduationCap,
      company: "Образовательная платформа",
      task: "Задача: персонализация обучения и автоматизация проверки заданий.",
      solutions: [
        "ИИ-ассистент для студентов",
        "автоматическая проверка эссе и кода",
        "персональные рекомендации курсов",
        "аналитика прогресса"
      ],
      results: [
        "+45% завершаемость курсов",
        "–70% времени на проверку",
        "×3 вовлеченность студентов"
      ],
      mainMetric: { value: 45, prefix: "+", suffix: "% завершений" },
      bgColor: "#F8F3FF"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-heading mb-6">
            Реальные кейсы внедрения ИИ
          </h1>
          <p className="text-xl text-text-body max-w-3xl mx-auto">
            Конкретные проекты с измеримыми результатами. Без приукрашивания, 
            только факты, цифры и реальный ROI.
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section ref={ref} className="py-16 bg-[#FAFBFC]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className={`p-8 rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 flex flex-col ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{
                    backgroundColor: caseItem.bgColor,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: 'rgba(73, 190, 216, 0.15)'
                      }}
                    >
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] font-semibold text-[#222222] leading-tight">
                        {caseItem.company}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[15px] text-[#444444] mb-4 italic">
                    {caseItem.task}
                  </p>

                  <div className="mb-4">
                    <p className="text-[14px] font-semibold text-[#222222] mb-2">Решение:</p>
                    <ul className="space-y-1.5">
                      {caseItem.solutions.map((solution, idx) => (
                        <li key={idx} className="text-[14px] text-[#444444] flex items-start">
                          <span className="mr-2 text-accent">•</span>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4 border-t-2 border-[#222222]/10">
                    <p className="text-[14px] font-semibold text-[#222222] mb-2">Результат:</p>
                    <ul className="space-y-1.5 mb-4">
                      {caseItem.results.map((result, idx) => (
                        <li key={idx} className="text-[14px] text-[#444444] flex items-start">
                          <span className="mr-2 text-accent font-bold">→</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="text-center py-3 bg-white/40 rounded-xl">
                      <p className="text-[24px] font-bold text-accent">
                        {metricCount}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default CasesPage;