import { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
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
    title: "Карточка закупки после ИИ-анализа",
    src: "/cases/neurotenderolog/tender_card_public.webp",
    width: 566,
    height: 590,
    alt: "Реальная карточка закупки с предметом, ценой, кратким анализом и вариантами решения",
  },
  match: {
    title: "Результат отбора · 7 октября 2026",
    src: "/cases/neurotenderolog/tender_daily_match_public.webp",
    width: 587,
    height: 917,
    alt: "Реальная сводка от 7 октября 2026 года: одна подходящая закупка и четыре для решения специалиста",
  },
  zero: {
    title: "Результат отбора · 18 октября 2026",
    src: "/cases/neurotenderolog/tender_daily_zero_public.webp",
    width: 517,
    height: 554,
    alt: "Реальная сводка от 18 октября 2026 года: 193 просмотренные закупки и ноль подходящих",
  },
} as const;

type Screenshot = (typeof screenshots)[keyof typeof screenshots];

const EvidenceImage = ({
  image,
  onOpen,
  previewHeight = "h-[370px] md:h-[470px]",
}: {
  image: Screenshot;
  onOpen: () => void;
  previewHeight?: string;
}) => (
  <button
    type="button"
    onClick={onOpen}
    aria-label={"Увеличить изображение: " + image.title}
    title="Увеличить изображение"
    className="group relative block w-full cursor-zoom-in rounded-[20px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark"
  >
    <div className={"flex w-full items-center justify-center overflow-hidden rounded-[20px] bg-white px-2 py-3 transition-shadow group-hover:shadow-card sm:px-3 " + previewHeight}>
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading="lazy"
        className="h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </div>
    <span aria-hidden="true" className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-foreground/90 text-background shadow-card transition-transform group-hover:scale-110">
      <ZoomIn className="h-5 w-5" />
    </span>
  </button>
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

const NeuroTenderologContent = () => {
  const [activeScreenshot, setActiveScreenshot] = useState<Screenshot | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openScreenshot = (image: Screenshot) => {
    setZoomed(false);
    setActiveScreenshot(image);
  };

  const closeScreenshot = () => {
    setZoomed(false);
    setActiveScreenshot(null);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeScreenshot && !dialog.open) dialog.showModal();
    if (!activeScreenshot && dialog.open) dialog.close();
  }, [activeScreenshot]);

  useEffect(() => {
    if (!activeScreenshot) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [activeScreenshot]);

  return (
    <>
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
          <p className="text-base font-semibold leading-snug text-foreground md:text-lg">
            Управляемый отбор закупок при большом потоке предложений
          </p>
        </div>
        <div className="border-b border-foreground/10 py-6 md:border-b-0 md:border-r md:px-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">02 · Что сделали</p>
          <p className="text-base font-semibold leading-snug text-foreground md:text-lg">
            Фильтрация, ИИ-оценка и доставка результатов в MAX
          </p>
        </div>
        <div className="py-6 md:pl-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">03 · Что получили</p>
          <p className="text-base font-semibold leading-snug text-foreground md:text-lg">
            Работающий сервис с тремя постоянными клиентами
          </p>
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
        <ol className="grid grid-cols-1 gap-3 border-t border-background/20 pt-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {stages.map((stage, index) => (
            <li key={stage.title} className="flex min-w-0 items-start gap-4 rounded-[20px] border border-white/10 bg-white/[0.07] p-4 lg:flex-col lg:gap-0 lg:p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-accent font-bold tabular-nums text-2xl text-foreground lg:mb-5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="!text-lg !font-bold !leading-snug !text-background xl:!text-xl">{stage.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-background/85">{stage.detail}</p>
              </div>
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
            Скриншоты показывают результат отбора за конкретные дни. Нажмите на изображение для увеличения.
          </p>
        </div>

        <div className="space-y-6">
          <article className="grid min-w-0 items-center gap-7 border-b border-foreground/10 pb-7 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">
                Сценарий 01 · Карточка закупки
              </p>
              <h3 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
                Специалист получает данные для решения
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-foreground/80">
                Название закупки, цена, ссылки и краткий ИИ-разбор собраны в одном сообщении.
                Специалист оценивает предложение и выбирает дальнейшее действие.
              </p>
            </div>
            <figure className="min-w-0 lg:col-span-7">
              <EvidenceImage image={screenshots.card} onOpen={() => openScreenshot(screenshots.card)} previewHeight="h-[370px] md:h-[470px]" />
            </figure>
          </article>

          <article className="grid min-w-0 items-center gap-7 border-b border-foreground/10 pb-7 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">
                Сценарий 02 · 07.10.2026
              </p>
              <h3 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
                День с подходящей закупкой
              </h3>
              <div className="my-5 flex flex-wrap gap-x-8 gap-y-3 border-y border-foreground/10 py-4">
                <div><span className="block text-4xl font-bold tabular-nums text-foreground">1</span><span className="text-sm text-foreground/70">подходящая</span></div>
                <div><span className="block text-4xl font-bold tabular-nums text-foreground">4</span><span className="text-sm text-foreground/70">требуют решения</span></div>
              </div>
              <p className="max-w-lg text-base leading-relaxed text-foreground/80">
                По направлениям «ИИ Разработка» и «ИИ Консалтинг» система обработала 15 и 146
                новых закупок. Подходящие и спорные варианты переданы специалисту.
              </p>
            </div>
            <figure className="min-w-0 lg:col-span-7">
              <EvidenceImage image={screenshots.match} onOpen={() => openScreenshot(screenshots.match)} previewHeight="h-[370px] md:h-[470px]" />
            </figure>
          </article>

          <article className="grid min-w-0 items-center gap-7 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">
                Сценарий 03 · 18.10.2026
              </p>
              <h3 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
                День полного отсева
              </h3>
              <div className="my-5 flex flex-wrap gap-x-8 gap-y-3 border-y border-foreground/10 py-4">
                <div><span className="block text-4xl font-bold tabular-nums text-foreground">0</span><span className="text-sm text-foreground/70">подходящих</span></div>
                <div><span className="block text-4xl font-bold tabular-nums text-foreground">193</span><span className="text-sm text-foreground/70">новые закупки</span></div>
              </div>
              <p className="max-w-lg text-base leading-relaxed text-foreground/80">
                «ИИ Разработка»: 22 закупки. «ИИ Консалтинг»: 171 закупка.
                Все предложения за день прошли отбор по заданным критериям.
              </p>
            </div>
            <figure className="min-w-0 lg:col-span-7">
              <EvidenceImage image={screenshots.zero} onOpen={() => openScreenshot(screenshots.zero)} previewHeight="h-[370px] md:h-[470px]" />
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
        <div className="grid gap-4 sm:grid-cols-2 md:col-span-8">
          {outcomes.map((item, index) => (
            <article key={item.title} className="rounded-[24px] border border-foreground/10 bg-card p-5 shadow-card md:p-6">
              <span className="mb-5 inline-flex h-12 min-w-12 items-center justify-center rounded-[14px] bg-surface-mint px-3 text-2xl font-bold tabular-nums text-primary-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="!text-xl !font-bold !leading-snug !text-foreground xl:!text-2xl">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">{item.detail}</p>
            </article>
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
      <dialog
        ref={dialogRef}
        aria-label={activeScreenshot?.title ?? "Просмотр изображения"}
        onClose={closeScreenshot}
        onClick={(event) => { if (event.target === event.currentTarget) closeScreenshot(); }}
        className="fixed inset-0 m-auto w-[calc(100vw-24px)] max-w-[1050px] max-h-[calc(100dvh-24px)] overflow-hidden rounded-[24px] border border-white/15 bg-[#15191d] p-0 text-white shadow-2xl backdrop:bg-black/85 backdrop:backdrop-blur-sm md:rounded-[30px]"
      >
        {activeScreenshot && (
          <div className="flex max-h-[88dvh] min-h-0 flex-col md:h-[min(88dvh,900px)]">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/15 px-4 py-3 sm:px-6">
              <p className="min-w-0 text-base font-semibold leading-snug text-white sm:text-lg">{activeScreenshot.title}</p>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomed(value => !value)}
                  aria-label={zoomed ? "Уменьшить изображение" : "Увеличить изображение в два раза"}
                  title={zoomed ? "Уменьшить" : "Увеличить"}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {zoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  onClick={closeScreenshot}
                  aria-label="Закрыть просмотр"
                  title="Закрыть"
                  autoFocus
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-foreground hover:bg-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-auto overscroll-contain p-3 sm:p-6">
              <div className={zoomed ? "flex min-h-full min-w-max items-start justify-start" : "flex min-h-0 items-center justify-center md:min-h-full"}>
                <img
                  src={activeScreenshot.src}
                  width={activeScreenshot.width}
                  height={activeScreenshot.height}
                  alt={activeScreenshot.alt}
                  className={zoomed ? "h-auto max-w-none rounded-xl" : "h-auto max-h-[calc(88dvh-125px)] w-auto max-w-full rounded-xl object-contain"}
                  style={zoomed ? { width: activeScreenshot.width * 2 } : undefined}
                />
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

export default NeuroTenderologContent;
