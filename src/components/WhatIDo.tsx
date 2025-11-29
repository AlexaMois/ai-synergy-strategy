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
      className="relative py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F8FCFD 0%, #F9F8FD 100%)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="section-title text-center">
              Что я делаю и чем отличаюсь
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto"></div>
          </div>

          <div className="space-y-6">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className={`p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{
                    background: 'linear-gradient(135deg, #FAFBFC 0%, #F8F9FB 100%)',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-4 text-text-heading">
                        {card.title}
                      </h3>
                      <p className="text-base text-text-body leading-[1.7]">
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
