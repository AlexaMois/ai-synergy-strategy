import { jsPDF } from 'jspdf';
import { DiagnosticData, CalculationResult } from './types';

// Base64 encoded PTSans font (subset for Cyrillic)
const addCyrillicFont = async (doc: jsPDF) => {
  // Using standard fonts with encoding workaround
  // We'll use transliteration for reliable PDF output
  return doc;
};

const formatCurrency = (value: number): string => {
  return Math.round(value).toLocaleString('ru-RU');
};

const getReadinessLevel = (score: number): { ru: string; en: string } => {
  if (score < 40) return { ru: 'Низкий', en: 'Low (organize first)' };
  if (score < 70) return { ru: 'Средний', en: 'Medium (start with pilot)' };
  return { ru: 'Высокий', en: 'High (ready to scale)' };
};

const painPointsMap: Record<string, string> = {
  'Ошибки и переделки': 'Errors and rework',
  'Рутина и ручной труд': 'Routine and manual work',
  'Потеря данных': 'Data loss',
  'Неоптимальные закупки': 'Suboptimal procurement',
  'Простои и ожидание': 'Downtime and waiting',
  'Нехватка персонала': 'Staff shortage',
  'Текучка кадров': 'Staff turnover',
  'Медленные решения': 'Slow decision-making',
  'Контроль вручную': 'Manual control',
  'Хаос в документах': 'Document chaos',
  'Потери клиентов': 'Customer loss',
  'Дорогие поставщики': 'Expensive suppliers',
};

export const generatePDF = (data: DiagnosticData, result: CalculationResult) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Helper function to add text
  const addText = (text: string, x: number, yPos: number, options?: { fontSize?: number; fontStyle?: 'normal' | 'bold'; color?: [number, number, number] }) => {
    const { fontSize = 11, fontStyle = 'normal', color = [51, 51, 51] } = options || {};
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(text, x, yPos);
    return yPos + fontSize * 0.5;
  };

  const addLine = (yPos: number) => {
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    return yPos + 8;
  };

  // Title
  doc.setFillColor(30, 30, 40);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  addText('AI DIAGNOSTIC BRIEF', margin, 20, { fontSize: 18, fontStyle: 'bold', color: [255, 255, 255] });
  addText('Preliminary AI Potential Assessment for Your Business', margin, 32, { fontSize: 11, color: [180, 180, 180] });

  y = 55;
  
  // Date
  const today = new Date().toLocaleDateString('ru-RU');
  addText(`Date: ${today}`, margin, y, { fontSize: 10, color: [120, 120, 120] });
  y += 15;

  // Executive Summary
  y = addLine(y);
  addText('EXECUTIVE SUMMARY', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 10;
  
  const summaryLines = doc.splitTextToSize(
    'Based on the input parameters, the system evaluated the potential management impact of AI implementation and identified the zones of maximum return on investment.',
    contentWidth
  );
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 5 + 10;

  // Key Figures
  y = addLine(y);
  addText('KEY METRICS', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 12;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 51, 51);
  
  const keyFigures = [
    [`Economic Effect:`, `${formatCurrency(result.minSavings)} - ${formatCurrency(result.maxSavings)} RUB/year`],
    [`Typical ROI:`, `~${Math.max(0, result.roi)}%`],
    [`Payback Period:`, `~2-4 months`],
    [`Cost of Inaction:`, `${formatCurrency(result.minMonthlyLosses)} - ${formatCurrency(result.maxMonthlyLosses)} RUB/month`],
    [`Inefficient Time:`, `~${result.inefficientHours} hours/month`],
  ];

  keyFigures.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.text(label, margin, y);
    doc.setFont('helvetica', 'bold');
    doc.text(value, margin + 50, y);
    y += 6;
  });
  y += 5;

  // Risk Assessment
  y = addLine(y);
  addText('RISK ASSESSMENT', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 12;

  const riskFigures = [
    [`Error-related Losses:`, `${formatCurrency(result.minErrorLosses)} - ${formatCurrency(result.maxErrorLosses)} RUB/year`],
    [`Management Overhead:`, `~${result.managerControlHours} hours/month`],
  ];

  riskFigures.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.text(label, margin, y);
    doc.setFont('helvetica', 'bold');
    doc.text(value, margin + 50, y);
    y += 6;
  });
  y += 5;

  // AI Readiness Score
  y = addLine(y);
  addText('AI READINESS INDEX', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 12;

  const readiness = getReadinessLevel(result.aiReadinessScore);
  doc.setFont('helvetica', 'normal');
  doc.text('AI Readiness Score:', margin, y);
  doc.setFont('helvetica', 'bold');
  doc.text(`${result.aiReadinessScore} / 100`, margin + 50, y);
  y += 6;
  
  doc.setFont('helvetica', 'normal');
  doc.text('Level:', margin, y);
  doc.setFont('helvetica', 'bold');
  doc.text(readiness.en, margin + 50, y);
  y += 12;

  // Maximum Impact Zones
  y = addLine(y);
  addText('MAXIMUM IMPACT ZONES', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 12;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  data.painPoints.slice(0, 3).forEach((zone) => {
    const englishZone = painPointsMap[zone] || zone;
    doc.text(`- ${englishZone}`, margin, y);
    y += 6;
  });
  y += 5;

  // Key Risks
  y = addLine(y);
  addText('KEY RISKS', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 12;

  const risks = [
    'Lack of metrics',
    'Cheap bot solutions',
    'No accountability for results',
  ];

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  risks.forEach((risk) => {
    doc.text(`- ${risk}`, margin, y);
    y += 6;
  });
  y += 5;

  // What NOT to do
  y = addLine(y);
  addText('WHAT NOT TO DO', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 12;

  const notToDo = [
    'Implement without architecture',
    'Skimp on team preparation',
    'Ignore success metrics',
  ];

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  notToDo.forEach((item) => {
    doc.text(`- ${item}`, margin, y);
    y += 6;
  });

  // Footer
  y = doc.internal.pageSize.getHeight() - 30;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  const footerLines = doc.splitTextToSize(
    'This report is a preliminary assessment and does not replace architectural diagnostics.',
    contentWidth
  );
  doc.text(footerLines, margin, y);
  y += footerLines.length * 4 + 5;

  doc.setTextColor(51, 51, 51);
  doc.setFont('helvetica', 'bold');
  doc.text('Discuss implementation architecture: aleksandra-ai.ru/start', margin, y);

  // Save
  doc.save(`AI-Diagnostic-Brief-${today.replace(/\./g, '-')}.pdf`);
};

export default generatePDF;
