import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  /** Safety net: force-reveal after N ms even if the observer never fires
   *  (e.g. full-page screenshots, headless captures). */
  revealAfterMs?: number;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  revealAfterMs,
}: UseIntersectionObserverProps = {}) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fallback: if IntersectionObserver is unavailable, immediately mark as visible
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    const timer =
      revealAfterMs && revealAfterMs > 0
        ? window.setTimeout(() => setIsVisible(true), revealAfterMs)
        : undefined;

    return () => {
      observer.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, [threshold, rootMargin, triggerOnce, revealAfterMs]);

  return { ref, isVisible };
};
