
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import PillButton from "@/components/PillButton";
import { caseForPath } from "@/data/caseStudies";
import { useNavigate, useParams } from "react-router-dom";
import AkTransServiceContent from "./AkTransServiceContent";
import { scrollToContact } from "@/lib/scrollToContact";

interface CaseData {
  slug: string;
  title: string;
  subtitle: string;
  targetAudience: string;
  industry: string;
  price: string;
  status: string;
  task: string;
  actions: string[];
  results: string[];
  quote?: string;
}

const casesData: Record<string, CaseData> = {
  "aktransservice": {
    slug: "aktransservice",
    title: "АкТрансСервис",
    subtitle: "Как связали документы, знания и рабочие процессы в одну цифровую систему",
    targetAudience: "транспортная компания, работа на вахте и в нефтегазовом секторе",
    industry: "Транспорт · Вахта · Нефтегаз",
    price: "—",
    status: "действующий",
    task: "Портал собирает документы и права доступа, Jarvis помогает сотрудникам работать с корпоративными знаниями, а автоматизации на локальном сервере сами проверяют данные и доставляют результат людям.",
    actions: [
      "Разобрали процессы, данные, документы и внутренние задачи компании",
      "Спроектировали и внедрили 5 цифровых инструментов за 2 месяца",
      "Собрали рабочую архитектуру под реальные процессы компании",
      "Отказались от дорогого внешнего решения в пользу архитектуры под задачу",
    ],
    results: [
      "Сохранено 1,7 млн ₽ за квартал",
      "5 рабочих цифровых инструментов под процессы компании",
      "Снижена ручная нагрузка на работу с 53 000 позиций",
    ],
  },
  "production-doc-search": {
    slug: "production-doc-search",
    title: "Поиск по технической документации производственной компании",
    subtitle: "QR-код на рабочем месте → ответ из документации за 3 секунды",
    targetAudience: "производственная компания",
    industry: "производство, документооборот",
    price: "—",
    status: "действующий",
    task: "Сотрудникам нужно было быстро находить ответы в технической документации, где встречались текст, изображения и смешанные языки. Поиск вручную занимал много времени и тормозил работу на участках.",
    actions: [
      "Разобрали структуру и форматы технической документации",
      "Создали интеллектуальный поиск с учётом текста, изображений и смешанных языков",
      "Развернули доступ к поиску по QR-коду прямо на рабочем месте",
      "Настроили выдачу релевантного ответа за секунды вместо ручного просмотра",
    ],
    results: [
      "Время ответа на технический запрос — 3 секунды",
      "Снижена зависимость от ручного поиска по документации",
    ],
  },
  "neurotenderolog": {
    slug: "neurotenderolog",
    title: "НейроТендеролог",
    subtitle: "Собственный программный сервис НейроРешений по подписке для отбора закупок",
    targetAudience: "компании, которые отбирают подходящие закупки",
    industry: "Закупки · Отбор закупок",
    price: "—",
    status: "в промышленной эксплуатации",
    task: "Уменьшить ручной просмотр закупок и повысить управляемость отбора. Это собственный сервис НейроРешений по подписке, а не заказная разработка для отдельной компании. Сервис развивается с 2025; текущая обновлённая версия в промышленной эксплуатации с июня 2026.",
    actions: [
      "Создали многоступенчатую фильтрацию закупок",
      "Добавили ИИ-оценку соответствия и углублённый разбор документации",
      "Настроили доставку карточек подходящих закупок в MAX",
    ],
    results: [
      "3 постоянных клиента, один пользуется сервисом более года",
      "Система просматривает до 750 закупок в день на одно направление. Это эксплуатационный показатель, не денежная экономия",
      "Сервис помогает отбирать закупки; подача заявок и выигранные контракты не заявляются. Измеренный экономический эффект не приводится",
    ],
  },
  "caregiver-matching": {
    slug: "caregiver-matching",
    title: "Система подбора и сопровождения сиделок",
    subtitle: "Telegram-бот и контур учёта в Google Таблицах для заявок на уход",
    targetAudience: "организация в сфере услуг по уходу; заказчик не раскрывается",
    industry: "Услуги · Уход",
    price: "—",
    status: "реализован",
    task: "Организовать приём заявок на уход, подбор сиделок и сопровождение работы в едином контуре учёта. Название заказчика и персональные сведения не раскрываются.",
    actions: [
      "Реализовали Telegram-бот и контур учёта в Google Таблицах",
      "Настроили приём текстовых и голосовых заявок, формирование карточки и передачу на модерацию",
      "Настроили публикацию заявки без персональных контактов и закрепление за первой откликнувшейся сиделкой",
      "Реализовали фиксацию статусов, отчётов, договоров и оплат, отправку напоминаний",
    ],
    results: [
      "2025: год реализации, не метрика эффективности",
      "Реализованы Telegram-бот и контур учёта в Google Таблицах с описанными функциями",
      "Измеренные показатели экономии времени, денег и ROI не заявляются",
    ],
  },
  "business-travel": {
    slug: "business-travel",
    title: "Автоматизация командировок",
    subtitle: "Решение для задач организации командировок",
    targetAudience: "две компании; названия заказчиков не раскрываются",
    industry: "Организация командировок",
    price: "—",
    status: "используется в рабочих процессах",
    task: "Решение применяется для задач организации командировок. Публичное описание ограничено подтверждёнными фактами внедрения и использования. Названия заказчиков, технические детали и конкретные функции не раскрываются.",
    actions: [
      "Подобное решение внедрено в двух компаниях для задач организации командировок",
    ],
    results: [
      "Подобное решение внедрено в двух компаниях, используется в рабочих процессах, заказчики довольны результатом",
      "Два внедрения, экономический эффект не заявляется. Измеренные показатели отсутствуют в публичном описании",
    ],
  },
};

const CaseDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const caseData = slug ? casesData[slug] : null;
  const project = slug ? caseForPath(`/cases/${slug}`) : undefined;

  if (!caseData) {
    return (
      <PageTransition>
        <div className="min-h-screen">
          <div className="pt-32 pb-20 text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-4">Кейс не найден</h1>
            <Button onClick={() => navigate('/cases')}>Все кейсы</Button>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Кейс: {caseData.title} — Александра Моисеева</title>
        <meta name="description" content={`${caseData.subtitle}. ${caseData.task}`} />
        <link rel="canonical" href={`https://aleksamois.ru/cases/${caseData.slug}`} />
        <meta property="og:title" content={`Кейс: ${caseData.title} — Александра Моисеева`} />
        <meta property="og:description" content={`${caseData.subtitle}. ${caseData.task}`} />
        <meta property="og:url" content={`https://aleksamois.ru/cases/${caseData.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
      </Helmet>
      <div className="min-h-screen">
        
        <PageBreadcrumbs 
          currentPage={caseData.title} 
          parentPages={[{ label: "Кейсы", href: "/cases" }]} 
        />
        
        {slug === "aktransservice" ? (
          <>
            <AkTransServiceContent />
            <Partners />
            <Footer />
          </>
        ) : (
        <>
        <main>
          <section className="mx-auto max-w-7xl px-4 pt-8 md:pt-12">
            <div className="rounded-[32px] md:rounded-[40px] bg-surface-mint shadow-card ring-1 ring-foreground/5 p-6 md:p-12">
              <p className="text-xs uppercase tracking-widest text-primary-dark font-semibold mb-5">Кейс · {caseData.industry}</p>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-8 min-w-0">
                  <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-5">{caseData.title}</h1>
                  <p className="text-base md:text-xl text-foreground/80 leading-relaxed max-w-3xl">{caseData.subtitle}</p>
                  <p className="text-sm text-muted-foreground mt-5">Статус: {caseData.status}</p>
                </div>
                <dl className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-foreground/15 pt-6 lg:pt-0 lg:pl-8 space-y-6">
                  {project?.results.map(result => <div key={result.value}>
                    <dd className="font-bold text-4xl md:text-5xl text-foreground leading-tight mb-2" title={result.confirmation}>{result.value}</dd>
                    <dt className="text-sm text-muted-foreground leading-relaxed">{result.label}</dt>
                  </div>)}
                </dl>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4">
                <p className="text-xs uppercase tracking-widest text-primary-dark font-semibold mb-4">01 · Контекст</p>
                <h2 className="!text-3xl md:!text-4xl !leading-tight !text-foreground">Задача бизнеса</h2>
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{caseData.targetAudience}</p>
              </div>
              <p className="md:col-span-8 text-base md:text-lg text-foreground leading-relaxed">{caseData.task}</p>
            </div>
          </section>

          <section className="bg-card py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4">
                <p className="text-xs uppercase tracking-widest text-primary-dark font-semibold mb-4">02 · Решение</p>
                <h2 className="!text-3xl md:!text-4xl !leading-tight !text-foreground">Что сделали</h2>
              </div>
              <ol className="md:col-span-8 border-t border-foreground/10">
                {caseData.actions.map((action, index) => <li key={action} className="flex gap-5 py-5 border-b border-foreground/10">
                  <span className="text-primary-dark font-bold text-sm pt-1 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-base md:text-lg text-foreground leading-relaxed">{action}</p>
                </li>)}
              </ol>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4">
                <p className="text-xs uppercase tracking-widest text-primary-dark font-semibold mb-4">03 · Подтверждённые результаты</p>
                <h2 className="!text-3xl md:!text-4xl !leading-tight !text-foreground">Что получили</h2>
              </div>
              <ul className="md:col-span-8 border-t border-foreground/10">
                {caseData.results.map(result => <li key={result} className="py-5 border-b border-foreground/10 text-base md:text-lg text-foreground leading-relaxed">{result}</li>)}
              </ul>
            </div>
          </section>

          {slug === "neurotenderolog" && (
            <section className="py-12 md:py-16 bg-surface-mint" aria-labelledby="reality-title">
              <div className="mx-auto px-4 max-w-7xl">
                <h2 id="reality-title" className="!text-3xl md:!text-5xl !text-foreground !leading-tight mb-10">Как работает в реальности</h2>
                <div className="space-y-10 md:space-y-12">
                  <article className="grid lg:grid-cols-12 gap-6 lg:gap-12 border-t border-foreground/15 pt-8 md:pt-10">
                    <div className="lg:col-span-5">
                    <p className="text-sm text-primary font-medium mb-3">1. Карточка закупки и решение человека</p>
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight text-foreground mb-4">Человек принимает решение по карточке</h3>
                    <p className="text-foreground leading-relaxed">
                      Отдельная карточка содержит название закупки, цену, ссылки и мини-анализ. Человек выбирает «Подходит», «Не подходит» или «Спорно». Сервис помогает отбирать закупки, а не подаёт заявки и не выигрывает контракты.
                    </p>
                    </div>
                    <figure className="lg:col-span-7 min-w-0 flex flex-col items-center">
                    <a
                      href="/cases/neurotenderolog/tender_card_public.webp"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Открыть скриншот в полном размере"
                      aria-label="Открыть скриншот в полном размере"
                      className="block w-full max-w-[587px]"
                    >
                      <img
                        src="/cases/neurotenderolog/tender_card_public.webp"
                        alt="Реальная карточка закупки с ценой, мини-анализом и вариантами решения человека"
                        width={566}
                        height={590}
                        loading="lazy"
                        className="block w-full max-w-full h-auto rounded-2xl ring-1 ring-foreground/10"
                      />
                    </a>
                    <a
                      href="/cases/neurotenderolog/tender_card_public.webp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-primary hover:underline"
                    >
                      Открыть полностью ↗
                    </a>
                    </figure>
                  </article>
                  <article className="grid lg:grid-cols-12 gap-6 lg:gap-12 border-t border-foreground/15 pt-8 md:pt-10">
                    <div className="lg:col-span-5">
                    <p className="text-sm text-primary font-medium mb-3">2. День с подходящей закупкой</p>
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight text-foreground mb-4">07.10.2026: 1 подходит, 4 требуют решения</h3>
                    <div className="space-y-3 text-foreground leading-relaxed">
                      <p>«ИИ Разработка»: 15 новых закупок, 14 отсечено первично, 1 подробно проверена и отсечена при подробной проверке.</p>
                      <p>«ИИ Консалтинг»: 146 новых закупок, 140 отсечено первично, 6 подробно проверено. Из них 1 отсечена при подробной проверке, 4 требуют решения, 1 подходит.</p>
                      <p className="font-medium">Дневной итог по двум направлениям: 1 подходящая закупка и 4 закупки, которые требуют решения человека.</p>
                    </div>
                    </div>
                    <figure className="lg:col-span-7 min-w-0 flex flex-col items-center">
                    <a
                      href="/cases/neurotenderolog/tender_daily_match_public.webp"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Открыть скриншот в полном размере"
                      aria-label="Открыть скриншот в полном размере"
                      className="block w-full max-w-[587px]"
                    >
                      <img
                        src="/cases/neurotenderolog/tender_daily_match_public.webp"
                        alt="Отбор 7 октября 2026 года: 1 подходящая закупка и 4 требуют решения"
                        width={587}
                        height={917}
                        loading="lazy"
                        className="block w-full max-w-full h-auto rounded-2xl ring-1 ring-foreground/10"
                      />
                    </a>
                    <a
                      href="/cases/neurotenderolog/tender_daily_match_public.webp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-primary hover:underline"
                    >
                      Открыть полностью ↗
                    </a>
                    </figure>
                  </article>
                  <article className="grid lg:grid-cols-12 gap-6 lg:gap-12 border-t border-foreground/15 pt-8 md:pt-10">
                    <div className="lg:col-span-5">
                    <p className="text-sm text-primary font-medium mb-3">3. День без подходящих закупок</p>
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight text-foreground mb-4">18.10.2026: подходящих закупок нет</h3>
                    <div className="space-y-3 text-foreground leading-relaxed">
                      <p>«ИИ Разработка»: 22 новые закупки, 22 отсечено.</p>
                      <p>«ИИ Консалтинг»: 171 новая закупка, 171 отсечено.</p>
                      <p className="font-medium">Подходящих закупок по двум направлениям: 0. Результат отбора за конкретный день может быть нулевым.</p>
                    </div>
                    </div>
                    <figure className="lg:col-span-7 min-w-0 flex flex-col items-center">
                    <a
                      href="/cases/neurotenderolog/tender_daily_zero_public.webp"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Открыть скриншот в полном размере"
                      aria-label="Открыть скриншот в полном размере"
                      className="block w-full max-w-[587px]"
                    >
                      <img
                        src="/cases/neurotenderolog/tender_daily_zero_public.webp"
                        alt="Отбор 18 октября 2026 года: 22 и 171 новая закупка, подходящих нет"
                        width={517}
                        height={554}
                        loading="lazy"
                        className="block w-full max-w-full h-auto rounded-2xl ring-1 ring-foreground/10"
                      />
                    </a>
                    <a
                      href="/cases/neurotenderolog/tender_daily_zero_public.webp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-primary hover:underline"
                    >
                      Открыть полностью ↗
                    </a>
                    </figure>
                  </article>
                </div>
                <p className="text-muted-foreground leading-relaxed mt-6">
                  Скриншоты показывают реальные результаты отбора в отдельные дни, а не среднюю эффективность сервиса
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Эти дневные примеры не заменяют эксплуатационный показатель «до 750 закупок в день на одно направление» и не доказывают экономию денег или часов.
                </p>
              </div>
            </section>
          )}

          <section className="mx-auto max-w-7xl px-4 pt-6 pb-12 md:pb-16">
            <div className="rounded-[32px] bg-foreground p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-card">
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-accent mb-3">Следующий шаг</p>
                <h2 className="!text-2xl md:!text-3xl !leading-tight !text-background">Обсудим вашу задачу</h2>
              </div>
              <PillButton onClick={scrollToContact} variant="light" size="md" className="self-start shrink-0">Обсудить похожую задачу</PillButton>
            </div>
          </section>
        </main>

        <Partners />
        <Footer />
        </>
        )}
      </div>
    </PageTransition>
  );
};

export default CaseDetailPage;
