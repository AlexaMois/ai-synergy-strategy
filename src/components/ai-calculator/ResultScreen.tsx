import { DiagnosticData, CalculationResult } from './types';
import { formatCurrency, formatFullCurrency } from './calculationLogic';
import AnimatedNumber from '@/components/AnimatedNumber';
import { TrendingUp, Target, AlertTriangle, Sparkles } from 'lucide-react';

interface ResultScreenProps {
  data: DiagnosticData;
  result: CalculationResult;
}

const ResultScreen = ({ data, result }: ResultScreenProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
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
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
          <div className="flex items-center gap-2 text-primary mb-3">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Потенциал экономии</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-foreground">
            ≈{' '}
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
          </div>
          <p className="text-sm text-muted-foreground mt-2">в год</p>
        </div>

        {/* ROI */}
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center gap-2 text-green-600 mb-3">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Типичный ROI</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-foreground">
            <AnimatedNumber
              value={Math.max(0, result.roi)}
              suffix="%"
              duration={1600}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">за 2–4 месяца</p>
        </div>
      </div>

      {/* Automation zones */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-2 text-primary mb-4">
          <Target className="w-5 h-5" />
          <span className="font-medium">Наибольший эффект ИИ даст в зонах:</span>
        </div>
        <ul className="space-y-2">
          {data.painPoints.map((point, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-foreground animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-foreground font-medium mb-1">Важно учитывать</p>
            <p className="text-sm text-muted-foreground">
              Дешёвые решения в такой конфигурации часто приводят к росту ошибок и сопротивлению команды
            </p>
          </div>
        </div>
      </div>

      {/* Details summary */}
      <div className="bg-muted/50 rounded-xl p-4 text-sm">
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
