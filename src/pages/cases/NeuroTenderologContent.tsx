import PillButton from "@/components/PillButton";
import { caseForPath } from "@/data/caseStudies";
import { scrollToContact } from "@/lib/scrollToContact";

const tenderCase = caseForPath("/cases/neurotenderolog");

const stages = [
  { title: "Источники закупок", detail: "Поступление закупок по выбранным направлениям" },
  { title: "Первичный отбор", detail: "Фильтрация по профилю и критериям" },
  { title: "ИИ-анализ", detail: "Оценка соответствия и изучение документации" },
  { title: "Сводка в MAX", detail: "Подходящие закупки и варианты для оценки" },
  { title: "Решение специалиста", detail: "Подходит, отклонить или обсудить" },
];

const screenshots = {
  card: {
    src: "/cases/neurotenderolog/tender_card_public.webp",
    width: 566,
    height: 590,
    alt: "Реальная карточка закупки с предметом, ценой, кратким анализом и вариантами решения",
  },
  match: {
    src: "/cases/neurotenderolog/tender_daily_match_public.webp",
    width: 587,
    height: 917,
    alt: "Реальная сводка от 7 октября 2026 года: одна подходящая закупка и четыре для решения специалиста",
  },
  zero: {
    src: "/cases/neurotenderolog/tender_daily_zero_public.webp",
    width: 517,
    height: 554,
    alt: "Реальная сводка от 18 октября 2026 года: 193 просмотренные закупки и ноль подходящих",
  },
} as const;

type Screenshot = (typeof screenshots)[keyof typeof screenshots];

const EvidenceImage = ({
  image,
  previewHeight = "h-[220px] md:h-[250px]",
}: {
  image: Screenshot;
  previewHeight?: string;
}) => (
  <a
    href={image.src}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={"Открыть оригинал: " + image.alt}
    className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark"
  >
    <div className={"flex w-full items-center justify-center overflow-hidden rounded-[20px] border border-foreground/10 bg-white/90 px-4 py-3 " + previewHeight}>
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading="lazy"
        className="h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.025]"
      />
    </div>
    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark group-hover:underline">
      Открыть скриншот полностью <span aria-hidden="true">↗</span>
    </span>
  </a>
);

const outcomes = [
  {
    title: "Ежедневная подборка",
    detail: "Закупки проходят фильтрацию по профилю направления.",
  },
  {
    title: "ИИ-разбор",
    detail: "Карточка содержит сведения о закупке и предварительный анализ.",
  },
  {
    title: "Сводка в MAX",
    detail: "Специалист видит итог отбора и динамику по направлениям.",
  },
  {
    title: "Решение за человеком",
    detail: "Подходящие и спорные закупки поступают на оценку.",
  },
];

