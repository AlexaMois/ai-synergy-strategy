import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const AIFramework = () => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);

  const sectors = [
    {
      name: "Бизнес",
      title: "Чёткие цели и измеримый эффект",
      description: "Понимание, что именно нужно изменить",
      position: "top"
    },
    {
      name: "Технологии",
      title: "Архитектура, безопасность, масштабируемость",
      description: "Только те инструменты, которые подходят компании",
      position: "right"
    },
    {
      name: "Люди",
      title: "Понимание, обучение, отсутствие сопротивления",
      description: "Технологии не должны пугать команду",
      position: "bottom"
    },
    {
      name: "Процессы",
      title: "Логика, куда ИИ действительно может встроиться",
      description: "Если решение ломает процесс — оно не внедряется",
      position: "left"
    }
  ];

  const getTooltipPosition = (position: string) => {
    const baseClasses = "absolute bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-[240px] transition-all duration-300 pointer-events-none z-10";
    
    switch(position) {
      case "top":
        return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 mb-4`;
      case "right":
        return `${baseClasses} left-full top-1/2 -translate-y-1/2 ml-4`;
      case "bottom":
        return `${baseClasses} top-full left-1/2 -translate-x-1/2 mt-4`;
      case "left":
        return `${baseClasses} right-full top-1/2 -translate-y-1/2 mr-4`;
      default:
        return baseClasses;
    }
  };

  return (
    <section 
      id="methodology" 
      ref={ref} 
      className="py-10 md:py-16 lg:py-20 px-6 md:px-20 max-w-[1360px] mx-auto bg-background"
    >
      {/* Заголовок с линией */}
      <div className={`text-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="section-title text-center leading-tight">
          Мой метод, <span className="font-semibold">AI Synergy Framework</span>
        </h2>
        <div className="w-24 h-[2px] bg-primary mx-auto"></div>
      </div>

      {/* Подзаголовок */}
      <div className={`text-center mb-12 md:mb-16 transition-all duration-700 delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
          ИИ работает только тогда, когда совпадают: бизнес, процессы, люди и технологии.
        </p>
      </div>

      {/* Круговая схема с тонким кольцом */}
      <div className={`flex justify-center mb-12 md:mb-16 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] mx-auto">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Тонкое кольцо, разделённое на 4 сектора */}
            <defs>
              <mask id="ring-mask">
                <circle cx="100" cy="100" r="100" fill="white"/>
                <circle cx="100" cy="100" r="70" fill="black"/>
              </mask>
            </defs>

            {/* Сектор 0 - Бизнес (верх) */}
            <path 
              d="M 100 0 A 100 100 0 0 1 200 100 L 170 100 A 70 70 0 0 0 100 30 Z" 
              fill="transparent"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              className="transition-all duration-300 cursor-pointer"
              style={{
                opacity: hoveredSector === null || hoveredSector === 0 ? 1 : 0.4,
                strokeWidth: hoveredSector === 0 ? '2.5' : '1.5'
              }}
              onMouseEnter={() => setHoveredSector(0)}
              onMouseLeave={() => setHoveredSector(null)}
              onClick={() => setHoveredSector(hoveredSector === 0 ? null : 0)}
            />

            {/* Сектор 1 - Технологии (право) */}
            <path 
              d="M 200 100 A 100 100 0 0 1 100 200 L 100 170 A 70 70 0 0 0 170 100 Z" 
              fill="transparent"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              className="transition-all duration-300 cursor-pointer"
              style={{
                opacity: hoveredSector === null || hoveredSector === 1 ? 1 : 0.4,
                strokeWidth: hoveredSector === 1 ? '2.5' : '1.5'
              }}
              onMouseEnter={() => setHoveredSector(1)}
              onMouseLeave={() => setHoveredSector(null)}
              onClick={() => setHoveredSector(hoveredSector === 1 ? null : 1)}
            />

            {/* Сектор 2 - Люди (низ) */}
            <path 
              d="M 100 200 A 100 100 0 0 1 0 100 L 30 100 A 70 70 0 0 0 100 170 Z" 
              fill="transparent"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              className="transition-all duration-300 cursor-pointer"
              style={{
                opacity: hoveredSector === null || hoveredSector === 2 ? 1 : 0.4,
                strokeWidth: hoveredSector === 2 ? '2.5' : '1.5'
              }}
              onMouseEnter={() => setHoveredSector(2)}
              onMouseLeave={() => setHoveredSector(null)}
              onClick={() => setHoveredSector(hoveredSector === 2 ? null : 2)}
            />

            {/* Сектор 3 - Процессы (лево) */}
            <path 
              d="M 0 100 A 100 100 0 0 1 100 0 L 100 30 A 70 70 0 0 0 30 100 Z" 
              fill="transparent"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              className="transition-all duration-300 cursor-pointer"
              style={{
                opacity: hoveredSector === null || hoveredSector === 3 ? 1 : 0.4,
                strokeWidth: hoveredSector === 3 ? '2.5' : '1.5'
              }}
              onMouseEnter={() => setHoveredSector(3)}
              onMouseLeave={() => setHoveredSector(null)}
              onClick={() => setHoveredSector(hoveredSector === 3 ? null : 3)}
            />

            {/* Подписи на секторах */}
            <text x="100" y="20" textAnchor="middle" className="text-[10px] font-medium fill-text-heading">Бизнес</text>
            <text x="180" y="105" textAnchor="middle" className="text-[10px] font-medium fill-text-heading">Технологии</text>
            <text x="100" y="190" textAnchor="middle" className="text-[10px] font-medium fill-text-heading">Люди</text>
            <text x="20" y="105" textAnchor="middle" className="text-[10px] font-medium fill-text-heading">Процессы</text>
          </svg>
          
          {/* Центральная надпись */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-white rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-sm">
              <p className="text-sm md:text-base font-semibold text-text-heading leading-tight px-4">
                AI Synergy<br />Framework
              </p>
            </div>
          </div>

          {/* Всплывающие карточки рядом с секторами */}
          {sectors.map((sector, index) => (
            <div
              key={index}
              className={`${getTooltipPosition(sector.position)} ${
                hoveredSector === index 
                  ? 'opacity-100 visible scale-100' 
                  : 'opacity-0 invisible scale-95'
              }`}
            >
              <h4 className="text-sm font-semibold text-text-heading mb-1.5 leading-snug">
                {sector.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {sector.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Итоговая плашка */}
      <div className={`bg-white rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-card transition-all duration-700 delay-500 gradient-border gradient-border-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
          Результат: решения, которые работают годами, а не «умирают» через месяц.
        </p>
      </div>
    </section>
  );
};

export default AIFramework;
