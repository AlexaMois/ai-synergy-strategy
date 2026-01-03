import { useState, useEffect } from 'react';
import { DiagnosticData, CalculationResult } from './types';
import AnimatedNumber from '@/components/AnimatedNumber';
import { cn } from '@/lib/utils';
import CTAScreen from './CTAScreen';
import { TrendingUp, AlertTriangle, Clock, Target, Gauge, Lightbulb, CheckCircle2, Zap } from 'lucide-react';

interface ResultScreenProps {
  data: DiagnosticData;
  result: CalculationResult;
  onSubmit: () => void;
}

type BlockName = 'all';

const ResultScreen = ({ data, result, onSubmit }: ResultScreenProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const primaryPainPoint = data.painPoints[0] || 'ручная работа';
  const topZones = data.painPoints.slice(0, 2);

  const getReadinessColor = () => {
    if (result.aiReadinessScore < 40) return 'bg-amber-500';
    if (result.aiReadinessScore < 70) return 'bg-primary';
    return 'bg-emerald-500';
  };

  return (
    <div className={cn("space-y-4 transition-opacity duration-500", visible ? "opacity-100" : "opacity-0")}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI-диагностика — результат</h2>
          <p className="text-xs text-muted-foreground">На основе введённых параметров</p>
        </div>
      </div>

      {/* Row 1: Главные метрики */}
      <div className="grid md:grid-cols-3 gap-3">
        {/* Экономический эффект */}
        <div className="bg-gradient-to-br from-primary/5 to-emerald-500/5 rounded-xl p-4 border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Потенциал / год</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-foreground">
            <span className="text-primary">
              <AnimatedNumber value={Math.round(result.minSavings / 1000)} suffix="" duration={1200} />
            </span>
            –
            <span className="text-primary">
              <AnimatedNumber value={Math.round(result.maxSavings / 1000)} suffix="K" duration={1400} />
            </span>
            <span className="text-sm font-normal text-muted-foreground ml-1">₽</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            ROI ~<AnimatedNumber value={Math.max(0, result.roi)} suffix="%" duration={1000} /> • Окупаемость 2–4 мес.
          </div>
        </div>

        {/* Потери */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Потери / мес.</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-foreground">
            <AnimatedNumber value={Math.round(result.minMonthlyLosses / 1000)} suffix="" duration={1200} />
            –
            <AnimatedNumber value={Math.round(result.maxMonthlyLosses / 1000)} suffix="K" duration={1400} />
            <span className="text-sm font-normal text-muted-foreground ml-1">₽</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            ~<AnimatedNumber value={result.inefficientHours} suffix="" duration={1000} /> ч неэффективного времени
          </div>
        </div>

        {/* Риски */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Риски / год</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-foreground">
            <AnimatedNumber value={Math.round(result.minErrorLosses / 1000)} suffix="" duration={1200} />
            –
            <AnimatedNumber value={Math.round(result.maxErrorLosses / 1000)} suffix="K" duration={1400} />
            <span className="text-sm font-normal text-muted-foreground ml-1">₽</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            До <AnimatedNumber value={result.managerControlHours} suffix="" duration={1000} /> ч/мес на контроль
          </div>
        </div>
      </div>

      {/* Row 2: Готовность + Зоны эффекта */}
      <div className="grid md:grid-cols-2 gap-3">
        {/* Индекс готовности */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-foreground">Готовность к ИИ</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              <AnimatedNumber value={result.aiReadinessScore} suffix="" duration={1200} />
              <span className="text-sm font-normal text-muted-foreground">/100</span>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
            <div
              className={cn("h-full rounded-full transition-all duration-1000", getReadinessColor())}
              style={{ width: `${result.aiReadinessScore}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-1 text-[10px] text-center">
            <div className={cn("py-1 rounded", result.aiReadinessScore < 40 ? "bg-amber-500/10 text-amber-600 font-medium" : "text-muted-foreground")}>
              0–40 Подготовка
            </div>
            <div className={cn("py-1 rounded", result.aiReadinessScore >= 40 && result.aiReadinessScore < 70 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground")}>
              40–70 Пилот
            </div>
            <div className={cn("py-1 rounded", result.aiReadinessScore >= 70 ? "bg-emerald-500/10 text-emerald-600 font-medium" : "text-muted-foreground")}>
              70+ Масштаб
            </div>
          </div>
        </div>

        {/* Зоны максимального эффекта */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-medium text-foreground">Зоны максимального эффекта</span>
          </div>
          <div className="space-y-2">
            {topZones.map((zone, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-violet-500 flex-shrink-0" />
                <span className="text-foreground">{zone}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            Источник: {primaryPainPoint.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Row 3: Вывод + CTA */}
      <div className="grid md:grid-cols-2 gap-3">
        {/* Вывод */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Вывод</span>
          </div>
          <p className="text-sm text-foreground mb-1">Потенциал есть.</p>
          <p className="text-xs text-muted-foreground mb-2">
            Точный эффект возможен после разборки процессов.
          </p>
          <p className="text-sm text-primary font-semibold">
            → Следующий шаг — диагностика
          </p>
        </div>

        {/* Важно учитывать */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Важно учитывать</span>
          </div>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-rose-400" />
              Решения без архитектуры = рост ошибок
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-rose-400" />
              «Дешёвые боты» не дают ROI
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-rose-400" />
              Нужны метрики и ответственность
            </li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <CTAScreen onSubmit={onSubmit} data={data} result={result} />
      </div>
    </div>
  );
};

export default ResultScreen;