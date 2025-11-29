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
      id="what-i-do"
      ref={ref}
      className="relative py-20 overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-10 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="section-title text-center">
              Что я делаю и чем отличаюсь
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto"></div>
          </div>

          <div className="space-y-5">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className={`p-5 rounded-2xl shadow-card ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    backgroundColor: 'hsl(var(--bg-light-blue))'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 max-w-[700px]">
                      <h3 className="text-lg font-medium mb-2 text-text-heading">
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
