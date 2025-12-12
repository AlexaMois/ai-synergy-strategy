import { useEffect, useRef, useState } from "react";

const ImpulseVisual = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 200 240"
        className="w-full max-w-[180px] h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Мазок кисти — органичная форма */}
        <path
          d="M30 200 
             C40 180, 35 160, 50 140 
             C65 120, 55 100, 70 80 
             C85 60, 75 45, 90 30
             C100 20, 110 25, 115 35
             C125 50, 115 65, 130 85
             C145 105, 135 125, 150 145
             C165 165, 155 185, 170 200
             C175 210, 165 215, 155 210
             C140 200, 150 180, 135 160
             C120 140, 130 120, 115 100
             C100 80, 110 60, 95 45
             C85 35, 75 40, 70 55
             C60 75, 70 95, 55 115
             C40 135, 50 155, 35 175
             C25 190, 30 200, 30 200Z"
          fill="hsl(var(--primary))"
          fillOpacity="0.15"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isVisible ? "animate-brush-draw" : "opacity-0"}
          style={{
            strokeDasharray: 1200,
            strokeDashoffset: isVisible ? 0 : 1200,
          }}
        />

        {/* Геометрические элементы — точки */}
        <g className={isVisible ? "animate-dots-appear" : "opacity-0"}>
          <circle cx="70" cy="60" r="6" fill="hsl(var(--primary))" fillOpacity="0.8" />
          <circle cx="120" cy="90" r="5" fill="hsl(var(--primary-light))" />
          <circle cx="85" cy="130" r="7" fill="hsl(var(--primary))" fillOpacity="0.6" />
          <circle cx="140" cy="160" r="4" fill="hsl(var(--primary))" fillOpacity="0.9" />
          <circle cx="55" cy="170" r="5" fill="hsl(var(--primary-light))" />
          <circle cx="100" cy="45" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
          <circle cx="150" cy="120" r="3" fill="hsl(var(--primary-light))" />
        </g>

        {/* Геометрические элементы — линии-связи */}
        <g className={isVisible ? "animate-lines-appear" : "opacity-0"}>
          <line 
            x1="70" y1="60" x2="120" y2="90" 
            stroke="hsl(var(--primary))" 
            strokeWidth="1.5" 
            strokeOpacity="0.4"
          />
          <line 
            x1="120" y1="90" x2="85" y2="130" 
            stroke="hsl(var(--primary))" 
            strokeWidth="1" 
            strokeOpacity="0.3"
          />
          <line 
            x1="85" y1="130" x2="140" y2="160" 
            stroke="hsl(var(--primary))" 
            strokeWidth="1.5" 
            strokeOpacity="0.4"
          />
          <line 
            x1="100" y1="45" x2="70" y2="60" 
            stroke="hsl(var(--primary))" 
            strokeWidth="1" 
            strokeOpacity="0.3"
          />
          <line 
            x1="140" y1="160" x2="55" y2="170" 
            stroke="hsl(var(--primary))" 
            strokeWidth="1" 
            strokeOpacity="0.25"
          />
          <line 
            x1="120" y1="90" x2="150" y2="120" 
            stroke="hsl(var(--primary))" 
            strokeWidth="1" 
            strokeOpacity="0.3"
          />
        </g>
      </svg>
    </div>
  );
};

export default ImpulseVisual;
