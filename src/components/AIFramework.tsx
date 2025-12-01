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
  const sectors = [{
    title: "БИЗНЕС",
    subtitle: "Четкие цели и измеримый эффект",
    description: "Мы не стартуем с вопроса «какой ИИ купить?». Мы начинаем с вопроса «Зачем?». Я нахожу конкретные метрики (деньги, время, ошибки), которые нужно улучшить. Где нет цели — там нет внедрения.",
    color: "#F6F3EB"
  }, {
    title: "ТЕХНОЛОГИИ",
    subtitle: "Безопасность, этика и архитектура",
    description: "Не всем можно в облака. Я подбираю стек строго под ваши ограничения безопасности. Кому-то ставим закрытый контур (Local LLM), кому-то подключаем API. Всегда соблюдаем цифровую гигиену и NDA.",
    color: "#D4EDFC"
  }, {
    title: "ПРОЦЕССЫ",
    subtitle: "Порядок и архитектура прежде всего",
    description: "ИИ работает только в отлаженных системах. Сначала мы выстраиваем логику процесса: кто, что и когда делает. Затем автоматизируем его. Решение должно органично встраиваться в работу и усиливать её.",
    color: "#DFF0F0"
  }, {
    title: "ЛЮДИ",
    subtitle: "Понимание, обучение и поддержка",
    description: "Самый умный бот бесполезен, если его саботируют. Я обучаю вашу команду, пишу простые регламенты и объясняю ценность. Сотрудники видят в ИИ помощника и становятся вашими союзниками.",
    color: "#E8E0F5"
  }];

  return <section id="methodology" ref={ref} className="py-10 md:py-16 lg:py-20 px-6 md:px-20 max-w-[1360px] mx-auto bg-background">
      {/* Заголовок с линией */}
      <div className={`text-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="section-title text-center leading-tight">
          Мой метод, <span className="font-semibold">AI Synergy Framework</span>
        </h2>
        <div className="w-24 h-[2px] bg-primary mx-auto"></div>
      </div>

      {/* Подзаголовок */}
      <div className={`text-center mb-12 md:mb-16 transition-all duration-700 delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-handwriting animate-handwriting tracking-wide text-xl sm:text-2xl md:text-3xl">
          ИИ работает только тогда, когда совпадают четыре элемента
        </p>
      </div>

      {/* Сетка 2×2 с центральным элементом */}
      <div className={`relative max-w-[900px] mx-auto mb-12 md:mb-16 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {sectors.map((sector, index) => (
            <div 
              key={index}
              className="p-6 md:p-8 rounded-2xl shadow-card gradient-border hover:shadow-hover transition-all duration-300"
              style={{ backgroundColor: sector.color }}
            >
              <h3 className="text-lg md:text-xl font-bold text-text-heading mb-3">
                {sector.title}
              </h3>
              <h4 className="text-base md:text-lg font-semibold text-text-heading mb-4">
                {sector.subtitle}
              </h4>
              <p className="text-sm md:text-base text-text-body leading-relaxed">
                {sector.description}
              </p>
            </div>
          ))}
        </div>

        {/* Центральный статичный элемент */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex">
          <div className="bg-white rounded-full w-32 h-32 lg:w-36 lg:h-36 flex items-center justify-center shadow-lg border-2 border-primary/20">
            <p className="text-sm lg:text-base font-bold text-text-heading leading-tight text-center px-4">
              AI Synergy<br />Framework
            </p>
          </div>
        </div>
      </div>

      {/* Итоговая плашка */}
      <div className={`bg-white rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-700 delay-500 gradient-border gradient-border-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-lg sm:text-xl md:text-2xl font-medium text-text-heading leading-relaxed">
          Вы получаете систему, которая живет годами и усиливает бизнес. Это рабочий актив, а не временная игрушка.
        </p>
      </div>
    </section>;
};
export default AIFramework;