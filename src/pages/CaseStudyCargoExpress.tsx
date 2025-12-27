import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Truck, TrendingUp, Users, Clock, CheckCircle, Target, BarChart3, Image, Phone, MessageSquare, Mic } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const CaseStudyCargoExpress = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContact = () => {
    if (location.pathname !== '/') {
      navigate('/#contact');
      return;
    }
    const element = document.querySelector('#contact');
    if (element) {
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Кейс: Грузовой Экспресс — Приём заявок голосом в Telegram</title>
        <meta name="description" content="Как транспортно-логистическая компания получила полную прозрачность без CRM: Telegram-бот для голосового приёма заявок + Google Sheets. Экономия 9-12 часов/неделю, 0% потерь заявок." />
        <meta name="keywords" content="автоматизация логистики, Telegram бот для бизнеса, голосовой ввод заявок, кейс внедрения ИИ, Грузовой Экспресс" />
        <link rel="canonical" href="https://aleksamois.ru/case-studies/cargo-express" />
        <meta property="og:title" content="Кейс: Грузовой Экспресс — Приём заявок голосом в Telegram" />
        <meta property="og:description" content="Полная прозрачность без CRM. Экономия 9-12 часов/неделю на команду." />
        <meta property="og:url" content="https://aleksamois.ru/case-studies/cargo-express" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <PageBreadcrumbs 
          currentPage="Грузовой Экспресс" 
          parentPages={[{ label: "Кейсы", href: "/cases" }]} 
        />
        
        <main>
        {/* Hero Section */}
        <section className="pt-32 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-6">
              <Truck className="w-12 h-12 text-primary" strokeWidth={1.5} />
              <h1 className="text-[28px] sm:text-[32px] md:text-[36px] text-foreground leading-tight">
                Грузовой <span className="font-semibold">Экспресс</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Приём заявок голосом в Telegram → полная прозрачность без CRM
            </p>
            
            {/* Placeholder for hero image/screenshot */}
            <div className="bg-muted rounded-2xl p-12 mb-8 flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <Image className="w-16 h-16 text-muted-foreground mx-auto mb-4" strokeWidth={1} />
                <p className="text-muted-foreground">Место для скриншота системы или фото</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Client Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">О <span className="font-semibold">клиенте</span></h2>
            
            <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">Грузовой Экспресс</strong> — транспортно-логистическая компания, оказывающая услуги:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary">–</span>
                  <span className="text-muted-foreground">авиационных перевозок</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">–</span>
                  <span className="text-muted-foreground">речных и морских перевозок</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">–</span>
                  <span className="text-muted-foreground">автомобильной логистики</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">–</span>
                  <span className="text-muted-foreground">ответственного хранения</span>
                </li>
              </ul>
              <div className="bg-primary/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  <p className="text-foreground">
                    Приём заявок ведут <strong>3 менеджера</strong>, которые постоянно находятся на связи и часто работают вне рабочего места.
                  </p>
                </div>
              </div>
            </div>

            {/* Placeholder for company photo */}
            <div className="bg-card rounded-2xl p-8 flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <Image className="w-12 h-12 text-muted-foreground mx-auto mb-3" strokeWidth={1} />
                <p className="text-muted-foreground text-sm">Место для фото компании или команды</p>
              </div>
            </div>
          </div>
        </section>

        {/* Context Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">Контекст <span className="font-semibold">задачи</span></h2>
            
            <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Заявки поступали из разных каналов:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
                  <Phone className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  <span className="text-foreground">телефон</span>
                </div>
                <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  <span className="text-foreground">мессенджеры</span>
                </div>
                <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
                  <Mic className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  <span className="text-foreground">голосовые</span>
                </div>
              </div>
              <p className="text-muted-foreground">
                Фиксация заявок происходила вручную и не всегда сразу.<br />
                <strong className="text-foreground">Единого источника данных не было.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-2">Проблема: заявки есть — <span className="font-semibold">управляемости нет</span></h2>
            <p className="text-muted-foreground mb-8">Ключевые боли</p>
            
            <div className="bg-card rounded-2xl p-6 shadow-soft mb-8">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold">•</span>
                  <span className="text-muted-foreground"><strong className="text-foreground">10–15% заявок</strong> терялись или дублировались</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold">•</span>
                  <span className="text-muted-foreground">медленная обработка из-за ручного ввода</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold">•</span>
                  <span className="text-muted-foreground">высокий человеческий фактор</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive font-bold">•</span>
                  <span className="text-muted-foreground">отсутствие ежедневной аналитики</span>
                </li>
              </ul>
              
              <div className="bg-muted rounded-xl p-4">
                <p className="text-foreground font-medium mb-2">Руководству невозможно было в любой момент увидеть:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>– сколько заявок пришло</li>
                  <li>– в каком они статусе</li>
                  <li>– где возникают узкие места</li>
                </ul>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <p className="text-muted-foreground">
                CRM-системы (включая Битрикс) рассматривались,<br />
                <strong className="text-foreground">но от их внедрения осознанно отказались.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Why No CRM Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">Почему отказались <span className="font-semibold">от CRM</span></h2>
            
            <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
              <p className="text-muted-foreground mb-4">Совместно с командой Грузового Экспресса были оценены риски:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-destructive">–</span>
                  <span className="text-muted-foreground">длительное внедрение</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive">–</span>
                  <span className="text-muted-foreground">необходимость обучать всю команду</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive">–</span>
                  <span className="text-muted-foreground">смена привычного рабочего процесса</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive">–</span>
                  <span className="text-muted-foreground">сопротивление со стороны менеджеров</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary">
              <h3 className="text-lg font-semibold text-foreground mb-3">Главный управленческий запрос был другим:</h3>
              <p className="text-xl text-foreground font-medium">
                Оставить менеджеров в привычной среде<br />
                и при этом получить контроль и аналитику для руководства.
              </p>
            </div>
          </div>
        </section>

        {/* Architecture Solution Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">Архитектурное <span className="font-semibold">решение</span></h2>
            
            <div className="bg-card rounded-2xl p-6 shadow-soft mb-8">
              <p className="text-lg text-foreground font-medium mb-6">
                Было принято решение встроить систему в существующий процесс, а не менять его.
              </p>
              
              <h3 className="text-lg font-semibold text-foreground mb-4">Как работает система:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <p className="text-muted-foreground">Менеджер принимает заявку</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <p className="text-muted-foreground">Вносит её голосом или текстом в Telegram</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <div className="text-muted-foreground">
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

            <div className="bg-primary/10 rounded-2xl p-6">
              <p className="text-lg text-foreground font-semibold text-center">
                Google Sheets становится единым источником данных.
              </p>
            </div>

            {/* Placeholder for architecture diagram */}
            <div className="bg-card rounded-2xl p-8 mt-8 flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <Image className="w-12 h-12 text-muted-foreground mx-auto mb-3" strokeWidth={1} />
                <p className="text-muted-foreground text-sm">Место для схемы архитектуры системы</p>
              </div>
            </div>
          </div>
        </section>

        {/* What Changed for Managers Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">Что изменилось <span className="font-semibold">для менеджеров</span></h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <CheckCircle className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium mb-2">Не нужно осваивать CRM</p>
                <p className="text-sm text-muted-foreground">Работа в привычном интерфейсе Telegram</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <CheckCircle className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium mb-2">Заявку можно внести:</p>
                <p className="text-sm text-muted-foreground">с телефона, в дороге, даже во время обеда</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <CheckCircle className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium mb-2">Данные фиксируются сразу</p>
                <p className="text-sm text-muted-foreground">Моментальное сохранение в систему</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <CheckCircle className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium mb-2">Исключён ручной перенос</p>
                <p className="text-sm text-muted-foreground">Нет двойной работы и ошибок</p>
              </div>
            </div>

            <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary">
              <h3 className="text-lg font-semibold text-foreground mb-3">Факт в цифрах:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <span className="text-foreground">экономия <strong>3–4 часа в неделю</strong> на одного менеджера</span>
                </li>
                <li className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <span className="text-foreground"><strong>9–12 часов в неделю</strong> на команду из 3 человек</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* What Management Got Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">Что получило руководство</h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <BarChart3 className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium">Единая таблица всех заявок</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <Users className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium">Статусы и распределение по менеджерам</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <Target className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium">Ежедневные отчёты по кнопке</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <TrendingUp className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                <p className="text-foreground font-medium">Прозрачная аналитика в реальном времени</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <p className="text-foreground font-medium mb-3">Руководство в любой момент видит:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>– сколько заявок пришло</li>
                <li>– сколько новых / в работе / выполнено</li>
                <li>– где возникают задержки</li>
              </ul>
            </div>

            {/* Placeholder for dashboard screenshot */}
            <div className="bg-card rounded-2xl p-8 mt-8 flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <Image className="w-12 h-12 text-muted-foreground mx-auto mb-3" strokeWidth={1} />
                <p className="text-muted-foreground text-sm">Место для скриншота дашборда или таблицы</p>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">Измеримые результаты</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-destructive">До</span> внедрения
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-destructive font-bold">•</span>
                    <span className="text-muted-foreground">10–15% потерь и дублей заявок</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-destructive font-bold">•</span>
                    <span className="text-muted-foreground">ручной контроль</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-destructive font-bold">•</span>
                    <span className="text-muted-foreground">отсутствие управленческой аналитики</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-primary/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary">После</span> внедрения
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-foreground font-medium">потери заявок = 0</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-foreground font-medium">заявки фиксируются автоматически</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-foreground font-medium">ежедневные отчёты без ручной подготовки</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-foreground font-medium">система работает автономно</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Economic Effect Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">Экономический эффект</h2>
            
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <Clock className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-3xl font-bold text-primary mb-2">3–4 часа</p>
                <p className="text-sm text-muted-foreground">экономия в неделю<br />на менеджера</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-3xl font-bold text-primary mb-2">до 15%</p>
                <p className="text-sm text-muted-foreground">снижение потерь<br />заявок</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <BarChart3 className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-3xl font-bold text-primary mb-2">данные</p>
                <p className="text-sm text-muted-foreground">решения на основе<br />фактов, не ощущений</p>
              </div>
            </div>

            <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary">
              <p className="text-lg text-foreground">
                Даже без внедрения CRM компания получила:<br />
                <strong>прозрачность • контроль • масштабируемость</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Project Status Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">Статус проекта</h2>
            
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
                  <span className="text-foreground">проект полностью завершён</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
                  <span className="text-foreground">система стабильно используется</span>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
                  <div className="text-foreground">
                    планируется масштабирование в 2026 году:
                    <ul className="mt-2 ml-4 text-muted-foreground">
                      <li>– рост объёма заявок</li>
                      <li>– подключение новых направлений</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Insight Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">Главный вывод кейса</h2>
            
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <p className="text-xl text-foreground font-medium mb-6">
                Этот проект показал:
              </p>
              <p className="text-2xl text-primary font-semibold mb-6 leading-relaxed">
                ИИ даёт эффект не за счёт сложности,<br />
                а за счёт правильного встраивания в реальные процессы.
              </p>
              <div className="bg-muted rounded-xl p-4">
                <p className="text-foreground">Система работает потому что:</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>– не требует переучивания</li>
                  <li>– не мешает людям</li>
                  <li>– и даёт руководству контроль</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* For Whom Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title mb-8">Для кого этот кейс</h2>
            
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <p className="text-muted-foreground mb-4">Релевантен компаниям, где:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-foreground">заявки идут из разных каналов</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-foreground">менеджеры постоянно на связи</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-foreground">CRM кажется избыточной</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-foreground">важны скорость и прозрачность</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Следующий шаг
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Если у вас похожая ситуация —<br />
                начать стоит не с выбора системы,<br />
                а с разбора процесса приёма заявок.
              </p>
              <Button size="lg" onClick={scrollToContact}>
                Обсудить задачу
              </Button>
            </div>
          </div>
        </section>

        <Contact />
        <Partners />
        </main>
        
        <Footer />
        
      </div>
    </PageTransition>
  );
};

export default CaseStudyCargoExpress;
