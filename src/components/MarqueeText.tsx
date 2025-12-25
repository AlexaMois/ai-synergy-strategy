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
    <div className="bg-dark-bg text-background py-1 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="marquee-set">
              {words.map((word, index) => (
                <span key={`${setIndex}-${index}`} className="marquee-item text-xs">
                  {word}
                  <span className="text-accent mx-2">•</span>
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
