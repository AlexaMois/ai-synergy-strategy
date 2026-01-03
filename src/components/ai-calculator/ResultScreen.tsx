import { useState, useEffect } from 'react';
import { DiagnosticData, CalculationResult } from './types';
import AnimatedNumber from '@/components/AnimatedNumber';
import TypewriterText from '@/components/TypewriterText';
import { cn } from '@/lib/utils';
import CTAScreen from './CTAScreen';
import { TrendingUp, AlertTriangle, Clock, Target, Gauge, Lightbulb, CheckCircle2, Zap } from 'lucide-react';

interface ResultScreenProps {
  data: DiagnosticData;
  result: CalculationResult;
  onSubmit: () => void;
}

type BlockName = 'executive' | 'figures' | 'inaction' | 'errorRisk' | 'managerLoad' | 'zones' | 'readiness' | 'risks' | 'conclusion' | 'cta';

const ResultScreen = ({ data, result, onSubmit }: ResultScreenProps) => {
  const [visibleBlocks, setVisibleBlocks] = useState<BlockName[]>([]);

  useEffect(() => {
    const delays: { block: BlockName; delay: number }[] = [
      { block: 'executive', delay: 0 },
      { block: 'figures', delay: 400 },
      { block: 'inaction', delay: 800 },
      { block: 'errorRisk', delay: 1000 },
      { block: 'managerLoad', delay: 1200 },
      { block: 'zones', delay: 1400 },
      { block: 'readiness', delay: 1600 },
      { block: 'risks', delay: 1800 },
      { block: 'conclusion', delay: 2000 },
      { block: 'cta', delay: 2200 },
    ];

    delays.forEach(({ block, delay }) => {
      setTimeout(() => {
        setVisibleBlocks(prev => [...prev, block]);
      }, delay);
    });
  }, []);

  const isVisible = (block: BlockName) => visibleBlocks.includes(block);

  const primaryPainPoint = data.painPoints[0] || 'ручная работа и поиск информации';
  const topZones = data.painPoints.slice(0, 2);

  const getReadinessDescription = () => {
    if (result.aiReadinessScore < 40) return 'Сначала порядок — нужна подготовка процессов';
    if (result.aiReadinessScore < 70) return 'Можно начинать с пилота — готовы к первым шагам';
    return 'Можно масштабировать — высокая готовность';
  };

  return (
    <div className="space-y-6">
      {/* Блок 1. Executive Summary */}
      <div 
        className={cn(
          "opacity-0 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-2xl p-6 md:p-8 border border-primary/10",
          isVisible('executive') && "animate-fade-in-up"
        )}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
              AI-диагностика бизнес-процессов
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              На основе введённых параметров система оценила потенциал управленческого эффекта 
              от внедрения ИИ и выявила зоны максимальной отдачи.
            </p>
          </div>
        </div>
      </div>

      {/* Блок 2. Ключевые цифры */}
      <div 
        className={cn(
          "opacity-0 bg-card rounded-2xl p-6 md:p-8 border border-border shadow-soft",
          isVisible('figures') && "animate-fade-in-up"
        )}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-lg font-medium text-foreground">
            Потенциал экономического эффекта
          </h3>
        </div>
        
        <div className="bg-gradient-to-r from-primary/5 to-emerald-500/5 rounded-xl p-5 mb-6">
          <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            ≈{' '}
            {isVisible('figures') && (
              <>
                <span className="text-primary">
                  <AnimatedNumber value={Math.round(result.minSavings)} suffix="" duration={1500} />
                </span>
                {' '}–{' '}
                <span className="text-primary">
                  <AnimatedNumber value={Math.round(result.maxSavings)} suffix="" duration={1800} />
                </span>
                {' '}₽
              </>
            )}
            <span className="text-base font-normal text-muted-foreground ml-2">/ год</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Типичный ROI</div>
            <div className="text-xl font-semibold text-foreground">
              ~{isVisible('figures') && <AnimatedNumber value={Math.max(0, result.roi)} suffix="%" duration={1600} />}
            </div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Окупаемость</div>
            <div className="text-xl font-semibold text-foreground">~2–4 мес.</div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/70 mt-4">
          Расчёт основан на численности сотрудников, ФОТ и доле рутинных операций. 
          Не учитывает вторичные эффекты.
        </p>
      </div>

      {/* Grid: Стоимость бездействия + Риск-оценка */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Блок 3. Стоимость бездействия */}
        <div 
          className={cn(
            "opacity-0 bg-card rounded-2xl p-6 border border-border shadow-soft",
            isVisible('inaction') && "animate-fade-in-up"
          )}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-base font-medium text-foreground">
              Стоимость бездействия
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1">Потери в месяц</div>
              <div className="text-lg font-semibold text-foreground">
                ≈{' '}
                {isVisible('inaction') && (
                  <>
                    <AnimatedNumber value={Math.round(result.minMonthlyLosses)} suffix="" duration={1400} />
                    {' '}–{' '}
                    <AnimatedNumber value={Math.round(result.maxMonthlyLosses)} suffix=" ₽" duration={1600} />
                  </>
                )}
              </div>
            </div>
            
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1">Неэффективное время</div>
              <div className="text-lg font-semibold text-foreground">
                ~{isVisible('inaction') && <AnimatedNumber value={result.inefficientHours} suffix="" duration={1400} />} ч/мес
              </div>
            </div>
            
            <div className="pt-2 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Основной источник: <span className="text-foreground">{primaryPainPoint.toLowerCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Блок 3.5. Риск-оценка */}
        <div 
          className={cn(
            "opacity-0 bg-card rounded-2xl p-6 border border-border shadow-soft",
            isVisible('errorRisk') && "animate-fade-in-up"
          )}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            </div>
            <h3 className="text-base font-medium text-foreground">
              Риск-оценка
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1">Потери от ошибок в год</div>
              <div className="text-lg font-semibold text-foreground">
                ≈{' '}
                {isVisible('errorRisk') && (
                  <>
                    <AnimatedNumber value={Math.round(result.minErrorLosses)} suffix="" duration={1400} />
                    {' '}–{' '}
                    <AnimatedNumber value={Math.round(result.maxErrorLosses)} suffix=" ₽" duration={1600} />
                  </>
                )}
              </div>
            </div>
            
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1">Управленческая нагрузка</div>
              <div className="text-lg font-semibold text-foreground">
                до {isVisible('errorRisk') && <AnimatedNumber value={result.managerControlHours} suffix="" duration={1200} />} ч/мес
              </div>
            </div>

            <p className="text-xs text-muted-foreground/70 pt-2 border-t border-border">
              Не учитывает репутационные и вторичные потери
            </p>
          </div>
        </div>
      </div>

      {/* Блок 4. Зоны максимального эффекта */}
      <div 
        className={cn(
          "opacity-0 bg-card rounded-2xl p-6 md:p-8 border border-border shadow-soft",
          isVisible('zones') && "animate-fade-in-up"
        )}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-violet-500" />
          </div>
          <h3 className="text-lg font-medium text-foreground">
            {isVisible('zones') && (
              <TypewriterText 
                text="Зоны максимального эффекта"
                speed={25}
              />
            )}
          </h3>
        </div>
        
        <div className="space-y-3 mb-4">
          {topZones.map((zone, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-violet-500/5 border border-violet-500/10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${800 + index * 200}ms` }}
            >
              <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0" />
              <span className="text-foreground">{zone}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground/70 italic">
          Это типично для компаний с распределённой документацией и высокой долей экспертизы «в головах».
        </p>
      </div>

      {/* Блок 4.5. Индекс готовности */}
      <div 
        className={cn(
          "opacity-0 bg-card rounded-2xl p-6 md:p-8 border border-border shadow-soft",
          isVisible('readiness') && "animate-fade-in-up"
        )}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Gauge className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-lg font-medium text-foreground">
            Индекс готовности к ИИ
          </h3>
        </div>
        
        <div className="flex items-end gap-4 mb-4">
          <div className="text-5xl md:text-6xl font-bold text-primary">
            {isVisible('readiness') && (
              <AnimatedNumber value={result.aiReadinessScore} suffix="" duration={1500} />
            )}
          </div>
          <div className="text-xl text-muted-foreground mb-2">/ 100</div>
        </div>
        
        {/* Progress bar */}
        <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              result.aiReadinessLevel === 'low' && "bg-amber-500",
              result.aiReadinessLevel === 'medium' && "bg-primary",
              result.aiReadinessLevel === 'high' && "bg-emerald-500"
            )}
            style={{ 
              width: isVisible('readiness') ? `${result.aiReadinessScore}%` : '0%',
              transitionDelay: '500ms'
            }}
          />
        </div>

        <p className="text-foreground font-medium mb-4">
          {getReadinessDescription()}
        </p>

        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          <div className={cn(
            "py-2 px-1 rounded-lg transition-colors",
            result.aiReadinessScore < 40 ? "bg-amber-500/10 text-amber-600 font-medium" : "bg-muted/30 text-muted-foreground"
          )}>
            0–40<br/>Подготовка
          </div>
          <div className={cn(
            "py-2 px-1 rounded-lg transition-colors",
            result.aiReadinessScore >= 40 && result.aiReadinessScore < 70 ? "bg-primary/10 text-primary font-medium" : "bg-muted/30 text-muted-foreground"
          )}>
            40–70<br/>Пилот
          </div>
          <div className={cn(
            "py-2 px-1 rounded-lg transition-colors",
            result.aiReadinessScore >= 70 ? "bg-emerald-500/10 text-emerald-600 font-medium" : "bg-muted/30 text-muted-foreground"
          )}>
            70+<br/>Масштаб
          </div>
        </div>
      </div>

      {/* Блок 5. Риски + Вывод */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Риски */}
        <div 
          className={cn(
            "opacity-0 bg-card rounded-2xl p-6 border border-border shadow-soft",
            isVisible('risks') && "animate-fade-in-up"
          )}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-base font-medium text-foreground">
              Важно учитывать
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            {isVisible('risks') && (
              <TypewriterText 
                text="Решения без архитектуры часто приводят к росту ошибок."
                speed={20}
                delay={200}
              />
            )}
          </p>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              Отсутствие метрик
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              «Дешёвые боты»
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              Нет ответственности
            </li>
          </ul>
        </div>

        {/* Вывод */}
        <div 
          className={cn(
            "opacity-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20",
            isVisible('conclusion') && "animate-fade-in-up"
          )}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-base font-medium text-foreground">
              Вывод
            </h3>
          </div>
          
          <div className="space-y-3">
            <p className="text-foreground font-medium">
              Потенциал есть.
            </p>
            <p className="text-sm text-muted-foreground">
              Точный эффект возможен только после разборки процессов и данных.
            </p>
            <p className="text-primary font-semibold">
              → Следующий шаг — управленческая диагностика
            </p>
          </div>
        </div>
      </div>

      {/* Блок 7. CTA */}
      <div 
        className={cn(
          "opacity-0 bg-card rounded-2xl p-6 md:p-8 border border-border shadow-soft",
          isVisible('cta') && "animate-fade-in-up"
        )}
      >
        <CTAScreen onSubmit={onSubmit} data={data} result={result} />
      </div>
    </div>
  );
};

export default ResultScreen;