import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PillButton from "@/components/PillButton";
import type { CaseStudy } from "@/data/caseStudies";
import { trackCaseOpen } from "@/utils/analytics";
import portal from "@/assets/cases/aktrans/portal.webp";
import dashboard from "@/assets/cases/aktrans/dashboard.webp";
import jarvis from "@/assets/cases/aktrans/jarvis-menu.webp";
import krayMeeting from "@/assets/cases/kraypotrebsoyuz/kraypotrebsoyuz-meeting-2.jpg";

const media: Record<string, string> = { portal, dashboard, jarvis, "kray-meeting": krayMeeting };

export default function CaseProjectCard({ project }: { project: CaseStudy }) {
  const [activeImage, setActiveImage] = useState(0);
  const image = project.images[activeImage];
  const featured = project.id === "aktransservice";
  const mint = ["production-doc-search", "caregiver-matching"].includes(project.id);
  const ink = project.id === "neurotenderolog";
  const dark = featured || ink;
  return (
    <article data-case-id={project.id} className={`min-w-0 overflow-hidden rounded-[28px] shadow-card ring-1 ring-foreground/5 ${featured ? "md:col-span-2 lg:col-span-3 grid lg:grid-cols-12 bg-foreground" : `flex flex-col ${ink ? "bg-foreground" : mint ? "bg-surface-mint" : "bg-card"}`}`}>
      <div className={`flex flex-col items-start p-6 md:p-7 ${featured ? "lg:col-span-7 lg:p-10" : ""}`}>
        <p className={`text-xs uppercase tracking-widest font-semibold mb-4 ${dark ? "text-accent" : "text-muted-foreground"}`}>{project.industry}</p>
        <h2 className={`!text-2xl ${featured ? "md:!text-3xl" : ""} !leading-tight !font-bold mb-3 ${dark ? "!text-background" : "!text-foreground"}`}>{project.problem}</h2>
        <p className={`text-sm font-semibold mb-3 ${dark ? "text-accent" : "text-primary-dark"}`}>{project.client}</p>
        <p className={`text-sm ${featured ? "md:text-base" : ""} leading-relaxed mb-6 ${dark ? "text-background/85" : "text-muted-foreground"}`}>{project.solution}</p>
        <dl className={`w-full mt-auto grid ${project.results.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-4 border-t pt-5 ${dark ? "border-background/15" : "border-foreground/10"}`}>
          {project.results.map(result => <div key={result.value}>
            <dd className={`text-3xl ${featured ? "md:text-5xl" : ""} font-bold leading-tight mb-2 ${dark ? "text-accent" : "text-foreground"}`} title={result.confirmation}>{result.value}</dd>
            <dt className={`text-xs leading-relaxed ${dark ? "text-background/75" : "text-muted-foreground"}`}>{result.label}</dt>
          </div>)}
        </dl>
        <PillButton to={project.link} onClick={() => trackCaseOpen(project.id)} variant={dark ? "light" : "dark"} size="sm" className="mt-6 max-w-full">{project.linkLabel}</PillButton>
      </div>
      {image && <figure className={`${featured ? "lg:col-span-5 lg:border-l border-background/15 flex flex-col justify-center p-5 lg:p-7" : "px-6 pb-6"} min-w-0`}>
        <Link to={project.link} onClick={() => trackCaseOpen(project.id)} className="block overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10">
          <img src={media[image.key]} alt={image.alt} loading={featured ? "eager" : "lazy"} className={`w-full object-contain ${featured ? "aspect-[4/3]" : "aspect-[16/9]"}`} />
        </Link>
        <figcaption className="pt-3">
          {project.images.length > 1 ? <div className="flex flex-wrap gap-1.5" aria-label="Скриншоты АкТрансСервиса">
            {project.images.map((shot, index) => <Button key={shot.key} size="sm" variant="ghost" aria-pressed={activeImage === index} onClick={() => setActiveImage(index)} className={`rounded-full text-xs h-auto min-h-9 whitespace-normal px-3 ${activeImage === index ? "bg-background text-foreground hover:bg-background/90" : "text-background hover:bg-background/10 hover:text-background"}`}>{shot.caption}</Button>)}
          </div> : <p className="text-xs text-muted-foreground leading-relaxed">{image.caption}</p>}
        </figcaption>
      </figure>}
    </article>
  );
}
