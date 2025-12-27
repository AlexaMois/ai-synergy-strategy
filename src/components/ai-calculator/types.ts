export interface DiagnosticData {
  painPoints: string[];
  employeeCount: number;
  avgSalary: number;
  routineTimeShare: number;
  errorCriticality: string;
  errorTypes: string[];
}

export interface CalculationResult {
  yearlyCosts: number;
  potentialSavings: number;
  implementationCost: number;
  netSavings: number;
  roi: number;
  minSavings: number;
  maxSavings: number;
  minMonthlyLosses: number;
  maxMonthlyLosses: number;
  inefficientHours: number;
  // Новые поля
  minErrorLosses: number;
  maxErrorLosses: number;
  managerControlHours: number;
  aiReadinessScore: number;
  aiReadinessLevel: 'low' | 'medium' | 'high';
}

export const PAIN_POINT_OPTIONS = [
  'Документы и первичка',
  'Обработка заявок и лидов',
  'Поиск информации / инструкции',
  'Контроль сроков и ошибок',
  'Отчёты и аналитика',
];

export const TIME_SHARE_OPTIONS = [
  { label: 'до 20%', value: 0.2 },
  { label: '20–40%', value: 0.4 },
  { label: '40–60%', value: 0.6 },
  { label: 'больше 60%', value: 0.6 },
];

export const ERROR_CRITICALITY_OPTIONS = [
  'Ошибки почти не влияют',
  'Иногда приводят к потерям',
  'Часто стоят денег или клиентов',
];

export const ERROR_TYPE_OPTIONS = [
  'Ошибки в документах (опечатки, неверные реквизиты)',
  'Ошибки в заказах (не то количество, не тот артикул)',
  'Ошибки в расчётах и отчётах',
  'Пропущенные сроки и дедлайны',
];
