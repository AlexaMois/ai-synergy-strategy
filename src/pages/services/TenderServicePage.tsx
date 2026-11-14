import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, FileSearch, ListChecks, MessageSquareText, UserCheck } from "lucide-react";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { setContactIntent } from "@/lib/contactIntent";

const stages = [
  { icon: FileSearch, n:"01", title:"Поиск", text:"Система собирает закупки из подключённого источника по расписанию." },
  { icon: ListChecks, n:"02", title:"Предварительный отбор", text:"Правила и ИИ помогают сопоставить закупку с профилем компании." },
  { icon: MessageSquareText, n:"03", title:"Карточка в MAX", text:"Специалист получает описание закупки, ссылку и обоснование предварительного отбора." },
  { icon: UserCheck, n:"04", title:"Решение специалиста", text:"Человек оценивает соответствие требованиям и выбирает дальнейшие действия." },
];

const productFaqGroups = [
  {
    "title": "Что это и кому подходит",
    "items": [
      [
        "Чем НейроТендеролог помогает бизнесу?",
        "Сервис ежедневно выполняет первичный отбор закупок по профилю компании, присылает карточки с пояснениями в MAX и сохраняет обратную связь специалиста."
      ],
      [
        "Кто пользуется сервисом?",
        "Тендерные специалисты, менеджеры продаж, руководители направлений и собственники компаний с регулярным поиском закупок."
      ],
      [
        "Подойдёт ли рекламному или event-агентству?",
        "Да, профиль можно настроить под форумы, выставки, церемонии, промоакции и рекламные услуги. При старте сверяем подборку с реальными закупками агентства."
      ],
      [
        "Подойдёт ли производству и поставщикам оборудования?",
        "Да, отдельный профиль охватывает продукцию, работы, регионы и критерии отбора конкретной компании."
      ],
      [
        "Чем сервис отличается от поиска на тендерной площадке?",
        "Он добавляет к исходной выдаче многоступенчатую фильтрацию, ИИ-оценку по профилю, понятные карточки и историю решений."
      ],
      [
        "Кто принимает решение об участии?",
        "Ответственный сотрудник компании. Сервис готовит предварительную оценку и материалы для изучения."
      ]
    ]
  },
  {
    "title": "Поиск и охват",
    "items": [
      [
        "Откуда берутся закупки?",
        "Из подключённого источника. Текущий технологический контур использует Контур.Закупки; состав доступных публикаций зависит от источника и профиля."
      ],
      [
        "Какие виды закупок охватываются?",
        "По 44-ФЗ, 223-ФЗ и коммерческим процедурам охват определяется доступной выдачей и выбранным поисковым шаблоном. Типы закрепляются при настройке."
      ],
      [
        "Охватываются ли все электронные площадки?",
        "Охват согласуется по возможностям источника и конкретным направлениям. Для значимых площадок проводим проверку на примерах."
      ],
      [
        "Как часто проходит поиск?",
        "Плановый поиск проходит ежедневно. Карточки приходят после обработки, в конце прогона поступает итоговая сводка."
      ],
      [
        "Можно ли настроить несколько направлений?",
        "Да, для каждого направления создаётся отдельный профиль со своими правилами и критериями."
      ],
      [
        "Какие критерии учитываются?",
        "Сфера деятельности, ключевые формулировки, стоп-фразы, регионы, минимальная сумма и особенности источника. Дополнительные условия обсуждаются при подключении."
      ],
      [
        "Почему иногда приходит ноль подходящих закупок?",
        "В обработанном потоке за этот день система выделила ноль кандидатов по текущим правилам. Сводка подтверждает факт работы, а качество фильтра проверяется на примерах."
      ],
      [
        "Может ли фильтр пропустить подходящую закупку?",
        "Риск пропуска существует при необычных формулировках или ограничениях источника. Поэтому стартовая настройка включает контрольную выборку и разбор пропущенных вариантов."
      ],
      [
        "Есть ли подтверждённый процент точности?",
        "Точность и полноту правильно измерять на размеченной выборке каждого направления. В публичном кейсе показаны реальные результаты работы, а не универсальный процент качества."
      ]
    ]
  },
  {
    "title": "Карточки, документы и обратная связь",
    "items": [
      [
        "Что находится в карточке закупки?",
        "Предмет, заказчик, цена и дедлайн при наличии, ссылки на ресурсы, краткий ИИ-разбор и кнопки решения."
      ],
      [
        "Что означают кнопки «Подходит», «Мимо», «Спорно»?",
        "«Подходит» фиксирует интерес, «Мимо» позволяет выбрать причину отказа, «Спорно» сохраняет пояснение для уточнения профиля."
      ],
      [
        "Изучает ли сервис техническое задание?",
        "Да, углублённый разбор доступных документов запускается для отдельных случаев и после выбора «Подходит», когда у закупки есть файлы."
      ],
      [
        "Какие файлы обрабатываются?",
        "Поддерживаются распространённые форматы документов, PDF, архивы и распознавание сканов в рамках технических возможностей сервиса."
      ],
      [
        "Готовит ли сервис заявку на участие?",
        "Текущая услуга охватывает поиск, предварительный отбор и изучение документации. Подготовку и подачу заявки выполняет команда клиента либо отдельное согласованное решение."
      ],
      [
        "Проверяет ли сервис каждый пункт допуска к торгам?",
        "В текущем продукте доступен предварительный анализ. Подтверждение юридического допуска по каждому требованию выполняет специалист; автоматизированный допуск-чек выделен в развитие."
      ],
      [
        "Учится ли система по отзывам сотрудников?",
        "Реакции сохраняются и помогают уточнять правила и стоп-фразы профиля. Весовые параметры языковой модели от нажатий остаются прежними."
      ],
      [
        "Приходит ли отчёт в дни с нулевой выдачей?",
        "Да, после прогона клиент получает сводку по направлениям, включая дни с нулём подходящих предложений."
      ]
    ]
  },
  {
    "title": "Подключение и тариф",
    "items": [
      [
        "Что нужно для подключения?",
        "Описание направлений, несколько примеров подходящих и чужих закупок, регионы, ценовые ограничения и контакт сотрудника, который будет оценивать карточки."
      ],
      [
        "Как проходит подключение?",
        "Мы согласуем профиль, настроим источник и права сотрудников, после чего пользователь активируется в боте MAX по номеру телефона. Затем проходит проверка первых результатов."
      ],
      [
        "Нужно ли устанавливать программу?",
        "Клиент работает с карточками в MAX. Поиск и обработка выполняются серверной системой."
      ],
      [
        "Можно ли подключить несколько сотрудников?",
        "Да. Сотрудники привязываются к своей компании; роли и порядок обратной связи уточняются при подключении."
      ],
      [
        "Сколько стоит НейроТендеролог?",
        "Стандартный тариф по технической ценовой политике составляет 3 490 ₽ в месяц за одно направление. Минимальный пакет — три месяца, 10 470 ₽ за направление. Итоговые условия закрепляются в предложении."
      ],
      [
        "Что входит в подписку?",
        "Базовая настройка профиля, ежедневный поиск, первичный отбор, карточки в MAX, обратная связь и углублённый разбор доступных документов по выбранным закупкам."
      ],
      [
        "Есть ли скидки за несколько направлений?",
        "Индивидуальные условия для нескольких направлений и длительных пакетов обсуждаются при оформлении предложения."
      ],
      [
        "Есть ли тестирование перед подключением?",
        "Можно согласовать демонстрацию и контрольную выборку на реальных закупках. Формат и условия определяются отдельно."
      ],
      [
        "Можно ли получать карточки в Telegram?",
        "Рабочий канал нынешней версии — MAX. Подключение Telegram рассматривается как отдельная интеграция с оценкой задачи и стоимости."
      ]
    ]
  },
  {
    "title": "Надёжность и результат",
    "items": [
      [
        "Гарантирует ли сервис победу в тендере?",
        "Сервис отвечает за поддержку первичного отбора. Результат торгов зависит от соответствия требованиям, конкурентной ситуации и подготовленной заявки."
      ],
      [
        "Как оценить экономию времени?",
        "Сравниваем часы ручного просмотра до подключения и время работы с карточками после. Учитываем стоимость часа и фактическую долю высвобождённого ресурса."
      ],
      [
        "Что происходит при сбое источника?",
        "В эксплуатационном контуре используются журналы, диагностика и повторные попытки отдельных операций. Конкретный прогон проверяется по фактическому отчёту."
      ],
      [
        "Как устроена конфиденциальность?",
        "При работе используются внешние сервисы источника, обработки ИИ, хранения и доставки. Состав передаваемых данных, права и договорные требования согласуются до включения конфиденциальных материалов."
      ],
      [
        "Как посмотреть реальные результаты?",
        "Откройте кейс НейроТендеролога с тремя реальными скриншотами и примерами рабочих дней 7 и 18 октября 2026 года."
      ]
    ]
  }
];

