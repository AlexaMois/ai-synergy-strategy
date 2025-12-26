import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

const AnimatedNumber = ({ 
  value, 
  suffix = '', 
  prefix = '', 
  duration = 1800,
  decimals = 0,
  className = ''
}: AnimatedNumberProps) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    setHasAnimated(true);
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = easeOut * value;

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, hasAnimated, value, duration]);

  const formattedValue = displayValue.toFixed(decimals).replace('.', ',');

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={`tabular-nums ${className}`}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

export default AnimatedNumber;
