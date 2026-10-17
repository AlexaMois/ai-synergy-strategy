import fontUrl from "@/assets/fonts/Roboto-Regular.ttf?url";
import { type DiagnosticForm } from "@/components/diagnostic/diagnosticConfig";
import { assessmentText, type AssessmentResult } from "./processAssessment";
import { readIndustryContext } from "./contactIntent";

export async function saveAssessmentPdf(form: DiagnosticForm, result: AssessmentResult) {
  const [{ jsPDF }, response] = await Promise.all([import("jspdf"), fetch(fontUrl)]);
  if (!response.ok) throw new Error("font unavailable");
  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const pdf = new jsPDF();
  pdf.addFileToVFS("Roboto.ttf", btoa(binary));
  pdf.addFont("Roboto.ttf", "Roboto", "normal");
  pdf.setFont("Roboto");
  pdf.setFontSize(12);
  const context = readIndustryContext();
  const text = ["Самостоятельная проверка процесса", "Александра Моисеева · aleksamois.ru",
    context?.industry ? `Отрасль: ${context.industry}` : "", context?.question ? `Выбранный вопрос: ${context.question}` : "",
    assessmentText(form, result)].filter(Boolean).join("\n\n");
  let y = 20;
  for (const line of pdf.splitTextToSize(text, 170) as string[]) {
    if (y > 275) { pdf.addPage(); y = 20; }
    pdf.text(line, 20, y); y += 6;
  }
  pdf.save("proverka-processa.pdf");
}