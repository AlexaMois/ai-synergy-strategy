import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Services = () => {
  const {
    ref,
    isVisible
  } = useIntersectionObserver({
    threshold: 0.2
  });
  
  const services = [{
    number: "01",
    title: "Аудит и диагностика",
    description: "Выявляю процессы, где ИИ даст реальную отдачу. Оцениваю зрелость данных и готовность команды. Формирую дорожную карту внедрения."
  }, {
    number: "02",
    title: "Стратегия и архитектура",
    description: "Проектирую архитектуру ИИ-решений под задачи бизнеса. Выбираю технологии и поставщиков. Закладываю основу для масштабирования."
  }, {
    number: "03",
    title: "Консалтинг и сопровождение",
    description: "Обучаю команду работе с ИИ. Сопровождаю пилоты и запуски. Помогаю избежать ошибок и достичь целевых метрик."
  }];
  
  return (
    <section id="services" ref={ref} className="relative py-10 md:py-16 lg:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center leading-tight mb-10">
          Услуги, <span className="font-semibold">которые я предлагаю</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.number}
              className={`p-4 sm:p-8 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-shadow duration-200 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 opacity-30">
                {service.number}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
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
