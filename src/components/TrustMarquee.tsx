const TrustMarquee = () => {
  const facts = [
    "ROI 200–400 процентов",
    "36+ проектов",
    "350+ консультаций",
    "Опыт 12+ лет",
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
    <div className="bg-[#0B1220] text-white py-3 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="marquee-set">
              {facts.map((fact, index) => (
                <span key={`${setIndex}-${index}`} className="marquee-item text-base">
                  {fact}
                  <span className="text-primary mx-3">•</span>
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
