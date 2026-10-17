import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  return (
    <article className={`overflow-hidden rounded-[28px] shadow-card ring-1 ring-foreground/5 ${featured ? "bg-surface-mint md:col-span-2 grid lg:grid-cols-2" : "bg-card flex flex-col"}`}>
      <div className={`p-6 md:p-8 flex flex-col ${featured ? "lg:p-10" : ""}`}>
        <p className="text-sm text-muted-foreground mb-3">{project.industry}</p>
        <h2 className="!text-[22px] md:!text-[26px] !font-bold !leading-[1.2] text-foreground mb-4">{project.problem}</h2>
        <p className="text-primary-dark font-semibold mb-4">{project.client}</p>
        <p className="text-base text-foreground leading-relaxed mb-6">{project.solution}</p>
        <dl className="mt-auto border-t border-foreground/10 pt-5 space-y-4">
          {project.results.map(result => <div key={result.value}>
            <dt className="text-sm text-muted-foreground leading-relaxed">{result.label}</dt>
            <dd className="text-2xl font-bold text-primary-dark mt-1" title={result.confirmation}>{result.value}</dd>
          </div>)}
        </dl>
        <Button asChild variant="link" className="justify-start h-auto whitespace-normal px-0 mt-6 text-foreground text-base">
          <Link to={project.link}>Посмотреть, как это работает <ArrowRight aria-hidden="true" /></Link>
        </Button>
      </div>
      {image && <figure className={`${featured ? "lg:border-l" : "border-t"} border-foreground/10 bg-background flex flex-col justify-center min-w-0`}>
        <Link to={project.link} className="block p-3 md:p-5">
          <img src={media[image.key]} alt={image.alt} loading={featured ? "eager" : "lazy"} className={`w-full object-contain ${featured ? "aspect-[4/3]" : "aspect-[16/9]"}`} />
        </Link>
        <figcaption className="px-5 pb-5">
          {project.images.length > 1 ? <div className="flex flex-wrap gap-2" aria-label="Скриншоты АкТрансСервиса">
            {project.images.map((shot, index) => <Button key={shot.key} size="sm" variant={activeImage === index ? "secondary" : "ghost"} aria-pressed={activeImage === index} onClick={() => setActiveImage(index)} className="text-sm h-auto min-h-9 whitespace-normal">{shot.caption}</Button>)}
          </div> : <p className="text-sm text-muted-foreground">{image.caption}</p>}
        </figcaption>
      </figure>}
    </article>
  );
}