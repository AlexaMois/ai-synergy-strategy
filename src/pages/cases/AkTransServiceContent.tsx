import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PillButton from "@/components/PillButton";
import portalShot from "@/assets/cases/aktrans/portal.webp";
import docFormShot from "@/assets/cases/aktrans/doc-form.webp";
import dashboardShot from "@/assets/cases/aktrans/dashboard.webp";
import jarvisMenuShot from "@/assets/cases/aktrans/jarvis-menu.webp";
import jarvisAnswerShot from "@/assets/cases/aktrans/jarvis-answer.webp";

const heroTags = [
  "Портал знаний",
  "Jarvis в MAX",
  "Корпоративный поиск",
  "Автоматизация Excel",
  "Работа с выгрузками из 1С",
  "Локальная инфраструктура",
];

const principleItems = [
  "1С продолжает работать как учётная система. Для отдельных сценариев используются выгрузки из неё.",
  "Excel остаётся рабочим инструментом подразделений.",
  "MAX служит привычной точкой входа для сотрудников.",
  "Портал собирает корпоративные документы, роли, проекты и доступы.",
  "Jarvis связывает знания, рабочие сценарии, уведомления и автоматические проверки.",
];

const searchLayers = [
  {
    title: "По карточке документа",
    text:
      "Система ищет по названию, тегам, имени файла, проекту, направлению, источнику и ответственному. Такой поиск подходит, когда сотрудник знает хотя бы часть реквизитов документа.",
  },
  {
    title: "По содержимому файлов",
    text:
      "Если результатов по карточкам мало, портал подключает полнотекстовый поиск и смотрит уже внутрь самих документов. Так можно найти нужный материал по слову или формулировке, которая встречается в тексте файла. Например, по запросу «скорость» портал подбирает документы, связанные со скоростным режимом и соответствующими требованиями.",
  },
  {
    title: "По смыслу через базу знаний",
    text:
      "Для более сложного вопроса сотрудник использует режим «Спросить ИИ». Он формулирует вопрос обычным языком, а система ищет подходящие фрагменты корпоративных документов, учитывает связи между источниками и формирует ответ с указанием материалов.",
  },
];

const jarvisScenarios = [
  ["Планёрки", "материалы рабочих встреч собираются и обрабатываются в одном контуре"],
  ["Командировки", "информация из рабочих поездок и выездов фиксируется через привычный интерфейс"],
  ["Календарь", "рабочие события и напоминания становятся частью общего цифрового процесса"],
  ["Корпоративный поиск", "сотрудник задаёт вопросы по базе знаний и получает ответы по документам компании"],
  ["Документы в портал", "новые материалы передаются в корпоративный контур"],
  ["Портал АТС", "из MAX сотрудник быстро переходит к базе знаний"],
  ["Поддержка", "рабочие обращения поступают через единую точку входа"],
];

const automations = [
  { title: "Контроль поверки приборов", text: "Система ежедневно проверяет данные и формирует уведомление по приборам, которые требуют внимания." },
  { title: "Контроль пропусков сотрудников", text: "Автоматизация отслеживает сроки пропусков и показывает просроченные и приближающиеся даты." },
  { title: "Контроль пропусков транспорта", text: "Отдельный сценарий выполняет такой же контроль для транспортных средств." },
  { title: "Сбор Excel-файлов из рабочего чата БДД", text: "Когда в рабочем чате появляется Excel-файл, система автоматически забирает его и сохраняет в нужную сетевую папку." },
  { title: "Передача данных наблюдателя групп", text: "Отдельный сценарий регулярно передаёт собранные рабочие данные в Bpium." },
  {
    title: "Сверка рабочей сводки механиков с выгрузкой из 1С",
    text:
      "Для этого сценария используется готовая выгрузка отчёта из 1С. Система сопоставляет её с рабочей сводкой механиков и помогает выявлять расхождения между учётными данными и фактической рабочей информацией подразделения.",
  },
];

