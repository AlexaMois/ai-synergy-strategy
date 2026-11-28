import { useState, useEffect } from "react";
import PillButton from "@/components/PillButton";
import { trackCTAClick, trackZakazatZvonok } from "@/utils/analytics";
import { openCallbackModal } from "@/components/CallbackModal";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    trackCTAClick({ location: 'floating_cta' });
    trackZakazatZvonok();
    openCallbackModal();
  };

  return (
    <div
      className={`bt-global-ui fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "invisible opacity-0 translate-y-16 pointer-events-none"
      }`}
    >
      <PillButton variant="dark" size="md"
        className="justify-between"
        onClick={handleClick}
      >
        Заказать звонок
      </PillButton>
    </div>
  );
};

export default FloatingCTA;
