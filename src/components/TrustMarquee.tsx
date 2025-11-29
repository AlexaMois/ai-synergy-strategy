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
    <div className="bg-dark-bg text-background py-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          {facts.map((fact, index) => (
            <div key={index} className="flex items-center gap-4 md:gap-6">
              <span className="text-sm md:text-base whitespace-nowrap">
                {fact}
              </span>
              {index < facts.length - 1 && (
                <span className="text-accent">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustMarquee;
