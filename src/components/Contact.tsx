import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";
import { AVAILABLE_SLOTS_THIS_WEEK } from "@/config/availability";

const Contact = () => {
  const { ref, getStaggeredClass } = useMobileAnimations({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.35);
  
  return (
    <section id="contact" ref={ref} className="relative py-10 md:py-16 lg:py-20 bg-background overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className="absolute top-1/2 right-10 w-[450px] opacity-15 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallaxOffset * 0.7}px) rotate(-12deg)` }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`section-title text-center leading-tight ${getStaggeredClass(0, 'animate-fade-in-up')}`}>
            Готовы узнать, <span className="font-semibold">где теряются ресурсы?</span>
          </h2>
          
          <p className={`text-handwriting mb-10 ${getStaggeredClass(1, 'animate-fade-in-up')}`}>
            Начните с малого — экспресс-аудита.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${getStaggeredClass(2, 'animate-scale-in')}`}>
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

          <div className={`mt-12 pt-12 border-t border-border ${getStaggeredClass(3, 'animate-fade-in-up')}`}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-lg text-text-body">
              <div className="p-6 rounded-xl bg-[hsl(var(--gray-50))] shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/30 gradient-border-gray gradient-border-gray-hover">
                <p className="font-semibold text-text-heading mb-2">Email</p>
                <a href="mailto:neiroreshenia@yandex.com" className="hover:text-accent transition-colors">neiroreshenia@yandex.com</a>
              </div>
              <div className="p-6 rounded-xl bg-[hsl(var(--gray-50))] shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/30 gradient-border-gray gradient-border-gray-hover">
                <p className="font-semibold text-text-heading mb-2">Телефон / Telegram / WhatsApp</p>
                <a href="tel:+79937217367" className="hover:text-accent transition-colors">+7 (993) 721-73-67</a>
              </div>
              <div className="p-6 rounded-xl bg-[hsl(var(--gray-50))] shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/30 gradient-border-gray gradient-border-gray-hover">
                <p className="font-semibold text-text-heading mb-2">Telegram-канал</p>
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