const TenderServicePage = () => (
  <PageTransition>
    <Helmet>
      <title>НейроТендеролог: поиск и первичный отбор закупок | НейроРешения</title>
      <meta name="description" content="НейроТендеролог помогает специалисту находить и первично отбирать закупки по профилю компании. Настройка критериев, карточки в MAX, обратная связь специалиста и контроль релевантности." />
      <link rel="canonical" href="https://aleksamois.ru/services/neurotenderolog/" />
      <meta property="og:title" content="НейроТендеролог: отбор закупок | НейроРешения" />
      <meta property="og:description" content="Поток закупок, первичная фильтрация, объяснение отбора и решение человека." />
      <meta property="og:url" content="https://aleksamois.ru/services/neurotenderolog/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <PageBreadcrumbs currentPage="НейроТендеролог" parentPages={[{label:"Услуги",href:"/services"}]} />
      <main>
        <section className="px-4 pt-8 md:px-6 md:pt-12">
          <div className="container mx-auto max-w-7xl">
            <div className="min-w-0 rounded-[30px] bg-surface-mint px-5 py-8 shadow-plate sm:px-7 md:rounded-[40px] md:p-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-dark">Отдельный продукт · Закупки и тендеры</p>
              <h1 className="max-w-4xl break-words text-[27px] font-bold leading-tight text-foreground [overflow-wrap:anywhere] sm:text-3xl md:text-5xl">НейроТендеролог: поиск и первичный отбор закупок</h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/75 md:text-xl">Система помогает сократить ручной просмотр закупок: собирает предложения, применяет профиль компании, готовит предварительный разбор и передаёт решение специалисту.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/start" onClick={()=>setContactIntent({kind:"implementation",process:"Подключение НейроТендеролога. Источник: /services/neurotenderolog"})} className="inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-full bg-foreground px-4 text-center text-sm font-semibold text-background hover:bg-foreground/85 sm:w-auto sm:px-6 sm:text-base">
                  Обсудить отбор закупок <ArrowRight className="h-4 w-4"/>
                </Link>
                <Link to="/cases/neurotenderolog" className="inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 px-2 text-center text-sm font-semibold text-primary-dark hover:underline sm:w-auto sm:px-4 sm:text-base">
                  Реальный кейс и скриншоты <ArrowUpRight className="h-4 w-4"/>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">Рабочий сценарий</p>
          <h2 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">От публикации закупки до решения специалиста</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stages.map(({icon:Icon,n,title,text})=>(
              <article key={n} className="rounded-[22px] border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between"><span className="text-sm font-bold text-primary-dark">{n}</span><Icon className="h-7 w-7 text-primary-dark" aria-hidden="true" /></div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/75">{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="bg-foreground py-14 text-background md:py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="max-w-3xl text-3xl font-bold leading-tight text-background md:text-4xl">Что проверяем перед запуском</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-background/80">Составляем профиль закупок, проверяем релевантность первичного отбора и согласуем работу со спорными случаями.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Профиль компании","Направления, территории, стоп-условия и критерии подходящей закупки."],
                ["Проверка на примерах","Сравнение оценок системы с решениями специалиста на реальных закупках."],
                ["Обратная связь","Причины принятого решения используются для уточнения правил отбора."]
              ].map(([title,text])=>(
                <div key={title} className="rounded-2xl border border-background/20 bg-background/5 p-5">
                  <CheckCircle2 className="mb-4 h-6 w-6 text-accent" />
                  <h3 className="text-xl font-bold text-background">{title}</h3><p className="mt-3 text-base leading-relaxed text-background/85">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="container mx-auto max-w-7xl px-4 py-14 md:py-14">
          <div className="grid gap-7 rounded-[28px] bg-surface-sand p-7 md:grid-cols-12 md:items-center md:p-10">
            <div className="md:col-span-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">Доказательства</p>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Три реальных сценария работы</h2>
              <p className="mt-3 leading-relaxed text-foreground/75">В кейсе собраны скриншоты карточки закупки, дня с подходящим предложением и дня полного отсева. Изображения увеличиваются поверх страницы.</p>
            </div>
            <Link to="/cases/neurotenderolog" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 font-semibold text-background md:col-span-4">
              Смотреть кейс <ArrowUpRight className="h-4 w-4"/>
            </Link>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 pb-12 md:pb-16" aria-labelledby="tender-audience">
          <div className="grid gap-7 rounded-[30px] bg-surface-mint p-6 md:grid-cols-12 md:p-10">
            <div className="md:col-span-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">Для бизнеса</p>
              <h2 id="tender-audience" className="text-3xl font-bold leading-tight text-foreground md:text-4xl">Кому подходит НейроТендеролог</h2>
            </div>
            <div className="grid gap-3 md:col-span-8 sm:grid-cols-2">
              {[
                ["Подрядчики и поставщики", "Регулярный поиск закупок на понятные виды работ и продукцию."],
                ["Тендерные отделы", "Первичный отбор большого потока и передача решения специалисту."],
                ["Рекламные и event-агентства", "Форумы, выставки, промоакции, церемонии и рекламные услуги по своему профилю."],
                ["Руководители направлений", "Ежедневная сводка и прозрачная обратная связь по качеству отбора."],
              ].map(([title,description]) => (
                <article key={title} className="rounded-[22px] border border-foreground/10 bg-white/80 p-5">
                  <h3 className="text-lg font-bold text-foreground">{title}</h3>
                  <p className="mt-2 leading-relaxed text-foreground/75">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="container mx-auto max-w-7xl px-4 pb-12 md:pb-16" aria-labelledby="tender-terms">
          <div className="grid gap-7 rounded-[30px] border border-foreground/10 bg-surface-sand p-6 md:grid-cols-12 md:items-center md:p-10">
            <div className="md:col-span-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">Подписка</p>
              <h2 id="tender-terms" className="text-3xl font-bold text-foreground md:text-4xl">Понятная стоимость по направлениям</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">Стандарт: 3 490 ₽ в месяц за одно направление поиска. Минимальный пакет — три месяца, 10 470 ₽ за направление. Базовая настройка, карточки в MAX, обратная связь и углублённый разбор доступных документов входят в подписку.</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">Количество направлений и индивидуальные условия уточняются перед подключением.</p>
            </div>
            <div className="flex flex-col gap-3 md:col-span-5 md:items-end">
              <Link to="/start" onClick={()=>setContactIntent({kind:"implementation",process:"НейроТендеролог: подключение и тариф. Источник: /services/neurotenderolog"})} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-center font-semibold text-background sm:w-auto">
                Обсудить подключение <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-20" aria-labelledby="tender-faq">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">Вопросы клиентов</p>
            <h2 id="tender-faq" className="text-3xl font-bold leading-tight text-foreground md:text-4xl">Подробные ответы о НейроТендерологе</h2>
            <p className="mt-4 leading-relaxed text-foreground/75">Возможности, источники, настройка, документы, стоимость и роль специалиста. Выберите интересующий вопрос.</p>
          </div>
          <div className="mt-9 space-y-9">
            {productFaqGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-xl font-bold text-foreground md:text-2xl">{group.title}</h3>
                <div className="space-y-3">
                  {group.items.map(([question,answer]) => (
                    <details key={question} className="group rounded-[18px] border border-foreground/10 bg-card px-5 py-4 shadow-sm">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold leading-snug text-foreground md:text-lg">
                        <span>{question}</span><span aria-hidden="true" className="shrink-0 text-xl text-primary-dark transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-4 border-t border-foreground/10 pt-4 leading-relaxed text-foreground/75">{answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/start" onClick={()=>setContactIntent({kind:"implementation",process:"НейроТендеролог: вопрос после FAQ. Источник: /services/neurotenderolog"})} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 font-semibold text-background">
              Обсудить свой профиль закупок <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/cases/neurotenderolog" className="inline-flex min-h-12 items-center gap-2 font-semibold text-primary-dark hover:underline">Посмотреть реальные карточки <ArrowUpRight className="h-4 w-4"/></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  </PageTransition>
);
export default TenderServicePage;
