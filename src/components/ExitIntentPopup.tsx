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
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden animate-in fade-in-0 slide-in-from-top-4 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Закрыть</span>
        </button>

        {/* Content */}
        <div className="p-8 sm:p-10">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl sm:text-3xl font-golos font-normal text-center text-[#222222] mb-4 leading-tight">
              Вы теряете миллионы, <span className="font-semibold">на неправильном выборе ИИ</span>
            </DialogTitle>
            <DialogDescription className="text-base sm:text-lg font-raleway text-center text-[#444444]">
              За <span className="font-semibold text-primary">30 минут</span> я выясню, есть ли смысл вообще говорить об ИИ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <Check className="h-4 w-4 text-[#6A6A6A] shrink-0 mt-1" strokeWidth={1} />
              <p className="text-base font-raleway text-[#444444]">
                Найду главные боли в ваших процессах, которые может решить ИИ
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-4 w-4 text-[#6A6A6A] shrink-0 mt-1" strokeWidth={1} />
              <p className="text-base font-raleway text-[#444444]">
                Честно скажу, если ИИ вам сейчас не нужен и почему
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-4 w-4 text-[#6A6A6A] shrink-0 mt-1" strokeWidth={1} />
              <p className="text-base font-raleway text-[#444444]">
                Предложу следующий шаг (если он имеет смысл)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 flex flex-col items-center">
              <Button 
                className="w-full py-3.5 text-base bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg"
                onClick={scrollToContact}
              >
                <Phone size={16} className="mr-2" />
                Заказать звонок
              </Button>
              <span className="text-xs text-[#6A6A6A] mt-2 font-raleway">
                30 минут, без обязательств
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <Button
                variant="outline"
                className="w-full py-3.5 text-base"
                onClick={() => {
                  toast({
                    title: "Эта страница находится в разработке",
                    description: "Скоро здесь появится полезная информация",
                  });
                }}
              >
                Скачать чеклист диагностики
              </Button>
              <span className="text-xs text-[#6A6A6A] mt-2 font-raleway">
                Сами оцените готовность
              </span>
            </div>
          </div>

          <p className="text-center text-sm font-raleway text-[#6A6A6A]">
            Без впаривания, без волшебства. Только честная диагностика.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
