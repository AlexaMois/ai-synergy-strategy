
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import CaseReadingNav from "@/components/cases/CaseReadingNav";
import { Button } from "@/components/ui/button";
import PillButton from "@/components/PillButton";
import { Truck, TrendingUp, Users, Clock, CheckCircle, Target, BarChart3, Phone, MessageSquare, Mic } from "lucide-react";
import { scrollToContact as scrollToContactForm } from "@/lib/scrollToContact";
import { trackCTAClick } from "@/utils/analytics";

const CaseStudyCargoExpress = () => {
  const scrollToContact = () => {
    trackCTAClick({ location: 'cases', buttonText: 'Cargo Express CTA' });
    scrollToContactForm();
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Кейс: Грузовой Экспресс — Приём заявок голосом в Telegram</title>
        <meta name="description" content="Как транспортно-логистическая компания получила прозрачный учёт заявок через Telegram и таблицы: Telegram-бот для голосового приёма заявок + Google Sheets. Экономия 9-12 часов/неделю, 0% потерь заявок." />
        <meta name="keywords" content="автоматизация логистики, Telegram бот для бизнеса, голосовой ввод заявок, кейс внедрения ИИ, Грузовой Экспресс" />
        <link rel="canonical" href="https://aleksamois.ru/cases/cargo-express" />
        <meta property="og:title" content="Кейс: Грузовой Экспресс — Приём заявок голосом в Telegram" />
        <meta property="og:description" content="Прозрачный учёт заявок через Telegram и таблицы. Экономия 9-12 часов/неделю на команду." />
        <meta property="og:url" content="https://aleksamois.ru/cases/cargo-express" />
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
          currentPage="Грузовой Экспресс" 
          parentPages={[{ label: "Кейсы", href: "/cases" }]} 
        />
        
        <main className="bg-background">
        {/* Hero Section */}
        <section className="px-4 md:px-6 pt-8 md:pt-12 pb-8">
          <div className="mx-auto max-w-7xl rounded-[32px] md:rounded-[40px] bg-surface-mint p-6 md:p-12 shadow-card ring-1 ring-foreground/5">
            <p className="text-xs uppercase tracking-widest font-semibold text-primary-dark mb-5">Кейс · Транспорт и логистика</p>
            <div className="flex items-center gap-4 mb-6">
              <Truck className="hidden w-12 h-12 text-primary" strokeWidth={1.5} />
              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Грузовой <span className="font-bold">Экспресс</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl">
              Приём заявок голосом в Telegram → единый учёт и контроль
            </p>
<dl className="grid sm:grid-cols-2 gap-5 rounded-[24px] bg-card/85 p-5 ring-1 ring-foreground/5 md:gap-9 md:p-7">
              <div><dd className="text-4xl md:text-5xl font-bold text-foreground mb-2">0%</dd><dt className="text-sm text-foreground/75">потерь заявок</dt></div>
              <div><dd className="text-4xl md:text-5xl font-bold text-foreground mb-2">9–12 часов</dd><dt className="text-sm text-foreground/75">экономия в неделю на обработке заявок для команды из 3 человек</dt></div>
            </dl>
          </div>
        </section>

        <CaseReadingNav items={[
          { label: "Бизнес-задача", target: "cargo-context" },
          { label: "Как работает", target: "cargo-solution" },
          { label: "Результаты", target: "cargo-results" },
          { label: "Экономика", target: "cargo-economy" },
        ]} />

        {/* About Client Section */}
        <section className="px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="!text-2xl md:!text-4xl !font-bold !leading-tight !text-foreground mb-8">О <span className="font-semibold">клиенте</span></h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="border-t border-foreground/10 pt-6 mb-6">
              <p className="text-base md:text-lg text-foreground/75 leading-relaxed mb-6">
                <strong className="text-foreground">Грузовой Экспресс</strong> — транспортно-логистическая компания, оказывающая услуги:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary">–</span>
                  <span className="text-foreground/75">авиационных перевозок</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">–</span>
                  <span className="text-foreground/75">речных и морских перевозок</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">–</span>
                  <span className="text-foreground/75">автомобильной логистики</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">–</span>
                  <span className="text-foreground/75">ответственного хранения</span>
                </li>
              </ul>
              <div className="border-l-2 border-accent pl-5 py-2">
                <div className="flex items-center gap-3">
                  <Users className="hidden w-6 h-6 text-primary" strokeWidth={1.5} />
                  <p className="text-foreground">
                    Приём заявок ведут <strong>3 менеджера</strong>, которые постоянно находятся на связи и часто работают вне рабочего места.
                  </p>
                </div>
              </div>
            </div>

</div>
</div>
          </div>
        </section>

        {/* Context Section */}
        <section id="cargo-context" className="scroll-mt-28 px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="!text-2xl md:!text-4xl !font-bold !leading-tight !text-foreground mb-8">Контекст <span className="font-semibold">задачи</span></h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="border-t border-foreground/10 pt-6 mb-6">
              <p className="text-base md:text-lg text-foreground/75 leading-relaxed mb-4">
                Заявки поступали из разных каналов:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="border-l border-foreground/15 pl-5 py-2 flex items-center gap-3">
                  <Phone className="hidden w-6 h-6 text-primary" strokeWidth={1.5} />
                  <span className="text-foreground">телефон</span>
                </div>
                <div className="border-l border-foreground/15 pl-5 py-2 flex items-center gap-3">
                  <MessageSquare className="hidden w-6 h-6 text-primary" strokeWidth={1.5} />
                  <span className="text-foreground">мессенджеры</span>
                </div>
                <div className="border-l border-foreground/15 pl-5 py-2 flex items-center gap-3">
                  <Mic className="hidden w-6 h-6 text-primary" strokeWidth={1.5} />
                  <span className="text-foreground">голосовые</span>
                </div>
              </div>
              <p className="text-foreground/75">
                Фиксация заявок происходила вручную с задержкой.<br />
                <strong className="text-foreground">Данные об обращениях хранились в нескольких местах.</strong>
              </p>
            </div>
</div>
</div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="!text-2xl md:!text-4xl !font-bold !leading-tight !text-foreground mb-2">Заявки поступают — <span className="font-semibold">нужен единый контроль</span></h2></div>
<div className="md:col-span-8 min-w-0">
            <p className="text-foreground/75 mb-8">Задачи для улучшения</p>
            
            <div className="border-t border-foreground/10 pt-6 mb-8">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-foreground/75 font-bold">•</span>
                  <span className="text-foreground/75"><strong className="text-foreground">10–15% заявок</strong> терялись или дублировались</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/75 font-bold">•</span>
                  <span className="text-foreground/75">медленная обработка из-за ручного ввода</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/75 font-bold">•</span>
                  <span className="text-foreground/75">высокий человеческий фактор</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/75 font-bold">•</span>
                  <span className="text-foreground/75">потребность в ежедневной аналитике</span>
                </li>
              </ul>
              
              <div className="border-l border-foreground/15 pl-5 py-2">
                <p className="text-foreground font-medium mb-2">Руководству невозможно было в любой момент увидеть:</p>
                <ul className="space-y-1 text-foreground/75">
                  <li>– сколько заявок пришло</li>
                  <li>– в каком они статусе</li>
                  <li>– где возникают узкие места</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-foreground/10 pt-6">
              <p className="text-foreground/75">
                CRM-системы (включая Битрикс) рассматривались,<br />
                <strong className="text-foreground">но от их внедрения осознанно отказались.</strong>
              </p>
            </div>
</div>
</div>
          </div>
        </section>

        {/* Why No CRM Section */}
        <section className="px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="!text-2xl md:!text-4xl !font-bold !leading-tight !text-foreground mb-8">Почему выбрали <span className="font-semibold">Telegram и таблицы</span></h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="border-t border-foreground/10 pt-6 mb-6">
              <p className="text-foreground/75 mb-4">Совместно с командой Грузового Экспресса были оценены риски:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-foreground/75">–</span>
                  <span className="text-foreground/75">длительное внедрение</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/75">–</span>
                  <span className="text-foreground/75">необходимость обучать всю команду</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/75">–</span>
                  <span className="text-foreground/75">смена привычного рабочего процесса</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/75">–</span>
                  <span className="text-foreground/75">сопротивление со стороны менеджеров</span>
                </li>
              </ul>
            </div>

            <div className="border-l-2 border-accent pl-5 py-2">
              <h3 className="text-lg font-semibold text-foreground mb-3">Главный управленческий запрос был другим:</h3>
              <p className="text-xl text-foreground font-medium">
                Оставить менеджеров в привычной среде<br />
                и при этом получить контроль и аналитику для руководства.
              </p>
            </div>
</div>
</div>
          </div>
        </section>

        {/* Architecture Solution Section */}
        <section id="cargo-solution" className="scroll-mt-28 px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="!text-2xl md:!text-4xl !font-bold !leading-tight !text-foreground mb-8">Архитектурное <span className="font-semibold">решение</span></h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="border-t border-foreground/10 pt-6 mb-8">
              <p className="text-lg text-foreground font-medium mb-6">
                Было принято решение дополнить существующий процесс единым учётом обращений.
              </p>
              
              <h3 className="text-lg font-semibold text-foreground mb-4">Как работает система:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-primary-dark w-8 text-xl font-bold shrink-0 tabular-nums">1</span>
                  <p className="text-foreground/75">Менеджер принимает заявку</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-primary-dark w-8 text-xl font-bold shrink-0 tabular-nums">2</span>
                  <p className="text-foreground/75">Вносит её голосом или текстом в Telegram</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-primary-dark w-8 text-xl font-bold shrink-0 tabular-nums">3</span>
                  <div className="text-foreground/75">
                    <p className="mb-2">Система автоматически:</p>
                    <ul className="space-y-1 ml-4">
                      <li>– распознаёт данные</li>
                      <li>– структурирует заявку</li>
                      <li>– сохраняет её в Google Sheets</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-mint rounded-[28px] p-6 md:p-8">
              <p className="text-lg text-foreground font-semibold text-center">
                Google Sheets становится единым источником данных.
              </p>
            </div>
</div>
</div>
          </div>
        </section>

        {/* What Changed for Managers Section */}
        <section className="px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="!text-2xl md:!text-4xl !font-bold !leading-tight !text-foreground mb-8">Что изменилось <span className="font-semibold">для менеджеров</span></h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="border-t border-foreground/10 pt-6">
                <CheckCircle className="hidden w-8 h-8 text-primary-dark mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium mb-2">Работа в привычном Telegram</p>
                <p className="text-sm text-foreground/75">Работа в привычном интерфейсе Telegram</p>
              </div>
              <div className="border-t border-foreground/10 pt-6">
                <CheckCircle className="hidden w-8 h-8 text-primary-dark mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium mb-2">Заявку можно внести:</p>
                <p className="text-sm text-foreground/75">с телефона, в дороге, даже во время обеда</p>
              </div>
              <div className="border-t border-foreground/10 pt-6">
                <CheckCircle className="hidden w-8 h-8 text-primary-dark mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium mb-2">Данные фиксируются сразу</p>
                <p className="text-sm text-foreground/75">Моментальное сохранение в систему</p>
              </div>
              <div className="border-t border-foreground/10 pt-6">
                <CheckCircle className="hidden w-8 h-8 text-primary-dark mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium mb-2">Исключён ручной перенос</p>
                <p className="text-sm text-foreground/75">Единая фиксация каждого обращения</p>
              </div>
            </div>

            <div className="border-l-2 border-accent pl-5 py-2">
              <h3 className="text-lg font-semibold text-foreground mb-3">Факт в цифрах:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <Clock className="hidden w-5 h-5 text-primary" strokeWidth={1.5} />
                  <span className="text-foreground">экономия <strong>9–12 часов в неделю</strong> на обработке заявок для команды из 3 человек</span>
                </li>
              </ul>
            </div>
</div>
</div>
          </div>
        </section>

        {/* What Management Got Section */}
        <section className="px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="!text-2xl md:!text-4xl !font-bold !leading-tight !text-foreground mb-8">Что получило руководство</h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="border-t border-foreground/10 pt-6">
                <BarChart3 className="hidden w-8 h-8 text-primary-dark mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium">Единая таблица всех заявок</p>
              </div>
              <div className="border-t border-foreground/10 pt-6">
                <Users className="hidden w-8 h-8 text-primary-dark mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium">Статусы и распределение по менеджерам</p>
              </div>
              <div className="border-t border-foreground/10 pt-6">
                <Target className="hidden w-8 h-8 text-primary-dark mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium">Ежедневные отчёты по кнопке</p>
              </div>
              <div className="border-t border-foreground/10 pt-6">
                <TrendingUp className="hidden w-8 h-8 text-primary-dark mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium">Прозрачная аналитика в реальном времени</p>
              </div>
            </div>

            <div className="border-t border-foreground/10 pt-6">
              <p className="text-foreground font-medium mb-3">Руководство в любой момент видит:</p>
              <ul className="space-y-2 text-foreground/75">
                <li>– сколько заявок пришло</li>
                <li>– сколько новых / в работе / выполнено</li>
                <li>– где возникают задержки</li>
              </ul>
            </div>
</div>
</div>
          </div>
        </section>

        {/* Results Section */}
        <section id="cargo-results" className="scroll-mt-28 px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="!text-2xl md:!text-4xl !font-bold !leading-tight !text-foreground mb-8">Измеримые результаты</h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border-t border-foreground/10 pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-foreground/75">До</span> внедрения
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-foreground/75 font-bold">•</span>
                    <span className="text-foreground/75">10–15% потерь и дублей заявок</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground/75 font-bold">•</span>
                    <span className="text-foreground/75">ручной контроль</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground/75 font-bold">•</span>
                    <span className="text-foreground/75">потребность в управленческой аналитике</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-surface-mint rounded-[28px] p-6 md:p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary">После</span> внедрения
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="hidden w-5 h-5 text-primary-dark shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-foreground font-medium">потери заявок = 0</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="hidden w-5 h-5 text-primary-dark shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-foreground font-medium">заявки фиксируются автоматически</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="hidden w-5 h-5 text-primary-dark shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-foreground font-medium">автоматическая подготовка ежедневных отчётов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="hidden w-5 h-5 text-primary-dark shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-foreground font-medium">система работает автономно</span>
                  </li>
                </ul>
              </div>
            </div>
</div>
</div>
          </div>
        </section>

        {/* Economic Effect Section */}
        <section id="cargo-economy" className="scroll-mt-28 px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl rounded-[32px] md:rounded-[40px] bg-surface-mint p-6 md:p-12 ring-1 ring-foreground/5">
            <h2 className="!text-2xl md:!text-4xl !font-bold !leading-tight !text-foreground mb-8">Экономический эффект</h2>
            
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="border-t border-foreground/10 pt-6 text-center">
                <Clock className="hidden w-10 h-10 text-primary-dark mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-3xl font-bold text-primary-dark mb-2">9–12 часов</p>
                <p className="text-sm text-foreground/75">экономия в неделю<br />на обработке заявок</p>
              </div>
              <div className="border-t border-foreground/10 pt-6 text-center">
                <TrendingUp className="hidden w-10 h-10 text-primary-dark mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-3xl font-bold text-primary-dark mb-2">0</p>
                <p className="text-sm text-foreground/75">потерь заявок<br />сведены к нулю</p>
              </div>
              <div className="border-t border-foreground/10 pt-6 text-center">
                <BarChart3 className="hidden w-10 h-10 text-primary-dark mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-3xl font-bold text-primary-dark mb-2">данные</p>
                <p className="text-sm text-foreground/75">решения на основе<br />проверенных данных</p>
              </div>
            </div>

            <div className="border-l-2 border-accent pl-5 py-2">
              <p className="text-lg text-foreground">
                На базе Telegram и таблиц компания получила:<br />
                <strong>прозрачность • контроль • масштабируемость</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Project Status Section */}
        <section className="px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="!text-2xl md:!text-4xl !font-bold !leading-tight !text-foreground mb-8">Статус проекта</h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="border-t border-foreground/10 pt-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="hidden w-6 h-6 text-primary-dark shrink-0" strokeWidth={1.5} />
                  <span className="text-foreground">проект полностью завершён</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="hidden w-6 h-6 text-primary-dark shrink-0" strokeWidth={1.5} />
                  <span className="text-foreground">система стабильно используется</span>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="hidden w-6 h-6 text-primary-dark shrink-0" strokeWidth={1.5} />
                  <div className="text-foreground">
                    планируется масштабирование в 2026 году:
                    <ul className="mt-2 ml-4 text-foreground/75">
                      <li>– рост объёма заявок</li>
                      <li>– подключение новых направлений</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
</div>
</div>
          </div>
        </section>

        {/* Key Insight Section */}
        <section className="px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl rounded-[32px] md:rounded-[40px] bg-foreground p-6 md:p-12 [&_h2]:!text-background [&_p]:!text-background [&_li]:!text-background [&_span]:!text-background [&_div]:border-background/15">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="!text-2xl md:!text-4xl !font-bold !leading-tight !text-foreground mb-8">Главный вывод кейса</h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="py-2">
              <p className="text-xl text-foreground font-medium mb-6">
                Этот проект показал:
              </p>
              <p className="text-2xl text-primary-dark font-semibold mb-6 leading-relaxed">
                Результат обеспечивает ИИ, встроенный в привычные процессы,<br />
                с понятными правилами работы и измеримыми итогами.
              </p>
              <div className="border-l border-foreground/15 pl-5 py-2">
                <p className="text-foreground">Система работает потому что:</p>
                <ul className="mt-2 space-y-1 text-foreground/75">
                  <li>– опирается на привычные действия сотрудников</li>
                  <li>– поддерживает повседневную работу сотрудников</li>
                  <li>– и даёт руководству контроль</li>
                </ul>
              </div>
            </div>
</div>
</div>
          </div>
        </section>

        {/* For Whom Section */}
        <section className="px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-foreground/10 pt-8 md:pt-10">
<div className="md:col-span-4 min-w-0"><h2 className="!text-2xl md:!text-4xl !font-bold !leading-tight !text-foreground mb-8">Для кого этот кейс</h2></div>
<div className="md:col-span-8 min-w-0">
            
            <div className="border-t border-foreground/10 pt-6">
              <p className="text-foreground/75 mb-4">Релевантен компаниям, где:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="hidden w-5 h-5 text-primary-dark shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-foreground">заявки идут из разных каналов</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="hidden w-5 h-5 text-primary-dark shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-foreground">менеджеры постоянно на связи</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="hidden w-5 h-5 text-primary-dark shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-foreground">CRM кажется избыточной</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="hidden w-5 h-5 text-primary-dark shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-foreground">важны скорость и прозрачность</span>
                </li>
              </ul>
            </div>
</div>
</div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-6 py-7 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[32px] md:rounded-[40px] bg-foreground p-6 md:p-12 shadow-card [&_h2]:!text-background [&_p]:!text-background/85">
              <h2 className="text-2xl md:text-4xl font-bold text-background leading-tight mb-4">
                Следующий шаг
              </h2>
              <p className="text-lg text-foreground/75 mb-6 max-w-2xl">
                Если у вас похожая ситуация —<br />
                начните с ожидаемого результата<br />
                и разбора процесса приёма заявок.
              </p>
              <PillButton variant="light" size="md" onClick={scrollToContact}>
                Обсудить похожую задачу
              </PillButton>
            </div>
          </div>
        </section>

        <Partners />
        </main>
        
        <Footer />
        
      </div>
    </PageTransition>
  );
};

export default CaseStudyCargoExpress;
