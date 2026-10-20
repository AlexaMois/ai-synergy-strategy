import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, FileText, Mail, Database, UserRound } from "lucide-react";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import FAQTeaser from "@/components/FAQTeaser";
import { setContactIntent } from "@/lib/contactIntent";

const stages = [
  { n:"01", title:"Выбираем одну операцию", text:"Определяем начало, конец, текущих участников, источники и ручные переходы." },
  { n:"02", title:"Фиксируем исходные показатели", text:"Считаем операции, время, ошибки, ручные касания и доступность данных." },
  { n:"03", title:"Проектируем и проверяем", text:"Согласуем правила, роли человека, интеграции и эталонные примеры результата." },
  { n:"04", title:"Запускаем и измеряем", text:"Проводим приёмку, обучаем сотрудников и сравниваем работу до и после." },
];
const metrics = [
  { title:"Количество операций", detail:"Сколько заявок, документов или записей проходит за период" },
  { title:"Время обработки", detail:"Сколько минут сотрудник тратит на одну операцию" },
  { title:"Ручные касания", detail:"Сколько раз информацию копируют, пересылают или сверяют" },
  { title:"Ошибки и исключения", detail:"Что требует исправления или решения ответственного" },
];
const faq = [
  { question:"Можно ли сохранить существующие 1С и CRM?", answer:"Да. Сначала оцениваем текущие инструменты и доступные способы обмена данными. Проект строится вокруг согласованного рабочего процесса." },
  { question:"Где применяется ИИ?", answer:"В задачах понимания писем, документов, сообщений и контекста. Стандартные правила, статусы и передачи можно автоматизировать обычными интеграциями." },
  { question:"Как оценивается стоимость?", answer:"Сначала фиксируем объём операции, исходные данные, системы, интеграции и критерии приёмки. Действующие цены опубликованы в разделе стоимости. Итог проекта согласуем по границам работ." },
  { question:"Кто проверяет спорные случаи?", answer:"Заказчик назначает владельца процесса. Сотрудник получает исключения на проверку, а система сохраняет журнал действий." },
];

const Inquiry = ({ label, className = "" }: {label:string;className?:string})=>(
  <Link to="/start" onClick={()=>setContactIntent({kind:"implementation",process:"Интерес: автоматизация одной ручной цепочки между системами. Источник: /services/automation"})}
    className={["inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-foreground transition-colors hover:bg-accent/85",className].join(" ")}>
    {label} <ArrowRight className="h-4 w-4" />
  </Link>
);

