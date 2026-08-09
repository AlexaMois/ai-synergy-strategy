import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Cog,
  Compass,
  FileText,
  Layers,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";

import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import RelatedBlogPosts from "@/components/RelatedBlogPosts";
import { generateBreadcrumbSchema } from "@/utils/breadcrumbSchema";
import { trackCTAClick } from "@/utils/analytics";

const TITLE = "Автоматизация бизнес-процессов с ИИ для бизнеса";
const DESCRIPTION =
  "Автоматизация бизнес-процессов с ИИ: документооборот, продажи, контроль качества, отчётность. Аудит процессов, проектирование решения, сопровождение внедрения. Средний срок окупаемости решений — 3 месяца.";
const URL = "https://aleksamois.ru/services/automation/";

const processBlocks: { title: string; summary: string; bullets: string[] }[] = [
  {
    title: "Документооборот и первичка",
    summary:
      "Распознавание счетов, актов, договоров, ТТН и УПД. Автоматическая сверка с 1С/CRM, маршрутизация согласований, ответы по типовым запросам в почте и Telegram.",
    bullets: [
      "Меньше ручной обработки документов и повторного ввода данных",
      "Сверка реквизитов, сумм, НДС, дат и контрагентов",
      "Интеграции с 1С, Контур, Диадок, СБИС, Bitrix24",
    ],
  },
  {
    title: "Продажи и обработка заявок",
    summary:
      "Голосовые и текстовые ассистенты на входящие звонки и заявки, квалификация лида, передача в CRM, напоминания и контроль воронки.",
    bullets: [
      "Голосовой ассистент на типовые и пропущенные звонки",
      "Скоринг и тегирование лидов по контексту разговора",
      "Автонапоминания, повторные касания, отчёты руководителю",
    ],
  },
  {
    title: "Поиск по корпоративной базе знаний",
    summary:
      "Система поиска DocSearch по регламентам, договорам, инструкциям и переписке. Сотрудник получает ответ со ссылкой на источник за секунды.",
    bullets: [
      "Семантический поиск с ссылками на оригинальные документы",
      "Контроль доступа по ролям и подразделениям",
      "Локальные модели и закрытый контур для чувствительных данных",
    ],
  },
  {
    title: "Контроль качества и отчётность",
    summary:
      "Анализ звонков и переписок менеджеров, контроль чек-листов, фиксация отклонений в производстве, автоматические отчёты руководителю.",
    bullets: [
      "100% звонков и обращений вместо выборочной прослушки",
      "Сводки по сменам, бригадам, точкам и менеджерам",
      "Алерты по критичным отклонениям в Telegram",
    ],
  },
];

const stages: { step: string; title: string; desc: string }[] = [
  {
    step: "01",
    title: "Разбор процессов и карта потерь",
    desc: "Разбираю ключевые цепочки «от заявки до денег», считаю стоимость рутины, фиксирую процессы, где ИИ даст максимальный эффект.",
  },
  {
    step: "02",
    title: "Архитектура и экономика",
    desc: "Проектирую решение под ваши системы (1С, CRM, Telegram, порталы) и считаю срок окупаемости в трёх сценариях.",
  },
  {
    step: "03",
    title: "Проектирование и разработка решения",
    desc: "Собираем решение под один процесс, фиксируем метрики до и после, проверяем результат на реальных данных и пользователях.",
  },
  {
    step: "04",
    title: "Масштабирование и сопровождение",
    desc: "Подключаем смежные процессы и подразделения, передаём документацию, ведём поддержку и развиваем систему.",
  },
];

const whatYouGet: string[] = [
  "Автоматизированный процесс с метриками до/после",
  "Интеграции с 1С, CRM и мессенджерами",
  "Документация и инструкции для команды",
  "Контур безопасности с учётом 152-ФЗ",
  "Поддержка после запуска и план развития",
  "Прозрачная экономика и расчёт срока окупаемости",
];

