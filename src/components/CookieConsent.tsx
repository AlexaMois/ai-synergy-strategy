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
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
        {/* Main Banner */}
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <Cookie className="w-5 h-5 text-primary sm:hidden" />
                Мы используем cookies
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Мы используем файлы cookies для анализа посещаемости и улучшения работы сайта. 
                Вы можете принять все cookies или настроить их использование.{" "}
                <Link to="/legal/cookies" className="text-primary hover:underline">
                  Подробнее о cookies
                </Link>
              </p>

              {/* Settings Panel */}
              {showSettings && (
                <div className="mb-4 p-4 bg-muted/50 rounded-lg space-y-3">
                  <label className="flex items-center justify-between cursor-not-allowed opacity-70">
                    <div>
                      <span className="font-medium text-foreground">Необходимые</span>
                      <p className="text-xs text-muted-foreground">Обеспечивают работу сайта</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="w-5 h-5 rounded accent-primary"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="font-medium text-foreground">Аналитические</span>
                      <p className="text-xs text-muted-foreground">Google Analytics, Яндекс.Метрика</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={consent.analytics}
                      onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                      className="w-5 h-5 rounded accent-primary cursor-pointer"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="font-medium text-foreground">Маркетинговые</span>
                      <p className="text-xs text-muted-foreground">Персонализация рекламы</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                      className="w-5 h-5 rounded accent-primary cursor-pointer"
                    />
                  </label>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={acceptAll} className="flex-1 sm:flex-none">
                  Принять все
                </Button>
                
                {showSettings ? (
                  <Button onClick={acceptSelected} variant="outline" className="flex-1 sm:flex-none">
                    Сохранить выбор
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setShowSettings(true)} 
                    variant="outline"
                    className="flex-1 sm:flex-none gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Настроить
                  </Button>
                )}
                
                <Button onClick={rejectAll} variant="ghost" className="text-muted-foreground">
                  Только необходимые
                </Button>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={rejectAll}
              className="p-1 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
