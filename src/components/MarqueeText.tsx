const MarqueeText = () => {
  const words = [
    "Инженерный подход",
    "Честность решений",
    "ROI до старта",
    "Архитектура без переплат",
    "Командная ясность",
    "Технологии под цели бизнеса",
    "Независимая экспертиза",
  ];

  return (
    <div className="bg-dark-bg text-background py-1 md:py-2 lg:py-3 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="marquee-set">
              {words.map((word, index) => (
                <span key={`${setIndex}-${index}`} className="marquee-item text-xs md:text-sm lg:text-base">
                  {word}
                  <span className="text-accent mx-2 md:mx-3">•</span>
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
