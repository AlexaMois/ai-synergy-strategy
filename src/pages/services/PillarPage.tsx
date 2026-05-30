import { Helmet } from "react-helmet-async";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle2, BookOpen, Briefcase, FileText } from "lucide-react";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import FAQTeaser from "@/components/FAQTeaser";
import RelatedBlogPosts from "@/components/RelatedBlogPosts";
import PillButton from "@/components/PillButton";
import { getPillarBySlug } from "@/data/pillarPages";

const PillarPage = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/\/$/, "").split("/").pop();
  const data = getPillarBySlug(slug);

  if (!data) return <Navigate to="/services" replace />;

  const canonicalUrl = `https://aleksamois.ru${data.url}`;

  return (
    <PageTransition>
      <Helmet>
        <title>{data.seo.title}</title>
        <meta name="description" content={data.seo.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={data.seo.title} />
        <meta property="og:description" content={data.seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: data.cluster,
            url: canonicalUrl,
            provider: {
              "@type": "Person",
              name: "Александра Моисеева",
              url: "https://aleksamois.ru/about",
            },
            areaServed: "RU",
            description: data.seo.description,
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <PageBreadcrumbs
          currentPage={data.shortTitle}
          parentPages={[{ label: "Услуги", href: "/services" }]}
        />

        <main>
          {/* HERO — большая пастельная плашка в стиле главной */}
          <section className="pt-8 md:pt-12 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="relative rounded-[32px] md:rounded-[40px] bg-surface-mint overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
                <div className="px-6 md:px-12 lg:px-16 py-12 md:py-20">
                  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6">
                    {data.hero.eyebrow}
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-foreground mb-6 max-w-4xl">
                    {data.seo.h1}
                  </h1>
                  <p className="text-lg md:text-xl text-foreground/75 mb-10 max-w-3xl leading-snug">
                    {data.hero.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10 max-w-4xl">
                    {data.hero.miniBlocks.map((b, i) => {
                      const Icon = b.icon;
                      return (
                        <div
                          key={i}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 ring-1 ring-foreground/10 backdrop-blur"
                        >
                          <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="text-sm font-medium text-foreground leading-tight">
                            {b.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <PillButton to={data.hero.primaryCta.to} variant="dark">
                      {data.hero.primaryCta.label}
                    </PillButton>
                    <Link
                      to={data.hero.secondaryCta.to}
                      className="inline-flex items-center text-foreground/80 hover:text-foreground underline-offset-4 hover:underline font-semibold text-base md:text-lg px-2 py-2"
                    >
                      {data.hero.secondaryCta.label}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Метрики — в стиле «Компания в цифрах» */}
          {data.metricCards.length > 0 && (
            <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
              <div className="max-w-3xl mb-10 md:mb-12">
                <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                  Эффект автоматизации
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
                  Что меняется{" "}
                  <span className="font-iriska font-normal italic text-accent">на практике</span>
                </h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden shadow-card">
                {data.metricCards.map((m, i) => (
                  <div key={i} className="bg-card p-6 md:p-8">
                    <div className="font-iriska font-bold text-accent leading-none mb-3 text-5xl md:text-6xl">
                      {m.value}
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground leading-snug">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Контентные блоки — чередующиеся пастельные плашки */}
          <section className="container mx-auto max-w-7xl px-4 pb-12 md:pb-16">
            <div className="space-y-5 md:space-y-6">
              {data.sections.map((s, i) => {
                const palettes = [
                  "bg-surface-sand",
                  "bg-card",
                  "bg-surface-lavender",
                  "bg-card",
                  "bg-surface-blush",
                  "bg-card",
                  "bg-surface-mint",
                ];
                const bg = palettes[i % palettes.length];
                return (
                  <article
                    key={i}
                    className={`rounded-[28px] md:rounded-[32px] ${bg} ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-8 md:py-12`}
                  >
                    <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                      <div className="md:col-span-5">
                        <div className="font-iriska italic text-accent text-3xl md:text-4xl leading-none mb-3">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                          {s.heading}
                        </h2>
                      </div>
                      <div className="md:col-span-7">
                        {s.body && (
                          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                            {s.body}
                          </p>
                        )}
                        {s.list && (
                          <ul className="space-y-3">
                            {s.list.map((item, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-3 text-base md:text-lg text-foreground/80"
                              >
                                <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Услуги по теме */}
          <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
            <div className="max-w-3xl mb-10 md:mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-accent" />
                <p className="text-sm uppercase tracking-widest text-accent font-semibold">
                  Форматы работы
                </p>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
                Услуги{" "}
                <span className="font-iriska font-normal italic text-accent">по теме</span>
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.relatedServices.map((s, i) => {
                const palettes = [
                  { bg: "bg-surface-mint", text: "text-foreground", muted: "text-foreground/70" },
                  { bg: "bg-surface-sand", text: "text-foreground", muted: "text-foreground/70" },
                  { bg: "bg-surface-lavender", text: "text-foreground", muted: "text-foreground/70" },
                  { bg: "bg-surface-blush", text: "text-foreground", muted: "text-foreground/70" },
                  { bg: "bg-accent", text: "text-white", muted: "text-white/85" },
                ];
                const p = palettes[i % palettes.length];
                return (
                  <Link
                    key={s.href}
                    to={s.href}
                    className={`group relative flex flex-col rounded-[28px] ${p.bg} p-7 md:p-8 overflow-hidden shadow-card hover:shadow-plate hover:-translate-y-1 transition-all duration-300 ring-1 ring-foreground/5 min-h-[220px]`}
                  >
                    <h3 className={`text-xl md:text-2xl font-bold ${p.text} leading-tight mb-3`}>
                      {s.label}
                    </h3>
                    {s.description && (
                      <p className={`text-sm md:text-base ${p.muted} leading-snug`}>
                        {s.description}
                      </p>
                    )}
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <span className={`text-sm font-semibold ${p.text}`}>Подробнее</span>
                      <ArrowRight className={`h-5 w-5 ${p.text} opacity-80 group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Релевантные кейсы */}
          <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
            <div className="max-w-3xl mb-10 md:mb-12">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-accent" />
                <p className="text-sm uppercase tracking-widest text-accent font-semibold">
                  Кейсы клиентов
                </p>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
                Релевантные{" "}
                <span className="font-iriska font-normal italic text-accent">кейсы</span>
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.relatedCases.map((c, i) => (
                <Link
                  key={c.href}
                  to={c.href}
                  className="group relative flex flex-col rounded-[28px] bg-card ring-1 ring-foreground/5 p-7 md:p-8 shadow-card hover:shadow-plate hover:-translate-y-1 transition-all duration-300 min-h-[200px]"
                >
                  <span className="font-iriska italic text-accent text-3xl md:text-4xl leading-none mb-3">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-3">
                    {c.label}
                  </h3>
                  {c.description && (
                    <p className="text-sm md:text-base text-foreground/70 leading-snug">
                      {c.description}
                    </p>
                  )}
                  <div className="mt-auto pt-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Смотреть кейс</span>
                    <ArrowRight className="h-5 w-5 text-foreground opacity-80 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Финальный CTA — бирюзовая плашка */}
          <section className="px-4 md:px-6 pb-16 md:pb-24">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[32px] md:rounded-[40px] bg-accent overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-14 md:py-20 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.05] mb-5 max-w-3xl mx-auto">
                  {data.cta.title}
                </h2>
                <p className="text-base md:text-lg text-white/85 mb-10 max-w-2xl mx-auto">
                  {data.cta.text}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <PillButton to={data.cta.primary.to} variant="light">
                    {data.cta.primary.label}
                  </PillButton>
                  <Link
                    to={data.cta.secondary.to}
                    className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base md:text-lg text-white/90 hover:text-white transition-colors"
                  >
                    {data.cta.secondary.label}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Статьи блога */}
          {data.relatedBlogSlugs.length > 0 && (
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 mb-2 max-w-4xl mx-auto">
                <BookOpen className="w-5 h-5 text-accent" aria-hidden="true" />
              </div>
              <RelatedBlogPosts slugs={data.relatedBlogSlugs} title="Статьи по теме" />
            </div>
          )}

          <FAQTeaser items={data.faq} />

          <Contact />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default PillarPage;