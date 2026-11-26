import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, AlertCircle, Download } from "lucide-react";
import PillButton from "@/components/PillButton";
import { Button } from "@/components/ui/button";
import { assessProcess, assessmentText, ASSESSMENT_STEPS, validProcessTime } from "@/lib/processAssessment";
import { buildClientAssessment } from "@/lib/clientAssessment";
import AssessmentReport from "./AssessmentReport";
import { setContactIntent } from "@/lib/contactIntent";
import { getIndustryScenario, scenarioContext, type IndustryScenario } from "@/data/industryScenarios";
import { saveAssessmentPdf } from "@/lib/assessmentPdf";
import { scrollToContact } from "@/lib/scrollToContact";
import { getDiagnosticSource, markDiagnosticStarted, markDiagnosticSubmitted } from "@/lib/diagnosticState";
import { trackExitPopupEvent } from "@/utils/analytics";
import {
  DiagnosticForm as FormData,
  emptyForm,
  Option,
  aiUsageOptions,
  dataStorageOptions,
  frequencyOptions,
  lossOptions,
  manualActionOptions,
  systemOptions,
  scenarioActionOptions,
  scenarioCategoryIds,
  prioritizedOptions,
} from "./diagnosticConfig";

const TOTAL_STEPS = ASSESSMENT_STEPS;
const DRAFT_KEY = "diagnostic-draft-v3";
const LEGACY_DRAFT_KEY = "diagnostic-draft-v2";

type Errors = Partial<Record<keyof FormData, string>>;

const loadDraft = (scenarioId: string): { step: number; form: FormData } | null => {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    const legacy = !raw && !scenarioId ? sessionStorage.getItem(LEGACY_DRAFT_KEY) : null;
    if (!raw && !legacy) return null;
    const parsed = JSON.parse(raw || legacy || "null") as { step?: number; form?: Partial<FormData>; scenarioId?: string; sourceQuestion?: string };
    if (!parsed?.form) return null;
    if (raw ? parsed.scenarioId !== scenarioId : !!parsed.sourceQuestion) return null;
    const form = { ...emptyForm, ...parsed.form, scenarioId };
    const scenario = getIndustryScenario(scenarioId);
    if (scenario) {
      if (!Array.isArray(form.selectedActionIds) || form.selectedActionIds.some(id => !scenarioActionOptions(scenario).some(a => a.id === id))) return null;
      form.manualActions = scenarioCategoryIds(scenario, form.selectedActionIds);
    }
    const step = Math.min(Math.max(Number(parsed.step) || 1, 1), TOTAL_STEPS + 1);
    return { step, form };
  } catch { return null; }
};

const saveDraft = (step: number, form: FormData) => {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ step, form, scenarioId: form.scenarioId }));
    sessionStorage.removeItem(LEGACY_DRAFT_KEY);
    markDiagnosticStarted();
  } catch { /* storage may be unavailable */ }
};

export const hasDiagnosticDraft = (scenarioId = "") => !!loadDraft(scenarioId);

/* нормализация телефона: только цифры, 8XXXXXXXXXX → +7XXXXXXXXXX */
export const normalizePhone = (raw: string) => {
  let d = raw.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("8")) d = "7" + d.slice(1);
  if (d.length === 10) d = "7" + d;
  return d ? `+${d}` : "";
};

/* ---------- поля ---------- */

const Label = ({
  children,
  required,
  htmlFor,
}: {
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
}) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm md:text-base font-semibold text-foreground mb-2"
  >
    {children}
    {required && <span className="text-accent"> *</span>}
  </label>
);

const inputCls =
  "w-full rounded-2xl border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition";

const FieldError = ({ error }: { error?: string }) =>
  error ? (
    <p className="mt-1.5 flex items-start gap-1.5 text-xs md:text-sm text-destructive">
      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
      {error}
    </p>
  ) : null;

const MultiHint = () => (
  <p className="text-xs text-muted-foreground mb-2 -mt-1">Можно выбрать несколько вариантов</p>
);

const TextField = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  hint,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  hint?: string;
  error?: string;
}) => {
  const id = useId();
  return (
    <div>
      <Label required={required} htmlFor={id}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => type !== "number" && onChange(e.target.value.trim())}
        placeholder={placeholder}
        className={`${inputCls} ${error ? "border-destructive" : "border-foreground/10"}`}
        inputMode={type === "number" ? "numeric" : undefined}
        min={type === "number" ? 0 : undefined}
        step={type === "number" ? "any" : undefined}
        aria-invalid={!!error}
      />
      {hint && <p className="text-xs text-muted-foreground mt-1.5">{hint}</p>}
      <FieldError error={error} />
    </div>
  );
};

