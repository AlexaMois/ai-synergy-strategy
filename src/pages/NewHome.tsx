import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Hand, Eye, Layers, Compass as CompassIcon, Quote, Phone, Send } from "lucide-react";
import { openCallbackModal } from "@/components/CallbackModal";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import CookieConsent from "@/components/CookieConsent";
import TrustMarquee from "@/components/TrustMarquee";
import MarqueeText from "@/components/MarqueeText";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import AnimatedNumber from "@/components/AnimatedNumber";
import heroCharacter from "@/assets/sketches/hero-character.png";
import compassSketch from "@/assets/sketches/compass-sketch.png";
import handshakeSketch from "@/assets/sketches/handshake-sketch.png";
import magnifierSketch from "@/assets/sketches/magnifier-docs-sketch.png";
import routeSketch from "@/assets/sketches/route-sketch.png";
import chatSketch from "@/assets/sketches/chat-sketch.png";

const stats: Array<{
  value: number;
  suffix: string;
  label: string;
  sub?: string;
  decimals?: number;
}> = [
  { value: 360, suffix: "", label: "диагностик" },
  { value: 40, suffix: "", label: "проектов в продакшн", sub: "решения, которые дошли до рабочего применения" },
  { value: 7, suffix: "", label: "городов", sub: "работаю онлайн по России" },
  { value: 10, suffix: "", label: "отраслей" },
  { value: 3.5, suffix: "", label: "года практики", decimals: 1, sub: "прикладные проекты в бизнесе" },
  { value: 80, suffix: "%", label: "клиентов приходят по рекомендации" },
  { value: 85, suffix: "%", label: "клиентов возвращаются" },
  { value: 3, suffix: "", label: "месяца — средняя окупаемость решений" },
];

