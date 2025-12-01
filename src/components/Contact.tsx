import { Button } from "@/components/ui/button";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
const Contact = () => {
  const {
    ref,
    getStaggeredClass
  } = useMobileAnimations({
    threshold: 0.2
  });
  return <section id="contact" ref={ref} className="relative py-10 md:py-16 lg:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="">
            Любую задачу в ИИ можно решить за <span className="font-semibold"><span className={`text-5xl inline-block ${getStaggeredClass(1, 'animate-scale-in')}`}>5</span> минут</span> или за <span className="font-semibold"><span className={`text-5xl inline-block ${getStaggeredClass(2, 'animate-scale-in')}`}>5</span> миллионов</span>. Выбор за вами.
          </h2>
          
          <p className={`text-handwriting mb-10 ${getStaggeredClass(3, 'animate-fade-in-up')}`}>
            Начните с архитектурной сессии, чтобы не переплачивать за лишние технологии.
          </p>
          
          <div className={`flex flex-col gap-4 items-center ${getStaggeredClass(4, 'animate-scale-in')}`}>
            <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center flex-wrap">
              <Button className="h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base whitespace-nowrap" asChild>
                <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                  Обсудить задачу
                </a>
              </Button>
              <Button className="h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base whitespace-nowrap" variant="outline" asChild>
                <a href="https://t.me/AlexandraMois" target="_blank" rel="noopener noreferrer">
                  Написать в Telegram
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Честно скажу, если ИИ вам пока не нужен.
            </p>
          </div>

          <div className={`mt-12 pt-12 border-t border-border ${getStaggeredClass(5, 'animate-fade-in-up')}`}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-lg text-text-body">
              <div className="p-4 sm:p-6 rounded-xl bg-[hsl(var(--gray-50))] shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/30 gradient-border-gray gradient-border-gray-hover">
                <p className="font-semibold text-text-heading mb-2">Email</p>
                <a href="mailto:neiroreshenia@yandex.com" className="hover:text-accent transition-colors">neiroreshenia@yandex.com</a>
              </div>
              <div className="p-4 sm:p-6 rounded-xl bg-[hsl(var(--gray-50))] shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/30 gradient-border-gray gradient-border-gray-hover">
                <p className="font-semibold text-text-heading mb-2">Телефон</p>
                <a href="tel:+79937217367" className="hover:text-accent transition-colors">+7 993 721 73 67</a>
              </div>
              <div className="p-4 sm:p-6 rounded-xl bg-[hsl(var(--gray-50))] shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/30 gradient-border-gray gradient-border-gray-hover">
                <p className="font-semibold text-text-heading mb-2">Telegram</p>
                <a href="https://t.me/AlexandraMois" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">@AlexandraMois</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;