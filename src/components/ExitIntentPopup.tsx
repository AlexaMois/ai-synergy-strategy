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
      <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] p-0 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-500 ease-out mx-auto [&>button]:hidden">
        <div className="p-6 sm:p-8">
          <DialogHeader className="mb-5 sm:mb-6">
            <DialogTitle className="text-xl sm:text-2xl font-golos font-semibold text-center text-foreground mb-3">
              Уходите? Последний вопрос:
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base font-raleway text-center text-foreground/80 leading-relaxed">
              Есть процесс, который отнимает время каждый день — но руки не доходят разобраться? Пройдите короткий тест — за 3 минуты поймёте, где ИИ даст результат именно Вам.
            </DialogDescription>
          </DialogHeader>

          <Button
            className="w-full py-3 text-sm sm:text-base min-h-[44px] mb-4"
            onClick={handleCTA}
          >
            Пройти бесплатную диагностику
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
