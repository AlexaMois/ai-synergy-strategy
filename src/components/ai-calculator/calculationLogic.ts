import { DiagnosticData, CalculationResult } from './types';

const AUTOMATION_COEFFICIENT = 0.5; // A = 0.5
const IMPLEMENTATION_COST = 150000; // 150 000 ₽

// Типовые коэффициенты стоимости ошибки на сотрудника в год
const ERROR_COSTS: Record<string, number> = {
  'Ошибки в документах (опечатки, неверные реквизиты)': 15000,
  'Ошибки в заказах (не то количество, не тот артикул)': 40000,
  'Ошибки в расчётах и отчётах': 25000,
  'Пропущенные сроки и дедлайны': 30000,
};

// Коэффициенты критичности
const CRITICALITY_MULTIPLIERS: Record<string, number> = {
  'Ошибки почти не влияют': 0.3,
  'Иногда приводят к потерям': 0.6,
  'Часто стоят денег или клиентов': 1.0,
};

export const calculateResults = (data: DiagnosticData): CalculationResult => {
  const N = data.employeeCount;
  const S = data.avgSalary;
  const T = data.routineTimeShare;
  const A = AUTOMATION_COEFFICIENT;

  // Годовые затраты = N × S × 12 × T
  const yearlyCosts = N * S * 12 * T;

  // Потенциальная экономия = Годовые затраты × A
  const potentialSavings = yearlyCosts * A;

  // Чистая экономия = Потенциальная экономия − Стоимость внедрения
  const netSavings = potentialSavings - IMPLEMENTATION_COST;

  // ROI (%) = (Чистая экономия / Стоимость внедрения) × 100
  const roi = (netSavings / IMPLEMENTATION_COST) * 100;

  // Диапазон ±20%
  const minSavings = potentialSavings * 0.8;
  const maxSavings = potentialSavings * 1.2;

  // Месячные потери (для блока "Стоимость бездействия")
  const minMonthlyLosses = minSavings / 12;
  const maxMonthlyLosses = maxSavings / 12;

  // Неэффективные часы в месяц = N × 168 × T × A (168 = рабочих часов в месяце)
  const inefficientHours = Math.round(N * 168 * T * A);

  // === НОВЫЕ РАСЧЁТЫ ===

  // 1. Стоимость ошибок
  const criticalityMultiplier = CRITICALITY_MULTIPLIERS[data.errorCriticality] || 0.5;
  const errorTypes = data.errorTypes || [];
  const sumOfSelectedErrors = errorTypes.reduce((sum, type) => sum + (ERROR_COSTS[type] || 20000), 0);
  // Если ничего не выбрано, берём среднее значение
  const baseErrorCost = errorTypes.length > 0 ? sumOfSelectedErrors : 25000;
  const errorLosses = N * baseErrorCost * T * criticalityMultiplier;
  const minErrorLosses = errorLosses * 0.6; // ±40% диапазон
  const maxErrorLosses = errorLosses * 1.4;

  // 2. Управленческая нагрузка (скрытый расчёт)
  const managerTimePerEmployee = 2; // часов в месяц на сотрудника
  let managerControlHours = N * T * managerTimePerEmployee;
  // Для компаний >10 сотрудников добавляем коэффициент 1.3
  if (N > 10) managerControlHours *= 1.3;
  managerControlHours = Math.round(managerControlHours);

  // 3. AI Readiness Score (0-100)
  let score = 50; // базовый уровень

  // + Много рутины = больше потенциал
  if (T >= 0.4) score += 15;
  if (T >= 0.6) score += 10;

  // + Критичность ошибок = мотивация
  if (data.errorCriticality === 'Часто стоят денег или клиентов') score += 15;
  if (data.errorCriticality === 'Иногда приводят к потерям') score += 8;

  // + Количество сотрудников = масштаб
  if (N >= 5) score += 5;
  if (N >= 15) score += 10;

  // + Типы болей (структурированность)
  if (data.painPoints.includes('Документы и первичка')) score += 5;
  if (data.painPoints.includes('Отчёты и аналитика')) score += 5;

  // - Слишком много разных болей = хаос
  if (data.painPoints.length > 4) score -= 10;

  // Ограничиваем 0-100
  const aiReadinessScore = Math.max(0, Math.min(100, score));
  
  // Определяем уровень
  let aiReadinessLevel: 'low' | 'medium' | 'high' = 'medium';
  if (aiReadinessScore < 40) aiReadinessLevel = 'low';
  else if (aiReadinessScore >= 70) aiReadinessLevel = 'high';

  return {
    yearlyCosts,
    potentialSavings,
    implementationCost: IMPLEMENTATION_COST,
    netSavings,
    roi: Math.round(roi),
    minSavings,
    maxSavings,
    minMonthlyLosses,
    maxMonthlyLosses,
    inefficientHours,
    minErrorLosses,
    maxErrorLosses,
    managerControlHours,
    aiReadinessScore,
    aiReadinessLevel,
  };
};

export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace('.', ',')} млн`;
  }
  if (value >= 1000) {
    return `${Math.round(value / 1000)} тыс.`;
  }
  return value.toLocaleString('ru-RU');
};

export const formatFullCurrency = (value: number): string => {
  return value.toLocaleString('ru-RU');
};
