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
  return <section id="services" ref={ref} className="relative py-16 bg-background overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage src={brushAccent} alt="" className={`absolute top-20 left-10 w-[500px] opacity-15 pointer-events-none transition-all duration-600 ease-out ${isVisible ? 'animate-fade-slide-up' : 'opacity-0'}`} style={{
      transform: `translateY(${-parallaxOffset * 0.8}px) rotate(12deg)`,
      animationDelay: '0.2s'
    }} />
      
    </section>;
};
export default Services;