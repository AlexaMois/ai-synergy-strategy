import { useTypewriter } from '@/hooks/use-typewriter';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  cursorChar?: string;
  className?: string;
  onComplete?: () => void;
  enabled?: boolean;
}

const TypewriterText = ({
  text,
  speed = 30,
  delay = 0,
  showCursor = true,
  cursorChar = '|',
  className,
  onComplete,
  enabled = true
}: TypewriterTextProps) => {
  const { displayedText, isTyping, isComplete } = useTypewriter({
    text,
    speed,
    delay,
    onComplete,
    enabled
  });

  return (
    <span className={cn('', className)}>
      {displayedText}
      {showCursor && (isTyping || !isComplete) && (
        <span className="animate-blink text-primary">{cursorChar}</span>
      )}
    </span>
  );
};

export default TypewriterText;
