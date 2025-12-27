import { DiagnosticData, CalculationResult } from './types';

const AUTOMATION_COEFFICIENT = 0.5; // A = 0.5
const IMPLEMENTATION_COST = 150000; // 150 000 ₽

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

  return {
    yearlyCosts,
    potentialSavings,
    implementationCost: IMPLEMENTATION_COST,
    netSavings,
    roi: Math.round(roi),
    minSavings,
    maxSavings,
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
