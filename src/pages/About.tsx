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
import Credentials from "@/components/Credentials";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { ChevronDown, Heart, Lightbulb, Shield, UserCheck, Award, Users, Briefcase, Home, ExternalLink } from "lucide-react";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useNavigate, useLocation } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCountUp } from "@/hooks/use-count-up";
import AnimatedNumber from "@/components/AnimatedNumber";
import alexandraHeadshot from "@/assets/alexandra-headshot.png";
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
  const navigate = useNavigate();
  const location = useLocation();
  const { ref, getStaggeredClass, getAnimationClass } = useMobileAnimations({ threshold: 0.2 });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  const { elRef: numbersRef, isIntersecting: isNumbersIntersecting } = useIntersectionObserver({
    threshold: 0.75,
  });

  const { countUp: projectsCountUp } = useCountUp({
    start: 0,
    end: 30,
    duration: 3,
    isIntersecting: isNumbersIntersecting,
  });

  const { countUp: clientsCountUp } = useCountUp({
    start: 0,
    end: 20,
    duration: 3,
    isIntersecting: isNumbersIntersecting,
  });

  const { countUp: aiSolutionsCountUp } = useCountUp({
    start: 0,
    end: 15,
    duration: 3,
    isIntersecting: isNumbersIntersecting,
  });

  const breadcrumbs = [
    {
      name: "Главная",
      url: "/",
    },
    {
      name: "Обо мне",
      url: "/about",
    },
  ];

  const breadcrumbSchema = getBreadcrumbs({ breadcrumbs });

  return (
    <PageTransition>
      <Helmet>
        <title>Обо мне</title>
        <meta name="description" content="Узнайте больше об эксперте по внедрению ИИ в бизнес — Александре Моисеевой. Опыт, компетенции и подход к проектам." />
        <meta property="og:title" content="Обо мне" />
        <meta property="og:description" content="Узнайте больше об эксперте по внедрению ИИ в бизнес — Александре Моисеевой. Опыт, компетенции и подход к проектам." />
        <meta property="og:url" content={`${window.location.origin}/about`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="order-2 md:order-1">
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${getAnimationClass("animate-fade-in-up", "animate-mobile-slide-up")}`}>
                Привет! Я <span className="text-primary">Александра Моисеева</span>
              </h1>
              <p className={`text-lg text-text-body leading-relaxed mb-6 ${getAnimationClass("animate-fade-in-up", "animate-mobile-slide-up", 0.2)}`}>
                Я помогаю бизнесу находить и внедрять решения на основе искусственного интеллекта, которые реально работают и приносят пользу.
              </p>
              <div className={getAnimationClass("animate-fade-in-up", "animate-mobile-slide-up", 0.4)}>
                <Button size="lg" onClick={() => navigate("/contact")}>
                  Начать проект
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2">
              <div className={`relative rounded-2xl overflow-hidden shadow-soft ${getAnimationClass("animate-fade-in-up", "animate-mobile-slide-up")}`}>
                <img
                  src={alexandraHeadshot}
                  alt="Alexandra Moiseeva"
                  className="w-full h-auto object-cover"
                  style={{ height: "400px" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo: Speaking at Podium */}
      <section className="py-6 md:py-10 bg-muted">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="p-4 md:p-6 order-2 md:order-1">
              <p className="text-lg text-foreground leading-relaxed">
                <span className="text-primary font-semibold">Выступление</span> — делюсь практикой внедрения ИИ в малом и среднем бизнесе.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-soft order-1 md:order-2">
              <img
                src={speakingPodium}
                alt="Александра Моисеева выступает на форуме"
                className="w-full h-72 md:h-80 object-cover"
                style={{
                  objectPosition: "65% top",
                }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section: About Me */}
      <section id="about" ref={ref} className="py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
            <h2 className={`section-title text-center ${getAnimationClass("animate-fade-in-up", "animate-mobile-slide-up")}`}>
              Обо <span className="font-semibold">мне</span>
            </h2>
            <p className={`text-lg text-text-body leading-relaxed text-center mb-8 ${getAnimationClass("animate-fade-in-up", "animate-mobile-slide-up", 0.2)}`}>
              Более 5 лет я помогаю компаниям интегрировать искусственный интеллект в бизнес-процессы. Моя цель — сделать ИИ доступным и понятным инструментом для роста и оптимизации.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column: Text and List */}
              <div>
                <p className={`text-lg text-text-body leading-relaxed mb-6 ${getStaggeredClass(0, "animate-fade-in-up")}`}>
                  Я работаю с компаниями разного масштаба — от стартапов до крупных корпораций. Мой подход основан на глубоком понимании бизнес-задач клиента и поиске наиболее эффективных ИИ-решений.
                </p>
                <ul className={`list-disc pl-5 space-y-2 ${getStaggeredClass(1, "animate-fade-in-up")}`}>
                  <li>Анализ и оптимизация бизнес-процессов с помощью ИИ</li>
                  <li>Разработка и внедрение ИИ-решений под ключ</li>
                  <li>Обучение команд работе с новыми технологиями</li>
                  <li>Консультации по вопросам внедрения и развития ИИ</li>
                </ul>
              </div>

              {/* Right Column: Image */}
              <div className={`relative rounded-2xl overflow-hidden shadow-soft ${getStaggeredClass(2, "animate-fade-in-up")}`}>
                <img
                  src={consultingMeeting}
                  alt="Консультация по внедрению ИИ"
                  className="w-full h-auto object-cover"
                  style={{ height: "300px" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustAndPosition />
      <HowIChoose />
      <SixQuestions />
      <AIFramework />

      {/* Section: Key Numbers */}
      <section id="numbers" className="py-12 md:py-16 lg:py-20 bg-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
            <h2 className="section-title text-center">
              Ключевые <span className="font-semibold">цифры</span>
            </h2>
            <p className="text-lg text-text-body leading-relaxed text-center mb-12">
              Несколько фактов обо мне и моей работе, которые говорят лучше всяких слов.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-center" ref={numbersRef}>
              {/* Projects Completed */}
              <div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                  {isMounted && <AnimatedNumber value={projectsCountUp} />}+
                </div>
                <p className="text-lg text-text-body">Завершенных проектов</p>
              </div>

              {/* Happy Clients */}
              <div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                  {isMounted && <AnimatedNumber value={clientsCountUp} />}+
                </div>
                <p className="text-lg text-text-body">Довольных клиентов</p>
              </div>

              {/* AI Solutions Implemented */}
              <div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                  {isMounted && <AnimatedNumber value={aiSolutionsCountUp} />}+
                </div>
                <p className="text-lg text-text-body">Внедренных ИИ-решений</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Credentials */}
      <Credentials />

      {/* Section: Speaking */}
      <section id="speaking" className="py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
            <h2 className="section-title text-center">
              Выступления <span className="font-semibold">и лекции</span>
            </h2>
            <p className="text-lg text-text-body leading-relaxed text-center mb-12">
              Я регулярно выступаю на конференциях и форумах, делясь опытом внедрения ИИ в бизнес.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="relative rounded-2xl overflow-hidden shadow-soft">
                <PhotoLightbox src={speakingCasual} alt="Выступление на конференции" style={{ objectPosition: "top" }} />
              </div>

              {/* Card 2 */}
              <div className="relative rounded-2xl overflow-hidden shadow-soft">
                <PhotoLightbox src={presentingAudience} alt="Выступление на конференции" style={{ objectPosition: "top" }} />
              </div>

              {/* Card 3 */}
              <div className="relative rounded-2xl overflow-hidden shadow-soft">
                <PhotoLightbox src={lectureTools} alt="Выступление на конференции" style={{ objectPosition: "top" }} />
              </div>

              {/* Card 4 */}
              <div className="relative rounded-2xl overflow-hidden shadow-soft">
                <PhotoLightbox src={coPresenting1} alt="Выступление на конференции" style={{ objectPosition: "top" }} />
              </div>

              {/* Card 5 */}
              <div className="relative rounded-2xl overflow-hidden shadow-soft">
                <PhotoLightbox src={coPresenting2} alt="Выступление на конференции" style={{ objectPosition: "top" }} />
              </div>

              {/* Card 6 */}
              <div className="relative rounded-2xl overflow-hidden shadow-soft">
                <PhotoLightbox src={exhibitionBooth} alt="Выступление на конференции" style={{ objectPosition: "top" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Publications */}
      <PublicationsMarquee />

      {/* Section: Partners */}
      <Partners />

      {/* Section: Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </PageTransition>
  );
};

export default About;
