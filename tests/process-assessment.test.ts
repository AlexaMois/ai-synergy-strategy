import { describe, expect, test } from "bun:test";
import { ASSESSMENT_STEPS, MEETING_PRICE, assessProcess, processHours, validProcessTime } from "../src/lib/processAssessment";
import { emptyForm } from "../src/components/diagnostic/diagnosticConfig";
import { buildContactSubmission, contactSchema } from "../src/components/Contact";

const form = { ...emptyForm, process: "Заявки", processDescription: "Переносим из чата в таблицу", participants: "4", hoursPerWeek: "12", manualActions: ["1"], losses: ["2"], consequences: "Заявки теряются", systems: ["6"], dataStorage: "3", goal: "Учитывать заявки", successCriteria: "Число потерянных заявок" };
const contact = { name: "Тест", phone: "+7 (999) 000-00-00", comment: "Хочу обсудить процесс", consent: true };

describe("self-check rules", () => {
  test("five steps, not eight", () => expect(ASSESSMENT_STEPS).toBe(5));
  test("meeting is a separate 17000-ruble service", () => {
    expect(MEETING_PRICE).toBe(17000);
    const payload = buildContactSubmission(contact, null, "", { kind: "meeting" });
    expect(payload.task).toContain("17 000 ₽ (owner-digital-session)");
  });
  test("result without contacts or registration", () => {
    const result = assessProcess(form);
    expect(result.problem).toContain("Заявки теряются");
    expect(result.scale).toContain("12 ч в неделю");
    expect(result.firstStep).toContain("Число потерянных заявок");
  });
  test("AI usage and desire to call never change assessment", () => {
    expect(assessProcess({ ...form, aiUsage: "1", readyForCall: "1" })).toEqual(assessProcess({ ...form, aiUsage: "4", readyForCall: "4" }));
  });
  test("voluntary implementation includes problem and result", () => {
    const payload = buildContactSubmission(contact, { industry: "Транспорт", question: "Где заявка?", topic: "Заявки" }, "", { kind: "implementation", assessment: "Проблема: заявки теряются", process: "Заявки" });
    expect(payload.task).toContain("Проблема: заявки теряются");
    expect(payload.selectedQuestion).toBe("Где заявка?");
  });
  test("budget and call readiness are optional, consent is required", () => {
    expect(contactSchema.safeParse(contact).success).toBe(true);
    expect(contactSchema.safeParse({ ...contact, consent: false }).success).toBe(false);
  });
  test("unknown time is accepted without inventing hours or savings", () => {
    expect(validProcessTime("unknown")).toBe(true);
    expect(processHours("unknown")).toBeNull();
    const result = assessProcess({ ...form, hoursPerWeek: "unknown" });
    expect(result.scale).toContain("Недостаточно данных");
    expect(result.scale).not.toMatch(/\d+ ч|NaN/);
  });
  test("missing and invalid time never becomes a numeric estimate", () => {
    for (const value of ["", "0", "-5", "abc"]) {
      expect(validProcessTime(value)).toBe(false);
      expect(processHours(value)).toBeNull();
    }
    expect(processHours("2,5")).toBe(2.5);
  });
  test("ordinary contact does not send stale commercial answers", () => {
    const payload = buildContactSubmission({ ...contact, budget: "1", readyForCall: "1" }, null, "");
    expect(payload.task).not.toContain("Бюджет:");
    expect(payload.task).not.toContain("Готовность к разговору:");
    const commercial = buildContactSubmission({ ...contact, budget: "1", readyForCall: "1" }, null, "", { kind: "implementation" });
    expect(commercial.task).toContain("Бюджет: До 50 000 ₽");
  });
});