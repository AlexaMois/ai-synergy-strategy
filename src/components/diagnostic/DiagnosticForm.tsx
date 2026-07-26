import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DiagnosticForm as FormData,
  emptyForm,
  Option,
  aiUsageOptions,
  budgetOptions,
  dataStorageOptions,
  decisionMakerOptions,
  frequencyOptions,
  labelOf,
  labelsOf,
  lossOptions,
  manualActionOptions,
  readinessLevel,
  readyForCallOptions,
  systemOptions,
  teamSizeOptions,
  urgencyOptions,
  wantsDraftOptions,
} from "./diagnosticConfig";

const TOTAL_STEPS = 8;

/* ---------- поля ---------- */

const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-sm md:text-base font-semibold text-foreground mb-2">
    {children}
    {required && <span className="text-accent"> *</span>}
  </label>
);

const inputCls =
  "w-full rounded-2xl border border-foreground/10 bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition";

const TextField = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  hint?: string;
}) => (
  <div>
    <Label required={required}>{label}</Label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputCls}
      inputMode={type === "number" ? "numeric" : undefined}
    />
    {hint && <p className="text-xs text-muted-foreground mt-1.5">{hint}</p>}
  </div>
);

const AreaField = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) => (
  <div>
    <Label required={required}>{label}</Label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`${inputCls} resize-y leading-relaxed`}
    />
  </div>
);