const localStack = [
  "серверная часть портала",
  "хранение файлов документов",
  "полнотекстовый поиск",
  "распознавание сканов",
  "корпоративная база знаний",
  "интеллектуальный поиск",
  "Jarvis",
  "автоматические сценарии",
  "локальная конвертация документов",
];

const nowWorking = [
  "Корпоративный портал документов с ролевым и проектным доступом.",
  "Три слоя поиска: по карточке документа, содержимому файла и смыслу запроса.",
  "Управленческий дашборд и контроль качества корпоративной базы.",
  "Jarvis в MAX для рабочих сценариев и корпоративного поиска.",
  "Автоматический контроль поверх Excel-таблиц и выгрузок из 1С.",
  "Локальная инфраструктура на сервере компании.",
  "Постепенное подключение новых процессов к общей архитектуре.",
];

const businessValue = [
  { title: "Документы становятся управляемыми", text: "У каждого документа есть проект, роль, источник, направление, срок действия и место в общей системе." },
  { title: "Информацию можно искать по рабочей задаче", text: "Сотрудник использует реквизиты документа, слова из содержания или обычный вопрос на человеческом языке." },
  { title: "Корпоративные знания доступны прямо из MAX", text: "Для быстрого вопроса достаточно открыть Jarvis." },
  { title: "Руководитель видит проблемные места", text: "Дашборд показывает документы и данные, которые требуют внимания." },
  { title: "Регулярные проверки выполняются автоматически", text: "Сотрудник получает готовый результат вместо ежедневного ручного просмотра таблиц и файлов." },
];

const connections = [
  "Портал отвечает за структуру корпоративных документов и знаний.",
  "Три слоя поиска помогают находить документ по карточке, содержимому и смыслу задачи.",
  "Jarvis даёт сотруднику доступ к знаниям и рабочим сценариям через MAX.",
  "Excel продолжает использоваться подразделениями в привычных процессах.",
  "Выгрузки из 1С используются в отдельных сценариях сверки.",
  "Локальные автоматизации сами проверяют данные и доставляют результат людям.",
  "Новые задачи подключаются к уже созданной архитектуре.",
];

const Eyebrow = ({ n, children }: { n?: string; children: React.ReactNode }) => (
  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
    {n ? `${n} · ` : ""}
    {children}
  </p>
);

const Shot = ({
  src,
  alt,
  caption,
  narrow = false,
}: {
  src: string;
  alt: string;
  caption: string;
  narrow?: boolean;
}) => (
  <figure className={narrow ? "max-w-md mx-auto" : ""}>
    <div className="rounded-2xl overflow-hidden ring-1 ring-foreground/10 bg-background">
      <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-auto block" />
    </div>
    <figcaption className="mt-3 text-sm text-foreground/55 leading-snug">{caption}</figcaption>
  </figure>
);

