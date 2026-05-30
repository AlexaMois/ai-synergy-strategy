import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Server, Database, Bot, Users2, ShieldCheck, FileText } from "lucide-react";
import PillButton from "@/components/PillButton";

const sections: {
  heading: string;
  body?: string;
  list?: string[];
}[] = [
  {
    heading: "Клиент и контекст",
    body:
      "АкТрансСервис / TransService — транспортная компания, работающая в нефтегазовом секторе. Вахтовый режим, удалённые площадки, производственные и управленческие подразделения. Документы по охране труда, промышленной безопасности, БДД и требованиям заказчиков. 1С — учётное ядро, MAX — рабочий мессенджер, Bpium — слой данных, локальный сервер — основа инфраструктуры.",
  },
  {
    heading: "Исходная ситуация",
    body:
      "Документы, знания и рабочие данные жили в разных местах: 1С, Excel, PDF, локальные папки, сервер, мессенджеры, личные подборки сотрудников, ручные рассылки, устные уточнения. Было сложно понять, какая версия актуальна, кто отвечает за документ, к какому проекту он относится и какие сотрудники должны его видеть. Для нефтегазового контура это критично — документы связаны с безопасностью, требованиями заказчиков, допусками и проверками.",
  },
  {
    heading: "Главная задача",
    body:
      "Собрать не отдельный сервис, а управляемую цифровую архитектуру. Проект разделён на связанные контуры: портал документов, RAG по базе знаний, Jarvis в MAX, роли/проекты/доступы, подготовка цифровых ознакомлений, направление ИИ-аватара и обучающих материалов.",
  },
];

const directions = [
  {
    icon: FileText,
    title: "Портал документов",
    bg: "bg-surface-mint",
    text:
      "Рабочий контур для хранения и управления документами. Описание через поля: ответственный, дата внесения, название, источник, направление, роли, проекты, статус, теги, ИИ-саммари, срок действия. По уточнению на 30.05.2026 в контуре — 68 документов. Портал переведён на локальную инфраструктуру компании.",
  },
  {
    icon: Database,
    title: "RAG по корпоративным документам",
    bg: "bg-surface-sand",
    text:
      "Отдельный интеллектуальный слой: сотрудники и руководители задают вопросы по документам и получают ответы с опорой на источники. Развёрнут на сервере компании, работает через локальный endpoint, используется Jarvis, готовится к работе с порталом. Проведено 4 раунда RAG/RAC-тестирования: точность, наличие источника, различение документов и контекстов заказчиков, корректность формулировок, реакция на нехватку данных.",
  },
  {
    icon: Bot,
    title: "Jarvis в MAX",
    bg: "bg-surface-lavender",
    text:
      "Рабочий интерфейс для сотрудников и внутренних сценариев. MAX — привычная точка входа. Готовы: технический паспорт Jarvis, патчи техпаспорта, пользователи, MAX chat_id, MAX User ID, режимы main и rag, связь с RAG. Jarvis развивается и постепенно подключает новые сценарии — не подаётся как завершённый «супербот на всё».",
  },
  {
    icon: Users2,
    title: "Роли, проекты и доступы",
    bg: "bg-surface-blush",
    text:
      "Основа матрицы ролей и проектов. Группы ролей: рабочие, все ИТР, все АУП, все сотрудники. Проекты / ЦФО: АУП, ДНГКМ, ГПНЗ, СН, ВЧНГ. Эта структура — основа для доступа к документам, будущих ознакомлений, RAG-контекста, обучения и отчётности.",
  },
  {
    icon: ShieldCheck,
    title: "Подготовка цифровых ознакомлений",
    bg: "bg-card",
    text:
      "Следующий этап — связать сотрудника, роль, проект, документ, версию, дату ознакомления, способ подтверждения, статус и отчёт. Сейчас подготовлена основа: портал, документы, роли, проекты, пользователи и структура данных. Юридически значимый модуль ознакомлений публично не заявляется как запущенный — он на этапе проектирования.",
  },
  {
    icon: Server,
    title: "Локальная инфраструктура",
    bg: "bg-surface-mint",
    text:
      "Портал и RAG развиваются внутри корпоративного контура компании. Это важно для контроля данных, устойчивости и развития проекта без зависимости от внешних SaaS-сервисов.",
  },
];

