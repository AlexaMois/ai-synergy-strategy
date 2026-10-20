import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import { serviceJourneys } from "@/data/serviceJourneys";
import { services } from "@/data/services";

const phases = [
  ["01", "Фиксируем операцию", "Что запускает работу, где она заканчивается, кто отвечает и сколько раз повторяется."],
  ["02", "Считаем потери", "Время, ручные касания, ошибки, текущая стоимость, доступность данных."],
  ["03", "Меняем рабочий порядок", "Правила, роли, интеграции, контроль исключений и тестирование."],
  ["04", "Подтверждаем результат", "Сравниваем показатели, передаём инструкции и закрепляем ответственность."],
];
const groups = [
  { title: "Выбрать приоритет", slugs: ["owner-digital-session", "digital-development-strategy"] },
  { title: "Спроектировать и внедрить", slugs: ["digital-audit", "digital-solution-design", "implementation-support"] },
  { title: "Закрепить работу системы", slugs: ["digital-tools-support"] },
  { title: "Развить навыки команды", slugs: ["digital-tools-program"] },
];

const ServicesPage = () => (
  <PageTransition>
    <Helmet>
      <title>Решения задач бизнеса: автоматизация, стратегия, обучение и закупки | НейроРешения</title>
      <meta name="description" content="Четыре маршрута: автоматизация ручных операций, стратегические решения собственника, обучение команды и отбор закупок. Действующие форматы, цены и кейсы." />
      <link rel="canonical" href="https://aleksamois.ru/services/" />
      <meta property="og:title" content="Решения задач бизнеса | НейроРешения" />
      <meta property="og:description" content="От рабочей задачи к измеримому результату. Четыре понятных маршрута." />
      <meta property="og:url" content="https://aleksamois.ru/services/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <PageBreadcrumbs currentPage="Услуги" />
      <main>
        <section className="px-4 pt-8 md:px-6 md:pt-12">
          <div className="container mx-auto max-w-7xl">
            <div className="rounded-[30px] bg-surface-sand px-6 py-10 shadow-plate ring-1 ring-foreground/5 md:rounded-[40px] md:px-12 md:py-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-dark">Решения · НейроРешения</p>
              <h1 className="max-w-4xl text-3xl font-bold leading-[1.06] tracking-tight text-foreground md:text-5xl">
                Начинаем с рабочей задачи. <span className="text-primary-dark">Доводим до измеримого результата.</span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/75 md:text-xl">
                Убираем лишние ручные действия, связываем существующие программы, выбираем приоритет изменений и помогаем команде освоить рабочие инструменты. Сначала выберите свою ситуацию, затем определим формат работы.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#routes" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-foreground px-6 font-semibold text-background hover:bg-foreground/85">
                  Найти свою задачу <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/cases" className="inline-flex min-h-12 items-center gap-2 px-3 font-semibold text-foreground hover:text-primary-dark">
                  Посмотреть кейсы <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="routes" className="container mx-auto max-w-7xl scroll-mt-24 px-4 py-14 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">С какой задачей пришли?</p>
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Четыре маршрута для бизнеса</h2>
          <p className="mb-9 max-w-3xl text-base text-foreground/70 md:text-lg">Каждый маршрут ведёт к понятному результату и следующему шагу. Архитектура и разработка используются там, где они нужны процессу.</p>
          <div className="grid gap-5 md:grid-cols-2">
            {serviceJourneys.map((journey, index) => {
              const Icon = journey.icon;
              const dark = index === 0;
              return (
                <article key={journey.id} className={["flex min-w-0 flex-col rounded-[28px] p-6 shadow-card ring-1 ring-foreground/5 md:p-8", dark ? "bg-foreground text-background" : index===3 ? "bg-surface-mint text-foreground" : "bg-card text-foreground"].join(" ")}>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className={["text-xs font-semibold uppercase tracking-widest", dark ? "text-accent" : "text-primary-dark"].join(" ")}>{journey.eyebrow}</span>
                    <Icon className={["h-7 w-7",dark ? "text-accent" : "text-primary-dark"].join(" ")} aria-hidden="true" />
                  </div>
                  <h3 className={["max-w-lg text-2xl font-bold leading-tight md:text-3xl", dark ? "text-background" : "text-foreground"].join(" ")}>{journey.title}</h3>
                  <p className={["mt-4 text-base leading-relaxed",dark ? "text-background/85" : "text-foreground/80"].join(" ")}>{journey.situation}</p>
                  <div className={["my-6 border-t pt-5",dark ? "border-background/25" : "border-foreground/10"].join(" ")}>
                    <p className={["mb-2 text-xs font-semibold uppercase tracking-wider",dark ? "text-accent" : "text-primary-dark"].join(" ")}>Что меняется</p>
                    <p className={["text-base leading-relaxed", dark ? "text-background/90" : "text-foreground/80"].join(" ")}>{journey.whatChanges}</p>
                  </div>
                  <Link to={journey.href} className={["inline-flex min-h-12 self-start items-center gap-3 rounded-full px-5 text-sm font-semibold md:text-base",dark ? "bg-accent text-foreground hover:bg-accent/85" : "bg-foreground text-background hover:bg-foreground/85"].join(" ")}>
                    {journey.action} <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-foreground py-14 text-background md:py-20">
          <div className="container mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Наш принцип</p>
              <h2 className="text-3xl font-bold leading-tight text-background md:text-4xl">Сначала процесс. Затем технология.</h2>
              <p className="mt-4 leading-relaxed text-background/75">Результат проверяется на фактических данных, а ответственность закрепляется за людьми.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
              {phases.map(([number,title,detail])=>(
                <div key={number} className="rounded-2xl border border-background/20 bg-background/5 p-5">
                  <span className="text-sm font-bold text-accent">{number}</span>
                  <h3 className="mt-3 text-lg font-bold text-background">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-background/85">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">Как организована работа</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Как устроена работа</h2>
          <p className="mb-8 mt-3 max-w-3xl text-base text-foreground/70">Для каждой задачи выбираем глубину разбора, проектирование, обучение и сопровождение. Состав и стоимость каждого этапа указаны отдельно.</p>
          <div className="grid items-start gap-5 md:grid-cols-2">
            {groups.map((group)=>(
              <div key={group.title} className="rounded-[24px] border border-border bg-card p-5 md:p-7">
                <h3 className="mb-4 text-xl font-bold text-foreground">{group.title}</h3>
                <div className="divide-y divide-border/80">
                  {group.slugs.map(slug=>{
                    const service=services.find(item=>item.slug===slug);
                    if(!service)return null;
                    return (
                      <Link key={slug} to={service.href} className="group flex items-center justify-between gap-3 py-3.5">
                        <div className="min-w-0">
                          <p className="text-base font-semibold leading-snug text-foreground group-hover:text-primary-dark">{service.shortTitle}</p>
                          <p className="mt-1 text-sm font-medium text-foreground/75">{service.price}</p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-primary-dark" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  </PageTransition>
);
export default ServicesPage;
