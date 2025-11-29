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
    <div className="bg-dark-bg text-background py-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          {words.map((word, index) => (
            <div key={index} className="flex items-center gap-4 md:gap-6">
              <span className="text-sm md:text-base whitespace-nowrap">
                {word}
              </span>
              {index < words.length - 1 && (
                <span className="text-accent">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeText;
