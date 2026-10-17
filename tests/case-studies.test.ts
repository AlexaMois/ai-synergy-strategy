import { describe, expect, test } from "bun:test";
import { caseStudies, publishedCases, availableCaseProblems, caseForPath } from "../src/data/caseStudies";

describe("approved case catalog rules", () => {
  test("publishes only the four existing cases", () => {
    expect(publishedCases().map(item => item.link)).toEqual(["/cases/aktransservice", "/cases/kraypotrebsoyuz", "/cases/production-doc-search", "/cases/cargo-express"]);
    const draft = { ...caseStudies[0], id: "not-approved", visibility: "draft" as const };
    caseStudies.push(draft);
    try { expect(publishedCases().some(item => item.id === "not-approved")).toBe(false); }
    finally { caseStudies.pop(); }
  });
  test("offers no empty procurement filter and filters published problems correctly", () => {
    expect(availableCaseProblems().map(item => item.id)).not.toContain("procurement");
    expect(publishedCases("requests").map(item => item.client)).toEqual(["Грузовой Экспресс"]);
    expect(publishedCases("travel").map(item => item.client)).toEqual(["АкТрансСервис"]);
    expect(publishedCases("documents").length).toBe(3);
  });
  test("keeps only the approved production response time", () => {
    expect(caseForPath("/cases/production-doc-search")?.results.map(item => item.value)).toEqual(["3 секунды"]);
  });
  test("keeps approved budget and cargo metrics with their scope", () => {
    expect(caseForPath("/cases/kraypotrebsoyuz")?.results[0]?.value).toBe("1,3 млн ₽");
    const cargo = caseForPath("/cases/cargo-express");
    expect(cargo?.results.map(item => item.value)).toEqual(["0%", "9–12 часов"]);
    expect(cargo?.results[1]?.label).toContain("команды из 3 человек");
  });
  test("case context is confined to the corresponding existing detail route", () => {
    expect(caseForPath("/cases/aktransservice/")?.client).toBe("АкТрансСервис");
    expect(caseForPath("/")).toBeUndefined();
    expect(caseForPath("/start")).toBeUndefined();
  });
});