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
      title: "[АУДИТ] Найдём рутину, которая отнимает деньги",
      text: "Вы точно знаете, сколько часов в месяц уходит на ввод первички? На проверку документов? На ответы клиентам? Я считаю это и показываю, где можно вернуть деньги."
    },
    {
      number: "02",
      title: "[ДИАГНОСТИКА] Где теряются деньги — конкретные места",
      text: "На производстве — простои (мастер не видит загрузку). В продажах — лиды теряются (ответ через 2 часа). В закупках — ошибки в документах (бухгалтерия исправляет вручную). Я покажу, где выгода 300%, а где 0%."
    },
    {
      number: "03",
      title: "[СРОКИ] Когда вы готовы ждать результата",
      text: "Первый результат — через 4–8 недель. Полная окупаемость — через 3–6 месяцев. Если нужно \"вчера\" — это не про ИИ. Готовы ли вы подождать?"
    },
    {
      number: "04",
      title: "[СРОЧНОСТЬ] Почему это критично прямо сейчас",
      text: "Конкурент ушёл вперёд? Люди выгорают и уходят? Ошибки растут, боитесь штрафов? Или понимаете, что так больше нельзя? Ответ покажет, насколько срочно действовать."
    },
    {
      number: "05",
      title: "[ГОТОВНОСТЬ] Кто в команде будет сопротивляться",
      text: "Менеджеры не хотят менять привычки, бухгалтерия боится новых систем, мастера не верят в результат. Я покажу, как подготовить команду, чтобы они увидели выгоду для себя."
    },
    {
      number: "06",
      title: "[МЕТРИКИ] Как вы поймёте, что это работает",
      text: "Меньше ошибок — проверяете через неделю. Быстрее ответ лиду — видите в CRM. Мастер тратит меньше времени — сам скажет. Прибыль растёт — смотрите дашборд."
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {questions.map((question, index) => (
            <div
              key={question.number}
              className={`bg-[hsl(var(--gray-50))] rounded-2xl p-6 shadow-card hover:shadow-hover gradient-border-gray transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/20 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms"
              }}
            >
              <div className="flex items-start gap-4 mb-3">
                <span className="text-4xl font-bold text-primary leading-none">
                  {question.number}
                </span>
                <h3 className="text-lg font-semibold text-text-heading leading-tight">
                  {question.title}
                </h3>
              </div>
              <p className="text-base text-text-body leading-relaxed">
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
