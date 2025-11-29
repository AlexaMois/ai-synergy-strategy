import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const WhoIAm = () => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const rightCards = [
    {
      title: "CEO-мышление: система, прибыль, управляемость."
    },
    {
      title: "Технологии: архитектура, API, безопасные контуры, LLM."
    },
    {
      title: "Люди: обучение, коммуникации, снятие страха."
    }
  ];

  return (
    <section 
      ref={ref}
      className="py-16 md:py-20 px-6 md:px-20 max-w-[1360px] mx-auto bg-[#FAFBFC]"
    >
      {/* Заголовок с линией */}
      <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="text-[32px] md:text-[42px] font-semibold text-[#222222] mb-4">
          Кто я и почему ко мне приходят
        </h2>
        <div className="w-24 h-[2px] bg-[#49BED8] mx-auto"></div>
      </div>

      {/* Двухколоночный блок */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Левая колонка - большая карточка */}
        <div 
          className={`bg-[#F1F4F5] rounded-2xl p-8 md:p-10 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-700 delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-[20px] md:text-[24px] leading-relaxed text-[#222222] font-medium">
            Я инженер по внедрению ИИ, а не продавец технологий.<br/><br/>
            15 лет — в управлении, финансах, операционке.<br/><br/>
            Знаю, как устроены процессы изнутри — не по презентациям.
          </p>
        </div>

        {/* Правая часть - три узкие карточки */}
        <div className="grid grid-cols-1 gap-6">
          {rightCards.map((card, index) => (
            <div
              key={index}
              className={`bg-[#F1F4F5] rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-700 hover:shadow-[0_6px_16px_rgba(0,0,0,0.04)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ 
                transitionDelay: `${150 + index * 75}ms`
              }}
            >
              <p className="text-[17px] md:text-[18px] text-[#222222] font-medium leading-relaxed">
                {card.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Акцентная плашка внизу */}
      <div className={`bg-[#49BED8] rounded-2xl p-6 md:p-8 text-center shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-[18px] md:text-[20px] font-semibold text-white">
          Моя цель — не внедрить "что-то модное", а усилить бизнес.
        </p>
      </div>
    </section>
  );
};

export default WhoIAm;
