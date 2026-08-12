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
  !isDiagnosticStarted();

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
    if (location.pathname.replace(/\/$/, "") === "/start") {
      window.dispatchEvent(new Event("self-start:open"));
    } else {
      requestDiagnosticAutostart();
      navigate("/start");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[560px] p-0 overflow-hidden rounded-[28px] shadow-elevated border-0 mx-auto [&>button]:hidden">
        <div className="relative px-6 sm:px-10 pt-8 sm:pt-10 pb-7 sm:pb-9">
          {/* мягкое бирюзовое свечение в углу */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-accent/10 text-accent px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] mb-6">
              <span className="dot-soft-pulse" />
              Анкета · 7–10 минут
            </span>

            <DialogHeader className="mb-5 space-y-3">
              <DialogTitle className="text-[26px] sm:text-4xl font-bold text-foreground leading-[1.05] text-left">
                Не уходите с задачей{" "}
                <span className="font-iriska font-normal italic text-accent">в голове</span>
              </DialogTitle>
              <DialogDescription className="text-base sm:text-lg text-foreground/70 leading-relaxed text-left">
                Опишите один процесс за 7–10 минут. Вопросы помогут разложить задачу по фактам и подготовиться к предметному разговору.
              </DialogDescription>
            </DialogHeader>

            <div className="border-t border-border mb-6">
              {["Выберите один процесс", "Зафиксируйте ручные действия", "Опишите главную проблему"].map(
                (step, i) => (
                  <div key={step} className="flex items-baseline gap-3.5 border-b border-border py-3">
                    <span className="text-xs sm:text-sm font-bold text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm sm:text-base text-foreground/85 leading-snug">{step}</span>
                  </div>
                )
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <PillButton onClick={handleCTA} variant="turquoise">
                Описать задачу
              </PillButton>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-sm sm:text-base font-semibold text-foreground/50 hover:text-foreground transition-colors px-2 py-2 text-left sm:text-center"
              >
                Не сейчас
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
