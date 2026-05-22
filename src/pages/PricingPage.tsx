import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import FAQTeaser from "@/components/FAQTeaser";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Layers, Users, Database, Server, LifeBuoy, ShieldCheck } from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import { trackCTAClick } from "@/utils/analytics";
import brainHeartSketch from "@/assets/sketches/brain-heart-sketch.png";
import chatHeartSketch from "@/assets/sketches/chat-heart-sketch.png";
import routeWarmSketch from "@/assets/sketches/route-warm-sketch.png";
import auditCareSketch from "@/assets/sketches/audit-care-sketch.png";
import bookAiSketch from "@/assets/sketches/book-ai-sketch.png";
import handsChipSketch from "@/assets/sketches/hands-chip-sketch.png";
import blueprintPlantSketch from "@/assets/sketches/blueprint-plant-sketch.png";
import teaLaptopSketch from "@/assets/sketches/tea-laptop-sketch.png";

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
  const cls = `group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 ${styles} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className={`flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full ${iconBg} group-hover:translate-x-0.5 transition-transform`}>
        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
      </span>
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
};

const PricingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContact = () => {
    trackCTAClick({ location: 'pricing' });
    if (location.pathname !== '/pricing') {
      const el = document.querySelector('#contact');
      if (el) {
        const offset = el.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: offset, behavior: "smooth" });
        return;
      }
    }
    const el = document.querySelector('#contact');
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const formats = [
    {
      sketch: chatHeartSketch,
      name: "Стратегическая встреча по цифровизации для собственника",
      when: "нужен первый шаг",
      result: "приоритеты и следующий шаг",
      price: "17 000 ₽",
    },
    {
      sketch: routeWarmSketch,
      name: "Разработка стратегии цифрового развития бизнеса",
      when: "нужен план на 90 дней",
      result: "точка А, приоритеты, план",
      price: "78 000 ₽",
    },
    {
      sketch: auditCareSketch,
      name: "Глубокий аудит компании для цифровизации",
      when: "нужен подробный разбор",
      result: "карта процессов, риски, дорожная карта",
      price: "от 116 000 ₽",
    },
    {
      sketch: bookAiSketch,
      name: "Авторская программа «Цифровые инструменты для бизнеса»",
      when: "нужно обучить команду",
      result: "единый подход к инструментам",
      price: "68 000–152 000 ₽",
    },
    {
      sketch: handsChipSketch,
      name: "Сопровождение цифрового внедрения",
      when: "нужно вести внедрение",
      result: "управляемый процесс изменений",
      price: "89 000–170 000 ₽/мес",
    },
    {
      sketch: blueprintPlantSketch,
      name: "Проектирование и разработка цифрового решения",
      when: "нужен инструмент под процесс",
      result: "рабочее цифровое решение",
      price: "от 260 000 ₽",
    },
    {
      sketch: teaLaptopSketch,
      name: "Сопровождение цифровых инструментов компании",
      when: "нужна поддержка после запуска",
      result: "стабильная работа и развитие",
      price: "35 000–89 000 ₽/мес",
    },
  ];

  const palettes = [
    "bg-surface-mint",
    "bg-surface-sand",
    "bg-surface-lavender",
    "bg-surface-blush",
    "bg-card",
    "bg-surface-mint",
    "bg-surface-sand",
  ];

  const budgetTiers = [
    {
      cap: "до 20 000 ₽",
      label: "Личная стратегическая встреча",
      bg: "bg-surface-mint",
      sketch: chatHeartSketch,
    },
    {
      cap: "до 120 000 ₽",
      label: "Стратегия или аудит",
      bg: "bg-surface-lavender",
      sketch: routeWarmSketch,
    },
    {
      cap: "от 260 000 ₽",
      label: "Разработка решения или внедрение",
      bg: "bg-surface-blush",
      sketch: blueprintPlantSketch,
    },
  ];

  const factors = [
    { icon: Layers, text: "Количество процессов" },
    { icon: Users, text: "Количество участников" },
    { icon: Database, text: "Объём данных и документов" },
    { icon: Server, text: "Наличие текущих систем: CRM, 1С, таблицы, порталы" },
    { icon: LifeBuoy, text: "Глубина сопровождения" },
    { icon: ShieldCheck, text: "Требования к безопасности и российской инфраструктуре" },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Стоимость цифровизации бизнеса — форматы работы и цены | Александра Моисеева</title>
        <meta name="description" content="Базовые ориентиры стоимости: стратегическая встреча, аудит, проектирование и сопровождение цифровых решений. Чтобы собственник сразу понимал порядок бюджета." />
        <meta name="keywords" content="стоимость цифровизации, цены автоматизации бизнеса, стратегия цифрового развития, аудит компании" />
        <link rel="canonical" href="https://aleksamois.ru/pricing" />
        <meta property="og:title" content="Стоимость цифровизации бизнеса — форматы работы и цены | Александра Моисеева" />
        <meta property="og:description" content="Базовые ориентиры стоимости форматов работы по цифровизации бизнеса." />
        <meta property="og:url" content="https://aleksamois.ru/pricing" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbs.pricing())}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <PageBreadcrumbs currentPage="Цены" />

        <main>
          {/* HERO — лавандовая плашка */}
          <section className="pt-8 md:pt-12 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="relative rounded-[32px] md:rounded-[40px] bg-surface-lavender overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
                <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 py-12 md:py-20">
                  <div className="md:col-span-7">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6">
                      Цены
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-foreground mb-6">
                      Форматы работы{" "}
                      <span className="font-iriska font-normal italic text-accent">
                        и стоимость
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/75 mb-10 max-w-2xl leading-snug">
                      Стоимость зависит от масштаба компании, количества процессов и глубины
                      участия. Ниже — базовые ориентиры, чтобы собственник сразу понимал порядок
                      бюджета и мог выбрать подходящий формат.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <PillButton to="/start" variant="dark">
                        Подобрать формат работы
                      </PillButton>
                      <button
                        type="button"
                        onClick={scrollToContact}
                        className="inline-flex items-center text-foreground/80 hover:text-foreground underline-offset-4 hover:underline font-semibold text-base md:text-lg px-2 py-2"
                      >
                        Обсудить задачу <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-5 flex justify-center md:justify-end">
                    <img
                      src={brainHeartSketch}
                      alt=""
                      width={800}
                      height={800}
                      className="w-56 md:w-72 lg:w-80 h-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Таблица цен — главный блок */}
          <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-5">
                Базовые{" "}
                <span className="font-iriska font-normal italic text-accent">ориентиры</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Семь форматов работы — от первой встречи до сопровождения после запуска. Цена даёт
                порядок бюджета; финальная стоимость уточняется по вашей задаче.
              </p>
            </div>

            {/* Desktop — таблица в стиле плашки */}
            <div className="hidden lg:block rounded-[32px] bg-card overflow-hidden shadow-plate ring-1 ring-foreground/5">
              <div className="grid grid-cols-12 px-8 py-5 border-b border-foreground/10 bg-foreground text-background">
                <div className="col-span-5 text-sm uppercase tracking-widest font-semibold">Формат</div>
                <div className="col-span-3 text-sm uppercase tracking-widest font-semibold">Когда подходит</div>
                <div className="col-span-2 text-sm uppercase tracking-widest font-semibold">Результат</div>
                <div className="col-span-2 text-sm uppercase tracking-widest font-semibold text-right">Стоимость</div>
              </div>
              {formats.map((f, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-12 px-8 py-6 items-center gap-4 border-b border-foreground/5 last:border-b-0 ${i % 2 === 1 ? "bg-muted/30" : ""}`}
                >
                  <div className="col-span-5 flex items-center gap-4">
                    <img src={f.sketch} alt="" width={80} height={80} loading="lazy" className="w-14 h-14 object-contain flex-shrink-0" />
                    <h3 className="text-base xl:text-lg font-semibold text-foreground leading-tight">{f.name}</h3>
                  </div>
                  <div className="col-span-3 text-sm text-muted-foreground">{f.when}</div>
                  <div className="col-span-2 text-sm text-muted-foreground">{f.result}</div>
                  <div className="col-span-2 text-right">
                    <span className="text-lg font-bold text-foreground">{f.price}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile — плашки */}
            <div className="grid gap-4 lg:hidden">
              {formats.map((f, i) => (
                <div
                  key={i}
                  className={`relative rounded-[24px] ${palettes[i % palettes.length]} p-6 overflow-hidden shadow-card ring-1 ring-foreground/5`}
                >
                  <img
                    src={f.sketch}
                    alt=""
                    width={256}
                    height={256}
                    loading="lazy"
                    className="absolute -bottom-3 -right-3 w-28 h-auto object-contain opacity-90 pointer-events-none"
                  />
                  <p className="text-xs uppercase tracking-widest text-foreground/60 font-semibold mb-2 max-w-[75%]">
                    {f.when}
                  </p>
                  <h3 className="text-lg font-bold text-foreground leading-tight mb-3 max-w-[75%]">
                    {f.name}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-4 max-w-[75%]">{f.result}</p>
                  <p className="text-xl font-bold text-foreground relative">{f.price}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Как выбрать бюджет */}
          <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                Как выбрать{" "}
                <span className="font-iriska font-normal italic text-accent">бюджет</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Три понятных диапазона — от пробной встречи до полноценного внедрения.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {budgetTiers.map((t, i) => (
                <div
                  key={i}
                  className={`relative rounded-[28px] ${t.bg} p-8 overflow-hidden shadow-card ring-1 ring-foreground/5 min-h-[260px] flex flex-col`}
                >
                  <img
                    src={t.sketch}
                    alt=""
                    width={256}
                    height={256}
                    loading="lazy"
                    className="absolute -bottom-4 -right-4 w-36 h-auto object-contain opacity-90 pointer-events-none"
                  />
                  <p className="text-3xl md:text-4xl font-bold text-foreground relative max-w-[70%] mb-4 leading-tight">
                    {t.cap}
                  </p>
                  <p className="text-base text-foreground/75 relative max-w-[70%] mt-auto">
                    {t.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Что влияет на стоимость — тёмная плашка */}
          <section className="px-4 md:px-6 pb-16 md:pb-24">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[32px] md:rounded-[40px] bg-foreground overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-14 md:py-20">
                <div className="max-w-3xl mb-12">
                  <h2 className="text-3xl md:text-5xl font-bold text-background leading-[1.05] mb-5">
                    Что влияет на{" "}
                    <span className="font-iriska font-normal italic text-accent">стоимость</span>
                  </h2>
                  <p className="text-base md:text-lg text-background/70">
                    Шесть факторов, которые задают итоговую цену проекта.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                  {factors.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <Icon className="w-7 h-7 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <p className="text-base md:text-lg text-background/90 leading-snug">{f.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Финальный призыв — бирюзовая плашка */}
          <section className="px-4 md:px-6 pb-16 md:pb-24">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[32px] md:rounded-[40px] bg-accent overflow-hidden shadow-plate ring-1 ring-foreground/5">
                <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 py-14 md:py-20">
                  <div className="md:col-span-7">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-background leading-[1.05] mb-5">
                      Начните с подходящего{" "}
                      <span className="font-iriska font-normal italic text-background/95">формата</span>
                    </h2>
                    <p className="text-base md:text-lg text-background/85 mb-10 max-w-xl">
                      Если не уверены, какой бюджет закладывать, начните со страницы выбора формата —
                      она поможет сориентироваться за пару минут.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <PillButton to="/start" variant="light">
                        Подобрать формат работы
                      </PillButton>
                      <PillButton onClick={scrollToContact} variant="dark">
                        Обсудить задачу
                      </PillButton>
                    </div>
                  </div>
                  <div className="md:col-span-5 flex justify-center md:justify-end">
                    <img
                      src={routeWarmSketch}
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

          {/* Реальный пример */}
          <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                Реальный{" "}
                <span className="font-iriska font-normal italic text-accent">пример</span>
              </h2>
            </div>
            <div className="rounded-[32px] bg-surface-mint overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-12 md:py-16">
              <div className="grid md:grid-cols-12 gap-10 items-start">
                <div className="md:col-span-7">
                  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                    Грузовой Экспресс
                  </p>
                  <h3 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-6">
                    Бюджет проекта{" "}
                    <span className="font-iriska font-normal italic text-accent">80 000 ₽</span>
                  </h3>
                  <p className="text-base md:text-lg text-foreground/75 leading-relaxed mb-6 max-w-xl">
                    Логистическая компания, 15 человек. Автоматизация через Telegram-бота —
                    маленький бюджет, заметный результат за счёт правильной архитектуры.
                  </p>
                  <PillButton to="/cases/cargo-express" variant="dark">
                    Смотреть разбор
                  </PillButton>
                </div>
                <div className="md:col-span-5 md:pt-2">
                  <ul className="space-y-5">
                    {[
                      "Экономия 3–4 часа в неделю",
                      "99% точность маршрутов",
                      "Окупаемость за 3 недели",
                    ].map((t, i) => (
                      <li key={i} className="flex items-start gap-3 text-base md:text-lg text-foreground/85">
                        <span className="text-accent font-bold mt-0.5">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Узнайте точную стоимость */}
          <section className="px-4 md:px-6 pb-16 md:pb-24">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[32px] md:rounded-[40px] bg-surface-sand overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-14 md:py-20 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5 max-w-3xl mx-auto">
                  Узнайте точную стоимость для{" "}
                  <span className="font-iriska font-normal italic text-accent">вашей компании</span>
                </h2>
                <p className="text-base md:text-lg text-foreground/75 mb-10 max-w-2xl mx-auto">
                  Запишитесь на бесплатную 30-минутную консультацию. Я оценю ваши процессы и назову
                  конкретную цифру с объяснением, за что вы платите.
                </p>
                <div className="flex justify-center">
                  <PillButton onClick={scrollToContact} variant="turquoise">
                    Заказать звонок
                  </PillButton>
                </div>
              </div>
            </div>
          </section>

          <FAQTeaser
            items={[
              { question: "От чего зависит итоговая цена?", answer: "От масштаба процессов, объёма данных, нужной интеграции и уровня сопровождения. После диагностики называю конкретную цифру с расшифровкой." },
              { question: "Есть ли фиксированная стоимость?", answer: "Да. Диагностика и пилот фиксируются по объёму и срокам. Сопровождение — по выбранному тарифу." },
              { question: "Можно ли оплачивать поэтапно?", answer: "Да. Работа разбита на этапы: диагностика, архитектура, пилот, масштабирование. Каждый этап оплачивается отдельно." },
              { question: "Что если результата не будет?", answer: "Диагностика как раз для того, чтобы не браться за нерентабельные задачи. Если решение не даст эффекта — я скажу об этом до старта пилота." },
            ]}
          />
          <Contact />
          <Partners />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default PricingPage;