const NeuroTenderologContent = () => (
  <main>
    <section className="mx-auto max-w-7xl px-4 pt-7 md:pt-10">
      <div className="rounded-[32px] bg-surface-mint p-6 shadow-card ring-1 ring-foreground/5 md:rounded-[40px] md:p-10 lg:p-12">
        <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-dark">
            Кейс · Закупки и тендеры
          </p>
          <p className="text-xs text-foreground/65">В промышленной эксплуатации с июня 2026</p>
        </div>
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              НейроТендеролог
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-xl">
              Собственный сервис НейроРешений по подписке: отбор закупок, ИИ-анализ
              документации и готовые карточки для решения специалиста в MAX.
            </p>
          </div>
          <dl className="grid min-w-0 grid-cols-2 gap-5 rounded-[24px] bg-white/75 p-5 ring-1 ring-foreground/5 lg:col-span-5 lg:gap-6 lg:p-7">
            {(tenderCase?.results ?? []).map((item) => (
              <div key={item.value} className="min-w-0" title={item.confirmation}>
                <dd className="text-3xl font-bold leading-none tracking-tight text-foreground sm:text-4xl">
                  {item.value}
                </dd>
                <dt className="mt-3 text-xs leading-relaxed text-foreground/70 sm:text-sm">{item.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>

    <section aria-label="Суть проекта" className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <div className="grid gap-0 rounded-[28px] border border-foreground/10 bg-card px-6 shadow-card md:grid-cols-3 md:px-8">
        <div className="border-b border-foreground/10 py-6 md:border-b-0 md:border-r md:pr-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">01 · Задача бизнеса</p>
          <h2 className="text-lg font-bold leading-snug text-foreground md:text-xl">
            Управляемый отбор закупок при большом потоке предложений
          </h2>
        </div>
        <div className="border-b border-foreground/10 py-6 md:border-b-0 md:border-r md:px-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">02 · Что сделали</p>
          <h2 className="text-lg font-bold leading-snug text-foreground md:text-xl">
            Фильтрация, ИИ-оценка и доставка результатов в MAX
          </h2>
        </div>
        <div className="py-6 md:pl-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">03 · Что получили</p>
          <h2 className="text-lg font-bold leading-snug text-foreground md:text-xl">
            Работающий сервис с тремя постоянными клиентами
          </h2>
        </div>
      </div>
    </section>

    <section aria-labelledby="tender-flow" className="mx-auto max-w-7xl px-4 pb-12 md:pb-16">
      <div className="rounded-[32px] bg-foreground p-6 md:p-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Рабочий процесс</p>
            <h2 id="tender-flow" className="!text-3xl !leading-tight !text-background md:!text-4xl">
              Путь закупки до решения специалиста
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-background/70">
            Пять последовательных этапов отбора
          </p>
        </div>
        <ol className="grid grid-cols-2 gap-x-5 gap-y-6 border-t border-background/20 pt-6 md:grid-cols-5 md:gap-6">
          {stages.map((stage, index) => (
            <li key={stage.title} className={index === 4 ? "col-span-2 md:col-span-1" : "min-w-0"}>
              <span className="mb-3 inline-block text-sm font-semibold tabular-nums text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold leading-snug text-background">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-background/65">{stage.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section aria-labelledby="tender-evidence" className="bg-surface-mint/60 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 max-w-3xl md:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">
            Реальные материалы
          </p>
          <h2 id="tender-evidence" className="!text-3xl !leading-tight !text-foreground md:!text-5xl">
            Три рабочих сценария
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70">
            Скриншоты показывают результат отбора за конкретные дни. Оригиналы открываются по нажатию.
          </p>
        </div>

        <article className="grid items-center gap-7 rounded-[28px] bg-card p-6 shadow-card ring-1 ring-foreground/5 md:p-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">
              Сценарий 01 · Карточка закупки
            </p>
            <h3 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
              Специалист получает данные для решения
            </h3>
            <p className="mt-4 max-w-lg leading-relaxed text-foreground/75">
              Название закупки, цена, ссылки и краткий ИИ-разбор собраны в одном сообщении.
              Специалист оценивает предложение и выбирает дальнейшее действие.
            </p>
          </div>
          <figure className="min-w-0 lg:col-span-7">
            <EvidenceImage image={screenshots.card} previewHeight="h-[235px] md:h-[275px]" />
          </figure>
        </article>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <article className="flex min-w-0 flex-col rounded-[28px] bg-card p-6 shadow-card ring-1 ring-foreground/5 md:p-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">
              Сценарий 02 · 07.10.2026
            </p>
            <h3 className="text-xl font-bold leading-tight text-foreground md:text-2xl">
              День с подходящей закупкой
            </h3>
            <div className="my-5 flex flex-wrap gap-x-8 gap-y-3 border-y border-foreground/10 py-4">
              <div><span className="block text-4xl font-bold tabular-nums text-foreground">1</span><span className="text-sm text-foreground/70">подходящая</span></div>
              <div><span className="block text-4xl font-bold tabular-nums text-foreground">4</span><span className="text-sm text-foreground/70">требуют решения</span></div>
            </div>
            <p className="mb-5 leading-relaxed text-foreground/75">
              По направлениям «ИИ Разработка» и «ИИ Консалтинг» система обработала 15 и 146
              новых закупок. Подходящие и спорные варианты переданы специалисту.
            </p>
            <figure className="mt-auto">
              <EvidenceImage image={screenshots.match} />
            </figure>
          </article>

          <article className="flex min-w-0 flex-col rounded-[28px] bg-card p-6 shadow-card ring-1 ring-foreground/5 md:p-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">
              Сценарий 03 · 18.10.2026
            </p>
            <h3 className="text-xl font-bold leading-tight text-foreground md:text-2xl">
              День полного отсева
            </h3>
            <div className="my-5 flex flex-wrap gap-x-8 gap-y-3 border-y border-foreground/10 py-4">
              <div><span className="block text-4xl font-bold tabular-nums text-foreground">0</span><span className="text-sm text-foreground/70">подходящих</span></div>
              <div><span className="block text-4xl font-bold tabular-nums text-foreground">193</span><span className="text-sm text-foreground/70">новые закупки</span></div>
            </div>
            <p className="mb-5 leading-relaxed text-foreground/75">
              «ИИ Разработка»: 22 закупки. «ИИ Консалтинг»: 171 закупка.
              Все предложения за день прошли отбор по заданным критериям.
            </p>
            <figure className="mt-auto">
              <EvidenceImage image={screenshots.zero} />
            </figure>
          </article>
        </div>
        <p className="mt-6 max-w-4xl text-sm leading-relaxed text-foreground/65">
          Это примеры отдельных рабочих дней. Показатель до 750 просмотренных закупок в день
          относится к одному направлению. Эффект во времени и деньгах оценивается отдельно
          по данным эксплуатации.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16" aria-labelledby="tender-outcomes">
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">
            Практический результат
          </p>
          <h2 id="tender-outcomes" className="!text-3xl !leading-tight !text-foreground md:!text-4xl">
            Что получает клиент
          </h2>
        </div>
        <div className="grid gap-x-7 gap-y-0 sm:grid-cols-2 md:col-span-8">
          {outcomes.map((item, index) => (
            <div key={item.title} className="border-t border-foreground/15 py-5">
              <p className="mb-2 text-xs font-semibold tabular-nums text-primary-dark">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg font-bold leading-snug text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 pb-12 md:pb-16">
      <div className="flex flex-col gap-6 rounded-[32px] bg-foreground p-6 shadow-card md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Следующий шаг</p>
          <h2 className="!text-2xl !leading-tight !text-background md:!text-3xl">
            Обсудим отбор закупок для вашей компании
          </h2>
        </div>
        <PillButton onClick={scrollToContact} variant="light" size="md" className="self-start shrink-0">
          Обсудить задачу
        </PillButton>
      </div>
    </section>
  </main>
);

export default NeuroTenderologContent;
