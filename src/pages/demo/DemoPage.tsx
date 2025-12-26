import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Mic, Search, ArrowRight, Play } from "lucide-react";

const DemoPage = () => {
  const demos = [
    {
      id: "voice-bot",
      title: "GolossOK — Голосовой ИИ-бот",
      description: "Посмотрите, как голосовой ассистент создаёт заявки, управляет статусами и делает отчёты — всё голосом.",
      icon: Mic,
      link: "/demo/voice-bot"
    },
    {
      id: "doc-search",
      title: "Интеллектуальный поиск по документации",
      description: "QR-код на рабочем месте → вопрос голосом или текстом → ответ за 3 секунды из базы знаний.",
      icon: Search,
      link: "/demo/doc-search"
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Демо продуктов — Александра Моисеева</title>
        <meta name="description" content="Демонстрации ИИ-продуктов: голосовой бот GolossOK и система поиска по документации в действии." />
        <meta name="keywords" content="демо ИИ, демонстрация AI, голосовой бот демо, поиск документации демо" />
        <link rel="canonical" href="https://aleksamois.ru/demo" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageBreadcrumbs currentPage="Демо" />
        
        <main>
          {/* Hero Section */}
          <section className="py-10 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 max-w-5xl text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold text-foreground leading-tight mb-6">
                Демо продуктов
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Посмотрите, как работают наши ИИ-решения на практике
              </p>
            </div>
          </section>

          {/* Demos Grid */}
          <section className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="grid md:grid-cols-2 gap-8">
                {demos.map((demo) => {
                  const Icon = demo.icon;
                  return (
                    <Link
                      key={demo.id}
                      to={demo.link}
                      className="bg-card rounded-2xl p-8 shadow-soft border border-border hover:shadow-card hover:border-primary/20 transition-all group"
                    >
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {demo.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {demo.description}
                      </p>
                      <div className="flex items-center text-primary font-medium">
                        Смотреть демо
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </Link>
                  );
                })}
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

export default DemoPage;
