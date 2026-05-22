import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Briefcase, FolderOpen, Wallet, User, Phone, Hand, Eye, Layers, Compass as CompassIcon, Quote, Activity, AlertTriangle, ListChecks, TrendingUp } from "lucide-react";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import CookieConsent from "@/components/CookieConsent";
import TrustMarquee from "@/components/TrustMarquee";
import MarqueeText from "@/components/MarqueeText";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import AnimatedNumber from "@/components/AnimatedNumber";

const sections = [
  { to: "/start", label: "С чего начать", desc: "Выбор формата работы и короткий разбор", icon: Compass },
  { to: "/services", label: "Услуги", desc: "Диагностика, архитектура, внедрение, сопровождение", icon: Briefcase },
  { to: "/cases", label: "Кейсы", desc: "Реальные проекты и результаты", icon: FolderOpen },
  { to: "/pricing", label: "Цены", desc: "Прозрачные форматы и стоимость", icon: Wallet },
  { to: "/about", label: "Обо мне", desc: "Александра Моисеева — архитектор цифрового развития", icon: User },
];

const stats = [
  { value: 360, suffix: "", label: "диагностик" },
  { value: 40, suffix: "", label: "проектов в продакшн" },
  { value: 7, suffix: "", label: "городов" },
  { value: 10, suffix: "", label: "отраслей" },
  { value: 3.5, suffix: "", label: "года практики", decimals: 1 },
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
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: "#F8F9FB" }}
        >
          {/* soft turquoise gradient on the right */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2"
            style={{
              background:
                "radial-gradient(60% 70% at 80% 50%, rgba(73,190,216,0.18) 0%, rgba(73,190,216,0.06) 45%, rgba(255,255,255,0) 75%)",
            }}
          />
          <div
            className="relative mx-auto flex flex-col lg:flex-row lg:items-center"
            style={{
              maxWidth: "1120px",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "clamp(56px, 8vw, 96px)",
              paddingBottom: "clamp(48px, 8vw, 96px)",
              gap: "clamp(40px, 6vw, 72px)",
              minHeight: "clamp(520px, 60vw, 620px)",
            }}
          >
            {/* Left column */}
            <div className="w-full lg:w-[52%] text-left">
              <h1
                className="font-golos font-bold"
                style={{
                  color: "#111827",
                  fontSize: "clamp(34px, 5vw, 56px)",
                  lineHeight: 1.08,
                }}
              >
                Александра Моисеева
              </h1>
              <p
                className="font-golos"
                style={{
                  color: "#111827",
                  fontSize: "clamp(19px, 2.2vw, 26px)",
                  lineHeight: 1.3,
                  fontWeight: 500,
                  marginTop: "18px",
                }}
              >
                Эксперт и архитектор цифрового развития бизнеса
              </p>
              <p
                className="font-raleway"
                style={{
                  color: "#374151",
                  fontSize: "clamp(16px, 1.4vw, 18px)",
                  lineHeight: 1.65,
                  fontWeight: 400,
                  maxWidth: "560px",
                  marginTop: "24px",
                }}
              >
                Основатель агентства «НейроРешения». Помогаю собственникам и руководителям понять,
                какие процессы стоит перевести в цифровой формат первыми, как снизить ручную нагрузку
                и как внедрять инструменты поэтапно.
              </p>
              <div
                className="flex flex-col sm:flex-row"
                style={{ gap: "16px", marginTop: "32px" }}
              >
                <Link
                  to="/start"
                  className="inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto"
                  style={{
                    backgroundColor: "#49BED8",
                    color: "#111827",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "16px 28px",
                    borderRadius: "14px",
                    boxShadow: "0 12px 28px rgba(73, 190, 216, 0.28)",
                  }}
                >
                  Подобрать формат работы
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#111827",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "16px 28px",
                    borderRadius: "14px",
                    border: "1px solid #49BED8",
                    boxShadow: "0 8px 18px rgba(17, 24, 39, 0.08)",
                  }}
                >
                  Посмотреть услуги
                </Link>
              </div>
            </div>

            {/* Right column — Digital map dashboard card */}
            <div className="w-full lg:w-[44%] flex justify-center mt-10 lg:mt-0">
              <div
                className="w-full max-w-[480px]"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "28px",
                  border: "1px solid rgba(73,190,216,0.35)",
                  boxShadow: "0 24px 60px -20px rgba(17,24,39,0.18), 0 8px 20px -8px rgba(73,190,216,0.18)",
                  padding: "28px",
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: "20px" }}>
                  <div>
                    <div style={{ fontSize: "12px", color: "#6B7280", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      Дашборд
                    </div>
                    <div style={{ fontSize: "18px", color: "#111827", fontWeight: 700, marginTop: "4px" }} className="font-golos">
                      Цифровая карта компании
                    </div>
                  </div>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "9999px",
                      background: "#49BED8",
                      boxShadow: "0 0 0 4px rgba(73,190,216,0.18)",
                    }}
                  />
                </div>

                <div className="grid grid-cols-2" style={{ gap: "12px" }}>
                  {[
                    { icon: Activity, label: "Ручная нагрузка", value: "−42%", tone: "#49BED8" },
                    { icon: AlertTriangle, label: "Точки потерь", value: "7", tone: "#111827" },
                    { icon: ListChecks, label: "Приоритеты внедрения", value: "5", tone: "#49BED8" },
                    { icon: TrendingUp, label: "ROI / окупаемость", value: "3 мес.", tone: "#111827" },
                  ].map(({ icon: Icon, label, value, tone }) => (
                    <div
                      key={label}
                      style={{
                        background: "#F4FAFD",
                        border: "1px solid #D4EDFC",
                        borderRadius: "16px",
                        padding: "14px",
                      }}
                    >
                      <div className="flex items-center" style={{ gap: "8px", color: "#6B7280" }}>
                        <Icon className="h-4 w-4" style={{ color: "#49BED8" }} />
                        <span style={{ fontSize: "12px", fontWeight: 500 }}>{label}</span>
                      </div>
                      <div style={{ fontSize: "22px", fontWeight: 700, color: tone, marginTop: "8px" }} className="font-golos">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "18px",
                    padding: "14px 16px",
                    background: "#FFFFFF",
                    border: "1px dashed #D4EDFC",
                    borderRadius: "16px",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "10px" }}>
                    Схема внедрения
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    {["Процессы", "Инструменты", "Результат"].map((step, i) => (
                      <div key={step} className="flex items-center" style={{ gap: "8px", flex: 1 }}>
                        <div
                          style={{
                            flex: 1,
                            textAlign: "center",
                            padding: "8px 6px",
                            background: "#D4EDFC",
                            color: "#0F3E4D",
                            borderRadius: "10px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {step}
                        </div>
                        {i < 2 && <ArrowRight className="h-3.5 w-3.5" style={{ color: "#49BED8", flexShrink: 0 }} />}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    padding: "14px 16px",
                    background: "#49BED8",
                    borderRadius: "14px",
                    color: "#0B2530",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 10px 24px -10px rgba(73,190,216,0.55)",
                  }}
                >
                  <div style={{ fontSize: "13px", fontWeight: 600 }}>Средняя окупаемость</div>
                  <div style={{ fontSize: "18px", fontWeight: 700 }} className="font-golos">3 месяца</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ marginTop: "clamp(16px, 2vw, 24px)" }}>
          <TrustMarquee />
        </div>

        <section className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
            Компания в цифрах
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map(({ value, suffix, label, decimals }) => (
              <div key={label} className="rounded-2xl border border-border bg-card p-5 md:p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  <AnimatedNumber value={value} suffix={suffix} decimals={decimals ?? 0} />
                </div>
                <p className="text-sm text-muted-foreground leading-snug">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm md:text-base text-muted-foreground mt-8 max-w-2xl mx-auto">
            Ключевая метрика работы — сумма ненужных расходов, которых удалось избежать клиентам.
          </p>
        </section>

        <div className="pt-16 md:pt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center container mx-auto max-w-6xl px-4">
            С кем уже работали и для кого создавали решения
          </h2>
          <Partners />
        </div>

        <section className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Когда компании нужен внешний взгляд на цифровое развитие
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              К цифровому развитию стоит подходить не с покупки программы или выбора подрядчика,
              а с понимания, какие процессы действительно требуют изменений. Сначала нужно увидеть
              ручную нагрузку, точки потерь, дублирование и задачи, которые мешают компании работать
              быстрее и спокойнее.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {externalViewCards.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <Icon className="h-6 w-6 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <MarqueeText />

        <section className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              С чего можно начать
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Начинать можно с короткой стратегической встречи, разработки стратегии или глубокого
              аудита. Формат зависит от того, насколько понятна текущая задача и насколько подробно
              нужно разбирать компанию.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Стратегическая встреча по цифровизации для собственника",
                text: "Для собственника или руководителя, которому нужно быстро понять первый шаг: какие процессы требуют внимания, где есть ручная нагрузка и какой формат работы выбрать дальше.",
                price: "17 000 ₽",
                result: "Первые приоритеты цифрового развития и понятный следующий шаг.",
                to: "/services/owner-digital-session",
              },
              {
                title: "Разработка стратегии цифрового развития бизнеса",
                text: "Для компании, которой нужен практический план цифрового развития на ближайшие 90 дней: что менять первым, какие инструменты рассматривать и как двигаться поэтапно.",
                price: "78 000 ₽",
                result: "Точка А, карта ручной нагрузки, приоритеты и план действий на 90 дней.",
                to: "/services/digital-development-strategy",
              },
              {
                title: "Глубокий аудит компании для цифровизации",
                text: "Для компаний, где нужно подробно разобрать процессы, данные, документы, текущие инструменты и готовность к внедрению цифровых решений.",
                price: "от 116 000 ₽",
                result: "Карта процессов, риски, рекомендации, бюджетные ориентиры и дорожная карта внедрения.",
                to: "/services/digital-audit",
              },
            ].map((card) => (
              <div key={card.title} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.text}</p>
                <div className="mt-auto space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Цена</p>
                    <p className="text-xl font-bold text-foreground">{card.price}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Результат</p>
                    <p className="text-sm text-foreground/80">{card.result}</p>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={card.to}>
                      Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/services" className="inline-flex items-center text-accent hover:underline font-medium">
              Все форматы работы <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
            Философия работы
          </h2>
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mb-8 text-center">
              {["Человек", "Процессы", "Бизнес", "Технологии"].map((word, i, arr) => (
                <div key={word} className="flex items-center gap-3 md:gap-5">
                  <span className="text-xl md:text-3xl font-bold text-foreground">{word}</span>
                  {i < arr.length - 1 && <ArrowRight className="h-5 w-5 md:h-7 md:w-7 text-accent" />}
                </div>
              ))}
            </div>
            <div className="max-w-3xl mx-auto space-y-4 text-center">
              <p className="text-base md:text-lg text-foreground/80">
                Сначала разбираем работу людей и процессы, потом подбираем цифровые инструменты.
                Решение должно прижиться в ежедневной работе команды, а не остаться отдельной системой.
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Каждый инструмент должен работать в привычной среде компании, снижать ручную
                нагрузку и помогать руководителю видеть ситуацию яснее.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
            Результаты клиентов
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Грузовой Экспресс",
                text: "Перевозчик на север. Заявки приходили из разных каналов, терялись и дублировались. Вместо сложной CRM собрали рабочую схему: голос, Telegram и Excel.",
                result: "Заявки стали попадать в единую рабочую систему, руководитель получил понятный контроль.",
                to: "/cases/cargo-express",
              },
              {
                title: "АкТрансСервис",
                text: "Транспорт, вахта, нефтегаз. В работе было 53 000 позиций. Вместо дорогого внешнего решения собрали другой путь и внедрили инструменты под реальные задачи компании.",
                result: "Сохранено 1,7 млн ₽ за квартал.",
                to: "/cases/aktransservice",
              },
              {
                title: "Крайпотребсоюз",
                text: "51 организация и 300+ точек. Для компании был создан НейроТендеролог, которым больше года пользуются 8 компаний.",
                result: "Сохранено 1,3 млн ₽ за квартал.",
                to: "/cases/kraypotrebsoyuz",
              },
            ].map((c) => (
              <div key={c.title} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.text}</p>
                <div className="mt-auto space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Результат</p>
                    <p className="text-sm text-foreground/80">{c.result}</p>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={c.to}>
                      Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/cases">
                Смотреть все кейсы <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
            О нас говорят
          </h2>
          <div className="grid gap-4 md:grid-cols-2 mb-4">
            {[
              {
                quote: "Александра, вы творите историю. Вас первого внешнего эксперта пригласили на наше закрытое заседание правления.",
                author: "Ольга Яковлевна",
                role: "руководитель юридического отдела, Крайпотребсоюз",
              },
              {
                quote: "Вы даже не представляете, как вы всем нужны — просто они ещё об этом не знают.",
                author: "Максим Андриянов",
                role: "генеральный директор, АкТрансСервис",
              },
            ].map((q) => (
              <figure
                key={q.author}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 md:p-8"
              >
                <Quote className="h-6 w-6 text-accent mb-4" />
                <blockquote className="text-base md:text-lg text-foreground/90 leading-relaxed mb-4 flex-1">
                  «{q.quote}»
                </blockquote>
                <figcaption className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{q.author}</span>
                  <span> — {q.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <Testimonials />

        <section className="container mx-auto max-w-5xl px-4 py-16 md:py-20">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Кому помогаем
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Работаю с собственниками и руководителями компаний от 5 до 300 сотрудников.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Основные сферы
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-2 text-base md:text-lg font-semibold text-foreground">
              {["производство", "транспорт", "торговля", "нефтегаз", "услуги"].map((s, i, arr) => (
                <div key={s} className="flex items-center gap-3">
                  <span>{s}</span>
                  {i < arr.length - 1 && <span className="text-accent">·</span>}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl">
            Особенно полезна компаниям без сильной штатной IT-команды, где цифровые изменения
            нужно внедрять поэтапно, с понятной пользой и без перегруза сотрудников.
          </p>
        </section>

        <section id="contact" className="container mx-auto max-w-3xl px-4 pb-24">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Начните с понятного первого шага
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Если пока не знаете, какой формат подойдёт, начните со страницы выбора. Она поможет
              понять, что сейчас актуальнее: стратегическая встреча, стратегия, аудит, обучение,
              внедрение или сопровождение.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/start">
                  Подобрать формат работы <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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
