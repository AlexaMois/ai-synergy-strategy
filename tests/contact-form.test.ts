import { describe, expect, test } from "bun:test";
import { buildContactSubmission, contactSchema } from "../src/components/Contact";

const validContact = {
  comment: "Нужно убрать ручную сверку заявок и снизить потери времени.",
  name: "София",
  phone: "+7 (995) 078-88-37",
  company: "",
  industry: "",
  email: "",
  consent: true,
};

describe("contactSchema", () => {
  test("requires task description, name, phone and consent", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);

    expect(contactSchema.safeParse({ ...validContact, comment: "" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...validContact, name: "" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...validContact, phone: "+7" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...validContact, consent: false }).success).toBe(false);
  });

  test("keeps company, industry and email optional", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
    expect(contactSchema.safeParse({ ...validContact, email: "not-an-email" }).success).toBe(false);
  });

  test("adds selected industry and question to the protected lead payload", () => {
    const payload = buildContactSubmission(
      { ...validContact, industry: "", company: "", email: "" },
      {
        industry: "Транспорт",
        topic: "01 · Контроль ремонтов",
        question: "Машина числится в ремонте, механик говорит, что готова. А чему верить?",
      },
      "",
    );

    expect(payload.industry).toBe("Транспорт");
    expect(payload.selectedIndustry).toBe("Транспорт");
    expect(payload.selectedQuestion).toBe("Машина числится в ремонте, механик говорит, что готова. А чему верить?");
    expect(payload.task).toContain("Выбранная отрасль: Транспорт");
    expect(payload.task).toContain("Тема вопроса: 01 · Контроль ремонтов");
    expect(payload.task).toContain("Выбранный вопрос: Машина числится в ремонте, механик говорит, что готова. А чему верить?");
  });
});