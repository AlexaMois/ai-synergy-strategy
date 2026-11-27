import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, ChevronRight, Quote, Phone } from "lucide-react";
import { scrollToContact } from "@/lib/scrollToContact";
import { setContactIntent } from "@/lib/contactIntent";
import { CommercialHome } from "@/pages/commercial/CommercialPages";
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
import synergyImg from "@/assets/how-we-work/synergy.webp";
import { requestDiagnosticAutostart } from "@/lib/diagnosticState";

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
  { value: 360, suffix: "", label: "консультаций" },
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
  onClick,
  children,
  variant = "dark",
  className = "",
}: {
  to?: string;
  onClick?: () => void;
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
  const buttonClass = `group inline-flex items-center gap-2.5 sm:gap-3 pl-4 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 ${styles} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <span
        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full ${iconBg} group-hover:translate-x-0.5 transition-transform`}
      >
        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
      </span>
    </>
  );
  return to ? (
    <Link to={to} className={buttonClass}>{content}</Link>
  ) : (
    <button type="button" onClick={onClick} className={buttonClass}>{content}</button>
  );
};

const NewHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>НейроРешения | Программные продукты, ИИ-агенты и автоматизация бизнеса</title>
        <meta
          name="description"
          content="Программные продукты, ИИ-агенты и автоматизация бизнеса. Выявляем потери, сокращаем ручную работу и проверяем результат на данных компании."
        />
        <link rel="canonical" href="https://aleksamois.ru/" />
        <meta property="og:title" content="НейроРешения | Программные продукты, ИИ-агенты и автоматизация бизнеса" />
        <meta property="og:description" content="Программные продукты, ИИ-агенты и автоматизация бизнеса. Выявляем потери, сокращаем ручную работу и проверяем результат на данных компании." />
        <meta property="og:url" content="https://aleksamois.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <main>
        {/* Фирменный первый экран: голубая поверхность, оригинальный портрет и Iriska. */}
        <section id="brand-hero" className="pt-20 md:pt-28 px-3 sm:px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div data-brand-panel className="relative rounded-[28px] md:rounded-[40px] bg-accent overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
              <div className="relative grid md:grid-cols-12 gap-4 md:gap-6 items-center px-5 sm:px-6 md:px-12 lg:px-16 pt-8 sm:pt-10 md:pt-16 pb-0">
                <div className="min-w-0 md:col-span-7 pb-6 sm:pb-8 md:pb-14">
                  <div className="mb-4 md:mb-6">
                    <p data-brand-name className="font-golos font-bold text-[30px] max-[359px]:text-[26px] sm:text-[38px] lg:text-[48px] leading-[1.12] tracking-tight !text-white">
                      Александра <span data-brand-signature className="inline-block font-iriska font-normal italic !text-white">Моисеева</span>
                    </p>
                    <p className="font-raleway text-sm md:text-base leading-relaxed !text-white mt-2">
                      основатель и инженер-архитектор цифрового развития бизнеса
                    </p>
                  </div>
                  <h1 className="font-golos text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug tracking-normal !text-white mb-4 md:mb-5">
                    Программные продукты, ИИ-агенты и автоматизация бизнеса
                  </h1>
                  <p className="font-raleway text-base md:text-lg !text-white mb-6 md:mb-8 max-w-xl leading-relaxed">
                    Выявляем потери, сокращаем ручную работу и проверяем результат на данных компании.
                  </p>
                  <div className="relative z-10 flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-3 items-stretch sm:items-start">
                    <PillButton to="/services" variant="light" className="!bg-white !text-[#212121] [&>span:last-child]:!bg-[#212121] [&>span:last-child]:!text-white hover:!bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#212121]">Выбрать решение</PillButton>
                    <PillButton
                      variant="light"
                      className="!bg-white !text-[#212121] [&>span:last-child]:!bg-[#212121] [&>span:last-child]:!text-white hover:!bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#212121]"
                      onClick={() =>
                        document.getElementById("industry-questions")?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    >
                      Узнать свою задачу
                    </PillButton>
                    <PillButton variant="ghost-light" className="!bg-transparent !text-white !border-white/40 [&>span:last-child]:!bg-white [&>span:last-child]:!text-[#212121] hover:!bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#212121]" onClick={() => { setContactIntent(null); scrollToContact(); }}>
                      Обсудить задачу
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
                    className="relative w-[85%] max-w-[295px] sm:max-w-[368px] md:max-w-[504px] lg:max-w-[576px] h-auto object-contain [filter:drop-shadow(0_25px_25px_rgba(0,0,0,0.25))_drop-shadow(0_10px_10px_rgba(0,0,0,0.15))]"
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
        <section id="home-metrics" className="bg-white py-16 md:py-24 mt-4">
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
                  консультаций
                </p>
                <p className="text-sm md:text-base text-muted-foreground max-w-md">
                  Консультации по бизнес-процессам и цифровым решениям за 4+ года практики в ИИ.
                </p>
              </div>
              <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden shadow-card">
                {stats.slice(1).map(({ value, suffix, label, decimals, sub }) => (
                  <div key={label} className="bg-[#F2F2F2] p-3.5 md:p-6 flex items-center gap-3.5 md:gap-5">
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
                <div className="bg-[#07536A] text-white p-5 md:p-7 flex flex-col justify-center">
                  <div className="font-iriska text-2xl md:text-4xl leading-tight mb-2">
                    Клиенты возвращаются за следующим этапом
                  </div>
                  <p className="text-xs md:text-sm !text-white leading-snug">
                    Большинство клиентов продолжают работу после первого проекта: новые цифровые инструменты, развитие и автоматизация процессов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* УЗНАЁТЕ СВОЙ БИЗНЕС? — интерактивные отраслевые вопросы */}
        <CommercialHome />
        <IndustryQuestions />

        {/* С ЧЕГО НАЧАТЬ — выездная консультация */}
        <section id="home-start" className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
              С чего начать{" "}
              <span className="font-iriska font-normal italic text-accent">цифровизацию</span>?
            </h2>
            <p className="text-base md:text-lg text-foreground/80">
              Начнём с конкретного рабочего процесса. Выявим потери времени и денег, определим приоритет и следующий шаг.
            </p>
          </div>
          <div className="relative flex flex-col rounded-[28px] bg-[#F2F2F2] p-7 md:p-9 overflow-hidden shadow-card ring-1 ring-foreground/5">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
              Выездная консультация
            </h3>
            <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-4">
              На месте изучим один рабочий процесс, выясним, где теряются время и деньги, определим приоритетную задачу.
            </p>
            <p className="text-sm md:text-base font-medium text-foreground mb-4">
              Красноярск · До 1 часа
            </p>
            <p className="flex items-start gap-2 text-sm md:text-base text-foreground/85 mb-6">
              <BadgeCheck className="h-4 w-4 shrink-0 text-accent mt-0.5" />
              <span><strong>Результат:</strong> краткое письменное заключение с рекомендациями, возможным решением, ориентиром бюджета и следующим шагом.</span>
            </p>
            <div className="space-y-4">
              <div className="font-iriska font-bold text-3xl md:text-4xl leading-none text-foreground">
                <AnimatedNumber value={8000} suffix=" ₽" />
              </div>
              <p className="text-sm md:text-base text-foreground/85">
                Стоимость консультации полностью засчитывается в оплату последующего проекта автоматизации.
              </p>
              <p className="text-sm text-foreground/85">Место и время выезда согласуем заранее.</p>
              <PillButton onClick={() => { setContactIntent({kind:"onsite",offerId:"expert-onsite",offerLabel:"Выездная консультация — 8 000 ₽",format:"onsite",sourcePath:"/",context:null}); scrollToContact(); }} variant="dark" className="text-sm">
                Пригласить специалиста
              </PillButton>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link to="/start" onClick={requestDiagnosticAutostart} className="mb-5 flex justify-center items-center text-accent underline underline-offset-4 font-medium">
              Проверить свой процесс бесплатно <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center text-accent hover:underline font-semibold text-lg">
              Все решения <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        <MarqueeText />

        {/* КАК МЫ РАБОТАЕМ — тёмная плашка в тот же тон, что «Узнаёте свой бизнес»: заголовок сверху, картинка на всю ширину, пояснение снизу */}
        <section id="home-process" className="px-4 md:px-6 py-10 md:py-14">
          <div className="container mx-auto max-w-7xl">
            <div className="relative rounded-[32px] md:rounded-[40px] bg-[#3D3D3D] overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
              {/* мягкое бирюзовое свечение в зонах текста */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-1/2 h-64 w-[420px] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px]" />
                <div className="absolute -bottom-24 left-1/2 h-40 w-[520px] -translate-x-1/2 rounded-full bg-accent/10 blur-[90px]" />
              </div>
              <div className="relative px-6 md:px-12 pt-10 md:pt-12 pb-7 md:pb-9 text-center">
                <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-4">
                  Как мы работаем
                </p>
                <h2 className="text-3xl md:text-[34px] font-bold text-background leading-[1.15]">
                  <span className="md:whitespace-nowrap">
                    От процессов к <span className="font-iriska font-normal italic text-accent">технологии</span>
                  </span>
                </h2>
              </div>
              <div className="relative">
                <div className="overflow-hidden">
                  <img
                    src={synergyImg}
                    alt="Синергия результата: человек, процессы, бизнес и технологии"
                    width={1920}
                    height={681}
                    loading="eager"
                    fetchPriority="high"
                    className="block h-auto w-full object-contain mix-blend-screen"
                  />
                </div>
              </div>
              <p className="relative px-6 md:px-12 pt-5 md:pt-6 pb-9 md:pb-11 text-xs text-background/80 leading-relaxed text-center">
                Сначала разбираем процессы и считаем потери. До запуска согласуем правила работы с
                данными, стоимость внедрения и договорные условия эксплуатации, критерии результата. После запуска
                передаём доступы и инструкции в рамках согласованного проекта.
              </p>
            </div>
          </div>
        </section>

        {/* РЕЗУЛЬТАТЫ — bento на сером, заголовок с курсивом */}
        <section id="home-cases" className="bg-white py-16 md:py-24">
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
                className="md:col-span-7 md:row-span-2 group flex flex-col justify-between rounded-2xl bg-[#07536A] text-white p-8 md:p-10 min-h-[320px] shadow-plate hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
                    Кейс · Транспорт · Цифровые решения
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-background">АкТрансСервис</h3>
                  <p className="text-sm md:text-base text-background/70 leading-relaxed max-w-md">
                    Документы разбросаны по папкам, сотрудники ищут ответы друг у друга, а
                    руководителю приходится всё контролировать вручную.
                  </p>
                  <p className="mt-3 text-sm md:text-base text-background/85 leading-relaxed max-w-md">
                    Создали корпоративный портал с поиском документов, ИИ-помощника «Джарвис», базу
                    знаний и бота для обращений по зарплате. Автоматизировали отдельные рабочие
                    процессы: командировки, отчёты, напоминания и контроль сроков.
                  </p>
                </div>
                <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                  <div className="sm:max-w-[260px]">
                    <div className="text-4xl md:text-5xl font-bold text-accent leading-none mb-1">
                      1,7 млн ₽
                    </div>
                    <p className="text-xs text-background/60 leading-snug">
                      Сохранено за квартал в рамках проекта цифровизации.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Посмотреть, что внедрили
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
              {/* Two smaller stacked cases */}
              <Link
                to="/cases/kraypotrebsoyuz"
                className="md:col-span-5 group flex flex-col justify-between rounded-2xl border border-border bg-[#D9D9D9] p-6 md:p-7 min-h-[150px] shadow-soft hover:shadow-card hover:-translate-y-1 hover:border-accent transition-all duration-300"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Кейс · Экономия бюджета
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Крайпотребсоюз</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Собирались потратить 1,5 млн ₽ на сервер. А он оказался не нужен.
                  </p>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                    Разобрались, как решить задачи с документами и тендерами без покупки дорогого
                    оборудования. Подобрали более экономичный вариант.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-accent leading-none">1,3 млн ₽</div>
                    <p className="text-xs text-muted-foreground mt-1">Сохранено на покупке оборудования</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-foreground/60 group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
                </div>
              </Link>
              <Link
                to="/cases/cargo-express"
                className="md:col-span-5 group flex flex-col justify-between rounded-2xl border border-border bg-[#F2F2F2] p-6 md:p-7 min-h-[150px] shadow-soft hover:shadow-card hover:-translate-y-1 hover:border-accent transition-all duration-300"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Кейс · Клиентские заявки
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Грузовой Экспресс</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Клиенты обращались, а часть заявок терялась в сообщениях и голосовых.
                  </p>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                    Вместо сложной CRM сделали простую систему: сотрудники передают заявки голосом
                    или текстом, а информация автоматически попадает в общий учёт.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-accent leading-none">0% потерянных заявок после внедрения</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      9–12 часов в неделю экономит команда из трёх сотрудников
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-foreground/60 group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ПАРТНЁРЫ И КЛИЕНТЫ — ближе к концу страницы */}
<div id="home-partners" className="bg-white pt-4 pb-14 md:pb-20">
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

        {/* О НАС ГОВОРЯТ — светло-бирюзовая полоса для отделения от соседних блоков */}
        <section id="home-testimonials" className="bg-[#F2F2F2] py-14 md:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4 text-center">
              О нас{" "}
              <span className="font-iriska font-bold italic text-accent normal-case text-2xl">говорят</span>
            </p>
            <figure className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
              <Quote className="h-10 w-10 text-accent mx-auto mb-5" />
              <blockquote className="text-2xl md:text-[34px] font-medium text-foreground leading-snug mb-5">
                «Александра, вы творите историю. Вас первого внешнего эксперта пригласили на наше
                закрытое заседание правления».
              </blockquote>
              <figcaption className="text-sm md:text-base text-muted-foreground">
                <span className="font-semibold text-foreground">Ольга Яковлевна</span>
                <span> — руководитель юридического отдела, Крайпотребсоюз</span>
              </figcaption>
            </figure>
            <figure className="max-w-2xl mx-auto border-l-2 border-accent pl-6 md:pl-8">
              <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-3 italic">
                «Вы даже не представляете, как вы всем нужны — просто они ещё об этом не знают».
              </blockquote>
              <figcaption className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Максим Андриянов</span>
                <span> — генеральный директор, АкТрансСервис</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <Testimonials />



      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default NewHome;