const workFormats: { title: string; price: string; href: string }[] = [
  { title: "Стратегическая встреча по цифровизации для собственника", price: "17 000 ₽", href: "/services/owner-digital-session" },
  { title: "Разработка стратегии цифрового развития бизнеса", price: "78 000 ₽", href: "/services/digital-development-strategy" },
  { title: "Глубокий аудит компании для цифровизации", price: "от 116 000 ₽", href: "/services/digital-audit" },
  { title: "Авторская программа «Цифровые инструменты для бизнеса»", price: "68 000–152 000 ₽", href: "/services/digital-tools-program" },
  { title: "Проектирование и разработка цифрового решения под бизнес-процесс", price: "от 260 000 ₽", href: "/services/digital-solution-design" },
  { title: "Сопровождение цифрового внедрения", price: "89 000–170 000 ₽/мес", href: "/services/implementation-support" },
  { title: "Сопровождение цифровых инструментов компании", price: "35 000–89 000 ₽/мес", href: "/services/digital-tools-support" },
];

const whyMatters: { metric: string; text: string }[] = [
  { metric: "9–12 ч", text: "экономии в неделю на приёме и обработке заявок (кейс «Грузовой Экспресс»)" },
  { metric: "7", text: "форматов работы — от стратегической встречи до сопровождения" },
  { metric: "3 мес", text: "средняя окупаемость решений по нашим проектам" },
];

const faq: { q: string; a: string }[] = [
  {
    q: "Что такое автоматизация бизнес-процессов с ИИ?",
    a: "Это перевод рутинных операций — обработки документов, звонков, заявок, поиска по базе знаний, контроля качества — на ИИ-ассистентов и роботов, встроенных в ваши CRM, 1С, Telegram и порталы. ИИ работает не вместо людей, а вместо ручной рутины: сотрудники остаются на смысловых задачах, а время и деньги перестают утекать.",
  },
  {
    q: "Какие процессы автоматизируются в первую очередь?",
    a: "Чаще всего это документооборот и первичка, приём и обработка заявок, поиск по корпоративной базе знаний и отчётность. Конкретный список выбираем на разборе процессов — по объёму ручных операций, потерям и потенциалу окупаемости.",
  },
  {
    q: "Сколько стоит автоматизация бизнес-процессов с ИИ?",
    a: "Стратегическая встреча по цифровизации для собственника — 17 000 ₽, разработка стратегии цифрового развития — 78 000 ₽, глубокий аудит компании — от 116 000 ₽. Стоимость внедрения зависит от сложности интеграций, объёма данных и требований к безопасности. Подробные сценарии — на странице цен.",
  },
  {
    q: "С чего начинается работа?",
    a: "С аудита процессов: разбираем ключевые цепочки, считаем стоимость рутины и выбираем процесс, где эффект будет максимальным. Дальше — проектирование и разработка решения и сопровождение внедрения.",
  },
  {
    q: "Когда окупается внедрение ИИ в бизнес-процессы?",
    a: "В наших кейсах средняя окупаемость решений — 3 месяца. Если расчётная окупаемость превышает 6 месяцев, я честно говорю, что проект нецелесообразен.",
  },
  {
    q: "Можно ли автоматизировать процессы без замены 1С и CRM?",
    a: "Да. Я встраиваю ИИ в существующие системы компании: 1С, Bitrix24, amoCRM, Контур, Диадок, СБИС, Telegram, Google Sheets. Замена систем — крайняя мера, обычно её удаётся избежать.",
  },
  {
    q: "Как обеспечивается безопасность данных?",
    a: "Для чувствительных данных используем закрытый контур, локальные модели и инфраструктуру в РФ. Документы и переписки не уходят в публичные облака. Доступ ограничивается ролями, ведётся журнал обращений.",
  },
  {
    q: "Что, если у нас нет ИТ-команды?",
    a: "Это нормальная ситуация для среднего бизнеса. Я закрываю весь цикл: разбор процессов, архитектура, разработка, интеграции, обучение пользователей, документация. Дальше команду можно растить из ваших сотрудников или оставить сопровождение на мне.",
  },
];

