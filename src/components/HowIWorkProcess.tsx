import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "./ui/button";

const HowIWorkProcess = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const cards = [
    {
      emoji: "🧭",
      title: "Экспресс-аудит — первый шаг",
      subtitle: "30 минут, которые показывают:",
      points: [
        "где компания теряет деньги и время;",
        "что реально ускоряет процессы;",
        "где ИИ принесёт пользу, а где — нет;",
        "с чего начинать, чтобы эффект был быстрым."
      ],
      footer: "Стоимость: бесплатно.",
      bgColor: "#F0F9FB"
    },
    {
      emoji: "🧠",
      title: "AI-стратегия и архитектура решений",
      subtitle: "Что создаю:",
      points: [
        "дорожную карту внедрения;",
        "масштабируемую архитектуру;",
        "безопасные интеграции;",
        "выбор платформ без лоббирования."
      ],
      footer: "Результат: понимание, какие решения дадут эффект и в какой последовательности.",
      bgColor: "#F8F3FF"
    },
    {
      emoji: "🧩",
      title: "Сопровождение внедрения и независимая экспертиза",
      subtitle: "На стороне клиента:",
      points: [
        "проверяю подрядчиков и сметы;",
        "защищаю интересы бизнеса;",
        "контролирую качество внедрения;",
        "довожу проект до результата."
      ],
      footer: "",
      bgColor: "#F0F9FB"
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 overflow-hidden bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-text-heading">
              Как я работаю с компаниями
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`p-8 rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{
                  backgroundColor: card.bgColor,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h3 className="text-xl font-semibold mb-3 text-text-heading">
                  {card.title}
                </h3>
                <p className="text-base font-medium mb-3 text-text-body">
                  {card.subtitle}
                </p>
                <ul className="space-y-2 mb-4">
                  {card.points.map((point, idx) => (
                    <li key={idx} className="text-base text-text-body leading-relaxed flex">
                      <span className="mr-2">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {card.footer && (
                  <p className="text-base font-medium text-primary mt-4">
                    {card.footer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* CTA Block */}
          <div 
            className={`text-center p-10 rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{
              background: 'linear-gradient(135deg, #F0F9FB 0%, #F8F3FF 100%)',
              animationDelay: '0.4s'
            }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-text-heading">
              Узнать, что можно автоматизировать в вашей компании
            </h3>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Записаться на бесплатный экспресс-аудит
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIWorkProcess;
