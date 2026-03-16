import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { trackCTAClick } from "@/utils/analytics";
import { Sparkles, ArrowRight } from "lucide-react";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const wasShown = sessionStorage.getItem("exitIntentShown");
    if (wasShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleCTA = () => {
    trackCTAClick({ location: 'exit_intent', buttonText: 'Пройти бесплатную диагностику' });
    setIsOpen(false);
    navigate("/start");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[520px] p-0 overflow-hidden rounded-xl shadow-elevated border-0 animate-in fade-in-0 zoom-in-95 duration-500 ease-out mx-auto [&>button]:hidden">
        {/* Accent gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary to-primary-dark" />

        <div className="px-8 sm:px-10 py-6 sm:py-8">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
          </div>

          <DialogHeader className="mb-5 sm:mb-6 space-y-3">
            <DialogTitle className="text-2xl sm:text-[1.65rem] font-golos font-semibold text-center text-foreground">
              Уходите? <br />Последний вопрос:
            </DialogTitle>
            <p className="text-base sm:text-lg font-golos font-medium text-center text-foreground/90">
              Есть процесс, который отнимает время каждый день — но руки не доходят разобраться?
            </p>
            <DialogDescription className="text-sm sm:text-base font-raleway text-center text-foreground/70 leading-relaxed">
              Пройдите короткий тест — за 3 минуты поймёте, где ИИ даст результат именно Вам.
            </DialogDescription>
          </DialogHeader>

          <Button
            size="lg"
            className="w-full py-3 text-sm sm:text-base min-h-[48px] mb-4 gap-2"
            onClick={handleCTA}
          >
            Пройти бесплатную диагностику
            <ArrowRight className="w-4 h-4" />
          </Button>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-center text-sm font-raleway text-foreground/60 hover:text-foreground/80 transition-colors"
          >
            Нет, спасибо
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
