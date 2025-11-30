import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
const AIFramework = () => {
  const {
    ref,
    isVisible
  } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);

  // Маппинг между секторами круга и карточками
  const sectorToPillar: {
    [key: number]: number;
  } = {
    0: 3,
    1: 2,
    2: 1,
    3: 0
  };
  const pillarToSector: {
    [key: number]: number;
  } = {
    0: 3,
    1: 2,
    2: 1,
    3: 0
  };
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
  const pillars = [{
    title: "Фокус на цели бизнеса",
    points: ["Сначала: зачем это компании?", "Потом: какие решения подойдут?", "Считаю эффект до старта."]
  }, {
    title: "Инженерное мышление",
    points: ["Проектирую систему, а не набор инструментов.", "Если решение ломает процессы — оно не внедряется."]
  }, {
    title: "Люди в центре",
    points: ["Объясняю, обучаю, снимаю сопротивление.", "Технологии не должны пугать."]
  }, {
    title: "Этика и честность",
    points: ["Не беру хайп-проекты ради галочки.", "Если автоматизация не окупится — говорю сразу."]
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
        <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px] mx-auto min-h-[400px] md:min-h-[500px]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Сектор 0 - Технологии (верхний правый, голубой) */}
            <path d="M 100 100 L 100 0 A 100 100 0 0 1 200 100 Z" fill={sectors[0].color} className="transition-all duration-300 cursor-pointer" style={{
            filter: hoveredSector === 0 || (hoveredPillar !== null && pillarToSector[hoveredPillar] === 0) ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(73, 190, 216, 0.3))' : 'none',
            opacity: (hoveredSector === null && hoveredPillar === null) || hoveredSector === 0 || pillarToSector[hoveredPillar] === 0 ? 1 : 0.6
          }} onMouseEnter={() => setHoveredSector(0)} onMouseLeave={() => setHoveredSector(null)} onClick={() => setHoveredSector(hoveredSector === 0 ? null : 0)} />
            
            {/* Сектор 1 - Люди (правый нижний, фиолетовый) */}
            <path d="M 100 100 L 200 100 A 100 100 0 0 1 100 200 Z" fill={sectors[1].color} className="transition-all duration-300 cursor-pointer" style={{
            filter: hoveredSector === 1 || (hoveredPillar !== null && pillarToSector[hoveredPillar] === 1) ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(232, 224, 245, 0.5))' : 'none',
            opacity: (hoveredSector === null && hoveredPillar === null) || hoveredSector === 1 || pillarToSector[hoveredPillar] === 1 ? 1 : 0.6
          }} onMouseEnter={() => setHoveredSector(1)} onMouseLeave={() => setHoveredSector(null)} onClick={() => setHoveredSector(hoveredSector === 1 ? null : 1)} />
            
            {/* Сектор 2 - Процессы (нижний левый, мятный) */}
            <path d="M 100 100 L 100 200 A 100 100 0 0 1 0 100 Z" fill={sectors[2].color} className="transition-all duration-300 cursor-pointer" style={{
            filter: hoveredSector === 2 || (hoveredPillar !== null && pillarToSector[hoveredPillar] === 2) ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(223, 240, 240, 0.5))' : 'none',
            opacity: (hoveredSector === null && hoveredPillar === null) || hoveredSector === 2 || pillarToSector[hoveredPillar] === 2 ? 1 : 0.6
          }} onMouseEnter={() => setHoveredSector(2)} onMouseLeave={() => setHoveredSector(null)} onClick={() => setHoveredSector(hoveredSector === 2 ? null : 2)} />
            
            {/* Сектор 3 - Бизнес (верхний левый, бежевый) */}
            <path d="M 100 100 L 0 100 A 100 100 0 0 1 100 0 Z" fill={sectors[3].color} className="transition-all duration-300 cursor-pointer" style={{
            filter: hoveredSector === 3 || (hoveredPillar !== null && pillarToSector[hoveredPillar] === 3) ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(227, 244, 249, 0.5))' : 'none',
            opacity: (hoveredSector === null && hoveredPillar === null) || hoveredSector === 3 || pillarToSector[hoveredPillar] === 3 ? 1 : 0.6
          }} onMouseEnter={() => setHoveredSector(3)} onMouseLeave={() => setHoveredSector(null)} onClick={() => setHoveredSector(hoveredSector === 3 ? null : 3)} />
            
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
              className={`absolute bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg transition-all duration-300 animate-fade-in z-20 max-w-[280px] sm:max-w-[320px]
                ${hoveredSector === 0 ? 'right-[-120px] sm:right-[-160px] top-[50%] -translate-y-1/2' : ''}
                ${hoveredSector === 1 ? 'bottom-[-140px] sm:bottom-[-160px] left-[50%] -translate-x-1/2' : ''}
                ${hoveredSector === 2 ? 'left-[-120px] sm:left-[-160px] top-[50%] -translate-y-1/2' : ''}
                ${hoveredSector === 3 ? 'top-[-140px] sm:top-[-160px] left-[50%] -translate-x-1/2' : ''}
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

      {/* 4 карточки-столпа */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {pillars.map((pillar, index) => <div key={index} className={`rounded-2xl p-4 sm:p-6 shadow-card transition-all duration-300 cursor-pointer gradient-border-gray gradient-border-gray-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{
        backgroundColor: 'hsl(var(--gray-50))',
        transitionDelay: `${200 + index * 75}ms`,
        transform: hoveredPillar === index ? 'scale(1.05)' : 'scale(1)',
        boxShadow: hoveredPillar === index ? '0 4px 12px rgba(73, 190, 216, 0.15)' : 'var(--shadow-card)',
        opacity: hoveredPillar === null || hoveredPillar === index ? 1 : 0.7
      }} onMouseEnter={() => setHoveredPillar(index)} onMouseLeave={() => setHoveredPillar(null)}>
            <h3 className="text-2xl font-medium text-text-heading mb-4">
              {pillar.title}
            </h3>
            <div className="space-y-3">
              {pillar.points.map((point, idx) => <p key={idx} className="text-lg text-text-body leading-relaxed">
                  {point}
                </p>)}
            </div>
          </div>)}
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