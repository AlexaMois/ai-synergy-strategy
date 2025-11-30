const MarqueeText = () => {
  const words = [
    "Инженерный подход",
    "Честность решений",
    "Архитектура без переплат",
    "ROI до старта",
    "Командная ясность",
    "Технологии под бизнес",
    "Независимая экспертиза",
    "Практическая польза",
  ];

  return (
    <div className="bg-dark-bg text-background py-2 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="marquee-set">
              {words.map((word, index) => (
                <span key={`${setIndex}-${index}`} className="marquee-item text-base">
                  {word}
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

export default MarqueeText;
