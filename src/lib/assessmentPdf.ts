import regularUrl from "@/assets/fonts/Roboto-Regular.ttf?url";
import boldUrl from "@/assets/fonts/Roboto-Bold.ttf?url";
import logoUrl from "@/assets/logo-horizontal.png?url";
import { type DiagnosticForm } from "@/components/diagnostic/diagnosticConfig";
import { type AssessmentResult } from "./processAssessment";
import { buildClientAssessment, type ClientAssessment } from "./clientAssessment";

async function fontBase64(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("font unavailable");
  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = "";
  for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(binary);
}

async function reportLogo() {
  const img = new Image();
  img.src = logoUrl;
  await img.decode();
  const canvas = document.createElement("canvas");
  // Crop the verified logo asset's surrounding blank space proportionally.
  canvas.width = 1547; canvas.height = 321;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("logo canvas unavailable");
  ctx.drawImage(img, img.naturalWidth * 99 / 1748, img.naturalHeight * 458 / 1241,
    img.naturalWidth * 1547 / 1748, img.naturalHeight * 321 / 1241, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

export async function saveAssessmentPdf(form: DiagnosticForm, result: AssessmentResult, report: ClientAssessment = buildClientAssessment(form, result)) {
  const [{ jsPDF }, regular, bold, logo] = await Promise.all([import("jspdf"), fontBase64(regularUrl), fontBase64(boldUrl), reportLogo()]);
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  pdf.addFileToVFS("Roboto-Regular.ttf", regular);
  pdf.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  pdf.addFileToVFS("Roboto-Bold.ttf", bold);
  pdf.addFont("Roboto-Bold.ttf", "Roboto", "bold");
  const left = 16, right = 194, width = 178, bottom = 269;
  const ink = "#212121", muted = "#616161", accent = "#116078", line = "#DDE3EA";
  let y = 15;
  const font = (size: number, weight: "normal" | "bold" = "normal", color = ink) => {
    pdf.setFont("Roboto", weight); pdf.setFontSize(size); pdf.setTextColor(color);
  };
  const head = (first: boolean) => {
    pdf.addImage(logo, "PNG", left, 12, 55, 11.4);
    font(9, "normal", muted); pdf.text(report.date, right, 18, { align: "right" });
    pdf.setDrawColor("#4CBAD6"); pdf.setLineWidth(0.8); pdf.line(left, 27, right, 27);
    y = 34;
    if (!first) { font(10, "bold", muted); pdf.text("Самостоятельная проверка процесса · продолжение", left, y); y += 8; }
  };
  const nextPage = () => { pdf.addPage(); head(false); };
  const space = (amount: number) => { if (y + amount > bottom) nextPage(); };
  const lines = (text: string, size: number, weight: "normal" | "bold" = "normal", color = ink, leading = 4.5) => {
    font(size, weight, color);
    const wrapped = pdf.splitTextToSize(text, width) as string[];
    for (const row of wrapped) {
      space(leading);
      font(size, weight, color);
      pdf.text(row, left, y);
      y += leading;
    }
  };
  head(true);
  lines("Самостоятельная проверка процесса", 20, "bold", ink, 8);
  lines(report.process, 16, "bold", ink, 7);
  lines(report.industry, 10, "normal", muted);
  if (report.question) lines(report.question, 10, "normal", muted);
  y += 2; lines(report.status, 11, "bold", accent, 5);
  // Metrics use four columns; long values wrap, with a shared measured row height.
  const gap = 2, cell = (width - 3 * gap) / 4;
  font(12, "bold");
  const valueRows = report.metrics.map(m => pdf.splitTextToSize(m.value, cell - 6) as string[]);
  font(8, "normal", muted);
  const labelRows = report.metrics.map(m => pdf.splitTextToSize(m.label, cell - 6) as string[]);
  const valueHeight = Math.max(...valueRows.map(a => a.length)) * 5;
  const labelHeight = Math.max(...labelRows.map(a => a.length)) * 3.5;
  const metricHeight = valueHeight + labelHeight + 9;
  space(metricHeight + 2);
  report.metrics.forEach((_, i) => {
    const x = left + i * (cell + gap);
    pdf.setFillColor("#F7F8FA"); pdf.setDrawColor(line);
    pdf.roundedRect(x, y, cell, metricHeight, 1.8, 1.8, "FD");
    font(12, "bold"); pdf.text(valueRows[i], x + 3, y + 6, { lineHeightFactor: 1.18 });
    font(8, "normal", muted); pdf.text(labelRows[i], x + 3, y + valueHeight + 6, { lineHeightFactor: 1.2 });
  });
  y += metricHeight + 5;
  lines(report.metricNote, 10, "normal", muted, 4.4);
  for (const section of report.sections) {
    space(16);
    y += 2;
    pdf.setDrawColor(line); pdf.setLineWidth(0.25); pdf.line(left, y, right, y);
    y += 5;
    lines(section.title, 13, "bold", section.id === "firstStep" ? accent : ink, 5);
    for (const paragraph of section.paragraphs) {
      lines(paragraph, 11, "normal", ink, 4.7);
      y += 0.8;
    }
  }
  y += 2; lines(report.caveat, 10, "normal", muted, 4.4);
  const count = pdf.getNumberOfPages();
  for (let page = 1; page <= count; page++) {
    pdf.setPage(page);
    pdf.setDrawColor(line); pdf.setLineWidth(0.3); pdf.line(left, 275, right, 275);
    font(9, "bold"); pdf.text("Александра Моисеева", left, 280);
    font(8.5, "normal", accent);
    pdf.textWithLink("aleksamois.ru", left, 285, { url: "https://aleksamois.ru/" });
    pdf.textWithLink("ai@aleksamois.ru", left + 31, 285, { url: "mailto:ai@aleksamois.ru" });
    pdf.textWithLink("+7 995 078-88-37", left + 75, 285, { url: "tel:+79950788837" });
    font(8.5, "normal", muted); pdf.text("Страница " + page + " из " + count, right, 285, { align: "right" });
  }
  pdf.save("proverka-processa.pdf");
}
