import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Server, Database, Bot, Users2, ShieldCheck, FileText, Search, LayoutDashboard, Workflow } from "lucide-react";
import PillButton from "@/components/PillButton";

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
    title: "Поиск по карточке документа",
    text:
      "Система ищет по названию, тегам, имени файла, проекту, направлению, источнику и ответственному. Такой поиск подходит, когда сотрудник знает хотя бы часть реквизитов документа.",
  },
  {
    title: "Поиск по содержимому файлов",
    text:
      "Если результатов по карточкам мало, портал подключает полнотекстовый поиск и смотрит уже внутрь самих документов. Так можно найти нужный материал по слову или формулировке, которая встречается в тексте файла. Например, по запросу «скорость» портал подбирает документы, связанные со скоростным режимом и соответствующими требованиями.",
  },
  {
    title: "Поиск по смыслу через корпоративную базу знаний",
    text:
      "Для более сложного вопроса сотрудник использует режим «Спросить ИИ». Он формулирует вопрос обычным языком, а система ищет подходящие фрагменты корпоративных документов, учитывает связи между источниками и формирует ответ с указанием материалов.",
  },
];

const jarvisScenarios = [
  { title: "Планёрки", text: "Материалы рабочих встреч собираются и обрабатываются в одном контуре." },
  { title: "Командировки", text: "Информация из рабочих поездок и выездов фиксируется через привычный интерфейс." },
  { title: "Календарь", text: "Рабочие события и напоминания становятся частью общего цифрового процесса." },
  { title: "Корпоративный поиск", text: "Сотрудник задаёт вопросы по базе знаний и получает ответы по документам компании." },
  { title: "Документы в портал", text: "Новые материалы передаются в корпоративный контур." },
  { title: "Портал АТС", text: "Из MAX сотрудник быстро переходит к базе знаний." },
  { title: "Поддержка", text: "Рабочие обращения поступают через единую точку входа." },
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
  "корпоративный портал документов и знаний",
  "поиск по метаданным",
  "полнотекстовый поиск по содержимому файлов",
  "поиск и ответы по смыслу через корпоративную базу знаний",
  "серверная фильтрация доступа по ролям и проектам",
  "управленческий дашборд",
  "Jarvis в MAX",
  "планёрки",
  "командировки",
  "календарные сценарии",
  "загрузка документов в портал",
  "автоматический контроль данных из Excel",
  "обработка отдельных выгрузок из 1С",
  "автоматическая сверка рабочих данных",
  "сбор файлов из рабочих чатов",
  "регулярная передача данных между внутренними контурами",
  "рабочие уведомления и поддержка",
];

