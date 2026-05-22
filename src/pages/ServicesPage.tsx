import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet-async";
import ServicesDetailed from "@/components/ServicesDetailed";
import AdditionalServices from "@/components/AdditionalServices";
import FAQTeaser from "@/components/FAQTeaser";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import {
  Target, Users, Cog, Database, Layers,
  Award, ShieldCheck, Search, ListChecks, Rocket, ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import { Link } from "react-router-dom";

const systemElements = [
  { icon: Target, label: "Смысл задачи", desc: "Что именно нужно изменить и какой результат важен для бизнеса." },
  { icon: Users, label: "Люди", desc: "Кто участвует в процессе, кто принимает решения и кто будет пользоваться инструментом." },
  { icon: Cog, label: "Процессы", desc: "Как задача выполняется сейчас, где есть повторы, ручные действия и лишние согласования." },
  { icon: Database, label: "Данные", desc: "Где хранятся документы, заявки, таблицы, отчёты и насколько они готовы к цифровизации." },
  { icon: Layers, label: "Архитектура", desc: "Какие инструменты уже есть, что можно использовать, что нужно связать между собой и где требуется разработка." },
];

const PillButton = ({
  to,
  children,
  variant = "dark",
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "turquoise";
  className?: string;
}) => {
  const styles = {
    dark: "bg-foreground text-background hover:bg-foreground/90",
    light: "bg-background text-foreground hover:bg-background/90",
    turquoise: "bg-accent text-accent-foreground hover:bg-primary-dark",
  }[variant];
  const iconBg = {
    dark: "bg-accent text-accent-foreground",
    light: "bg-foreground text-background",
    turquoise: "bg-background text-foreground",
  }[variant];
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 ${styles} ${className}`}
    >
      <span>{children}</span>
      <span
        className={`flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full ${iconBg} group-hover:translate-x-0.5 transition-transform`}
      >
        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
      </span>
    </Link>
  );
};

const processSteps = [
  {
    icon: Search,
    title: "Разбираем текущую ситуацию",
    text: "Смотрим процессы, данные, документы, роли, текущие инструменты и ручную нагрузку."
  },
  {
    icon: ListChecks,
    title: "Определяем приоритеты",
    text: "Выбираем задачи, которые дают понятный эффект по времени, деньгам и управляемости."
  },
  {
    icon: Rocket,
    title: "Запускаем выбранный формат",
    text: "Проводим встречу, стратегию, аудит, обучение, внедрение, разработку или сопровождение."
  },
  {
    icon: ClipboardCheck,
    title: "Фиксируем результат",
    text: "Передаём план, рекомендации, инструкции, рабочие сценарии, цифровой инструмент или отчёт по сопровождению."
  }
];

const ServicesPage = () => {
  return <PageTransition>
      <Helmet>
        <title>Услуги по цифровому развитию бизнеса — Александра Моисеева, НейроРешения</title>
        <meta name="description" content="Стратегическая встреча, стратегия цифрового развития, глубокий аудит, обучение, внедрение, разработка и сопровождение цифровых инструментов для бизнеса." />
        <meta name="keywords" content="цифровое развитие бизнеса, стратегия цифровизации, аудит цифровизации, внедрение цифровых инструментов, сопровождение, НейроРешения" />
        <link rel="canonical" href="https://aleksamois.ru/services" />
        <meta property="og:title" content="Услуги по цифровому развитию бизнеса — Александра Моисеева, НейроРешения" />
        <meta property="og:description" content="Стратегическая встреча, стратегия цифрового развития, глубокий аудит, обучение, внедрение, разработка и сопровождение цифровых инструментов для бизнеса." />
        <meta property="og:url" content="https://aleksamois.ru/services" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.services())}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <PageBreadcrumbs currentPage="Услуги" />

        <main>
          {/* HERO — большая песочная плашка (отличается от голубой главной и розовой /start) */}
          <section className="pt-8 md:pt-12 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="relative rounded-[32px] md:rounded-[40px] bg-surface-sand overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
                <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 py-12 md:py-20">
                  <div className="md:col-span-7">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6">
                      Услуги · НейроРешения
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-foreground mb-6">
                      Услуги по{" "}
                      <span className="font-iriska font-normal italic text-accent">
                        цифровому развитию
                      </span>{" "}
                      бизнеса
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/80 mb-5 max-w-2xl leading-snug">
                      Стратегия, аудит, обучение, внедрение, разработка и сопровождение цифровых инструментов для компаний, которые хотят снизить ручную нагрузку, сохранить бюджет и усилить управляемость.
                    </p>
                    <p className="text-base md:text-lg text-foreground/70 mb-5 max-w-2xl leading-relaxed">
                      Я помогаю собственникам и руководителям понять, какие процессы стоит перевести в цифровой формат первыми, где компания теряет время и деньги, какие инструменты действительно нужны и как внедрять их поэтапно.
                    </p>
                    <p className="text-base md:text-lg text-foreground/70 mb-10 max-w-2xl leading-relaxed">
                      Работаю с конкретными задачами бизнеса: ручной ввод и проверка данных, документы, заявки, отчёты, согласования, внутренние базы знаний, рабочие процессы, контроль исполнения и поддержка сотрудников.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <PillButton to="/start" variant="dark">
                        Подобрать формат работы
                      </PillButton>
                      <Link
                        to="/pricing"
                        className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base md:text-lg text-foreground/80 hover:text-foreground transition-colors"
                      >
                        Посмотреть цены <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                  <div className="md:col-span-5 flex justify-center md:justify-end">
                    <div className="w-full max-w-sm flex flex-col items-center gap-3 text-center">
                      {/* Уровень 1: Система */}
                      <div className="px-6 py-3 rounded-2xl bg-accent text-foreground font-bold text-base md:text-lg shadow-card ring-1 ring-foreground/10 uppercase tracking-widest">
                        Система
                      </div>
                      <div className="w-px h-5 bg-foreground/20" aria-hidden="true" />
                      {/* Уровень 2: Компания */}
                      <div className="px-5 py-2.5 rounded-xl bg-background text-foreground font-semibold shadow-card ring-1 ring-foreground/10">
                        Компания
                      </div>
                      <div className="w-px h-5 bg-foreground/20" aria-hidden="true" />
                      {/* Уровень 3: Люди / Процессы / Данные */}
                      <div className="flex gap-2 flex-wrap justify-center">
                        {["Люди", "Процессы", "Данные"].map((t) => (
                          <div
                            key={t}
                            className="px-3.5 py-2 rounded-lg bg-background/80 text-foreground text-sm font-medium ring-1 ring-foreground/10 shadow-sm"
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                      <div className="w-px h-5 bg-foreground/20" aria-hidden="true" />
                      {/* Уровень 4: Форматы работы */}
                      <div className="grid grid-cols-2 gap-2 w-full">
                        {["Стратегия", "Аудит", "Внедрение", "Сопровождение"].map((t) => (
                          <div
                            key={t}
                            className="px-3 py-2 rounded-lg bg-foreground/5 text-foreground text-sm font-medium ring-1 ring-foreground/10"
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* СИСТЕМА КАК ЦЕЛОЕ — горизонтальные цветные пиллы */}
          <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-4">
                Смотрю на компанию{" "}
                <span className="font-iriska font-normal italic text-accent">как на систему</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-4">
                Цифровое развитие начинается не с выбора сервиса. Сначала нужно понять, как работает компания: кто участвует в процессе, где повторяются действия, какие данные используются, где теряется время и что мешает руководителю видеть полную картину.
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                В каждом проекте держу в фокусе пять опор:
              </p>
            </div>
            {/* Иерархическая схема: 3 входа → СИСТЕМА → 2 выхода */}
            <div>
              {/* Уровень 1: три опоры на входе */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {[0, 1, 2].map((i) => {
                  const el = systemElements[i];
                  const Icon = el.icon;
                  const palettes = ["bg-surface-mint", "bg-surface-lavender", "bg-surface-blush"];
                  return (
                    <div
                      key={el.label}
                      className={`${palettes[i]} rounded-[20px] p-5 md:p-6 ring-1 ring-foreground/5 shadow-sm flex flex-col gap-3`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="font-semibold text-foreground text-base md:text-lg leading-tight">
                          {el.label}
                        </p>
                      </div>
                      <p className="text-sm text-foreground/70 leading-snug">{el.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Соединитель сверху → центр */}
              <div className="flex justify-center" aria-hidden="true">
                <div className="w-px h-8 md:h-10 bg-foreground/20" />
              </div>

              {/* Уровень 2: СИСТЕМА — ядро */}
              <div className="flex justify-center">
                <div className="w-full md:w-3/4 lg:w-2/3 rounded-[24px] bg-accent text-foreground p-6 md:p-8 shadow-plate ring-1 ring-foreground/10 text-center">
                  <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-foreground/75 font-semibold mb-2">
                    Система
                  </p>
                  <p className="font-iriska italic text-2xl md:text-3xl leading-tight text-foreground">
                    компания как единое рабочее пространство
                  </p>
                </div>
              </div>

              {/* Соединитель центр → низ */}
              <div className="flex justify-center" aria-hidden="true">
                <div className="w-px h-8 md:h-10 bg-foreground/20" />
              </div>

              {/* Уровень 3: два опорных слоя на выходе */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:px-[8.5%]">
                {[3, 4].map((i, idx) => {
                  const el = systemElements[i];
                  const Icon = el.icon;
                  const palettes = ["bg-card", "bg-surface-sand"];
                  return (
                    <div
                      key={el.label}
                      className={`${palettes[idx]} rounded-[20px] p-5 md:p-6 ring-1 ring-foreground/5 shadow-sm flex flex-col gap-3`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="font-semibold text-foreground text-base md:text-lg leading-tight">
                          {el.label}
                        </p>
                      </div>
                      <p className="text-sm text-foreground/70 leading-snug">{el.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Итог */}
            <p className="mt-6 text-base md:text-lg text-foreground/80">
              <span className="font-semibold text-foreground">Итог:</span>{" "}
              решение подбирается не ради технологии, а под реальную работу компании.
            </p>

            {/* Профессиональная основа */}
            <div className="mt-10 rounded-[24px] bg-card p-6 md:p-8 ring-1 ring-foreground/5 shadow-card">
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">
                Профессиональная основа
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
                Дипломированный специалист по искусственному интеллекту
              </h3>
              <p className="text-base text-muted-foreground mb-5 max-w-3xl">
                Квалификация KAEO, уровень 5. Практический опыт внедрения цифровых решений в бизнес-процессы, обучение команд, проектирование цифровых инструментов и сопровождение внедрений.
              </p>
              <div className="flex items-center gap-5 flex-wrap">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">Дипломированный специалист по ИИ</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">KAEO уровень 5</span>
                </div>
                <Link
                  to="/about#qualifications"
                  className="text-accent hover:text-accent/80 hover:underline text-sm font-medium transition-colors inline-flex items-center gap-1"
                >
                  Смотреть сертификаты <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          <ServicesDetailed />
          <AdditionalServices />

          {/* КАК ПРОХОДИТ РАБОТА — тёмная плашка с шагами */}
          <section className="px-4 md:px-6 py-16 md:py-24">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[32px] md:rounded-[40px] bg-foreground text-background overflow-hidden shadow-plate-lg ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-14 md:py-20">
                <div className="max-w-3xl mb-12">
                  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-5">
                    Процесс
                  </p>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-background leading-[1.05] mb-4">
                    <span className="text-background">Как</span>{" "}
                    <span className="font-iriska font-normal italic text-accent">проходит работа</span>
                  </h2>
                  <p className="text-base md:text-lg text-background/70 max-w-2xl">
                    Любой выбранный формат проходит через четыре понятных шага.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {processSteps.map((step, index) => {
                    return (
                      <div
                        key={index}
                        className="relative rounded-[24px] bg-background/5 ring-1 ring-background/10 p-6 md:p-7 hover:bg-background/10 transition-colors duration-300"
                      >
                        <div className="mb-5">
                          <span className="font-iriska italic text-5xl md:text-6xl text-accent leading-none">
                            0{index + 1}
                          </span>
                        </div>
                        <h3 className="font-bold text-background text-lg md:text-xl mb-2 leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-sm md:text-base text-background/70 leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <FAQTeaser
            items={[
              { question: "С чего начинается работа?", answer: "Работа начинается с выбора подходящего формата. Если задача пока сформулирована не до конца, лучше начать со стратегической встречи или страницы выбора формата." },
              { question: "Можно заказать одну услугу?", answer: "Да. Каждый формат можно заказать отдельно. При этом часть услуг логично продолжают друг друга: стратегия может перейти в аудит, аудит — во внедрение, внедрение — в сопровождение." },
              { question: "Сколько длится внедрение?", answer: "Срок зависит от задачи, масштаба компании и готовности процессов. Небольшие внедрения могут занимать несколько недель, более сложные проекты требуют поэтапной работы." },
              { question: "Что входит в сопровождение?", answer: "В сопровождение входит поддержка внедрённых инструментов, донастройка сценариев, разбор обращений, обновление инструкций, помощь сотрудникам и рекомендации по дальнейшему развитию системы." },
            ]}
          />

          {/* ФИНАЛЬНЫЙ CTA — бирюзовая плашка */}
          <section className="px-4 md:px-6 pb-16 md:pb-24">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[32px] md:rounded-[40px] bg-accent text-foreground overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-14 md:py-20 text-center">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] mb-5">
                  Начните с{" "}
                  <span className="font-iriska font-normal italic text-foreground">подходящего формата</span>
                </h2>
                <p className="text-base md:text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
                  Выберите услугу на этой странице или перейдите на страницу выбора формата, чтобы понять, какой вариант подходит компании сейчас.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <PillButton to="/start" variant="light">
                    Подобрать формат работы
                  </PillButton>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base md:text-lg text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Посмотреть цены <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <Contact />
          <Partners />
        </main>

        <Footer />
      </div>
    </PageTransition>;
};
export default ServicesPage;