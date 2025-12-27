import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Settings, TrendingUp, Users } from "lucide-react";

const WhatIDo = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const cards = [
    {
      icon: Settings,
      title: "Инженерное проектирование, а не \"боты ради ботов\"",
      text: "Создаю архитектуру решений: Make, n8n, российские LLM, закрытые контуры, API, RAG, BPM-системы. Чётко отличаю одноразовые \"конструкторы\" от инженерных систем."
    },
    {
      icon: TrendingUp,
      title: "Фокус на экономике и управленческом эффекте",
      text: "Считаю ROI до старта внедрения. Показываю, что даст эффект за 2 недели, а что лучше не трогать."
    },
    {
      icon: Users,
      title: "Ясность для команды и отсутствие страха перед ИИ",
      text: "Объясняю простым языком. Включаю сотрудников, снимаю тревожность, провожу обучение. ИИ работает, когда люди понимают, зачем он нужен."
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-10 md:py-16 lg:py-20 overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="section-title text-center leading-tight">
              Что я делаю: <span className="font-semibold">от диагностики до доведения решений до результата</span>
            </h2>
            <div className="w-24 h-px bg-border mx-auto"></div>
          </div>

          <div className="space-y-6">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className={`p-4 sm:p-6 rounded-2xl shadow-soft transition-all duration-300 hover:shadow-card hover:bg-primary/10 border border-border bg-muted ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-4">
                        {card.title}
                      </h3>
                      <p className="text-lg text-foreground leading-relaxed">
                        {card.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
