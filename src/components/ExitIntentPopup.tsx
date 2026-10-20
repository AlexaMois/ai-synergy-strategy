import { useEffect, useRef, useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
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
  // Явная ссылка для ручной приёмки. Работает независимо от прежних показов.
  const previewMode = new URLSearchParams(location.search).get("popup_preview") === "1";

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!previewMode || !isEligibleRoute(location.pathname)) return;
    let previewOpened = false;
    const tryOpenPreview = () => {
      if (previewOpened || !isInterfaceIdle()) return;
      previewOpened = true;
      setIsOpen(true);
      window.clearInterval(timer);
    };
    const timer = window.setInterval(tryOpenPreview, 250);
    tryOpenPreview();
    return () => window.clearInterval(timer);
  }, [location.pathname, previewMode]);

  useEffect(() => {
    if (previewMode || !canShow(location.pathname)) return;

    let elapsed = 0;
    let activeSince: number | null = document.visibilityState === "visible" && document.hasFocus()
      ? Date.now() : null;
    let scrolledHalfway = false;
    let scrolledThird = false;

    const activeMs = () => elapsed + (activeSince === null ? 0 : Date.now() - activeSince);
    const setActive = (active: boolean) => {
      if (active && activeSince === null) activeSince = Date.now();
      if (!active && activeSince !== null) {
        elapsed += Date.now() - activeSince;
        activeSince = null;
      }
    };
    const updateActivity = () => setActive(document.visibilityState === "visible" && document.hasFocus());
    const eligibleNow = (allowBlurredWindow = false) =>
      document.visibilityState === "visible" &&
      (allowBlurredWindow || document.hasFocus()) &&
      canShow(pathnameRef.current) &&
      isInterfaceIdle();

    const show = (allowBlurredWindow = false) => {
      if (!eligibleNow(allowBlurredWindow)) return;
      markExitPopupShown();
      trackExitPopupEvent("exit_popup_show");
      setIsOpen(true);
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0 && window.scrollY / maxScroll >= 0.35) scrolledThird = true;
      if (maxScroll > 0 && window.scrollY / maxScroll >= 0.5) scrolledHalfway = true;
    };

    const handleMouseLeave = (event: MouseEvent) => {
      if (media.matches || event.clientY > 0 || activeMs() < 30000) return;
      // Уход к вкладкам браузера способен снять фокус до события mouseleave.
      show(true);
    };

    const media = window.matchMedia("(max-width: 767px)");
    const engagementInterval = window.setInterval(() => {
      handleScroll();
      if (media.matches) {
        if (activeMs() >= 60000 && scrolledHalfway) show();
      } else if (activeMs() >= 45000 && scrolledThird) {
        // Резервный показ после реального изучения страницы.
        show();
      }
    }, 500);

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", updateActivity);
    window.addEventListener("focus", updateActivity);
    window.addEventListener("blur", updateActivity);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.clearInterval(engagementInterval);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", updateActivity);
      window.removeEventListener("focus", updateActivity);
      window.removeEventListener("blur", updateActivity);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, previewMode]);

  const dismiss = () => {
    if (!isOpen) return;
    if (!previewMode) {
      trackExitPopupEvent("exit_popup_dismiss");
      markExitPopupDismissed();
    }
    setIsOpen(false);
  };

  const handleCTA = () => {
    trackExitPopupEvent("exit_popup_cta");
    trackCTAClick({ location: "exit_intent", buttonText: "Проверить процесс" });
    markExitPopupAccepted();
    setIsOpen(false);
    requestDiagnosticAutostart();
    navigate("/start");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(next) => { if (!next) dismiss(); }}>
      <DialogContent
        aria-describedby="exit-popup-description"
        className={[
          "w-[calc(100vw-32px)] max-w-[520px] max-h-[90dvh]",
          "overflow-x-hidden overflow-y-auto overscroll-contain",
          "rounded-[28px] border border-border/60 bg-background p-0 shadow-elevated",
          "[&>button]:hidden",
          "max-sm:!left-0 max-sm:!right-0 max-sm:!top-auto max-sm:!bottom-0",
          "max-sm:!w-full max-sm:!max-w-none",
          "max-sm:!translate-x-0 max-sm:!translate-y-0",
          "max-sm:!rounded-b-none max-sm:!rounded-t-[24px]",
        ].join(" ")}
      >
        <div
          className="relative min-w-0 w-full overflow-x-hidden px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8"
          style={isMobile ? { paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" } : undefined}
        >
          <div className="mb-5 flex min-w-0 items-center justify-between gap-3">
            <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent sm:px-3.5 sm:text-[11px]">
              <span className="dot-soft-pulse shrink-0" aria-hidden="true" />
              Бесплатно · 7–10 минут
            </span>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Закрыть приглашение"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background text-foreground/65 transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>

          <DialogHeader className="mb-5 min-w-0 space-y-3">
            <DialogTitle className="min-w-0 text-left font-golos text-[29px] font-bold leading-[1.11] tracking-[-0.035em] text-foreground sm:text-[36px]">
              Превратите рабочую задачу
              <span
                className="mt-1 block max-w-full font-normal leading-[1.14] tracking-normal text-accent"
                style={{ fontFamily: "Iriska, cursive", fontSize: "clamp(24px, 3.2vw, 32px)" }}
              >
                в понятный первый шаг
              </span>
            </DialogTitle>
            <DialogDescription
              id="exit-popup-description"
              className="max-w-[440px] text-left text-[14px] leading-[1.55] text-foreground/75 sm:text-[15px]"
            >
              Выберите один процесс и ответьте на вопросы. Получите предварительные выводы, первый шаг и критерий результата.
            </DialogDescription>
          </DialogHeader>

          <ul className="mb-6 hidden border-y border-border/80 sm:block" aria-label="Что Вы получите">
            {[
              "Предварительные выводы по Вашим ответам",
              "Первый шаг и критерий проверки результата",
              "Возможность сохранить результат в PDF",
            ].map((item, index) => (
              <li key={item} className="flex min-w-0 items-center gap-3 py-2.5">
                <span className="w-6 shrink-0 text-[11px] font-bold tabular-nums text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 text-[13px] leading-[1.4] text-foreground/85 sm:text-[14px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-y border-border/80 py-3 text-[12px] font-medium text-foreground/75 sm:hidden" aria-label="Что Вы получите">
            <span>Выводы</span><span className="text-accent">·</span>
            <span>Первый шаг</span><span className="text-accent">·</span>
            <span>PDF</span>
          </div>

          <div className="flex min-w-0 flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
            <PillButton
              onClick={handleCTA}
              variant="turquoise"
              size="md"
              className="w-full justify-between whitespace-nowrap sm:w-auto sm:shrink-0"
            >
              Проверить процесс
            </PillButton>
            <button
              type="button"
              onClick={dismiss}
              className="min-h-11 shrink-0 rounded-full px-2 py-2 text-center text-[13px] font-medium text-foreground/65 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-[14px]"
            >
              Продолжить просмотр
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
