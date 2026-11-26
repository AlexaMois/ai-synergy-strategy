import { type ClientAssessment } from "@/lib/clientAssessment";

export default function AssessmentReport({ report, scenarioId }: { report: ClientAssessment; scenarioId: string }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white text-[#212121] ring-1 ring-[#E5E7EB]" data-report-state={report.state}>
      <header className="bg-[#212121] px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-white">
          <span>Самостоятельная проверка процесса</span><time>{report.date}</time>
        </div>
        <h3 className="mt-2 break-words text-xl font-bold leading-tight text-white sm:text-2xl [overflow-wrap:anywhere]">{report.process}</h3>
        <div className="mt-2 text-sm text-white [overflow-wrap:anywhere]" data-scenario-id={scenarioId || undefined}>{report.industry}{report.question && <div className="mt-1">{report.question}</div>}</div>
      </header>
      <div className="space-y-4 p-4 sm:p-6">
        <div className="text-base font-semibold text-[#212121]" data-report-status>{report.status}</div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {report.metrics.map(metric => (
            <div key={metric.id} className="min-w-0 rounded-lg border border-[#E5E7EB] bg-[#F3F5F6] p-3" data-metric={metric.id}>
              <div className="break-words text-lg font-bold text-[#212121] [overflow-wrap:anywhere]">{metric.value}</div>
              <div className="mt-1 text-sm text-[#616161]">{metric.label}</div>
            </div>
          ))}
        </div>
        <div className="text-sm text-[#616161]">{report.metricNote}</div>
        {report.sections.map(section => (
          <section key={section.id} data-report-section={section.id} className={section.id === "firstStep" ? "rounded-xl bg-[#DEF2F7] p-4" : "border-t border-[#E5E7EB] pt-3"}>
            <div className="mb-1.5 text-base font-bold text-[#212121]">{section.title}</div>
            {section.paragraphs.map((paragraph, index) => <div key={index} className="mb-1.5 whitespace-pre-wrap break-words text-base leading-relaxed text-[#212121] [overflow-wrap:anywhere] last:mb-0">{paragraph}</div>)}
          </section>
        ))}
        <div className="border-t border-[#E5E7EB] pt-3 text-sm leading-relaxed text-[#616161]">{report.caveat}</div>
      </div>
    </article>
  );
}
