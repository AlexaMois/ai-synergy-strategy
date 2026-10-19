type Item = { label: string; target: string };

const CaseReadingNav = ({ items }: { items: Item[] }) => (
  <nav aria-label="Разделы проекта" className="mx-auto max-w-7xl px-4 py-5 md:py-7">
    <div className="flex flex-wrap items-center gap-2 rounded-[24px] border border-foreground/10 bg-card p-3 shadow-card md:gap-3 md:p-4">
      <span className="px-2 text-xs font-semibold uppercase tracking-widest text-primary-dark">В этом кейсе</span>
      {items.map(({ label, target }) => (
        <a
          key={target}
          href={`#${target}`}
          className="inline-flex min-h-11 items-center rounded-full border border-foreground/10 bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark md:text-base"
        >
          {label} <span aria-hidden="true" className="ml-2 text-primary-dark">↘</span>
        </a>
      ))}
    </div>
  </nav>
);

export default CaseReadingNav;
