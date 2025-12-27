const TrustMarquee = () => {
  const facts = [
    "ROI 200–400 процентов",
    "36+ проектов",
    "350+ консультаций",
    "Опыт 12+ лет",
    "Дипломированный специалист по ИИ • Квалификация KAЭО, уровень 5",
    "Победитель Бизнес Успех",
    "Член НФИИ",
    "Резидент IT Парк",
    "Резидент КРИТБИ",
    "Диагностика за 30 минут",
    "Архитектурный подход",
    "Независимая экспертиза",
    "Системное внедрение",
  ];

  return (
    <div className="bg-dark-bg text-background py-1 md:py-2 lg:py-3 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="marquee-set">
              {facts.map((fact, index) => (
                <span key={`${setIndex}-${index}`} className="marquee-item text-xs md:text-sm lg:text-base">
                  {fact}
                  <span className="text-primary mx-2 md:mx-3">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustMarquee;
