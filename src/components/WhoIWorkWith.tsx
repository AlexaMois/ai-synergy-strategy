import { Briefcase, Shield, GraduationCap } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const WhoIWorkWith = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const clients = [
    {
      icon: Briefcase,
      title: "Бизнес и команды",
      description:
        "Компании от 20 до 300 сотрудников, которые хотят реальной эффективности, а не модного слова.",
    },
    {
      icon: Shield,
      title: "Компании с требованиями",
      description:
        "Госсектор и крупные организации с высокими требованиями к безопасности и регуляторике.",
    },
    {
      icon: GraduationCap,
      title: "Развитие ИИ-навыков",
      description:
        "Команды, которые хотят не просто внедрить ИИ, но и научиться работать с ним самостоятельно.",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            С кем я работаю
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <div
              key={index}
              className={`p-8 rounded-lg bg-card border border-border hover:border-accent hover:shadow-lg hover:-translate-y-1 transition-all ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <client.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">{client.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-center">
                {client.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground italic">
            Не работаю с фрилансерами и проектами ради хайпа.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoIWorkWith;
