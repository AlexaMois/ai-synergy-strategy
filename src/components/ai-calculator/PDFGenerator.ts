import { jsPDF } from 'jspdf';
import { DiagnosticData, CalculationResult } from './types';
import { loadMontserratFont, loadMontserratBoldFont } from './fonts/loadFont';

const formatCurrency = (value: number): string => {
  return Math.round(value).toLocaleString('ru-RU');
};

const getReadinessLevel = (score: number): string => {
  if (score < 40) return 'Низкий (сначала наведите порядок)';
  if (score < 70) return 'Средний (начните с пилота)';
  return 'Высокий (готовы масштабировать)';
};

export const generatePDF = async (data: DiagnosticData, result: CalculationResult, returnBase64 = false): Promise<string | void> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Load Montserrat fonts with Cyrillic support
  const [fontRegular, fontBold] = await Promise.all([
    loadMontserratFont(),
    loadMontserratBoldFont()
  ]);

  if (fontRegular) {
    doc.addFileToVFS('Montserrat-Regular.ttf', fontRegular);
    doc.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal');
  }
  
  if (fontBold) {
    doc.addFileToVFS('Montserrat-Bold.ttf', fontBold);
    doc.addFont('Montserrat-Bold.ttf', 'Montserrat', 'bold');
  }

  const fontName = fontRegular ? 'Montserrat' : 'helvetica';

  // Helper function to add text
  const addText = (text: string, x: number, yPos: number, options?: { fontSize?: number; fontStyle?: 'normal' | 'bold'; color?: [number, number, number] }) => {
    const { fontSize = 11, fontStyle = 'normal', color = [51, 51, 51] } = options || {};
    doc.setFontSize(fontSize);
    doc.setFont(fontName, fontStyle);
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
  
  addText('ДИАГНОСТИЧЕСКИЙ БРИФИНГ', margin, 20, { fontSize: 18, fontStyle: 'bold', color: [255, 255, 255] });
  addText('Предварительная оценка потенциала ИИ для вашего бизнеса', margin, 32, { fontSize: 11, color: [180, 180, 180] });

  y = 55;
  
  // Date
  const today = new Date().toLocaleDateString('ru-RU');
  addText(`Дата: ${today}`, margin, y, { fontSize: 10, color: [120, 120, 120] });
  y += 15;

  // Executive Summary
  y = addLine(y);
  addText('РЕЗЮМЕ', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 10;
  
  doc.setFont(fontName, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const summaryLines = doc.splitTextToSize(
    'На основе введённых параметров система оценила потенциальный управленческий эффект от внедрения ИИ и определила зоны максимальной отдачи от инвестиций.',
    contentWidth
  );
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 5 + 10;

  // Key Figures
  y = addLine(y);
  addText('КЛЮЧЕВЫЕ ПОКАЗАТЕЛИ', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 12;

  doc.setFontSize(10);
  doc.setFont(fontName, 'normal');
  doc.setTextColor(51, 51, 51);
  
  const keyFigures = [
    [`Экономический эффект:`, `${formatCurrency(result.minSavings)} — ${formatCurrency(result.maxSavings)} ₽/год`],
    [`Типичный ROI:`, `~${Math.max(0, result.roi)}%`],
    [`Срок окупаемости:`, `~2-4 месяца`],
    [`Цена бездействия:`, `${formatCurrency(result.minMonthlyLosses)} — ${formatCurrency(result.maxMonthlyLosses)} ₽/мес`],
    [`Неэффективное время:`, `~${result.inefficientHours} часов/мес`],
  ];

  keyFigures.forEach(([label, value]) => {
    doc.setFont(fontName, 'normal');
    doc.text(label, margin, y);
    doc.setFont(fontName, 'bold');
    doc.text(value, margin + 55, y);
    y += 6;
  });
  y += 5;

  // Risk Assessment
  y = addLine(y);
  addText('ОЦЕНКА РИСКОВ', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 12;

  const riskFigures = [
    [`Потери от ошибок:`, `${formatCurrency(result.minErrorLosses)} — ${formatCurrency(result.maxErrorLosses)} ₽/год`],
    [`Время на контроль:`, `~${result.managerControlHours} часов/мес`],
  ];

  riskFigures.forEach(([label, value]) => {
    doc.setFont(fontName, 'normal');
    doc.text(label, margin, y);
    doc.setFont(fontName, 'bold');
    doc.text(value, margin + 55, y);
    y += 6;
  });
  y += 5;

  // AI Readiness Score
  y = addLine(y);
  addText('ИНДЕКС ГОТОВНОСТИ К ИИ', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 12;

  const readiness = getReadinessLevel(result.aiReadinessScore);
  doc.setFont(fontName, 'normal');
  doc.text('Оценка готовности:', margin, y);
  doc.setFont(fontName, 'bold');
  doc.text(`${result.aiReadinessScore} / 100`, margin + 55, y);
  y += 6;
  
  doc.setFont(fontName, 'normal');
  doc.text('Уровень:', margin, y);
  doc.setFont(fontName, 'bold');
  doc.text(readiness, margin + 55, y);
  y += 12;

  // Maximum Impact Zones
  y = addLine(y);
  addText('ЗОНЫ МАКСИМАЛЬНОГО ЭФФЕКТА', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 12;

  doc.setFontSize(10);
  doc.setFont(fontName, 'normal');
  data.painPoints.slice(0, 3).forEach((zone) => {
    doc.text(`• ${zone}`, margin, y);
    y += 6;
  });
  y += 5;

  // Key Risks
  y = addLine(y);
  addText('КЛЮЧЕВЫЕ РИСКИ', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 12;

  const risks = [
    'Отсутствие метрик эффективности',
    'Дешёвые бот-решения без архитектуры',
    'Отсутствие ответственности за результат',
  ];

  doc.setFontSize(10);
  doc.setFont(fontName, 'normal');
  risks.forEach((risk) => {
    doc.text(`• ${risk}`, margin, y);
    y += 6;
  });
  y += 5;

  // What NOT to do
  y = addLine(y);
  addText('ЧЕГО НЕ ДЕЛАТЬ', margin, y, { fontSize: 13, fontStyle: 'bold' });
  y += 12;

  const notToDo = [
    'Внедрять без архитектуры',
    'Экономить на подготовке команды',
    'Игнорировать метрики успеха',
  ];

  doc.setFontSize(10);
  doc.setFont(fontName, 'normal');
  notToDo.forEach((item) => {
    doc.text(`• ${item}`, margin, y);
    y += 6;
  });

  // Footer
  y = doc.internal.pageSize.getHeight() - 30;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.setFont(fontName, 'normal');
  const footerLines = doc.splitTextToSize(
    'Этот отчёт — предварительная оценка и не заменяет архитектурную диагностику.',
    contentWidth
  );
  doc.text(footerLines, margin, y);
  y += footerLines.length * 4 + 5;

  doc.setTextColor(51, 51, 51);
  doc.setFont(fontName, 'bold');
  doc.text('Обсудить архитектуру внедрения: aleksandra-ai.ru/start', margin, y);

  // Return base64 or save
  if (returnBase64) {
    return doc.output('datauristring').split(',')[1]; // Return only base64 part
  }

  doc.save(`AI-Diagnostic-Brief-${today.replace(/\./g, '-')}.pdf`);
};

export default generatePDF;
