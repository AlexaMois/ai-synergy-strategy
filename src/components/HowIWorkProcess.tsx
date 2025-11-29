import { Button } from "./ui/button";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Search, LayoutDashboard, ShieldCheck } from "lucide-react";
import { AVAILABLE_SLOTS_THIS_WEEK } from "@/config/availability";

const HowIWorkProcess = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const cards = [
    {
      icon: Search,
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
      icon: LayoutDashboard,
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
      icon: ShieldCheck,
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
            <h2 className="section-title text-center leading-tight">
              Как я работаю с компаниями, <span className="font-semibold">три этапа</span>
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-[20px] shadow-card transition-all duration-300 hover:shadow-hover hover:-translate-y-1 hover:scale-[1.02] hover:bg-primary-light/30 gradient-border-gray gradient-border-gray-hover ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{
                    backgroundColor: 'hsl(var(--gray-50))',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Icon - minimal business style */}
                  <div className="flex justify-center mb-6">
                    <Icon className="w-9 h-9" style={{ color: '#49BED8' }} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-medium mb-3 text-text-heading text-center">
                    {card.title}
                  </h3>
                  <p className="text-handwriting mb-3">
                    {card.subtitle}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {card.points.map((point, idx) => (
                      <li key={idx} className="text-lg text-text-body leading-relaxed flex">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  {card.footer && (
                    <p className="text-lg font-semibold text-primary mt-4">
                      {card.footer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Block */}
          <div 
            className={`text-center p-10 rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] bg-white gradient-border gradient-border-hover ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{
              animationDelay: '0.4s'
            }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-text-heading">
              Узнать, что можно автоматизировать в вашей компании
            </h3>
            <div className="flex flex-col gap-2 items-center">
              <Button
                size="lg"
                asChild
              >
                <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                  Записаться на бесплатный экспресс-аудит
                </a>
              </Button>
              <AvailabilityBadge slotsAvailable={AVAILABLE_SLOTS_THIS_WEEK} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIWorkProcess;
