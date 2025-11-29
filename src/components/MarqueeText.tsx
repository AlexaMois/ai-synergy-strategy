const MarqueeText = () => {
  const words = [
    "ROI",
    "Архитектура",
    "Диагностика",
    "Внедрение",
    "Команда",
    "Практика",
    "Честность",
    "Этика",
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
