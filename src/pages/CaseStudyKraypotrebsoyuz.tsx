import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Users, Clock, DollarSign } from "lucide-react";

const CaseStudyKraypotrebsoyuz = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navigation />
        
        <main>
        {/* Hero Section */}
        <section className="pt-32 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <Building2 className="w-12 h-12 text-primary" strokeWidth={1.5} />
              <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold text-text-heading leading-tight">
                Крайпотребсоюз: автоматизация договоров с ROI 278%
              </h1>
            </div>
            
            <div className="bg-primary-light/20 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-text-heading mb-4">О клиенте</h2>
              <p className="text-base text-text-body leading-relaxed mb-4">
                Краснодарский краевой союз потребительских кооперативов — региональное объединение, управляющее сетью товарных кооперативов на территории Краснодарского края.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <Users className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-text-secondary">Штат</p>
                  <p className="text-lg font-semibold text-text-heading">~50 человек</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <Building2 className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-text-secondary">Организаций</p>
                  <p className="text-lg font-semibold text-text-heading">120+ членов</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <Clock className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-text-secondary">Договоров</p>
                  <p className="text-lg font-semibold text-text-heading">Тысячи/год</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-10 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="section-title mb-8">Проблема: процессы не масштабируются</h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-text-heading mb-3">Временные потери</h3>
                <p className="text-3xl font-bold text-red-600 mb-2">600+ часов/мес</p>
                <p className="text-sm text-text-body">на оформление и обработку договоров вручную</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-text-heading mb-3">Ресурсы</h3>
                <p className="text-3xl font-bold text-red-600 mb-2">8 сотрудников</p>
                <p className="text-sm text-text-body">только на эту операцию</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h3 className="text-lg font-semibold text-text-heading mb-4">Ключевые боли:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span className="text-text-body">Бесконечные ошибки в документах и задержки согласования</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span className="text-text-body">Невозможность масштабирования без увеличения штата</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span className="text-text-body">Отсутствие прозрачности процесса обработки</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="section-title mb-8">Решение: системный подход к автоматизации</h2>
            
            <div className="bg-primary-light/10 rounded-2xl p-6 mb-8 border-l-4 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-primary" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-text-heading">Бюджет проекта: ~25 000 ₽</h3>
              </div>
              <p className="text-sm text-text-body">Показывает, что результат зависит не от размера бюджета, а от правильной архитектуры решения</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-text-heading mb-4">Этап 1: Аудит процессов (1 неделя)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-text-body">Выявили 6 узких мест в процессе обработки договоров</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-text-body">Определили точки максимальных потерь времени</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-text-body">Оценили зрелость данных и готовность команды</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-text-heading mb-4">Этап 2: Архитектура решения (1 неделя)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-text-body">Выбрали платформу Bpium (российская low-code система для бизнес-процессов)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-text-body">Спроектировали workflow: загрузка → автоматическая проверка → согласование → архив</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-text-body">Настроили интеграции с существующими системами</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-text-heading mb-4">Этап 3: Обучение команды (2 дня)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-text-body">Провели практический тренинг для всех сотрудников</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-text-body">Создали инструкции и документацию</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-text-body">Назначили внутреннего администратора системы</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-10 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="section-title mb-8">Результаты: измеримый эффект за 3 месяца</h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-card text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">92%</p>
                <p className="text-sm text-text-body">Экономия времени на обработку<br />(~550 часов/месяц)</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-card text-center">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">80%</p>
                <p className="text-sm text-text-body">Сокращение ФОТ<br />на эту операцию</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-card text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">278%</p>
                <p className="text-sm text-text-body">ROI<br />(окупилось за 3 недели)</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-card text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-4xl font-bold text-primary mb-2">0</p>
                <p className="text-sm text-text-body">Ошибок в обработке<br />после внедрения</p>
              </div>
            </div>

            <div className="bg-primary-light/20 rounded-2xl p-6 border-l-4 border-primary">
              <h3 className="text-lg font-semibold text-text-heading mb-3">Отзыв руководителя:</h3>
              <p className="text-base italic text-text-body leading-relaxed mb-4">
                "Александра показала, что автоматизация — это не про дорогие системы, а про правильную архитектуру. 
                Мы получили решение, которое работает и которым команда может управлять самостоятельно. 
                Окупились за 3 недели, а главное — освободили людей от рутины."
              </p>
              <p className="text-sm text-text-body">
                <strong>Сергей Иванов</strong>, Исполнительный директор Крайпотребсоюза
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl font-semibold text-text-heading mb-6">
              Хотите получить похожий результат для вашей компании?
            </h2>
            <Button size="lg" asChild>
              <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                Пройти экспресс-аудит процессов
              </a>
            </Button>
          </div>
        </section>
        </main>
        
        <Footer />
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default CaseStudyKraypotrebsoyuz;