import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageTransition from "@/components/PageTransition";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Mic, Check, Clock, Users, Shield, Zap } from "lucide-react";

const GolossokPricing = () => {
  const plans = [
    {
      name: "Пробный период",
      price: "Бесплатно",
      period: "14 дней",
      description: "Протестируйте GolossOK перед покупкой",
      features: [
        "До 100 голосовых запросов",
        "Интеграция с 1 системой",
        "Базовые голосовые команды",
        "Техподдержка в рабочее время",
        "Обучение команды (1 час)"
      ],
      cta: "Запросить пробный период",
      highlight: false
    },
    {
      name: "Стартовый",
      price: "30 000 ₽",
      period: "месяц",
      description: "Для небольших команд до 20 человек",
      features: [
        "До 1000 голосовых запросов/мес",
        "Интеграция с 2 системами",
        "Все голосовые команды",
        "Техподдержка 24/7",
        "Обучение команды (2 часа)",
        "Настройка под ваши процессы",
        "Отчёты и аналитика"
      ],
      cta: "Купить доступ",
      highlight: true
    },
    {
      name: "Профессиональный",
      price: "75 000 ₽",
      period: "месяц",
      description: "Для компаний от 20 до 100 человек",
      features: [
        "До 5000 голосовых запросов/мес",
        "Интеграция с 5 системами",
        "Все функции + кастомизация",
        "Приоритетная техподдержка",
        "Обучение команды (4 часа)",
        "Полная настройка под процессы",
        "Расширенная аналитика",
        "API для интеграций",
        "Голосовые отчёты"
      ],
      cta: "Купить доступ",
      highlight: false
    },
    {
      name: "Корпоративный",
      price: "от 150 000 ₽",
      period: "месяц",
      description: "Для крупных компаний 100+ человек",
      features: [
        "Неограниченные запросы",
        "Неограниченные интеграции",
        "Полная кастомизация",
        "Выделенный менеджер",
        "Индивидуальное обучение",
        "On-premise развёртывание",
        "SLA 99.9%",
        "Индивидуальные функции",
        "Белый лейбл (опционально)"
      ],
      cta: "Обсудить условия",
      highlight: false
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Тарифы GolossOK — Цены на голосового AI-ассистента</title>
        <meta name="description" content="Тарифы GolossOK: от бесплатного пробного периода до корпоративных решений. Стартовый от 30 000 ₽/мес, окупаемость 4-6 недель." />
        <meta name="keywords" content="цены GolossOK, тарифы голосовой ассистент, стоимость AI бота, прайс автоматизация голосом" />
        <link rel="canonical" href="https://aleksamois.ru/golossok-pricing" />
        <meta property="og:title" content="Тарифы GolossOK — Цены на голосового AI-ассистента" />
        <meta property="og:description" content="Тарифы GolossOK: от бесплатного пробного периода до корпоративных решений." />
        <meta property="og:url" content="https://aleksamois.ru/golossok-pricing" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        
        <main>
        {/* Hero Section */}
        <section className="pt-32 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Mic className="w-12 h-12 text-primary" strokeWidth={1.5} />
                <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold text-foreground leading-tight">
                  Тарифы GolossOK
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Выберите тариф, который подходит под размер вашей команды и объём операций. Все тарифы включают обучение и техподдержку.
              </p>
            </div>

            {/* Benefits Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-primary/10 rounded-xl p-4 text-center">
                <Zap className="w-6 h-6 text-primary mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-sm font-medium text-foreground">×5 скорость</p>
              </div>
              <div className="bg-primary/10 rounded-xl p-4 text-center">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-sm font-medium text-foreground">4–6 нед окупаемость</p>
              </div>
              <div className="bg-primary/10 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 text-primary mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-sm font-medium text-foreground">99% точность</p>
              </div>
              <div className="bg-primary/10 rounded-xl p-4 text-center">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-sm font-medium text-foreground">GDPR compliant</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-card rounded-2xl p-6 shadow-soft transition-all duration-300 hover:shadow-card flex flex-col border border-border ${
                    plan.highlight ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {plan.highlight && (
                    <div className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start">
                      Популярный
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-primary">{plan.price}</p>
                    <p className="text-sm text-muted-foreground">/ {plan.period}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full" 
                    variant={plan.highlight ? "default" : "outline"}
                    asChild
                  >
                    <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                      {plan.cta}
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="section-title text-center mb-12">Дополнительные услуги</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Индивидуальная интеграция</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Подключение к нестандартным системам или разработка кастомных интеграций под ваши процессы
                </p>
                <p className="text-2xl font-bold text-primary mb-2">от 50 000 ₽</p>
                <p className="text-xs text-muted-foreground">разово</p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Расширенное обучение</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Дополнительные тренинги для вашей команды, создание внутренних инструкций и процедур
                </p>
                <p className="text-2xl font-bold text-primary mb-2">15 000 ₽</p>
                <p className="text-xs text-muted-foreground">за день обучения</p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Техническая поддержка Premium</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Приоритетная поддержка с выделенным менеджером и SLA 1 час на критичные обращения
                </p>
                <p className="text-2xl font-bold text-primary mb-2">25 000 ₽</p>
                <p className="text-xs text-muted-foreground">в месяц</p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Консалтинг по оптимизации</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Анализ использования GolossOK и рекомендации по повышению эффективности процессов
                </p>
                <p className="text-2xl font-bold text-primary mb-2">40 000 ₽</p>
                <p className="text-xs text-muted-foreground">за аудит</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title text-center mb-12">Частые вопросы о GolossOK</h2>
            
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Можно ли переключиться на другой тариф?</h3>
                <p className="text-sm text-muted-foreground">
                  Да, вы можете изменить тариф в любой момент. При переходе на более высокий тариф доплата рассчитывается пропорционально оставшимся дням. При переходе на более низкий тариф изменения вступят в силу со следующего расчётного периода.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Что если превышу лимит голосовых запросов?</h3>
                <p className="text-sm text-muted-foreground">
                  При превышении лимита система продолжит работать, но дополнительные запросы тарифицируются по 50 ₽ за каждые 100 запросов. Мы всегда предупреждаем заранее, когда вы приближаетесь к лимиту.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Как происходит интеграция с нашими системами?</h3>
                <p className="text-sm text-muted-foreground">
                  Интеграция занимает от 3 до 7 дней в зависимости от сложности. Мы работаем через API ваших систем (Bitrix, Яндекс, Google Sheets и др.) и предоставляем полную документацию. Техническая поддержка помогает на всех этапах.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Есть ли скидки при годовой оплате?</h3>
                <p className="text-sm text-muted-foreground">
                  Да, при оплате за год вы получаете скидку 15% от общей стоимости. Это 1,8 месяца в подарок. Также доступна оплата за квартал со скидкой 5%.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Готовы начать работу с GolossOK?
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Запросите пробный период на 14 дней или свяжитесь с нами для обсуждения корпоративных условий
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                  Запросить пробный период
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="/golossok-demo">
                  Посмотреть демо
                </a>
              </Button>
            </div>
          </div>
        </section>
        </main>
        
        <Contact />
        <Partners />
        <Footer />
        
      </div>
    </PageTransition>
  );
};

export default GolossokPricing;