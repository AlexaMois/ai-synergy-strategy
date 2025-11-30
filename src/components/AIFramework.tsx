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
  const [hoveredSector, setHoveredSector] = useState<number | null>(0);
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
    subtitle: "безопасная и масштабируемая архитектура",
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
    subtitle: "логика, в которую ИИ действительно может встроиться",
    description: "Если решение ломает процесс — оно не внедряется"
  }, {
    name: "Бизнес",
    color: "#F6F3EB",
    position: "top-left",
    title: "Бизнес",
    subtitle: "чёткие цели и измеримый эффект",
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
          ИИ работает только тогда, когда совпадают четыре элемента
        </p>
      </div>

      {/* Мобильная версия - 4 простых карточки */}
      <div className={`lg:hidden grid grid-cols-2 gap-4 mb-8 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {sectors.map((sector, index) => (
          <div 
            key={index}
            className="p-4 rounded-xl shadow-card gradient-border"
            style={{ backgroundColor: sector.color }}
          >
            <h4 className="font-semibold text-text-heading mb-2 text-base">
              {sector.title}
            </h4>
            <p className="text-sm text-text-body leading-relaxed">
              {sector.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Десктопная версия - Круговая схема */}
      <div className={`hidden lg:flex justify-center mb-12 lg:mb-16 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative w-full max-w-[600px] md:max-w-[800px] mx-auto flex flex-col items-center justify-center" style={{ minHeight: '400px' }}>
          
          <svg viewBox="0 0 200 200" className="w-[300px] h-[300px] lg:w-[360px] lg:h-[360px]">
            {/* Анимированная пунктирная обводка для индикации интерактивности */}
            <circle 
              cx="100" 
              cy="100" 
              r="102" 
              fill="none" 
              stroke="#49BED8" 
              strokeWidth="1.5" 
              strokeDasharray="6 4"
              opacity="0.4"
              className="animate-[spin_20s_linear_infinite]"
            />
            
            {/* Сектор 0 - Технологии (верхний правый, голубой) */}
            <path d="M 100 100 L 100 0 A 100 100 0 0 1 200 100 Z" fill={sectors[0].color} className="transition-all duration-300 cursor-pointer touch-manipulation" style={{
            filter: hoveredSector === 0 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(73, 190, 216, 0.3))' : 'none',
            opacity: hoveredSector === null || hoveredSector === 0 ? 1 : 0.6,
            transform: hoveredSector === 0 ? 'scale(1.02)' : 'scale(1)',
            transformOrigin: '100px 100px'
          }} onMouseEnter={() => setHoveredSector(0)} onMouseLeave={() => setHoveredSector(null)} onClick={() => handleSectorInteraction(0)} />
            
            {/* Сектор 1 - Люди (правый нижний, фиолетовый) */}
            <path d="M 100 100 L 200 100 A 100 100 0 0 1 100 200 Z" fill={sectors[1].color} className="transition-all duration-300 cursor-pointer touch-manipulation" style={{
            filter: hoveredSector === 1 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(232, 224, 245, 0.5))' : 'none',
            opacity: hoveredSector === null || hoveredSector === 1 ? 1 : 0.6,
            transform: hoveredSector === 1 ? 'scale(1.02)' : 'scale(1)',
            transformOrigin: '100px 100px'
          }} onMouseEnter={() => setHoveredSector(1)} onMouseLeave={() => setHoveredSector(null)} onClick={() => handleSectorInteraction(1)} />
            
            {/* Сектор 2 - Процессы (нижний левый, мятный) */}
            <path d="M 100 100 L 100 200 A 100 100 0 0 1 0 100 Z" fill={sectors[2].color} className="transition-all duration-300 cursor-pointer touch-manipulation" style={{
            filter: hoveredSector === 2 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(223, 240, 240, 0.5))' : 'none',
            opacity: hoveredSector === null || hoveredSector === 2 ? 1 : 0.6,
            transform: hoveredSector === 2 ? 'scale(1.02)' : 'scale(1)',
            transformOrigin: '100px 100px'
          }} onMouseEnter={() => setHoveredSector(2)} onMouseLeave={() => setHoveredSector(null)} onClick={() => handleSectorInteraction(2)} />
            
            {/* Сектор 3 - Бизнес (верхний левый, бежевый) */}
            <path d="M 100 100 L 0 100 A 100 100 0 0 1 100 0 Z" fill={sectors[3].color} className="transition-all duration-300 cursor-pointer touch-manipulation" style={{
            filter: hoveredSector === 3 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(227, 244, 249, 0.5))' : 'none',
            opacity: hoveredSector === null || hoveredSector === 3 ? 1 : 0.6,
            transform: hoveredSector === 3 ? 'scale(1.02)' : 'scale(1)',
            transformOrigin: '100px 100px'
          }} onMouseEnter={() => setHoveredSector(3)} onMouseLeave={() => setHoveredSector(null)} onClick={() => handleSectorInteraction(3)} />
            
            {/* Текстовые метки - только текст, насыщенные цвета, строго по центрам секторов */}
            {/* Технологии - верхний правый (центр сектора) */}
            <text x="150" y="53" textAnchor="middle" className="text-[12px] font-bold pointer-events-none" fill="#0891B2" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}>
              Технологии
            </text>
            
            {/* Люди - нижний правый (центр сектора) */}
            <text x="150" y="153" textAnchor="middle" className="text-[12px] font-bold pointer-events-none" fill="#7C3AED" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}>
              Люди
            </text>
            
            {/* Процессы - нижний левый (центр сектора) */}
            <text x="50" y="153" textAnchor="middle" className="text-[12px] font-bold pointer-events-none" fill="#0D9488" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}>
              Процессы
            </text>
            
            {/* Бизнес - верхний левый (центр сектора) */}
            <text x="50" y="53" textAnchor="middle" className="text-[12px] font-bold pointer-events-none" fill="#D97706" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}>
              Бизнес
            </text>
          </svg>
          
          {/* Всплывающие карточки для секторов */}
          {hoveredSector !== null && (
            <div 
              ref={cardRef}
              className={`absolute bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg z-20 w-[300px] animate-scale-fade-in
                ${hoveredSector === 0 ? 'top-[5%] left-[calc(50%+180px)]' : ''}
                ${hoveredSector === 1 ? 'bottom-[5%] left-[calc(50%+180px)]' : ''}
                ${hoveredSector === 2 ? 'bottom-[5%] right-[calc(50%+180px)]' : ''}
                ${hoveredSector === 3 ? 'top-[5%] right-[calc(50%+180px)]' : ''}
              `}
            >
              <h4 className="text-xl font-semibold text-text-heading mb-2">
                {sectors[hoveredSector].title}
              </h4>
              <p className="text-base text-text-body mb-2 leading-relaxed">
                {sectors[hoveredSector].subtitle}
              </p>
              <p className="text-sm text-text-body/80 leading-relaxed">
                {sectors[hoveredSector].description}
              </p>
            </div>
          )}
          
          {/* Центральная надпись - уменьшена */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-white/90 rounded-full w-32 h-32 flex items-center justify-center shadow-lg">
              <p className="text-[14px] font-semibold text-text-heading leading-tight px-3">
                AI Synergy<br />Framework
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Итоговая плашка */}
      <div className={`bg-white rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-700 delay-500 gradient-border gradient-border-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
          Итог: решения, которые живут годами и усиливают компанию, а не превращаются в игрушки на месяц
        </p>
      </div>
    </section>;
};
export default AIFramework;