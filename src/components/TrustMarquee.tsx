const TrustMarquee = () => {
  const facts = [
    "36+ проектов",
    "350+ консультаций",
    "ROI клиентов 200–400%",
    "Член НФИИ",
    "Резидент IT-Парк Казань",
    "Резидент КРИТБИ",
    "Бизнес-Успех 2025",
    "ОПОРА России",
  ];

  return (
    <div className="bg-dark-bg text-background py-3 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="marquee-set">
              {facts.map((fact, index) => (
                <span key={`${setIndex}-${index}`} className="marquee-item text-base">
                  {fact}
                  <span className="text-accent mx-3">•</span>
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
