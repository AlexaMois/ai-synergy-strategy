import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Truck, TrendingUp, Users, Clock, DollarSign, Target } from "lucide-react";

const CaseStudyCargoExpress = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Кейс: Грузовой Экспресс — Автоматизация логистики за 12 тыс. ₽</title>
        <meta name="description" content="Как автоматизировать логистическую компанию за 12 000 ₽: Telegram-бот + Google Sheets. Экономия 3-4 часа/неделю, окупаемость 3 недели, точность 99%." />
        <meta name="keywords" content="автоматизация логистики, Telegram бот для бизнеса, кейс внедрения ИИ, Грузовой Экспресс" />
        <link rel="canonical" href="https://aleksamois.ru/case-studies/cargo-express" />
        <meta property="og:title" content="Кейс: Грузовой Экспресс — Автоматизация за 12 тыс. ₽" />
        <meta property="og:description" content="Как автоматизировать логистику за 12 000 ₽. Окупаемость 3 недели." />
        <meta property="og:url" content="https://aleksamois.ru/case-studies/cargo-express" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        
        <main>
        {/* Hero Section */}
        <section className="pt-32 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <Truck className="w-12 h-12 text-primary" strokeWidth={1.5} />
              <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold text-foreground leading-tight">
                Грузовой Экспресс: автоматизация за 12 тыс. ₽
              </h1>
            </div>
            
            <div className="bg-primary/10 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">О клиенте</h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Местная логистическая компания, доставляющая грузы по Красноярску и краю. Небольшая, но динамично развивающаяся компания с высокой загрузкой и потребностью в оптимизации операций.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-card rounded-xl p-4">
                  <Users className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Штат</p>
                  <p className="text-lg font-semibold text-foreground">15 человек</p>
                </div>
                <div className="bg-card rounded-xl p-4">
                  <Truck className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Водителей</p>
                  <p className="text-lg font-semibold text-foreground">10 человек</p>
                </div>
                <div className="bg-card rounded-xl p-4">
                  <Clock className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Заявок</p>
                  <p className="text-lg font-semibold text-foreground">40–60/день</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="section-title mb-8">Проблема: ручной контроль убивает время</h2>
            
            <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Ключевые боли:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span className="text-muted-foreground">Диспетчеры вручную вводили данные в таблицу — 2–3 часа каждый день</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span className="text-muted-foreground">Менеджер проверял работу водителей только по звонкам</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span className="text-muted-foreground">Постоянные ошибки в маршрутах и адресах</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span className="text-muted-foreground">Отсутствие контроля над качеством обслуживания</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="section-title mb-8">Решение: Telegram + Google Sheets + автоматизация</h2>
            
            <div className="bg-yellow-50 rounded-2xl p-6 mb-8 border-l-4 border-yellow-600">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-yellow-600" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-foreground">Особенность этого проекта</h3>
              </div>
              <p className="text-base italic text-muted-foreground leading-relaxed mb-3">
                "Мой самый маленький бюджет, но крутейший результат. Показывает, что не нужно тратить миллионы на ИИ — важна правильная архитектура."
              </p>
              <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-yellow-600" strokeWidth={1.5} />
                <p className="text-2xl font-bold text-foreground">Бюджет: 12 000 ₽</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">Что было сделано:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <div>
                      <p className="text-foreground font-medium mb-1">Telegram-бот для водителей</p>
                      <p className="text-sm text-muted-foreground">Водитель кидает фото груза и адрес → бот автоматически сохраняет в Google Sheets</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <div>
                      <p className="text-foreground font-medium mb-1">Реал-тайм доступ для диспетчера</p>
                      <p className="text-sm text-muted-foreground">Диспетчер видит все заявки в реальном времени без ручного ввода</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <div>
                      <p className="text-foreground font-medium mb-1">Голосовые команды</p>
                      <p className="text-sm text-muted-foreground">"Создать маршрут", "Завершить доставку" — всё через голос</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">4.</span>
                    <div>
                      <p className="text-foreground font-medium mb-1">SMS-уведомления клиентам</p>
                      <p className="text-sm text-muted-foreground">Автоматическая отправка статуса доставки</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Технологический стек:</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-card rounded-xl p-4">
                    <p className="font-medium text-foreground">Telegram Bot API</p>
                    <p className="text-sm text-muted-foreground mt-1">Интерфейс для водителей</p>
                  </div>
                  <div className="bg-card rounded-xl p-4">
                    <p className="font-medium text-foreground">Google Sheets API</p>
                    <p className="text-sm text-muted-foreground mt-1">База данных заявок</p>
                  </div>
                  <div className="bg-card rounded-xl p-4">
                    <p className="font-medium text-foreground">Голосовой движок</p>
                    <p className="text-sm text-muted-foreground mt-1">Распознавание команд</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="section-title mb-8">Результаты: окупаемость за 3 недели</h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">3–4 часа</p>
                <p className="text-sm text-muted-foreground">Экономия времени<br />в неделю (диспетчеры)</p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">99%</p>
                <p className="text-sm text-muted-foreground">Точность маршрутов<br />(вместо 70%)</p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">100%</p>
                <p className="text-sm text-muted-foreground">Контроль менеджера<br />над водителями</p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">3 недели</p>
                <p className="text-sm text-muted-foreground">Окупаемость<br />(работает уже 8 месяцев)</p>
              </div>
            </div>

            <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Что изменилось:</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Клиент настолько доволен результатом, что уже заказал расширение системы: добавить автоматическую выставку счетов и интеграцию с бухгалтерией.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-3">Отзыв руководителя:</h3>
              <p className="text-base italic text-muted-foreground leading-relaxed mb-4">
                "За 12 тысяч получили систему, которая экономит нам часы каждый день. Водители довольны — не нужно звонить и отчитываться. Диспетчеры довольны — всё видят в таблице. Клиенты довольны — получают SMS о статусе. И я доволен — вижу полный контроль."
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Дмитрий Ковалёв</strong>, Директор Грузового Экспресса
              </p>
            </div>
          </div>
        </section>

        {/* Architecture Download */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Скачать архитектуру системы
              </h2>
              <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
                Получите подробную схему архитектуры решения: как устроена интеграция Telegram + Google Sheets, какие API используются, и как это можно адаптировать под вашу компанию.
              </p>
              <Button size="lg">Скачать архитектуру (PDF)</Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Хотите получить похожее решение для вашей логистики?
            </h2>
            <Button size="lg" asChild>
              <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                Пройти экспресс-аудит процессов
              </a>
            </Button>
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
