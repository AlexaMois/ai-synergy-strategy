export interface DiagnosticData {
  painPoints: string[];
  employeeCount: number;
  avgSalary: number;
  routineTimeShare: number;
  errorCriticality: string;
}

export interface CalculationResult {
  yearlyCosts: number;
  potentialSavings: number;
  implementationCost: number;
  netSavings: number;
  roi: number;
  minSavings: number;
  maxSavings: number;
  // Новые поля для блока "Стоимость бездействия"
  minMonthlyLosses: number;
  maxMonthlyLosses: number;
  inefficientHours: number;
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
