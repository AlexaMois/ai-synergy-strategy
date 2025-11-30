import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";
const Services = () => {
  const {
    ref,
    isVisible
  } = useIntersectionObserver({
    threshold: 0.2
  });
  const parallaxOffset = useParallax(0.4);
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
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className={`absolute top-20 left-10 w-[500px] opacity-15 pointer-events-none transition-all duration-600 ease-out ${isVisible ? 'animate-fade-slide-up' : 'opacity-0'}`} 
        style={{
          transform: `translateY(${-parallaxOffset * 0.8}px) rotate(12deg)`,
          animationDelay: '0.2s'
        }} 
      />
      
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center leading-tight mb-10">
          Услуги, <span className="font-semibold">которые я предлагаю</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.number}
              className={`p-4 sm:p-8 rounded-[20px] bg-white shadow-card hover:shadow-hover transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/20 gradient-border gradient-border-hover ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-5xl font-bold text-primary mb-4 opacity-30">
                {service.number}
              </div>
              <h3 className="text-xl font-semibold text-text-heading mb-3">
                {service.title}
              </h3>
              <p className="text-text-body leading-relaxed">
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