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
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h2
          className={`section-title text-center mb-10 md:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Как я выбираю: <span className="font-semibold">автоматизировать или сначала упростить процесс</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {criteria.map((item, index) => (
            <div
              key={item.number}
              className={`bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow duration-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="text-primary text-sm font-medium mb-3 block">{item.number}</span>
              <h3 className="text-lg font-medium text-foreground mb-4">{item.title}</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-primary">Вопрос для вас</span>
                  <p className="text-foreground text-sm mt-1">{item.question}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-primary">Что я делаю</span>
                  <p className="text-foreground text-sm mt-1">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIChoose;
