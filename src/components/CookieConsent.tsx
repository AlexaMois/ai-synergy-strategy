import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie, X, Settings } from "lucide-react";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_STORAGE_KEY = "cookie_consent";
const CONSENT_VERSION = "v1";

// Update Google Consent Mode
const updateGoogleConsent = (consent: ConsentState) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
  }
};

// Update Yandex Metrika consent
const updateYandexConsent = (consent: ConsentState) => {
  if (typeof window !== "undefined" && (window as any).ym) {
    if (!consent.analytics) {
      // Disable Yandex Metrika tracking
      (window as any).ym(99058653, "notBounce");
    }
  }
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed.consent);
          updateGoogleConsent(parsed.consent);
          updateYandexConsent(parsed.consent);
          return;
        }
      } catch (e) {
        // Invalid stored consent, show banner
      }
    }
    
    // Show banner after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-close after 15 seconds (accept only necessary cookies)
  useEffect(() => {
    if (!isVisible) return;
    
    const autoCloseTimer = setTimeout(() => {
      const minConsent = { necessary: true, analytics: false, marketing: false };
      setConsent(minConsent);
      saveConsent(minConsent);
    }, 15000);
    
    return () => clearTimeout(autoCloseTimer);
  }, [isVisible]);

  const saveConsent = (newConsent: ConsentState) => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ version: CONSENT_VERSION, consent: newConsent })
    );
    updateGoogleConsent(newConsent);
    updateYandexConsent(newConsent);
    setIsVisible(false);
  };

  const acceptAll = () => {
    const allConsent = { necessary: true, analytics: true, marketing: true };
    setConsent(allConsent);
    saveConsent(allConsent);
  };

  const acceptSelected = () => {
    saveConsent(consent);
  };

  const rejectAll = () => {
    const minConsent = { necessary: true, analytics: false, marketing: false };
    setConsent(minConsent);
    saveConsent(minConsent);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] max-w-[320px] animate-in slide-in-from-left-4 fade-in duration-300">
      <div className="bg-background border border-border rounded-lg shadow-lg overflow-hidden">
        <div className="p-3">
          <div className="flex items-start gap-2">
            <Cookie className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground leading-relaxed mb-2">
                Мы используем cookies для улучшения работы сайта.{" "}
                <Link to="/legal/cookies" className="text-primary hover:underline">
                  Подробнее
                </Link>
              </p>

              {/* Compact Settings Panel */}
              {showSettings && (
                <div className="mb-2 p-2 bg-muted/50 rounded space-y-1.5 text-xs">
                  <label className="flex items-center justify-between opacity-70">
                    <span className="text-foreground">Необходимые</span>
                    <input type="checkbox" checked disabled className="w-3.5 h-3.5 accent-primary" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-foreground">Аналитика</span>
                    <input
                      type="checkbox"
                      checked={consent.analytics}
                      onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                      className="w-3.5 h-3.5 accent-primary cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-foreground">Маркетинг</span>
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                      className="w-3.5 h-3.5 accent-primary cursor-pointer"
                    />
                  </label>
                </div>
              )}

              {/* Compact Buttons */}
              <div className="flex flex-wrap gap-1.5">
                <Button onClick={acceptAll} size="sm" className="h-7 text-xs px-2.5">
                  Принять
                </Button>
                
                {showSettings ? (
                  <Button onClick={acceptSelected} variant="outline" size="sm" className="h-7 text-xs px-2.5">
                    Сохранить
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setShowSettings(true)} 
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs px-2.5"
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    Настроить
                  </Button>
                )}
                
                <Button onClick={rejectAll} variant="ghost" size="sm" className="h-7 text-xs px-2 text-muted-foreground">
                  Отклонить
                </Button>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={rejectAll}
              className="p-0.5 hover:bg-muted rounded transition-colors flex-shrink-0"
              aria-label="Закрыть"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
