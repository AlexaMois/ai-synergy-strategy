
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
import { useState, useEffect } from "react";
import { Heart, Lightbulb, Shield, UserCheck, Award, Users, Briefcase, Home, ExternalLink, Send } from "lucide-react";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useNavigate, useLocation } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCountUp } from "@/hooks/use-count-up";
import AnimatedNumber from "@/components/AnimatedNumber";
import { openCallbackModal } from "@/components/CallbackModal";
import alexandraHeadshot from "@/assets/alexandra-headshot.png";
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
        <title>Александра Моисеева — инженер и архитектор цифрового развития бизнеса</title>
        <meta name="description" content="Александра Моисеева, основатель агентства «НейроРешения». Цифровое развитие бизнеса, стратегия, аудит, внедрение, архитектура процессов и цифровые инструменты." />
        <meta name="keywords" content="эксперт по автоматизации бизнеса с ИИ, ИИ‑стратег Красноярск, консультант по автоматизации процессов, AI Strategy Consultant" />
        <link rel="canonical" href="https://aleksamois.ru/about" />
        <meta property="og:title" content="Александра Моисеева — инженер и архитектор цифрового развития бизнеса" />
        <meta property="og:description" content="Александра Моисеева, основатель агентства «НейроРешения». Цифровое развитие бизнеса, стратегия, аудит, внедрение, архитектура процессов и цифровые инструменты." />
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
        <section ref={heroRef} className="pt-28 md:pt-32 pb-10 md:pb-16 lg:pb-20 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="relative rounded-[32px] md:rounded-[40px] bg-surface-sand overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={heroAnimation('animate-fade-in-up')}>
                <h1 className="mb-4 leading-tight">
                  Александра Моисеева
                </h1>
                <p className="text-xl md:text-2xl text-primary font-medium mb-6">
                  Инженер и архитектор цифрового развития бизнеса
                </p>
                <div className="text-lg text-foreground leading-relaxed mb-8 space-y-4">
                  <p>
                    Я помогаю собственникам переводить цифровизацию из набора идей и сервисов в понятную управленческую систему: с приоритетами, экономикой, ответственными и результатом.
                  </p>
                  <p>
                    Основатель агентства «НейроРешения». Работаю с компаниями, где есть ручная нагрузка, разрозненные процессы, документы, заявки, таблицы, отчёты и управленческие задачи, которые требуют цифрового порядка.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <Button size="lg" onClick={() => navigate('/start')} className="w-full sm:w-auto">
                    Подобрать формат работы
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/services')} className="w-full sm:w-auto">
                    Посмотреть услуги
                  </Button>
                  <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                    <a href="https://t.me/aleksamois" target="_blank" rel="noopener noreferrer">
                      <Send className="w-4 h-4 mr-2" />
                      Написать в Telegram
                    </a>
                  </Button>
                </div>
              </div>
              <div className={`${heroAnimation('animate-fade-in-right')} flex justify-center`}>
                <div className="relative w-full max-w-md rounded-[28px] overflow-hidden bg-background/55 backdrop-blur-md ring-1 ring-foreground/10 shadow-plate p-2 md:p-3">
                  <img src={alexandraHeadshot} alt="Александра Моисеева" className="w-full h-auto object-contain rounded-[22px]" loading="eager" decoding="async" fetchPriority="high" width="400" height="400" />
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Кто я */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-card rounded-[24px] ring-1 ring-foreground/5 shadow-card p-6 md:p-10">
              <h2 className="section-title mb-5">
                <span className="font-semibold">Кто я</span>
              </h2>
              <div className="space-y-4 text-lg text-foreground leading-relaxed">
                <p>
                  Я — Александра Моисеева, инженер и архитектор цифрового развития бизнеса, основатель агентства «НейроРешения».
                </p>
                <p>
                  Моя работа находится на стыке управления, процессов, данных и цифровых инструментов. Я помогаю собственникам видеть, какие процессы требуют внимания первыми, какой инструмент даст измеримую пользу, какой бюджет закладывать и как довести изменения до рабочего результата.
                </p>
                <p>
                  Для меня цифровизация — это управленческая задача. Сначала важны смысл, экономика, люди, процессы и данные. Затем подключаются технологии.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Моя главная задача */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-surface-sand rounded-[24px] ring-1 ring-foreground/5 p-6 md:p-10">
              <h2 className="section-title mb-4">
                Моя главная <span className="font-semibold">задача</span>
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                Я помогаю собственникам переводить цифровизацию из набора идей и сервисов в понятную управленческую систему: с приоритетами, экономикой, ответственными и результатом.
              </p>
            </div>
          </div>
        </section>

        {/* Photo: Business Success Award - Combined */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="overflow-hidden rounded-[24px] shadow-card">
                <img src={awardDiploma} alt="Александра Моисеева — диплом финалиста премии «Бизнес-Успех»" className="w-full h-64 md:h-72 object-cover" style={{
                  objectPosition: '65% top'
                }} loading="lazy" decoding="async" />
              </div>
              <div className="overflow-hidden rounded-[24px] shadow-card bg-muted">
                <img src={awardCeremony} alt="Церемония награждения на премии «Бизнес-Успех» 2025" className="w-full h-64 md:h-72 object-contain" loading="lazy" decoding="async" />
              </div>
              <div className="p-4 md:p-6">
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
        <section className="py-12 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="p-4 md:p-6 order-2 md:order-1">
                <p className="text-lg text-foreground leading-relaxed"><span className="text-primary font-semibold">Выступление</span> — делюсь практикой внедрения ИИ в малом и среднем бизнесе.</p>
              </div>
              <div className="overflow-hidden rounded-[24px] shadow-card order-1 md:order-2">
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

        {/* My Journey - Accordion */}
        <section ref={journeyRef} className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className={`section-title text-center mb-12 ${journeyAnimation('animate-fade-in-up')}`}>
              Мой путь: <span className="font-semibold">опыт, который сформировал подход</span>
            </h2>
            
            <div className="space-y-4">
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
                  className="bg-card rounded-[24px] ring-1 ring-foreground/5 shadow-card p-6 md:p-8"
                >
                  <h3 className="text-lg md:text-xl font-medium text-foreground mb-4 leading-tight">
                    <span className="text-primary font-bold mr-2">{item.num}.</span>
                    {item.title}
                  </h3>
                  <div className="space-y-4 text-base text-foreground leading-relaxed">
                    {item.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
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
        <section ref={quoteRef} className="py-14 md:py-20 bg-[#FAFBFC]">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className={`bg-gradient-to-br from-primary/5 to-primary/10 rounded-[24px] p-8 md:p-12 border-l-4 border-primary ${quoteAnimation('animate-fade-in-up')}`}>
              <blockquote>
                <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                  ИИ усиливает то, что уже есть в компании: порядок — усиливает порядок, перегруз — усиливает перегруз. Поэтому я начинаю с архитектуры, а не с инструментов.
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Photo: Presenting to Audience */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="p-4 md:p-6 order-2 md:order-1">
                <p className="text-lg text-foreground leading-relaxed">
                  <span className="text-primary font-semibold">Презентация на бизнес-форуме</span> — практические инструменты для привлечения и удержания клиентов с помощью технологий.
                </p>
              </div>
              <div className="overflow-hidden rounded-[24px] shadow-card order-1 md:order-2">
                <img src={presentingAudience} alt="Презентация для аудитории на бизнес-форуме" className="w-full h-72 md:h-80 object-cover object-center" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* My Principles */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title text-center mb-10">
              Мои принципы: <span className="font-semibold">что защищает бюджет клиента</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
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
              ].map((p) => (
                <div
                  key={p.number}
                  className="bg-card ring-1 ring-foreground/5 rounded-[24px] p-6 md:p-8 shadow-card hover:shadow-elevated transition-shadow duration-200"
                >
                  <span className="text-primary text-sm font-medium mb-3 block">{p.number}</span>
                  <h3 className="text-lg md:text-xl font-medium text-foreground mb-3 leading-tight">{p.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is NeyroResheniya */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-card rounded-[24px] ring-1 ring-foreground/5 shadow-card p-6 md:p-10">
              <h2 className="section-title mb-5">
                Что такое <span className="font-semibold">«НейроРешения»</span>
              </h2>
              <div className="space-y-4 text-lg text-foreground leading-relaxed mb-6">
                <p>
                  «НейроРешения» — агентство цифрового развития бизнеса, которое выросло из моей практики внедрения ИИ, автоматизации и управленческих инструментов для компаний.
                </p>
                <p>
                  Это методология, продуктовая система и команда решений вокруг задач собственника: стратегия, аудит, обучение, внедрение, разработка и сопровождение цифровых инструментов.
                </p>
              </div>
              <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">Направления</p>
              <ul className="space-y-2 text-base md:text-lg text-foreground mb-6">
                {[
                  "Стратегия цифрового развития",
                  "Глубокий аудит компании для цифровизации",
                  "Обучение команды работе с цифровыми инструментами",
                  "Сопровождение цифрового внедрения",
                  "Проектирование и разработка решений под бизнес-процессы",
                  "Поддержка и развитие цифровых инструментов компании",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-primary flex-shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" onClick={() => navigate('/services')} className="w-full sm:w-auto">
                Посмотреть услуги
              </Button>
            </div>
          </div>
        </section>

        {/* Photo: Business Angels Event */}
        <section className="py-12 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="overflow-hidden rounded-[24px] shadow-card">
                <img src={businessAngels} alt="Мероприятие «Ангелы бизнеса»" className="w-full h-72 md:h-80 object-cover object-top" loading="lazy" decoding="async" />
              </div>
              <div className="p-4 md:p-6">
                <p className="text-lg text-foreground leading-relaxed">
                  <span className="text-primary font-semibold">Мероприятие «Ангелы бизнеса»</span> — нетворкинг с предпринимателями, которые строят бизнес на ценностях и результате.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section ref={credentialsRef} className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className={`section-title text-center mb-8 ${credentialsAnimation('animate-fade-in-up')}`}>
              Профессиональная <span className="font-semibold">база</span>
            </h2>
            
            <div ref={statsRef as any} className="space-y-6">
              {/* Credentials Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Дипломированный специалист по искусственному интеллекту",
                  "Квалификация KAEO, уровень 5",
                  "Резидент КРИТБИ",
                  "Резидент IT Park Казань",
                  "Член ОПОРА России",
                  "Участник NeuroTech Russia",
                  "Участник федерального проекта «Бизнес Успех»",
                  "Спикер и участник профильных мероприятий по цифровизации и ИИ",
                  "Участник выставки «Антитеррор»",
                  "Профильные программы по искусственному интеллекту, стратегии, трансформации и авторской позиции",
                ].map((item, index) => <div key={index} className="bg-card rounded-xl shadow-card p-4 text-center text-sm md:text-base text-foreground font-medium transition-all duration-300 hover:shadow-card">
                    {item}
                  </div>)}
              </div>

              {/* Diplomas & Certificates (merged from Credentials block) */}
              <div className="grid sm:grid-cols-2 gap-6">
                {diplomaCredentials.map((credential) => (
                  <button
                    key={credential.title}
                    onClick={() => setSelectedCredential(credential)}
                    className="group bg-card rounded-xl shadow-card ring-1 ring-foreground/5 p-4 text-left transition-all duration-300 hover:shadow-card hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <div className="aspect-[3/4] mb-4 rounded-lg overflow-hidden bg-muted">
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

              {/* Short Resume */}
              <div className="bg-card rounded-[24px] ring-1 ring-foreground/5 shadow-card p-6 md:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                  Краткое резюме
                </h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
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
                    <div key={row.label} className="p-4 bg-muted rounded-xl">
                      <dt className="text-xs font-medium text-primary uppercase tracking-wide mb-1">{row.label}</dt>
                      <dd className="text-base text-foreground leading-relaxed">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
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
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="section-title text-center mb-8">
              Публичная <span className="font-semibold">деятельность</span>
            </h2>
            
            {/* 4-column grid gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {galleryImages.map((image, index) => <div key={index} className="overflow-hidden rounded-xl shadow-card cursor-pointer group" onClick={() => openLightbox(index)}>
                  <img src={image.src} alt={image.alt} className="w-full h-40 md:h-48 object-cover object-top transition-transform duration-300 group-hover:scale-110" style={index === 2 ? {
                  objectPosition: 'center center'
                } : undefined} loading="lazy" />
                </div>)}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <PhotoLightbox images={galleryImages} currentIndex={lightboxIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} onNavigate={setLightboxIndex} />


        {/* Publications, Media & Speeches */}
        <PublicationsMarquee />

        {/* Energy & Recovery */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="section-title text-center mb-8">
              Энергия <span className="font-semibold">и устойчивость</span>
            </h2>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-[24px] p-6 md:p-8 text-center">
              <Home className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="space-y-4 text-base md:text-lg text-text-body leading-relaxed">
                <p>
                  Проекты по цифровому развитию требуют глубокого внимания, выдержки и ясной головы. Я бережно отношусь к энергии: практикую йогу, медитацию и регулярное восстановление.
                </p>
                <p className="font-medium text-text-heading">
                  Для меня это часть профессиональной устойчивости — держать фокус, видеть задачу целиком и принимать точные решения.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Transition CTA */}
        <section className="py-14 md:py-20 bg-[#FAFBFC]">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="section-title mb-5">
              Начните с понятного <span className="font-semibold">формата работы</span>
            </h2>
            <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
              Если задача уже ясна — переходите к услугам. Если сначала нужно выбрать первый шаг — начните со страницы выбора формата.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
              <Button size="lg" onClick={() => navigate('/start')} className="w-full sm:w-auto">
                Подобрать формат работы
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/services')} className="w-full sm:w-auto">
                Посмотреть услуги
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <a href="https://t.me/aleksamois" target="_blank" rel="noopener noreferrer">
                  Написать в Telegram
                </a>
              </Button>
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