import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Briefcase, FolderOpen, Wallet, User, Phone } from "lucide-react";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import CookieConsent from "@/components/CookieConsent";
import TrustMarquee from "@/components/TrustMarquee";
import MarqueeText from "@/components/MarqueeText";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";

const sections = [
  { to: "/start", label: "С чего начать", desc: "Выбор формата работы и короткий разбор", icon: Compass },
  { to: "/services", label: "Услуги", desc: "Диагностика, архитектура, внедрение, сопровождение", icon: Briefcase },
  { to: "/cases", label: "Кейсы", desc: "Реальные проекты и результаты", icon: FolderOpen },
  { to: "/pricing", label: "Цены", desc: "Прозрачные форматы и стоимость", icon: Wallet },
  { to: "/about", label: "Обо мне", desc: "Александра Моисеева — архитектор цифрового развития", icon: User },
];

const NewHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Александра Моисеева — архитектор цифрового развития бизнеса</title>
        <meta
          name="description"
          content="Эксперт по цифровому развитию бизнеса. Агентство НейроРешения — методология и продуктовая система внедрения ИИ и автоматизации."
        />
        <link rel="canonical" href="https://aleksamois.ru/" />
        <meta property="og:title" content="Александра Моисеева — архитектор цифрового развития бизнеса" />
        <meta property="og:description" content="Эксперт и архитектор цифрового развития бизнеса. Агентство НейроРешения — система реализации проектов." />
        <meta property="og:url" content="https://aleksamois.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
      </Helmet>

      <main>
        <section className="container mx-auto max-w-6xl px-4 pt-28 md:pt-36 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground mb-4">
              Александра Моисеева
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-6">
              Эксперт и архитектор цифрового развития бизнеса
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-8">
              Основатель агентства «НейроРешения». Помогаю собственникам и руководителям понять,
              какие процессы стоит перевести в цифровой формат первыми, как снизить ручную нагрузку
              и как внедрять инструменты поэтапно.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/start">
                  Подобрать формат работы <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/services">Посмотреть услуги</Link>
              </Button>
            </div>
          </div>
        </section>

        <TrustMarquee />

        <section className="container mx-auto max-w-6xl px-4 pb-20">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sections.map(({ to, label, desc, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
              >
                <Icon className="h-6 w-6 text-accent mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {label}
                </h2>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </Link>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group rounded-2xl border border-accent bg-accent/5 p-6 transition-all hover:shadow-lg"
            >
              <Phone className="h-6 w-6 text-accent mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Заказать звонок</h2>
              <p className="text-sm text-muted-foreground">
                Обсудим задачу и подберём формат за 15 минут.
              </p>
            </a>
          </div>
        </section>

        <MarqueeText />
        <Testimonials />

        <section id="contact" className="container mx-auto max-w-3xl px-4 pb-24">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Готовы обсудить проект?
            </h2>
            <p className="text-muted-foreground mb-6">
              Напишите в Telegram или закажите звонок — отвечу лично.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <a href="https://t.me/aleksamois" target="_blank" rel="noopener noreferrer">
                  Написать в Telegram
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:+79950788837">+7 995 078 88 37</a>
              </Button>
            </div>
          </div>
        </section>

        <Partners />
      </main>

      <Footer />
      <FloatingCTA />
      <CookieConsent />
    </div>
  );
};

export default NewHome;
