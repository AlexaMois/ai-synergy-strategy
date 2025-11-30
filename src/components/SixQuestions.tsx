import { useMobileAnimations } from "@/hooks/use-mobile-animations";

const SixQuestions = () => {
  const { ref, isVisible } = useMobileAnimations({
    threshold: 0.1,
    triggerOnce: true,
  });

  const questions = [
    {
      number: "01",
      keyword: "ЧТО",
      text: "Что мы пытаемся решить на самом деле: автоматизацию, аналитику, качество, скорость или просто желание «внедрить ИИ»?",
    },
    {
      number: "02",
      keyword: "ГДЕ",
      text: "Где конкретно в процессах есть эффект: продажи, HR, поддержка, производство?",
    },
    {
      number: "03",
      keyword: "КОГДА",
      text: "Когда это нужно: сейчас, в кризисе, или в спокойном периоде?",
    },
    {
      number: "04",
      keyword: "ПОЧЕМУ",
      text: "Почему это важно бизнесу: есть боль, потери, риски или просто мода?",
    },
    {
      number: "05",
      keyword: "КТО",
      text: "Кто будет пользоваться решениями и кто будет сопротивляться?",
    },
    {
      number: "06",
      keyword: "КАК",
      text: "Как компания будет это внедрять: бюджет, зрелость данных, ресурсы, готовность команды?",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-[28px] sm:text-[30px] md:text-[32px] font-medium text-text-heading leading-tight mb-4">
            Компании приходят за ИИ.{" "}
            <span className="font-semibold">Чаще им нужен не ИИ, а ответы.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-body max-w-3xl mx-auto">
            Чтобы понять, даст ли технология пользу, я начинаю с шести простых
            вопросов:
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {questions.map((question, index) => (
            <div
              key={question.number}
              className={`bg-[hsl(var(--gray-50))] rounded-2xl p-6 shadow-card hover:shadow-hover gradient-border-gray transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/20 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms",
              }}
            >
              <div className="flex items-start gap-4 mb-3">
                <span className="text-4xl font-bold text-primary leading-none">
                  {question.number}
                </span>
                <h3 className="text-lg font-semibold text-text-heading mt-1">
                  {question.keyword}
                </h3>
              </div>
              <p className="text-base text-text-body leading-relaxed">
                {question.text}
              </p>
            </div>
          ))}
        </div>

        {/* Final Block */}
        <div
          className={`bg-white rounded-2xl p-8 md:p-10 shadow-card gradient-border text-center max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: isVisible ? "700ms" : "0ms",
          }}
        >
          <p className="text-lg md:text-xl text-text-body mb-4">
            После этого половина хотелок «давайте внедрим ИИ» рассыпается сама.
          </p>
          <p className="text-xl md:text-2xl font-semibold text-text-heading">
            Остаётся только то, что действительно работает и окупается.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SixQuestions;
