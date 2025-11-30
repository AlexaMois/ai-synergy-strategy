import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "./ui/button";
import { Building2, Mic, Truck } from "lucide-react";
import CaseCard from "./CaseCard";

const Cases = () => {
  const { ref, isVisible, getStaggeredClass } = useMobileAnimations({ threshold: 0.2 });
  const { ref: counterRef, isVisible: counterVisible } = useIntersectionObserver({ threshold: 0.3 });

  const cases = [
    {
      icon: Building2,
      company: "Крайпотребсоюз (120+ организаций-членов, Краснодарский край)",
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
      company: "GolossOK — Голосовой ассистент для операционных задач",
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
      company: "Грузовой Экспресс — Логистическая компания (15 человек, Красноярск)",
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
          {cases.map((caseItem, index) => (
            <CaseCard
              key={index}
              caseItem={caseItem}
              index={index}
              counterVisible={counterVisible}
              staggerClass={getStaggeredClass(index)}
            />
          ))}
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
