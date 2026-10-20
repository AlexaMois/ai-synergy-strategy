import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { getServiceBySlug } from "@/data/services";
import { journeyForService, serviceAcceptance } from "@/data/serviceJourneys";
import { setContactIntent } from "@/lib/contactIntent";

const seo: Record<string,{title:string;h1:string;description:string}> = {
  "owner-digital-session": { title:"Стратегическая встреча для собственника за 17 000 ₽",h1:"Выберите первый приоритет за одну стратегическую встречу",description:"Личный разбор текущей ситуации с Александрой. Главное ограничение, первый шаг, ответственность и письменные выводы на одной странице. 17 000 ₽." },
  "digital-development-strategy": { title:"Стратегия цифрового развития бизнеса на 90 дней",h1:"План цифровых изменений на 90 дней",description:"Анализ нескольких процессов, интервью и порядок действий на 90 дней. Стратегия цифрового развития бизнеса за 78 000 ₽." },
  "digital-audit": { title:"Глубокий аудит процессов перед цифровизацией",h1:"Аудит процессов и данных перед внедрением",description:"Карта процессов, потери ручной работы, данные, риски, бюджетные ориентиры и дорожная карта. Аудит от 116 000 ₽." },
  "digital-solution-design": { title:"Проектирование и разработка цифрового решения",h1:"Рабочее цифровое решение для одной задачи бизнеса",description:"Проектирование, интеграции, тестирование, запуск и передача решения. Разработка под процесс от 260 000 ₽." },
  "implementation-support": { title:"Управление и сопровождение цифрового внедрения",h1:"Доведём цифровое внедрение до рабочего результата",description:"Ответственные, этапы, подрядчики, сроки, приёмка и обучение сотрудников. Сопровождение внедрения 89 000–170 000 ₽ в месяц." },
  "digital-tools-support": { title:"Эксплуатация и сопровождение цифровых инструментов",h1:"Работающая система под контролем",description:"Мониторинг обращений, исправления, инструкции и развитие внедрённых решений. Сопровождение 35 000–89 000 ₽ в месяц." },
  "digital-tools-program": { title:"Обучение команды цифровым инструментам и ИИ",h1:"Обучаем команду на реальных рабочих задачах",description:"Практическая корпоративная программа: документы, таблицы, тексты, источники, правила использования ИИ. 68 000–152 000 ₽." },
};
const fixed = (price:string)=> !/(от|–|-|\/мес)/.test(price);

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  if (!service) return <Navigate to="/services" replace />;

  const journey = journeyForService(service.slug);
  const detail = serviceAcceptance[service.slug];
  const meta = seo[service.slug];
  const includes = service.sections.find(item=>item.heading==="Что входит");
  const forWhom = service.sections.find(item=>item.heading==="Подходит, если");
  const url = "https://aleksamois.ru" + service.href + "/";
  const openInquiry = () => setContactIntent({
    kind: service.slug === "owner-digital-session" ? "meeting" : "implementation",
    process: "Услуга: " + service.title + ". Маршрут: " + journey.title + ". Источник: " + service.href,
  });

  return (
    <PageTransition>
      <Helmet>
        <title>{meta.title} | НейроРешения</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <PageBreadcrumbs currentPage={service.shortTitle} parentPages={[{label:"Услуги",href:"/services"},{label:journey.title,href:journey.href}]} />
        <main>
          <section className="px-4 pt-8 md:px-6 md:pt-12">
            <div className="container mx-auto max-w-7xl">
              <div className="grid items-center gap-5 overflow-hidden rounded-[30px] bg-surface-sand p-7 shadow-plate md:grid-cols-12 md:rounded-[40px] md:p-12">
                <div className="min-w-0 md:col-span-8">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-dark">{journey.eyebrow} · Формат работы</p>
                  <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">{meta.h1}</h1>
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/75 md:text-lg">{service.subtitle}</p>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Link to="/start" onClick={openInquiry} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-6 font-semibold text-background hover:bg-foreground/85">
                      {detail.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to={journey.href} className="inline-flex min-h-12 items-center gap-2 font-medium text-primary-dark hover:underline">
                      <ArrowLeft className="h-4 w-4" /> Весь маршрут
                    </Link>
                  </div>
                </div>
                <div className="flex justify-center md:col-span-4 md:justify-end">
                  <img src={service.sketch} alt="" width={480} height={480} className="h-auto w-44 object-contain md:w-64" loading="lazy"/>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">Конкретная задача</p>
                <h2 className="text-3xl font-bold text-foreground">Зачем нужен этот этап</h2>
              </div>
              <div className="grid gap-4 md:col-span-8">
                <div className="rounded-[24px] bg-card p-6 shadow-card">
                  <h3 className="text-lg font-bold text-foreground">Рабочий результат</h3>
                  <p className="mt-3 text-base leading-relaxed text-foreground/75">{detail.task}</p>
                </div>
                <div className="rounded-[24px] bg-surface-mint p-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-foreground"><CheckCircle2 className="h-5 w-5 text-primary-dark"/> Как подтверждаем выполнение</h3>
                  <p className="mt-3 text-base leading-relaxed text-foreground/75">{detail.proof}</p>
                </div>
              </div>
            </div>
          </section>

          {forWhom?.list && (
            <section className="container mx-auto max-w-7xl px-4 pb-14 md:pb-20">
              <div className="grid gap-8 md:grid-cols-12">
                <h2 className="text-2xl font-bold text-foreground md:col-span-4 md:text-3xl">Когда этот формат подходит</h2>
                <ul className="grid gap-3 md:col-span-8">
                  {forWhom.list.map((item,i)=>(
                    <li key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-base leading-relaxed text-foreground/80">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" aria-hidden="true"/><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {includes?.list && (
            <section className="bg-foreground py-14 text-background md:py-20">
              <div className="container mx-auto max-w-7xl px-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Состав работ</p>
                <h2 className="mb-8 text-3xl font-bold text-background md:text-4xl">Что входит в формат</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {includes.list.map((item,i)=>(
                    <div key={i} className="rounded-[20px] border border-background/20 bg-background/5 p-5">
                      <span className="text-sm font-bold text-accent">{String(i+1).padStart(2,"0")}</span>
                      <p className="mt-3 leading-relaxed text-background/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-border p-6 md:p-8">
                <ShieldCheck className="mb-4 h-7 w-7 text-primary-dark" aria-hidden="true"/>
                <h2 className="text-xl font-bold text-foreground">Люди и ответственность</h2>
                <p className="mt-3 leading-relaxed text-foreground/75">{detail.people}</p>
              </div>
              <div className="rounded-[24px] border border-border p-6 md:p-8">
                <ArrowRight className="mb-4 h-7 w-7 text-primary-dark" aria-hidden="true"/>
                <h2 className="text-xl font-bold text-foreground">Следующий шаг</h2>
                <p className="mt-3 leading-relaxed text-foreground/75">{detail.next}</p>
              </div>
            </div>
          </section>

          <section className="container mx-auto max-w-7xl px-4 pb-10">
            <div className="flex flex-col gap-6 rounded-[30px] bg-foreground p-7 text-background md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-2xl">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">Стоимость формата</p>
                <p className="text-3xl font-bold md:text-4xl">{service.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-background/75">
                  {fixed(service.price) ? "Фиксированная цена. Состав и результат услуги согласуются до начала." : "Объём, этапы, срок и окончательная стоимость согласуются по задаче."}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3">
                <Link to="/start" onClick={openInquiry} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-foreground">
                  {detail.cta} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/pricing" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-background/85 hover:text-background">
                  Все цены <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};
export default ServiceDetailPage;
