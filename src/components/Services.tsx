import { Search, Brain, Users } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Services = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const services = [
    {
      icon: Search,
      title: "Аудит и диагностика",
      description:
        "Выявляю процессы, где ИИ даст реальную отдачу. Оцениваю зрелость данных и готовность команды. Формирую дорожную карту внедрения.",
    },
    {
      icon: Brain,
      title: "Стратегия и архитектура",
      description:
        "Проектирую архитектуру ИИ-решений под задачи бизнеса. Выбираю технологии и поставщиков. Закладываю основу для масштабирования.",
    },
    {
      icon: Users,
      title: "Консалтинг и сопровождение",
      description:
        "Обучаю команду работе с ИИ. Сопровождаю пилоты и запуски. Помогаю избежать ошибок и достичь целевых метрик.",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Мои направления работы
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-8 rounded-lg border border-border hover:border-accent transition-all bg-card hover:shadow-lg hover:-translate-y-1 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
