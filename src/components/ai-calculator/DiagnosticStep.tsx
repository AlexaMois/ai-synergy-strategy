import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PAIN_POINT_OPTIONS, TIME_SHARE_OPTIONS, ERROR_CRITICALITY_OPTIONS, ERROR_TYPE_OPTIONS } from './types';

interface DiagnosticStepProps {
  step: number;
  totalSteps: number;
  onNext: (value: string | string[] | number) => void;
  onBack?: () => void;
}

const DiagnosticStep = ({ step, totalSteps, onNext, onBack }: DiagnosticStepProps) => {
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [employeeCount, setEmployeeCount] = useState('');
  const [avgSalary, setAvgSalary] = useState('');
  const [selectedTimeShare, setSelectedTimeShare] = useState<number | null>(null);
  const [selectedCriticality, setSelectedCriticality] = useState<string | null>(null);
  const [selectedErrorTypes, setSelectedErrorTypes] = useState<string[]>([]);

  const handlePainPointToggle = (point: string) => {
    setSelectedPainPoints(prev =>
      prev.includes(point)
        ? prev.filter(p => p !== point)
        : [...prev, point]
    );
  };

  const handleErrorTypeToggle = (type: string) => {
    setSelectedErrorTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
              Где сейчас больше всего ручной работы?
            </h3>
            <p className="text-sm text-muted-foreground">
              Выберите все, что относится к вашей ситуации
            </p>
            <div className="space-y-3 mt-6">
              {PAIN_POINT_OPTIONS.map((option) => (
                <label
                  key={option}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all',
                    selectedPainPoints.includes(option)
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background hover:border-primary/50'
                  )}
                >
                  <Checkbox
                    checked={selectedPainPoints.includes(option)}
                    onCheckedChange={() => handlePainPointToggle(option)}
                  />
                  <span className="text-foreground">{option}</span>
                </label>
              ))}
            </div>
            <Button
              size="lg"
              className="w-full mt-6"
              disabled={selectedPainPoints.length === 0}
              onClick={() => onNext(selectedPainPoints)}
            >
              Продолжить
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
              Сколько сотрудников регулярно участвуют в этих процессах?
            </h3>
            <p className="text-sm text-muted-foreground">
              Только те, кто реально тратит на это время
            </p>
            <div className="mt-6">
              <Input
                type="number"
                placeholder="Например: 10"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
                className="text-lg h-14"
                min={1}
              />
            </div>
            <div className="flex gap-3 mt-6">
              {onBack && (
                <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
                  Назад
                </Button>
              )}
              <Button
                size="lg"
                className="flex-1"
                disabled={!employeeCount || parseInt(employeeCount) < 1}
                onClick={() => onNext(parseInt(employeeCount))}
              >
                Продолжить
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
              Средняя зарплата одного сотрудника в месяц (₽)
            </h3>
            <div className="mt-6">
              <Input
                type="number"
                placeholder="70 000"
                value={avgSalary}
                onChange={(e) => setAvgSalary(e.target.value)}
                className="text-lg h-14"
                min={10000}
              />
            </div>
            <div className="flex gap-3 mt-6">
              {onBack && (
                <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
                  Назад
                </Button>
              )}
              <Button
                size="lg"
                className="flex-1"
                disabled={!avgSalary || parseInt(avgSalary) < 10000}
                onClick={() => onNext(parseInt(avgSalary))}
              >
                Продолжить
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
              Какую часть рабочего времени занимает эта рутина?
            </h3>
            <div className="space-y-3 mt-6">
              {TIME_SHARE_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  className={cn(
                    'w-full text-left p-4 rounded-xl border transition-all',
                    selectedTimeShare === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background hover:border-primary/50'
                  )}
                  onClick={() => setSelectedTimeShare(option.value)}
                >
                  <span className="text-foreground">{option.label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              {onBack && (
                <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
                  Назад
                </Button>
              )}
              <Button
                size="lg"
                className="flex-1"
                disabled={selectedTimeShare === null}
                onClick={() => onNext(selectedTimeShare!)}
              >
                Продолжить
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
              Насколько критичны ошибки в этих процессах?
            </h3>
            <div className="space-y-3 mt-6">
              {ERROR_CRITICALITY_OPTIONS.map((option) => (
                <button
                  key={option}
                  className={cn(
                    'w-full text-left p-4 rounded-xl border transition-all',
                    selectedCriticality === option
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background hover:border-primary/50'
                  )}
                  onClick={() => setSelectedCriticality(option)}
                >
                  <span className="text-foreground">{option}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              {onBack && (
                <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
                  Назад
                </Button>
              )}
              <Button
                size="lg"
                className="flex-1"
                disabled={selectedCriticality === null}
                onClick={() => onNext(selectedCriticality!)}
              >
                Продолжить
              </Button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
              Какие типы ошибок случаются чаще всего?
            </h3>
            <p className="text-sm text-muted-foreground">
              Необязательно, можно пропустить
            </p>
            <div className="space-y-3 mt-6">
              {ERROR_TYPE_OPTIONS.map((option) => (
                <label
                  key={option}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all',
                    selectedErrorTypes.includes(option)
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background hover:border-primary/50'
                  )}
                >
                  <Checkbox
                    checked={selectedErrorTypes.includes(option)}
                    onCheckedChange={() => handleErrorTypeToggle(option)}
                  />
                  <span className="text-foreground text-sm">{option}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              {onBack && (
                <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
                  Назад
                </Button>
              )}
              <Button
                size="lg"
                className="flex-1"
                onClick={() => onNext(selectedErrorTypes)}
              >
                {selectedErrorTypes.length > 0 ? 'Завершить анализ' : 'Пропустить'}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border">
      {/* Progress indicator */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-medium text-primary">
          Вопрос {step} из {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">•</span>
        <span className="text-sm text-muted-foreground animate-pulse">
          AI анализирует ваш бизнес…
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full mb-8">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      {renderStep()}
    </div>
  );
};

export default DiagnosticStep;