import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mic, Search, ArrowRight, Zap, Shield, Clock } from "lucide-react";

const ProductsPage = () => {
  const products = [
    {
      id: "voice-bot",
      title: "Голосовой ИИ-бот",
      subtitle: "GolossOK",
      description: "Голосовой AI-ассистент для автоматизации операционных задач: создание заявок, управление статусами, отчёты голосом.",
      icon: Mic,
      metrics: [
        { value: "×5", label: "скорость обработки" },
        { value: "99%", label: "точность распознавания" },
        { value: "4-6 нед", label: "окупаемость" }
      ],
      price: "от 30 000 ₽/мес",
      demoLink: "/demo/voice-bot",
      pricingLink: "/products/voice-bot"
    },
    {
      id: "doc-search",
      title: "Интеллектуальный поиск по документации",
      subtitle: "DocSearch",
      description: "QR-код на рабочем месте → ответ за 3 секунды. Экономия 50-100 часов в месяц на поиск информации.",
      icon: Search,
      metrics: [
        { value: "3 сек", label: "время ответа" },
        { value: "50-100 ч", label: "экономия в месяц" },
        { value: "1 мес", label: "окупаемость" }
      ],
      price: "от 150 000 ₽ разово",
      demoLink: "/demo/doc-search",
      pricingLink: "/products/doc-search"
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Продукты — Готовые ИИ-решения | Александра Моисеева</title>
        <meta name="description" content="Готовые ИИ-продукты для бизнеса: голосовой бот GolossOK и система поиска по документации. Быстрое внедрение, проверенные результаты." />
        <meta name="keywords" content="ИИ продукты, голосовой бот, поиск по документации, AI решения для бизнеса" />
        <link rel="canonical" href="https://aleksamois.ru/products" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageBreadcrumbs currentPage="Продукты" />
        
        <main>
          {/* Hero Section */}
          <section className="py-10 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 max-w-5xl text-center">
              <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold text-foreground leading-tight mb-6">
                Готовые ИИ-решения
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Проверенные продукты с прогнозируемым результатом. Быстрое внедрение, понятная экономика, гарантия качества.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Быстрый старт</span>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Гарантия результата</span>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Окупаемость 1-2 мес</span>
                </div>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid md:grid-cols-2 gap-8">
                {products.map((product) => {
                  const Icon = product.icon;
                  return (
                    <div 
                      key={product.id}
                      className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border hover:shadow-card transition-shadow"
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-primary mb-1">{product.subtitle}</p>
                          <h2 className="text-xl font-semibold text-foreground">{product.title}</h2>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">{product.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {product.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <p className="text-2xl font-bold text-primary">{metric.value}</p>
                            <p className="text-xs text-muted-foreground">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-border">
                        <p className="text-lg font-semibold text-foreground">{product.price}</p>
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={product.demoLink}>Демо</Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link to={product.pricingLink}>
                              Подробнее
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why Products Section */}
          <section className="py-10 md:py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
                Почему готовые продукты?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Услуги (кастомная разработка)</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Полная адаптация под ваши процессы
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Время внедрения: 4-12 недель
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Требует диагностики и проектирования
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Подходит для сложных задач
                    </li>
                  </ul>
                </div>
                
                <div className="bg-primary/5 rounded-2xl p-6 border-2 border-primary/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Продукты (готовые решения)</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      Проверено на реальных проектах
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      Время внедрения: 1-4 недели
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      Прозрачная цена и сроки
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      Подходит для типовых задач
                    </li>
                  </ul>
                </div>
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

export default ProductsPage;
