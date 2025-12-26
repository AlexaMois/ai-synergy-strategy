import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "./ui/button";
import { Building2, Mic, Truck } from "lucide-react";
import CaseCard from "./CaseCard";
import { toast } from "@/hooks/use-toast";

const Cases = () => {
  const { ref, isVisible, getStaggeredClass } = useMobileAnimations({ threshold: 0.2 });
  const { ref: counterRef, isVisible: counterVisible } = useIntersectionObserver({ threshold: 0.3 });

  const cases = [
    {
      icon: Building2,
      company: "Вместо сервера за 1,5 млн ₽ — архитектура, которая окупилась",
      aboutLabel: "Экономия:",
      about: "1,3 млн ₽",
      situation: "Крайпотребсоюз · 130+ договоров в месяц · 15+ сотрудников аппарата управления. Руководство планировало купить собственный сервер, локальную ИИ-модель и кастомную разработку. Риск — 1,5 млн ₽ на старте и дорогое сопровождение в будущем. Мы задали вопрос не «какой сервер?», а «зачем сервер?».",
      solution: {
        steps: [
          "Спроектировали более простую архитектуру: без тяжёлой инфраструктуры, с интеграцией в текущие процессы и обучением команды.",
          "Система работает самостоятельно."
        ]
      },
      quote: "Одну и ту же задачу можно решать деньгами или архитектурой. Мы почти всегда начинаем с архитектуры — она дешевле и устойчивее.",
      quoteAuthor: "Главный вывод",
      resultsSummary: "Экономия 1,3 млн ₽ на оборудовании / 2 сотрудника освобождены от рутины / Сроки договоров под автоматическим контролем / Финансовый отдел экономит 4–6 часов в неделю",
      buttonText: "Читать кейс →",
      link: "/case-studies/kraypotrebsoyuz",
      bgColor: "#F0F9FB"
    },
    {
      icon: Mic,
      company: "QR-код на рабочем месте → ответ из документации за 3 секунды",
      aboutLabel: "Экономия:",
      about: "150–350 тыс ₽ в месяц",
      situation: "Производственная и сервисная компания. Оборудование, регламенты, допуски, техническая документация. Инженеры и техники тратили по 20–30 минут на поиск инструкций в разрозненной документации. Простои, ошибки, брак. Не стали внедрять дорогую систему управления документацией — она бы не прижилась на производстве.",
      solution: {
        steps: [
          "Встроили ИИ прямо в рабочий процесс:",
          "QR-код → вопрос голосом или текстом → точный ответ из документации за 3 секунды."
        ]
      },
      quote: "ИИ начинает давать эффект, когда встраивается в привычный процесс, а не требует новых правил и обучения.",
      quoteAuthor: "Главный вывод",
      resultsSummary: "Вопрос решается за 3–5 минут вместо 20–30 / Экономия 40–85 часов в месяц на команде / Брак снижен на 30–50% / Окупаемость решения — около 3 месяцев",
      buttonText: "Смотреть, как работает →",
      link: "/case-studies/doc-search",
      bgColor: "#F8F3FF"
    },
    {
      icon: Truck,
      company: "Заявки голосом → сразу в Google Sheets",
      aboutLabel: "Без CRM.",
      about: "Полная прозрачность за 8 недель",
      situation: "Грузовой Экспресс. Авто-, авиа-, речные и морские перевозки + ответственное хранение. Заявки приходили из разных каналов, терялись и дублировались. Руководство не видело реальную картину. Классическая CRM казалась слишком сложной и дорогой для внедрения.",
      solution: {
        steps: [
          "Встроили ИИ-систему, которая принимает заявки голосом и текстом и автоматически раскладывает их в Google Sheets с разделением по типам и срочности.",
          "Менеджеры работают как раньше — но теперь система видит всё."
        ]
      },
      quote: "Система становится независимой, когда встроена в процессы и понятна людям, а не держится на подрядчике.",
      quoteAuthor: "Главный вывод",
      resultsSummary: "Потери и дубли заявок устранены (раньше — 10–15%) / Экономия 3–4 часа в неделю на одного менеджера / Ежедневные отчёты и аналитика в реальном времени / Система работает автономно",
      buttonText: "Читать кейс →",
      link: "/case-studies/cargo-express",
      bgColor: "#F0F9FB"
    }
  ];

  return (
    <section id="cases" className="py-10 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50/30 via-white to-white" ref={ref}>
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
              onClick={() => {
                toast({
                  title: "Эта страница находится в разработке",
                  description: "Скоро здесь появится полезная информация",
                });
              }}
            >
              Посмотреть все кейсы
            </Button>
        </div>
      </div>
    </section>
  );
};

export default Cases;
