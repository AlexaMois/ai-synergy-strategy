import { useState, useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
const AIFramework = () => {
  const {
    ref,
    isVisible
  } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Закрытие карточки при клике вне её
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (hoveredSector !== null && cardRef.current && !cardRef.current.contains(event.target as Node)) {
        // Проверяем, что клик не по SVG сектору
        const target = event.target as Element;
        if (!target.closest('svg')) {
          setHoveredSector(null);
        }
      }
    };

    if (hoveredSector !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [hoveredSector]);

  const handleSectorInteraction = (sectorIndex: number) => {
    setHoveredSector(hoveredSector === sectorIndex ? null : sectorIndex);
  };

  // Маппинг между секторами круга и карточками
  const sectors = [{
    name: "Технологии",
    color: "#D4EDFC",
    position: "right",
    title: "Технологии",
    subtitle: "Архитектура, безопасность, масштабируемость",
    description: "Только те инструменты, которые подходят компании"
  }, {
    name: "Люди",
    color: "#E8E0F5",
    position: "bottom-right",
    title: "Люди",
    subtitle: "Понимание, обучение, отсутствие сопротивления",
    description: "Технологии не должны пугать команду"
  }, {
    name: "Процессы",
    color: "#DFF0F0",
    position: "bottom-left",
    title: "Процессы",
    subtitle: "Логика, куда ИИ действительно может встроиться",
    description: "Если решение ломает процесс — оно не внедряется"
  }, {
    name: "Бизнес",
    color: "#F6F3EB",
    position: "top-left",
    title: "Бизнес",
    subtitle: "Чёткие цели и измеримый эффект",
    description: "Понимание, что именно нужно изменить"
  }];

  return <section id="methodology" ref={ref} className="py-10 md:py-16 lg:py-20 px-6 md:px-20 max-w-[1360px] mx-auto bg-background">
      {/* Заголовок с линией */}
      <div className={`text-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="section-title text-center leading-tight">
          Мой метод, <span className="font-semibold">AI Synergy Framework</span>
        </h2>
        <div className="w-24 h-[2px] bg-primary mx-auto"></div>
      </div>

      {/* Подзаголовок */}
      <div className={`text-center mb-12 md:mb-16 transition-all duration-700 delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-handwriting animate-handwriting tracking-wide text-xl sm:text-2xl md:text-3xl">
          ИИ работает только тогда, когда совпадают: бизнес, процессы, люди и технологии.
        </p>
      </div>

      {/* Круговая схема */}
      <div className={`flex justify-center mb-12 md:mb-16 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative w-full max-w-[600px] md:max-w-[800px] mx-auto flex items-center justify-center" style={{ minHeight: '400px' }}>
          <svg viewBox="0 0 200 200" className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px]">
            {/* Сектор 0 - Технологии (верхний правый, голубой) */}
            <path d="M 100 100 L 100 0 A 100 100 0 0 1 200 100 Z" fill={sectors[0].color} className="transition-all duration-300 cursor-pointer touch-manipulation" style={{
            filter: hoveredSector === 0 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(73, 190, 216, 0.3))' : 'none',
            opacity: hoveredSector === null || hoveredSector === 0 ? 1 : 0.6
          }} onMouseEnter={() => window.innerWidth >= 1024 && setHoveredSector(0)} onMouseLeave={() => window.innerWidth >= 1024 && setHoveredSector(null)} onClick={() => handleSectorInteraction(0)} />
            
            {/* Сектор 1 - Люди (правый нижний, фиолетовый) */}
            <path d="M 100 100 L 200 100 A 100 100 0 0 1 100 200 Z" fill={sectors[1].color} className="transition-all duration-300 cursor-pointer touch-manipulation" style={{
            filter: hoveredSector === 1 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(232, 224, 245, 0.5))' : 'none',
            opacity: hoveredSector === null || hoveredSector === 1 ? 1 : 0.6
          }} onMouseEnter={() => window.innerWidth >= 1024 && setHoveredSector(1)} onMouseLeave={() => window.innerWidth >= 1024 && setHoveredSector(null)} onClick={() => handleSectorInteraction(1)} />
            
            {/* Сектор 2 - Процессы (нижний левый, мятный) */}
            <path d="M 100 100 L 100 200 A 100 100 0 0 1 0 100 Z" fill={sectors[2].color} className="transition-all duration-300 cursor-pointer touch-manipulation" style={{
            filter: hoveredSector === 2 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(223, 240, 240, 0.5))' : 'none',
            opacity: hoveredSector === null || hoveredSector === 2 ? 1 : 0.6
          }} onMouseEnter={() => window.innerWidth >= 1024 && setHoveredSector(2)} onMouseLeave={() => window.innerWidth >= 1024 && setHoveredSector(null)} onClick={() => handleSectorInteraction(2)} />
            
            {/* Сектор 3 - Бизнес (верхний левый, бежевый) */}
            <path d="M 100 100 L 0 100 A 100 100 0 0 1 100 0 Z" fill={sectors[3].color} className="transition-all duration-300 cursor-pointer touch-manipulation" style={{
            filter: hoveredSector === 3 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(227, 244, 249, 0.5))' : 'none',
            opacity: hoveredSector === null || hoveredSector === 3 ? 1 : 0.6
          }} onMouseEnter={() => window.innerWidth >= 1024 && setHoveredSector(3)} onMouseLeave={() => window.innerWidth >= 1024 && setHoveredSector(null)} onClick={() => handleSectorInteraction(3)} />
            
            {/* Текстовые метки с фоном */}
            {/* Технологии - верхний правый */}
            <g className="pointer-events-none">
              <rect x="125" y="35" width="50" height="20" rx="8" fill="white" fillOpacity="0.9" />
              <text x="150" y="48" textAnchor="middle" className="text-[11px] md:text-[13px] font-semibold" fill="#222222">
                Технологии
              </text>
            </g>
            
            {/* Люди - правый нижний */}
            <g className="pointer-events-none">
              <rect x="135" y="145" width="30" height="20" rx="8" fill="white" fillOpacity="0.9" />
              <text x="150" y="158" textAnchor="middle" className="text-[11px] md:text-[13px] font-semibold" fill="#222222">
                Люди
              </text>
            </g>
            
            {/* Процессы - нижний левый */}
            <g className="pointer-events-none">
              <rect x="25" y="145" width="50" height="20" rx="8" fill="white" fillOpacity="0.9" />
              <text x="50" y="158" textAnchor="middle" className="text-[11px] md:text-[13px] font-semibold" fill="#222222">
                Процессы
              </text>
            </g>
            
            {/* Бизнес - верхний левый */}
            <g className="pointer-events-none">
              <rect x="30" y="35" width="40" height="20" rx="8" fill="white" fillOpacity="0.9" />
              <text x="50" y="48" textAnchor="middle" className="text-[11px] md:text-[13px] font-semibold" fill="#222222">
                Бизнес
              </text>
            </g>
          </svg>
          
          {/* Всплывающие карточки для секторов */}
          {hoveredSector !== null && (
            <div 
              ref={cardRef}
              className={`absolute bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg animate-scale-fade-in z-20 w-[260px] sm:w-[300px]
                ${hoveredSector === 0 ? 'top-[5%] left-[calc(50%+120px)] sm:left-[calc(50%+180px)]' : ''}
                ${hoveredSector === 1 ? 'bottom-[5%] left-[calc(50%+120px)] sm:left-[calc(50%+180px)]' : ''}
                ${hoveredSector === 2 ? 'bottom-[5%] right-[calc(50%+120px)] sm:right-[calc(50%+180px)]' : ''}
                ${hoveredSector === 3 ? 'top-[5%] right-[calc(50%+120px)] sm:right-[calc(50%+180px)]' : ''}
              `}
            >
              <h4 className="text-lg sm:text-xl font-semibold text-text-heading mb-2">
                {sectors[hoveredSector].title}
              </h4>
              <p className="text-sm sm:text-base text-text-body mb-2 leading-relaxed">
                {sectors[hoveredSector].subtitle}
              </p>
              <p className="text-sm text-text-body/80 leading-relaxed">
                {sectors[hoveredSector].description}
              </p>
            </div>
          )}
          
          {/* Центральная надпись */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-white/90 rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-lg">
              <p className="text-[14px] md:text-[16px] font-semibold text-text-heading leading-tight px-4">
                AI Synergy<br />Framework
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Итоговая плашка */}
      <div className={`bg-white rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-700 delay-500 gradient-border gradient-border-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
          Результат: решения, которые работают годами, а не «умирают» через месяц.
        </p>
      </div>
    </section>;
};
export default AIFramework;