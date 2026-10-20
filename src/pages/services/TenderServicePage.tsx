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
            <div className="rounded-[30px] bg-surface-mint p-7 shadow-plate md:rounded-[40px] md:p-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-dark">Отдельный продукт · Закупки и тендеры</p>
              <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">НейроТендеролог: поиск и первичный отбор закупок</h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/75 md:text-xl">Система помогает сократить ручной просмотр закупок: собирает предложения, применяет профиль компании, готовит предварительный разбор и передаёт решение специалисту.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/start" onClick={()=>setContactIntent({kind:"implementation",process:"Подключение НейроТендеролога. Источник: /services/neurotenderolog"})} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-6 font-semibold text-background hover:bg-foreground/85">
                  Обсудить отбор закупок <ArrowRight className="h-4 w-4"/>
                </Link>
                <Link to="/cases/neurotenderolog" className="inline-flex min-h-12 items-center gap-2 px-4 font-semibold text-primary-dark hover:underline">
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
      </main>
      <Footer />
    </div>
  </PageTransition>
);
export default TenderServicePage;
