import { useMobileAnimations } from "@/hooks/use-mobile-animations";

const SixQuestions = () => {
  const { ref, isVisible } = useMobileAnimations({ threshold: 0.1, triggerOnce: true });

  const questions = [
    {
      number: "01",
      title: "Где ручная работа забирает деньги",
      text: "Сколько часов в месяц уходит на ввод первички, проверку документов, ответы клиентам, сбор отчётов и сверку таблиц? Я считаю это в деньгах и показываю, где компания может вернуть ресурс."
    },
    {
      number: "02",
      title: "Где именно теряются деньги",
      text: "На производстве это простой и загрузка. В продажах — потерянные лиды и долгий ответ. В закупках — ошибки в документах. В документообороте — ручные проверки и переделки. Я показываю конкретные места, где цифровизация даёт эффект."
    },
    {
      number: "03",
      title: "Сколько времени компания готова ждать результата",
      text: "Первый результат обычно появляется через 4–8 недель. Полная окупаемость зависит от процесса, команды, данных и масштаба внедрения. Срок фиксируется до старта."
    },
    {
      number: "04",
      title: "Почему задача важна сейчас",
      text: "Срочность появляется там, где растут ошибки, теряются клиенты, команда перегружена, руководитель держит контроль вручную или конкурент уже работает быстрее."
    },
    {
      number: "05",
      title: "Кто в команде будет сопротивляться изменениям",
      text: "Сопротивление часто возникает у сотрудников, которые привыкли работать по-своему. Я заранее выявляю такие зоны и показываю команде личную выгоду от нового порядка работы."
    },
    {
      number: "06",
      title: "Как компания поймёт, что решение работает",
      text: "Метрики фиксируются заранее: меньше ошибок, быстрее ответ, меньше ручных действий, прозрачнее контроль, понятнее ответственность, выше скорость принятия решений."
    }
  ];

  // Bento с разной шириной/фоном/настроением
  const layouts = [
    { span: "md:col-span-7", bg: "bg-foreground", text: "text-background", muted: "text-background/75", num: "text-accent" }, // 01 hero dark
    { span: "md:col-span-5", bg: "bg-surface-mint", text: "text-foreground", muted: "text-foreground/70", num: "text-accent" }, // 02
    { span: "md:col-span-4", bg: "bg-surface-sand", text: "text-foreground", muted: "text-foreground/70", num: "text-accent" }, // 03
    { span: "md:col-span-4", bg: "bg-surface-lavender", text: "text-foreground", muted: "text-foreground/70", num: "text-accent" }, // 04
    { span: "md:col-span-4", bg: "bg-surface-blush", text: "text-foreground", muted: "text-foreground/70", num: "text-accent" }, // 05
    { span: "md:col-span-12", bg: "bg-accent", text: "text-white", muted: "text-white/85", num: "text-white" }, // 06 wide
  ];

  return (
    <section ref={ref} className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div
        className={`max-w-3xl mb-12 md:mb-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
          6 вопросов
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
          Что показывает{" "}
          <span className="font-iriska font-normal italic text-accent">реальную выгоду</span>{" "}
          проекта
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
          С этого начинается честный расчёт окупаемости.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
        {questions.map((question, index) => {
          const l = layouts[index];
          const isHero = index === 0;
          const isWide = index === 5;
          return (
            <article
              key={question.number}
              className={`relative flex flex-col rounded-[28px] overflow-hidden ${l.bg} ${l.span} p-7 md:p-9 shadow-card hover:shadow-plate hover:-translate-y-1 ring-1 ring-foreground/5 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isVisible ? `${(index + 1) * 80}ms` : "0ms" }}
            >
              <span
                className={`font-iriska font-bold ${l.num} tabular-nums leading-none mb-5 ${
                  isHero ? "text-7xl md:text-8xl lg:text-9xl" : "text-5xl md:text-6xl"
                }`}
              >
                {question.number}
              </span>
              <h3
                className={`font-bold ${l.text} leading-tight mb-4 ${
                  isHero
                    ? "text-3xl md:text-4xl lg:text-5xl max-w-xl"
                    : isWide
                    ? "text-2xl md:text-3xl max-w-3xl"
                    : "text-xl md:text-2xl"
                }`}
              >
                {question.title}
              </h3>
              <p
                className={`${l.muted} leading-relaxed ${
                  isHero ? "text-base md:text-lg max-w-lg" : isWide ? "text-base md:text-lg max-w-3xl" : "text-sm md:text-base"
                }`}
              >
                {question.text}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default SixQuestions;
