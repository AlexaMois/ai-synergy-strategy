import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Phone, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const navigate = useNavigate();

  const scrollToContact = () => {
    setIsOpen(false);
    const element = document.querySelector('#contact');
    if (element) {
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    // Check if popup was already shown in this session
    const wasShown = sessionStorage.getItem("exitIntentShown");
    if (wasShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves to top of viewport (exit intent)
      if (e.clientY <= 10 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[600px] p-0 overflow-hidden animate-in fade-in-0 slide-in-from-top-4 duration-300 mx-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10 p-1"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Закрыть</span>
        </button>

        {/* Content */}
        <div className="p-5 sm:p-8 md:p-10">
          <DialogHeader className="mb-4 sm:mb-6">
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-golos font-normal text-center text-foreground mb-3 sm:mb-4 leading-tight">
              Вы теряете миллионы, <span className="font-semibold">на неправильном выборе ИИ</span>
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base md:text-lg font-raleway text-center text-foreground">
              За <span className="font-semibold text-primary">30 минут</span> я выясню, есть ли смысл вообще говорить об ИИ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-8">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <Check className="h-4 w-4 text-foreground shrink-0 mt-0.5 sm:mt-1" strokeWidth={1} />
              <p className="text-sm sm:text-base font-raleway text-foreground">
                Найду главные боли в ваших процессах, которые может решить ИИ
              </p>
            </div>
            <div className="flex items-start gap-2.5 sm:gap-3">
              <Check className="h-4 w-4 text-foreground shrink-0 mt-0.5 sm:mt-1" strokeWidth={1} />
              <p className="text-sm sm:text-base font-raleway text-foreground">
                Честно скажу, если ИИ вам сейчас не нужен и почему
              </p>
            </div>
            <div className="flex items-start gap-2.5 sm:gap-3">
              <Check className="h-4 w-4 text-foreground shrink-0 mt-0.5 sm:mt-1" strokeWidth={1} />
              <p className="text-sm sm:text-base font-raleway text-foreground">
                Предложу следующий шаг (если он имеет смысл)
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1 flex flex-col items-center">
              <Button 
                className="w-full py-3 sm:py-3.5 text-sm sm:text-base shadow-lg min-h-[44px]"
                onClick={scrollToContact}
              >
                <Phone size={16} className="mr-2" />
                Обсудить задачу
              </Button>
              <span className="text-xs text-foreground/70 mt-1.5 sm:mt-2 font-raleway">
                30 минут, без обязательств
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <Button
                variant="secondary"
                className="w-full py-3 sm:py-3.5 text-sm sm:text-base min-h-[44px]"
                onClick={() => {
                  toast({
                    title: "Эта страница находится в разработке",
                    description: "Скоро здесь появится полезная информация",
                  });
                }}
              >
                Скачать чеклист диагностики
              </Button>
              <span className="text-xs text-foreground/70 mt-1.5 sm:mt-2 font-raleway">
                Сами оцените готовность
              </span>
            </div>
          </div>

          <p className="text-center text-xs sm:text-sm font-raleway text-foreground/70">
            Без впаривания, без волшебства. Только честная диагностика.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
