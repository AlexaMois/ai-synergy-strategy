import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

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

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
      }`}
    >
      <Button
        size="lg"
        className="h-14 px-6 text-base font-bold shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-300 bg-accent text-accent-foreground hover:bg-accent/90"
        asChild
      >
        <a
          href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Calendar className="h-5 w-5" />
          Записаться на аудит
        </a>
      </Button>
    </div>
  );
};

export default FloatingCTA;
