import { Award, TrendingUp, Building2, Target } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Trust = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const facts = [
    {
      icon: Award,
      text: "Член Национальной Федерации ИИ",
    },
    {
      icon: TrendingUp,
      text: "ROI внедрений 200–400%",
    },
    {
      icon: Building2,
      text: "Резидент IT-Парк Казань",
    },
    {
      icon: Target,
      text: 'Победитель "Бизнес-Успех 2024"',
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {facts.map((fact, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">
                <fact.icon className="w-8 h-8 text-accent" />
              </div>
              <p className="font-medium text-sm leading-tight">{fact.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
