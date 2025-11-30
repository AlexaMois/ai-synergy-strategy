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
    position: "right"
  }, {
    name: "Люди",
    color: "#E8E0F5",
    position: "bottom-right"
  }, {
    name: "Процессы",
    color: "#DFF0F0",
    position: "bottom-left"
  }, {
    name: "Бизнес",
    color: "#F6F3EB",
    position: "top-left"
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
        <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px] mx-auto">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Сектор 0 - Технологии (верхний правый, голубой) */}
            <path d="M 100 100 L 100 0 A 100 100 0 0 1 200 100 Z" fill={sectors[0].color} className="transition-all duration-300 cursor-pointer" style={{
            filter: hoveredPillar !== null && pillarToSector[hoveredPillar] === 0 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(73, 190, 216, 0.3))' : 'none',
            opacity: hoveredPillar === null || pillarToSector[hoveredPillar] === 0 ? 1 : 0.6
          }} onMouseEnter={() => setHoveredPillar(sectorToPillar[0])} onMouseLeave={() => setHoveredPillar(null)} />
            {/* Сектор 1 - Люди (правый нижний, фиолетовый) */}
            <path d="M 100 100 L 200 100 A 100 100 0 0 1 100 200 Z" fill={sectors[1].color} className="transition-all duration-300 cursor-pointer" style={{
            filter: hoveredPillar !== null && pillarToSector[hoveredPillar] === 1 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(232, 224, 245, 0.5))' : 'none',
            opacity: hoveredPillar === null || pillarToSector[hoveredPillar] === 1 ? 1 : 0.6
          }} onMouseEnter={() => setHoveredPillar(sectorToPillar[1])} onMouseLeave={() => setHoveredPillar(null)} />
            {/* Сектор 2 - Процессы (нижний левый, мятный) */}
            <path d="M 100 100 L 100 200 A 100 100 0 0 1 0 100 Z" fill={sectors[2].color} className="transition-all duration-300 cursor-pointer" style={{
            filter: hoveredPillar !== null && pillarToSector[hoveredPillar] === 2 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(223, 240, 240, 0.5))' : 'none',
            opacity: hoveredPillar === null || pillarToSector[hoveredPillar] === 2 ? 1 : 0.6
          }} onMouseEnter={() => setHoveredPillar(sectorToPillar[2])} onMouseLeave={() => setHoveredPillar(null)} />
            {/* Сектор 3 - Бизнес (верхний левый, бежевый) */}
            <path d="M 100 100 L 0 100 A 100 100 0 0 1 100 0 Z" fill={sectors[3].color} className="transition-all duration-300 cursor-pointer" style={{
            filter: hoveredPillar !== null && pillarToSector[hoveredPillar] === 3 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(227, 244, 249, 0.5))' : 'none',
            opacity: hoveredPillar === null || pillarToSector[hoveredPillar] === 3 ? 1 : 0.6
          }} onMouseEnter={() => setHoveredPillar(sectorToPillar[3])} onMouseLeave={() => setHoveredPillar(null)} />
          </svg>
          
          {/* Центральная надпись */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-white/90 rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-lg">
              <p className="text-[14px] md:text-[16px] font-semibold text-text-heading leading-tight px-4">
                AI Synergy<br />Framework
              </p>
            </div>
          </div>

          {/* Статичные подписи секторов - симметрично вокруг круга (скрыты на мобильных) */}
          {/* Бизнес - верхний левый (кремовый сектор) */}
          <div className="hidden sm:block absolute left-[-75px] top-[-40px] bg-white px-3 py-1.5 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-text-heading whitespace-nowrap">Бизнес</p>
          </div>
          
          {/* Технологии - верхний правый (голубой сектор) */}
          <div className="hidden sm:block absolute right-[-75px] top-[-40px] bg-white px-3 py-1.5 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-text-heading whitespace-nowrap">Технологии</p>
          </div>
          
          {/* Процессы - нижний левый (мятный сектор) */}
          <div className="hidden sm:block absolute left-[-75px] bottom-[-40px] bg-white px-3 py-1.5 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-text-heading whitespace-nowrap">Процессы</p>
          </div>
          
          {/* Люди - нижний правый (лавандовый сектор) */}
          <div className="hidden sm:block absolute right-[-75px] bottom-[-40px] bg-white px-3 py-1.5 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-text-heading whitespace-nowrap">Люди</p>
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