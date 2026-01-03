// Google Analytics & Yandex.Metrika event tracking utility

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (counterId: number, action: string, goalName?: string, params?: object) => void;
  }
}

const YANDEX_COUNTER_ID = 99058653;

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

export const trackCTAClick = ({ location, buttonText = 'Обсудить задачу', pageUrl }: TrackCTAClickParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: location,
      button_text: buttonText,
      page_url: pageUrl || window.location.pathname,
    });
  }
};

export const trackFormSubmission = (formType: 'contact' | 'diagnostic' | 'checklist') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submission', {
      event_category: 'conversion',
      event_label: formType,
      page_url: window.location.pathname,
    });
  }
};

export const trackDownload = (documentName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download', {
      event_category: 'engagement',
      event_label: documentName,
      page_url: window.location.pathname,
    });
  }
};

// Scroll depth tracking for Yandex.Metrika
const scrollDepthsTracked = new Set<number>();

const trackScrollDepth = (depth: number) => {
  if (scrollDepthsTracked.has(depth)) return;
  
  scrollDepthsTracked.add(depth);
  
  // Send to Yandex.Metrika
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YANDEX_COUNTER_ID, 'reachGoal', `scroll_${depth}`);
  }
  
  // Also send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth,
      page_url: window.location.pathname,
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
