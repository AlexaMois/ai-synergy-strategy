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
      company: "🏢 Крайпотребсоюз (120+ организаций-членов, Краснодарский край)",
      about: "Краснодарский краевой союз потребительских кооперативов — региональное объединение, управляющее сетью товарных кооперативов. Штат: ~50 человек, множество филиалов, тысячи договоров в год.",
      problems: [
        "600+ часов в месяц на оформление и обработку договоров вручную",
        "8 сотрудников только на эту работу",
        "Бесконечные ошибки и задержки в согласовании",
        "Невозможно масштабировать"
      ],
      solution: {
        budget: "~25 тыс. ₽",
        steps: [
          "Аудит: выявили 6 узких мест в процессе",
          "Выбрали Bpium (российскую платформу бизнес-процессов)",
          "Спроектировали workflow: загрузка договора → проверка → согласование → архив",
          "Обучили команду за 2 дня"
        ]
      },
      results: {
        period: "за 3 месяца",
        items: [
          "Экономия 92% времени на обработку (~550 часов/месяц)",
          "Сокращение ФОТ на эту операцию на 80%",
          "ROI 278% (окупилось за 3 недели)",
          "Нулевые ошибки в обработке"
        ]
      },
      mainMetric: { value: 278, prefix: "ROI ", suffix: "%" },
      bgColor: "#F0F9FB"
    },
    {
      icon: Mic,
      company: "🎤 GolossOK — Голосовой ассистент для операционных задач",
      about: "Собственный AI-продукт Александры для компаний, которым нужна голосовая автоматизация операций (создание заявок, управление статусами, отчёты голосом).",
      client: "Компания с 30–100 сотрудниками, много операционной работы (call-центры, логистика, HR, управление проектами).",
      features: [
        "Создание заявок голосом (\"Александра, создай заявку на поездку в Москву\")",
        "Голосовой запрос статуса (\"Где находится заказ #123?\")",
        "Автоматический разнос информации в CRM и Telegram",
        "Интеграция с Google Sheets для учёта",
        "Работает с русским и английским"
      ],
      results: {
        period: "для клиентов",
        items: [
          "×5 скорость обработки заявок (вместо 3 минут — 30 сек)",
          "Интеграция в CRM (Bitrix, Яндекс.Маркетплейс) и Telegram",
          "99% точность распознавания",
          "Окупаемость: 4–6 недель (от 30 тыс. до 100 тыс. ₽)"
        ]
      },
      mainMetric: { value: 5, prefix: "×", suffix: " скорость" },
      bgColor: "#F8F3FF"
    },
    {
      icon: Truck,
      company: "🚚 Грузовой Экспресс — Логистическая компания (15 человек, Красноярск)",
      about: "Местная логистическая компания, доставляющая грузы по Красноярску и краю. 10 водителей, 3 диспетчера, 40–60 заявок/день.",
      problems: [
        "Диспетчеры вручную вводили всё в таблицу (2–3 часа/день)",
        "Менеджер проверял работу водителей только по звонкам",
        "Куча ошибок в маршрутах",
        "Нет контроля над качеством обслуживания"
      ],
      solution: {
        budget: "12 тыс. ₽ — САМЫЙ МАЛЕНЬКИЙ!",
        steps: [
          "Telegram-бот для автоматизации:",
          "  - Водитель кидает фото груза и адрес → бот сохраняет в Google Sheets",
          "  - Диспетчер видит всё в реальном времени",
          "  - Голосовые команды (\"создать маршрут\", \"завершить доставку\")",
          "  - SMS-уведомление клиентам о статусе"
        ]
      },
      quote: "Мой самый маленький бюджет, но крутейший результат. Показывает, что не нужно тратить миллионы на ИИ — важна правильная архитектура.",
      results: {
        period: "за месяц",
        items: [
          "Экономия 3–4 часа в неделю (диспетчеры)",
          "99% точность маршрутов (вместо 70%)",
          "Полный контроль менеджера над водителями",
          "Окупаемость: 3 недели (решение живёт уже 8 месяцев)",
          "Клиент захотел расширить: добавить автоматическую выставку счетов"
        ]
      },
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
                <div className="flex items-start gap-3 mb-4">
                  <Icon className="w-8 h-8 flex-shrink-0" style={{ color: '#49BED8' }} strokeWidth={1.5} />
                  <h3 className="text-base sm:text-lg font-semibold text-text-heading leading-tight">
                    {caseItem.company}
                  </h3>
                </div>

                {/* About / Client */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-text-heading mb-1">
                    {caseItem.client ? "💼 Типовой клиент:" : "О клиенте:"}
                  </p>
                  <p className="text-sm text-text-body leading-relaxed">
                    {caseItem.about}
                  </p>
                  {caseItem.client && (
                    <p className="text-sm text-text-body leading-relaxed mt-2">{caseItem.client}</p>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 my-3"></div>

                {/* Problems */}
                {caseItem.problems && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-text-heading mb-2">❌ Проблема:</p>
                    <ul className="space-y-1">
                      {caseItem.problems.map((problem, idx) => (
                        <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Features */}
                {caseItem.features && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-text-heading mb-2">✔️ Возможности:</p>
                    <ul className="space-y-1">
                      {caseItem.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Solution */}
                {caseItem.solution && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-text-heading mb-2">
                      💡 Решение (бюджет {caseItem.solution.budget}):
                    </p>
                    <ul className="space-y-1">
                      {caseItem.solution.steps.map((step, idx) => (
                        <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quote */}
                {caseItem.quote && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-text-heading mb-2">🎯 Особенность этого решения:</p>
                    <p className="text-sm italic text-text-body leading-relaxed">
                      "{caseItem.quote}"
                    </p>
                  </div>
                )}

                {/* Divider */}
                <div className="h-px bg-gray-200 my-3"></div>

                {/* Results */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-text-heading mb-2">
                    📈 Результаты ({caseItem.results.period}):
                  </p>
                  <ul className="space-y-1.5">
                    {caseItem.results.items.map((result, idx) => {
                      // Extract numbers for animation
                      const match92 = result.match(/92%/);
                      const match80 = result.match(/80%/);
                      const match278 = result.match(/278%/);
                      const match5 = result.match(/×5/);
                      const match99 = result.match(/99%/);
                      const match3 = result.match(/3–4/);
                      
                      if (match92) {
                        return (
                          <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                            <span className="text-primary mt-0.5">✅</span>
                            <span>Экономия <span className="font-semibold text-primary">{count92}%</span> времени на обработку (~550 часов/месяц)</span>
                          </li>
                        );
                      }
                      if (match80) {
                        return (
                          <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                            <span className="text-primary mt-0.5">✅</span>
                            <span>Сокращение ФОТ на эту операцию на <span className="font-semibold text-primary">{count80}%</span></span>
                          </li>
                        );
                      }
                      if (match278) {
                        return (
                          <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                            <span className="text-primary mt-0.5">✅</span>
                            <span>ROI <span className="font-semibold text-primary">{count278}%</span> (окупилось за 3 недели)</span>
                          </li>
                        );
                      }
                      if (match5) {
                        return (
                          <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                            <span className="text-primary mt-0.5">✅</span>
                            <span>×<span className="font-semibold text-primary">{count5}</span> скорость обработки заявок (вместо 3 минут — 30 сек)</span>
                          </li>
                        );
                      }
                      if (match99) {
                        return (
                          <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                            <span className="text-primary mt-0.5">✅</span>
                            <span>Точность <span className="font-semibold text-primary">{count99}%</span> {result.includes('маршрутов') ? 'маршрутов (вместо 70%)' : 'распознавания'}</span>
                          </li>
                        );
                      }
                      if (match3) {
                        return (
                          <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                            <span className="text-primary mt-0.5">✅</span>
                            <span>Экономия <span className="font-semibold text-primary">{count3}–4</span> часа в неделю (диспетчеры)</span>
                          </li>
                        );
                      }
                      
                      // Default render without animation
                      return (
                        <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                          <span className="text-primary mt-0.5">✅</span>
                          <span>{result}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Link */}
                <div className="mt-auto">
                  <a 
                    href="/cases" 
                    className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all duration-300"
                  >
                    <span>{caseItem.features ? "Посмотреть как это работает (видео 2 мин)" : "Смотреть детальный разбор этого кейса"} →</span>
                  </a>
                </div>

                {/* Main Metric - at bottom */}
                <div 
                  className="mt-4 pt-3 border-t-2 border-primary/20"
                >
                  <p className="text-xl sm:text-2xl font-semibold text-primary text-center">
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