const AreaField = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  error?: string;
}) => {
  const id = useId();
  return (
    <div>
      <Label required={required} htmlFor={id}>
        {label}
      </Label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onChange(e.target.value.trim())}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        className={`${inputCls} resize-y leading-relaxed ${
          error ? "border-destructive" : "border-foreground/10"
        }`}
      />
      <FieldError error={error} />
    </div>
  );
};

/* одиночный выбор — круглые радиокнопки */
const RadioGroup = ({
  label,
  options,
  value,
  onChange,
  required,
  error,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
}) => (
  <div role="radiogroup" aria-label={label}>
    <Label required={required}>{label}</Label>
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <Button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.id)}
            className={`text-left rounded-2xl border px-4 py-3 text-sm md:text-base transition-all h-auto whitespace-normal justify-start min-h-[52px] ${
              active
                ? "border-accent bg-accent/10 text-foreground font-semibold"
                : "border-foreground/10 bg-card text-foreground/80 hover:border-accent/50"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 border-2 ${
                  active ? "border-accent" : "border-foreground/25"
                }`}
              >
                {active && <span className="w-2.5 h-2.5 rounded-full bg-accent" />}
              </span>
              {o.label}
            </span>
          </Button>
        );
      })}
    </div>
    <FieldError error={error} />
  </div>
);

/* множественный выбор — квадратные чекбоксы с галочкой */
const CheckGroup = ({
  label,
  options,
  value,
  onChange,
  required,
  error,
}: {
  label: string;
  options: Option[];
  value: string[];
  onChange: (v: string[]) => void;
  required?: boolean;
  error?: string;
}) => (
  <div role="group" aria-label={label}>
    <Label required={required}>{label}</Label>
    <MultiHint />
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const active = value.includes(o.id);
        return (
          <Button
            key={o.id}
            type="button"
            role="checkbox"
            aria-checked={active}
            onClick={() =>
              onChange(active ? value.filter((v) => v !== o.id) : [...value, o.id])
            }
            className={`text-left rounded-2xl border px-4 py-3 text-sm md:text-base transition-all h-auto whitespace-normal justify-start min-h-[52px] ${
              active
                ? "border-accent bg-accent/10 text-foreground font-semibold"
                : "border-foreground/10 bg-card text-foreground/80 hover:border-accent/50"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-[6px] shrink-0 border-2 ${
                  active ? "bg-accent border-accent" : "border-foreground/25"
                }`}
              >
                {active && <Check className="w-3.5 h-3.5 text-accent-foreground" strokeWidth={3} />}
              </span>
              {o.label}
            </span>
          </Button>
        );
      })}
    </div>
    <FieldError error={error} />
  </div>
);

/* ---------- итоговый экран ---------- */

/* ---------- основной компонент ---------- */

