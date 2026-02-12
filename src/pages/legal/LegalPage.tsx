import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FileText, Shield, ScrollText, ArrowRight } from "lucide-react";

const LegalPage = () => {
  const legalDocs = [
    {
      id: "consent",
      title: "Согласие на обработку персональных данных",
      description: "Цели обработки, перечень данных, права субъекта ПДн",
      icon: Shield,
      link: "/legal/consent"
    },
    {
      id: "privacy-policy",
      title: "Политика конфиденциальности",
      description: "Условия хранения и обработки персональных данных",
      icon: FileText,
      link: "/legal/privacy-policy"
    },
    {
      id: "terms",
      title: "Договор-оферта",
      description: "Условия оказания услуг, порядок оплаты, гарантии",
      icon: ScrollText,
      link: "/legal/terms"
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Юридические документы — Александра Моисеева</title>
        <meta name="description" content="Юридические документы: политика конфиденциальности, согласие на обработку данных, договор-оферта." />
        <link rel="canonical" href="https://aleksamois.ru/legal" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageBreadcrumbs currentPage="Юридические документы" />
        
        <main>
          {/* Hero Section */}
          <section className="py-10 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 max-w-5xl text-center">
              <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold text-foreground leading-tight mb-6">
                Юридические документы
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Правовая информация для пользователей сайта и клиентов
              </p>
            </div>
          </section>

          {/* Documents Grid */}
          <section className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="space-y-4">
                {legalDocs.map((doc) => {
                  const Icon = doc.icon;
                  return (
                    <Link
                      key={doc.id}
                      to={doc.link}
                      className="flex items-center gap-4 bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-card hover:border-primary/20 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {doc.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Requisites */}
          <section className="py-10 md:py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Реквизиты</h2>
                <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-2">ИП Моисеева Александра Алексеевна</p>
                    <p>ИНН: 245906802500</p>
                    <p>ОГРНИП: 323246800027635</p>
                  </div>
                  <div>
                    <p>Email: ai@aleksamois.ru</p>
                    <p>Телефон: +7 995 078 88 37</p>
                    <p>Сайт: https://aleksamois.ru</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default LegalPage;
