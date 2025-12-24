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
    <div className="bg-[#FFFFFF] text-foreground py-2 overflow-hidden border-y border-border/30">
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="marquee-set">
              {words.map((word, index) => (
                <span key={`${setIndex}-${index}`} className="marquee-item text-base text-foreground">
                  {word}
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

export default MarqueeText;
