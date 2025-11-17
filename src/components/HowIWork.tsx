const HowIWork = () => {
  const steps = [
    {
      number: "01",
      title: "Диагностика",
      description:
        "Изучаю процессы, данные и текущие боли. Определяю точки применения ИИ с максимальной отдачей.",
    },
    {
      number: "02",
      title: "Архитектура",
      description:
        "Проектирую решение: выбираю инструменты, определяю интеграции, закладываю масштабируемость.",
    },
    {
      number: "03",
      title: "Сопровождение",
      description:
        "Запускаю пилот, обучаю команду, дорабатываю систему до целевых метрик и передаю в эксплуатацию.",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Как я работаю
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-accent text-accent-foreground rounded-lg flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-background rounded-lg border-l-4 border-accent">
            <p className="text-xl italic text-muted-foreground">
              "ИИ — инструмент, а не волшебная кнопка."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
