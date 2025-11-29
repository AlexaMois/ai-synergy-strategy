import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";
import { AVAILABLE_SLOTS_THIS_WEEK } from "@/config/availability";

const Contact = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.35);
  
  return (
    <section id="contact" ref={ref} className="relative py-20 bg-background overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className="absolute top-1/2 right-10 w-[450px] opacity-15 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallaxOffset * 0.7}px) rotate(-12deg)` }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`section-title text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Готовы узнать, где теряются ресурсы?
          </h2>
          
          <p className={`text-handwriting mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            Начните с малого — экспресс-аудита.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col gap-2 items-center">
              <Button size="lg" asChild>
                <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                  Пройти экспресс-аудит процессов
                </a>
              </Button>
              <AvailabilityBadge slotsAvailable={AVAILABLE_SLOTS_THIS_WEEK} />
            </div>
            <Button 
              size="lg" 
              variant="outline" 
              asChild
            >
              <a href="https://t.me/AlexandraMois" target="_blank" rel="noopener noreferrer">
                Написать в Telegram
              </a>
            </Button>
          </div>

          <div className={`mt-12 pt-12 border-t border-border ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="grid md:grid-cols-3 gap-6 text-base text-text-body">
              <div>
                <p className="font-medium text-text-heading mb-2">Email</p>
                <a href="mailto:neiroreshenia@yandex.ru" className="hover:text-accent transition-colors">neiroreshenia@yandex.ru</a>
              </div>
              <div>
                <p className="font-medium text-text-heading mb-2">Телефон / Telegram / WhatsApp</p>
                <a href="tel:+79937217367" className="hover:text-accent transition-colors">+7 (993) 721-73-67</a>
              </div>
              <div>
                <p className="font-medium text-text-heading mb-2">Telegram-канал</p>
                <a href="https://t.me/neiroreshenia" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">@neiroreshenia</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
