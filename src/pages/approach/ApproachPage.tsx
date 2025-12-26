import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Shield, Award, Phone, ArrowRight, CheckCircle, Heart, Lightbulb } from "lucide-react";

const ApproachPage = () => {
  const approaches = [
    {
      id: "method",
      title: "Как я работаю",
      description: "Методология AI Synergy Framework: диагностика → архитектура → сопровождение",
      icon: Target,
      link: "/approach/method"
    },
    {
      id: "guarantees",
      title: "Гарантии",
      description: "Независимость от вендоров, честность в оценках, защита интересов клиента",
      icon: Shield,
      link: "/approach/guarantees"
    },
    {
      id: "certificates",
      title: "Сертификаты и статусы",
      description: "Сколково, SDS KAEO уровень 5, 2000+ часов специализированного образования",
      icon: Award,
      link: "/approach/certificates"
    },
    {
      id: "contacts",
      title: "Контакты",
      description: "Связаться напрямую: Telegram, email, телефон",
      icon: Phone,
      link: "/approach/contacts"
    }
  ];

  const principles = [
    {
      title: "Честность важнее продажи",
      description: "Я скажу, если ИИ не нужен вашей компании. Не продаю ради продажи."
    },
    {
      title: "Независимость от вендоров",
      description: "Выбираю инструменты под задачу, а не под партнёрские комиссии."
    },
    {
      title: "Результат важнее процесса",
      description: "Фокус на ROI и бизнес-метриках, а не на красивых отчётах."
    },
    {
      title: "Люди важнее технологий",
      description: "ИИ — инструмент. Успех зависит от команды и готовности к изменениям."
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Экспертный подход — Александра Моисеева</title>
        <meta name="description" content="Моя методология, принципы работы, гарантии и сертификаты. Независимый взгляд на внедрение ИИ без привязки к вендорам." />
        <meta name="keywords" content="методология внедрения ИИ, принципы работы, гарантии AI консалтинг, сертификаты ИИ" />
        <link rel="canonical" href="https://aleksamois.ru/approach" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageBreadcrumbs currentPage="Экспертный подход" />
        
        <main>
          {/* Hero Section */}
          <section className="py-10 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 max-w-5xl text-center">
              <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold text-foreground leading-tight mb-6">
                Экспертный подход к ИИ
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Не продаю инструменты — помогаю выбрать правильные решения для вашего бизнеса
              </p>
            </div>
          </section>

          {/* Principles Section */}
          <section className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
                Мои принципы
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {principles.map((principle, idx) => (
                  <div key={idx} className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{principle.title}</h3>
                        <p className="text-muted-foreground">{principle.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Navigation Cards */}
          <section className="py-10 md:py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
                Узнать больше
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {approaches.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      to={item.link}
                      className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-card hover:border-primary/20 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Quote Section */}
          <section className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="bg-card rounded-2xl p-8 shadow-soft border border-border text-center">
                <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
                <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-4 italic">
                  "Я делаю так, чтобы ИИ работал, а не впечатлял"
                </blockquote>
                <p className="text-muted-foreground">— Александра Моисеева</p>
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

export default ApproachPage;
