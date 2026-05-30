
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PublicationsMarquee from "@/components/PublicationsMarquee";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet-async";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import TrustAndPosition from "@/components/TrustAndPosition";
import HowIChoose from "@/components/HowIChoose";
import SixQuestions from "@/components/SixQuestions";
import AIFramework from "@/components/AIFramework";
import { Button } from "@/components/ui/button";
import PillButton from "@/components/PillButton";
import { useState, useEffect } from "react";
import { Heart, Lightbulb, Shield, UserCheck, Award, Users, Briefcase, Home, ExternalLink, Send } from "lucide-react";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useNavigate, useLocation } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCountUp } from "@/hooks/use-count-up";
import AnimatedNumber from "@/components/AnimatedNumber";
import alexandraHeadshot from "@/assets/alexandra-headshot.webp";
import alexandraAbout from "@/assets/alexandra-about.webp";
import diplomaImage from "@/assets/credentials/diploma-ai-2025.jpg";
import kaeoImage from "@/assets/credentials/certificate-kaeo-level5.png";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import awardDiploma from "@/assets/about/award-diploma.jpg";
import speakingPodium from "@/assets/about/speaking-podium.jpg";
import awardCeremony from "@/assets/about/award-ceremony.jpg";
import businessAngels from "@/assets/about/business-angels.jpg";
import presentingAudience from "@/assets/about/presenting-audience.jpg";
import consultingMeeting from "@/assets/about/consulting-meeting.jpg";
import exhibitionBooth from "@/assets/about/exhibition-booth.jpg";
import speakingCasual from "@/assets/about/speaking-casual.jpg";
import portraitFormal from "@/assets/about/portrait-formal-new.jpg";
import coPresenting1 from "@/assets/about/co-presenting-1.jpg";
import coPresenting2 from "@/assets/about/co-presenting-2.jpg";
import lectureTools from "@/assets/about/lecture-tools.jpg";
import PhotoLightbox from "@/components/PhotoLightbox";
const About = () => {
  const [weakSidesOpen, setWeakSidesOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedCredential, setSelectedCredential] = useState<null | { image: string; title: string; subtitle: string; details: string; year: string }>(null);
  const diplomaCredentials = [
    {
      image: diplomaImage,
      title: 'Диплом о профессиональной переподготовке',
      subtitle: 'Специалист по искусственному интеллекту',
      details: 'Международный Университет Цифровой Экономики и Технологий',
      year: '2025',
    },
    {
      image: kaeoImage,
      title: 'Квалификационный сертификат KAEO',
      subtitle: 'Уровень 5 — максимальный',
      details: 'Постановка целей на этапе обучения нейронных сетей',
      year: '2025',
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  // Gallery images for lightbox
  const galleryImages = [{
    src: exhibitionBooth,
    alt: "Выставка МЧС"
  }, {
    src: speakingCasual,
    alt: "Выступление на мероприятии"
  }, {
    src: portraitFormal,
    alt: "Александра Моисеева"
  }, {
    src: coPresenting2,
    alt: "Совместное выступление"
  }, {
    src: consultingMeeting,
    alt: "Консультация"
  }, {
    src: businessAngels,
    alt: "Ангелы бизнеса"
  }, {
    src: lectureTools,
    alt: "Лекция об инструментах ИИ"
  }, {
    src: coPresenting1,
    alt: "Совместное выступление"
  }];
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Handle hash scroll on page load
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const navHeight = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [location.hash]);
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
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  const {
    ref: heroRef,
    getAnimationClass: heroAnimation
  } = useMobileAnimations({
    threshold: 0.1
  });
  const {
    ref: journeyRef,
    getAnimationClass: journeyAnimation
  } = useMobileAnimations({
    threshold: 0.1
  });
  const {
    ref: engineeringRef,
    getAnimationClass: engineeringAnimation
  } = useMobileAnimations({
    threshold: 0.1
  });
  const {
    ref: positionRef,
    getAnimationClass: positionAnimation
  } = useMobileAnimations({
    threshold: 0.1
  });
  const {
    ref: quoteRef,
    getAnimationClass: quoteAnimation
  } = useMobileAnimations({
    threshold: 0.1
  });
  const {
    ref: credentialsRef,
    getAnimationClass: credentialsAnimation
  } = useMobileAnimations({
    threshold: 0.1
  });
  const {
    ref: statsRef,
    isVisible: statsVisible
  } = useIntersectionObserver({
    threshold: 0.2
  });

  // Animated counters for key metrics
  const projectsCount = useCountUp({
    end: 36,
    duration: 1800,
    isVisible: statsVisible,
    suffix: '+'
  });
  const auditsCount = useCountUp({
    end: 350,
    duration: 1800,
    isVisible: statsVisible,
    suffix: '+'
  });
  const roiMinCount = useCountUp({
    end: 200,
    duration: 1800,
    isVisible: statsVisible
  });
  const roiMaxCount = useCountUp({
    end: 400,
    duration: 1800,
    isVisible: statsVisible
  });
  return <PageTransition>
      <Helmet>
        <title>Александра Моисеева — инженер цифрового развития бизнеса</title>
        <meta name="description" content="Александра Моисеева из Красноярска помогает бизнесу внедрять ИИ, автоматизировать процессы и выстраивать цифровое развитие компании." />
        <meta name="keywords" content="эксперт по автоматизации бизнеса с ИИ, ИИ‑стратег Красноярск, консультант по автоматизации процессов, AI Strategy Consultant" />
        <link rel="canonical" href="https://aleksamois.ru/about" />
        <meta property="og:title" content="Александра Моисеева — инженер цифрового развития бизнеса" />
        <meta property="og:description" content="Александра Моисеева из Красноярска помогает бизнесу внедрять ИИ, автоматизировать процессы и выстраивать цифровое развитие компании." />
        <meta property="og:url" content="https://aleksamois.ru/about" />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.about())}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        
        <PageBreadcrumbs currentPage="Обо мне" />
      
        <main>
        {/* Hero Section */}
        <section ref={heroRef} className="pt-8 md:pt-12 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="relative rounded-[32px] md:rounded-[40px] bg-surface-mint overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
              <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 pt-6 md:pt-10 pb-0 md:pb-0">
                <div className={`md:col-span-7 pb-10 md:pb-16 ${heroAnimation('animate-fade-in-up')}`}>
                  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6">
                    Обо мне
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.02] tracking-tight text-foreground mb-6">
                    Александра <span className="font-iriska font-normal italic text-accent">Моисеева</span>
                  </h1>
                  <p className="text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-8 max-w-2xl leading-snug">
                    Инженер и архитектор цифрового развития бизнеса
                  </p>
                  <p className="text-base md:text-lg text-foreground/75 mb-10 max-w-xl leading-relaxed">
                    Основатель агентства «НейроРешения»<br />Помогаю собственникам превращать цифровизацию из набора идей и сервисов в понятную систему управления бизнесом.
                  </p>
                  <div className="relative z-10 flex flex-wrap gap-3">
                    <PillButton to="/start" variant="dark">
                      Подобрать формат работы
                    </PillButton>
                    <PillButton to="/services" variant="outline-dark">
                      Посмотреть услуги
                    </PillButton>
                  </div>
                </div>
                <div className={`md:col-span-5 relative flex justify-center md:justify-end items-end self-end pointer-events-none ${heroAnimation('animate-fade-in-right')}`}>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-6 rounded-[50%] bg-black/30 blur-xl" aria-hidden="true" />
                  <img
                    src={alexandraAbout}
                    alt="Александра Моисеева"
                    width={900}
                    height={900}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain [filter:drop-shadow(0_25px_25px_rgba(0,0,0,0.25))_drop-shadow(0_10px_10px_rgba(0,0,0,0.15))]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Кто я */}
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-5">
              <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                Кто я
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
                Инженер{" "}
                <span className="font-iriska font-normal italic text-accent">и архитектор</span>{" "}
                цифрового развития
              </h2>
            </div>
            <div className="md:col-span-7">
              <div className="space-y-5 text-lg text-foreground/80 leading-relaxed md:text-lg">
                <p>
                  Я работаю на стыке управления, процессов, данных и цифровых инструментов.
                </p>
                <p>
                  Смотрю на бизнес глазами собственника: где теряется время, где команда перегружена, где решения зависят от ручного контроля и где цифровой инструмент даст измеримую пользу.
                </p>
                <p>
                  Для меня важны четыре вещи: смысл, экономика, люди и результат.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Моя главная задача */}
        <section className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
          <div className="rounded-[32px] md:rounded-[40px] bg-surface-lavender overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-5">
              Моя главная задача
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] max-w-4xl">
              Перевести цифровизацию в{" "}
              <span className="font-iriska font-normal italic text-accent">
                управленческую систему
              </span>
            </h2>
            <p className="text-base md:text-lg text-foreground/70 mt-6 max-w-3xl leading-relaxed">
              Моя задача — помочь собственнику видеть компанию не через хаос задач, чатов и таблиц, а через понятную систему: процессы, ответственные, данные, сроки и точки контроля.
              <br /><br />
              Так цифровые решения становятся не отдельными сервисами, а частью управления бизнесом.
            </p>
          </div>
        </section>

        {/* Photo: Business Success Award - Combined */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="overflow-hidden rounded-[24px] shadow-card ring-1 ring-foreground/5">
                <img src={awardDiploma} alt="Александра Моисеева — диплом финалиста премии «Бизнес-Успех»" className="w-full h-64 md:h-72 object-cover" style={{
                  objectPosition: '65% top'
                }} loading="lazy" decoding="async" />
              </div>
              <div className="overflow-hidden rounded-[24px] shadow-card ring-1 ring-foreground/5 bg-surface-sand">
                <img src={awardCeremony} alt="Церемония награждения на премии «Бизнес-Успех» 2025" className="w-full h-64 md:h-72 object-contain" loading="lazy" decoding="async" />
              </div>
              <div className="bg-card rounded-[24px] ring-1 ring-foreground/5 shadow-card p-6 md:p-8">
                <p className="text-lg text-foreground leading-relaxed">
                  <span className="text-primary font-semibold">Премия «Бизнес-Успех» 2025</span> — национальная предпринимательская премия для тех, кто строит бизнес на результатах, а не обещаниях.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust and Position */}
        <TrustAndPosition />

        {/* How I Choose */}
        <HowIChoose />

        {/* Photo: Speaking at Podium */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="bg-card rounded-[24px] ring-1 ring-foreground/5 shadow-card p-6 md:p-8 order-2 md:order-1">
                <p className="text-lg text-foreground leading-relaxed"><span className="text-primary font-semibold">Выступление</span> — делюсь практикой внедрения ИИ в малом и среднем бизнесе.</p>
              </div>
              <div className="overflow-hidden rounded-[24px] shadow-card ring-1 ring-foreground/5 order-1 md:order-2">
                <img src={speakingPodium} alt="Александра Моисеева выступает на форуме" className="w-full h-72 md:h-80 object-cover" style={{
                  objectPosition: '65% top'
                }} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* Six Questions */}
        <SixQuestions />

        {/* AI Framework */}
        <AIFramework />

        {/* My Journey - Table style like home */}
        <section ref={journeyRef} className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="max-w-3xl mb-12">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
              Мой путь
            </p>
            <h2 className={`text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5 ${journeyAnimation('animate-fade-in-up')}`}>
              Опыт, который{" "}
              <span className="font-iriska font-normal italic text-accent">сформировал подход</span>
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
              {[
                {
                  num: "01",
                  title: "Когда честность важнее должности",
                  body: [
                    "В 27 лет я возглавила кредитный кооператив, где 60 пайщиков потеряли деньги из-за решений прошлого руководства. Мне пришлось выйти к людям, честно объяснить ситуацию и выстроить план возврата средств.",
                    "Мы вернули доверие и большую часть вложений. Этот опыт сформировал мой стиль: взрослость, прямота, уважение к людям и к их деньгам.",
                  ],
                },
                {
                  num: "02",
                  title: "Почему я ушла из банков: выбор ответственности",
                  body: [
                    "После кризисного управления я поняла: мне важна честность процессов и возможность влиять на результат. Я выбираю работу, где можно отвечать за решение, видеть последствия и менять систему, а не просто выполнять указания сверху.",
                  ],
                },
                {
                  num: "03",
                  title: "От первых экспериментов с ИИ к инженерии цифрового развития",
                  body: [
                    "Весной 2023 года я начала работать с ChatGPT-3.5. Сначала это были первые фразы и эксперименты, затем — разбор механики, архитектуры, данных и сценариев применения в бизнесе.",
                    "Я увидела в ИИ новый слой работы с информацией, процессами и управленческими решениями. Так я перешла в инженерный подход к цифровому развитию.",
                  ],
                },
                {
                  num: "04",
                  title: "Вывод: зрелость важнее скорости",
                  body: [
                    "За два года я несколько раз пересобирала архитектуры проектов и команды. Это был тяжёлый, но важный опыт.",
                    "В 2026 году я выбрала компактный формат работы: я, помощница и партнёры под конкретные задачи. Такой формат даёт больше качества, ответственности и фокуса на результате.",
                  ],
                },
              ].map((item) => (
                <article
                  key={item.num}
                  className="grid md:grid-cols-12 gap-6 py-8 md:py-10 items-start"
                >
                  <div className="md:col-span-1 font-iriska text-5xl md:text-6xl font-bold text-accent tabular-nums leading-none">
                    {item.num}
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7 space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                    {item.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </article>
              ))}
          </div>
        </section>


        {/* Engineering Path - temporarily hidden */}
        {false && <section ref={engineeringRef} className="py-14 md:py-20 lg:py-24 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className={`section-title text-center mb-8 ${engineeringAnimation('animate-fade-in-up')}`}>
              Мой инженерный путь, <span className="font-semibold">в глубину ИИ</span>
            </h2>
            <p className={`text-lg text-foreground text-center mb-12 ${engineeringAnimation('animate-fade-in-up')}`} style={{
              animationDelay: '0.1s'
            }}>
              Я не «освоила» ИИ. Я его изучила глубоко, как инженер.<br />
              За последние 3 года я вложила 2000+ часов в специализированное образование.
            </p>
            
            <div className="bg-card rounded-[24px] ring-1 ring-foreground/5 shadow-card p-6 md:p-8">
              <div className="space-y-8">
                {/* Education Section */}
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-6">Образование (последние 3 года, 2000+ часов)</h3>
                  <div className="space-y-4 ml-8">
                    <div>
                      <p className="font-medium text-foreground mb-2">Сколково — Программа руководства проектами на основе ИИ</p>
                      <ul className="space-y-1 text-sm text-foreground ml-4">
                        <li>• Управление компаниями, которые используют ИИ</li>
                        <li>• Руководство проектами внедрения</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-foreground mb-2">SDS KAEO — уровень 5 (максимальный)</p>
                      <ul className="space-y-1 text-sm text-foreground ml-4">
                        <li>• Это не просто сертификат, это квалификация специалиста высшей категории</li>
                        <li>• Включает: архитектуру, безопасность, управление проектами</li>
                        <li>• Переаттестация каждый год (нужно доказывать, что я в теме)</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-foreground mb-2">Диплом на тему «Управление ИИ в малом бизнесе»</p>
                      <ul className="space-y-1 text-sm text-foreground ml-4">
                        <li>• На основе реального проекта Крайпотребсоюза</li>
                        <li>• Исследование: как ИИ меняет управление малым предприятием</li>
                        <li>• Практический результат: ROI 278% (подтверждено)</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-foreground mb-2">Специализированные курсы (последние 12 месяцев):</p>
                      <ul className="space-y-1 text-sm text-foreground ml-4">
                        <li>• Инженерия подсказок: продвинутый уровень (от OpenAI и Anthropic)</li>
                        <li>• Продвинутые архитектуры поиска и генерации (Coursera)</li>
                        <li>• Multi-Agent Systems (учебная сеть)</li>
                        <li>• Локализация языковых моделей для русского языка (Глубокое обучение.ИИ)</li>
                      </ul>
                    </div>

                    <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                      <p className="font-medium mb-2">Почему это важно?</p>
                      <p className="text-sm text-foreground">
                        Образование — это не «я прошла курс». Это постоянное совершенствование.
                        Каждый новый инструмент, каждая функция от OpenAI — я изучаю.
                        Это значит, что мой совет всегда свежий, не из 2023 года.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Practical Experience Section */}
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-6">Практический опыт</h3>
                  <ul className="space-y-3 text-base text-foreground ml-8">
                    <li className="flex items-start gap-3">
                      <span className="text-primary flex-shrink-0 mt-1">•</span>
                      <span>Собственный код (Python, Node.js, интерфейсы) → управляю разработчиками на уровне архитектуры</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary flex-shrink-0 mt-1">•</span>
                      <div>
                        <strong>3 активных проекта в сфере ИИ</strong> (развиваются на собственные средства):
                        <ul className="mt-2 space-y-1 ml-4 text-sm">
                          <li>- GolossOK (голосовой помощник) — 8 месяцев на рынке</li>
                          <li>- Платформа исследований ИИ — используется 20+ компаниями</li>
                          <li>- Парсер для документов на основе ИИ — готовится к масштабированию</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Partnerships Section */}
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-6">Партнёрства (постоянные, не разовые)</h3>
                  <div className="space-y-4 ml-8">
                    <div>
                      <p className="font-medium text-foreground mb-2">TT Consulting</p>
                      <ul className="space-y-1 text-sm text-foreground ml-4">
                        <li>• Полное партнёрское соглашение</li>
                        <li>• Привлекаю для крупных проектов: разработка + объединение систем</li>
                        <li>• Я проверяю архитектуру и результат лично</li>
                        <li>• Готовность: ответ в течение 48 часов, качество гарантировано</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium text-foreground mb-2">Combox Technology</p>
                      <ul className="space-y-1 text-sm text-foreground ml-4">
                        <li>• Партнёр для интерфейсов и объединения систем</li>
                        <li>• Постоянная техническая поддержка</li>
                        <li>• Независимая проверка качества (не допускаю ошибок на стороне клиента)</li>
                        <li>• Привлекаю для: объединение с CRM, платёжные системы, логистические интерфейсы</li>
                      </ul>
                    </div>

                    <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                      <p className="font-medium mb-2">Моя роль: я не просто «нашла подрядчиков». Я контролирую:</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2"><span className="text-primary font-semibold">•</span> Архитектуру (правильный ли подход?)</li>
                        <li className="flex items-start gap-2"><span className="text-primary font-semibold">•</span> Сроки (вовремя ли?)</li>
                        <li className="flex items-start gap-2"><span className="text-primary font-semibold">•</span> Качество (работает ли как надо?)</li>
                        <li className="flex items-start gap-2"><span className="text-primary font-semibold">•</span> Результат (достигли ли целей?)</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        Если подрядчик не справляется → я беру на себя или ищу другого. Финальный результат — на мне.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Focus Section */}
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-6">Мой фокус (это не пустые слова — примеры из реальных проектов)</h3>
                  <div className="space-y-4">
                    <div className="bg-primary/10 rounded-xl p-5">
                      <h4 className="font-medium text-foreground mb-2">Архитектура</h4>
                      <p className="text-muted-foreground text-sm mb-2">Крайпотребсоюз: спроектировала рабочий процесс на Bpium</p>
                      <p className="text-sm text-primary font-medium">Результат: экономия 92% времени, 8 человек → половина полной занятости, ROI 278%</p>
                    </div>

                    <div className="bg-primary/10 rounded-xl p-5">
                      <h4 className="font-medium text-foreground mb-2">Логика процессов</h4>
                      <p className="text-muted-foreground text-sm mb-2">Грузовой Экспресс: спроектировала бот Telegram с разносом в таблицы</p>
                      <p className="text-sm text-primary font-medium">Результат: экономия 4 часов/неделю, точность 99%, окупаемость 3 недели</p>
                    </div>

                    <div className="bg-primary/10 rounded-xl p-5">
                      <h4 className="font-medium text-foreground mb-2">Объединение систем (интеграции)</h4>
                      <p className="text-muted-foreground text-sm mb-2">GolossOK: голосовой помощник, объединённый с CRM, Telegram, таблицами</p>
                      <p className="text-sm text-primary font-medium">Результат: ×5 скорость обработки заявок, точность распознавания 99%</p>
                    </div>

                    <div className="bg-primary/10 rounded-xl p-5">
                      <h4 className="font-medium text-foreground mb-2">Защищённые контуры (данные не в облаке)</h4>
                      <p className="text-muted-foreground text-sm mb-2">Используем локальные модели (LLaMA, Mistral) + закрытые интерфейсы</p>
                      <p className="text-sm font-medium text-muted-foreground">Ваши данные остаются на вашем сервере</p>
                    </div>

                    <div className="bg-primary/10 rounded-xl p-5">
                      <h4 className="font-medium text-foreground mb-2">Multi-Agent Systems (многоагентные системы)</h4>
                      <p className="text-muted-foreground text-sm mb-2">Когда одного ИИ недостаточно → координирую несколько самостоятельных систем</p>
                      <p className="text-sm font-medium text-muted-foreground">Пример: система проверки договоров + согласований + архива (Крайпотребсоюз)</p>
                    </div>

                    <div className="bg-primary/10 rounded-xl p-5">
                      <h4 className="font-medium text-foreground mb-2">RAG (система поиска и генерации)</h4>
                      <p className="text-muted-foreground text-sm mb-2">ИИ ищет информацию в вашей базе, не фантазирует</p>
                      <p className="text-sm font-medium text-muted-foreground">Пример: поиск по 5000+ договорам Крайпотребсоюза (точность 99%)</p>
                    </div>

                    <div className="bg-primary/10 rounded-xl p-5">
                      <h4 className="font-medium text-foreground mb-2">Локальные модели</h4>
                      <p className="text-muted-foreground text-sm mb-2">Для России: Яндекс.ГПТ, собственные модели</p>
                      <p className="text-muted-foreground text-sm mb-2">Для других стран: Mistral, LLaMA</p>
                      <p className="text-muted-foreground text-sm font-medium">Главное: ваши данные не на серверах OpenAI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>}

        {/* My Position */}
        

        {/* Quote Block */}
        <section ref={quoteRef} className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className={`rounded-[32px] md:rounded-[40px] bg-foreground text-background px-6 md:px-12 lg:px-16 py-14 md:py-20 shadow-plate ring-1 ring-foreground/5 ${quoteAnimation('animate-fade-in-up')}`}>
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6">
              Принцип работы
            </p>
            <blockquote>
              <p className="text-3xl md:text-5xl font-bold leading-[1.1] max-w-5xl text-white">
                ИИ усиливает то, что уже есть в компании:{" "}
                <span className="font-iriska font-normal italic text-accent">порядок</span>{" "}
                — усиливает порядок,{" "}
                <span className="font-iriska font-normal italic text-accent">перегруз</span>{" "}
                — усиливает перегруз. Поэтому я начинаю с архитектуры, а не с инструментов.
              </p>
            </blockquote>
          </div>
        </section>

        {/* Photo: Presenting to Audience */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="bg-card rounded-[24px] ring-1 ring-foreground/5 shadow-card p-6 md:p-8 order-2 md:order-1">
                <p className="text-lg text-foreground leading-relaxed">
                  <span className="text-primary font-semibold">Презентация на бизнес-форуме</span> — практические инструменты для привлечения и удержания клиентов с помощью технологий.
                </p>
              </div>
              <div className="overflow-hidden rounded-[24px] shadow-card ring-1 ring-foreground/5 order-1 md:order-2">
                <img src={presentingAudience} alt="Презентация для аудитории на бизнес-форуме" className="w-full h-72 md:h-80 object-cover object-center" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* My Principles */}
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="max-w-3xl mb-12">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
              Мои принципы
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
              Что{" "}
              <span className="font-iriska font-normal italic text-accent">защищает бюджет</span>{" "}
              клиента
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  number: "01",
                  title: "Я работаю в темпе, который даёт результат",
                  text: "Качественный проект требует времени на разбор, архитектуру и проверку. Обычно работа занимает 4–8 недель, потому что цифровое внедрение затрагивает людей, процессы, данные и управленческие решения. Такой темп снижает риск переделок и защищает бюджет клиента.",
                },
                {
                  number: "02",
                  title: "Я работаю с руководителями, которые участвуют в изменениях",
                  text: "Цифровое развитие начинается с управленческого решения. Руководитель задаёт цель, помогает команде принять новый порядок работы и закрепляет ответственность. Когда руководство включено в проект, цифровой инструмент становится частью работы компании.",
                },
                {
                  number: "03",
                  title: "Сначала процессы, потом технология",
                  text: "Перед внедрением я смотрю, как устроены процессы: где хранятся данные, кто принимает решения, где появляются повторы и какие действия держатся на ручном контроле. После этого технология даёт понятный эффект: меньше ручной нагрузки, больше прозрачности и выше управляемость.",
                },
                {
                  number: "04",
                  title: "Я говорю прямо о рисках",
                  text: "Моя задача — сохранить клиенту деньги, время и управленческое внимание. Поэтому я заранее показываю, где инструмент даст пользу сразу, где нужна подготовка, а где лучше начать со стратегии, аудита или обучения команды. Для собственника это означает одно: решение принимается на фактах, цифрах и понимании последствий.",
                },
              ].map((p, i) => {
                const palettes = [
                  { bg: "bg-surface-mint", text: "text-foreground", muted: "text-foreground/70", num: "text-accent" },
                  { bg: "bg-surface-blush", text: "text-foreground", muted: "text-foreground/70", num: "text-accent" },
                  { bg: "bg-surface-sand", text: "text-foreground", muted: "text-foreground/70", num: "text-accent" },
                  { bg: "bg-surface-lavender", text: "text-foreground", muted: "text-foreground/70", num: "text-accent" },
                ];
                const pal = palettes[i % palettes.length];
                return (
                  <div
                    key={p.number}
                    className={`relative flex flex-col rounded-[28px] ${pal.bg} p-7 md:p-9 min-h-[280px] overflow-hidden shadow-card hover:shadow-plate hover:-translate-y-1 transition-all duration-300 ring-1 ring-foreground/5`}
                  >
                    <span className={`font-iriska text-5xl md:text-6xl font-bold ${pal.num} tabular-nums leading-none mb-5`}>
                      {p.number}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-bold ${pal.text} mb-3 leading-tight`}>{p.title}</h3>
                    <p className={`text-sm md:text-base ${pal.muted} leading-relaxed`}>{p.text}</p>
                  </div>
                );
              })}
          </div>
        </section>

        {/* What is NeyroResheniya */}
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="rounded-[32px] md:rounded-[40px] bg-accent overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-5">
                <p className="text-sm uppercase tracking-widest text-white/90 font-semibold mb-5">
                  Агентство
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.05] mb-6">
                  Что такое{" "}
                  <span className="font-iriska font-normal italic text-white">
                    «НейроРешения»
                  </span>
                </h2>
                <div className="space-y-4 text-base md:text-lg text-white/85 leading-relaxed">
                <p>
                  «НейроРешения» — агентство цифрового развития бизнеса, которое выросло из моей практики внедрения ИИ, автоматизации и управленческих инструментов для компаний.
                </p>
                <p>
                  Это методология, продуктовая система и команда решений вокруг задач собственника: стратегия, аудит, обучение, внедрение, разработка и сопровождение цифровых инструментов.
                </p>
                </div>
              </div>
              <div className="md:col-span-7">
                <p className="text-sm font-semibold text-white/90 uppercase tracking-widest mb-5">Направления</p>
                <ul className="space-y-3 text-base md:text-lg text-white">
                {[
                  "Стратегия цифрового развития",
                  "Глубокий аудит компании для цифровизации",
                  "Обучение команды работе с цифровыми инструментами",
                  "Сопровождение цифрового внедрения",
                  "Проектирование и разработка решений под бизнес-процессы",
                  "Поддержка и развитие цифровых инструментов компании",
                ].map((item) => (
                  <li key={item} className="flex gap-3 border-b border-white/15 pb-3">
                    <span className="text-white/70 flex-shrink-0 font-iriska italic">—</span>
                    <span>{item}</span>
                  </li>
                ))}
                </ul>
                <div className="mt-8">
                  <PillButton to="/services" variant="light">
                    Посмотреть услуги
                  </PillButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo: Business Angels Event */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="overflow-hidden rounded-[24px] shadow-card ring-1 ring-foreground/5">
                <img src={businessAngels} alt="Мероприятие «Ангелы бизнеса»" className="w-full h-72 md:h-80 object-cover object-top" loading="lazy" decoding="async" />
              </div>
              <div className="bg-card rounded-[24px] ring-1 ring-foreground/5 shadow-card p-6 md:p-8">
                <p className="text-lg text-foreground leading-relaxed">
                  <span className="text-primary font-semibold">Мероприятие «Ангелы бизнеса»</span> — нетворкинг с предпринимателями, которые строят бизнес на ценностях и результате.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section ref={credentialsRef} className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="max-w-3xl mb-12">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
              Регалии и опыт
            </p>
            <h2 className={`text-3xl md:text-5xl font-bold text-foreground leading-[1.05] ${credentialsAnimation('animate-fade-in-up')}`}>
              Профессиональная{" "}
              <span className="font-iriska font-normal italic text-accent">база</span>
            </h2>
          </div>

          <div ref={statsRef as any} className="space-y-10">
              {/* Credentials — асимметричный bento */}
              {(() => {
                const items = [
                  { text: "Дипломированный специалист по искусственному интеллекту", bg: "bg-accent", color: "text-white", muted: "text-white/85", size: "lg:col-span-5 lg:row-span-2", num: "01" },
                  { text: "Квалификация KAEO, уровень 5", bg: "bg-surface-mint", color: "text-foreground", muted: "text-foreground/70", size: "lg:col-span-4", num: "02" },
                  { text: "Резидент КРИТБИ", bg: "bg-card", color: "text-foreground", muted: "text-foreground/70", size: "lg:col-span-3", num: "03" },
                  { text: "Резидент IT Park Казань", bg: "bg-surface-sand", color: "text-foreground", muted: "text-foreground/70", size: "lg:col-span-3", num: "04" },
                  { text: "Член ОПОРА России", bg: "bg-foreground", color: "text-background", muted: "text-background/75", size: "lg:col-span-4", num: "05" },
                  { text: "Участник NeuroTech Russia", bg: "bg-surface-blush", color: "text-foreground", muted: "text-foreground/70", size: "lg:col-span-4", num: "06" },
                  { text: "Участник федерального проекта «Бизнес Успех»", bg: "bg-card", color: "text-foreground", muted: "text-foreground/70", size: "lg:col-span-4", num: "07" },
                  { text: "Спикер и участник профильных мероприятий по цифровизации и ИИ", bg: "bg-surface-lavender", color: "text-foreground", muted: "text-foreground/70", size: "lg:col-span-8", num: "08" },
                  { text: "Участник выставки «Антитеррор»", bg: "bg-card", color: "text-foreground", muted: "text-foreground/70", size: "lg:col-span-4", num: "09" },
                  { text: "Профильные программы по искусственному интеллекту, стратегии, трансформации и авторской позиции", bg: "bg-surface-mint", color: "text-foreground", muted: "text-foreground/70", size: "lg:col-span-8", num: "10" },
                ];
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5 auto-rows-[minmax(140px,auto)]">
                    {items.map((it, i) => {
                      const isFeatured = i === 0;
                      return (
                        <div
                          key={i}
                          className={`relative flex flex-col rounded-[24px] ${it.bg} ${it.size} p-5 md:p-7 ring-1 ring-foreground/5 shadow-card hover:shadow-plate hover:-translate-y-0.5 transition-all duration-300 overflow-hidden`}
                        >
                          <span className={`font-iriska tabular-nums leading-none font-bold ${isFeatured ? "text-7xl md:text-8xl text-white/90" : "text-3xl md:text-4xl text-accent"} mb-3`}>
                            {it.num}
                          </span>
                          <p className={`${isFeatured ? "text-xl md:text-2xl font-bold leading-tight" : "text-sm md:text-base font-medium leading-snug"} ${it.color} mt-auto`}>
                            {it.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Diplomas & Certificates (merged from Credentials block) */}
              <div className="grid sm:grid-cols-2 gap-6">
                {diplomaCredentials.map((credential) => (
                  <button
                    key={credential.title}
                    onClick={() => setSelectedCredential(credential)}
                    className="group bg-card rounded-[20px] shadow-card ring-1 ring-foreground/5 p-5 text-left transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <div className="aspect-[3/4] mb-4 rounded-[16px] overflow-hidden bg-surface-sand">
                      <img
                        src={credential.image}
                        alt={credential.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-medium text-foreground text-sm md:text-base mb-1">
                      {credential.title}
                    </h3>
                    <p className="text-xs md:text-sm text-primary font-medium mb-1">
                      {credential.subtitle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {credential.year}
                    </p>
                  </button>
                ))}
              </div>

              {/* Short Resume — home-style stats grid */}
              <div>
                <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                  Краткое резюме
                </p>
                <h3 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-8 max-w-3xl">
                  Что{" "}
                  <span className="font-iriska font-normal italic text-accent">за цифрами</span>
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden shadow-card">
                  {[
                    { label: "Роль", value: "Инженер и архитектор цифрового развития бизнеса" },
                    { label: "Компания", value: "Основатель агентства «НейроРешения»" },
                    { label: "Практика", value: "3,5 года прикладных проектов в цифровизации и ИИ" },
                    { label: "Проекты", value: "40 проектов в продакшн" },
                    { label: "Диагностики", value: "360 разборов процессов и задач" },
                    { label: "Отрасли", value: "10 отраслей" },
                    { label: "География", value: "7 городов, online/offline по России" },
                    { label: "Фокус", value: "Процессы, данные, управляемость, цифровые инструменты" },
                    { label: "Ключевая метрика", value: "Сумма ненужных расходов, которых удалось избежать клиентам" },
                  ].map((row) => (
                    <div key={row.label} className="bg-card p-5 md:p-7">
                      <dt className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">{row.label}</dt>
                      <dd className="text-base md:text-lg text-foreground leading-snug">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
          </div>
        </section>

        {/* Modal for zoomed credential view */}
        <Dialog open={!!selectedCredential} onOpenChange={(open) => !open && setSelectedCredential(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-border">
            <DialogTitle className="sr-only">
              {selectedCredential?.title}
            </DialogTitle>
            {selectedCredential && (
              <div className="relative">
                <img
                  src={selectedCredential.image}
                  alt={selectedCredential.title}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 md:p-6">
                  <h3 className="font-semibold text-foreground text-base md:text-lg">
                    {selectedCredential.title}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {selectedCredential.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedCredential.details} • {selectedCredential.year}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Photo Gallery: Public Activity */}
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="max-w-3xl mb-12">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
              Публичная деятельность
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
              Выступления{" "}
              <span className="font-iriska font-normal italic text-accent">и форумы</span>
            </h2>
          </div>
            
            {/* 4-column grid gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => <div key={index} className="overflow-hidden rounded-[20px] shadow-card ring-1 ring-foreground/5 hover:shadow-elevated transition-all duration-200 cursor-pointer group" onClick={() => openLightbox(index)}>
                  <img src={image.src} alt={image.alt} className="w-full h-40 md:h-48 object-cover object-top transition-transform duration-300 group-hover:scale-110" style={index === 2 ? {
                  objectPosition: 'center center'
                } : undefined} loading="lazy" />
                </div>)}
            </div>
        </section>

        {/* Lightbox */}
        <PhotoLightbox images={galleryImages} currentIndex={lightboxIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} onNavigate={setLightboxIndex} />


        {/* Publications, Media & Speeches */}
        <PublicationsMarquee />

        {/* Energy & Recovery */}
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="rounded-[32px] md:rounded-[40px] bg-surface-blush overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-7">
                <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                  Энергия и устойчивость
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-6">
                  Часть{" "}
                  <span className="font-iriska font-normal italic text-accent">профессиональной</span>{" "}
                  устойчивости
                </h2>
                <div className="space-y-4 text-base md:text-lg text-foreground/75 leading-relaxed">
                  <p>
                    Проекты по цифровому развитию требуют глубокого внимания, выдержки и ясной головы. Я бережно отношусь к энергии: практикую йогу, медитацию и регулярное восстановление.
                  </p>
                  <p className="font-medium text-foreground">
                    Для меня это часть профессиональной устойчивости — держать фокус, видеть задачу целиком и принимать точные решения.
                  </p>
                </div>
              </div>
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-background/55 backdrop-blur-md ring-1 ring-foreground/10 flex items-center justify-center shadow-plate">
                  <Home className="w-16 h-16 md:w-24 md:h-24 text-accent" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Transition CTA */}
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="rounded-[32px] md:rounded-[40px] bg-accent text-white overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-14 md:py-20">
            <p className="text-sm uppercase tracking-widest text-white/90 font-semibold mb-6">
              Следующий шаг
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.02] mb-6 max-w-4xl">
              Начните с понятного{" "}
              <span className="font-iriska font-normal italic text-white">формата</span>{" "}
              работы
            </h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-10 max-w-2xl">
              Если задача уже ясна — переходите к услугам. Если сначала нужно выбрать первый шаг — начните со страницы выбора формата.
            </p>
            <div className="flex flex-wrap gap-3">
              <PillButton to="/start" variant="light">
                Подобрать формат работы
              </PillButton>
              <PillButton to="/services" variant="outline-light">
                Посмотреть услуги
              </PillButton>
              <PillButton
                href="https://t.me/aleksamois"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-light"
              >
                Написать в Telegram
              </PillButton>
            </div>
          </div>
        </section>

        <div id="contacts">
          <Contact />
        </div>
        <Partners />
        </main>

        <Footer />
        
      </div>
    </PageTransition>;
};
export default About;