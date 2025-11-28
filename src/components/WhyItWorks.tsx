import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import nPattern from "@/assets/n-pattern.png";
import brushStroke from "@/assets/brush-stroke.jpg";
import { motion, useScroll, useTransform } from "framer-motion";

const WhyItWorks = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const { scrollY } = useScroll();
  const brushY = useTransform(scrollY, [1500, 2500], [100, -50]);
  const brushRotate = useTransform(scrollY, [1500, 2500], [-45, -20]);

  return (
    <section ref={ref} className="relative py-32 bg-background overflow-hidden">
      {/* N Pattern Background */}
      <div 
        className="absolute bottom-0 left-0 w-1/2 h-2/3 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url(${nPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '100px'
        }}
      />
      {/* Brush Accent with Parallax */}
      <motion.img 
        src={brushStroke} 
        alt="" 
        className="absolute bottom-32 right-20 w-[450px] opacity-20 pointer-events-none mix-blend-multiply"
        style={{ y: brushY, rotate: brushRotate }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-24 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              AI Synergy Framework
            </h2>
            <p className="text-2xl text-muted-foreground">
              Авторский метод, который объединяет бизнес-цели, технологии и людей
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-12 mb-24 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <div className="text-6xl font-bold text-accent mb-4">ROI</div>
              <p className="text-xl">Фокус на измеримой отдаче</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-accent mb-4">Люди</div>
              <p className="text-xl">Команда первична</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-accent mb-4">Этика</div>
              <p className="text-xl">Прозрачность решений</p>
            </div>
          </div>

          <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <blockquote className="text-3xl md:text-4xl font-iriska text-accent">
              "Я заставляю ИИ работать,<br />а не производить впечатление"
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;
