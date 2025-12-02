import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Calendar, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

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
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
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
            <DialogTitle className="text-2xl sm:text-3xl text-center text-[#222222] mb-4">
              Вы теряете миллионы,{" "}
              <span className="font-semibold">на неправильном выборе ИИ</span>
            </DialogTitle>
            <DialogDescription className="text-base sm:text-lg text-center text-[#444444]">
              За 30 минут я выясню, есть ли смысл вообще говорить об ИИ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[#6A6A6A] shrink-0 mt-1" strokeWidth={1.5} />
              <p className="text-base text-[#444444]">
                Найду главные боли в ваших процессах, которые может решить ИИ
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[#6A6A6A] shrink-0 mt-1" strokeWidth={1.5} />
              <p className="text-base text-[#444444]">
                Честно скажу, если ИИ вам сейчас не нужен и почему
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[#6A6A6A] shrink-0 mt-1" strokeWidth={1.5} />
              <p className="text-base text-[#444444]">
                Предложу следующий шаг (если он имеет смысл)
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <Button
              className="h-auto py-3 px-6 text-sm sm:text-base flex flex-col items-center gap-1"
              asChild
            >
              <a
                href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-semibold">Записаться на аудит</span>
                <span className="text-xs opacity-90">30 минут, без обязательств</span>
              </a>
            </Button>
            <Button
              className="h-auto py-3 px-6 text-sm sm:text-base flex flex-col items-center gap-1"
              variant="outline"
              onClick={() => {
                toast({
                  title: "Эта страница находится в разработке",
                  description: "Скоро здесь появится полезная информация",
                });
              }}
            >
              <span className="font-semibold">Скачать мой чеклист диагностики</span>
              <span className="text-xs opacity-75">Сами оцените готовность</span>
            </Button>
          </div>

          <p className="text-center text-sm text-[#6A6A6A]">
            Без впаривания, без волшебства. Только честная диагностика.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
