const TrustMarquee = () => {
  const facts = [
    "Средняя окупаемость решений — 3 месяца",
    "40 внедрённых проектов",
    "360 разборов бизнес-процессов",
    "4+ года практики в ИИ",
    "Дипломированный специалист по ИИ",
    "Квалификация KAЭО, уровень 5",
    "Победитель регионального этапа премии «Бизнес-Успех», 2025",
    
    "Резидент IT Парк",
    "Резидент КРИТБИ",
    "Разбор задачи за 30 минут",
    "Архитектурный подход",
    "Независимая экспертиза",
    "Системное внедрение",
  ];

  return (
    <div className="bg-dark-bg text-background py-1 md:py-2 lg:py-3 overflow-hidden">
      <div className="marquee-container">
        {/* Duration tuned so scroll speed (px/s) matches the lower marquee */}
        <div className="marquee-content" style={{ animationDuration: "99s" }}>
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