const businessValue = [
  {
    title: "Единый контур документов",
    text:
      "Документы переходят из разрозненного хранения в управляемую структуру с ответственными, статусами, ролями, проектами и сроками действия.",
  },
  {
    title: "Быстрый доступ к знаниям",
    text:
      "RAG создаёт основу для быстрого поиска по корпоративным документам и ответов с опорой на источники.",
  },
  {
    title: "Меньше зависимости от отдельных сотрудников",
    text:
      "Знания перестают храниться только в личных подборках, памяти сотрудников и устных уточнениях.",
  },
  {
    title: "Подготовка к проверкам",
    text:
      "Структурированный контур документов помогает быстрее понимать, какие документы есть, кто за них отвечает и что требует актуализации.",
  },
  {
    title: "Основа для цифровых ознакомлений",
    text:
      "Проект формирует базу для контура «сотрудник — документ — версия — дата — подтверждение — отчёт».",
  },
  {
    title: "Работа в локальной инфраструктуре",
    text:
      "Портал и RAG развиваются в контуре компании, что важно для контроля данных и корпоративной безопасности.",
  },
];

const facts: { label: string; value: string }[] = [
  { label: "Компания", value: "АкТрансСервис / TransService" },
  { label: "Отрасль", value: "Транспорт, нефтегазовый контур" },
  { label: "Инфраструктура", value: "Локальный сервер компании" },
  { label: "Рабочий мессенджер", value: "MAX" },
  { label: "Слой данных", value: "Bpium" },
  { label: "Документы в контуре", value: "68" },
  { label: "RAG/RAC-тестирование", value: "4 раунда" },
  { label: "Статус", value: "Рабочий цифровой контур, развивается" },
];

const honest = [
  "Портал работает и дорабатывается",
  "Документы заведены в управляемый контур",
  "RAG проходит контроль качества",
  "Jarvis развивается как рабочий интерфейс",
  "Цифровые ознакомления готовятся как следующий этап",
];

const nextSteps = [
  "Сверить все 68 документов",
  "Закрепить владельцев",
  "Проверить статусы и сроки действия",
  "Подтвердить документы для RAG",
  "Оформить протокол 4 раундов тестирования",
  "Создать глоссарий и описать иерархию источников",
  "Оформить паспорт сценариев Jarvis",
  "Разделить сценарии: работает / в работе / планируется",
  "Подготовить модель цифровых ознакомлений",
  "Запустить пилот ознакомлений на ограниченной группе документов",
];

