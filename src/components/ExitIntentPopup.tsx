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
import { trackCTAClick, trackDownload } from "@/utils/analytics";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const navigate = useNavigate();

  const scrollToContact = () => {
    trackCTAClick({ location: 'exit_intent' });
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

    let timeOnPage = false;
    let scrollDepth = false;

    const showPopup = () => {
      if (timeOnPage && scrollDepth && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    // Trigger after 20 seconds on page
    const timer = setTimeout(() => {
      timeOnPage = true;
      showPopup();
    }, 20000);

    // Trigger after 40% scroll
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 40) {
        scrollDepth = true;
        showPopup();
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] p-0 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-500 ease-out mx-auto [&>button]:hidden">
        {/* Content */}
        <div className="p-6 sm:p-8">
          <DialogHeader className="mb-5 sm:mb-6">
            <DialogTitle className="text-xl sm:text-2xl font-golos font-semibold text-center text-foreground mb-3">
              Получить консультацию
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base font-raleway text-center text-foreground/80 leading-relaxed">
              Задайте ваш вопрос специалисту компании.<br />
              Мы свяжемся с вами в ближайшее время.
            </DialogDescription>
          </DialogHeader>

          <Button 
            className="w-full py-3 text-sm sm:text-base min-h-[44px] mb-4"
            onClick={scrollToContact}
          >
            Заказать звонок
          </Button>

          <button
            onClick={handleClose}
            className="w-full text-center text-sm font-raleway text-foreground/60 hover:text-foreground/80 transition-colors"
          >
            Или закрыть
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
