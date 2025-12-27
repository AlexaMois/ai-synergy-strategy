import { Button } from "@/components/ui/button";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { Search, LayoutDashboard, ShieldCheck } from "lucide-react";
import { AVAILABLE_SLOTS_THIS_WEEK } from "@/config/availability";

const HowIWorkProcess = () => {
  const { ref, getStaggeredClass } = useMobileAnimations({ threshold: 0.2 });

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
      className="relative py-10 md:py-16 lg:py-20 overflow-hidden bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 ${getStaggeredClass(0, 'animate-fade-in-up')}`}>
            <h2 className="section-title text-center leading-tight">
              Как я работаю с компаниями, <span className="font-semibold">три этапа</span>
            </h2>
            <div className="w-24 h-px bg-border mx-auto"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className={`p-4 sm:p-6 rounded-[20px] shadow-soft transition-all duration-300 hover:shadow-card hover:bg-primary/10 border border-border bg-muted ${getStaggeredClass(index + 1)}`}
                >
                  {/* Icon - minimal business style */}
                  <div className="flex justify-center mb-6">
                    <Icon className="w-9 h-9" style={{ color: '#49BED8' }} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="mb-3 text-center">
                    {card.title}
                  </h3>
                  <p className="text-handwriting mb-3">
                    {card.subtitle}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {card.points.map((point, idx) => (
                      <li key={idx} className="text-lg text-foreground leading-relaxed flex">
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
            className={`text-center p-10 rounded-[24px] shadow-soft bg-card border border-border hover:shadow-card ${getStaggeredClass(4)}`}
          >
            <h3 className="section-title mb-6 text-center">
              Узнать, что можно автоматизировать <span className="font-semibold">в вашей компании</span>
            </h3>
            <div className="flex flex-col gap-2 items-center">
              <Button
                size="lg"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    const navHeight = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                  }
                }}
              >
                Обсудить задачу
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
