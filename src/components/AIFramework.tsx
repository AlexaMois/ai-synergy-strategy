import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const AIFramework = () => {
  const {
    ref,
    isVisible
  } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  // Данные для 4 карточек
  const sectors = [
    {
      number: "01",
      title: "Бизнес: цель и деньги на выходе",
      question: "Какая задача влияет на деньги, скорость, контроль или качество работы? Сколько стоит ошибка, задержка или ручное действие?",
      answer: "Считаю экономику проекта и фиксирую цель до выбора инструмента. Компания понимает, какой эффект ждёт и по каким метрикам его проверять.",
      color: "#F6F3EB"
    },
    {
      number: "02",
      title: "Технологии: безопасность и архитектура",
      question: "Какие данные можно передавать во внешние сервисы, а какие требуют закрытого контура, российского хранения или отдельной схемы доступа?",
      answer: "Подбираю технологический стек под реальность компании: облако, российские сервисы, локальные решения, защищённые каналы, разграничение прав и интеграции.",
      color: "#D4EDFC"
    },
    {
      number: "03",
      title: "Процессы: порядок перед внедрением",
      question: "Кто вводит данные, кто проверяет, кто утверждает, где хранятся документы и как сейчас проходит задача?",
      answer: "Выстраиваю логику процесса: роли, статусы, данные, сценарии, контрольные точки. После этого цифровой инструмент встраивается в рабочую систему компании.",
      color: "#DFF0F0"
    },
    {
      number: "04",
      title: "Люди: союзники изменений",
      question: "Кто будет пользоваться инструментом каждый день? Кто влияет на принятие нового порядка работы?",
      answer: "Готовлю команду к внедрению: объясняю пользу, показываю сценарии, собираю обратную связь и помогаю закрепить новый способ работы.",
      color: "#E8E0F5"
    }
  ];

  return (
    <section id="methodology" ref={ref} className="py-10 md:py-16 lg:py-20 px-6 md:px-20 max-w-[1360px] mx-auto bg-background">
      {/* Заголовок с линией */}
      <div className={`text-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="section-title text-center leading-tight">
          Мой метод: <span className="font-semibold">четыре элемента рабочего внедрения</span>
        </h2>
        <div className="w-24 h-[2px] bg-primary mx-auto"></div>
      </div>

      {/* Подзаголовок */}
      <div className={`text-center mb-12 md:mb-16 transition-all duration-700 delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-handwriting animate-handwriting tracking-wide text-xl sm:text-2xl md:text-3xl">
          Цифровой инструмент даёт результат, когда совпадают бизнес-задача, технологии, процессы и люди
        </p>
      </div>

      {/* Сетка 2×2 с центральным элементом */}
      <div className={`relative max-w-[900px] mx-auto mb-12 md:mb-16 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {sectors.map((sector, index) => (
            <div 
              key={index}
              className="p-6 md:p-8 rounded-2xl border border-border shadow-soft hover:shadow-card transition-shadow duration-200"
              style={{ backgroundColor: sector.color }}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-xl font-medium text-primary leading-none">
                  {sector.number}
                </span>
                <h3 className="leading-tight">
                  {sector.title}
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">Вопрос для вас</span>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">
                    {sector.question}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">Что я делаю</span>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-1">
                    {sector.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Центральный статичный элемент */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex">
          <div className="bg-card rounded-full w-32 h-32 lg:w-36 lg:h-36 flex items-center justify-center shadow-card border-2 border-primary/20">
            <p className="text-sm lg:text-base font-semibold text-foreground leading-tight text-center px-4">
              Метод<br />НейроРешений
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFramework;
