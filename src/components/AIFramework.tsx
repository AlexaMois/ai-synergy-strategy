import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const AIFramework = () => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

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
      ref={ref}
      className="py-16 md:py-20 px-6 md:px-20 max-w-[1360px] mx-auto"
    >
      {/* Заголовок с линией */}
      <div className={`text-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="text-[32px] md:text-[42px] font-semibold text-[#222222] mb-4">
          Мой метод: AI Synergy Framework
        </h2>
        <div className="w-24 h-[2px] bg-[#49BED8] mx-auto"></div>
      </div>

      {/* Подзаголовок */}
      <p className={`text-center text-[16px] md:text-[18px] text-[#6A6A6A] mb-12 md:mb-16 transition-all duration-700 delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        ИИ работает только тогда, когда совпадают: бизнес → процессы → люди → технологии.
      </p>

      {/* Круговая схема */}
      <div className={`flex justify-center mb-12 md:mb-16 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Сектор 1 - голубой */}
            <path
              d="M 100 100 L 100 0 A 100 100 0 0 1 200 100 Z"
              fill="#D4EDFC"
              className="transition-all duration-300 hover:opacity-80"
            />
            {/* Сектор 2 - светло-сиреневый */}
            <path
              d="M 100 100 L 200 100 A 100 100 0 0 1 100 200 Z"
              fill="#E8E0F5"
              className="transition-all duration-300 hover:opacity-80"
            />
            {/* Сектор 3 - серо-бирюзовый */}
            <path
              d="M 100 100 L 100 200 A 100 100 0 0 1 0 100 Z"
              fill="#DFF0F0"
              className="transition-all duration-300 hover:opacity-80"
            />
            {/* Сектор 4 - светло-голубой */}
            <path
              d="M 100 100 L 0 100 A 100 100 0 0 1 100 0 Z"
              fill="#E3F4F9"
              className="transition-all duration-300 hover:opacity-80"
            />
          </svg>
          
          {/* Центральная надпись */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-white/90 rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-lg">
              <p className="text-[14px] md:text-[16px] font-semibold text-[#222222] leading-tight px-4">
                AI Synergy<br/>Framework
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 карточки-столпа */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className={`${pillar.color} rounded-2xl p-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-700 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:scale-[1.02] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${200 + index * 75}ms` }}
          >
            <h3 className="text-[20px] md:text-[24px] font-semibold text-[#222222] mb-4">
              {pillar.title}
            </h3>
            <div className="space-y-3">
              {pillar.points.map((point, idx) => (
                <p key={idx} className="text-[15px] md:text-[16px] text-[#444444] leading-relaxed">
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