const AutomationHubPage = () => (
  <PageTransition>
    <Helmet>
      <title>Автоматизация бизнес-процессов и ручных операций в 1С/CRM | НейроРешения</title>
      <meta name="description" content="Убираем ручную передачу заявок и документов между почтой, мессенджерами, таблицами и 1С/CRM. Измеряем время, ошибки и стоимость операции. Проектирование, внедрение и контроль результата." />
      <link rel="canonical" href="https://aleksamois.ru/services/automation/" />
      <meta property="og:title" content="Автоматизация ручных операций между системами | НейроРешения" />
      <meta property="og:description" content="Одна повторяющаяся операция, реальные данные, измеримый результат." />
      <meta property="og:url" content="https://aleksamois.ru/services/automation/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <PageBreadcrumbs currentPage="Автоматизация операций" parentPages={[{ label:"Услуги",href:"/services" }]} />
      <main>
        <section className="px-4 pt-8 md:px-6 md:pt-12">
          <div className="container mx-auto max-w-7xl">
            <div className="grid items-center gap-8 rounded-[30px] bg-surface-mint px-6 py-10 shadow-plate md:grid-cols-12 md:rounded-[40px] md:px-12 md:py-16">
              <div className="min-w-0 md:col-span-7">
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary-dark">Основной маршрут · Сквозные операции</p>
                <h1 className="text-3xl font-bold leading-[1.07] tracking-tight text-foreground md:text-5xl">Автоматизируем ручную передачу заявок и документов между Вашими программами</h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">Берём один повторяющийся поток, измеряем текущую стоимость работы, связываем действующие системы и показываем результат на реальных данных.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Inquiry label="Разобрать одну операцию" />
                  <Link className="inline-flex min-h-12 items-center gap-2 px-3 font-semibold text-foreground hover:text-primary-dark" to="/cases">Реальные кейсы <ArrowUpRight className="h-4 w-4" /></Link>
                </div>
              </div>
              <div className="min-w-0 rounded-[26px] bg-background p-5 shadow-card md:col-span-5 md:p-7">
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary-dark">Пример маршрута</p>
                <div className="space-y-3">
                  {[
                    {Icon:Mail,title:"Письмо, сообщение, документ",text:"Источники информации"},
                    {Icon:FileText,title:"Проверка и бизнес-правила",text:"Реквизиты, позиции, исключения"},
                    {Icon:Database,title:"Запись в 1С / CRM",text:"Действие в рабочей системе"},
                    {Icon:UserRound,title:"Подтверждение сотрудником",text:"Контроль спорных случаев"},
                  ].map(({Icon,title,text},i)=>(
                    <div key={title} className="flex items-center gap-3 rounded-xl border border-border p-3">
                      <Icon className="h-6 w-6 shrink-0 text-primary-dark" aria-hidden="true"/>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground">{title}</p>
                        <p className="text-sm text-foreground/65">{text}</p>
                      </div>
                      <span className="ml-auto shrink-0 text-xs text-primary-dark">{String(i+1).padStart(2,"0")}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-foreground/60">Схема иллюстрирует типовую операцию. Конкретные шаги утверждаются после изучения данных клиента.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">Когда подходит</p>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-foreground md:text-4xl">Между системами накопилась ручная работа</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              ["Входящие заявки","Сотрудники собирают сообщения из нескольких каналов и заносят данные в одну рабочую систему."],
              ["Документы и расчёты","Команда переносит реквизиты, позиции и суммы между файлами и учётными программами."],
              ["Контроль исполнения","Статусы и подтверждения собираются вручную из разных источников."]
            ].map(([title,body])=>(
              <article key={title} className="rounded-2xl border border-border bg-card p-6">
                <CheckCircle2 className="mb-4 h-6 w-6 text-primary-dark" aria-hidden="true"/>
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/75">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-foreground py-14 text-background md:py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Приёмка по фактам</p>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">Как доказываем ценность операции</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-background/75">Измерения до и после согласуем на одном и том же типе работы. Отдельно проверяем качество результата и путь обработки исключений.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map(metric=>(
                <div key={metric.title} className="rounded-2xl border border-background/20 bg-background/5 p-5">
                  <h3 className="text-lg font-bold text-background">{metric.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-background/70">{metric.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">Порядок работы</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">От диагностики к работающему процессу</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {stages.map(stage=>(
              <div key={stage.n} className="rounded-[22px] bg-card p-6 shadow-card">
                <span className="text-xl font-bold text-primary-dark">{stage.n}</span>
                <h3 className="mt-3 text-xl font-bold text-foreground">{stage.title}</h3>
                <p className="mt-3 leading-relaxed text-foreground/75">{stage.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link to="/services/digital-audit" className="rounded-full border border-border px-4 py-3 font-semibold text-foreground hover:border-primary-dark">Глубокий аудит · от 116 000 ₽</Link>
            <Link to="/services/digital-solution-design" className="rounded-full border border-border px-4 py-3 font-semibold text-foreground hover:border-primary-dark">Разработка · от 260 000 ₽</Link>
            <Link to="/services/digital-tools-support" className="rounded-full border border-border px-4 py-3 font-semibold text-foreground hover:border-primary-dark">Эксплуатация · 35 000–89 000 ₽/мес</Link>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 pb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dark">Реальные проекты</p>
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Посмотрите, как это работает</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {title:"Грузовой Экспресс",summary:"Единый учёт обращений из разных каналов.",href:"/cases/cargo-express"},
              {title:"АкТрансСервис",summary:"Корпоративные документы и знания в одном рабочем пространстве.",href:"/cases/aktransservice"},
              {title:"Производственная компания",summary:"Поиск инструкций в рабочих документах.",href:"/cases/production-doc-search"},
            ].map(item=>(
              <Link key={item.href} to={item.href} className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-card">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary-dark">{item.title}</h3>
                <p className="mt-3 text-base text-foreground/70">{item.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-dark">Открыть кейс <ArrowUpRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 pb-16 md:px-6 md:pb-20">
          <div className="container mx-auto flex max-w-7xl flex-col gap-6 rounded-[30px] bg-surface-sand p-7 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Начнём с одного понятного процесса</h2>
              <p className="mt-3 max-w-2xl text-base text-foreground/75">Опишите текущую операцию и её участников. Первый шаг определим по фактам, масштабу и доступным данным.</p>
            </div>
            <Inquiry className="shrink-0" label="Обсудить мой процесс" />
          </div>
        </section>
        <FAQTeaser items={faq} />
      </main>
      <Footer />
    </div>
  </PageTransition>
);
export default AutomationHubPage;