const RadioGroup = ({
  label,
  options,
  value,
  onChange,
  required,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) => (
  <div>
    <Label required={required}>{label}</Label>
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={`text-left rounded-2xl border px-4 py-3 text-sm md:text-base transition-all min-h-[52px] ${
              active
                ? "border-accent bg-accent/10 text-foreground font-semibold"
                : "border-foreground/10 bg-card text-foreground/80 hover:border-accent/50"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 border ${
                  active ? "bg-accent border-accent" : "border-foreground/25"
                }`}
              >
                {active && <Check className="w-3 h-3 text-accent-foreground" />}
              </span>
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

const CheckGroup = ({
  label,
  options,
  value,
  onChange,
  required,
}: {
  label: string;
  options: Option[];
  value: string[];
  onChange: (v: string[]) => void;
  required?: boolean;
}) => (
  <div>
    <Label required={required}>{label}</Label>
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const active = value.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            onClick={() =>
              onChange(active ? value.filter((v) => v !== o.id) : [...value, o.id])
            }
            className={`text-left rounded-2xl border px-4 py-3 text-sm md:text-base transition-all min-h-[52px] ${
              active
                ? "border-accent bg-accent/10 text-foreground font-semibold"
                : "border-foreground/10 bg-card text-foreground/80 hover:border-accent/50"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-md shrink-0 border ${
                  active ? "bg-accent border-accent" : "border-foreground/25"
                }`}
              >
                {active && <Check className="w-3.5 h-3.5 text-accent-foreground" />}
              </span>
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

/* ---------- итоговый экран ---------- */

const SummaryRow = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl bg-card p-5 ring-1 ring-foreground/5">
    <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">{title}</p>
    <div className="text-sm md:text-base text-foreground/85 leading-relaxed">{children}</div>
  </div>
);

/* ---------- основной компонент ---------- */

const DiagnosticForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [recordId, setRecordId] = useState<string | null>(null);
  const submittedRef = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const scrollTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const validate = (s: number): string[] => {
    const e: string[] = [];
    if (s === 1) {
      if (!form.process.trim()) e.push("Укажите процесс, который хотите улучшить");
      if (form.manualActions.length === 0) e.push("Отметьте хотя бы одно ручное действие");
      if (!form.processDescription.trim()) e.push("Опишите, как процесс работает сейчас");
    }
    if (s === 2) {
      if (!form.participants.trim() || Number(form.participants) < 1)
        e.push("Укажите количество участников процесса");
      if (!form.frequency) e.push("Выберите частоту повторения процесса");
      if (!form.hoursPerWeek.trim() || Number(form.hoursPerWeek) <= 0)
        e.push("Укажите, сколько часов в неделю уходит на процесс");
    }
    if (s === 3) {
      if (form.losses.length === 0) e.push("Отметьте, что теряется или задерживается");
      if (!form.consequences.trim()) e.push("Опишите, к чему приводят текущие проблемы");
    }
    if (s === 4) {
      if (form.systems.length === 0) e.push("Отметьте используемые программы и системы");
      if (!form.aiUsage) e.push("Ответьте про использование ИИ-инструментов");
      if (!form.dataStorage) e.push("Укажите, где хранятся данные по процессу");
    }
    if (s === 5) {
      if (!form.goal.trim()) e.push("Опишите результат за 1–3 месяца");
      if (!form.successCriteria.trim()) e.push("Укажите критерий достижения результата");
      if (!form.urgency) e.push("Выберите срочность задачи");
    }
    if (s === 6) {
      if (!form.budget) e.push("Выберите рассматриваемый бюджет");
      if (!form.decisionMaker) e.push("Укажите, кто принимает решение");
      if (!form.readyForCall) e.push("Ответьте про готовность к разговору на 15–20 минут");
    }
    if (s === 7) {
      if (!form.companyName.trim()) e.push("Укажите название компании");
      if (!form.industry.trim()) e.push("Укажите сферу деятельности");
      if (!form.city.trim()) e.push("Укажите город или регион");
      if (!form.teamSize) e.push("Выберите размер команды");
    }
    if (s === 8) {
      if (!form.name.trim()) e.push("Укажите ваше имя");
      if (!form.position.trim()) e.push("Укажите должность");
      const digits = form.phone.replace(/\D/g, "");
      if (digits.length < 10) e.push("Укажите телефон, привязанный к MAX");
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.push("Проверьте адрес электронной почты");
      if (!form.wantsDraft) e.push("Ответьте про предварительный вариант решения");
      if (!form.consent) e.push("Нужно согласие на обработку персональных данных");
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (e.length) return;
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      scrollTop();
    } else {
      void submit();
    }
  };

  const back = () => {
    setErrors([]);
    setSubmitError(null);
    if (step > 1) {
      setStep(step - 1);
      scrollTop();
    }
  };

  const submit = async () => {
    if (submittedRef.current || submitting) return;
    submittedRef.current = true;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const { data, error } = await supabase.functions.invoke("submit-diagnostic", {
        body: {
          ...form,
          participants: Number(form.participants),
          hoursPerWeek: Number(form.hoursPerWeek),
          consent: true,
        },
      });
      const id = (data as { recordId?: string } | null)?.recordId;
      if (error || !id) {
        submittedRef.current = false;
        setSubmitError(
          "Не удалось отправить анкету. Проверьте соединение и попробуйте ещё раз или напишите на ai@aleksamois.ru"
        );
        return;
      }
      setRecordId(id);
      scrollTop();
    } catch {
      submittedRef.current = false;
      setSubmitError(
        "Не удалось отправить анкету. Проверьте соединение и попробуйте ещё раз или напишите на ai@aleksamois.ru"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const readiness = useMemo(() => readinessLevel(form), [form]);

  /* ---------- итоговый экран (только после 200 OK и ID) ---------- */
  if (recordId) {
    return (
      <div ref={topRef} className="max-w-4xl mx-auto">
        <div className="rounded-[28px] md:rounded-[36px] bg-surface-mint p-6 md:p-10 ring-1 ring-foreground/5 shadow-plate">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full mb-5">
            <Check className="w-4 h-4" />
            <span className="text-sm font-semibold">Анкета отправлена</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            Спасибо. Предварительная диагностика завершена.
          </h3>
          <p className="text-base md:text-lg text-foreground/75 mb-8">
            Мы изучим ответы и свяжемся с вами в MAX для короткого разговора на 15–20 минут.
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            <SummaryRow title="Выбранный процесс">{form.process}</SummaryRow>
            <SummaryRow title="Основные ручные действия">
              {labelsOf(manualActionOptions, form.manualActions).join(", ")}
            </SummaryRow>
            <SummaryRow title="Масштаб процесса">
              {form.participants} чел. · {labelOf(frequencyOptions, form.frequency).toLowerCase()} ·
              около {form.hoursPerWeek} ч в неделю
            </SummaryRow>
            <SummaryRow title="Проблемы и риски">
              {labelsOf(lossOptions, form.losses).join(", ")}
              {form.consequences && (
                <span className="block mt-1.5 text-muted-foreground">{form.consequences}</span>
              )}
            </SummaryRow>
            <SummaryRow title="Используемые системы">
              {labelsOf(systemOptions, form.systems).join(", ")}
              <span className="block mt-1.5 text-muted-foreground">
                ИИ: {labelOf(aiUsageOptions, form.aiUsage).toLowerCase()} · данные:{" "}
                {labelOf(dataStorageOptions, form.dataStorage).toLowerCase()}
              </span>
            </SummaryRow>
            <SummaryRow title="Цель клиента">
              {form.goal}
              {form.successCriteria && (
                <span className="block mt-1.5 text-muted-foreground">
                  Критерий: {form.successCriteria}
                </span>
              )}
            </SummaryRow>
            <SummaryRow title="Предварительный уровень готовности">
              <span className="font-semibold">{readiness.title}</span>
              <span className="block mt-1.5 text-muted-foreground">{readiness.text}</span>
            </SummaryRow>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground mt-6 leading-relaxed">
            Это предварительная оценка по ответам анкеты. Точный экономический эффект, архитектура
            решения, бюджет и срок окупаемости определяются после анализа процесса и исходных данных.
          </p>
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
    5: { h: "Цель и срочность", sub: "Какой результат нужен" },
    6: { h: "Бюджет и решение", sub: "Как принимается решение" },
    7: { h: "О компании", sub: "Контекст бизнеса" },
    8: { h: "Контакт", sub: "Связь только через MAX" },
  };

  return (
    <div ref={topRef} className="max-w-4xl mx-auto">
      <div className="rounded-[28px] md:rounded-[36px] bg-card p-5 sm:p-7 md:p-10 ring-1 ring-foreground/5 shadow-plate">
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
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
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
                placeholder="Например: обработка входящих заявок"
                required
              />
              <CheckGroup
                label="Какие действия сотрудники регулярно выполняют вручную?"
                options={manualActionOptions}
                value={form.manualActions}
                onChange={(v) => set("manualActions", v)}
                required
              />
              <AreaField
                label="Опишите, как процесс устроен сейчас"
                value={form.processDescription}
                onChange={(v) => set("processDescription", v)}
                placeholder="Кто что делает, в какой последовательности, где возникают задержки"
                required
              />
            </>
          )}

          {step === 2 && (
            <>
              <TextField
                label="Сколько сотрудников участвует в процессе?"
                type="number"
                value={form.participants}
                onChange={(v) => set("participants", v)}
                placeholder="4"
                required
              />
              <RadioGroup
                label="С какой частотой повторяется процесс?"
                options={frequencyOptions}
                value={form.frequency}
                onChange={(v) => set("frequency", v)}
                required
              />
              <TextField
                label="Сколько часов в неделю уходит на процесс?"
                type="number"
                value={form.hoursPerWeek}
                onChange={(v) => set("hoursPerWeek", v)}
                placeholder="10"
                hint="Суммарно по всем участникам, приблизительно"
                required
              />
            </>
          )}

          {step === 3 && (
            <>
              <CheckGroup
                label="Что чаще всего теряется, задерживается или выполняется с ошибками?"
                options={lossOptions}
                value={form.losses}
                onChange={(v) => set("losses", v)}
                required
              />
              <AreaField
                label="К чему приводят текущие проблемы?"
                value={form.consequences}
                onChange={(v) => set("consequences", v)}
                placeholder="Например: клиенты ждут ответа, руководитель не видит статус заявок"
                required
              />
            </>
          )}

          {step === 4 && (
            <>
              <CheckGroup
                label="Какие программы и системы используются в этом процессе?"
                options={systemOptions}
                value={form.systems}
                onChange={(v) => set("systems", v)}
                required
              />
              <RadioGroup
                label="Используете ли вы инструменты искусственного интеллекта в работе?"
                options={aiUsageOptions}
                value={form.aiUsage}
                onChange={(v) => set("aiUsage", v)}
                required
              />
              <RadioGroup
                label="Где хранятся данные по этому процессу?"
                options={dataStorageOptions}
                value={form.dataStorage}
                onChange={(v) => set("dataStorage", v)}
                required
              />
            </>
          )}

          {step === 5 && (
            <>
              <AreaField
                label="Какой результат нужен за 1–3 месяца?"
                value={form.goal}
                onChange={(v) => set("goal", v)}
                placeholder="Например: единая точка приёма заявок и контроль сроков ответа"
                required
              />
              <TextField
                label="По какому критерию вы поймёте, что результат достигнут?"
                value={form.successCriteria}
                onChange={(v) => set("successCriteria", v)}
                placeholder="Например: ни одна заявка не теряется"
                required
              />
              <RadioGroup
                label="Насколько срочно нужно разобраться с задачей?"
                options={urgencyOptions}
                value={form.urgency}
                onChange={(v) => set("urgency", v)}
                required
              />
            </>
          )}

          {step === 6 && (
            <>
              <RadioGroup
                label="Какой бюджет компания готова рассматривать при подтверждённом эффекте?"
                options={budgetOptions}
                value={form.budget}
                onChange={(v) => set("budget", v)}
                required
              />
              <RadioGroup
                label="Кто принимает решение?"
                options={decisionMakerOptions}
                value={form.decisionMaker}
                onChange={(v) => set("decisionMaker", v)}
                required
              />
              <RadioGroup
                label="Готов ли руководитель к разговору на 15–20 минут?"
                options={readyForCallOptions}
                value={form.readyForCall}
                onChange={(v) => set("readyForCall", v)}
                required
              />
              <TextField
                label="Ответственный со стороны компании"
                value={form.companyOwner}
                onChange={(v) => set("companyOwner", v)}
                placeholder="Необязательно"
              />
            </>
          )}

          {step === 7 && (
            <>
              <TextField
                label="Название компании"
                value={form.companyName}
                onChange={(v) => set("companyName", v)}
                required
              />
              <TextField
                label="Сфера деятельности"
                value={form.industry}
                onChange={(v) => set("industry", v)}
                required
              />
              <TextField
                label="Город или регион"
                value={form.city}
                onChange={(v) => set("city", v)}
                required
              />
              <TextField
                label="Сайт или соцсети компании"
                value={form.website}
                onChange={(v) => set("website", v)}
                placeholder="Необязательно"
              />
              <RadioGroup
                label="Размер команды"
                options={teamSizeOptions}
                value={form.teamSize}
                onChange={(v) => set("teamSize", v)}
                required
              />
            </>
          )}

          {step === 8 && (
            <>
              <TextField
                label="Ваше имя"
                value={form.name}
                onChange={(v) => set("name", v)}
                required
              />
              <TextField
                label="Должность"
                value={form.position}
                onChange={(v) => set("position", v)}
                required
              />
              <TextField
                label="Телефон, привязанный к MAX"
                type="tel"
                value={form.phone}
                onChange={(v) => set("phone", v)}
                placeholder="+7 999 000 00 00"
                hint="Свяжемся только в MAX по этому номеру"
                required
              />
              <TextField
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => set("email", v)}
                placeholder="Необязательно"
              />
              <AreaField
                label="Что важно знать перед первым разговором?"
                value={form.notes}
                onChange={(v) => set("notes", v)}
                placeholder="Необязательно"
                rows={3}
              />
              <RadioGroup
                label="Готовы получить предварительный вариант решения после короткого разговора?"
                options={wantsDraftOptions}
                value={form.wantsDraft}
                onChange={(v) => set("wantsDraft", v)}
                required
              />
              {/* honeypot */}
              <input
                type="text"
                name="company_extra"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                onChange={() => undefined}
              />
              <label className="flex items-start gap-3 cursor-pointer rounded-2xl border border-foreground/10 bg-background p-4">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-1 w-5 h-5 accent-accent shrink-0"
                />
                <span className="text-sm text-foreground/80 leading-relaxed">
                  Согласен на обработку персональных данных в соответствии с{" "}
                  <a
                    href="/legal/privacy-policy/"
                    className="text-accent underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    политикой конфиденциальности
                  </a>
                  .
                </span>
              </label>
            </>
          )}
        </div>

        {/* ошибки */}
        {errors.length > 0 && (
          <div className="mt-6 rounded-2xl bg-destructive/10 p-4 ring-1 ring-destructive/20">
            <p className="flex items-center gap-2 text-sm font-semibold text-destructive mb-1.5">
              <AlertCircle className="w-4 h-4" /> Заполните обязательные поля
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-destructive/90">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        {submitError && (
          <div className="mt-6 rounded-2xl bg-destructive/10 p-4 ring-1 ring-destructive/20">
            <p className="flex items-start gap-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {submitError}
            </p>
          </div>
        )}

        {/* навигация */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 1 || submitting}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-base font-semibold text-foreground/80 hover:text-foreground hover:border-foreground/30 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
          <button
            type="button"
            onClick={next}
            disabled={submitting}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent text-accent-foreground pl-6 pr-2 py-2 min-h-[52px] text-base md:text-lg font-semibold shadow-card hover:shadow-elevated hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all"
          >
            <span>
              {submitting
                ? "Отправляем…"
                : step === TOTAL_STEPS
                ? "Отправить анкету"
                : "Продолжить"}
            </span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-background text-foreground group-hover:translate-x-0.5 transition-transform">
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticForm;