const metrics = [
  { value: "68", label: "документов в управляемом контуре" },
  { value: "4", label: "раунда RAG/RAC-тестирования" },
  { value: "6", label: "связанных контуров проекта" },
];

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
                АкТрансСервис: цифровой контур документов, знаний и внутренних процессов
              </h1>
              <p className="text-lg md:text-xl text-foreground/75 mb-10 max-w-3xl leading-snug">
                68 документов в управляемом контуре и 4 раунда проверки качества RAG. Для транспортной компании в нефтегазовом контуре создаётся цифровая система для работы с документами, ролями, проектами, базой знаний и внутренними запросами сотрудников.
              </p>

              <div className="flex flex-wrap gap-2 mb-10 max-w-4xl">
                {[
                  { icon: FileText, label: "Портал документов" },
                  { icon: Server, label: "Локальная инфраструктура" },
                  { icon: Database, label: "RAG" },
                  { icon: Bot, label: "Jarvis в MAX" },
                  { icon: Users2, label: "Роли, проекты, доступы" },
                  { icon: ShieldCheck, label: "Цифровые ознакомления" },
                ].map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={i}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 ring-1 ring-foreground/10 backdrop-blur"
                    >
                      <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground leading-tight">
                        {b.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                <PillButton to="/start" variant="dark">
                  Обсудить похожий проект
                </PillButton>
                <Link
                  to="/services/vnedrenie-ii-v-biznes"
                  className="inline-flex items-center text-foreground/80 hover:text-foreground underline-offset-4 hover:underline font-semibold text-base md:text-lg px-2 py-2"
                >
                  Посмотреть услуги по внедрению
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Метрики */}
      <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
            Цифры проекта
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
            Проект{" "}
            <span className="font-iriska font-normal italic text-accent">в цифрах</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden shadow-card">
          {metrics.map((m, i) => (
            <div key={i} className="bg-card p-6 md:p-8">
              <div className="font-iriska font-bold text-accent leading-none mb-3 text-5xl md:text-6xl">
                {m.value}
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-snug">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Контекст и задача */}
      <section className="container mx-auto max-w-7xl px-4 pb-12 md:pb-16">
        <div className="space-y-5 md:space-y-6">
          {sections.map((s, i) => {
            const palettes = ["bg-surface-sand", "bg-card", "bg-surface-lavender"];
            const bg = palettes[i % palettes.length];
            return (
              <article
                key={i}
                className={`rounded-[28px] md:rounded-[32px] ${bg} ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-8 md:py-12`}
              >
                <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                  <div className="md:col-span-5">
                    <div className="font-iriska italic text-accent text-3xl md:text-4xl leading-none mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="md:col-span-7">
                    {s.body && (
                      <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                        {s.body}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Что сделали — направления */}
      <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
            Что сделали
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
            Шесть связанных{" "}
            <span className="font-iriska font-normal italic text-accent">контуров</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {directions.map((d, i) => {
            const Icon = d.icon;
            return (
              <article
                key={i}
                className={`rounded-[28px] ${d.bg} ring-1 ring-foreground/5 shadow-card p-7 md:p-9`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-background/70 backdrop-blur flex items-center justify-center ring-1 ring-foreground/10 flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight pt-2">
                    {d.title}
                  </h3>
                </div>
                <p className="text-base text-foreground/80 leading-relaxed">{d.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA mid */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="container mx-auto max-w-7xl">
          <div className="rounded-[32px] md:rounded-[40px] bg-card overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-10 md:py-14 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3">
                Хотите похожий цифровой контур в своей компании?
              </h2>
              <p className="text-base md:text-lg text-foreground/70">
                Разберём текущую систему, найдём слабые места и соберём план: документы, роли, база знаний, RAG, внутренние помощники, цифровые ознакомления.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PillButton to="/start" variant="dark">
                Обсудить проект
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

      {/* Что это даёт бизнесу */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
            Что это даёт бизнесу
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
            Управляемость{" "}
            <span className="font-iriska font-normal italic text-accent">вместо разрозненности</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {businessValue.map((b, i) => (
            <div
              key={i}
              className="rounded-[24px] bg-card ring-1 ring-foreground/5 p-7 shadow-card"
            >
              <CheckCircle2 className="w-6 h-6 text-accent mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-2">
                {b.title}
              </h3>
              <p className="text-sm md:text-base text-foreground/70 leading-snug">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Факты проекта */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="rounded-[28px] md:rounded-[32px] bg-surface-lavender ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-10 md:py-14">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
            Факты проекта
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.05] mb-8 md:mb-10">
            Как устроен{" "}
            <span className="font-iriska font-normal italic text-accent">контур</span>
          </h2>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
            {facts.map((f, i) => (
              <div key={i}>
                <dt className="text-sm text-foreground/60 mb-1">{f.label}</dt>
                <dd className="text-base md:text-lg font-semibold text-foreground leading-snug">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Что важно сказать честно */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-5">
          <article className="rounded-[28px] bg-surface-mint ring-1 ring-foreground/5 shadow-card px-7 md:px-10 py-9 md:py-12">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
              Что важно сказать честно
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6">
              Проект в развитии
            </h3>
            <ul className="space-y-3">
              {honest.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base md:text-lg text-foreground/80"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[28px] bg-surface-sand ring-1 ring-foreground/5 shadow-card px-7 md:px-10 py-9 md:py-12">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
              Почему это не просто внедрение ИИ
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6">
              Сначала архитектура — потом ИИ
            </h3>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Результат создаётся не одной моделью и не одним ботом. Сначала собирается архитектура: документы, роли, проекты, локальная инфраструктура, база знаний, качество ответов, интерфейс для сотрудников, будущие ознакомления, контроль и сопровождение. ИИ становится частью управляемой системы, а не отдельным экспериментом.
            </p>
          </article>
        </div>
      </section>

      {/* Что дальше */}
      <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
            Что дальше
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
            Следующие{" "}
            <span className="font-iriska font-normal italic text-accent">этапы</span>
          </h2>
        </div>
        <div className="rounded-[28px] bg-card ring-1 ring-foreground/5 shadow-card px-6 md:px-10 lg:px-14 py-10 md:py-12">
          <ol className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
            {nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="font-iriska italic text-accent text-2xl md:text-3xl leading-none w-10 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base md:text-lg text-foreground/80 leading-snug pt-1">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Финальный CTA */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="container mx-auto max-w-7xl">
          <div className="rounded-[32px] md:rounded-[40px] bg-accent overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-14 md:py-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.05] mb-5 max-w-3xl mx-auto">
              Хотите похожий цифровой контур?
            </h2>
            <p className="text-base md:text-lg text-white/85 mb-10 max-w-2xl mx-auto">
              Если документы, знания, заявки, роли и внутренние запросы живут в разных местах — помогу собрать план цифровизации: от документов и ролей до базы знаний, RAG, внутренних помощников и цифровых ознакомлений.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <PillButton to="/start" variant="light">
                Обсудить похожий проект
              </PillButton>
              <Link
                to="/services"
                className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base md:text-lg text-white/90 hover:text-white transition-colors"
              >
                Получить аудит процессов
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