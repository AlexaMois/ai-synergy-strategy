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
    <section className="bg-background pt-6 pb-10 sm:pt-8 sm:pb-12 md:pt-10 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Заголовок и описание */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-semibold text-foreground leading-tight mb-3 sm:mb-4">
            ИИ-решения для бизнеса
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Встраиваю ИИ в существующие бизнес-процессы
            <br className="hidden sm:block" />
            без переделки системы и операционки
          </p>
        </div>

        {/* Основная сетка — 12 плиток (2 ряда по 6) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-14">
          {businessTiles.map((title, index) => (
            <div
              key={index}
              className="border border-dashed border-border rounded-lg p-4 sm:p-5 md:p-6 text-center hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
            >
              <span className="text-sm sm:text-base font-medium text-foreground leading-tight block">
                {title}
              </span>
            </div>
          ))}
        </div>

        {/* Блок для руководителей */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-foreground mb-5 sm:mb-6 md:mb-8">
            ИИ-решения для руководителей
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {leaderTiles.map((title, index) => (
              <div
                key={index}
                className="border border-dashed border-border rounded-lg p-5 sm:p-6 md:p-8 text-center hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
              >
                <span className="text-sm sm:text-base md:text-lg font-medium text-foreground leading-tight block">
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
