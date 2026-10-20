import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const DAY = 86400000;
let now = Date.now();
const shared = new Map();
const makeStore = (map) => ({
  getItem: (key) => map.has(key) ? map.get(key) : null,
  setItem: (key, value) => map.set(key, String(value)),
  removeItem: (key) => map.delete(key),
});

const source = readFileSync("src/lib/diagnosticState.ts", "utf8");
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function loadTab() {
  const module = { exports: {} };
  runInNewContext(js, {
    module,
    exports: module.exports,
    localStorage: makeStore(shared),
    sessionStorage: makeStore(new Map()),
    Date: { now: () => now },
  });
  return module.exports;
}

const a = loadTab();
assert.equal(a.isExitPopupShown(), false);
assert.equal(a.isExitPopupSuppressed(), false);
a.markExitPopupShown();
assert.equal(a.isExitPopupShown(), true, "only one show per tab");
a.markExitPopupDismissed();
assert.equal(a.isExitPopupSuppressed(), true, "dismiss locks next visits");
assert.equal(loadTab().isExitPopupSuppressed(), true, "other tab shares 14-day cooldown");
now += 13 * DAY;
assert.equal(loadTab().isExitPopupSuppressed(), true);
now += 2 * DAY;
assert.equal(loadTab().isExitPopupSuppressed(), false);
const b = loadTab();
b.markExitPopupAccepted();
assert.equal(b.getDiagnosticSource(), "exit_popup");
assert.equal(loadTab().isExitPopupSuppressed(), true);
b.markDiagnosticStarted();
assert.equal(b.isExitPopupSuppressed(), true);
b.markDiagnosticSubmitted();
now += 89 * DAY;
assert.equal(loadTab().isExitPopupSuppressed(), true, "completed assessment remains locked");
now += 2 * DAY;
assert.equal(loadTab().isExitPopupSuppressed(), false, "90-day cooldown expired");
console.log("PASS popup state: tabs, 14/90 days, source and assessment");
