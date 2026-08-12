import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLocation, useNavigate } from "react-router-dom";
import { trackCTAClick } from "@/utils/analytics";
import PillButton from "@/components/PillButton";
import {
  isDiagnosticStarted,
  isDiagnosticSubmitted,
  isExitPopupShown,
  markExitPopupShown,
  requestDiagnosticAutostart,
} from "@/lib/diagnosticState";
import { hasDiagnosticDraft } from "@/components/diagnostic/DiagnosticForm";

/* Служебные и специальные разделы — попап не показываем */
const BLOCKED_PREFIXES = [
  "/legal",
  "/portal",
  "/neurostylist",
  "/.lovable",
  "/consent",
  "/privacy-policy",
  "/terms",
  "/newyear",
  "/redirect",
];

const isAllowedRoute = (pathname: string) =>
  !BLOCKED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p));

const canShow = (pathname: string) =>
  isAllowedRoute(pathname) &&
  !isExitPopupShown() &&
  !isDiagnosticSubmitted() &&
  !isDiagnosticStarted() &&
  !hasDiagnosticDraft();

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;

  useEffect(() => {
    if (!canShow(location.pathname)) return;

    const show = () => {
      if (!canShow(pathnameRef.current)) return;
      markExitPopupShown();
      setIsOpen(true);
    };

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      // Mobile: 45 секунд на странице И минимум 40% просмотра
      let timeReady = false;
      let scrollReady = false;
      const tryShow = () => {
        if (timeReady && scrollReady) {
          cleanup();
          show();
        }
      };

      const timer = setTimeout(() => {
        timeReady = true;
        tryShow();
      }, 45000);

      const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return;
        const percent = (window.scrollY / scrollHeight) * 100;
        if (percent >= 40) {
          scrollReady = true;
          tryShow();
        }
      };

      const cleanup = () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleScroll);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      return cleanup;
    }

    // Desktop: курсор уходит за верхнюю границу окна
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        document.removeEventListener("mouseleave", handleMouseLeave);
        show();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [location.pathname]);

  const handleCTA = () => {
    trackCTAClick({ location: "exit_intent", buttonText: "Описать задачу" });
    setIsOpen(false);
    requestDiagnosticAutostart();
    if (location.pathname.replace(/\/$/, "") === "/start") {
      window.dispatchEvent(new Event("self-start:open"));
      navigate("/start", { replace: true });
      // страница уже открыта — запуск через autostart-событие ниже
      setTimeout(() => window.dispatchEvent(new Event("self-start:open")), 60);
    } else {
      navigate("/start#self-start");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[520px] p-0 overflow-hidden rounded-[24px] shadow-elevated border-0 mx-auto [&>button]:hidden">
        <div className="h-1 w-full bg-accent" />

        <div className="px-6 sm:px-9 py-7 sm:py-9">
          <DialogHeader className="mb-6 space-y-3">
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-foreground leading-[1.1] text-left">
              Не уходите с задачей в голове
            </DialogTitle>
            <DialogDescription className="text-base sm:text-lg text-foreground/75 leading-snug text-left">
              Опишите один процесс за 7–10 минут. Вопросы помогут разложить задачу по фактам и подготовиться к предметному разговору.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap items-center gap-3">
            <PillButton onClick={handleCTA} variant="turquoise">
              Описать задачу
            </PillButton>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-sm sm:text-base font-semibold text-foreground/60 hover:text-foreground transition-colors px-2 py-2"
            >
              Не сейчас
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
