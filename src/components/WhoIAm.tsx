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
      className="py-20 px-6 md:px-20 max-w-[1360px] mx-auto bg-white"
    >
      {/* Заголовок с линией */}
      <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="section-title text-center leading-tight">
          Кто я, <span className="font-semibold">и почему ко мне приходят</span>
        </h2>
        <div className="w-24 h-[2px] bg-primary mx-auto"></div>
      </div>

      {/* Двухколоночный блок */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Левая колонка - большая карточка */}
        <div 
          className={`rounded-2xl p-6 flex items-center justify-center shadow-card transition-all duration-700 delay-75 gradient-border-gray gradient-border-gray-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ backgroundColor: 'hsl(var(--gray-50))' }}
        >
          <p className="text-lg leading-relaxed text-text-heading font-normal">
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
              className={`rounded-2xl p-6 shadow-card transition-all duration-700 hover:shadow-hover hover:scale-[1.02] hover:bg-primary-light/30 gradient-border-gray gradient-border-gray-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ 
                backgroundColor: 'hsl(var(--gray-50))',
                transitionDelay: `${150 + index * 75}ms`
              }}
            >
              <p className="text-lg text-text-heading font-normal leading-relaxed">
                {card.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Акцентная плашка внизу */}
      <div className={`bg-primary rounded-2xl p-6 text-center shadow-card transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-lg font-medium text-white">
          Моя цель — не внедрить "что-то модное", а усилить бизнес.
        </p>
      </div>
    </section>
  );
};

export default WhoIAm;
