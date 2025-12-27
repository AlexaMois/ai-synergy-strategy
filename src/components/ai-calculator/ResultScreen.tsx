import { useState, useEffect } from 'react';
import { DiagnosticData, CalculationResult } from './types';
import { formatFullCurrency } from './calculationLogic';
import AnimatedNumber from '@/components/AnimatedNumber';
import TypewriterText from '@/components/TypewriterText';
import { TrendingUp, Target, AlertTriangle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultScreenProps {
  data: DiagnosticData;
  result: CalculationResult;
}

type BlockName = 'header' | 'savings' | 'roi' | 'zones' | 'warning' | 'details';

const ResultScreen = ({ data, result }: ResultScreenProps) => {
  const [visibleBlocks, setVisibleBlocks] = useState<BlockName[]>([]);
  const [zonesTypingComplete, setZonesTypingComplete] = useState(false);

  useEffect(() => {
    const delays: { block: BlockName; delay: number }[] = [
      { block: 'header', delay: 0 },
      { block: 'savings', delay: 300 },
      { block: 'roi', delay: 600 },
      { block: 'zones', delay: 900 },
      { block: 'warning', delay: 1400 },
      { block: 'details', delay: 1800 },
    ];

    delays.forEach(({ block, delay }) => {
      setTimeout(() => {
        setVisibleBlocks(prev => [...prev, block]);
      }, delay);
    });
  }, []);

  const isVisible = (block: BlockName) => visibleBlocks.includes(block);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div 
        className={cn(
          "text-center mb-8 opacity-0",
          isVisible('header') && "animate-fade-in-up"
        )}
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Анализ завершён</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
          Результат AI-анализа вашего бизнеса
        </h2>
      </div>

      {/* Main metrics */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Potential savings */}
        <div 
          className={cn(
            "bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20 opacity-0",
            isVisible('savings') && "animate-fade-in-up"
          )}
        >
          <div className="flex items-center gap-2 text-primary mb-3">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Потенциал экономии</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-foreground">
            ≈{' '}
            {isVisible('savings') && (
              <>
                <AnimatedNumber
                  value={Math.round(result.minSavings)}
                  suffix=""
                  duration={1500}
                />{' '}
                –{' '}
                <AnimatedNumber
                  value={Math.round(result.maxSavings)}
                  suffix=" ₽"
                  duration={1800}
                />
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">в год</p>
        </div>

        {/* ROI */}
        <div 
          className={cn(
            "bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl p-6 border border-green-500/20 opacity-0",
            isVisible('roi') && "animate-fade-in-up"
          )}
        >
          <div className="flex items-center gap-2 text-green-600 mb-3">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Типичный ROI</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-foreground">
            {isVisible('roi') && (
              <AnimatedNumber
                value={Math.max(0, result.roi)}
                suffix="%"
                duration={1600}
              />
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">за 2–4 месяца</p>
        </div>
      </div>

      {/* Automation zones */}
      <div 
        className={cn(
          "bg-card rounded-2xl p-6 border border-border opacity-0",
          isVisible('zones') && "animate-fade-in-up"
        )}
      >
        <div className="flex items-center gap-2 text-primary mb-4">
          <Target className="w-5 h-5" />
          <span className="font-medium">
            {isVisible('zones') && (
              <TypewriterText 
                text="Наибольший эффект ИИ даст в зонах:"
                speed={25}
                onComplete={() => setZonesTypingComplete(true)}
              />
            )}
          </span>
        </div>
        {zonesTypingComplete && (
          <ul className="space-y-2">
            {data.painPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-foreground opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="w-2 h-2 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Warning */}
      <div 
        className={cn(
          "bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800 opacity-0",
          isVisible('warning') && "animate-fade-in-up"
        )}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-foreground font-medium mb-1">Важно учитывать</p>
            <p className="text-sm text-muted-foreground">
              {isVisible('warning') && (
                <TypewriterText 
                  text="Дешёвые решения в такой конфигурации часто приводят к росту ошибок и сопротивлению команды"
                  speed={20}
                  delay={300}
                />
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Details summary */}
      <div 
        className={cn(
          "bg-muted/50 rounded-xl p-4 text-sm opacity-0",
          isVisible('details') && "animate-fade-in-up"
        )}
      >
        <p className="text-muted-foreground">
          <strong className="text-foreground">Параметры расчёта:</strong>{' '}
          {data.employeeCount} сотрудников, ср. зарплата {formatFullCurrency(data.avgSalary)} ₽, 
          {' '}доля времени на рутину {Math.round(data.routineTimeShare * 100)}%
        </p>
      </div>
    </div>
  );
};

export default ResultScreen;
