import { Helmet } from "react-helmet-async";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle2, BookOpen, Briefcase, FileText } from "lucide-react";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import FAQTeaser from "@/components/FAQTeaser";
import RelatedBlogPosts from "@/components/RelatedBlogPosts";
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
          {/* HERO */}
          <section className="pt-8 md:pt-12 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="relative rounded-[32px] md:rounded-[40px] bg-surface-sand overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
                <div className="px-6 md:px-12 lg:px-16 py-12 md:py-20">
                  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6">
                    {data.hero.eyebrow}
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-foreground mb-6 max-w-4xl">
                    {data.seo.h1}
                  </h1>
                  <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-3xl leading-snug">
                    {data.hero.subtitle}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10 max-w-4xl">
                    {data.hero.miniBlocks.map((b, i) => {
                      const Icon = b.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-background/70 ring-1 ring-foreground/10 backdrop-blur"
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
                    <Link
                      to={data.hero.primaryCta.to}
                      className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 bg-foreground text-background hover:bg-foreground/90"
                    >
                      <span>{data.hero.primaryCta.label}</span>
                      <span className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-accent text-accent-foreground group-hover:translate-x-0.5 transition-transform">
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                      </span>
                    </Link>
                    <Link
                      to={data.hero.secondaryCta.to}
                      className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base md:text-lg text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {data.hero.secondaryCta.label}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Метрики */}
          {data.metricCards.length > 0 && (
            <section className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
              <div className="grid sm:grid-cols-3 gap-4">
                {data.metricCards.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-card ring-1 ring-foreground/5 p-6 shadow-card"
                  >
                    <p className="text-3xl md:text-4xl font-bold text-accent mb-2 leading-none">
                      {m.value}
                    </p>
                    <p className="text-sm md:text-base text-foreground/75 leading-snug">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Контентные блоки */}
          <section className="container mx-auto max-w-4xl px-4 pb-12 md:pb-16">
            <div className="space-y-10 md:space-y-14">
              {data.sections.map((s, i) => (
                <article key={i}>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                    {s.heading}
                  </h2>
                  {s.body && (
                    <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
                      {s.body}
                    </p>
                  )}
                  {s.list && (
                    <ul className="space-y-3 mt-2">
                      {s.list.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-base md:text-lg text-foreground/85"
                        >
                          <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Услуги */}
          <section className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-6 h-6 text-accent" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Услуги по теме
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.relatedServices.map((s) => (
                <Link
                  key={s.href}
                  to={s.href}
                  className="group rounded-2xl bg-card ring-1 ring-foreground/5 p-5 hover:shadow-elevated hover:-translate-y-0.5 transition-all"
                >
                  <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                    {s.label}
                  </h3>
                  {s.description && (
                    <p className="text-sm text-foreground/70 leading-snug">
                      {s.description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-accent">
                    Подробнее <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Кейсы */}
          <section className="container mx-auto max-w-7xl px-4 pb-12 md:pb-16">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-6 h-6 text-accent" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Релевантные кейсы
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.relatedCases.map((c) => (
                <Link
                  key={c.href}
                  to={c.href}
                  className="group rounded-2xl bg-surface-sand ring-1 ring-foreground/5 p-5 hover:shadow-elevated hover:-translate-y-0.5 transition-all"
                >
                  <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                    {c.label}
                  </h3>
                  {c.description && (
                    <p className="text-sm text-foreground/70 leading-snug">{c.description}</p>
                  )}
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-accent">
                    Смотреть кейс <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Финальный CTA */}
          <section className="px-4 md:px-6 py-12 md:py-16">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[32px] md:rounded-[40px] bg-accent text-white overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-14 md:py-20 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.05] mb-5 max-w-3xl mx-auto">
                  {data.cta.title}
                </h2>
                <p className="text-base md:text-lg text-white/85 mb-10 max-w-2xl mx-auto">
                  {data.cta.text}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    to={data.cta.primary.to}
                    className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 bg-background text-foreground hover:bg-background/90"
                  >
                    <span>{data.cta.primary.label}</span>
                    <span className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-foreground text-background group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                    </span>
                  </Link>
                  <Link
                    to={data.cta.secondary.to}
                    className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base md:text-lg text-white/85 hover:text-white transition-colors"
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