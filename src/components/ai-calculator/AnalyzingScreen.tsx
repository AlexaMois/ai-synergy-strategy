import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnalyzingScreenProps {
  onComplete: () => void;
}

const analysisSteps = [
  'Определяю типичные потери...',
  'Рассчитываю потенциал экономии...',
  'Формирую рекомендации...',
];

const AnalyzingScreen = ({ onComplete }: AnalyzingScreenProps) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    // Show each step with delay
    analysisSteps.forEach((_, index) => {
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, index]);
      }, (index + 1) * 500);
    });

    // Complete after all steps + small delay
    const totalTime = analysisSteps.length * 500 + 800;
    const timer = setTimeout(onComplete, totalTime);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="bg-card rounded-2xl p-8 md:p-12 shadow-soft border border-border text-center">
      {/* Pulsing indicator */}
      <div className="relative w-20 h-20 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-primary/30 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-primary flex items-center justify-center">
          <svg
            className="w-8 h-8 text-primary-foreground animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-8">
        ИИ анализирует данные…
      </h2>

      <div className="space-y-4 max-w-sm mx-auto text-left">
        {analysisSteps.map((step, index) => (
          <div
            key={index}
            className={cn(
              'flex items-center gap-3 transition-all duration-500',
              completedSteps.includes(index)
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4'
            )}
          >
            <div className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300',
              completedSteps.includes(index) ? 'bg-green-500' : 'bg-muted'
            )}>
              {completedSteps.includes(index) && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-foreground">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyzingScreen;
