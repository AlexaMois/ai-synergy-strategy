import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Clock, AlertTriangle, CheckCircle, Lightbulb, Target, Zap } from "lucide-react";
import { useState } from "react";

const StartPage = () => {
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const quizQuestions = [
    {
      question: "Что больше всего тормозит ваш бизнес?",
      options: [
        "Много рутинных задач, которые отнимают время",
        "Сотрудники делают ошибки в документах/данных",
        "Долго ищем информацию в базах/документах",
        "Не успеваем обрабатывать входящие заявки"
      ]
    },
    {
      question: "Сколько человек в вашей команде?",
      options: [
        "До 15 человек",
        "15-50 человек",
        "50-200 человек",
        "Более 200 человек"
      ]
    },
    {
      question: "Пробовали ли вы внедрять ИИ раньше?",
      options: [
        "Нет, это будет первый опыт",
        "Пробовали, но не получилось",
        "Используем ChatGPT/аналоги точечно",
        "Есть внедрённые ИИ-решения"
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizStep(quizQuestions.length);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setAnswers([]);
  };

  const cases = [
    {
      title: "Крайпотребсоюз",
      result: "92% экономия времени",
      description: "ИИ-ассистент для обработки закупочной документации",
      link: "/cases/kraypotrebsoyuz"
    },
    {
      title: "Грузовой Экспресс",
      result: "3-4 часа экономии в неделю",
      description: "Автоматизация обработки заказов через Telegram",
      link: "/cases/cargo-express"
    },
    {
      title: "Поиск по документации",
      result: "Ответ за 3 секунды",
      description: "QR-код на рабочем месте → мгновенный ответ из базы знаний",
      link: "/products/doc-search"
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>С чего начать внедрение ИИ — Александра Моисеева</title>
        <meta name="description" content="Пройдите короткий опрос и узнайте, как ИИ может помочь вашему бизнесу. Оценка ROI, примеры кейсов, следующие шаги." />
        <meta name="keywords" content="с чего начать ИИ, внедрение искусственного интеллекта, AI для бизнеса, ROI ИИ" />
        <link rel="canonical" href="https://aleksamois.ru/start" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageBreadcrumbs currentPage="С чего начать" />
        
        <main>
          {/* Hero Section */}
          <section className="py-10 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 max-w-5xl text-center">
              <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold text-foreground leading-tight mb-6">
                С чего начать внедрение ИИ?
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                За 2 минуты определим, где ИИ принесёт вам максимальную пользу, и покажем конкретный путь к результату
              </p>
              <Button size="lg" asChild>
                <a href="#quiz">
                  Пройти экспресс-диагностику
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </section>

          {/* Quiz Section */}
          <section id="quiz" className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-8">
                Короткий опрос: что болит?
              </h2>
              
              {quizStep < quizQuestions.length ? (
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-sm font-medium text-primary">
                      Вопрос {quizStep + 1} из {quizQuestions.length}
                    </span>
                    <div className="flex-1 h-2 bg-muted rounded-full">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium text-foreground mb-6">
                    {quizQuestions[quizStep].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {quizQuestions[quizStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option)}
                        className="w-full text-left p-4 rounded-xl border border-border bg-background hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ) : quizStep === quizQuestions.length ? (
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Отлично! Вот что я вижу:
                  </h3>
                  <div className="text-left bg-muted rounded-xl p-4 mb-6">
                    <p className="text-foreground mb-3">
                      <strong>Ваши ответы указывают на:</strong>
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      {answers.map((answer, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {answer}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    На основе ваших ответов я могу предложить конкретные решения. Оставьте контакты, и я свяжусь с вами для бесплатной консультации.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                      <a href="#cta">Получить рекомендации</a>
                    </Button>
                    <Button size="lg" variant="outline" onClick={resetQuiz}>
                      Пройти ещё раз
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          {/* ROI Section */}
          <section id="roi" className="py-10 md:py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-4">
                Стоимость бездействия
              </h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                Каждый месяц без оптимизации — это потерянные деньги и время
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                  <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-red-600 mb-2">50-100 ч</p>
                  <p className="text-sm text-red-700">Потери на рутинных задачах в месяц</p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center">
                  <Clock className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-orange-600 mb-2">15-30%</p>
                  <p className="text-sm text-orange-700">Ошибок в документах и данных</p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                  <TrendingUp className="w-10 h-10 text-yellow-600 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-yellow-700 mb-2">100-500K₽</p>
                  <p className="text-sm text-yellow-700">Потенциальные потери в месяц</p>
                </div>
              </div>
              
              <div className="mt-10 bg-primary/10 rounded-2xl p-6 md:p-8 text-center">
                <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Типичный ROI внедрения ИИ: 200-400%
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Инвестиции в диагностику и внедрение окупаются за 3-12 недель. Это не магия — это математика процессов.
                </p>
              </div>
            </div>
          </section>

          {/* Cases Section */}
          <section id="cases" className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-4">
                3 релевантных кейса
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Реальные результаты для компаний разного масштаба
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {cases.map((caseItem, idx) => (
                  <Link 
                    key={idx} 
                    to={caseItem.link}
                    className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-card hover:border-primary/20 transition-all"
                  >
                    <p className="text-2xl font-bold text-primary mb-2">{caseItem.result}</p>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{caseItem.title}</h3>
                    <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                  </Link>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="outline" asChild>
                  <Link to="/cases">
                    Все кейсы
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Next Steps Section */}
          <section id="next-step" className="py-10 md:py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-4">
                Что дальше?
              </h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                Выберите путь, который подходит вашей ситуации
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                  <Target className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-3">Диагностика</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Глубокий анализ процессов и данных. Roadmap с приоритетами и расчётом ROI.
                  </p>
                  <p className="text-sm font-medium text-primary mb-4">от 6 000 ₽</p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/services/diagnostics">Подробнее</Link>
                  </Button>
                </div>
                
                <div className="bg-card rounded-2xl p-6 shadow-soft border-2 border-primary">
                  <Lightbulb className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-3">Услуги под ключ</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Полный цикл: диагностика → архитектура → сопровождение внедрения.
                  </p>
                  <p className="text-sm font-medium text-primary mb-4">от 60 000 ₽</p>
                  <Button size="sm" asChild className="w-full">
                    <Link to="/services">Все услуги</Link>
                  </Button>
                </div>
                
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                  <Zap className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-3">Готовые продукты</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Проверенные решения: голосовой бот, поиск по документации.
                  </p>
                  <p className="text-sm font-medium text-primary mb-4">от 30 000 ₽/мес</p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/products">Продукты</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="cta" className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Обсудим вашу задачу?
              </h2>
              <p className="text-muted-foreground mb-8">
                Оставьте контакты — я свяжусь с вами в течение 24 часов для бесплатной консультации
              </p>
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

export default StartPage;
