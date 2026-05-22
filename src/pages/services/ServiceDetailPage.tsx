import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, Package, TrendingUp } from "lucide-react";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import FAQTeaser from "@/components/FAQTeaser";
import { getServiceBySlug } from "@/data/services";

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Подходит, если": CheckCircle2,
  "Что входит": Package,
  "Результат": TrendingUp,
};

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  const forWhom = service.sections.find((s) => s.heading === "Подходит, если");
  const includes = service.sections.find((s) => s.heading === "Что входит");
  const result = service.sections.find((s) => s.heading === "Результат");

  return (
    <PageTransition>
      <Helmet>
        <title>{`${service.title} · НейроРешения`}</title>
        <meta name="description" content={service.subtitle} />
        <link rel="canonical" href={`https://aleksamois.ru${service.href}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <PageBreadcrumbs currentPage={service.shortTitle} />

        <main>
          {/* HERO */}
          <section className="pt-8 md:pt-12 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="relative rounded-[32px] md:rounded-[40px] bg-surface-sand overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
                <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 py-12 md:py-20">
                  <div className="md:col-span-8">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6">
                      Услуга · {service.number}
                    </p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-foreground mb-6">
                      {service.title}
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl leading-snug">
                      {service.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to="/start"
                        className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 bg-foreground text-background hover:bg-foreground/90"
                      >
                        <span>Подобрать формат работы</span>
                        <span className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-accent text-accent-foreground group-hover:translate-x-0.5 transition-transform">
                          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                        </span>
                      </Link>
                      <Link
                        to="/pricing"
                        className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base md:text-lg text-foreground/80 hover:text-foreground transition-colors"
                      >
                        Посмотреть цены <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                  <div className="md:col-span-4 flex justify-center md:justify-end">
                    <img
                      src={service.sketch}
                      alt=""
                      width={512}
                      height={512}
                      className="w-48 md:w-64 lg:w-80 h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Подходит, если */}
          {forWhom?.list && (
            <section className="container mx-auto max-w-7xl px-4 py-16 md:py-20">
              <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      Подходит, если
                    </h2>
                  </div>
                </div>
                <div className="md:col-span-8">
                  <ul className="space-y-3">
                    {forWhom.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-base md:text-lg text-foreground/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Что входит */}
          {includes?.list && (
            <section className="px-4 md:px-6 pb-16 md:pb-20">
              <div className="container mx-auto max-w-7xl">
                <div className="rounded-[32px] md:rounded-[40px] bg-card shadow-card ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-12 md:py-16">
                  <div className="flex items-center gap-2 mb-6">
                    <Package className="w-6 h-6 text-accent" />
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      Что входит
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {includes.list.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-2xl bg-background p-5 ring-1 ring-foreground/5"
                      >
                        <span className="font-iriska italic text-2xl text-accent leading-none w-8 flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base text-foreground/85">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Результат */}
          {result && (
            <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-20">
              <div className="rounded-[32px] md:rounded-[40px] bg-accent shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-12 md:py-16">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Результат</h2>
                </div>
                <p className="text-xl md:text-2xl text-white leading-snug max-w-3xl">
                  {result.content}
                </p>
              </div>
            </section>
          )}

          {/* Стоимость + CTA */}
          <section className="px-4 md:px-6 pb-16 md:pb-24">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[32px] md:rounded-[40px] bg-foreground text-background shadow-plate-lg ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-14 md:py-20">
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                      Стоимость
                    </p>
                    <p className="text-4xl md:text-6xl font-bold text-background leading-none mb-4">
                      {service.price}
                    </p>
                    <p className="text-base md:text-lg text-background/70 max-w-xl">
                      Финальная стоимость зависит от масштаба компании, количества процессов и глубины задачи. Уточняется до старта.
                    </p>
                  </div>
                  <div className="md:col-span-5 flex flex-col gap-3 md:items-end">
                    <Link
                      to="/start"
                      className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 bg-background text-foreground hover:bg-background/90"
                    >
                      <span>Подобрать формат работы</span>
                      <span className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-accent text-accent-foreground group-hover:translate-x-0.5 transition-transform">
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                      </span>
                    </Link>
                    <Link
                      to="/pricing"
                      className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base md:text-lg text-background/80 hover:text-background transition-colors"
                    >
                      Посмотреть цены <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FAQTeaser
            items={[
              { question: "С чего начинается работа?", answer: "Работа начинается с короткого разбора задачи: уточняем цели, ограничения, ожидания и подходящий формат. Дальше согласуем этапы и стартуем." },
              { question: "Можно ли заказать только эту услугу?", answer: "Да. Услуга работает как отдельный формат. При необходимости логично продолжается следующим: стратегия → аудит → внедрение → сопровождение." },
              { question: "Как уточняется стоимость?", answer: "После первого разбора фиксируется объём задачи и итоговая стоимость. Для внедрения, разработки и сопровождения возможна поэтапная оплата." },
              { question: "Что происходит после завершения?", answer: "После завершения можно перейти в сопровождение: развивать инструмент, добавлять сценарии, поддерживать сотрудников и адаптировать систему под новые задачи." },
            ]}
          />

          <Contact />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ServiceDetailPage;