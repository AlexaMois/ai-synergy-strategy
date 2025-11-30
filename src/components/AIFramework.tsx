import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const AIFramework = () => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  const sectors = [
    {
      id: "business",
      name: "Бизнес",
      title: "Чёткие цели и измеримый эффект",
      description: "Понимание, что именно нужно изменить.",
      angle: -90, // top
    },
    {
      id: "technology",
      name: "Технологии",
      title: "Архитектура, безопасность, масштабируемость",
      description: "Только те инструменты, которые подходят компании.",
      angle: 0, // right
    },
    {
      id: "people",
      name: "Люди",
      title: "Понимание, обучение, отсутствие сопротивления",
      description: "Технологии не должны пугать команду.",
      angle: 90, // bottom
    },
    {
      id: "processes",
      name: "Процессы",
      title: "Логика, куда ИИ действительно может встроиться",
      description: "Если решение ломает процесс — оно не внедряется.",
      angle: 180, // left
    }
  ];

  const getTooltipPosition = (angle: number) => {
    switch (angle) {
      case -90: // top
        return "bottom-full left-1/2 -translate-x-1/2 mb-4";
      case 0: // right
        return "left-full top-1/2 -translate-y-1/2 ml-4";
      case 90: // bottom
        return "top-full left-1/2 -translate-x-1/2 mt-4";
      case 180: // left
        return "right-full top-1/2 -translate-y-1/2 mr-4";
      default:
        return "";
    }
  };

  const getLabelPosition = (angle: number) => {
    const radius = 200; // Distance from center for labels
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;
    
    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: 'translate(-50%, -50%)',
    };
  };

  return (
    <section 
      id="methodology" 
      ref={ref} 
      className="py-10 md:py-16 lg:py-20 px-6 md:px-20 max-w-[1360px] mx-auto bg-background"
    >
      {/* Заголовок */}
      <div className={`text-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="section-title text-center leading-tight">
          <span className="font-medium">AI Synergy Framework,</span>{" "}
          <span className="font-semibold">методология внедрения</span>
        </h2>
      </div>

      {/* Подзаголовок */}
      <div className={`text-center mb-12 md:mb-16 transition-all duration-700 delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          ИИ работает только тогда, когда совпадают: бизнес, процессы, люди и технологии.
        </p>
      </div>

      {/* Круговая схема */}
      <div className={`flex justify-center mb-12 md:mb-16 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] mx-auto">
          {/* SVG Ring */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
          >
            <g transform="translate(100, 100)">
              {/* Business sector (top) */}
              <path
                d="M 0,-70 A 70,70 0 0,1 70,0 L 60,0 A 60,60 0 0,0 0,-60 Z"
                className={`cursor-pointer transition-all duration-300 ${
                  hoveredSector === "business"
                    ? "fill-primary/20 stroke-primary stroke-2"
                    : "fill-primary/8 stroke-primary/30 stroke-1"
                }`}
                onMouseEnter={() => setHoveredSector("business")}
                onMouseLeave={() => setHoveredSector(null)}
                onClick={() => setHoveredSector(hoveredSector === "business" ? null : "business")}
              />

              {/* Technology sector (right) */}
              <path
                d="M 70,0 A 70,70 0 0,1 0,70 L 0,60 A 60,60 0 0,0 60,0 Z"
                className={`cursor-pointer transition-all duration-300 ${
                  hoveredSector === "technology"
                    ? "fill-primary/20 stroke-primary stroke-2"
                    : "fill-primary/8 stroke-primary/30 stroke-1"
                }`}
                onMouseEnter={() => setHoveredSector("technology")}
                onMouseLeave={() => setHoveredSector(null)}
                onClick={() => setHoveredSector(hoveredSector === "technology" ? null : "technology")}
              />

              {/* People sector (bottom) */}
              <path
                d="M 0,70 A 70,70 0 0,1 -70,0 L -60,0 A 60,60 0 0,0 0,60 Z"
                className={`cursor-pointer transition-all duration-300 ${
                  hoveredSector === "people"
                    ? "fill-primary/20 stroke-primary stroke-2"
                    : "fill-primary/8 stroke-primary/30 stroke-1"
                }`}
                onMouseEnter={() => setHoveredSector("people")}
                onMouseLeave={() => setHoveredSector(null)}
                onClick={() => setHoveredSector(hoveredSector === "people" ? null : "people")}
              />

              {/* Processes sector (left) */}
              <path
                d="M -70,0 A 70,70 0 0,1 0,-70 L 0,-60 A 60,60 0 0,0 -60,0 Z"
                className={`cursor-pointer transition-all duration-300 ${
                  hoveredSector === "processes"
                    ? "fill-primary/20 stroke-primary stroke-2"
                    : "fill-primary/8 stroke-primary/30 stroke-1"
                }`}
                onMouseEnter={() => setHoveredSector("processes")}
                onMouseLeave={() => setHoveredSector(null)}
                onClick={() => setHoveredSector(hoveredSector === "processes" ? null : "processes")}
              />

              {/* Center circle */}
              <circle
                r="55"
                className="fill-background stroke-border/20 stroke-1"
              />
            </g>
          </svg>

          {/* Central text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center px-4">
              <p className="text-sm sm:text-base font-medium text-foreground leading-tight">
                AI Synergy<br />Framework
              </p>
            </div>
          </div>

          {/* HTML Labels outside SVG */}
          {sectors.map((sector) => (
            <div
              key={`label-${sector.id}`}
              className="absolute cursor-pointer text-sm sm:text-base font-medium transition-colors duration-200 hover:text-primary whitespace-nowrap"
              style={getLabelPosition(sector.angle)}
              onMouseEnter={() => setHoveredSector(sector.id)}
              onMouseLeave={() => setHoveredSector(null)}
              onClick={() => setHoveredSector(hoveredSector === sector.id ? null : sector.id)}
            >
              {sector.name}
            </div>
          ))}

          {/* Desktop Tooltips with site-style cards */}
          {sectors.map((sector) => (
            hoveredSector === sector.id && (
              <div
                key={`tooltip-${sector.id}`}
                className={`absolute z-20 ${getTooltipPosition(sector.angle)} 
                  bg-white rounded-xl shadow-card p-4 sm:p-5 w-56 sm:w-64
                  gradient-border gradient-border-hover
                  animate-in fade-in-0 zoom-in-95 duration-300
                  hidden md:block`}
              >
                <h4 className="font-semibold text-foreground mb-2 text-sm">
                  {sector.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {sector.description}
                </p>
              </div>
            )
          ))}

          {/* Mobile tooltip (below ring) */}
          {hoveredSector && (
            <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-6 w-full max-w-[280px]">
              <div className="bg-white rounded-xl shadow-card p-4 gradient-border animate-in fade-in-0 slide-in-from-top-2 duration-300">
                <h4 className="font-semibold text-foreground mb-2 text-sm">
                  {sectors.find(s => s.id === hoveredSector)?.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {sectors.find(s => s.id === hoveredSector)?.description}
                </p>
              </div>
            </div>
          )}
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
