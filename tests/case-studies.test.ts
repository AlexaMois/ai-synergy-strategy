import { describe, expect, test } from "bun:test";
import { caseStudies, publishedCases, availableCaseProblems, caseForPath } from "../src/data/caseStudies";
import { isRouteAllowed } from "../src/config/routes";

describe("approved case catalog rules", () => {
  test("publishes the seven approved cases only", () => {
    expect(publishedCases().map(item => item.link)).toEqual(["/cases/aktransservice", "/cases/kraypotrebsoyuz", "/cases/production-doc-search", "/cases/cargo-express", "/cases/neurotenderolog", "/cases/caregiver-matching", "/cases/business-travel"]);
    const draft = { ...caseStudies[0], id: "not-approved", visibility: "draft" as const };
    caseStudies.push(draft);
    try { expect(publishedCases().some(item => item.id === "not-approved")).toBe(false); }
    finally { caseStudies.pop(); }
  });
  test("offers populated procurement and travel filters and keeps relevant existing categories", () => {
    expect(availableCaseProblems().map(item => item.id)).toContain("procurement");
    expect(availableCaseProblems().map(item => item.id)).toContain("travel");
    expect(publishedCases("procurement").map(item => item.id)).toEqual(["neurotenderolog"]);
    expect(publishedCases("travel").map(item => item.id)).toEqual(["business-travel"]);
    expect(publishedCases("requests").map(item => item.client)).toEqual(["Грузовой Экспресс", "Система подбора и сопровождения сиделок"]);
    expect(publishedCases("documents").map(item => item.client)).toEqual(["АкТрансСервис", "Производственная компания"]);
    expect(publishedCases("control").length).toBe(4);
  });
  test("architectural case does not promise a working product demo", () => {
    expect(caseForPath("/cases/kraypotrebsoyuz")?.linkLabel).toBe("Читать кейс");
    expect(caseForPath("/cases/aktransservice")?.linkLabel).toBe("Посмотреть, как это работает");
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
  test("new approved cases have no images and use allowed detail routes", () => {
    for (const slug of ["neurotenderolog", "caregiver-matching", "business-travel"]) {
      const item = caseForPath(`/cases/${slug}`);
      expect(item?.visibility).toBe("public");
      expect(item?.images).toEqual([]);
      expect(isRouteAllowed(`/cases/${slug}`)).toBe(true);
    }
  });
  test("tender service keeps three clients and a daily per-direction viewing measure", () => {
    const item = caseForPath("/cases/neurotenderolog");
    expect(item?.results.map(result => result.value)).toEqual(["3 клиента", "До 750"]);
    expect(item?.problems).toEqual(["procurement", "manual"]);
  });
  test("caregiver case uses the implementation year without invented efficiency figures", () => {
    expect(caseForPath("/cases/caregiver-matching")?.results.map(result => result.value)).toEqual(["2025"]);
    expect(caseForPath("/cases/caregiver-matching")?.problems).toEqual(["requests", "control", "manual"]);
  });
  test("travel case describes two implementations only", () => {
    expect(caseForPath("/cases/business-travel")?.results.map(result => result.value)).toEqual(["2 компании"]);
    expect(caseForPath("/cases/business-travel")?.problems).toEqual(["travel", "manual"]);
  });
});