import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import brushStroke from "@/assets/brush-stroke.jpg";
import { motion, useScroll, useTransform } from "framer-motion";

const Contact = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const { scrollY } = useScroll();
  const brushY = useTransform(scrollY, [3000, 4000], [50, -30]);
  const brushRotate = useTransform(scrollY, [3000, 4000], [-12, 5]);
  
  return (
    <section id="contact" ref={ref} className="relative py-32 bg-background overflow-hidden">
      {/* Brush Accent with Parallax */}
      <motion.img 
        src={brushStroke} 
        alt="" 
        className="absolute top-1/2 right-10 w-[400px] opacity-10 pointer-events-none mix-blend-multiply"
        style={{ y: brushY, rotate: brushRotate }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-bold mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Начните с диагностики
          </h2>
          
          <p className={`text-2xl md:text-3xl text-muted-foreground mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            Узнайте, что можно автоматизировать<br />уже сегодня
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <Button size="lg" className="h-16 px-10 text-lg bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              Запросить диагностику
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-16 px-10 text-lg border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold"
            >
              Написать в Telegram
            </Button>
          </div>

          <div className={`mt-16 pt-16 border-t border-border ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="grid md:grid-cols-3 gap-8 text-lg text-muted-foreground">
              <div>
                <p className="font-bold text-foreground mb-2">Email</p>
                <p>hello@neuro-solutions.ru</p>
              </div>
              <div>
                <p className="font-bold text-foreground mb-2">Телефон</p>
                <p>+7 (912) 345-67-89</p>
              </div>
              <div>
                <p className="font-bold text-foreground mb-2">Telegram</p>
                <p>@alexmoiseeva</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