const externalViewCards = [
  {
    icon: Hand,
    title: "Много ручной работы",
    text: "Документы, заявки, отчёты, таблицы или справки собираются вручную и забирают время команды.",
  },
  {
    icon: Eye,
    title: "Руководитель держит контроль на себе",
    text: "Чтобы понять ситуацию, приходится постоянно уточнять, проверять, сверять данные и собирать информацию у сотрудников.",
  },
  {
    icon: Layers,
    title: "Инструменты работают разрозненно",
    text: "Таблицы, мессенджеры, CRM, файлы и сервисы используются отдельно друг от друга и не дают единой картины.",
  },
  {
    icon: CompassIcon,
    title: "Нужно понять первый шаг",
    text: "Компания хочет развиваться в цифровом направлении, но пока не ясно, что внедрять первым, какой бюджет закладывать и какой эффект ожидать.",
  },
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
    "ghost-light": "bg-background/10 text-background border border-background/40",
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

const NewHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Александра Моисеева — архитектор цифрового развития бизнеса</title>
        <meta
          name="description"
          content="Эксперт по цифровому развитию бизнеса. Агентство НейроРешения — методология и продуктовая система внедрения ИИ и автоматизации."
        />
        <link rel="canonical" href="https://aleksamois.ru/" />
        <meta property="og:title" content="Александра Моисеева — архитектор цифрового развития бизнеса" />
        <meta property="og:description" content="Эксперт и архитектор цифрового развития бизнеса. Агентство НейроРешения — система реализации проектов." />
        <meta property="og:url" content="https://aleksamois.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
      </Helmet>

      <main>
        {/* HERO — большая бирюзовая плашка во всю ширину */}
        <section className="pt-24 md:pt-28 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="relative rounded-[32px] md:rounded-[40px] bg-accent overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
              <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 pt-12 md:pt-20 pb-0 md:pb-0">
                <div className="md:col-span-7 pb-10 md:pb-20">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-background mb-6">
                    Александра <span className="font-iriska font-normal italic text-background/95">Моисеева</span>
                  </h1>
                  <p className="text-xl md:text-2xl lg:text-3xl text-background/90 mb-8 max-w-2xl leading-snug">
                    Эксперт и архитектор цифрового развития бизнеса
                  </p>
                  <p className="text-base md:text-lg text-background/80 mb-10 max-w-xl">
                    Основатель агентства «НейроРешения». Помогаю собственникам и руководителям
                    понять, какие процессы стоит перевести в цифровой формат первыми, как снизить
                    ручную нагрузку и как внедрять инструменты поэтапно.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <PillButton to="/start" variant="light">
                      Подобрать формат работы
                    </PillButton>
                    <PillButton to="/services" variant="ghost-light">
                      Посмотреть услуги
                    </PillButton>
                  </div>
                </div>
                <div className="md:col-span-5 relative flex justify-center md:justify-end items-end self-end">
                  <img
                    src={heroCharacter}
                    alt=""
                    width={900}
                    height={900}
                    className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain drop-shadow-xl"
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
                  диагностик
                </p>
                <p className="text-sm md:text-base text-muted-foreground max-w-md">
                  Разборы процессов, задач и точек потерь — за 3,5 года практики.
                </p>
              </div>
              <div className="md:col-span-7 grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden shadow-card">
                {stats.slice(1).map(({ value, suffix, label, decimals, sub }) => (
                  <div key={label} className="bg-card p-5 md:p-7">
                    <div className="text-2xl md:text-4xl font-bold text-foreground mb-1">
                      <AnimatedNumber value={value} suffix={suffix} decimals={decimals ?? 0} />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-snug">{label}</p>
                    {sub && (
                      <p className="mt-1 text-[11px] md:text-xs text-muted-foreground/80 leading-snug">
                        {sub}
                      </p>
                    )}
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

        <div className="pt-16 md:pt-24">
          <div className="container mx-auto max-w-6xl px-4 text-center mb-10 md:mb-14">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
              Партнёры и клиенты
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.02]">
              С кем уже{" "}
              <span className="font-iriska font-normal italic text-accent">работали</span>
              <br className="hidden md:block" />
              и для кого создавали{" "}
              <span className="font-iriska font-normal italic text-accent">решения</span>
            </h2>
          </div>
          <Partners />
        </div>

        {/* ВНЕШНИЙ ВЗГЛЯД — лавандовая плашка + табличный список */}
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="rounded-[32px] md:rounded-[40px] bg-surface-lavender overflow-hidden mb-10 shadow-plate ring-1 ring-foreground/5">
            <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 py-10 md:py-14">
              <div className="md:col-span-7">
                <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-5">
                  Когда нужен{" "}
                  <span className="font-iriska font-normal italic text-foreground/80">
                    внешний взгляд
                  </span>{" "}
                  на цифровое развитие
                </h2>
                <p className="text-base md:text-lg text-foreground/70 max-w-2xl">
                  Сначала важно увидеть ручную нагрузку, точки потерь, дублирование и задачи,
                  которые мешают компании работать быстрее и спокойнее.
                </p>
              </div>
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <img
                  src={magnifierSketch}
                  alt=""
                  width={800}
                  height={800}
                  loading="lazy"
                  className="w-56 md:w-72 lg:w-80 h-auto object-contain"
                />
              </div>
            </div>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {externalViewCards.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="grid md:grid-cols-12 gap-6 py-6 md:py-8 items-start"
              >
                <div className="md:col-span-1 font-iriska text-5xl md:text-6xl font-bold text-accent tabular-nums leading-none">
                  0{i + 1}
                </div>
                <div className="md:col-span-4 flex items-center gap-3">
                  <Icon className="h-5 w-5 text-accent shrink-0" />
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">{title}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <MarqueeText />

        {/* С ЧЕГО НАЧАТЬ — pastel-плашки с разными фонами, средняя featured */}
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="max-w-3xl mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-5">
              С чего можно{" "}
              <span className="font-iriska font-normal italic text-accent">начать</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Формат зависит от того, насколько понятна текущая задача и насколько подробно нужно
              разбирать компанию.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Стратегическая встреча по цифровизации для собственника",
                text: "Быстро понять первый шаг: какие процессы требуют внимания и какой формат работы выбрать дальше.",
                price: "17 000 ₽",
                result: "Первые приоритеты цифрового развития.",
                to: "/services/owner-digital-session",
                bg: "bg-surface-mint",
                textColor: "text-foreground",
                muted: "text-foreground/70",
                btnVariant: "dark" as const,
                showSketch: routeSketch,
              },
              {
                title: "Разработка стратегии цифрового развития бизнеса",
                text: "Практический план на 90 дней: что менять первым, какие инструменты рассматривать и как двигаться поэтапно.",
                price: "78 000 ₽",
                result: "Карта ручной нагрузки, приоритеты и план действий.",
                to: "/services/digital-development-strategy",
                bg: "bg-accent",
                textColor: "text-background",
                muted: "text-background/80",
                btnVariant: "light" as const,
                showSketch: null,
              },
              {
                title: "Глубокий аудит компании для цифровизации",
                text: "Подробно разбираем процессы, данные, документы и готовность к внедрению цифровых решений.",
                price: "от 116 000 ₽",
                result: "Карта процессов, риски, дорожная карта внедрения.",
                to: "/services/digital-audit",
                bg: "bg-surface-sand",
                textColor: "text-foreground",
                muted: "text-foreground/70",
                btnVariant: "dark" as const,
                showSketch: compassSketch,
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`relative flex flex-col rounded-[28px] ${card.bg} p-7 md:p-9 min-h-[420px] overflow-hidden shadow-card hover:shadow-plate hover:-translate-y-1 transition-all duration-300 ring-1 ring-foreground/5`}
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
                <h3 className={`text-xl md:text-2xl font-bold ${card.textColor} mb-3 leading-tight relative`}>
                  {card.title}
                </h3>
                <p className={`text-sm md:text-base ${card.muted} leading-relaxed mb-6 relative max-w-[85%]`}>
                  {card.text}
                </p>
                <div className="mt-auto space-y-4 relative">
                  <div className="flex items-end gap-3">
                    <span className={`text-3xl md:text-4xl font-bold ${card.textColor} leading-none`}>
                      {card.price}
                    </span>
                  </div>
                  <p className={`text-xs ${card.muted} max-w-[85%]`}>{card.result}</p>
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

        {/* ФИЛОСОФИЯ — большая бирюзовая плашка с гигантской формулой и компасом */}
        <section className="px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="rounded-[32px] md:rounded-[40px] bg-accent overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
              <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 py-14 md:py-20">
                <div className="md:col-span-8">
                  <p className="text-sm uppercase tracking-widest text-background/80 font-semibold mb-6">
                    Философия работы
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-8">
                    {["Человек", "Процессы", "Бизнес", "Технологии"].map((word, i, arr) => (
                      <div key={word} className="flex items-center gap-3 md:gap-5">
                        <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-background leading-none">
                          {word}
                        </span>
                        {i < arr.length - 1 && (
                          <ArrowRight className="h-6 w-6 md:h-9 md:w-9 text-background/70" />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-background/90 mb-3 max-w-2xl leading-snug">
                    Сначала разбираем работу людей и процессы, потом подбираем цифровые инструменты.
                  </p>
                  <p className="text-base md:text-lg text-background/75 max-w-2xl">
                    Каждый инструмент должен работать в привычной среде компании, снижать ручную
                    нагрузку и помогать руководителю видеть ситуацию яснее.
                  </p>
                </div>
                <div className="md:col-span-4 flex justify-center md:justify-end">
                  <img
                    src={compassSketch}
                    alt=""
                    width={800}
                    height={800}
                    loading="lazy"
                    className="w-56 md:w-72 lg:w-80 h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* РЕЗУЛЬТАТЫ — bento на сером, заголовок с курсивом */}
        <section className="bg-background py-16 md:py-24 mt-16 md:mt-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05]">
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
                    Кейс · Закупки · Распределённая структура
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Крайпотребсоюз</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    51 организация и 300+ точек. Создан НейроТендеролог, которым больше года пользуются 8 компаний.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-accent leading-none">1,3 млн ₽</div>
                    <p className="text-xs text-muted-foreground mt-1">сохранено за квартал</p>
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

        {/* КОМУ ПОМОГАЕМ — тёмная плашка + рукопожатие */}
        <section className="bg-foreground text-background py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-6">
                <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                  Кому помогаем
                </p>
                <h2 className="text-4xl md:text-6xl font-bold mb-5 leading-[1.05] text-background">
                  Компании от 5 до{" "}
                  <span className="font-iriska font-normal italic text-accent">300 сотрудников</span>
                </h2>
                <p className="text-base md:text-lg text-background/70">
                  Работаю с собственниками и руководителями. Особенно полезна компаниям без сильной
                  штатной IT-команды, где цифровые изменения нужно внедрять поэтапно — с понятной
                  пользой и без перегруза сотрудников.
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3 mt-8">
                  {["производство", "транспорт", "торговля", "нефтегаз", "услуги"].map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center text-sm md:text-base font-semibold px-3.5 py-1.5 md:px-4 md:py-2 rounded-full bg-background/10 border border-background/20 text-background whitespace-nowrap hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-6 flex justify-center md:justify-end">
                <img
                  src={handshakeSketch}
                  alt=""
                  width={800}
                  height={800}
                  loading="lazy"
                  className="w-[32rem] md:w-[40rem] lg:w-[48rem] h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ФИНАЛЬНЫЙ CTA — сиреневая плашка с пузырями переписки */}
        <section id="contact" className="px-4 md:px-6 py-16 md:py-24">
          <div className="container mx-auto max-w-7xl">
            <div className="rounded-[32px] md:rounded-[40px] bg-surface-blush overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
              <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 py-14 md:py-20">
                <div className="md:col-span-7">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.02] mb-6">
                    Начните с понятного{" "}
                    <span className="font-iriska font-normal italic text-accent">
                      первого шага
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-foreground/75 mb-10 max-w-xl">
                    Начните с выбора формата работы. За несколько минут станет понятно, что сейчас
                    актуальнее: стратегическая встреча, стратегия, аудит, обучение, внедрение или
                    сопровождение.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <PillButton to="/start" variant="dark">
                      Подобрать формат работы
                    </PillButton>
                    <button
                      type="button"
                      onClick={() => openCallbackModal()}
                      className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 bg-accent text-accent-foreground hover:bg-primary-dark"
                    >
                      <span>Заказать звонок</span>
                      <span className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-background text-foreground group-hover:translate-x-0.5 transition-transform">
                        <Phone className="h-4 w-4 md:h-5 md:w-5" />
                      </span>
                    </button>
                    <a
                      href="https://t.me/aleksamois"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 bg-transparent text-foreground border border-foreground/30 hover:bg-foreground/5"
                    >
                      <span>Написать в Telegram</span>
                      <span className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-foreground text-background group-hover:translate-x-0.5 transition-transform">
                        <Send className="h-4 w-4 md:h-5 md:w-5" />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="md:col-span-5 flex justify-center md:justify-end">
                  <img
                    src={chatSketch}
                    alt=""
                    width={800}
                    height={800}
                    loading="lazy"
                    className="w-56 md:w-72 lg:w-80 h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingCTA />
      <CookieConsent />
    </div>
  );
};

export default NewHome;
