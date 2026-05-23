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

  // Editorial: 1 featured big + 4 smaller карточки разных пастельных оттенков
  const palettes = [
    { bg: "bg-surface-mint", text: "text-foreground", muted: "text-foreground/70" },
    { bg: "bg-surface-sand", text: "text-foreground", muted: "text-foreground/70" },
    { bg: "bg-surface-blush", text: "text-foreground", muted: "text-foreground/70" },
    { bg: "bg-surface-lavender", text: "text-foreground", muted: "text-foreground/70" },
  ];

  const [featured, ...rest] = criteria;

  return (
    <section ref={ref} className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-14 items-end">
        <div className="md:col-span-7">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Как я выбираю</p>
          <h2
            className={`text-4xl md:text-6xl font-bold text-foreground leading-[1.05] transition-all duration-700 ${
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

      {/* Featured */}
      <article
        className={`relative rounded-[32px] md:rounded-[40px] bg-accent text-white p-8 md:p-14 shadow-plate ring-1 ring-foreground/5 mb-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-4">
            <span className="font-iriska text-8xl md:text-9xl font-bold text-white/90 tabular-nums leading-none block mb-4">
              {featured.number}
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              {featured.title}
            </h3>
          </div>
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-widest text-white/80 font-semibold mb-2">
              Вопрос для вас
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">{featured.question}</p>
          </div>
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-widest text-white/80 font-semibold mb-2">
              Что я делаю
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">{featured.answer}</p>
          </div>
        </div>
      </article>

      {/* Остальные 4 — пастельные карточки 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {rest.map((item, index) => {
          const pal = palettes[index % palettes.length];
          return (
            <article
              key={item.number}
              className={`relative flex flex-col rounded-[28px] ${pal.bg} p-7 md:p-8 shadow-card hover:shadow-plate hover:-translate-y-1 ring-1 ring-foreground/5 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <span className="font-iriska text-5xl md:text-6xl font-bold text-accent tabular-nums leading-none mb-5">
                {item.number}
              </span>
              <h3 className={`text-xl md:text-2xl font-bold ${pal.text} mb-5 leading-tight`}>
                {item.title}
              </h3>
              <div className="space-y-4 mt-auto">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-accent font-semibold mb-1">
                    Вопрос для вас
                  </p>
                  <p className={`text-sm ${pal.muted} leading-relaxed`}>{item.question}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-accent font-semibold mb-1">
                    Что я делаю
                  </p>
                  <p className={`text-sm ${pal.muted} leading-relaxed`}>{item.answer}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default HowIChoose;
