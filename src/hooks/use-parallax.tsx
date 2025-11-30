import { useEffect, useState } from 'react';

export const useParallax = (speed: number = 0.5, maxOffset: number = 50) => {
  const [offset, setOffset] = useState(0);
  
  // Disable parallax on mobile for better performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    // Skip parallax on mobile devices
    if (isMobile) return;
    
    const handleScroll = () => {
      const scrollOffset = window.pageYOffset * speed;
      setOffset(Math.min(scrollOffset, maxOffset));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, maxOffset, isMobile]);

  return isMobile ? 0 : offset;
};