const DiagnosticForm = ({ scenario }: { scenario?: IndustryScenario }) => {
  const scenarioId = scenario?.id || "";
  const draft = useMemo(() => loadDraft(scenarioId), [scenarioId]);
  const [step, setStep] = useState(draft?.step ?? 1);
  const [form, setForm] = useState<FormData>(() => draft?.form ?? { ...emptyForm, scenarioId, industry: scenario?.industry || "", process: scenario?.process || "" });
  const prompts = scenario?.prompts;
  const context = scenario ? scenarioContext(scenario) : null;
  const actionValue = scenario ? form.selectedActionIds : form.manualActions;
  const otherSelected = actionValue.includes(scenario ? scenario.id + "-other" : "13");
  const [errors, setErrors] = useState<Errors>({});
  const [completed, setCompleted] = useState(draft?.step === 6);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  // сохраняем черновик после каждого изменения
  useEffect(() => {
    saveDraft(completed ? 6 : step, form);
  }, [step, form, completed]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "losses" && !next.losses.includes("11")) next.otherLoss = "";
      if (key === "systems" && !next.systems.includes("13")) next.otherSystem = "";
      return next;
    });
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const setActions = (ids: string[]) => {
    if (scenario) {
      setForm(prev => ({ ...prev, selectedActionIds: ids, manualActions: scenarioCategoryIds(scenario, ids), otherAction: ids.includes(scenario.id + "-other") ? prev.otherAction : "" }));
    } else {
      setForm(prev => ({ ...prev, manualActions: ids, otherAction: ids.includes("13") ? prev.otherAction : "" }));
    }
    setErrors(prev => ({ ...prev, manualActions: undefined, otherAction: undefined }));
  };
  const scrollTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const validate = (s: number): Errors => {
    const e: Errors = {};
    const isPositiveInt = (v: string) => /^\d+$/.test(v.trim()) && Number(v) >= 1;

    if (s === 1) {
      if (!form.process.trim()) e.process = "Укажите процесс, который хотите улучшить";
      if (!form.processDescription.trim())
        e.processDescription = "Опишите, как процесс устроен сейчас";
      if (form.manualActions.length === 0)
        e.manualActions = "Отметьте хотя бы одно ручное действие";
      if (otherSelected && !form.otherAction.trim()) e.otherAction = "Опишите своё ручное действие";
      if (form.process.length > 500) e.process = "До 500 символов";
      if (form.processDescription.length > 3000) e.processDescription = "До 3000 символов";
      if (otherSelected && form.otherAction.length > 500) e.otherAction = "До 500 символов";
    }
    if (s === 2) {
      if (!isPositiveInt(form.participants))
        e.participants = "Укажите целое число сотрудников больше нуля";
      if (!form.frequency) e.frequency = "Выберите частоту повторения процесса";
      if (!validProcessTime(form.hoursPerWeek))
        e.hoursPerWeek = "Укажите число часов больше нуля или выберите «Не знаю»";
    }
    if (s === 3) {
      if (form.losses.length === 0) e.losses = "Отметьте, что теряется или задерживается";
      if (!form.consequences.trim()) e.consequences = "Опишите, к чему приводят проблемы";
      if (form.losses.includes("11") && !form.otherLoss.trim()) e.otherLoss = "Опишите другие потери";
      if (form.consequences.length > 3000) e.consequences = "До 3000 символов";
      if (form.losses.includes("11") && form.otherLoss.length > 500) e.otherLoss = "До 500 символов";
    }
    if (s === 4) {
      if (form.systems.length === 0) e.systems = "Отметьте используемые программы и системы";
      
      if (!form.dataStorage) e.dataStorage = "Выберите один вариант";
      if (form.systems.includes("13") && !form.otherSystem.trim()) e.otherSystem = "Укажите другой инструмент";
      if (form.systems.includes("13") && form.otherSystem.length > 500) e.otherSystem = "До 500 символов";
    }
    if (s === 5) {
      if (!form.goal.trim()) e.goal = "Опишите результат за 1–3 месяца";
      if (!form.successCriteria.trim()) e.successCriteria = "Укажите критерий результата";
      if (form.goal.length > 3000) e.goal = "До 3000 символов";
      if (form.successCriteria.length > 1000) e.successCriteria = "До 1000 символов";

    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      scrollTop();
    } else {
      setCompleted(true);
      markDiagnosticSubmitted();
      trackExitPopupEvent("diagnostic_complete", getDiagnosticSource() || "direct");
      scrollTop();
    }
  };

  const back = () => {
    setErrors({});

    if (step > 1) {
      setStep(step - 1);
      scrollTop();
    }
  };

  const result = useMemo(() => assessProcess(form), [form]);
  const clientReport = useMemo(() => buildClientAssessment(form, result), [form, result]);
  const request = (kind: "implementation" | "meeting") => {
    const source = scenario ? null : getDiagnosticSource();
    if (kind === "meeting" && source === "exit_popup") trackExitPopupEvent("exit_popup_meeting_click");
    setContactIntent({ kind, process: form.process, assessment: assessmentText(form, result), source: source || undefined, context });
    scrollToContact();
  };

  if (completed) {
    return (
      <div ref={topRef} className="max-w-4xl mx-auto scroll-mt-24" data-assessment-result>
        <div className="rounded-2xl bg-white text-[#212121] p-3 sm:p-5 ring-1 ring-[#E5E7EB]">
          <AssessmentReport report={clientReport} scenarioId={scenarioId} />
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
            <Button variant="outline" className="!text-[#212121] !border-[#616161] hover:!bg-[#F3F5F6] focus-visible:!ring-[#116078]" disabled={pdfBusy} onClick={async () => {
              setPdfBusy(true); setPdfError("");
              try {
                await saveAssessmentPdf(form, result, clientReport);
                trackExitPopupEvent("diagnostic_pdf_download", getDiagnosticSource() || "direct");
              }
              catch { setPdfError("Не удалось сохранить PDF. Попробуйте ещё раз."); }
              finally { setPdfBusy(false); }
            }}><Download className="h-4 w-4 mr-2" />{pdfBusy ? "Готовим PDF…" : "Сохранить результат в PDF"}</Button>
            <Button variant="ghost" className="!text-[#212121] hover:!bg-[#F3F5F6] focus-visible:!ring-[#116078]" onClick={() => { setCompleted(false); setStep(1); scrollTop(); }}>Изменить ответы</Button>
          </div>
          {pdfError && <p role="alert" className="!text-[#962D3A] mt-3">{pdfError}</p>}
          <div className="border-t border-border mt-4 pt-4 flex flex-col sm:flex-row flex-wrap gap-2">
            <PillButton onClick={() => request("implementation")} variant="turquoise" size="md" className="!bg-[#4CBBD6] !text-[#212121] hover:!bg-[#4CBBD6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#116078] focus-visible:outline-offset-2">Обсудить внедрение</PillButton>
            <PillButton onClick={() => request("meeting")} variant="dark" size="md" className="!bg-[#212121] !text-white hover:!bg-[#333333] [&>span:last-child]:!text-[#212121] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#116078] focus-visible:outline-offset-2">Личный разбор · 17 000 ₽</PillButton>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- шаги ---------- */
  const titles: Record<number, { h: string; sub: string }> = {
    1: { h: "Ключевой процесс", sub: "С чего начинаем разбор" },
    2: { h: "Масштаб процесса", sub: "Сколько людей и времени он забирает" },
    3: { h: "Проблемы и риски", sub: "Что теряется сегодня" },
    4: { h: "Системы и данные", sub: "В чём работаете и где лежат данные" },
    5: { h: "Нужный результат", sub: "Какой результат нужен" },

  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div ref={topRef} className="max-w-4xl mx-auto scroll-mt-24">
      <div className="rounded-t-[28px] bg-foreground px-5 sm:px-7 md:px-10 py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-background">Самостоятельная проверка одного процесса</h2>
      </div>
      <div className="rounded-b-[28px] bg-card p-5 sm:p-7 md:p-10 ring-1 ring-foreground/5 shadow-plate">
        {context?.question && <div className="mb-6 border-l-4 border-accent pl-4" data-scenario-id={scenarioId}><p className="text-xs font-semibold text-accent mb-2">Выбранная проблема · {context.industry}</p><p className="text-base text-foreground leading-relaxed">{context.question}</p></div>}
        {/* прогресс */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">
              Шаг {step} из {TOTAL_STEPS}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((step / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
          {titles[step].sub}
        </p>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6 md:mb-8">
          {titles[step].h}
        </h3>

        <div className="space-y-6">
          {step === 1 && (
            <>
              <TextField
                label="Какой один процесс или участок работы вы хотите улучшить в первую очередь?"
                value={form.process}
                onChange={(v) => set("process", v)}
                placeholder={scenario?.process || "Например: обработка входящих заявок"}
                required
                error={errors.process}
              />
              <AreaField
                label={prompts?.processDescription.label || "Опишите, как процесс устроен сейчас"}
                value={form.processDescription}
                onChange={(v) => set("processDescription", v)}
                placeholder={prompts?.processDescription.placeholder || "Кто что делает, в какой последовательности, где возникают задержки"}
                required
                error={errors.processDescription}
              />
              <CheckGroup
                label={scenario ? "Какие действия в выбранном процессе сотрудники выполняют вручную?" : "Какие действия сотрудники регулярно выполняют вручную?"}
                options={scenario ? scenarioActionOptions(scenario) : manualActionOptions}
                value={actionValue}
                onChange={setActions}
                required
                error={errors.manualActions}
              />
              {otherSelected && <AreaField label="Опишите своё ручное действие" value={form.otherAction} onChange={v => set("otherAction", v)} required error={errors.otherAction} />}
            </>
          )}

          {step === 2 && (
            <>
              <TextField
                label={prompts?.participants.label || "Сколько сотрудников участвует в процессе?"}
                hint={prompts?.participants.placeholder}
                type="number"
                value={form.participants}
                onChange={(v) => set("participants", v)}
                placeholder="4"
                required
                error={errors.participants}
              />
              <RadioGroup
                label={prompts?.frequency.label || "С какой частотой повторяется процесс?"}
                options={frequencyOptions}
                value={form.frequency}
                onChange={(v) => set("frequency", v)}
                required
                error={errors.frequency}
              />
              <div>
                <Label required>{prompts?.hours.label || "Сколько часов в неделю уходит на процесс?"}</Label>
                <div className="flex flex-wrap gap-3 mb-3" role="group" aria-label="Оценка времени">
                  <Button variant={form.hoursPerWeek === "unknown" ? "outline" : "default"} onClick={() => set("hoursPerWeek", "")}>Указать часы</Button>
                  <Button variant={form.hoursPerWeek === "unknown" ? "default" : "outline"} aria-pressed={form.hoursPerWeek === "unknown"} onClick={() => set("hoursPerWeek", "unknown")}>Не знаю</Button>
                </div>
                {form.hoursPerWeek !== "unknown" && <TextField
                  label="Часов в неделю, суммарно по всем участникам"
                  type="number"
                  value={form.hoursPerWeek}
                  onChange={(v) => set("hoursPerWeek", v)}
                  placeholder="10"
                  error={errors.hoursPerWeek}
                />}
                {form.hoursPerWeek === "unknown" && <FieldError error={errors.hoursPerWeek} />}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <CheckGroup
                label={prompts?.losses.label || "Что чаще всего теряется, задерживается или выполняется с ошибками?"}
                options={lossOptions}
                value={form.losses}
                onChange={(v) => set("losses", v)}
                required
                error={errors.losses}
              />
              {form.losses.includes("11") && <AreaField label="Опишите другие потери" value={form.otherLoss} onChange={v => set("otherLoss", v)} required error={errors.otherLoss} />}
              <AreaField
                label="К чему приводят текущие проблемы?"
                value={form.consequences}
                onChange={(v) => set("consequences", v)}
                placeholder={prompts?.losses.placeholder || "Например: клиенты ждут ответа, руководитель не видит статус заявок"}
                required
                error={errors.consequences}
              />
            </>
          )}

          {step === 4 && (
            <>
              <CheckGroup
                label={prompts?.systems.label || "Какие программы и системы используются в этом процессе?"}
                options={prompts ? prioritizedOptions(systemOptions, prompts.systems.suggestedIds) : systemOptions}
                value={form.systems}
                onChange={(v) => set("systems", v)}
                required
                error={errors.systems}
              />
              {form.systems.includes("13") && <TextField label="Укажите другой инструмент" value={form.otherSystem} onChange={v => set("otherSystem", v)} required error={errors.otherSystem} />}
              <RadioGroup
                label={prompts?.storage.label || "Где хранятся данные по этому процессу?"}
                options={dataStorageOptions}
                value={form.dataStorage}
                onChange={(v) => set("dataStorage", v)}
                required
                error={errors.dataStorage}
              />
            </>
          )}

          {step === 5 && (
            <>
              <AreaField
                label={prompts?.goal.label || "Какой результат нужен за 1–3 месяца?"}
                value={form.goal}
                onChange={(v) => set("goal", v)}
                placeholder={prompts?.goal.placeholder || "Например: единая точка приёма заявок и контроль сроков ответа"}
                required
                error={errors.goal}
              />
              <TextField
                label={prompts?.successCriteria.label || "По какому критерию вы поймёте, что результат достигнут?"}
                value={form.successCriteria}
                onChange={(v) => set("successCriteria", v)}
                placeholder={prompts?.successCriteria.placeholder || "Например: ни одна заявка не теряется"}
                required
                error={errors.successCriteria}
              />

            </>
          )}


        </div>

        {hasErrors && (
          <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-destructive">
            <AlertCircle className="w-4 h-4" /> Проверьте отмеченные поля
          </p>
        )}

        {/* навигация */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between">
          <Button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-base font-semibold text-foreground/80 hover:text-foreground hover:border-foreground/30 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </Button>
          <Button
            type="button"
            onClick={next}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent text-accent-foreground pl-6 pr-2 py-2 min-h-[52px] text-base md:text-lg font-semibold shadow-card hover:shadow-elevated hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all"
          >
            <span>
              {step === TOTAL_STEPS ? "Показать результат" : "Продолжить"}
            </span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-background text-foreground group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticForm;