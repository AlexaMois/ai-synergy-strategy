import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const HowIChoose = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const criteria = [
    {
      number: "01",
      title: "Готовность команды",
      question:
        "Ваш мастер цеха готов говорить в голосовой диктофон или будет возмущаться? Согласится менеджер, что система ловит его ошибки, или будет её обходить? Вверит ли экономист данные ИИ или будет дублировать в Excel?",
      answer:
        "Если вижу блокировщиков — начинаю не с ИИ, а с вовлечения команды. Это добавляет 2–4 недели, но система потом работает годами, а не месяцами.",
    },
    {
      number: "02",
      title: "Объём и повторяемость",
      question: "Задача повторяется больше 5 раз в день? Вы точно знаете, сколько часов в месяц на неё уходит?",
      answer:
        "Если повторяется >5 раз в день — рутина. Я считаю часы в месяц и показываю, где можно освободить людей для важного.",
    },
    {
      number: "03",
      title: "Стоимость ошибки",
      question: "Сколько стоит вам одна ошибка в документе? Потеря клиента? Штраф от контрагента?",
      answer:
        "Ошибка в документе — штраф. Ошибка в заказе — возврат и потеря клиента. Я оцениваю цену ошибки и показываю, где ИИ исключит человеческий фактор.",
    },
    {
      number: "04",
      title: "Готовность данных",
      question: "У вас есть первичные документы, звонки, отчёты? Они структурированы или размазаны по разным файлам?",
      answer:
        "Если есть документы, звонки, отчёты — покажу, как превратить в управляемый актив. Если данных нет — сначала настроим сбор, потом ИИ. Не обещаю волшебство из ничего.",
    },
    {
      number: "05",
      title: "Срок окупаемости",
      question: 'Вы готовы подождать 3–6 месяцев на результат? Или нужно "вчера"?',
      answer:
        "Я не беру проекты с окупаемостью >6 месяцев. Считаю ROI на каждом этапе: снижение брака, скорость ответа, высвобождение времени. Если считаю, что счёт не сходится — я говорю прямо.",
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
          Как я выбираю: <span className="font-semibold">автоматизировать или просто решить?</span>
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
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">Вопрос для вас</span>
                  <p className="text-foreground text-sm mt-1">{item.question}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">Что я делаю</span>
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
