import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import CaseProjectCard from "@/components/cases/CaseProjectCard";
import { availableCaseProblems, publishedCases, type CaseProblem } from "@/data/caseStudies";
import { trackCaseFilter } from "@/utils/analytics";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";

const CasesPage = () => {
  const [problem, setProblem] = useState<CaseProblem | "all">("all");
  const projects = publishedCases(problem);
  const description = "Реальные проекты, рабочие инструменты и результаты. Найдите знакомую проблему и посмотрите, какое решение мы создали";
  return (
    <PageTransition>
      <Helmet>
        <title>Кейсы НейроРешений — реальные решения задач бизнеса</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://aleksamois.ru/cases" />
        <meta property="og:title" content="Кейсы НейроРешений — реальные решения задач бизнеса" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://aleksamois.ru/cases" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbs.cases())}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <PageBreadcrumbs currentPage="Кейсы" />
        <main>
          <section className="container mx-auto max-w-7xl px-4 pt-8 md:pt-12 pb-8 md:pb-10">
            <p className="text-sm uppercase text-primary-dark font-semibold mb-4">Кейсы · НейроРешения</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground mb-5 max-w-5xl">
              Посмотрите, как мы решаем задачи бизнеса
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-7">{description}.</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтры по проблемам">
              <Button size="sm" variant={problem === "all" ? "secondary" : "outline"} aria-pressed={problem === "all"} onClick={() => setProblem("all")} className="rounded-full h-auto min-h-10 text-sm">Все проекты</Button>
              {availableCaseProblems().map(item => <Button key={item.id} size="sm" variant={problem === item.id ? "secondary" : "outline"} aria-pressed={problem === item.id} onClick={() => setProblem(item.id)} className="rounded-full h-auto min-h-10 text-sm">{item.label}</Button>)}
            </div>
          </section>
          <section className="container mx-auto max-w-7xl px-4 pb-10 md:pb-16" aria-label="Выполненные проекты" aria-live="polite">
            <div className="grid md:grid-cols-2 gap-5 md:gap-6 items-start">
              {projects.map(project => <CaseProjectCard key={project.id} project={project} />)}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};
export default CasesPage;
