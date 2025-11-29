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
        asChild
      >
        <a
          href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Calendar className="h-5 w-5 shrink-0" />
          <span className="hidden sm:inline">Записаться на аудит</span>
        </a>
      </Button>
    </div>
  );
};

export default FloatingCTA;
