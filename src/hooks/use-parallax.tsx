import { useEffect, useState } from 'react';

export const useParallax = (speed: number = 0.5, maxOffset: number = 50) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.pageYOffset * speed;
      setOffset(Math.min(scrollOffset, maxOffset));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, maxOffset]);

  return offset;
};