const AutomationHubPage = () => {
  const handleCTA = (where: string) => {
    trackCTAClick({ location: "services", buttonText: `automation-hub:${where}` });
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Главная", path: "/" },
    { name: "Услуги", path: "/services" },
    { name: "Автоматизация бизнес-процессов с ИИ", path: "/services/automation" },
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Автоматизация бизнес-процессов с ИИ",
    description: DESCRIPTION,
    provider: {
      "@type": "Person",
      name: "Александра Моисеева",
      url: "https://aleksamois.ru/about",
    },
    areaServed: { "@type": "Country", name: "Россия" },
    serviceType: "AI Business Process Automation",
    url: URL,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="автоматизация бизнес процессов, автоматизация бизнес процессов с ии, внедрение ии в бизнес, ии для бизнеса, автоматизация документооборота"
        />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <PageBreadcrumbs
            currentPage="Автоматизация бизнес-процессов"
            parentPages={[{ label: "Услуги", href: "/services" }]}
          />

          {/* Hero */}
          <section className="py-8 md:py-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Хаб-страница</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
              Автоматизация бизнес-процессов с ИИ — под ключ, без сбоев и переделок
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mb-6">
              Я закрываю весь цикл — от разбора бизнес-процессов до решения, которое окупается в среднем за 3 месяца. Работаю с производством, торговлей, логистикой и услугами. Без замены 1С и CRM, в вашем контуре, с прозрачной экономикой.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => handleCTA("hero")} className="gap-2">
                Обсудить задачу
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">Посмотреть цены</Link>
              </Button>
            </div>
          </section>

          {/* Why matters */}
          <section className="py-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {whyMatters.map((m, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{m.metric}</div>
                  <div className="text-sm text-foreground/70">{m.text}</div>
                </div>
              ))}
            </div>
          </section>

          {/* H2: Что такое */}
          <section className="py-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Что такое автоматизация бизнес-процессов с ИИ
            </h2>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>
                Автоматизация бизнес-процессов с ИИ — это не «купить нейросеть» и не «прикрутить чат-бота». Это перевод рутинных операций — обработки документов, звонков, заявок, поиска по базе знаний и контроля качества — на ИИ-ассистентов и роботов, встроенных в привычные инструменты команды: 1С, CRM, Telegram, корпоративные порталы.
              </p>
              <p>
                В отличие от простых скриптов и роботов, ИИ умеет работать с неструктурированными данными — голосом, текстом, сканами, фотографиями. Это делает возможными сценарии, которые раньше требовали человека: распознать счёт со сканированного PDF, понять смысл звонка клиента, найти ответ в 500 договоров за секунды.
              </p>
              <p>
                Я строю такие системы под ключ: <Link to="/services/digital-audit" className="text-primary underline">разбор процессов и аудит</Link> с расчётом экономики, <Link to="/services/digital-solution-design" className="text-primary underline">проектирование и разработка решения</Link> под ваши системы, <Link to="/services/implementation-support" className="text-primary underline">сопровождение внедрения</Link> и развитие системы.
              </p>
            </div>
          </section>

          {/* H2: Какие процессы */}
          <section className="py-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Какие процессы автоматизируем чаще всего
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {processBlocks.map((b, i) => (
                <article key={i} className="bg-card border border-border rounded-xl p-6 shadow-soft">
                  <div className="flex items-center gap-2 mb-3">
                    <Workflow className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{b.title}</h3>
                  </div>
                  <p className="text-sm text-foreground/75 mb-3">{b.summary}</p>
                  <ul className="space-y-1.5">
                    {b.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* H2: Этапы */}
          <section className="py-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Как мы внедряем автоматизацию: 4 этапа работы
            </h2>
            <div className="space-y-4">
              {stages.map((s, i) => (
                <div key={i} className="flex gap-5 bg-card border border-border rounded-xl p-5">
                  <div className="text-3xl font-bold text-primary/30 leading-none">{s.step}</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-sm text-foreground/75">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* H2: Что вы получаете */}
          <section className="py-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Что вы получаете в результате
            </h2>
            <div className="bg-gradient-to-br from-primary/5 to-background border border-border rounded-2xl p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-3">
                {whatYouGet.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/85">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* H2: Форматы работы */}
          <section className="py-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              7 форматов работы
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {workFormats.map((f) => (
                <Link
                  key={f.href}
                  to={f.href}
                  className="flex items-start justify-between gap-3 bg-card border border-border rounded-xl p-5 hover:shadow-elevated transition-all group"
                >
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{f.title}</h3>
                    <p className="text-sm text-foreground/70 mt-1">{f.price}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild>
                <Link to="/pricing">Посмотреть цены</Link>
              </Button>
            </div>
          </section>

          {/* H2: Чем мой подход отличается */}
          <section className="py-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Чем мой подход отличается от типовых подрядчиков
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-5">
                <Compass className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Сначала экономика</h3>
                <p className="text-sm text-foreground/75">
                  Считаем экономику до старта работ. Если расчётный срок окупаемости превышает 6 месяцев — честно говорю, что проект стоит пересмотреть.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <Cog className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Без привязки к подрядчику</h3>
                <p className="text-sm text-foreground/75">
                  Архитектура без жёсткой привязки к одному поставщику. Документация и доступы остаются у вас.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <ShieldCheck className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Безопасность 152-ФЗ</h3>
                <p className="text-sm text-foreground/75">
                  Закрытый контур, локальные модели, инфраструктура в РФ для чувствительных данных.
                </p>
              </div>
            </div>
          </section>

          {/* H2: Кейсы */}
          <section className="py-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Кейсы автоматизации
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/cases/kraypotrebsoyuz" className="bg-card border border-border rounded-xl p-5 hover:shadow-elevated transition-all group">
                <Layers className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Крайпотребсоюз</h3>
                <p className="text-sm text-foreground/70">Планировалась покупка серверного оборудования примерно за 1,5 млн ₽ — архитектура позволила отказаться от покупки: 1,3 млн ₽ разовой экономии капитальных затрат.</p>
              </Link>
              <Link to="/cases/cargo-express" className="bg-card border border-border rounded-xl p-5 hover:shadow-elevated transition-all group">
                <TrendingUp className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Грузовой Экспресс</h3>
                <p className="text-sm text-foreground/70">Приём, обработка и фиксация заявок: 9–12 часов экономии в неделю, потери заявок сведены к нулю.</p>
              </Link>
              <Link to="/products/doc-search" className="bg-card border border-border rounded-xl p-5 hover:shadow-elevated transition-all group">
                <FileText className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">DocSearch</h3>
                <p className="text-sm text-foreground/70">Семантический поиск по корпоративной базе знаний.</p>
              </Link>
            </div>
          </section>

          {/* H2: FAQ */}
          <section className="py-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Частые вопросы об автоматизации с ИИ
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-xl px-5"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-primary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 leading-relaxed pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA */}
          <section className="py-12">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                  Готовы посчитать, что и как автоматизировать у вас?
                </h2>
                <p className="text-foreground/75">
                  Разберём процессы, посчитаем экономию, честно скажем — где ИИ даст эффект, а где нет.
                </p>
              </div>
              <Button size="lg" onClick={() => handleCTA("footer")} className="gap-2 flex-shrink-0">
                Обсудить задачу
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </section>
        </div>

        <RelatedBlogPosts slugs={["why-ai-projects-fail", "ai-roi-calculation", "ai-synergy-framework"]} />

        <Contact />
      </main>

      <Footer />
    </PageTransition>
  );
};

export default AutomationHubPage;