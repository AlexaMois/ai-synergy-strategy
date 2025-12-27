import { useState, useEffect } from 'react';
import { DiagnosticData, CalculationResult } from './types';
import AnimatedNumber from '@/components/AnimatedNumber';
import TypewriterText from '@/components/TypewriterText';
import { cn } from '@/lib/utils';
import CTAScreen from './CTAScreen';

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

  // Получаем первый pain point для блока "Стоимость бездействия"
  const primaryPainPoint = data.painPoints[0] || 'ручная работа и поиск информации';

  // Для блока зон показываем только 1-2 пункта
  const topZones = data.painPoints.slice(0, 2);

  // Интерпретация AI Readiness Score
  const getReadinessDescription = () => {
    if (result.aiReadinessScore < 40) return 'Сначала порядок — нужна подготовка процессов';
    if (result.aiReadinessScore < 70) return 'Можно начинать с пилота — готовы к первым шагам';
    return 'Можно масштабировать — высокая готовность';
  };

  return (
    <div className="space-y-8">
      {/* Блок 1. Executive Summary */}
      <div 
        className={cn(
          "opacity-0",
          isVisible('executive') && "animate-fade-in-up"
        )}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          AI-диагностика бизнес-процессов — предварительный вывод
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          На основе введённых параметров система оценила потенциал управленческого эффекта 
          от внедрения ИИ и выявила зоны максимальной отдачи.
        </p>
      </div>

      <div className={cn("border-t border-border", isVisible('figures') ? "opacity-100" : "opacity-0")} />

      {/* Блок 2. Ключевые цифры */}
      <div 
        className={cn(
          "opacity-0",
          isVisible('figures') && "animate-fade-in-up"
        )}
      >
        <h3 className="text-lg font-medium text-foreground mb-4">
          Потенциал экономического эффекта
        </h3>
        
        <div className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          ≈{' '}
          {isVisible('figures') && (
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
          <span className="text-lg font-normal text-muted-foreground ml-2">/ год</span>
        </div>

        <div className="flex flex-wrap gap-6 text-muted-foreground mb-4">
          <span>
            Типичный ROI: ~
            {isVisible('figures') && (
              <AnimatedNumber value={Math.max(0, result.roi)} suffix="%" duration={1600} />
            )}
          </span>
          <span>Окупаемость: ~2–4 месяца</span>
        </div>

        <p className="text-sm text-muted-foreground/70">
          Расчёт основан на данных о численности сотрудников, ФОТ и доле рутинных операций. 
          Не учитывает вторичные эффекты (ошибки, простои, управленческие задержки).
        </p>
      </div>

      <div className={cn("border-t border-border", isVisible('inaction') ? "opacity-100" : "opacity-0")} />

      {/* Блок 3. Стоимость бездействия */}
      <div 
        className={cn(
          "opacity-0",
          isVisible('inaction') && "animate-fade-in-up"
        )}
      >
        <h3 className="text-lg font-medium text-foreground mb-4">
          Стоимость сохранения текущей модели
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="text-muted-foreground">
            <span className="text-foreground">Потери:</span>{' '}
            ≈{' '}
            {isVisible('inaction') && (
              <>
                <AnimatedNumber
                  value={Math.round(result.minMonthlyLosses)}
                  suffix=""
                  duration={1400}
                />{' '}
                –{' '}
                <AnimatedNumber
                  value={Math.round(result.maxMonthlyLosses)}
                  suffix=" ₽"
                  duration={1600}
                />
              </>
            )}
            <span className="ml-1">в месяц</span>
          </div>
          
          <div className="text-muted-foreground">
            <span className="text-foreground">Неэффективное время:</span>{' '}
            ~{isVisible('inaction') && (
              <AnimatedNumber value={result.inefficientHours} suffix="" duration={1400} />
            )} часов / месяц
          </div>
          
          <div className="text-muted-foreground">
            <span className="text-foreground">Основной источник:</span>{' '}
            {primaryPainPoint.toLowerCase()}
          </div>
        </div>
      </div>

      <div className={cn("border-t border-border", isVisible('errorRisk') ? "opacity-100" : "opacity-0")} />

      {/* Блок 3.5. Риск-оценка (потери от ошибок) — НОВЫЙ */}
      <div 
        className={cn(
          "opacity-0",
          isVisible('errorRisk') && "animate-fade-in-up"
        )}
      >
        <h3 className="text-lg font-medium text-foreground mb-4">
          Риск-оценка
        </h3>
        
        <div className="text-muted-foreground mb-2">
          <span className="text-foreground">Потенциальные потери из-за ошибок:</span>{' '}
          ≈{' '}
          {isVisible('errorRisk') && (
            <>
              <AnimatedNumber
                value={Math.round(result.minErrorLosses)}
                suffix=""
                duration={1400}
              />{' '}
              –{' '}
              <AnimatedNumber
                value={Math.round(result.maxErrorLosses)}
                suffix=" ₽"
                duration={1600}
              />
            </>
          )}
          <span className="ml-1">в год</span>
        </div>

        <p className="text-sm text-muted-foreground/70">
          Не учитывает репутационные и вторичные потери.
        </p>
      </div>

      <div className={cn("border-t border-border", isVisible('managerLoad') ? "opacity-100" : "opacity-0")} />

      {/* Блок 3.6. Невидимая нагрузка — НОВЫЙ */}
      <div 
        className={cn(
          "opacity-0",
          isVisible('managerLoad') && "animate-fade-in-up"
        )}
      >
        <h3 className="text-lg font-medium text-foreground mb-4">
          Невидимая нагрузка
        </h3>
        
        <div className="text-muted-foreground mb-2">
          <span className="text-foreground">До{' '}
            {isVisible('managerLoad') && (
              <AnimatedNumber value={result.managerControlHours} suffix="" duration={1200} />
            )}
            {' '}часов управленческого времени в месяц</span>
          <br />
          уходит на ручной контроль и уточнения.
        </div>

        <p className="text-sm text-muted-foreground/70 italic">
          ИИ снижает не только ФОТ, но и управленческую перегрузку.
        </p>
      </div>

      <div className={cn("border-t border-border", isVisible('zones') ? "opacity-100" : "opacity-0")} />

      {/* Блок 4. Зоны максимального эффекта */}
      <div 
        className={cn(
          "opacity-0",
          isVisible('zones') && "animate-fade-in-up"
        )}
      >
        <h3 className="text-lg font-medium text-foreground mb-4">
          {isVisible('zones') && (
            <TypewriterText 
              text="Наибольший эффект ИИ в вашей конфигурации:"
              speed={20}
            />
          )}
        </h3>
        
        <ul className="space-y-2 mb-4">
          {topZones.map((zone, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-foreground opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${800 + index * 200}ms` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
              {zone}
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted-foreground/70 italic">
          Это типично для компаний с распределённой документацией и высокой долей экспертизы «в головах».
        </p>
      </div>

      <div className={cn("border-t border-border", isVisible('readiness') ? "opacity-100" : "opacity-0")} />

      {/* Блок 4.5. Индекс готовности к внедрению ИИ — НОВЫЙ */}
      <div 
        className={cn(
          "opacity-0",
          isVisible('readiness') && "animate-fade-in-up"
        )}
      >
        <h3 className="text-lg font-medium text-foreground mb-4">
          Индекс готовности к внедрению ИИ
        </h3>
        
        <div className="mb-4">
          <div className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
            {isVisible('readiness') && (
              <AnimatedNumber value={result.aiReadinessScore} suffix="" duration={1500} />
            )}
            <span className="text-lg font-normal text-muted-foreground ml-1">/ 100</span>
          </div>
          
          {/* Progress bar */}
          <div className="h-3 bg-muted rounded-full overflow-hidden mb-3">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                result.aiReadinessLevel === 'low' && "bg-muted-foreground",
                result.aiReadinessLevel === 'medium' && "bg-primary",
                result.aiReadinessLevel === 'high' && "bg-primary"
              )}
              style={{ 
                width: isVisible('readiness') ? `${result.aiReadinessScore}%` : '0%',
                transitionDelay: '500ms'
              }}
            />
          </div>

          <p className="text-muted-foreground">
            {getReadinessDescription()}
          </p>
        </div>

        <div className="text-sm text-muted-foreground/70 space-y-1">
          <div className={cn("flex items-center gap-2", result.aiReadinessScore < 40 && "text-foreground font-medium")}>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            0–40 — сначала порядок
          </div>
          <div className={cn("flex items-center gap-2", result.aiReadinessScore >= 40 && result.aiReadinessScore < 70 && "text-foreground font-medium")}>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            40–70 — можно начинать с пилота
          </div>
          <div className={cn("flex items-center gap-2", result.aiReadinessScore >= 70 && "text-foreground font-medium")}>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            70+ — можно масштабировать
          </div>
        </div>
      </div>

      <div className={cn("border-t border-border", isVisible('risks') ? "opacity-100" : "opacity-0")} />

      {/* Блок 5. Риск-блок */}
      <div 
        className={cn(
          "opacity-0",
          isVisible('risks') && "animate-fade-in-up"
        )}
      >
        <h3 className="text-lg font-medium text-foreground mb-3">
          Важно учитывать
        </h3>
        
        <p className="text-muted-foreground mb-4">
          {isVisible('risks') && (
            <TypewriterText 
              text="Решения без архитектуры и подготовки команды часто приводят не к экономии, а к росту ошибок и сопротивлению."
              speed={15}
              delay={200}
            />
          )}
        </p>

        <ul className="space-y-1 text-sm text-muted-foreground/70">
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            отсутствие метрик
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            «дешёвые боты»
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            нет ответственности за результат
          </li>
        </ul>
      </div>

      <div className={cn("border-t border-border", isVisible('conclusion') ? "opacity-100" : "opacity-0")} />

      {/* Блок 6. Управленческий вывод */}
      <div 
        className={cn(
          "opacity-0",
          isVisible('conclusion') && "animate-fade-in-up"
        )}
      >
        <h3 className="text-lg font-medium text-foreground mb-3">
          Вывод
        </h3>
        
        <div className="text-muted-foreground space-y-2">
          <p>Потенциал есть.</p>
          <p>Но точный эффект возможен только после разборки процессов и данных.</p>
          <p className="text-foreground font-medium">
            Следующий рациональный шаг — управленческая диагностика.
          </p>
        </div>
      </div>

      <div className={cn("border-t border-border", isVisible('cta') ? "opacity-100" : "opacity-0")} />

      {/* Блок 7. CTA */}
      <div 
        className={cn(
          "opacity-0",
          isVisible('cta') && "animate-fade-in-up"
        )}
      >
        <CTAScreen onSubmit={onSubmit} data={data} result={result} />
      </div>
    </div>
  );
};

export default ResultScreen;