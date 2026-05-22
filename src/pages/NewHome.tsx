import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Briefcase, FolderOpen, Wallet, User, Phone, Hand, Eye, Layers, Compass as CompassIcon, Quote } from "lucide-react";
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
        <section className="container mx-auto max-w-6xl px-4 pt-28 md:pt-36 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground mb-4">
              Александра Моисеева
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-6">
              Эксперт и архитектор цифрового развития бизнеса
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-8">
              Основатель агентства «НейроРешения». Помогаю собственникам и руководителям понять,
              какие процессы стоит перевести в цифровой формат первыми, как снизить ручную нагрузку
              и как внедрять инструменты поэтапно.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/start">
                  Подобрать формат работы <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/services">Посмотреть услуги</Link>
              </Button>
            </div>
          </div>
        </section>

        <TrustMarquee />

        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
              <div className="md:col-span-5">
                <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                  Компания в цифрах
                </p>
                <div className="text-6xl md:text-8xl font-bold text-foreground leading-none mb-4">
                  <AnimatedNumber value={360} suffix="" />
                </div>
                <p className="text-lg md:text-xl text-foreground/80 mb-6">
                  диагностик за 3,5 года практики
                </p>
                <p className="text-sm md:text-base text-muted-foreground max-w-md">
                  Ключевая метрика работы — сумма ненужных расходов, которых удалось избежать клиентам.
                </p>
              </div>
              <div className="md:col-span-7 grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
                {stats.slice(1).map(({ value, suffix, label, decimals }) => (
                  <div key={label} className="bg-card p-5 md:p-7">
                    <div className="text-2xl md:text-4xl font-bold text-foreground mb-1">
                      <AnimatedNumber value={value} suffix={suffix} decimals={decimals ?? 0} />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-snug">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="pt-16 md:pt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center container mx-auto max-w-6xl px-4">
            С кем уже работали и для кого создавали решения
          </h2>
          <Partners />
        </div>

        <section className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-5">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Когда компании нужен внешний взгляд на цифровое развитие
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-3">
              <p className="text-base md:text-lg text-muted-foreground">
                К цифровому развитию стоит подходить не с покупки программы или выбора подрядчика,
                а с понимания, какие процессы действительно требуют изменений. Сначала нужно увидеть
                ручную нагрузку, точки потерь, дублирование и задачи, которые мешают компании
                работать быстрее и спокойнее.
              </p>
            </div>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {externalViewCards.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="grid md:grid-cols-12 gap-6 py-6 md:py-8 items-start"
              >
                <div className="md:col-span-1 text-3xl md:text-4xl font-bold text-accent/60 tabular-nums">
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

        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                Результаты клиентов
              </h2>
              <Link to="/cases" className="inline-flex items-center text-accent hover:underline font-medium">
                Смотреть все кейсы <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-12 gap-4">
              {/* Featured large case */}
              <Link
                to="/cases/aktransservice"
                className="md:col-span-7 md:row-span-2 group flex flex-col justify-between rounded-2xl bg-foreground text-background p-8 md:p-10 min-h-[320px] hover:bg-foreground/90 transition-colors"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
                    Кейс · Транспорт · Нефтегаз
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">АкТрансСервис</h3>
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
                className="md:col-span-5 group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 md:p-7 min-h-[150px] hover:border-accent transition-colors"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Кейс
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Крайпотребсоюз</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    51 организация и 300+ точек. Создан НейроТендеролог, которым больше года пользуются 8 компаний.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">1,3 млн ₽ / квартал</span>
                  <ArrowRight className="h-5 w-5 text-foreground/60 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link
                to="/cases/cargo-express"
                className="md:col-span-5 group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 md:p-7 min-h-[150px] hover:border-accent transition-colors"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Кейс
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Грузовой Экспресс</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Перевозчик на север. Вместо сложной CRM собрали рабочую схему: голос, Telegram и Excel.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground/80">Единая система заявок</span>
                  <ArrowRight className="h-5 w-5 text-foreground/60 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-20 md:py-28">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6 text-center">
            О нас говорят
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

        <section className="bg-foreground text-background py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5">
                <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                  Кому помогаем
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Компании от 5 до 300 сотрудников
                </h2>
                <p className="text-base md:text-lg text-background/70">
                  Работаю с собственниками и руководителями. Особенно полезна компаниям без сильной
                  штатной IT-команды, где цифровые изменения нужно внедрять поэтапно — с понятной
                  пользой и без перегруза сотрудников.
                </p>
              </div>
              <div className="md:col-span-7">
                <div className="flex flex-wrap gap-3">
                  {["производство", "транспорт", "торговля", "нефтегаз", "услуги"].map((s) => (
                    <span
                      key={s}
                      className="text-lg md:text-2xl font-bold px-5 py-3 rounded-full border border-background/20 text-background hover:border-accent hover:text-accent transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
