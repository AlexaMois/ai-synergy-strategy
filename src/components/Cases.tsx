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
      company: "Вместо покупки серверов за 2.5 млн — 500 000 ₽ экономии за 3 месяца",
      about: "Крайпотребсоюз, 130+ договоров в месяц, 50+ человек в отделе",
      situation: "Руководитель планировал закупать серверы за 2.5 млн и нанимать IT-отдел. Люди тонули в рутине: 130 договоров контролировали вручную, каждый день переписывали данные по 5 раз, ФОТ рос. Руководитель не знал, какие договоры подписаны, а какие зависли.",
      solution: {
        steps: [
          "Неделя 1–2: Разбор 8 узких мест (вместо серверов нашли облако).",
          "Неделя 3–4: Проектирование на Google Workspace + API.",
          "Неделя 5–8: Внедрение + обучение. Бюджет: 150k против 2.5m."
        ]
      },
      quote: "Первая экономия была на вторую неделю. Раньше платили трём людям только за контроль договоров. Сейчас эти деньги идут в развитие отдела.",
      quoteAuthor: "Руководитель Крайпотребсоюза",
      resultsSummary: "ФОТ −80% / Экономия 500 000 ₽ за 3 месяца / Руководитель видит статус каждого договора в реальном времени",
      buttonText: "Читать, как убрали рутину и сэкономили 500 000 ₽ →",
      link: "/case-studies/kraypotrebsoyuz",
      bgColor: "#F0F9FB"
    },
    {
      icon: Mic,
      company: "Голосовые заметки вместо часов на отчёты: строители перестали тонуть в бумагах",
      aboutLabel: "Продукт:",
      about: "РОБОТНИК (модульная система), признана инновационной в КРИТБИ",
      situation: "Водители и строители не могут печатать на ходу. Голосовые сообщения в WhatsApp — хаос: никто не видит, что на объектах, отчёты делаются вручную часами.",
      solution: {
        steps: [
          "Неделя 1: Разбор процесса учёта на объектах.",
          "Неделя 2: Проектирование голосовой системы.",
          "Неделя 3–4: Интеграция в 1С + обучение."
        ]
      },
      quote: "Мастер говорит в телефон — данные сами попадают в систему. Не нужно ничего переписывать. Отчёты формируются за минуты.",
      quoteAuthor: "Начальник производства",
      resultsSummary: "Отчёты за минуты вместо часов / Ошибки −60% / Начальник видит все объекты без звонков",
      buttonText: "Читать, как убрали хаос из голосовых сообщений →",
      link: "#",
      bgColor: "#F8F3FF"
    },
    {
      icon: Truck,
      company: "Заявки перестали теряться без дорогой CRM: за 8 недель система за 1/10 стоимости",
      about: "Грузовой Экспресс, 15 менеджеров, 7 каналов заявок (телефон, WhatsApp, сайт, email)",
      situation: "Заявки приходили отовсюду и терялись. Менеджеров нельзя было контролировать. Бюджет на нормальную CRM не было.",
      solution: {
        steps: [
          "Неделя 1–2: Разбор всех каналов заявок.",
          "Неделя 3–4: Сборка на Telegram + Google Таблиц.",
          "Неделя 5–8: Внедрение + обучение."
        ]
      },
      quote: "Заявка приходит — автоматом в систему, менеджеру уведомление, я вижу весь процесс. Потери заявок упали на ноль.",
      quoteAuthor: "Директор",
      resultsSummary: "Заявки не теряются / Конверсия +25% / Отчёт по кнопке / Внедрение — 8 недель",
      buttonText: "Читать, как за 8 недель убрали потерю заявок →",
      link: "/case-studies/cargo-express",
      bgColor: "#F0F9FB"
    }
  ];

  return (
    <section id="cases" className="py-10 md:py-16 lg:py-20 bg-[#F7F8FA]" ref={ref}>
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
