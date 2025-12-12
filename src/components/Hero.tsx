const Hero = () => {
  const businessTiles = [
    "Продажи и заявки",
    "Контроль лидов",
    "Документы и первичка",
    "Производство и объекты",
    "Поддержка клиентов",
    "Аналитика и маржа",
    "Интеграции и архитектура",
    "Отчёты и контроль",
    "Прогнозирование",
    "Управление процессами",
    "CRM без CRM",
    "Данные и дашборды",
  ];

  const leaderTiles = [
    "Автоматическая подготовка тендерной документации",
    "Личный голосовой помощник руководителя",
    "Дашборд директора",
  ];

  return (
    <section className="bg-background pt-8 sm:pt-10 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Заголовок и описание */}
        <div className="mb-4 sm:mb-5">
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold text-foreground leading-tight mb-2">
            ИИ-решения для бизнеса
          </h1>
          <p className="text-sm sm:text-[15px] text-muted-foreground leading-snug max-w-2xl">
            Встраиваю ИИ в существующие бизнес-процессы
            <br className="hidden sm:block" />
            без переделки системы и операционки
          </p>
        </div>

        {/* Основная сетка — 12 плиток (2 ряда по 6) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6 sm:mb-8">
          {businessTiles.map((title, index) => (
            <div
              key={index}
              className="border border-dashed border-border rounded-lg py-3 px-4 text-left hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
            >
              <span className="text-sm font-medium text-foreground leading-snug block">
                {title}
              </span>
            </div>
          ))}
        </div>

        {/* Блок для руководителей */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
            ИИ-решения для руководителей
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {leaderTiles.map((title, index) => (
              <div
                key={index}
                className="border border-dashed border-border rounded-lg py-3 px-4 text-left hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
              >
                <span className="text-sm font-medium text-foreground leading-snug block">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
