import { useEffect, useState } from 'react';

interface UseCountUpProps {
  end: number;
  duration?: number;
  isVisible: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export const useCountUp = ({
  end,
  duration = 2000,
  isVisible,
  decimals = 0,
  prefix = '',
  suffix = ''
}: UseCountUpProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    setHasAnimated(true);
    const startTime = Date.now();
    const endTime = startTime + duration;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = easeOut * end;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration, hasAnimated]);

  const formattedCount = count.toFixed(decimals);
  return `${prefix}${formattedCount}${suffix}`;
};
