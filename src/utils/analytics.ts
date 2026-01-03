// Google Analytics event tracking utility

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

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
