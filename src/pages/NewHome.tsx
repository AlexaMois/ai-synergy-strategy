import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Hand, Eye, Layers, Compass as CompassIcon, Quote } from "lucide-react";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import CookieConsent from "@/components/CookieConsent";
import TrustMarquee from "@/components/TrustMarquee";
import MarqueeText from "@/components/MarqueeText";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import AnimatedNumber from "@/components/AnimatedNumber";

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
    <div className="min-h-screen bg-background font-raleway">
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
        {/* ============== 1. HERO — тёмная технологичная сцена ============== */}
        <section className="relative bg-brand-dark nr-bg-n nr-pattern-n overflow-hidden">
          <div className="container mx-auto max-w-6xl px-4 pt-28 md:pt-36 pb-20 md:pb-28 relative z-10">
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-teal/40 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#49BED8] animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.2em] text-brand-cyan">
                    Агентство «НейроРешения»
                  </span>
                </div>
                <h1 className="font-golos text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-white mb-5 tracking-tight">
                  Александра<br />Моисеева
                </h1>
                <p className="text-lg md:text-2xl text-white/85 mb-3 font-golos">
                  Эксперт и архитектор цифрового развития бизнеса
                </p>
                <p className="nr-iriska text-2xl md:text-3xl mb-8">
                  основатель агентства «НейроРешения»
                </p>
                <p className="text-base md:text-lg text-white/65 mb-10 max-w-xl leading-relaxed">
                  Помогаю собственникам и руководителям понять, какие процессы стоит перевести
                  в цифровой формат первыми, как снизить ручную нагрузку и как внедрять
                  инструменты поэтапно.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/start"
                    className="nr-cta-primary inline-flex items-center px-7 py-4 rounded-xl font-semibold text-base"
                  >
                    Подобрать формат работы <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/services"
                    className="nr-cta-ghost inline-flex items-center px-7 py-4 rounded-xl font-semibold text-base"
                  >
                    Посмотреть услуги
                  </Link>
                </div>
              </div>

              {/* 3D-style abstract object */}
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
                  {/* outer glow */}
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(73,190,216,0.35)_0%,transparent_65%)] blur-2xl" />
                  {/* rotating orbit */}
                  <div className="absolute inset-6 rounded-full border border-brand-teal/30" style={{ animation: 'spin 30s linear infinite' }} />
                  <div className="absolute inset-12 rounded-full border border-brand-teal/20" style={{ animation: 'spin 22s linear infinite reverse' }} />
                  <div className="absolute inset-20 rounded-full border border-brand-teal/40" />
                  {/* glass sphere */}
                  <div
                    className="absolute inset-[22%] rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 30%, #D4EDFC 0%, #49BED8 35%, #037083 75%, #0a3d48 100%)',
                      boxShadow:
                        'inset 0 0 60px rgba(255,255,255,0.25), 0 20px 60px rgba(73,190,216,0.45)',
                    }}
                  />
                  {/* highlight */}
                  <div className="absolute top-[28%] left-[30%] w-12 h-12 rounded-full bg-white/40 blur-md" />
                  {/* nodes */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#49BED8] shadow-[0_0_20px_#49BED8]" />
                  <div className="absolute bottom-4 right-6 w-2 h-2 rounded-full bg-[#D4EDFC] shadow-[0_0_15px_#D4EDFC]" />
                  <div className="absolute top-1/2 left-0 w-2.5 h-2.5 rounded-full bg-[#49BED8] shadow-[0_0_18px_#49BED8]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustMarquee />

        {/* ============== 2. КОМПАНИЯ В ЦИФРАХ — тёмная сцена ============== */}
        <section className="relative bg-brand-dark nr-bg-n nr-pattern-n">
          <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28 relative z-10">
            <div className="text-center mb-12">
              <p className="nr-iriska text-2xl md:text-3xl mb-3">результат, который можно посчитать</p>
              <h2 className="font-golos text-3xl md:text-5xl font-bold text-white tracking-tight">
                Компания в цифрах
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map(({ value, suffix, label, decimals }) => (
                <div key={label} className="nr-glass rounded-2xl p-5 md:p-7 text-center">
                  <div className="font-golos text-4xl md:text-5xl font-bold text-brand-teal mb-3 tracking-tight">
                    <AnimatedNumber value={value} suffix={suffix} decimals={decimals ?? 0} />
                  </div>
                  <p className="text-sm text-white/70 leading-snug">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="rounded-2xl border border-brand-teal/40 bg-[rgba(73,190,216,0.08)] px-6 py-5 text-center">
                <p className="text-base md:text-lg text-white/90">
                  Ключевая метрика работы — <span className="text-brand-teal font-semibold">сумма ненужных расходов</span>,
                  которых удалось избежать клиентам.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============== 3. С КЕМ УЖЕ РАБОТАЛИ — светлая ============== */}
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="font-golos text-2xl md:text-4xl font-bold text-foreground mb-10 text-center tracking-tight">
              С кем уже работали и для кого создавали решения
            </h2>
          </div>
          <Partners />
        </section>

        {/* ============== 4. ВНЕШНИЙ ВЗГЛЯД — светло-серая ============== */}
        <section className="bg-brand-soft py-20 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="max-w-3xl mb-12">
              <h2 className="font-golos text-3xl md:text-4xl font-bold text-foreground mb-5 tracking-tight">
                Когда компании нужен внешний взгляд на цифровое развитие
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                К цифровому развитию стоит подходить не с покупки программы или выбора подрядчика,
                а с понимания, какие процессы действительно требуют изменений. Сначала нужно увидеть
                ручную нагрузку, точки потерь, дублирование и задачи, которые мешают компании работать
                быстрее и спокойнее.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {externalViewCards.map(({ icon: Icon, title, text }) => (
                <div key={title} className="nr-card-light rounded-2xl p-7">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#EAF8FC] mb-5">
                    <Icon className="h-6 w-6 text-[#037083]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-golos text-xl font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MarqueeText />

        {/* ============== 5. С ЧЕГО НАЧАТЬ — белая ============== */}
        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="max-w-3xl mb-12">
              <h2 className="font-golos text-3xl md:text-4xl font-bold text-foreground mb-5 tracking-tight">
                С чего можно начать
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Начинать можно с короткой стратегической встречи, разработки стратегии или глубокого
                аудита. Формат зависит от того, насколько понятна текущая задача и насколько подробно
                нужно разбирать компанию.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
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
              ].map((card, i) => (
                <div key={card.title} className="nr-card-light flex flex-col rounded-2xl p-7 relative">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#037083] font-semibold mb-4">
                    Формат · 0{i + 1}
                  </div>
                  <h3 className="font-golos text-xl font-bold text-foreground mb-3 leading-snug">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{card.text}</p>
                  <div className="mt-auto space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Цена</p>
                      <p className="font-golos text-3xl font-bold text-foreground tracking-tight">{card.price}</p>
                    </div>
                    <div className="rounded-xl bg-[#EAF8FC] border border-[#49BED8]/30 px-4 py-3">
                      <p className="text-xs uppercase tracking-wider text-[#037083] font-semibold mb-1">Результат</p>
                      <p className="text-sm text-foreground/85 leading-snug">{card.result}</p>
                    </div>
                    <Link
                      to={card.to}
                      className="nr-cta-primary inline-flex items-center justify-center w-full px-5 py-3 rounded-xl font-semibold text-sm"
                    >
                      Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/services" className="inline-flex items-center text-[#037083] hover:text-[#49BED8] transition-colors font-semibold">
                Все форматы работы <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============== 6. ФИЛОСОФИЯ РАБОТЫ — тёмная сцена ============== */}
        <section className="relative bg-brand-dark nr-bg-n nr-pattern-n overflow-hidden">
          <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28 relative z-10">
            <div className="text-center mb-14">
              <p className="nr-iriska text-2xl md:text-3xl mb-3">сначала система — потом инструмент</p>
              <h2 className="font-golos text-3xl md:text-5xl font-bold text-white tracking-tight">
                Философия работы
              </h2>
            </div>

            {/* Formula */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-16">
              {["Человек", "Процессы", "Бизнес", "Технологии"].map((word, i, arr) => (
                <div key={word} className="flex items-center gap-3 md:gap-6">
                  <span className="font-golos text-xl md:text-3xl font-bold text-white px-4 py-2 rounded-xl border border-brand-teal/30 bg-[rgba(73,190,216,0.06)]">
                    {word}
                  </span>
                  {i < arr.length - 1 && (
                    <ArrowRight className="h-6 w-6 md:h-8 md:w-8 text-brand-teal" strokeWidth={2.2} />
                  )}
                </div>
              ))}
            </div>

            {/* Orbit scheme */}
            <div className="relative mx-auto w-[300px] h-[300px] md:w-[460px] md:h-[460px] mb-14">
              <div className="absolute inset-0 rounded-full border border-brand-teal/25" />
              <div className="absolute inset-10 rounded-full border border-brand-teal/15" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(73,190,216,0.18)_0%,transparent_60%)] blur-2xl" />

              {/* center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-[radial-gradient(circle_at_30%_30%,#49BED8,#037083_70%,#0a3d48)] flex items-center justify-center shadow-[0_0_60px_rgba(73,190,216,0.5)]">
                  <span className="font-golos text-white font-bold text-sm md:text-base tracking-[0.2em]">СИСТЕМА</span>
                </div>
              </div>

              {/* satellites */}
              {[
                { label: "Человек", style: "top-0 left-1/2 -translate-x-1/2" },
                { label: "Процессы", style: "right-0 top-1/2 -translate-y-1/2" },
                { label: "Бизнес", style: "bottom-0 left-1/2 -translate-x-1/2" },
                { label: "Технологии", style: "left-0 top-1/2 -translate-y-1/2" },
              ].map((s) => (
                <div key={s.label} className={`absolute ${s.style}`}>
                  <div className="nr-glass rounded-full px-4 py-2 md:px-5 md:py-2.5">
                    <span className="text-white text-sm md:text-base font-semibold whitespace-nowrap">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto space-y-4 text-center">
              <p className="text-base md:text-lg text-white/85 leading-relaxed">
                Сначала разбираем работу людей и процессы, потом подбираем цифровые инструменты.
                Решение должно прижиться в ежедневной работе команды, а не остаться отдельной системой.
              </p>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                Каждый инструмент должен работать в привычной среде компании, снижать ручную
                нагрузку и помогать руководителю видеть ситуацию яснее.
              </p>
            </div>
          </div>
        </section>

        {/* ============== 7. РЕЗУЛЬТАТЫ КЛИЕНТОВ — светлая ============== */}
        <section className="bg-brand-soft py-20 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <p className="nr-iriska text-2xl md:text-3xl mb-3">сохранённые расходы клиентов</p>
              <h2 className="font-golos text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                Результаты клиентов
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Грузовой Экспресс",
                  text: "Перевозчик на север. Заявки приходили из разных каналов, терялись и дублировались. Вместо сложной CRM собрали рабочую схему: голос, Telegram и Excel.",
                  result: "Заявки стали попадать в единую рабочую систему, руководитель получил понятный контроль.",
                  metric: "система контроля",
                  to: "/cases/cargo-express",
                },
                {
                  title: "АкТрансСервис",
                  text: "Транспорт, вахта, нефтегаз. В работе было 53 000 позиций. Вместо дорогого внешнего решения собрали другой путь и внедрили инструменты под реальные задачи компании.",
                  result: "Сохранено 1,7 млн ₽ за квартал.",
                  metric: "1,7 млн ₽",
                  to: "/cases/aktransservice",
                },
                {
                  title: "Крайпотребсоюз",
                  text: "51 организация и 300+ точек. Для компании был создан НейроТендеролог, которым больше года пользуются 8 компаний.",
                  result: "Сохранено 1,3 млн ₽ за квартал.",
                  metric: "1,3 млн ₽",
                  to: "/cases/kraypotrebsoyuz",
                },
              ].map((c) => (
                <div key={c.title} className="nr-card-light flex flex-col rounded-2xl p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#EAF8FC] border border-[#49BED8]/30 flex items-center justify-center font-golos font-bold text-[#037083]">
                      {c.title[0]}
                    </div>
                    <h3 className="font-golos text-lg font-bold text-foreground leading-tight">{c.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{c.text}</p>

                  <div className="rounded-xl bg-[#232719] p-5 mb-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-teal mb-2 font-semibold">Результат</p>
                    <p className="font-golos text-2xl font-bold text-brand-teal mb-1 tracking-tight">{c.metric}</p>
                    <p className="text-xs text-white/70 leading-snug">{c.result}</p>
                  </div>

                  <Link
                    to={c.to}
                    className="nr-cta-ghost mt-auto inline-flex items-center justify-center w-full px-5 py-3 rounded-xl font-semibold text-sm"
                    style={{ color: '#037083', borderColor: 'rgba(3,112,131,0.4)' }}
                  >
                    Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                to="/cases"
                className="nr-cta-primary inline-flex items-center px-7 py-4 rounded-xl font-semibold text-base"
              >
                Смотреть все кейсы <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============== 8. О НАС ГОВОРЯТ — тёмная ============== */}
        <section className="relative bg-brand-dark nr-bg-n nr-pattern-n">
          <div className="container mx-auto max-w-6xl px-4 py-20 md:py-24 relative z-10">
            <h2 className="font-golos text-3xl md:text-5xl font-bold text-white mb-12 text-center tracking-tight">
              О нас говорят
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
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
                  className="nr-glass rounded-2xl p-7 md:p-9 relative border-l-2 border-l-[#49BED8]"
                >
                  <Quote className="h-10 w-10 text-brand-teal mb-4 opacity-80" strokeWidth={1.5} />
                  <blockquote className="text-lg md:text-xl text-white/95 leading-relaxed mb-6">
                    «{q.quote}»
                  </blockquote>
                  <figcaption className="text-sm">
                    <div className="font-semibold text-white">{q.author}</div>
                    <div className="text-white/60">{q.role}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============== 9. ОТЗЫВЫ (скриншоты) — светлая ============== */}
        <Testimonials />

        {/* ============== 10. КОМУ ПОМОГАЕМ — белая ============== */}
        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="max-w-3xl mb-10">
              <h2 className="font-golos text-3xl md:text-4xl font-bold text-foreground mb-5 tracking-tight">
                Кому помогаем
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Работаю с собственниками и руководителями компаний от 5 до 300 сотрудников.
              </p>
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-[#037083] font-semibold mb-5">
              Основные сферы
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 mb-10">
              {["производство", "транспорт", "торговля", "нефтегаз", "услуги"].map((s) => (
                <span
                  key={s}
                  className="nr-tag rounded-full px-5 py-3 md:px-6 md:py-3.5 text-base md:text-lg font-semibold text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>

            <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
              Особенно полезна компаниям без сильной штатной IT-команды, где цифровые изменения
              нужно внедрять поэтапно, с понятной пользой и без перегруза сотрудников.
            </p>
          </div>
        </section>

        {/* ============== 11. ФИНАЛЬНЫЙ CTA — тёмно-бирюзовый ============== */}
        <section
          id="contact"
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #232719 0%, #037083 100%)' }}
        >
          {/* Big N */}
          <div
            aria-hidden
            className="absolute -right-10 -bottom-24 font-golos font-extrabold pointer-events-none select-none"
            style={{
              fontSize: 'clamp(20rem, 50vw, 42rem)',
              lineHeight: 0.8,
              color: '#49BED8',
              opacity: 0.08,
              letterSpacing: '-0.05em',
            }}
          >
            N
          </div>
          {/* glow */}
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(73,190,216,0.25),transparent_70%)]" />

          <div className="relative container mx-auto max-w-4xl px-4 py-24 md:py-32 text-center">
            <p className="nr-iriska text-3xl md:text-4xl mb-4">начните с понятного первого шага</p>
            <h2 className="font-golos text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Начните с понятного первого шага
            </h2>
            <p className="text-base md:text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Если пока не знаете, какой формат подойдёт, начните со страницы выбора. Она поможет
              понять, что сейчас актуальнее: стратегическая встреча, стратегия, аудит, обучение,
              внедрение или сопровождение.
            </p>
            <Link
              to="/start"
              className="nr-cta-primary inline-flex items-center px-8 py-5 rounded-xl font-semibold text-base md:text-lg"
            >
              Подобрать формат работы <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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
