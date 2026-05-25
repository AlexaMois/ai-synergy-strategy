import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const HowIChoose = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const criteria = [
    {
      number: "01",
      title: "Готовность команды",
      question:
        "Команда готова работать по новым правилам, использовать голосовой ввод, заполнять данные в системе и принимать новый порядок работы?",
      answer:
        "Оцениваю готовность сотрудников и руководителей к изменениям. Когда нужна подготовка команды — начинаю с выравнивания ролей. Это добавляет 2–4 недели, зато система потом работает годами.",
    },
    {
      number: "02",
      title: "Объём и повторяемость",
      question:
        "Задача повторяется каждый день или несколько раз в неделю? Вы знаете, сколько часов в месяц уходит на неё вручную?",
      answer:
        "Считаю повторяемость и трудозатраты. Показываю, где цифровой инструмент освобождает время сотрудников и снижает ручную нагрузку.",
    },
    {
      number: "03",
      title: "Стоимость ошибки",
      question:
        "Сколько стоит одна ошибка в документе, заявке, расчёте или ответе клиенту?",
      answer:
        "Оцениваю цену ошибки: штраф, потеря клиента, возврат, переделка, репутационный риск. Показываю, где цифровой инструмент снижает человеческий фактор и повышает контроль.",
    },
    {
      number: "04",
      title: "Готовность данных",
      question:
        "Документы, звонки, отчёты и таблицы уже собраны в понятной структуре или лежат в разных местах?",
      answer:
        "Проверяю данные как управленческий актив. Когда данные распределены по разным источникам — выстраиваю единую структуру. После этого цифровой инструмент даёт устойчивый результат.",
    },
    {
      number: "05",
      title: "Срок окупаемости",
      question:
        "Вы готовы ждать 3–6 месяцев до измеримого результата или задача требует быстрых изменений?",
      answer:
        "Считаю экономику на каждом этапе: снижение ручной нагрузки, скорость ответа, количество ошибок, высвобождение времени. Когда экономика проекта требует уточнения — предлагаю подходящий формат.",
    },
  ];

  return (
    <section ref={ref} className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-14 items-end">
        <div className="md:col-span-7">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Как я выбираю</p>
          <h2
            className={`text-3xl md:text-5xl font-bold text-foreground leading-[1.05] transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Автоматизировать или сначала{" "}
            <span className="font-iriska font-normal italic text-accent">упростить</span> процесс
          </h2>
        </div>
        <div className="md:col-span-5">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Пять критериев, по которым я смотрю на задачу до выбора инструмента. От готовности команды до экономики проекта.
          </p>
        </div>
      </div>

      {/* Bento-сетка: флагман 01 + 4 карточки вокруг */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[240px] lg:grid-flow-dense">
        {criteria.map((item, i) => {
          const palettes = [
            { bg: "bg-accent", text: "text-white", muted: "text-white/85", accent: "text-white/80" },
            { bg: "bg-surface-sand", text: "text-foreground", muted: "text-foreground/70", accent: "text-accent" },
            { bg: "bg-surface-mint", text: "text-foreground", muted: "text-foreground/70", accent: "text-accent" },
            { bg: "bg-surface-blush", text: "text-foreground", muted: "text-foreground/70", accent: "text-accent" },
            { bg: "bg-surface-lavender", text: "text-foreground", muted: "text-foreground/70", accent: "text-accent" },
          ];
          const layouts = [
            { span: "lg:col-span-5 lg:row-span-2", size: "xl" }, // 01 флагман
            { span: "lg:col-span-4 lg:row-span-1", size: "md" }, // 02
            { span: "lg:col-span-3 lg:row-span-1", size: "sm" }, // 03
            { span: "lg:col-span-4 lg:row-span-1", size: "md" }, // 04
            { span: "lg:col-span-3 lg:row-span-1", size: "sm" }, // 05
          ];
          const p = palettes[i];
          const l = layouts[i];
          const isFlagship = l.size === "xl";
          const numCls = isFlagship
            ? "text-7xl md:text-8xl"
            : l.size === "md"
            ? "text-5xl md:text-6xl"
            : "text-4xl md:text-5xl";
          const titleCls = isFlagship
            ? "text-2xl md:text-3xl lg:text-4xl"
            : l.size === "md"
            ? "text-lg md:text-xl"
            : "text-base md:text-lg";
          return (
            <article
              key={item.number}
              className={`relative flex flex-col rounded-[28px] ${p.bg} p-6 md:p-7 shadow-card hover:shadow-plate hover:-translate-y-1 transition-all duration-300 ring-1 ring-foreground/5 ${l.span} min-h-[240px] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className={`font-iriska font-bold ${p.accent} tabular-nums leading-none block mb-3 ${numCls}`}>
                {item.number}
              </span>
              <h3 className={`${titleCls} font-bold ${p.text} leading-[1.1] mb-3`}>
                {item.title}
              </h3>
              {isFlagship ? (
                <div className="space-y-4 mt-2">
                  <div>
                    <p className={`text-[11px] uppercase tracking-widest font-semibold mb-1 ${p.accent}`}>Вопрос для вас</p>
                    <p className={`text-sm md:text-base ${p.muted} leading-relaxed`}>{item.question}</p>
                  </div>
                  <div>
                    <p className={`text-[11px] uppercase tracking-widest font-semibold mb-1 ${p.accent}`}>Что я делаю</p>
                    <p className={`text-sm md:text-base ${p.muted} leading-relaxed`}>{item.answer}</p>
                  </div>
                </div>
              ) : (
                <p className={`text-sm ${p.muted} leading-relaxed`}>{item.answer}</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default HowIChoose;
