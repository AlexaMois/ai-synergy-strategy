
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { CheckCircle, Target, TrendingUp, Users, Clock, Image as ImageIcon, ArrowRight } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AkTransServiceContent from "./AkTransServiceContent";

interface CaseData {
  slug: string;
  title: string;
  subtitle: string;
  targetAudience: string;
  industry: string;
  price: string;
  status: string;
  task: string;
  actions: string[];
  results: string[];
  quote?: string;
}

const casesData: Record<string, CaseData> = {
  "aktransservice": {
    slug: "aktransservice",
    title: "АкТрансСервис",
    subtitle: "Как связали документы, знания и рабочие процессы в одну цифровую систему",
    targetAudience: "транспортная компания, работа на вахте и в нефтегазовом секторе",
    industry: "Транспорт · Вахта · Нефтегаз",
    price: "—",
    status: "действующий",
    task: "Портал собирает документы и права доступа, Jarvis помогает сотрудникам работать с корпоративными знаниями, а автоматизации на локальном сервере сами проверяют данные и доставляют результат людям.",
    actions: [
      "Разобрали процессы, данные, документы и внутренние задачи компании",
      "Спроектировали и внедрили 5 цифровых инструментов за 2 месяца",
      "Собрали рабочую архитектуру под реальные процессы компании",
      "Отказались от дорогого внешнего решения в пользу архитектуры под задачу",
    ],
    results: [
      "Сохранено 1,7 млн ₽ за квартал",
      "5 рабочих цифровых инструментов под процессы компании",
      "Снижена ручная нагрузка на работу с 53 000 позиций",
    ],
  },
  "production-doc-search": {
    slug: "production-doc-search",
    title: "Поиск по технической документации производственной компании",
    subtitle: "QR-код на рабочем месте → ответ из документации за 3 секунды",
    targetAudience: "производственная компания",
    industry: "производство, документооборот",
    price: "—",
    status: "действующий",
    task: "Сотрудникам нужно было быстро находить ответы в технической документации, где встречались текст, изображения и смешанные языки. Поиск вручную занимал много времени и тормозил работу на участках.",
    actions: [
      "Разобрали структуру и форматы технической документации",
      "Создали интеллектуальный поиск с учётом текста, изображений и смешанных языков",
      "Развернули доступ к поиску по QR-коду прямо на рабочем месте",
      "Настроили выдачу релевантного ответа за секунды вместо ручного просмотра",
    ],
    results: [
      "Время ответа на технический запрос — 3 секунды",
      "Экономия 150–350 тыс ₽ в месяц",
      "Снижена зависимость от ручного поиска по документации",
    ],
  },
};

const CaseDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const caseData = slug ? casesData[slug] : null;

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

  if (!caseData) {
    return (
      <PageTransition>
        <div className="min-h-screen">
          <div className="pt-32 pb-20 text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-4">Кейс не найден</h1>
            <Button onClick={() => navigate('/cases')}>Все кейсы</Button>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Кейс: {caseData.title} — Александра Моисеева</title>
        <meta name="description" content={`${caseData.subtitle}. ${caseData.task}`} />
        <link rel="canonical" href={`https://aleksamois.ru/cases/${caseData.slug}`} />
        <meta property="og:title" content={`Кейс: ${caseData.title} — Александра Моисеева`} />
        <meta property="og:description" content={`${caseData.subtitle}. ${caseData.task}`} />
        <meta property="og:url" content={`https://aleksamois.ru/cases/${caseData.slug}`} />
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
          currentPage={caseData.title} 
          parentPages={[{ label: "Кейсы", href: "/cases" }]} 
        />
        
        {slug === "aktransservice" ? (
          <>
            <AkTransServiceContent />
            <Partners />
            <Footer />
          </>
        ) : (
        <>
        <main>
          {/* Hero Section */}
          <section className="pt-10 pb-10 md:pb-16 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-10 h-10 text-primary" strokeWidth={1.5} />
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  caseData.status === 'действующий' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {caseData.status}
                </span>
              </div>
              <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold text-foreground leading-tight mb-4">
                {caseData.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {caseData.subtitle}
              </p>
            </div>
          </section>

          {/* Meta Info Section */}
          <section className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className={`grid sm:grid-cols-2 ${caseData.price && caseData.price !== "—" ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-4`}>
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <Users className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground mb-1">Для кого</p>
                  <p className="text-foreground font-medium">{caseData.targetAudience}</p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <Target className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground mb-1">Отрасль</p>
                  <p className="text-foreground font-medium">{caseData.industry}</p>
                </div>
                {caseData.price && caseData.price !== "—" && (
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <TrendingUp className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                    <p className="text-sm text-muted-foreground mb-1">Стоимость</p>
                    <p className="text-foreground font-medium">{caseData.price}</p>
                  </div>
                )}
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <Clock className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground mb-1">Статус</p>
                  <p className="text-foreground font-medium">{caseData.status}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Task Section */}
          <section className="py-10 md:py-16 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="section-title mb-8">Задача</h2>
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <p className="text-lg text-foreground leading-relaxed">
                  {caseData.task}
                </p>
              </div>
            </div>
          </section>

          {/* Actions Section */}
          <section className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="section-title mb-8">Что было сделано</h2>
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <ul className="space-y-4">
                  {caseData.actions.map((action, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1">{action}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="py-10 md:py-16 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="section-title mb-8">Результаты</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {caseData.results.map((result, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 shadow-soft flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
                    <p className="text-foreground font-medium">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-10 md:py-16 bg-primary/10">
            <div className="container mx-auto px-4 max-w-6xl text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Хотите похожий результат?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Обсудим вашу задачу и найдём оптимальное решение
              </p>
              <Button size="lg" onClick={scrollToContact}>
                Обсудить задачу <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>
        </main>

        <Contact />
        <Partners />
        <Footer />
        </>
        )}
      </div>
    </PageTransition>
  );
};

export default CaseDetailPage;
