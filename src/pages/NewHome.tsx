import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, ChevronRight, Quote, Phone } from "lucide-react";
import { openTaskModal } from "@/components/CallbackModal";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import TrustMarquee from "@/components/TrustMarquee";
import MarqueeText from "@/components/MarqueeText";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import AnimatedNumber from "@/components/AnimatedNumber";
import IndustryQuestions from "@/components/home/IndustryQuestions";
import heroCharacter from "@/assets/alexandra-hero.webp";
import iconPeople from "@/assets/how-we-work/icon-people.png";
import iconProcess from "@/assets/how-we-work/icon-process.png";
import iconBusiness from "@/assets/how-we-work/icon-business.png";
import iconTech from "@/assets/how-we-work/icon-tech.png";

const workSteps = [
  { icon: iconPeople, name: "Человек", desc: "Анализируем опыт и задачи людей" },
  { icon: iconProcess, name: "Процессы", desc: "Выстраиваем понятные и эффективные процессы" },
  { icon: iconBusiness, name: "Бизнес", desc: "Смотрим на цели и точки роста" },
  { icon: iconTech, name: "Технологии", desc: "Подбираем и внедряем цифровые инструменты" },
];

const stats: Array<{
  value: number;
  suffix: string;
  label: string;
  sub?: string;
  decimals?: number;
}> = [
  { value: 360, suffix: "", label: "разборов бизнес-процессов" },
  { value: 40, suffix: "", label: "внедрённых проектов", sub: "решения, которые дошли до рабочего применения" },
  { value: 7, suffix: "", label: "городов", sub: "работаю онлайн по России" },
  { value: 10, suffix: "", label: "отраслей" },
  { value: 4, suffix: "+", label: "года практики в ИИ", sub: "прикладные проекты в бизнесе" },
  { value: 80, suffix: "%", label: "клиентов приходят по рекомендации" },
  { value: 85, suffix: "%", label: "клиентов возвращаются" },
  { value: 3, suffix: "", label: "месяца — средняя окупаемость решений" },
];

/**
 * Pill-кнопка в стиле Точки: круглая, с иконкой-стрелкой в круге справа.
 */
const PillButton = ({
  to,
  children,
  variant = "dark",
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "turquoise" | "ghost-light";
  className?: string;
}) => {
  const styles = {
    dark: "bg-foreground text-background hover:bg-foreground/90",
    light: "bg-background text-foreground hover:bg-background/90",
    turquoise: "bg-accent text-accent-foreground hover:bg-primary-dark",
    "ghost-light": "bg-transparent text-background border border-background/40 hover:bg-background/10",
  }[variant];
  const iconBg = {
    dark: "bg-accent text-accent-foreground",
    light: "bg-foreground text-background",
    turquoise: "bg-background text-foreground",
    "ghost-light": "bg-background text-foreground",
  }[variant];
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2.5 sm:gap-3 pl-4 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 ${styles} ${className}`}
    >
      <span>{children}</span>
      <span
        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full ${iconBg} group-hover:translate-x-0.5 transition-transform`}
      >
        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
      </span>
    </Link>
  );
};

const NewHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Цифровизация и автоматизация бизнеса — Александра Моисеева</title>
        <meta
          name="description"
          content="Помогаю собственникам находить ручные процессы, снижать нагрузку на команду и внедрять ИИ там, где он даёт понятную пользу бизнесу."
        />
        <link rel="canonical" href="https://aleksamois.ru/" />
        <meta property="og:title" content="Цифровизация и автоматизация бизнеса — Александра Моисеева" />
        <meta property="og:description" content="Помогаю собственникам находить ручные процессы, снижать нагрузку на команду и внедрять ИИ там, где он даёт понятную пользу бизнесу." />
        <meta property="og:url" content="https://aleksamois.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <main>
        {/* HERO — большая бирюзовая плашка во всю ширину */}
        <section className="pt-20 md:pt-28 px-3 sm:px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="relative rounded-[28px] md:rounded-[40px] bg-accent overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
              <div className="grid md:grid-cols-12 gap-4 md:gap-6 items-center px-5 sm:px-6 md:px-12 lg:px-16 pt-8 sm:pt-10 md:pt-20 pb-0 md:pb-0">
                <div className="md:col-span-7 pb-6 sm:pb-8 md:pb-20">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] md:leading-[1.02] tracking-tight text-background mb-4 md:mb-6">
                    Александра <span className="font-iriska font-normal italic text-background/95">Моисеева</span>
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-background/90 mb-4 md:mb-8 max-w-2xl leading-snug">
                    Независимый инженер-архитектор цифрового развития бизнеса
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-background/80 mb-6 md:mb-10 max-w-xl">
                    Помогаю собственникам находить ручные процессы, снижать нагрузку на команду и внедрять цифровые решения с понятной пользой для бизнеса
                  </p>
                  <div className="relative z-10 flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-3 items-stretch sm:items-start">
                    <PillButton to="/start" variant="light">
                      Подобрать формат работы
                    </PillButton>
                    <PillButton to="/services" variant="ghost-light">
                      Посмотреть услуги
                    </PillButton>
                  </div>
                </div>
                <div className="md:col-span-5 relative flex justify-center md:justify-end items-end self-end pointer-events-none">
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-6 rounded-[50%] bg-black/30 blur-xl" aria-hidden="true" />
                  <img
                    src={heroCharacter}
                    alt="Александра Моисеева"
                    width={900}
                    height={900}
                    fetchPriority="high"
                    decoding="async"
                    className="relative w-3/4 max-w-[260px] sm:max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain [filter:drop-shadow(0_25px_25px_rgba(0,0,0,0.25))_drop-shadow(0_10px_10px_rgba(0,0,0,0.15))]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 md:mt-20">
          <TrustMarquee />
        </div>

        {/* ЦИФРЫ — асимметрия, гигантская акцентная цифра курсивом */}
        <section className="bg-background py-16 md:py-24 mt-4">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
              <div className="md:col-span-5">
                <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                  Компания в цифрах
                </p>
                <div className="font-iriska font-bold text-accent leading-none mb-4 text-[7rem] md:text-[12rem]">
                  <AnimatedNumber value={360} suffix="" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
                  разборов бизнес-процессов
                </p>
                <p className="text-sm md:text-base text-muted-foreground max-w-md">
                  Разборы процессов, задач и точек потерь — за 4+ года практики в ИИ.
                </p>
              </div>
              <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden shadow-card">
                {stats.slice(1).map(({ value, suffix, label, decimals, sub }) => (
                  <div key={label} className="bg-card p-3.5 md:p-6 flex items-center gap-3.5 md:gap-5">
                    <div className="font-iriska font-bold text-accent leading-[0.85] shrink-0 text-4xl md:text-6xl">
                      <AnimatedNumber value={value} suffix={suffix} decimals={decimals ?? 0} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm md:text-sm font-semibold text-foreground leading-tight">{label}</p>
                      {sub && (
                        <p className="mt-1 text-xs md:text-xs text-muted-foreground/80 leading-snug">
                          {sub}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="bg-accent text-white p-5 md:p-7 flex flex-col justify-center">
                  <div className="font-iriska text-2xl md:text-4xl leading-tight mb-2">
                    Клиенты возвращаются за следующим этапом
                  </div>
                  <p className="text-xs md:text-sm text-white/85 leading-snug">
                    Большинство клиентов продолжают работу после первого проекта: стратегия,
                    внедрение, сопровождение, новые цифровые инструменты.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* УЗНАЁТЕ СВОЙ БИЗНЕС? — интерактивные отраслевые вопросы */}
        <IndustryQuestions />

        {/* С ЧЕГО НАЧАТЬ — два варианта: встреча и стратегия */}
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
              Не знаете{" "}
              <span className="font-iriska font-normal italic text-accent">с чего начать</span>?
            </h2>
            <p className="text-base md:text-lg text-foreground/80">
              Если задача уже понятна — сразу обсудим её решение. Если пока нет —
              поможем разобраться, что менять в первую очередь и как не потратить
              деньги на ненужные инструменты.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                step: "Одна задача",
                title: "Разобраться в проблеме и определить первый шаг",
                text: "За одну встречу разберём вашу ситуацию, найдём главное препятствие и определим, с чего начать.",
                price: 17000,
                result: "Результат: понятный первый шаг и варианты решения.",
                to: "/services/owner-digital-session",
                showSketch: null,
                bg: "bg-surface-mint",
                textColor: "text-foreground",
                muted: "text-foreground/85",
                btnVariant: "dark" as const,
                chip: "bg-background text-primary-dark",
                dots: "bg-[radial-gradient(hsl(var(--border))_1.5px,transparent_1.5px)]",
                check: "text-accent",
              },
              {
                step: "Несколько задач",
                title: "Составить план цифрового развития компании",
                text: "Разберём ключевые процессы, определим приоритеты и составим план изменений на 90 дней.",
                price: 78000,
                result: "Результат: план действий с приоритетами.",
                to: "/services/digital-development-strategy",
                showSketch: null,
                bg: "bg-primary-dark",
                textColor: "text-background",
                muted: "text-background",
                btnVariant: "light" as const,
                chip: "bg-background text-primary-dark",
                dots: "bg-[radial-gradient(hsl(var(--background)/0.35)_1.5px,transparent_1.5px)]",
                check: "text-background",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`relative flex flex-col rounded-[28px] ${card.bg} p-7 md:p-9 min-h-[380px] overflow-hidden shadow-card hover:shadow-plate hover:-translate-y-1 transition-all duration-300 ring-1 ring-foreground/5`}
              >
                {card.showSketch && (
                  <img
                    src={card.showSketch}
                    alt=""
                    width={800}
                    height={800}
                    loading="lazy"
                    className="absolute -bottom-4 -right-4 w-40 h-40 object-contain opacity-90 pointer-events-none"
                  />
                )}
                <div aria-hidden className={`absolute top-0 right-0 w-44 h-44 opacity-70 pointer-events-none ${card.dots} [background-size:14px_14px] [mask-image:radial-gradient(circle_at_top_right,black,transparent_72%)]`} />
                <span className={`relative inline-flex items-center self-start px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest ${card.chip} mb-4`}>
                  {card.step}
                </span>
                <h3 className={`text-xl md:text-2xl font-bold ${card.textColor} mb-3 leading-tight relative`}>
                  {card.title}
                </h3>
                <p className={`text-sm md:text-base ${card.muted} leading-relaxed mb-6 relative max-w-[85%]`}>
                  {card.text}
                </p>
                <div className="mt-auto space-y-4 relative">
                  <div className="flex items-end gap-3">
                    <span className={`font-iriska font-bold text-3xl md:text-4xl leading-none ${card.textColor}`}>
                      <AnimatedNumber value={card.price} suffix=" ₽" />
                    </span>
                  </div>
                  <p className={`flex items-start gap-2 text-sm ${card.muted} max-w-[85%]`}>
                    <BadgeCheck className={`h-4 w-4 shrink-0 ${card.check} mt-0.5`} />
                    {card.result}
                  </p>
                  <PillButton to={card.to} variant={card.btnVariant} className="text-sm">
                    Подробнее
                  </PillButton>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="inline-flex items-center text-accent hover:underline font-semibold text-lg">
              Все форматы работы <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        <MarqueeText />

        {/* КАК МЫ РАБОТАЕМ — тёмная плашка: текст слева, светящаяся цепочка иконок справа */}
        <section className="px-4 md:px-6 py-10 md:py-14">
          <div className="container mx-auto max-w-7xl">
            <div className="relative rounded-[32px] md:rounded-[40px] bg-dark-bg overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
              {/* мягкое бирюзовое свечение фона */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 right-[6%] h-72 w-72 rounded-full bg-accent/15 blur-[110px]" />
                <div className="absolute -bottom-28 right-[38%] h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
              </div>
              <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-8 px-6 md:px-12 lg:px-14 py-12 md:py-16">
                <div className="max-w-xl">
                  <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-5">Как мы работаем</p>
                  <h2 className="text-3xl md:text-[34px] font-bold text-background leading-[1.15] mb-6">
                    <span className="whitespace-nowrap">Человек → Процессы →</span>
                    <br className="hidden md:block" />{" "}
                    <span className="whitespace-nowrap">Бизнес → <span className="text-accent">Технологии</span></span>
                  </h2>
                  <p className="text-base md:text-lg text-background/80 leading-relaxed">
                    Разбираем работу людей и процессы, подбираем и внедряем цифровые инструменты —
                    так, чтобы они работали в привычной среде компании и снижали ручную нагрузку.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-9">
                  {workSteps.map((step, i) => (
                    <div key={step.name} className="relative flex flex-col items-center text-center">
                      {i < workSteps.length - 1 && (
                        <div aria-hidden className="absolute left-full top-[54px] -translate-x-1/2 hidden lg:flex items-center">
                          <span className="h-px w-4 bg-gradient-to-r from-accent/10 via-accent/60 to-accent shadow-[0_0_12px_hsl(var(--accent)/0.8)]" />
                          <ChevronRight className="h-5 w-5 text-accent drop-shadow-[0_0_8px_hsl(var(--accent)/0.9)]" strokeWidth={2.5} />
                        </div>
                      )}
                      <div className="relative">
                        <div aria-hidden className="absolute inset-2 rounded-full bg-accent/25 blur-2xl" />
                        <img src={step.icon} alt={step.name} width={816} height={816} loading="lazy" className="relative h-24 w-24 sm:h-28 sm:w-28 lg:h-28 lg:w-28 object-contain" />
                      </div>
                      <p className="mt-4 text-base sm:text-lg font-semibold text-background">{step.name}</p>
                      <p className="mt-1.5 max-w-[14rem] text-[13px] sm:text-sm leading-snug text-background/75">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* РЕЗУЛЬТАТЫ — bento на сером, заголовок с курсивом */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
                Результаты{" "}
                <span className="font-iriska font-normal italic text-accent">клиентов</span>
              </h2>
              <Link to="/cases" className="inline-flex items-center text-accent hover:underline font-medium">
                Смотреть все кейсы <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-12 gap-4">
              {/* Featured large case */}
              <Link
                to="/cases/aktransservice"
                className="md:col-span-7 md:row-span-2 group flex flex-col justify-between rounded-2xl bg-foreground text-background p-8 md:p-10 min-h-[320px] shadow-plate hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
                    Кейс · Транспорт · Нефтегаз
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-background">АкТрансСервис</h3>
                  <p className="text-sm md:text-base text-background/70 leading-relaxed max-w-md">
                    В работе было 53 000 позиций. Вместо дорогого внешнего решения собрали другой
                    путь и внедрили инструменты под реальные задачи компании.
                  </p>
                </div>
                <div className="mt-8 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-accent leading-none mb-1">
                      1,7 млн ₽
                    </div>
                    <p className="text-xs text-background/60">сохранено за квартал</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-accent group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              {/* Two smaller stacked cases */}
              <Link
                to="/cases/kraypotrebsoyuz"
                className="md:col-span-5 group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 md:p-7 min-h-[150px] shadow-soft hover:shadow-card hover:-translate-y-1 hover:border-accent transition-all duration-300"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Кейс · Архитектура · Капитальные затраты
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Крайпотребсоюз</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Планировалась покупка серверного оборудования примерно за 1,5 млн ₽. Архитектура позволила отказаться от покупки.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-accent leading-none">1,3 млн ₽</div>
                    <p className="text-xs text-muted-foreground mt-1">разовой экономии капитальных затрат — за счёт отказа от покупки серверного оборудования</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-foreground/60 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link
                to="/cases/cargo-express"
                className="md:col-span-5 group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 md:p-7 min-h-[150px] shadow-soft hover:shadow-card hover:-translate-y-1 hover:border-accent transition-all duration-300"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Кейс · Логистика · Заявки
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Грузовой Экспресс</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Перевозчик на север. Вместо сложной CRM собрали рабочую схему: голос, Telegram и Excel.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-accent leading-none">0% потерь заявок</div>
                    <p className="text-xs text-muted-foreground mt-1">9–12 часов в неделю экономии на обработке заявок</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-foreground/60 group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ПАРТНЁРЫ И КЛИЕНТЫ — ближе к концу страницы */}
        <div className="pb-8 md:pb-12">
          <div className="container mx-auto max-w-6xl px-4 text-center mb-10 md:mb-14">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
              Партнёры и клиенты
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.02]">
              С кем уже{" "}
              <span className="font-iriska font-normal italic text-accent">работали</span>
              <br className="hidden md:block" />
              и для кого создавали{" "}
              <span className="font-iriska font-normal italic text-accent">решения</span>
            </h2>
          </div>
          <Partners />
        </div>

        {/* О НАС ГОВОРЯТ — одна гигантская цитата + одна со сдвигом */}
        <section className="container mx-auto max-w-6xl px-4 py-20 md:py-28">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6 text-center">
            О нас{" "}
            <span className="font-iriska font-bold italic text-accent normal-case text-2xl">говорят</span>
          </p>
          <figure className="max-w-4xl mx-auto text-center mb-16">
            <Quote className="h-10 w-10 text-accent mx-auto mb-6" />
            <blockquote className="text-2xl md:text-4xl font-bold text-foreground leading-snug mb-6">
              «Александра, вы творите историю. Вас первого внешнего эксперта пригласили на наше
              закрытое заседание правления».
            </blockquote>
            <figcaption className="text-sm md:text-base text-muted-foreground">
              <span className="font-semibold text-foreground">Ольга Яковлевна</span>
              <span> — руководитель юридического отдела, Крайпотребсоюз</span>
            </figcaption>
          </figure>
          <figure className="max-w-2xl ml-auto border-l-2 border-accent pl-6 md:pl-8">
            <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-3 italic">
              «Вы даже не представляете, как вы всем нужны — просто они ещё об этом не знают».
            </blockquote>
            <figcaption className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Максим Андриянов</span>
              <span> — генеральный директор, АкТрансСервис</span>
            </figcaption>
          </figure>
        </section>

        <Testimonials />



      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default NewHome;
