import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const AIFramework = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const sectors = [
    {
      number: "01",
      tag: "Бизнес",
      title: "Цель и деньги на выходе",
      question:
        "Какая задача влияет на деньги, скорость, контроль или качество работы? Сколько стоит ошибка, задержка или ручное действие?",
      answer:
        "Считаю экономику проекта и фиксирую цель до выбора инструмента. Компания понимает, какой эффект ждёт и по каким метрикам его проверять.",
      bg: "bg-surface-sand",
      text: "text-foreground",
      muted: "text-foreground/70",
      accent: "text-accent",
      span: "md:col-span-7 md:row-span-2", // большой featured
    },
    {
      number: "02",
      tag: "Технологии",
      title: "Безопасность и архитектура",
      question:
        "Какие данные можно передавать во внешние сервисы, а какие требуют закрытого контура, российского хранения или отдельной схемы доступа?",
      answer:
        "Подбираю технологический стек под реальность компании: облако, российские сервисы, локальные решения, защищённые каналы, разграничение прав и интеграции.",
      bg: "bg-foreground",
      text: "text-background",
      muted: "text-background/75",
      accent: "text-accent",
      span: "md:col-span-5",
    },
    {
      number: "03",
      tag: "Процессы",
      title: "Порядок перед внедрением",
      question:
        "Кто вводит данные, кто проверяет, кто утверждает, где хранятся документы и как сейчас проходит задача?",
      answer:
        "Выстраиваю логику процесса: роли, статусы, данные, сценарии, контрольные точки. После этого цифровой инструмент встраивается в рабочую систему компании.",
      bg: "bg-surface-blush",
      text: "text-foreground",
      muted: "text-foreground/70",
      accent: "text-accent",
      span: "md:col-span-5",
    },
    {
      number: "04",
      tag: "Люди",
      title: "Союзники изменений",
      question:
        "Кто будет пользоваться инструментом каждый день? Кто влияет на принятие нового порядка работы?",
      answer:
        "Готовлю команду к внедрению: объясняю пользу, показываю сценарии, собираю обратную связь и помогаю закрепить новый способ работы.",
      bg: "bg-accent",
      text: "text-white",
      muted: "text-white/85",
      accent: "text-white",
      span: "md:col-span-12 lg:col-span-12",
    },
  ];

  return (
    <section id="methodology" ref={ref} className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
      {/* Заголовок */}
      <div
        className={`max-w-3xl mb-10 md:mb-14 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Мой метод</p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
          Четыре элемента{" "}
          <span className="font-iriska font-normal italic text-accent">рабочего внедрения</span>
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
          Цифровой инструмент даёт результат, когда совпадают бизнес-задача, технологии, процессы и люди.
        </p>
      </div>

      {/* Bento 12-col, асимметрия */}
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 transition-all duration-700 delay-150 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {sectors.map((s) => (
          <article
            key={s.number}
            className={`relative flex flex-col rounded-[28px] overflow-hidden p-7 md:p-10 shadow-card hover:shadow-plate hover:-translate-y-1 transition-all duration-300 ring-1 ring-foreground/5 ${s.bg} ${s.span}`}
          >
            <div className="flex items-baseline justify-between mb-6">
              <span className={`font-iriska text-6xl md:text-7xl lg:text-8xl font-bold ${s.accent} tabular-nums leading-none`}>
                {s.number}
              </span>
              <span className={`text-xs uppercase tracking-widest ${s.muted} font-semibold`}>{s.tag}</span>
            </div>
            <h3 className={`text-2xl md:text-3xl font-bold ${s.text} leading-tight mb-6`}>
              {s.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-5 md:gap-8 mt-auto">
              <div>
                <p className={`text-[11px] uppercase tracking-widest ${s.accent} font-semibold mb-2`}>
                  Вопрос для вас
                </p>
                <p className={`text-sm md:text-base ${s.muted} leading-relaxed`}>{s.question}</p>
              </div>
              <div>
                <p className={`text-[11px] uppercase tracking-widest ${s.accent} font-semibold mb-2`}>
                  Что я делаю
                </p>
                <p className={`text-sm md:text-base ${s.muted} leading-relaxed`}>{s.answer}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AIFramework;
