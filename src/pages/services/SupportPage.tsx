import { Helmet } from "react-helmet-async";

import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2,
  Clock,
  Handshake,
  Shield,
  ArrowRight
} from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import trainingTeamImage from "@/assets/services/training-team.jpg";
import { trackCTAClick } from "@/utils/analytics";
import RelatedBlogPosts from "@/components/RelatedBlogPosts";

const SupportPage = () => {
  const scrollToContact = () => {
    trackCTAClick({ location: 'services', buttonText: 'Сопровождение CTA' });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Сопровождение автоматизации и внедрения ИИ — от пилота до стабильной работы | Александра Моисеева</title>
        <meta name="description" content="Помогаю команде адаптироваться к ИИ‑инструментам, настраиваю, тестирую и поддерживаю решения, чтобы система не «падала по пятницам в 17:00» и реально разгружала людей." />
        <meta name="keywords" content="сопровождение автоматизации бизнеса, поддержка ИИ решений, обучение команды ИИ, внедрение нейросетей в процессы" />
        <link rel="canonical" href="https://aleksamois.ru/services/support" />
        <meta property="og:title" content="Сопровождение автоматизации и внедрения ИИ — от пилота до стабильной работы | Александра Моисеева" />
        <meta property="og:description" content="Помогаю команде адаптироваться к ИИ‑инструментам, настраиваю, тестирую и поддерживаю решения, чтобы система не «падала по пятницам в 17:00» и реально разгружала людей." />
        <meta property="og:url" content="https://aleksamois.ru/services/support" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.servicesSupport())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Сопровождение автоматизации и внедрения ИИ",
            "description": "Помогаю команде адаптироваться к ИИ-инструментам, настраиваю, тестирую и поддерживаю решения, чтобы система реально разгружала людей.",
            "provider": { "@type": "Person", "name": "Александра Моисеева", "url": "https://aleksamois.ru/about" },
            "areaServed": { "@type": "Country", "name": "Россия" },
            "serviceType": "AI Implementation Support",
            "url": "https://aleksamois.ru/services/support",
            "offers": { "@type": "Offer", "priceCurrency": "RUB", "price": "50000", "description": "от 50 000 ₽/мес" }
          })}
        </script>
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-image.png" />
      </Helmet>

      

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 max-w-6xl pt-24">
          <PageBreadcrumbs 
            currentPage="Сопровождение" 
            parentPages={[{ label: "Услуги", href: "/services" }]}
          />

          {/* Hero - Two columns */}
          <section className="py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Handshake className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-primary font-medium text-sm">Услуга 03</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Сопровождение: чтобы системы не умирали через месяц после запуска
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Большинство проектов умирает не на этапе идей, а спустя пару месяцев: настройки расползаются, сотрудники возвращаются к Excel, ИТ перегружен. Я беру на себя сопровождение автоматизации и ИИ‑решений: тесты, донастройки, обучение команды и разбор инцидентов, чтобы система жила в реальных условиях и продолжала экономить время, а не добавлять головную боль.
                </p>
                <Button size="lg" onClick={scrollToContact}>
                  Заказать звонок
                </Button>
              </div>
              
              {/* Metrics card */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">20-80%</div>
                    <div className="text-xs text-muted-foreground">экономия бюджета</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-xs text-muted-foreground">гарантия результата</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1×/нед</div>
                    <div className="text-xs text-muted-foreground">контроль работ</div>
                  </div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Гарантия результата</p>
                      <p className="text-xs text-muted-foreground">Если метрики не достигнуты за первый месяц — возвращаю стоимость</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* For whom + Pain points - Two columns */}
          <section className="py-10 md:py-12 border-t border-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-semibold text-foreground mb-4">Для кого это</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Для компаний, которые хотят снизить риски и не быть заложниками технических подрядчиков. Для тех, кто разочарован предыдущими проектами.
                </p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-semibold text-foreground mb-4">Какие боли закрывает</h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-muted-foreground text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Сложно понять адекватна ли смета подрядчика</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Внедрения затягиваются и становятся сложнее</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Команды боятся ИИ или не понимают что с ним делать</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Решение сделано, но им никто не пользуется</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Training Photo + How it works */}
          <section className="py-10 md:py-12 border-t border-border">
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div>
                <img 
                  src={trainingTeamImage} 
                  alt="Обучение команды работе с ИИ" 
                  className="w-full h-auto rounded-2xl"
                />
                <p className="text-sm text-muted-foreground text-center mt-3">
                  Обучение команды работе с ИИ-инструментами
                </p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-semibold text-foreground mb-4">Как это работает</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Проверяю сметы, архитектуру, техническое задание</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Контролирую ход работ еженедельно</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Обучаю сотрудников работать с ИИ простым языком</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Помогаю встроить решение в реальные процессы</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Оцениваю результат на реальных цифрах</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Гарантирую достижение обещанных результатов</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* What you get + Why different */}
          <section className="py-10 md:py-12 border-t border-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-semibold text-foreground mb-4">Что вы получаете</h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-sm">Решение которое работает и используется</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-sm">Минимизацию лишних затрат и функций</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-sm">Управляемый процесс внедрения</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-sm">Команду которая понимает инструмент</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-sm">Гарантию достижения метрик</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <div className="bg-primary/10 rounded-2xl p-6 border-l-4 border-primary">
                  <h2 className="text-xl font-semibold text-foreground mb-3">В чём отличие</h2>
                  <p className="text-foreground">
                    Я стою на стороне клиента. Моя задача — защитить бизнес, а не оправдать подрядчика.
                  </p>
                </div>
                
                <div className="bg-muted rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Реальный пример</h3>
                  <p className="text-muted-foreground text-sm">
                    В одной компании подрядчик предложил решение за 2 млн. После экспертизы: половина функций не нужна, а задача решается за 0 ₽ — тем, что уже стоит в системе.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="py-10 md:py-12 border-t border-border">
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Стоимость</div>
                    <div className="text-3xl font-bold text-primary">от 50 000 ₽/месяц</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Срок</div>
                      <div className="font-medium text-foreground">2–3 месяца</div>
                    </div>
                  </div>
                </div>
                <Button size="lg" onClick={scrollToContact}>
                  Заказать звонок <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* Result */}
          <section className="py-10 md:py-12 border-t border-border">
            <div className="bg-muted rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Результат</h2>
              <p className="text-lg text-foreground max-w-2xl mx-auto">
                Компании сокращают бюджет внедрения на <span className="text-primary font-semibold">20–80%</span>. Система работает, результаты достигаются, команда не боится ИИ.
              </p>
            </div>
          </section>
        </div>

        <RelatedBlogPosts slugs={["team-ai-training", "why-ai-projects-fail", "ai-synergy-framework"]} />

        <Contact />
      </main>

      <Footer />
    </PageTransition>
  );
};

export default SupportPage;
