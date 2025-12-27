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
      title: "БИЗНЕС: Четкие цели и деньги на выходе",
      question: "У вас есть подсчёт брака за месяц? Известна ли цена одной ошибки в документе? Есть ли цель снизить потери на X%?",
      answer: "Мы не спрашиваем «какой ИИ купить?» и не говорим «это инновационно». Мы спрашиваем: сколько вы потеряли в прошлом месяце? Если нет четкой цели — я говорю прямо: начните с другого, это еще не ваш проект.",
      color: "#F6F3EB"
    },
    {
      number: "02",
      title: "ТЕХНОЛОГИИ: Безопасность и архитектура",
      question: "Ваши данные могут идти в облако (Google, OpenAI) или нужна локальная система (Local LLM)? Какие ограничения по 152-ФЗ?",
      answer: "Не все данные могут в облако. Я подбираю стек под вашу реальность: локальные модели, защищённые API, зашифрованные каналы. Соблюдаем NDA, не светим данные.",
      color: "#D4EDFC"
    },
    {
      number: "03",
      title: "ПРОЦЕССЫ: Порядок прежде технологии",
      question: "Кто сейчас вводит первичку вручную? Есть ли ясная логика: кто вводит → кто проверяет → кто утверждает?",
      answer: "ИИ не спасает хаос, он усиливает рабочие системы. Сначала выстраиваем логику, потом встраиваем ИИ. Система работает на вас, не создаёт бардак.",
      color: "#DFF0F0"
    },
    {
      number: "04",
      title: "ЛЮДИ: Союзники, не сопротивление",
      question: "Ваш мастер готов говорить в голосовый диктофон или будет возмущаться? Согласится ли менеджер с проверкой системой? Вверит ли бухгалтер данные в 1С или будет дублировать в Excel?",
      answer: "Если вижу блокировщиков — начинаю не с ИИ, а с выравнивания команды. Это добавляет 2–4 недели, но система потом работает годами.",
      color: "#E8E0F5"
    }
  ];

  return (
    <section id="methodology" ref={ref} className="py-10 md:py-16 lg:py-20 px-6 md:px-20 max-w-[1360px] mx-auto bg-background">
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
              AI Synergy<br />Framework
            </p>
          </div>
        </div>
      </div>

      {/* Итоговая плашка */}
      <div className={`bg-card border border-border rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-soft transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-lg sm:text-xl md:text-2xl font-medium text-foreground leading-relaxed">
          Вы получаете систему, которая работает годами и приносит деньги. Это не эксперимент, а рабочий актив.
        </p>
      </div>
    </section>
  );
};

export default AIFramework;
