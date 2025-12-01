import { useMobileAnimations } from "@/hooks/use-mobile-animations";
const SixQuestions = () => {
  const {
    ref,
    isVisible
  } = useMobileAnimations({
    threshold: 0.1,
    triggerOnce: true
  });
  const questions = [{
    number: "01",
    keyword: "ЧТО",
    subtitle: "именно будет автоматизировано",
    text: "Какую задачу реально решаем: автоматизацию, аналитику, качество или скорость. Нужна конкретная метрика (часы/неделю, ошибки/месяц, дни обработки)."
  }, {
    number: "02",
    keyword: "ГДЕ",
    subtitle: "в компании это даст наибольший эффект",
    text: "Не везде ИИ экономит одинаково. Есть места, где выгода 300%, есть где 0%."
  }, {
    number: "03",
    keyword: "КОГДА",
    subtitle: "вы готовы менять процессы",
    text: "Если спешите — не выйдет. Если готовы подождать 4–8 недель — получится хорошо."
  }, {
    number: "04",
    keyword: "ПОЧЕМУ",
    subtitle: "это важно именно сейчас",
    text: "Конкурент уже внедрил? Теряете сотрудников? Падает качество? Или это стратегический запрос, но не срочно?"
  }, {
    number: "05",
    keyword: "КТО",
    subtitle: "будет выигрывать от этого",
    text: "Диспетчеры? Аналитики? Продавцы? Понимают ли они ценность и готовы ли учиться?"
  }, {
    number: "06",
    keyword: "КАК",
    subtitle: "мы это реализуем",
    text: "На готовых инструментах? На своём сервере? С разработкой? Бюджет? Сроки? Риски интеграции?"
  }];
  return <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-[28px] sm:text-[30px] md:text-[32px] font-medium text-text-heading leading-tight mb-4">Аудит и анализ ИИ-проектов: <span className="font-semibold">6 вопросов, которые разделяют выгоду от пустой траты</span>
          </h2>
          <p className="text-base sm:text-lg text-text-body max-w-3xl mx-auto">
            С этого начинается честный расчёт ROI
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {questions.map((question, index) => <div key={question.number} className={`bg-[hsl(var(--gray-50))] rounded-2xl p-6 shadow-card hover:shadow-hover gradient-border-gray transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/20 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{
          transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms"
        }}>
              <div className="flex items-start gap-4 mb-3">
                <span className="text-4xl font-bold text-primary leading-none">
                  {question.number}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-heading">
                    {question.keyword}
                  </h3>
                  <p className="text-base font-semibold text-text-heading mt-1">
                    {question.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-base text-text-body leading-relaxed">
                {question.text}
              </p>
            </div>)}
        </div>

        {/* Final Block */}
        <div className={`bg-white rounded-2xl p-8 md:p-10 shadow-card gradient-border text-center max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{
        transitionDelay: isVisible ? "700ms" : "0ms"
      }}>
          <p className="text-lg md:text-xl text-text-body leading-relaxed">После ответов:  вы знаете точно, во что и как инвестировать,
или понимаете, что ИИ вам сейчас не нужен (и сохраняете бюджет).<br />
            либо понимаете, что ИИ вам сейчас не нужен (и сохраняете бюджет).
          </p>
        </div>
      </div>
    </section>;
};
export default SixQuestions;