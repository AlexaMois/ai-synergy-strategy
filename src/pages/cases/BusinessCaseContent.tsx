import PillButton from "@/components/PillButton";
import { scrollToContact } from "@/lib/scrollToContact";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStory {
  title: string;
  subtitle: string;
  industry: string;
  status: string;
  targetAudience: string;
  task: string;
  actions: string[];
  results: string[];
}

interface Props {
  story: CaseStory;
  project?: CaseStudy;
}

const BusinessCaseContent = ({ story, project }: Props) => (
  <main>
    <section className="mx-auto max-w-7xl px-4 pt-8 md:pt-12">
      <div className="overflow-hidden rounded-[32px] bg-surface-mint shadow-card ring-1 ring-foreground/5 md:rounded-[40px]">
        <div className="grid items-end gap-8 p-6 md:p-10 lg:grid-cols-12 lg:gap-10 lg:p-12">
          <div className="min-w-0 lg:col-span-8">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary-dark">Кейс · {story.industry}</p>
            <h1 className="max-w-4xl !text-3xl !font-bold !leading-[1.12] !text-foreground md:!text-5xl">{story.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">{story.subtitle}</p>
            <p className="mt-5 text-sm leading-relaxed text-foreground/65">Статус: {story.status} · {story.targetAudience}</p>
          </div>
          {project?.results?.length ? (
            <dl className="grid min-w-0 grid-cols-2 gap-5 rounded-[24px] bg-card p-5 ring-1 ring-foreground/5 md:p-6 lg:col-span-4">
              {project.results.map((item) => (
                <div key={item.value} className="min-w-0" title={item.confirmation}>
                  <dd className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">{item.value}</dd>
                  <dt className="mt-2 text-sm leading-relaxed text-foreground/75">{item.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>

    <section aria-label="Основное о проекте" className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <div className="grid overflow-hidden rounded-[28px] border border-foreground/10 bg-card shadow-card md:grid-cols-3">
        {[
          { label: "Задача бизнеса", text: story.task },
          { label: "Решение", text: story.actions[0] ?? story.subtitle },
          { label: "Результат", text: story.results[0] ?? story.status },
        ].map((item, index) => (
          <article key={item.label} className="min-w-0 border-b border-foreground/10 p-6 last:border-0 md:border-b-0 md:border-r md:p-7 md:last:border-r-0">
            <span className="mb-4 inline-flex h-11 min-w-11 items-center justify-center rounded-xl bg-surface-mint px-2 text-lg font-bold tabular-nums text-primary-dark">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="!text-xl !font-bold !leading-snug !text-foreground">{item.label}</h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/75">{item.text}</p>
          </article>
        ))}
      </div>
    </section>

    <section aria-labelledby="case-work" className="bg-foreground py-12 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">Решение на практике</p>
          <h2 id="case-work" className="!text-3xl !leading-tight !text-background md:!text-4xl">Что сделали</h2>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 md:col-span-8">
          {story.actions.map((action, index) => (
            <li key={action} className="min-w-0 rounded-[22px] border border-background/15 bg-white/[0.07] p-5">
              <span className="inline-flex h-12 min-w-12 items-center justify-center rounded-[14px] bg-accent px-3 text-xl font-bold tabular-nums text-foreground">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-4 text-base leading-relaxed text-background/90">{action}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section aria-labelledby="case-outcomes" className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">Фактические результаты</p>
          <h2 id="case-outcomes" className="!text-3xl !leading-tight !text-foreground md:!text-4xl">Что получили</h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-foreground/70">Подтверждённые сведения о реализации и использовании решения.</p>
        </div>
        <div className="grid gap-3 md:col-span-8">
          {story.results.map((result, index) => (
            <div key={result} className="flex min-w-0 items-start gap-4 rounded-[22px] border border-foreground/10 bg-card p-5 md:p-6">
              <span className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl bg-surface-mint px-2 text-xl font-bold tabular-nums text-primary-dark">{String(index + 1).padStart(2, "0")}</span>
              <p className="pt-2 text-base font-medium leading-relaxed text-foreground md:text-lg">{result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 pb-12 md:pb-16">
      <div className="flex flex-col gap-6 rounded-[32px] bg-foreground p-6 shadow-card md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Следующий шаг</p>
          <h2 className="!text-2xl !leading-tight !text-background md:!text-3xl">Обсудим вашу задачу</h2>
        </div>
        <PillButton onClick={scrollToContact} variant="light" size="md" className="self-start shrink-0">Обсудить похожую задачу</PillButton>
      </div>
    </section>
  </main>
);

export default BusinessCaseContent;
