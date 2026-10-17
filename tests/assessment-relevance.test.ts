import { describe, expect, test } from "bun:test";
import { assessProcess, classifyProcess, assessmentText } from "../src/lib/processAssessment";
import { emptyForm } from "../src/components/diagnostic/diagnosticConfig";
import { scenarios } from "./assessment-scenarios";

describe("report 17.10.2026 work-specific rules", () => {
  for (const scenario of scenarios) {
    test(`${scenario.id}: identifies the described current work`, () => {
      expect(classifyProcess(scenario.form)).toBe(scenario.kind);
      expect(assessProcess(scenario.form).cause).toContain("Причина не установлена");
    });
  }
  test("instruction search tests 10 answers, source accuracy and time, not document filling", () => {
    const result = assessProcess(scenarios[0].form);
    expect(result.firstStep).toContain("10 реальных вопросов");
    expect(result.firstStep).toContain("версию и страницу");
    expect(result.firstStep).toContain("медианное время поиска");
    expect(result.solution).not.toContain("заполнение из исходных данных");
  });
  test("repair comparison tests 20 repairs of the same vehicle and conflicting statuses", () => {
    const result = assessProcess(scenarios[1].form);
    expect(result.firstStep).toContain("20 записей о ремонте");
    expect(result.firstStep).toContain("одной и той же машины");
    expect(result.firstStep).toContain("конфликтующих статусов");
    expect(result.firstStep).toContain("число необъяснённых расхождений");
  });
  test("construction comparison checks 10 items, nomenclature, units, quantity and price", () => {
    const result = assessProcess(scenarios[2].form);
    expect(result.firstStep).toContain("10 позиций материалов");
    for (const field of ["номенклатуру", "единицы измерения", "объёмы", "цены", "не хватает данных"]) expect(result.firstStep).toContain(field);
  });
  test("requests check 20 incoming cases, no reply share and reply time without assumed revenue loss", () => {
    const result = assessProcess(scenarios[3].form);
    for (const field of ["20 последовательных", "доля без ответа", "время первого ответа", "неотвеченное обращение потерянной продажей без подтверждения"]) expect(result.firstStep).toContain(field);
  });
  test("production tests 3 orders with norms, stock, reserves and capacity", () => {
    const result = assessProcess(scenarios[4].form);
    for (const field of ["3 производственных заказа", "нормы расхода", "состав изделия", "единицы измерения", "остатки и резервы", "сроки поставки", "доступную загрузку", "не считать выполнимыми"]) expect(result.firstStep).toContain(field);
  });
  test("same categories and storage produce different contract and materials recommendations", () => {
    const materials = scenarios[2].form;
    const contract = scenarios[5].form;
    expect(contract.manualActions).toEqual(materials.manualActions);
    expect(contract.dataStorage).toBe(materials.dataStorage);
    const result = assessProcess(contract);
    expect(result.cause).not.toBe(assessProcess(materials).cause);
    expect(result.solution).not.toBe(assessProcess(materials).solution);
    expect(result.firstStep).toContain("время передачи и ответа каждого участника");
    expect(result.firstStep).toContain("Полное время согласования");
  });
  test("unknown time stays nonnumeric in screen and PDF text", () => {
    const form = scenarios[6].form;
    const result = assessProcess(form);
    expect(result.scale).toContain("Недостаточно данных");
    expect(result.scale).not.toMatch(/\d+ ч|NaN|₽/);
    expect(assessmentText(form, result)).toContain(result.firstStep);
  });
  test("categories and goals alone cannot create a recommendation", () => {
    const form = { ...emptyForm, process: "Документы", processDescription: "Работаем вручную", manualActions: ["4", "3"], dataStorage: "3", goal: "Наладить производственное планирование" };
    expect(classifyProcess(form)).toBe("insufficient");
    expect(assessProcess(form).solution).toContain("Недостаточно сведений");
    expect(assessProcess({ ...form, processDescription: "" }).solution).toContain("Недостаточно сведений");
  });
  test("several problems request a priority instead of arbitrary precedence", () => {
    const form = { ...scenarios[0].form, processDescription: "Ищем инструкции к станку. Входящие заявки теряются и остаются без ответа." };
    expect(classifyProcess(form)).toBe("insufficient");
    expect(assessProcess(form).solution).toContain("выберите одну");
  });
  test("storage, commercial choices and unrelated goals cannot override current work", () => {
    const form = scenarios[2].form;
    for (const dataStorage of ["1", "2", "3", "4"]) {
      expect(classifyProcess({ ...form, dataStorage, goal: "Искать инструкции", aiUsage: "1", readyForCall: "1" })).toBe("data-reconciliation");
    }
  });
  test("negated problem statements do not become asserted problems", () => {
    for (const processDescription of ["Заявки не теряются, отвечаем на все звонки", "Расхождений нет, сверяем данные", "Нет расхождений в смете", "Обращения обрабатываем без потерь"]) {
      const form = { ...emptyForm, process: "Текущая работа", processDescription };
      expect(classifyProcess(form)).toBe("insufficient");
      expect(assessProcess(form).solution).toContain("Недостаточно сведений");
    }
  });
});