// Google Analytics & Yandex.Metrika event tracking utility

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (counterId: number, action: string, goalName?: string, params?: object) => void;
  }
}

const YANDEX_COUNTER_ID = 99058653;

// ─── UTM Tracking ───────────────────────────────────────────────────────────

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export const captureUTMParams = () => {
  if (typeof window === 'undefined') return;
  
  const params = new URLSearchParams(window.location.search);
  let hasUTM = false;
  
  UTM_PARAMS.forEach(key => {
    const value = params.get(key);
    if (value) {
      sessionStorage.setItem(key, value);
      hasUTM = true;
    }
  });
  
  // Also store referrer if no UTM and no existing referrer saved
  if (!hasUTM && !sessionStorage.getItem('traffic_referrer') && document.referrer) {
    try {
      const referrerHost = new URL(document.referrer).hostname;
      if (referrerHost !== window.location.hostname) {
        sessionStorage.setItem('traffic_referrer', referrerHost);
      }
    } catch {
      // Invalid referrer URL, skip
    }
  }
};

const getUTMData = (): Record<string, string> => {
  const data: Record<string, string> = {};
  
  UTM_PARAMS.forEach(key => {
    const value = sessionStorage.getItem(key);
    if (value) data[key] = value;
  });
  
  const referrer = sessionStorage.getItem('traffic_referrer');
  if (referrer) data['traffic_referrer'] = referrer;
  
  return data;
};

// ─── CTA Tracking ───────────────────────────────────────────────────────────

type CTALocation = 
  | 'hero'
  | 'floating_cta'
  | 'exit_intent'
  | 'contact_form'
  | 'blog_post'
  | 'how_i_work'
  | 'services'
  | 'cases'
  | 'faq'
  | 'pricing'
  | 'navigation'
  | 'footer'
  | 'other';

interface TrackCTAClickParams {
  location: CTALocation;
  buttonText?: string;
  pageUrl?: string;
}

export const trackCTAClick = ({ location, buttonText = 'Заказать звонок', pageUrl }: TrackCTAClickParams) => {
  const utmData = getUTMData();
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: location,
      button_text: buttonText,
      page_url: pageUrl || window.location.pathname,
      ...utmData,
    });
  }
  
  // Yandex.Metrika goal
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YANDEX_COUNTER_ID, 'reachGoal', 'cta_click', {
      cta_location: location,
      button_text: buttonText,
      ...utmData,
    });
  }
};

export const trackFormSubmission = (formType: 'contact' | 'diagnostic' | 'checklist') => {
  const utmData = getUTMData();
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submission', {
      event_category: 'conversion',
      event_label: formType,
      page_url: window.location.pathname,
      ...utmData,
    });
  }
  
  // Yandex.Metrika goal
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YANDEX_COUNTER_ID, 'reachGoal', 'form_submit', {
      form_type: formType,
      ...utmData,
    });
  }
};

export const trackDownload = (documentName: string) => {
  const utmData = getUTMData();
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download', {
      event_category: 'engagement',
      event_label: documentName,
      page_url: window.location.pathname,
      ...utmData,
    });
  }
  
  // Yandex.Metrika goal
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YANDEX_COUNTER_ID, 'reachGoal', 'download', {
      document_name: documentName,
      ...utmData,
    });
  }
};

// ─── Scroll Depth Tracking ──────────────────────────────────────────────────

const scrollDepthsTracked = new Set<number>();

const trackScrollDepth = (depth: number) => {
  if (scrollDepthsTracked.has(depth)) return;
  
  scrollDepthsTracked.add(depth);
  const utmData = getUTMData();
  
  // Send to Yandex.Metrika
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YANDEX_COUNTER_ID, 'reachGoal', `scroll_${depth}`, utmData);
  }
  
  // Also send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth,
      page_url: window.location.pathname,
      ...utmData,
    });
  }
};

export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;
  
  // Reset tracked depths on page change
  scrollDepthsTracked.clear();
  
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    
    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
    
    if (scrollPercent >= 25 && !scrollDepthsTracked.has(25)) {
      trackScrollDepth(25);
    }
    if (scrollPercent >= 50 && !scrollDepthsTracked.has(50)) {
      trackScrollDepth(50);
    }
    if (scrollPercent >= 75 && !scrollDepthsTracked.has(75)) {
      trackScrollDepth(75);
    }
    if (scrollPercent >= 100 && !scrollDepthsTracked.has(100)) {
      trackScrollDepth(100);
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// ─── Engagement Time Tracking ───────────────────────────────────────────────

export const initEngagementTracking = () => {
  if (typeof window === 'undefined') return;
  
  const engagementTimer = setTimeout(() => {
    const utmData = getUTMData();
    
    if (window.gtag) {
      window.gtag('event', 'engaged_visit', {
        event_category: 'engagement',
        event_label: '30s',
        page_url: window.location.pathname,
        ...utmData,
      });
    }
    
    if (window.ym) {
      window.ym(YANDEX_COUNTER_ID, 'reachGoal', 'engaged_visit', {
        duration: '30s',
        ...utmData,
      });
    }
  }, 30000);
  
  return () => {
    clearTimeout(engagementTimer);
  };
};
