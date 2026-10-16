import { describe, expect, test } from "bun:test";
import { contactSchema } from "../src/components/Contact";

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
});