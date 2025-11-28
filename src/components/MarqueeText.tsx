const MarqueeText = () => {
  const words = [
    "Диагностика",
    "Архитектура",
    "Внедрение",
    "ROI 200-400%",
    "AI Synergy Framework",
    "Практично",
    "Системно",
    "Результативно",
  ];

  return (
    <div className="bg-dark-bg text-background py-4 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="marquee-set">
              {words.map((word, index) => (
                <span key={`${setIndex}-${index}`} className="marquee-item">
                  {word}
                  <span className="text-accent mx-4">•</span>
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
