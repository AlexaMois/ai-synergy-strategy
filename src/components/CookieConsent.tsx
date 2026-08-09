import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
};

const CONSENT_STORAGE_KEY = "cookie_consent";
const CONSENT_VERSION = "v3";
export const COOKIE_SETTINGS_EVENT = "open-cookie-settings";

// Яндекс.Метрика загружается только после согласия на аналитические cookies
const updateYandexConsent = (consent: ConsentState) => {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (consent.analytics) {
    if (typeof w.loadAnalytics === "function") w.loadAnalytics();
    return;
  }
  // Согласие отозвано — Метрика останавливается сразу, в текущей сессии
  if (typeof w.disableAnalytics === "function") w.disableAnalytics();
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isReopened, setIsReopened] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.version === CONSENT_VERSION) {
          setConsent({ necessary: true, analytics: !!parsed.consent?.analytics });
          updateYandexConsent(parsed.consent);
          return;
        }
      } catch (e) {
        // Invalid stored consent, show banner
      }
    }
    // Первый показ — без задержки, выбор обязателен
    setIsVisible(true);
  }, []);

  // Allow reopening settings from anywhere (e.g. Footer link)
  useEffect(() => {
    const open = () => {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setConsent({ necessary: true, analytics: !!parsed.consent?.analytics });
        } catch (e) {
          // ignore
        }
      }
      setIsReopened(true);
      setIsVisible(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, []);

  // Блокировка прокрутки, пока выбор не сделан
  useEffect(() => {
    if (!isVisible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isVisible]);

  const saveConsent = (newConsent: ConsentState) => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ version: CONSENT_VERSION, consent: newConsent })
    );
    updateYandexConsent(newConsent);
    setIsVisible(false);
    setIsReopened(false);
  };

  const allowAnalytics = () => {
    const allConsent = { necessary: true, analytics: true };
    setConsent(allConsent);
    saveConsent(allConsent);
  };

  const declineAnalytics = () => {
    const minConsent = { necessary: true, analytics: false };
    setConsent(minConsent);
    saveConsent(minConsent);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6 sm:px-6 bg-foreground/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-[600px] rounded-3xl bg-background border border-border shadow-elevated p-6 sm:p-9 font-golos animate-in zoom-in-95 duration-200">
        <h2
          id="cookie-consent-title"
          className="!text-2xl sm:!text-3xl !leading-snug font-bold text-foreground !mb-4"
        >
          Помогите сделать сайт полезнее
        </h2>

        <p className="text-base text-muted-foreground leading-relaxed mb-7">
          Яндекс.Метрика помогает понять, какие страницы и материалы действительно полезны.
          Рекламные и маркетинговые cookies на сайте не используются.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={allowAnalytics}
            className="flex-1 h-auto min-h-12 rounded-full px-5 py-3 text-base font-semibold whitespace-normal text-center shadow-md hover:shadow-lg"
          >
            Разрешить аналитику
          </Button>
          <Button
            onClick={declineAnalytics}
            variant="outline"
            className="flex-1 h-auto min-h-12 rounded-full px-5 py-3 text-base font-medium whitespace-normal text-center bg-muted/40 hover:bg-muted shadow-sm"
          >
            Продолжить без аналитики
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/legal/cookies" className="text-sm text-primary hover:underline">
            Подробнее о cookies
          </Link>
          {isReopened && (
            <span className="text-sm text-muted-foreground">
              Текущий выбор: {consent.analytics ? "аналитика разрешена" : "без аналитики"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
