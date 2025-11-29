import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Calendar, CheckCircle2 } from "lucide-react";

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
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-2 border-accent">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Закрыть</span>
        </button>

        {/* Header with accent background */}
        <div className="bg-gradient-to-r from-[#D4EDFC] to-[#E8E0F5] p-8 pb-6">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-[#222222] mb-3">
              Подождите! Не уходите с пустыми руками
            </DialogTitle>
            <DialogDescription className="text-lg text-[#444444]">
              Получите бесплатный 30-минутный экспресс-аудит процессов
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-8 pt-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-1" />
              <p className="text-base text-[#444444]">
                Узнайте, где ваша компания теряет деньги и время
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-1" />
              <p className="text-base text-[#444444]">
                Получите конкретные рекомендации по автоматизации
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-1" />
              <p className="text-base text-[#444444]">
                Поймёте, какие решения дадут ROI уже в первые месяцы
              </p>
            </div>
          </div>

          <div className="bg-[#F1F4F5] rounded-xl p-4 mb-6">
            <p className="text-center text-sm text-[#444444]">
              <span className="font-semibold text-[#222222]">Это бесплатно.</span> Без навязывания услуг. 
              Только честный разбор ваших процессов.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              asChild
            >
              <a
                href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Записаться на аудит
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleClose}
            >
              Может быть позже
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
