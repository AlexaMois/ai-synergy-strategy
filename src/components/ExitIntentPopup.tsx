import { useEffect, useRef, useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useLocation, useNavigate } from "react-router-dom";
import { trackCTAClick, trackExitPopupEvent } from "@/utils/analytics";
import PillButton from "@/components/PillButton";
import {
  isExitPopupShown,
  isExitPopupSuppressed,
  markExitPopupAccepted,
  markExitPopupDismissed,
  markExitPopupShown,
  requestDiagnosticAutostart,
} from "@/lib/diagnosticState";

const BLOCKED_PREFIXES = [
  "/start", "/legal", "/portal", "/neurostylist", "/.lovable",
  "/consent", "/privacy-policy", "/terms", "/newyear", "/redirect", "/404", "/not-found",
];

const isEligibleRoute = (pathname: string) =>
  !BLOCKED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));

/* Popup waits until cookie preferences are recorded and other dialogs/forms are idle. */
const isInterfaceIdle = () => {
  try {
    if (!localStorage.getItem("cookie_consent")) return false;
  } catch {
    return false;
  }
  const active = document.activeElement;
  if (active?.matches("input, textarea, select, [contenteditable='true']")) return false;
  if (document.querySelector("form:focus-within")) return false;
  if (document.querySelector("[role='dialog'][data-state='open'], [role='alertdialog'][data-state='open']")) return false;
  if (document.getElementById("cookie-consent-title") || document.title.startsWith("404")) return false;
  return true;
};

const canShow = (pathname: string) =>
  isEligibleRoute(pathname) && !isExitPopupShown() && !isExitPopupSuppressed();

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  const location = useLocation();
  const navigate = useNavigate();
  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!canShow(location.pathname)) return;

    let elapsed = 0;
    let activeSince: number | null = document.visibilityState === "visible" && document.hasFocus()
      ? Date.now() : null;
    let scrolledHalfway = false;

    const activeMs = () => elapsed + (activeSince === null ? 0 : Date.now() - activeSince);
    const setActive = (active: boolean) => {
      if (active && activeSince === null) activeSince = Date.now();
      if (!active && activeSince !== null) {
        elapsed += Date.now() - activeSince;
        activeSince = null;
      }
    };
    const updateActivity = () => setActive(document.visibilityState === "visible" && document.hasFocus());
    const eligibleNow = () =>
      document.visibilityState === "visible" &&
      document.hasFocus() &&
      canShow(pathnameRef.current) &&
      isInterfaceIdle();

    const show = () => {
      if (!eligibleNow()) return;
      markExitPopupShown();
      trackExitPopupEvent("exit_popup_show");
      setIsOpen(true);
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0 && window.scrollY / maxScroll >= 0.5) scrolledHalfway = true;
    };

    const handleMouseLeave = (event: MouseEvent) => {
      if (media.matches || event.clientY > 0 || activeMs() < 30000) return;
      show();
    };

    const media = window.matchMedia("(max-width: 767px)");
    const mobileInterval = window.setInterval(() => {
      if (!media.matches) return;
      handleScroll();
      if (activeMs() >= 60000 && scrolledHalfway) show();
    }, 500);

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", updateActivity);
    window.addEventListener("focus", updateActivity);
    window.addEventListener("blur", updateActivity);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.clearInterval(mobileInterval);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", updateActivity);
      window.removeEventListener("focus", updateActivity);
      window.removeEventListener("blur", updateActivity);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const dismiss = () => {
    if (!isOpen) return;
    trackExitPopupEvent("exit_popup_dismiss");
    markExitPopupDismissed();
    setIsOpen(false);
  };

  const handleCTA = () => {
    trackExitPopupEvent("exit_popup_cta");
    trackCTAClick({ location: "exit_intent", buttonText: "Проверить свой процесс" });
    markExitPopupAccepted();
    setIsOpen(false);
    requestDiagnosticAutostart();
    navigate("/start");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(next) => { if (!next) dismiss(); }}>
      <DialogContent
        aria-describedby="exit-popup-description"
        className="w-[calc(100%-2rem)] max-w-[560px] max-h-[90dvh] overflow-y-auto rounded-[28px] border-0 p-0 shadow-elevated [&>button]:hidden max-sm:!left-0 max-sm:!right-0 max-sm:!top-auto max-sm:!bottom-0 max-sm:!w-full max-sm:!max-w-none max-sm:!translate-x-0 max-sm:!translate-y-0 max-sm:!rounded-b-none max-sm:!rounded-t-[28px]"
      >
        <div className="relative px-6 pb-7 pt-8 sm:px-10 sm:pb-9 sm:pt-10"
          style={isMobile ? { paddingBottom: "max(1.75rem, env(safe-area-inset-bottom))" } : undefined}>
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            <button type="button" onClick={dismiss} aria-label="Закрыть приглашение"
              className="absolute -right-2 -top-3 flex h-11 w-11 items-center justify-center rounded-full text-foreground/65 transition-colors hover:bg-foreground/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
              <span aria-hidden="true" className="text-2xl leading-none">×</span>
            </button>
            <span className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent sm:mb-6 sm:text-xs">
              <span className="dot-soft-pulse" />
              Бесплатная проверка · 7–10 минут
            </span>
            <DialogHeader className="mb-5 space-y-3">
              <DialogTitle className="text-left text-[26px] font-bold leading-[1.08] text-foreground sm:text-4xl">
                Превратите рабочую задачу{" "}
                <span className="font-iriska font-normal italic text-accent">в первый шаг</span>
              </DialogTitle>
              <DialogDescription id="exit-popup-description" className="text-left text-base leading-relaxed text-foreground/70 sm:text-lg">
                Выберите один бизнес-процесс, ответьте на вопросы и получите предварительный разбор: где возникают потери, что стоит проверить первым и как оценить результат.
              </DialogDescription>
            </DialogHeader>

            <ul className="mb-6 hidden border-t border-border sm:block">
              {[
                "Предварительные выводы по Вашим ответам",
                "Первый шаг и критерий проверки результата",
                "Возможность сохранить результат в PDF",
              ].map((item, index) => (
                <li key={item} className="flex items-baseline gap-3.5 border-b border-border py-3">
                  <span className="text-xs font-bold tabular-nums text-accent sm:text-sm">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-snug text-foreground/85 sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <PillButton onClick={handleCTA} variant="turquoise">Проверить свой процесс</PillButton>
              <button type="button" onClick={dismiss}
                className="min-h-11 px-2 py-2 text-left text-sm font-semibold text-foreground/55 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent sm:text-center sm:text-base">
                Продолжить просмотр
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
