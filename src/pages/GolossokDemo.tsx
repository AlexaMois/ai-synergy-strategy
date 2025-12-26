import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageTransition from "@/components/PageTransition";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Mic, Play, CheckCircle, TrendingUp } from "lucide-react";

const GolossokDemo = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>GolossOK — Голосовой AI-ассистент для бизнеса | Демо</title>
        <meta name="description" content="Голосовой AI-ассистент для автоматизации операционных задач: создание заявок, управление статусами, отчёты голосом. ×5 ускорение, 99% точность." />
        <meta name="keywords" content="голосовой ассистент, AI бот, автоматизация голосом, GolossOK, голосовое управление CRM" />
        <link rel="canonical" href="https://aleksamois.ru/golossok-demo" />
        <meta property="og:title" content="GolossOK — Голосовой AI-ассистент для бизнеса" />
        <meta property="og:description" content="Голосовой AI-ассистент для автоматизации операционных задач. ×5 ускорение, 99% точность." />
        <meta property="og:url" content="https://aleksamois.ru/golossok-demo" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        
        <main>
        {/* Hero Section */}
        <section className="pt-32 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Mic className="w-16 h-16 text-primary" strokeWidth={1.5} />
                <h1 className="text-[32px] sm:text-[36px] md:text-[42px] font-semibold text-foreground leading-tight">
                  GolossOK в действии
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Голосовой AI-ассистент для автоматизации операционных задач: создание заявок, управление статусами, отчёты голосом. Посмотрите, как это работает на практике.
              </p>
            </div>

            {/* Video Placeholder */}
            <div className="bg-gray-900 rounded-3xl aspect-video flex items-center justify-center mb-8 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20"></div>
              <div className="relative z-10 text-center">
                <Play className="w-24 h-24 text-white mx-auto mb-4 opacity-80" strokeWidth={1.5} />
                <p className="text-white text-xl font-medium">Видео-демонстрация GolossOK</p>
                <p className="text-white/70 text-sm mt-2">2 минуты</p>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground italic">
              Видео демонстрация будет доступна в ближайшее время. Свяжитесь с нами для личной демонстрации.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="section-title text-center mb-12">Что умеет GolossOK</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <CheckCircle className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-foreground mb-3">Создание заявок голосом</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "Александра, создай заявку на поездку в Москву 15 марта" — система автоматически создаёт заявку с нужными параметрами
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <CheckCircle className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-foreground mb-3">Голосовой запрос статуса</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "Где находится заказ #123?" — мгновенный ответ с актуальным статусом из вашей CRM
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <CheckCircle className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-foreground mb-3">Интеграция с CRM</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Автоматический разнос информации в Bitrix, Яндекс.Маркетплейс, Telegram и Google Sheets
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <CheckCircle className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-foreground mb-3">Работа с русским языком</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  99% точность распознавания русской речи, поддержка английского языка
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <CheckCircle className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-foreground mb-3">Быстрая обработка</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ×5 ускорение обработки заявок — вместо 3 минут всего 30 секунд
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <CheckCircle className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-foreground mb-3">Гибкая настройка</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Адаптация под ваши процессы, словарь терминов и бизнес-логику
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="section-title text-center mb-12">Для кого подходит GolossOK</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary">
                <h3 className="text-lg font-semibold text-foreground mb-3">Call-центры</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Операторы создают заявки голосом прямо во время разговора с клиентом — без отвлечения на ввод данных
                </p>
              </div>

              <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary">
                <h3 className="text-lg font-semibold text-foreground mb-3">Логистика</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Водители и курьеры обновляют статусы доставок голосом — руки свободны, данные всегда актуальны
                </p>
              </div>

              <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary">
                <h3 className="text-lg font-semibold text-foreground mb-3">HR и рекрутмент</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Быстрая фиксация результатов интервью, создание задач на звонки, обновление статусов кандидатов
                </p>
              </div>

              <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary">
                <h3 className="text-lg font-semibold text-foreground mb-3">Управление проектами</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Менеджеры создают задачи и фиксируют прогресс голосом — экономия времени на митингах и планёрках
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="section-title text-center mb-12">Результаты для клиентов</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">×5</p>
                <p className="text-sm text-muted-foreground">Скорость обработки заявок</p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">99%</p>
                <p className="text-sm text-muted-foreground">Точность распознавания</p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">30 сек</p>
                <p className="text-sm text-muted-foreground">Вместо 3 минут</p>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">4–6 нед</p>
                <p className="text-sm text-muted-foreground">Окупаемость</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Хотите протестировать GolossOK в вашей компании?
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Получите доступ к демо-версии или узнайте о тарифах и условиях внедрения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/golossok-pricing">
                  Посмотреть цены и тарифы
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                  Запросить личную демонстрацию
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

export default GolossokDemo;