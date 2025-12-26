import { useEffect, useState, useRef } from 'react';

interface AnimatedMetricProps {
  text: string;
  isVisible: boolean;
}

// Extract number and its surrounding text
const parseMetric = (text: string) => {
  // Match number patterns with potential decimal, thousands separators
  const match = text.match(/^(.*?)(\d+(?:[,.\s]\d+)*)(.*)$/);
  if (match) {
    const prefix = match[1];
    const numberStr = match[2].replace(/[\s,]/g, '').replace(',', '.');
    const suffix = match[3];
    const num = parseFloat(numberStr);
    
    if (!isNaN(num)) {
      return { prefix, number: num, suffix, hasDecimal: numberStr.includes('.') };
    }
  }
  return null;
};

const AnimatedMetric = ({ text, isVisible }: AnimatedMetricProps) => {
  const [displayValue, setDisplayValue] = useState<string>(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const parsed = parseMetric(text);

  useEffect(() => {
    if (!isVisible || hasAnimated || !parsed) return;

    setHasAnimated(true);
    const duration = 1800;
    const startTime = Date.now();
    const endValue = parsed.number;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = easeOut * endValue;

      // Format with appropriate decimals
      const decimals = parsed.hasDecimal ? 1 : 0;
      const formatted = currentValue.toFixed(decimals).replace('.', ',');
      
      setDisplayValue(`${parsed.prefix}${formatted}${parsed.suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Final value with original formatting
        const finalFormatted = endValue.toFixed(decimals).replace('.', ',');
        setDisplayValue(`${parsed.prefix}${finalFormatted}${parsed.suffix}`);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, hasAnimated, parsed]);

  return (
    <span className="text-primary font-semibold tabular-nums">
      {displayValue}
    </span>
  );
};

export default AnimatedMetric;
