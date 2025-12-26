import { Button } from "@/components/ui/button";
import { CheckCircle2, Printer } from "lucide-react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import OptimizedImage from "@/components/OptimizedImage";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import alexandraPortrait from "@/assets/alexandra-portrait-nobg.png";
import { useNavigate, useLocation } from "react-router-dom";

const ChecklistPage = () => {
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

  const handlePrint = () => {
    window.print();
  };

  const questions = [
    {
      number: 1,
      question: "Какие бизнес-цели я хочу улучшить с помощью ИИ — и можно ли их измерить?",
      answer: "ИИ усиливает процессы, но не заменяет стратегию. Цель должна быть понятной: скорость, качество, снижение затрат, предсказуемость, масштабируемость."
    },
    {
      number: 2,
      question: "Какие процессы сегодня дают наибольшие потери?",
      answer: "Ошибки, задержки, ручная работа, ненужные согласования, человеческий фактор — именно там чаще всего скрывается потенциал."
    },
    {
      number: 3,
      question: "Есть ли у меня данные, и в каком они состоянии?",
      answer: "ИИ не работает в пустоте: нужны данные, пусть даже минимальные. Важно понимать их структуру, объём, качество и доступность."
    },
    {
      number: 4,
      question: "Какие процессы нельзя трогать, чтобы не нарушить устойчивость бизнеса?",
      answer: "Всегда есть критические зоны. В них изменения требуют более аккуратного подхода и дополнительной защиты от сбоев."
    },
    {
      number: 5,
      question: "Кто будет владельцем внедрения ИИ? Есть ли у него время, ресурсы и влияние?",
      answer: "Без ответственного за результат внедрение превращается в эксперимент без продолжения. Нужен человек, который ставит задачу, контролирует и принимает решения."
    },
    {
      number: 6,
      question: "Какой ROI я ожидаю — и могу ли его хотя бы ориентировочно просчитать?",
      answer: "Если эффект заранее не оценивается, есть риск вложиться в решение, которое не окупится или не будет использоваться."
    },
    {
      number: 7,
      question: "Где мне нужен пилот, а где — сразу рабочий процесс?",
      answer: "Не каждый процесс требует большого эксперимента, но у любого пилота должны быть понятные метрики успеха и дедлайны."
    },
    {
      number: 8,
      question: "Какие риски мы получим при неправильном внедрении?",
      answer: "Технические, юридические, финансовые, операционные. Если совокупный риск выше ожидаемого эффекта, подход нужно пересмотреть."
    },
    {
      number: 9,
      question: "Готовы ли сотрудники работать по-новому?",
      answer: "ИИ меняет роли и привычные сценарии. Сопротивление команды может свести на нет даже хорошее решение, если его не учитывать."
    },
    {
      number: 10,
      question: "Что будет через 3 месяца после внедрения?",
      answer: "ИИ — это не одноразовая интеграция. Нужны поддержка, донастройка, контроль качества данных и регулярный анализ результатов."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Чек-лист: 10 вопросов перед внедрением ИИ | Александра Моисеева</title>
        <meta name="description" content="Бесплатный чек-лист для оценки готовности компании к внедрению ИИ. 10 ключевых вопросов, которые помогут избежать ошибок и получить реальный результат." />
        <meta name="keywords" content="чек-лист ИИ, внедрение искусственного интеллекта, готовность к AI, вопросы перед внедрением ИИ" />
        <link rel="canonical" href="https://aleksamois.ru/checklist" />
        <meta property="og:title" content="Чек-лист: 10 вопросов перед внедрением ИИ" />
        <meta property="og:description" content="Бесплатный чек-лист для оценки готовности компании к внедрению ИИ." />
        <meta property="og:url" content="https://aleksamois.ru/checklist" />
      </Helmet>
      <Navigation />
      <PageBreadcrumbs currentPage="Чек-лист" />
      
      <main>
      <div className="container mx-auto py-12 md:py-20">
        {/* Header with Download Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-2">
              ЧЕК-ЛИСТ
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium">
              «10 вопросов перед внедрением ИИ»
            </p>
          </div>
          <Button size="lg" onClick={handlePrint} className="gap-2">
            <Printer size={20} />
            Распечатать / Сохранить PDF
          </Button>
        </div>

        {/* Content for PDF export */}
        <div id="checklist-content" className="space-y-12">
          {/* Author Info */}
          <div className="flex items-center gap-6 bg-muted p-4 sm:p-6 rounded-lg">
            <OptimizedImage 
              src={alexandraPortrait} 
              alt="Александра Моисеева" 
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-medium text-foreground">
                Автор: Александра Моисеева
              </p>
              <p className="text-muted-foreground">
                независимый стратег по внедрению ИИ
              </p>
            </div>
          </div>

          {/* Introduction */}
          <section className="bg-primary/10 p-4 sm:p-6 md:p-8 rounded-lg">
            <h2 className="text-2xl font-medium text-foreground mb-4">
              Вступление
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Во многих компаниях ИИ появляется точечно: отдельные пилоты, единичные боты, разрозненные эксперименты.
              </p>
              <p>
                Этот чек-лист помогает навести порядок в картине: понять, какие процессы действительно готовы к автоматизации, где есть риски и есть ли потенциал для масштабируемого внедрения без ущерба для устойчивости бизнеса.
              </p>
              <p>
                Ответы на эти 10 вопросов показывают уровень зрелости процессов, возможные «провалы» и помогают определить, на каких задачах ИИ даст реальный экономический эффект, а где создаст бардак.
              </p>
            </div>
          </section>

          {/* Questions */}
          <section>
            <h2 className="text-2xl font-medium text-foreground mb-8">
              10 ключевых вопросов, которые стоит задать себе перед внедрением ИИ
            </h2>
            <div className="space-y-6">
              {questions.map((item) => (
                <div key={item.number} className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-card transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xl font-semibold text-white">
                        {item.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-foreground mb-3">
                        {item.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What to Do Next */}
          <section className="bg-muted p-4 sm:p-6 md:p-8 rounded-lg">
            <h2 className="text-2xl font-medium text-foreground mb-4">
              Что делать дальше
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Если больше чем на три вопроса у вас нет чётких ответов — это сигнал, что начинать стоит не с выбора технологий, а с диагностики процессов и экономики.
            </p>
          </section>

          {/* Author's Recommendation */}
          <section className="bg-primary/10 p-4 sm:p-6 md:p-8 rounded-lg">
            <h2 className="text-2xl font-medium text-foreground mb-4">
              Рекомендация от автора
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Перед внедрением ИИ я провожу экспресс-аудит процессов. Он помогает увидеть:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>где ИИ может дать быстрый эффект;</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>где скрыты риски и ограничения;</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>какие решения принесут реальную экономию и управляемый результат.</span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-8">
              По итогам вы получаете прозрачную картину и понятный план, с которого имеет смысл начинать внедрение.
            </p>
            <Button size="lg" onClick={scrollToContact}>
              Обсудить задачу
            </Button>
        </section>
      </div>
      </div>
      </main>

      <Contact />
      <Partners />
      <Footer />
    </div>
  );
};

export default ChecklistPage;
