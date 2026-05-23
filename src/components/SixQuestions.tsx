import { useMobileAnimations } from "@/hooks/use-mobile-animations";

const SixQuestions = () => {
  const {
    ref,
    isVisible
  } = useMobileAnimations({
    threshold: 0.1,
    triggerOnce: true
  });

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

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="section-title mb-4">
            6 вопросов, <span className="font-semibold">которые показывают реальную выгоду проекта</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            С этого начинается честный расчёт окупаемости
          </p>
        </div>
        {/* Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {questions.map((question, index) => (
            <div
              key={question.number}
              className={`bg-muted rounded-2xl p-6 shadow-soft hover:shadow-card border border-border transition-all duration-300 hover:bg-primary/10 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms"
              }}
            >
              <div className="flex items-start gap-4 mb-3">
                <span className="text-2xl font-medium text-primary leading-none">
                  {question.number}
                </span>
                <h3 className="leading-tight">
                  {question.title}
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {question.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SixQuestions;
