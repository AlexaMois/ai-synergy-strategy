import { useIntersectionObserver } from "./use-intersection-observer";
import { useIsMobile } from "./use-mobile";

interface UseMobileAnimationsProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook that combines intersection observer with mobile detection
 * to provide optimized animation classes for mobile devices
 */
export const useMobileAnimations = ({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: UseMobileAnimationsProps = {}) => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  });
  const isMobile = useIsMobile();

  /**
   * Returns appropriate animation class based on device and visibility
   * @param desktopAnimation - Animation class for desktop
   * @param mobileAnimation - Animation class for mobile (optional, defaults to optimized version)
   */
  const getAnimationClass = (
    desktopAnimation: string = "animate-fade-in-up",
    mobileAnimation?: string
  ): string => {
    if (!isVisible) return "opacity-0";
    
    if (isMobile) {
      return mobileAnimation || "animate-mobile-slide-up";
    }
    
    return desktopAnimation;
  };

  /**
   * Returns staggered animation class for list items
   * @param index - Item index in the list
   * @param baseAnimation - Base animation class
   */
  const getStaggeredClass = (
    index: number,
    baseAnimation: string = "animate-mobile-slide-up"
  ): string => {
    if (!isVisible) return "opacity-0";
    
    const staggerClass = `stagger-${Math.min(index + 1, 6)}`;
    return `${isMobile ? "animate-mobile-slide-up" : baseAnimation} ${staggerClass}`;
  };

  return {
    ref,
    isVisible,
    isMobile,
    getAnimationClass,
    getStaggeredClass,
  };
};