const AkTransServiceContent = () => {
  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="pt-8 md:pt-12 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="relative rounded-[32px] md:rounded-[40px] bg-surface-mint overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
            <div className="px-6 md:px-12 lg:px-16 py-12 md:py-20">
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6">
                Кейс · Транспорт · Нефтегаз
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-foreground mb-6 max-w-4xl">
                АкТрансСервис: как связали документы, знания и рабочие процессы в одну цифровую систему
              </h1>
              <p className="text-lg md:text-xl text-foreground/75 mb-5 max-w-3xl leading-snug">
                Вместо ещё одной отдельной программы цифровые инструменты встроили в существующую работу компании: Excel, выгрузки из 1С, MAX и корпоративные документы.
              </p>
              <p className="text-base md:text-lg text-foreground/70 mb-10 max-w-3xl leading-relaxed">
                Портал собирает документы и права доступа, Jarvis помогает сотрудникам работать с корпоративными знаниями и внутренними сценариями, а автоматизации на локальном сервере сами проверяют данные и доставляют результат людям.
              </p>

              <div className="flex flex-wrap gap-2 mb-10 max-w-4xl">
                {heroTags.map((label, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 ring-1 ring-foreground/10 backdrop-blur"
                  >
                    <span className="text-sm font-medium text-foreground leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <PillButton to="/start" variant="dark">
                  Обсудить похожую задачу
                </PillButton>
                <Link
                  to="/services"
                  className="inline-flex items-center text-foreground/80 hover:text-foreground underline-offset-4 hover:underline font-semibold text-base md:text-lg px-2 py-2"
                >
                  Посмотреть услуги
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Главный принцип — обычный текстовый блок на белом */}
      <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-5">
            <Eyebrow>Главный принцип проекта</Eyebrow>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
              Развивать цифровую систему, сохраняя{" "}
              <span className="font-iriska font-normal italic text-accent">привычную работу</span> сотрудников
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed">
            <p>
              АкТрансСервис — транспортная компания, работающая в нефтегазовом секторе. Внутри компании одновременно используются 1С, Excel-таблицы, корпоративные документы, сетевые папки, MAX и рабочие процессы нескольких подразделений и проектов.
            </p>
            <p>Мы сохранили инструменты, которые уже выполняют свою функцию, и начали связывать их в единую архитектуру.</p>
            <ul className="space-y-3 border-l-2 border-accent/40 pl-6">
              {principleItems.map((t, i) => (
                <li key={i} className="text-base text-foreground/75 leading-relaxed">{t}</li>
              ))}
            </ul>
            <p className="text-foreground/70">
              Новые решения появляются там, где они сокращают ручную работу, ускоряют доступ к информации или усиливают контроль.
            </p>
          </div>
        </div>
      </section>

      {/* 01 Портал знаний */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-8 md:mb-10">
          <Eyebrow n="01">Портал знаний</Eyebrow>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-5">
            Документы стали частью управляемой системы
          </h2>
          <div className="space-y-4 text-base md:text-lg text-foreground/75 leading-relaxed">
            <p>В компании большой массив нормативных, внутренних и проектных документов.</p>
            <p>Один документ может относиться к конкретному проекту, направлению, группе сотрудников, источнику и сроку действия. В портале эта логика собрана в одной системе.</p>
            <p>Сотрудник работает с документами своего проекта и своей роли, использует направления, источники и другие параметры, а каждый документ получает собственное место в корпоративной структуре.</p>
          </div>
        </div>

        <Shot
          src={portalShot}
          alt="Корпоративный портал знаний АкТрансСервис: список документов, источники, роли и направления"
          caption="Портал знаний: документы, источники, роли, направления и поиск в одном интерфейсе."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start mt-14 md:mt-20">
          <div className="lg:col-span-5">
            <Shot
              src={docFormShot}
              alt="Форма добавления документа в портал с обязательными полями и тегами"
              caption="Форма добавления документа: контекст фиксируется сразу при загрузке."
              narrow
            />
          </div>
          <div className="lg:col-span-7">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Документ сразу получает контекст</h3>
            <p className="text-base md:text-lg text-foreground/75 mb-4">При добавлении в портал для документа фиксируются:</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["срок действия", "источник", "направление", "роли", "проекты", "теги", "дополнительные признаки"].map((t, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full ring-1 ring-foreground/10 text-sm text-foreground/80">
                  {t}
                </span>
              ))}
            </div>
            <div className="space-y-4 text-base md:text-lg text-foreground/75 leading-relaxed">
              <p>За счёт этого система понимает, где документ используется, кому он относится и когда требует внимания.</p>
              <p>Связи между документами, ролями, проектами, сроками и источниками создают основу для поиска, контроля, аналитики и дальнейших автоматизаций.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Три слоя поиска */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10">
          <Eyebrow n="02">Три слоя поиска</Eyebrow>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
            Сотрудник может искать так, как формулирует{" "}
            <span className="font-iriska font-normal italic text-accent">рабочую задачу</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/70 mt-5">
            В портале работают три механизма поиска. Каждый решает свою задачу.
          </p>
        </div>
        <div className="grid gap-8 md:gap-10 md:grid-cols-3 border-t border-foreground/10 pt-8">
          {searchLayers.map((s, i) => (
            <div key={i}>
              <div className="font-iriska italic text-accent text-2xl leading-none mb-3">0{i + 1}</div>
              <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-3">{s.title}</h3>
              <p className="text-base text-foreground/70 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 border-l-2 border-accent pl-6 max-w-3xl">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Права доступа учитываются до поиска</h3>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed mb-2">
            Перед выдачей результата сервер формирует набор документов, доступных конкретному пользователю по его роли и проекту. Эта логика действует для обычного поиска и для работы с корпоративной базой знаний.
          </p>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
            Сотрудник получает свой рабочий контур документов в соответствии с ролью и проектом.
          </p>
        </div>
      </section>

      {/* 03 Дашборд */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-8 md:mb-10">
          <Eyebrow n="03">Руководителю нужен контроль</Eyebrow>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-5">
            Портал показывает состояние корпоративной базы
          </h2>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
            Для руководителя создан отдельный управленческий дашборд. Он показывает документы и данные, которые требуют внимания: истекающие сроки, проблемы со статусами, документы без назначенных ролей, состояние групп доступа и динамику наполнения базы.
          </p>
        </div>

        <Shot
          src={dashboardShot}
          alt="Управленческий дашборд портала: сроки, статусы, группы доступа и динамика документов"
          caption="Управленческий дашборд: что требует действия прямо сейчас."
        />

        <div className="max-w-3xl mt-8 space-y-3 text-base md:text-lg text-foreground/75 leading-relaxed">
          <p>Руководитель получает картину по проблемным зонам и понимает, где требуется действие.</p>
          <p>Портал работает одновременно как база документов, система поиска и инструмент контроля качества корпоративных знаний.</p>
        </div>
      </section>

      {/* 04 Jarvis в MAX */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10">
          <Eyebrow n="04">Jarvis в MAX</Eyebrow>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
            Один вход для повседневных{" "}
            <span className="font-iriska font-normal italic text-accent">рабочих сценариев</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/70 mt-5">
            MAX уже используется сотрудниками как рабочий мессенджер, поэтому часть цифровых процессов мы вынесли прямо туда. Сегодня через Jarvis доступны разные направления работы.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <Shot
              src={jarvisMenuShot}
              alt="Меню бота Jarvis в MAX: планёрки, командировки, календарь, спросить Джарвиса, портал"
              caption="Меню Jarvis в MAX: рабочие сценарии в привычном мессенджере."
              narrow
            />
          </div>
          <div className="lg:col-span-7">
            <ul className="divide-y divide-foreground/10 border-t border-foreground/10">
              {jarvisScenarios.map(([title, text], i) => (
                <li key={i} className="py-4">
                  <span className="text-base md:text-lg font-semibold text-foreground">{title}</span>
                  <span className="text-base md:text-lg text-foreground/70"> — {text}.</span>
                </li>
              ))}
            </ul>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed mt-6">
              Jarvis постепенно становится связующим интерфейсом между сотрудником и внутренними цифровыми сервисами компании.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start mt-14 md:mt-20">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Один контур знаний, два способа работы</h3>
            <div className="space-y-4 text-base md:text-lg text-foreground/75 leading-relaxed">
              <p>
                Портал подходит для самостоятельного поиска, просмотра и изучения документа: по карточке, содержимому файла или смыслу запроса.
              </p>
              <p>
                Jarvis в MAX подходит для быстрого рабочего вопроса. Например, сотрудник пишет: «Какие документы по охране труда у нас есть?» Jarvis обращается к корпоративной базе знаний и формирует ответ по документам компании.
              </p>
              <p>
                В обоих случаях сотрудник работает с одной корпоративной системой знаний. Интерфейс выбирается под конкретную рабочую задачу.
              </p>
              <p>
                После ответа Jarvis сотрудник может выбрать оценку: «Верно», «Неверно», «Неполно». Такая обратная связь помогает отслеживать качество корпоративного поиска, находить слабые места и улучшать базу знаний.
              </p>
              <p className="text-foreground/70">
                Для сотрудника сценарий выглядит просто: вопрос в MAX → ответ по корпоративным документам → оценка результата.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <Shot
              src={jarvisAnswerShot}
              alt="Ответ Jarvis в MAX на вопрос о документах по охране труда со ссылками на регламенты"
              caption="Ответ Jarvis по корпоративным документам и оценка качества ответа."
              narrow
            />
          </div>
        </div>
      </section>

      {/* 05 Автоматизации — тёмный блок */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="container mx-auto max-w-7xl">
          <div className="rounded-[32px] md:rounded-[40px] bg-foreground text-background px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
              05 · Excel остался. Ручная проверка ушла.
            </p>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-6 max-w-3xl text-background">
              Автоматический контроль поверх привычных таблиц
            </h2>
            <div className="space-y-4 text-base md:text-lg text-background leading-relaxed max-w-3xl mb-10">
              <p className="!text-background">
                В компании есть Excel-таблицы, с которыми подразделения работают постоянно. В них уже накоплены данные, сотрудники знают правила заполнения и используют их в ежедневной работе.
              </p>
              <p className="!text-background">Мы сохранили этот привычный слой и автоматизировали контроль поверх него.</p>
              <p className="!text-background">
                Сценарии работают на локальном сервере компании: читают рабочие Excel-файлы и выгрузки, проверяют условия, собирают нужную информацию и отправляют результат сотрудникам в MAX.
              </p>
            </div>

            <ul className="divide-y divide-background/15 border-t border-background/15">
              {automations.map((a, i) => (
                <li key={i} className="py-5 grid md:grid-cols-12 gap-2 md:gap-6 items-start">
                  <span className="md:col-span-1 text-accent font-semibold text-sm md:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="md:col-span-4 text-base md:text-lg font-semibold">{a.title}</span>
                  <span className="md:col-span-7 text-base text-background leading-relaxed">{a.text}</span>
                </li>
              ))}
            </ul>

            <p className="text-base md:text-lg text-background leading-relaxed mt-8 max-w-3xl">
              Из таких ежедневных операций складывается значительная часть ручной нагрузки сотрудников. Автоматизация берёт на себя повторяющуюся проверку, а человек получает готовый результат для принятия решения.
            </p>
          </div>
        </div>
      </section>

      {/* 06 Архитектура: локальный сервер + связи + что работает сейчас */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10">
          <Eyebrow n="06">Архитектура</Eyebrow>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
            Единый цифровой слой поверх{" "}
            <span className="font-iriska font-normal italic text-accent">существующей работы</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/70 mt-5">
            Внутри проекта постепенно формируется одна логика: сотрудник → роль → проект → документы → корпоративные знания → рабочий сценарий → контроль.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 border-t border-foreground/10 pt-10">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Локальный сервер компании</h3>
            <p className="text-base md:text-lg text-foreground/75 mb-4">На локальной инфраструктуре АкТрансСервиса работают:</p>
            <p className="text-base text-foreground/70 leading-relaxed mb-5">{localStack.join(" · ")}</p>
            <div className="space-y-3 text-base md:text-lg text-foreground/75 leading-relaxed">
              <p>Сами файлы корпоративных документов хранятся на сервере компании.</p>
              <p>Индексация и обработка текстов выполняются локально.</p>
              <p>Такая архитектура позволяет развивать основной рабочий контур рядом с корпоративными данными и постепенно подключать к нему новые сценарии.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Как всё связано</h3>
            <ul className="space-y-3 border-l-2 border-accent/40 pl-6">
              {connections.map((t, i) => (
                <li key={i} className="text-base text-foreground/75 leading-relaxed">{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-10 mt-12">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5">Что работает сейчас</h3>
          <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3 max-w-4xl mb-5">
            {nowWorking.map((t, i) => (
              <li key={i} className="text-base md:text-lg text-foreground/75 leading-relaxed pl-5 relative before:content-['·'] before:absolute before:left-0 before:text-accent">
                {t}
              </li>
            ))}
          </ul>
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl">
            Проект развивается поэтапно. Каждый следующий сценарий подключается к общей архитектуре и использует уже созданные компоненты.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-10 mt-12">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Что это меняет для бизнеса</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-7">
            {businessValue.map((b, i) => (
              <div key={i}>
                <p className="text-base font-semibold text-foreground mb-1.5">{b.title}</p>
                <p className="text-base text-foreground/70 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-foreground/10 pt-10 mt-12 max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">Точечное решение</p>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
            При переходе на MAX историю рабочих сообщений из WhatsApp перенесли компактным скриптом за один день. Размер решения соответствует размеру задачи: где-то достаточно скрипта, где-то — портала, корпоративного поиска или автоматизации на сервере.
          </p>
        </div>
      </section>

      {/* Почему кейс важен и как выбирается технология */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl border-t border-foreground/10 pt-10">
          <Eyebrow>Почему этот кейс важен</Eyebrow>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-5">
            Цифровизация реальной компании начинается с того, что уже есть
          </h2>
          <div className="space-y-4 text-base md:text-lg text-foreground/75 leading-relaxed mb-8">
            <p>
              В бизнесе уже есть 1С, Excel, документы, MAX, сотрудники со своими привычками и процессы, которые работают каждый день. Мы строим цифровую систему вокруг этой реальной работы и поэтапно превращаем разрозненные процессы в управляемую систему, сохраняя всё ценное.
            </p>
            <p>
              Технология выбирается под задачу, а не наоборот. Главный критерий — результат для бизнеса, скорость внедрения и реальная применимость для сотрудников.
            </p>
          </div>
          <div className="border-l-2 border-accent pl-6 space-y-3 text-base md:text-lg text-foreground/75 leading-relaxed">
            <p>АкТрансСервис — действующий проект цифрового развития.</p>
            <p>
              Созданные решения становятся фундаментом для следующих этапов: развития базы знаний, новых сценариев Jarvis, дальнейшей автоматизации и цифровых ознакомлений сотрудников.
            </p>
          </div>
        </div>
      </section>

      {/* Финальный CTA */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="container mx-auto max-w-7xl">
          <div className="rounded-[32px] md:rounded-[40px] bg-surface-mint overflow-hidden shadow-plate-lg ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
              Хотите связать цифровые процессы своей компании{" "}
              <span className="font-iriska font-normal italic text-accent">в одну систему?</span>
            </h2>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl mb-6">
              Если документы, Excel, 1С, мессенджеры и рабочие процессы существуют в разных контурах, первый шаг — увидеть всю систему целиком.
            </p>
            <ul className="space-y-2 mb-9 border-l-2 border-accent pl-6">
              {[
                "Что уже работает.",
                "Где сотрудники тратят время вручную.",
                "Какие данные стоит связать.",
                "Какой процесс даст основной эффект первым.",
              ].map((t, i) => (
                <li key={i} className="text-base md:text-lg text-foreground/80">{t}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <PillButton to="/start" variant="dark">
                Обсудить похожую задачу
              </PillButton>
              <Link
                to="/services"
                className="inline-flex items-center text-foreground/80 hover:text-foreground underline-offset-4 hover:underline font-semibold text-base md:text-lg px-2 py-2"
              >
                Посмотреть форматы работы
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AkTransServiceContent;