const businessValue = [
  { title: "Документы становятся управляемыми", text: "У каждого документа есть проект, роль, источник, направление, срок действия и место в общей системе." },
  { title: "Информацию можно искать по рабочей задаче", text: "Сотрудник использует реквизиты документа, слова из содержания или обычный вопрос на человеческом языке." },
  { title: "Корпоративные знания доступны прямо из MAX", text: "Для быстрого вопроса достаточно открыть Jarvis." },
  { title: "Руководитель видит проблемные места", text: "Дашборд показывает документы и данные, которые требуют внимания." },
  { title: "Права доступа встроены в поиск", text: "Система сначала определяет доступный пользователю контур документов, а затем формирует результат." },
  { title: "Сотрудники сохраняют привычные инструменты", text: "Excel, MAX и 1С продолжают выполнять свои рабочие функции." },
  { title: "Регулярные проверки выполняются автоматически", text: "Сотрудник получает готовый результат вместо ежедневного ручного просмотра таблиц и файлов." },
  { title: "Основной рабочий контур размещён локально", text: "Файлы документов, индексы, распознавание сканов, корпоративный поиск, Jarvis и автоматические сценарии работают на сервере компании." },
  { title: "Новые задачи подключаются к общей архитектуре", text: "Портал, база знаний, Jarvis и автоматизации становятся фундаментом для следующих этапов цифрового развития." },
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

const SectionNumber = ({ n }: { n: string }) => (
  <div className="font-iriska italic text-accent text-3xl md:text-4xl leading-none mb-3">{n}</div>
);

const AkTransServiceContent = () => {
  return (
    <main>
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

      {/* Главный принцип */}
      <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="rounded-[28px] md:rounded-[32px] bg-surface-sand ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-10 md:py-14">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
            Главный принцип проекта
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-6 max-w-3xl">
            Развивать цифровую систему, сохраняя{" "}
            <span className="font-iriska font-normal italic text-accent">привычную работу</span> сотрудников
          </h2>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl mb-4">
            АкТрансСервис — транспортная компания, работающая в нефтегазовом секторе. Внутри компании одновременно используются 1С, Excel-таблицы, корпоративные документы, сетевые папки, MAX и рабочие процессы нескольких подразделений и проектов.
          </p>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl mb-8">
            Мы сохранили инструменты, которые уже выполняют свою функцию, и начали связывать их в единую архитектуру.
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4 mb-8">
            {principleItems.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-foreground/80">
                <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl">
            Новые решения появляются там, где они сокращают ручную работу, ускоряют доступ к информации или усиливают контроль.
          </p>
        </div>
      </section>

      {/* 01 Портал знаний */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <article className="rounded-[28px] md:rounded-[32px] bg-card ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-5">
              <SectionNumber n="01" />
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">Портал знаний</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Документы стали частью управляемой системы
              </h2>
            </div>
            <div className="md:col-span-7 space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed">
              <p>В компании большой массив нормативных, внутренних и проектных документов.</p>
              <p>Один документ может относиться к конкретному проекту, направлению, группе сотрудников, источнику и сроку действия. В портале эта логика собрана в одной системе.</p>
              <p>Сотрудник работает с документами своего проекта и своей роли, использует направления, источники и другие параметры, а каждый документ получает собственное место в корпоративной структуре.</p>
              <div className="rounded-[24px] bg-surface-mint ring-1 ring-foreground/5 p-6">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">Документ сразу получает контекст</h3>
                <p className="text-base text-foreground/80 mb-3">При добавлении в портал для документа фиксируются:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["срок действия", "источник", "направление", "роли", "проекты", "теги", "дополнительные признаки"].map((t, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-background/80 ring-1 ring-foreground/10 text-sm text-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-base text-foreground/80 mb-3">
                  За счёт этого система понимает, где документ используется, кому он относится и когда требует внимания.
                </p>
                <p className="text-base text-foreground/80">
                  Связи между документами, ролями, проектами, сроками и источниками создают основу для поиска, контроля, аналитики и дальнейших автоматизаций.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* 02 Три слоя поиска */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10 md:mb-12">
          <SectionNumber n="02" />
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Три слоя поиска</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.05]">
            Сотрудник может искать так, как формулирует{" "}
            <span className="font-iriska font-normal italic text-accent">рабочую задачу</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/70 mt-5">
            В портале работают три механизма поиска. Каждый решает свою задачу.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {searchLayers.map((s, i) => (
            <article key={i} className="rounded-[28px] bg-card ring-1 ring-foreground/5 shadow-card p-7 md:p-9">
              <div className="w-12 h-12 rounded-2xl bg-surface-mint flex items-center justify-center ring-1 ring-foreground/10 mb-4">
                <Search className="w-6 h-6 text-accent" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-foreground leading-tight mb-3">{s.title}</h3>
              <p className="text-base text-foreground/80 leading-relaxed">{s.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-[28px] bg-surface-lavender ring-1 ring-foreground/5 shadow-card px-7 md:px-10 py-8 md:py-10">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">Права доступа учитываются до поиска</h3>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-2">
                Перед выдачей результата сервер формирует набор документов, доступных конкретному пользователю по его роли и проекту. Эта логика действует для обычного поиска и для работы с корпоративной базой знаний.
              </p>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                Сотрудник получает свой рабочий контур документов в соответствии с ролью и проектом.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Дашборд */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <article className="rounded-[28px] md:rounded-[32px] bg-surface-blush ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-5">
              <SectionNumber n="03" />
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">Руководителю нужен контроль</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Портал показывает состояние корпоративной базы
              </h2>
            </div>
            <div className="md:col-span-7 space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed">
              <p>Для руководителя создан отдельный управленческий дашборд. Он показывает документы и данные, которые требуют внимания:</p>
              <div className="flex flex-wrap gap-2">
                {["истекающие сроки", "проблемы со статусами", "документы без назначенных ролей", "состояние групп доступа", "динамику наполнения базы"].map((t, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 ring-1 ring-foreground/10 text-sm text-foreground">
                    <LayoutDashboard className="w-4 h-4 text-accent" />
                    {t}
                  </span>
                ))}
              </div>
              <p>Руководитель получает картину по проблемным зонам и понимает, где требуется действие.</p>
              <p>Портал работает одновременно как база документов, система поиска и инструмент контроля качества корпоративных знаний.</p>
            </div>
          </div>
        </article>
      </section>

      {/* 04 Знания в MAX */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10 md:mb-12">
          <SectionNumber n="04" />
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Те же знания доступны прямо в MAX</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.05]">
            Один контур знаний —{" "}
            <span className="font-iriska font-normal italic text-accent">два способа работы</span>
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[28px] bg-card ring-1 ring-foreground/5 shadow-card p-7 md:p-9">
            <div className="w-12 h-12 rounded-2xl bg-surface-mint flex items-center justify-center ring-1 ring-foreground/10 mb-4">
              <FileText className="w-6 h-6 text-accent" strokeWidth={1.75} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">Найти документ</h3>
            <p className="text-base text-foreground/80 leading-relaxed mb-3">
              Портал подходит для самостоятельного поиска, просмотра и изучения документа.
            </p>
            <p className="text-base text-foreground/80 leading-relaxed">
              Через портал — по карточке, содержимому файла или смыслу запроса.
            </p>
          </article>
          <article className="rounded-[28px] bg-surface-sand ring-1 ring-foreground/5 shadow-card p-7 md:p-9">
            <div className="w-12 h-12 rounded-2xl bg-background/80 flex items-center justify-center ring-1 ring-foreground/10 mb-4">
              <Bot className="w-6 h-6 text-accent" strokeWidth={1.75} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">Получить ответ</h3>
            <p className="text-base text-foreground/80 leading-relaxed mb-3">
              Jarvis в MAX подходит для быстрого рабочего вопроса. Например, сотрудник пишет: «Какие документы по охране труда у нас есть?»
            </p>
            <p className="text-base text-foreground/80 leading-relaxed">
              Jarvis обращается к корпоративной базе знаний и формирует ответ по документам компании.
            </p>
          </article>
        </div>
        <p className="text-base md:text-lg text-foreground/70 leading-relaxed mt-6 max-w-3xl">
          В обоих случаях сотрудник работает с одной корпоративной системой знаний. Интерфейс выбирается под конкретную рабочую задачу.
        </p>
      </section>

      {/* 05 Качество ответа */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <article className="rounded-[28px] md:rounded-[32px] bg-surface-mint ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-10 md:py-14">
          <SectionNumber n="05" />
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">Качество ответа встроено в процесс</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6 max-w-3xl">
            После ответа Jarvis сотрудник может выбрать оценку
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Верно", "Неверно", "Неполно"].map((t, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-background/80 ring-1 ring-foreground/10 text-sm font-medium text-foreground">
                {t}
              </span>
            ))}
          </div>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl mb-6">
            Такая обратная связь помогает отслеживать качество корпоративного поиска, находить слабые места и улучшать базу знаний.
          </p>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
            Для сотрудника сценарий выглядит просто: вопрос в MAX → ответ по корпоративным документам → оценка результата.
          </p>
        </article>
      </section>

      {/* 06 Jarvis в MAX */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10 md:mb-12">
          <SectionNumber n="06" />
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Jarvis в MAX</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.05]">
            Один вход для повседневных{" "}
            <span className="font-iriska font-normal italic text-accent">рабочих сценариев</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/70 mt-5">
            MAX уже используется сотрудниками как рабочий мессенджер, поэтому часть цифровых процессов мы вынесли прямо туда. Сегодня через Jarvis доступны разные направления работы.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jarvisScenarios.map((s, i) => (
            <div key={i} className="rounded-[24px] bg-card ring-1 ring-foreground/5 p-7 shadow-card">
              <Bot className="w-6 h-6 text-accent mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-2">{s.title}</h3>
              <p className="text-sm md:text-base text-foreground/70 leading-snug">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="text-base md:text-lg text-foreground/70 leading-relaxed mt-6 max-w-3xl">
          Jarvis постепенно становится связующим интерфейсом между сотрудником и внутренними цифровыми сервисами компании.
        </p>
      </section>

      {/* CTA mid */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="container mx-auto max-w-7xl">
          <div className="rounded-[32px] md:rounded-[40px] bg-card overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-10 md:py-14 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3">
                Хотите связать цифровые процессы своей компании?
              </h2>
              <p className="text-base md:text-lg text-foreground/70">
                Разберём текущую систему и определим, какой процесс даст основной эффект первым.
              </p>
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
      </section>

      {/* 07 Excel */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10 md:mb-12">
          <SectionNumber n="07" />
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Excel остался. Ручная проверка ушла.</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.05]">
            Автоматический контроль{" "}
            <span className="font-iriska font-normal italic text-accent">поверх привычных таблиц</span>
          </h2>
          <div className="space-y-4 text-base md:text-lg text-foreground/70 mt-5">
            <p>
              В компании есть Excel-таблицы, с которыми подразделения работают постоянно. В них уже накоплены данные, сотрудники знают правила заполнения и используют их в ежедневной работе.
            </p>
            <p>Мы сохранили этот привычный слой и автоматизировали контроль поверх него.</p>
            <p>
              Сценарии работают на локальном сервере компании: читают рабочие Excel-файлы и выгрузки, проверяют условия, собирают нужную информацию и отправляют результат сотрудникам в MAX.
            </p>
            <p>Сейчас в рабочем контуре действуют несколько таких автоматизаций.</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {automations.map((a, i) => (
            <div key={i} className="rounded-[24px] bg-surface-sand ring-1 ring-foreground/5 p-7 shadow-card">
              <Workflow className="w-6 h-6 text-accent mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-2">{a.title}</h3>
              <p className="text-sm md:text-base text-foreground/70 leading-snug">{a.text}</p>
            </div>
          ))}
        </div>
        <p className="text-base md:text-lg text-foreground/70 leading-relaxed mt-6 max-w-3xl">
          Из таких ежедневных операций складывается значительная часть ручной нагрузки сотрудников. Автоматизация берёт на себя повторяющуюся проверку, а человек получает готовый результат для принятия решения.
        </p>
      </section>

      {/* 08 Локальный сервер */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <article className="rounded-[28px] md:rounded-[32px] bg-surface-lavender ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-10 md:py-14">
          <SectionNumber n="08" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6 max-w-3xl">
            Основной цифровой контур работает на локальном сервере компании
          </h2>
          <p className="text-base md:text-lg text-foreground/80 mb-4">На локальной инфраструктуре АкТрансСервиса работают:</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {localStack.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 ring-1 ring-foreground/10 text-sm text-foreground">
                <Server className="w-4 h-4 text-accent" />
                {t}
              </span>
            ))}
          </div>
          <div className="space-y-3 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
            <p>Сами файлы корпоративных документов хранятся на сервере компании.</p>
            <p>Индексация и обработка текстов выполняются локально.</p>
            <p>
              Такая архитектура позволяет развивать основной рабочий контур рядом с корпоративными данными и постепенно подключать к нему новые сценарии.
            </p>
          </div>
        </article>
      </section>

      {/* 09 Маленькой задаче */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <article className="rounded-[28px] md:rounded-[32px] bg-card ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-5">
              <SectionNumber n="09" />
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">Маленькой задаче — точное решение</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Перенос рабочих сообщений из WhatsApp в MAX за один день
              </h2>
            </div>
            <div className="md:col-span-7 space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed">
              <p>
                При переходе компании на MAX появилась отдельная практическая задача: перенести историю рабочих сообщений из WhatsApp. Для неё сделали компактный скрипт и выполнили перенос за один рабочий день.
              </p>
              <p>Этот эпизод хорошо показывает принцип проекта: размер решения соответствует размеру задачи.</p>
              <ul className="space-y-2">
                {[
                  "Для одной задачи достаточно скрипта.",
                  "Для другой требуется портал.",
                  "Для третьей — корпоративный поиск.",
                  "Для четвёртой — автоматический контроль на сервере.",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p>Технология выбирается после анализа процесса и ожидаемого результата.</p>
            </div>
          </div>
        </article>
      </section>

      {/* Как всё связано */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Как всё связано</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.05]">
            Единый цифровой слой поверх{" "}
            <span className="font-iriska font-normal italic text-accent">существующей работы</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/70 mt-5">
            Внутри проекта постепенно формируется одна логика: сотрудник → роль → проект → документы → корпоративные знания → рабочий сценарий → контроль.
          </p>
        </div>
        <div className="rounded-[28px] bg-surface-mint ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-10 md:py-12">
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
            {connections.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-base md:text-lg text-foreground/80">
                <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Что работает сейчас */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Что работает сейчас</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.05]">
            Проект используется и{" "}
            <span className="font-iriska font-normal italic text-accent">продолжает развиваться</span>
          </h2>
        </div>
        <div className="rounded-[28px] bg-card ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-10 md:py-12">
          <p className="text-base md:text-lg text-foreground/80 mb-6">Сегодня в рабочем контуре работают:</p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {nowWorking.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-foreground/80">
                <Database className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed mt-8">
            Проект развивается поэтапно. Каждый следующий сценарий подключается к общей архитектуре и использует уже созданные компоненты.
          </p>
        </div>
      </section>

      {/* Что это меняет для бизнеса */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Что это меняет для бизнеса</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
            Управляемость{" "}
            <span className="font-iriska font-normal italic text-accent">вместо разрозненности</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {businessValue.map((b, i) => (
            <div key={i} className="rounded-[24px] bg-card ring-1 ring-foreground/5 p-7 shadow-card">
              <CheckCircle2 className="w-6 h-6 text-accent mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-2">{b.title}</h3>
              <p className="text-sm md:text-base text-foreground/70 leading-snug">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Почему этот кейс важен */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-5">
          <article className="rounded-[28px] bg-surface-sand ring-1 ring-foreground/5 shadow-card px-7 md:px-10 py-9 md:py-12">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Почему этот кейс важен</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6">
              Цифровизация реальной компании начинается с того, что уже есть
            </h3>
            <ul className="space-y-2 mb-6">
              {["В бизнесе уже есть 1С.", "Есть Excel.", "Есть документы.", "Есть MAX.", "Есть сотрудники со своими привычками.", "Есть процессы, которые работают каждый день."].map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-base md:text-lg text-foreground/80">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-3">
              Поэтому мы строим цифровую систему вокруг реальной работы компании.
            </p>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Берём живую компанию со сложной инфраструктурой и поэтапно превращаем разрозненные процессы в управляемую систему, сохраняя всё ценное, что уже работает.
            </p>
          </article>

          <article className="rounded-[28px] bg-surface-mint ring-1 ring-foreground/5 shadow-card px-7 md:px-10 py-9 md:py-12">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Как выбирается технология</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6">
              Решение под задачу, а не наоборот
            </h3>
            <ul className="space-y-2 mb-6">
              {[
                "Где-то для этого нужен портал.",
                "Где-то — поиск по корпоративным знаниям.",
                "Где-то — Jarvis.",
                "Где-то — автоматическая проверка Excel.",
                "Где-то — обработка выгрузки из 1С.",
                "Где-то — скрипт на один день.",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-base md:text-lg text-foreground/80">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Главный критерий выбора технологии — результат для бизнеса, скорость внедрения и реальная применимость для сотрудников.
            </p>
          </article>
        </div>
      </section>

      {/* Проект продолжается */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <article className="rounded-[28px] md:rounded-[32px] bg-surface-lavender ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-10 md:py-14">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">Проект продолжается</p>
          <div className="space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
            <p>АкТрансСервис — действующий проект цифрового развития.</p>
            <p>
              Созданные решения становятся основой для следующих этапов: развития корпоративной базы знаний, новых сценариев Jarvis, дальнейшей автоматизации внутренних процессов и цифровых ознакомлений сотрудников с документами.
            </p>
            <p>Каждый следующий этап развивается на уже созданном цифровом фундаменте.</p>
            <p>Так компания последовательно получает связанную систему вместо набора отдельных инициатив.</p>
          </div>
        </article>
      </section>

      {/* Финальный CTA */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="container mx-auto max-w-7xl">
          <div className="rounded-[32px] md:rounded-[40px] bg-surface-mint overflow-hidden shadow-plate-lg ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
              Хотите связать цифровые процессы своей компании в одну систему?
            </h2>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl mb-6">
              Если документы, Excel, 1С, мессенджеры и рабочие процессы существуют в разных контурах, первый шаг — увидеть всю систему целиком.
            </p>
            <ul className="space-y-2 mb-9">
              {[
                "Что уже работает.",
                "Где сотрудники тратят время вручную.",
                "Какие данные стоит связать.",
                "Какой процесс даст основной эффект первым.",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-base md:text-lg text-foreground/80">
                  <Users2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <span>{t}</span>
                </li>
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
