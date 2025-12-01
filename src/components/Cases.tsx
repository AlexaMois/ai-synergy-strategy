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
      company: "Аудит вместо закупки серверов",
      about: "Крайпотребсоюз (Красноярск).",
      situation: "Стоял выбор: закупать дорогие серверы и начинать долгую кастомную разработку.",
      solution: {
        steps: [
          "Мы провели аудит, выявили 8 конкретных точек внедрения и полностью пересмотрели подход.",
          "Вместо тяжёлой разработки — внедрили лёгкие облачные решения и изменили культуру работы."
        ]
      },
      results: {
        period: "",
        items: [
          "Аналитика рынка в отделе розницы ускорилась на 80%",
          "130 договоров аренды и кадровые документы теперь на авто-контроле",
          "Команда перешла на единый цифровой сервис",
          "Экономия более 500 000 ₽ за счёт отказа от серверов и «кастома»"
        ]
      },
      mainMetric: { value: 80, prefix: "", suffix: "%" },
      bgColor: "#F0F9FB"
    },
    {
      icon: Mic,
      company: "Флагманская система «РОБОТНИК»",
      aboutLabel: "Продукт:",
      about: "Модульная система виртуальных сотрудников «РОБОТНИК».",
      situation: "Проект признан инновационным в КРИТБИ.",
      solution: {
        steps: [
          "Модульная система с голосовым управлением для тех, кому некогда печатать: водителей, строителей, линейного персонала, предпринимателей в пути.",
          "Сотрудник диктует данные голосом.",
          "ИИ распознаёт речь, структурирует информацию и автоматически разносит её в учётные системы.",
          "Хаос из голосовых сообщений превращается в чёткие данные и отчёты."
        ]
      },
      results: {
        period: "",
        items: []
      },
      mainMetric: { value: 5, prefix: "×", suffix: " скорость" },
      bgColor: "#F8F3FF"
    },
    {
      icon: Truck,
      company: "Идеальная архитектура под малый бюджет\n(Моя личная гордость)",
      about: "Грузовой Экспресс.",
      situation: "Заявки приходили отовсюду и терялись. Менеджеров нельзя было контролировать. Хотели внедрить тяжёлую CRM, но бюджет был ограничен.",
      solution: {
        steps: [
          "Мы отказались от дорогого сложного софта.",
          "Собрали лёгкую архитектуру на базе Telegram, ИИ и Google Таблиц — всё работает как единая система."
        ]
      },
      results: {
        period: "",
        items: [
          "Менеджеры перестали терять заявки",
          "Руководитель получает отчёт по бизнесу по одной кнопке",
          "Решение вышло дешевле и проще поддержки, чем коробочные CRM",
          "Отличный пример того, что правильная архитектура важнее бюджета"
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
