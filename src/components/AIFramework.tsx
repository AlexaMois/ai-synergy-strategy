import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const AIFramework = () => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [hoveredSector, setHoveredSector] = useState<number | null>(null);

  const sectors = [
    { name: "Бизнес", color: "#D4EDFC" },
    { name: "Процессы", color: "#E8E0F5" },
    { name: "Люди", color: "#DFF0F0" },
    { name: "Технологии", color: "#E3F4F9" }
  ];

  const pillars = [
    {
      title: "Фокус на цели бизнеса",
      points: [
        "Сначала: зачем это компании?",
        "Потом: какие решения подойдут?",
        "Считаю эффект до старта."
      ],
      color: "bg-[#D4EDFC]"
    },
    {
      title: "Инженерное мышление",
      points: [
        "Проектирую систему, а не набор инструментов.",
        "Если решение ломает процессы — оно не внедряется."
      ],
      color: "bg-[#E8E0F5]"
    },
    {
      title: "Люди в центре",
      points: [
        "Объясняю, обучаю, снимаю сопротивление.",
        "Технологии не должны пугать."
      ],
      color: "bg-[#DFF0F0]"
    },
    {
      title: "Этика и честность",
      points: [
        "Не беру хайп-проекты ради галочки.",
        "Если автоматизация не окупится — говорю сразу."
      ],
      color: "bg-[#F6F3EB]"
    }
  ];

  return (
    <section 
      id="methodology"
      ref={ref}
      className="py-20 px-6 md:px-20 max-w-[1360px] mx-auto bg-background"
    >
      {/* Заголовок с линией */}
      <div className={`text-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="section-title text-center">
          Мой метод: AI Synergy Framework
        </h2>
        <div className="w-24 h-[2px] bg-[#49BED8] mx-auto"></div>
      </div>

      {/* Подзаголовок */}
      <p className={`text-handwriting text-center mb-12 md:mb-16 tracking-wide transition-all duration-700 delay-75 ${isVisible ? 'opacity-100 translate-y-0 animate-handwriting' : 'opacity-0 translate-y-4'}`}>
        ИИ РАБОТАЕТ ТОЛЬКО ТОГДА, КОГДА СОВПАДАЮТ: БИЗНЕС, ПРОЦЕССЫ, ЛЮДИ И ТЕХНОЛОГИИ.
      </p>

      {/* Круговая схема */}
      <div className={`flex justify-center mb-12 md:mb-16 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Сектор 1 - Бизнес */}
            <path
              d="M 100 100 L 100 0 A 100 100 0 0 1 200 100 Z"
              fill={sectors[0].color}
              className="transition-all duration-300 cursor-pointer"
              style={{
                filter: hoveredSector === 0 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(73, 190, 216, 0.3))' : 'none',
                opacity: hoveredSector === null || hoveredSector === 0 ? 1 : 0.6
              }}
              onMouseEnter={() => setHoveredSector(0)}
              onMouseLeave={() => setHoveredSector(null)}
            />
            {/* Сектор 2 - Процессы */}
            <path
              d="M 100 100 L 200 100 A 100 100 0 0 1 100 200 Z"
              fill={sectors[1].color}
              className="transition-all duration-300 cursor-pointer"
              style={{
                filter: hoveredSector === 1 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(232, 224, 245, 0.5))' : 'none',
                opacity: hoveredSector === null || hoveredSector === 1 ? 1 : 0.6
              }}
              onMouseEnter={() => setHoveredSector(1)}
              onMouseLeave={() => setHoveredSector(null)}
            />
            {/* Сектор 3 - Люди */}
            <path
              d="M 100 100 L 100 200 A 100 100 0 0 1 0 100 Z"
              fill={sectors[2].color}
              className="transition-all duration-300 cursor-pointer"
              style={{
                filter: hoveredSector === 2 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(223, 240, 240, 0.5))' : 'none',
                opacity: hoveredSector === null || hoveredSector === 2 ? 1 : 0.6
              }}
              onMouseEnter={() => setHoveredSector(2)}
              onMouseLeave={() => setHoveredSector(null)}
            />
            {/* Сектор 4 - Технологии */}
            <path
              d="M 100 100 L 0 100 A 100 100 0 0 1 100 0 Z"
              fill={sectors[3].color}
              className="transition-all duration-300 cursor-pointer"
              style={{
                filter: hoveredSector === 3 ? 'brightness(1.15) drop-shadow(0 4px 12px rgba(227, 244, 249, 0.5))' : 'none',
                opacity: hoveredSector === null || hoveredSector === 3 ? 1 : 0.6
              }}
              onMouseEnter={() => setHoveredSector(3)}
              onMouseLeave={() => setHoveredSector(null)}
            />
          </svg>
          
          {/* Центральная надпись */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-white/90 rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-lg">
              <p className="text-[14px] md:text-[16px] font-semibold text-[#222222] leading-tight px-4">
                AI Synergy<br/>Framework
              </p>
            </div>
          </div>

          {/* Tooltip */}
          {hoveredSector !== null && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
              <div className="bg-[#222222] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in text-center whitespace-nowrap">
                <p className="text-[14px] md:text-[16px] font-medium">
                  {sectors[hoveredSector].name}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4 карточки-столпа */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className={`${pillar.color} rounded-2xl p-6 shadow-card transition-all duration-300 cursor-pointer ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              transitionDelay: `${200 + index * 75}ms`,
              transform: hoveredSector === index ? 'scale(1.05)' : 'scale(1)',
              boxShadow: hoveredSector === index 
                ? '0 4px 12px rgba(73, 190, 216, 0.15)' 
                : 'var(--shadow-card)',
              opacity: hoveredSector === null || hoveredSector === index ? 1 : 0.7
            }}
            onMouseEnter={() => setHoveredSector(index)}
            onMouseLeave={() => setHoveredSector(null)}
          >
            <h3 className="text-lg font-medium text-[#222222] mb-4">
              {pillar.title}
            </h3>
            <div className="space-y-3">
              {pillar.points.map((point, idx) => (
                <p key={idx} className="text-base text-[#444444] leading-relaxed">
                  {point}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Итоговая плашка */}
      <div className={`bg-gradient-to-r from-[#D4EDFC] to-[#E8E0F5] rounded-2xl p-6 md:p-8 text-center shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-[18px] md:text-[20px] font-medium text-[#222222]">
          <span className="text-[#49BED8] font-semibold">Результат:</span> решения, которые работают годами, а не «умирают» через месяц.
        </p>
      </div>
    </section>
  );
};

export default AIFramework;
