import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Partners from "@/components/Partners";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { ChevronDown, Heart, Lightbulb, Shield, UserCheck, Award, Users, Briefcase, Home, ExternalLink } from "lucide-react";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCountUp } from "@/hooks/use-count-up";
import alexandraHeadshot from "@/assets/alexandra-headshot.png";

const About = () => {
  const [briefOpen, setBriefOpen] = useState(false);
  const [weakSidesOpen, setWeakSidesOpen] = useState(false);
  const { ref: heroRef, getAnimationClass: heroAnimation } = useMobileAnimations({ threshold: 0.1 });
  const { ref: journeyRef, getAnimationClass: journeyAnimation } = useMobileAnimations({ threshold: 0.1 });
  const { ref: engineeringRef, getAnimationClass: engineeringAnimation } = useMobileAnimations({ threshold: 0.1 });
  const { ref: positionRef, getAnimationClass: positionAnimation } = useMobileAnimations({ threshold: 0.1 });
  const { ref: quoteRef, getAnimationClass: quoteAnimation } = useMobileAnimations({ threshold: 0.1 });
  const { ref: credentialsRef, getAnimationClass: credentialsAnimation } = useMobileAnimations({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useIntersectionObserver({ threshold: 0.2 });
  
  // Animated counters for key metrics
  const projectsCount = useCountUp({ end: 36, duration: 1800, isVisible: statsVisible, suffix: '+' });
  const auditsCount = useCountUp({ end: 350, duration: 1800, isVisible: statsVisible, suffix: '+' });
  const roiMinCount = useCountUp({ end: 200, duration: 1800, isVisible: statsVisible });
  const roiMaxCount = useCountUp({ end: 400, duration: 1800, isVisible: statsVisible });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageBreadcrumbs currentPage="Обо мне" />
      
        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-10 md:pb-16 lg:pb-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={heroAnimation('animate-fade-in-up')}>
                <h1 className="text-[32px] md:text-[36px] font-bold text-text-heading mb-4 leading-tight">
                  Александра Моисеева
                </h1>
                <p className="text-xl md:text-2xl text-primary font-medium mb-6">
                  Независимый стратег и инженер ИИ
                </p>
                <p className="text-lg text-text-body leading-relaxed mb-8">
                  Спокойная сила. Честный подход. Архитектура решений без привязки к вендорам.<br/>
                  Помогаю компаниям внедрять ИИ так, чтобы он давал измеримый результат, а не создавал новые риски.
                </p>
                <Button 
                  size="lg"
                  onClick={() => window.open('https://calendar.app.google/Zb3NNbpFm3Yh1uA59', '_blank')}
                  className="w-full sm:w-auto"
                >
                  Запросить аудит-анализ
                </Button>
              </div>
              <div className={`${heroAnimation('animate-fade-in-right')} flex justify-center`}>
                <div className="relative w-full max-w-md">
                  <img 
                    src={alexandraHeadshot} 
                    alt="Александра Моисеева" 
                    className="w-full h-auto object-contain rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brief About Me - Collapsible */}
        <section className="py-10 md:py-16 lg:py-20 bg-[#FAFBFC]">
          <div className="container mx-auto px-4 max-w-4xl">
            <Collapsible open={briefOpen} onOpenChange={setBriefOpen}>
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 gradient-border gradient-border-hover transition-all duration-300 hover:shadow-hover">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl md:text-3xl font-semibold text-text-heading text-left">
                      Коротко обо мне
                    </h2>
                    <ChevronDown className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${briefOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-6 space-y-6 text-text-body">
                    <div>
                      <h3 className="text-lg font-semibold text-text-heading mb-2">Кто я:</h3>
                      <p className="text-base leading-relaxed">
                        стратег и инженер по внедрению ИИ с 13+ годами опыта в управлении, финансах и операционке.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-heading mb-2">Что делаю:</h3>
                      <p className="text-base leading-relaxed">
                        диагностирую, проектирую и сопровождаю ИИ-решения под реальные задачи бизнеса.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-heading mb-2">Почему ко мне приходят:</h3>
                      <p className="text-base leading-relaxed">
                        я не продаю инструменты — я выбираю правильные решения для компании, без привязки к платформам.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
            
            {!briefOpen && (
              <div className="text-center mt-6">
                <button 
                  onClick={() => setBriefOpen(true)}
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Смотреть подробнее →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* My Journey - Accordion */}
        <section ref={journeyRef} className="py-10 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className={`section-title text-center mb-12 ${journeyAnimation('animate-fade-in-up')}`}>
              Мой путь: <span className="font-semibold">взрослая история без романтизации</span>
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-2xl shadow-card border-none gradient-border gradient-border-hover overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-3xl font-bold text-primary flex-shrink-0">01</span>
                    <h3 className="text-lg md:text-xl font-semibold text-text-heading">
                      Ответственность, которой не ждёшь в 27 лет
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-base text-text-body leading-relaxed">
                    История про кредитный кооператив. 60 пайщиков. Фиктивные займы. Необходимость выйти и сказать правду. 
                    Полное восстановление доверия и средств. Это сформировало мой стиль: взрослость, прямота, уважение к людям и к их деньгам.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-2xl shadow-card border-none gradient-border gradient-border-hover overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-3xl font-bold text-primary flex-shrink-0">02</span>
                    <h3 className="text-lg md:text-xl font-semibold text-text-heading">
                      Почему я ушла из банков и операционки
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-base text-text-body leading-relaxed">
                    После кризисного управления я поняла: я не хочу работать там, где решения зависят от кого-то «сверху». 
                    Мне важна честность процессов и возможность влиять на результат.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-2xl shadow-card border-none gradient-border gradient-border-hover overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-3xl font-bold text-primary flex-shrink-0">03</span>
                    <h3 className="text-lg md:text-xl font-semibold text-text-heading">
                      Маркетинг → ИИ: момент, когда всё стало на свои места
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-base text-text-body leading-relaxed">
                    Весна 2023 года: ChatGPT-3.5, первые фразы, первые эксперименты. 
                    Но вместо поверхностного «инструмента для контента» я увидела механику, внутреннюю архитектуру, структуру данных — и ушла в глубину.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-2xl shadow-card border-none gradient-border gradient-border-hover overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-3xl font-bold text-primary flex-shrink-0">04</span>
                    <h3 className="text-lg md:text-xl font-semibold text-text-heading">
                      Сложные уроки и выгорание
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-base text-text-body leading-relaxed">
                    Четыре раза за два года я теряла разработчиков и пересобирала архитектуры с нуля. Это было тяжело. 
                    В 2026 году я выбрала честный путь: работать в компактном формате — я + помощница + партнёры. Качество выше масштаба.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Engineering Path */}
        <section ref={engineeringRef} className="py-10 md:py-16 lg:py-20 bg-[#FAFBFC]">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className={`section-title text-center mb-8 ${engineeringAnimation('animate-fade-in-up')}`}>
              Мой инженерный путь в ИИ
            </h2>
            <p className={`text-lg text-text-body text-center mb-12 ${engineeringAnimation('animate-fade-in-up')}`} style={{ animationDelay: '0.1s' }}>
              Я не «освоила» ИИ. Я его изучила глубоко, как инженер.
            </p>
            
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 gradient-border gradient-border-hover">
              <ul className="space-y-4 text-base text-text-body">
                <li className="flex items-start gap-3">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>7 специализированных программ по ИИ</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>Сколково, SDS KAEO (уровень 5)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>Диплом на тему «ИИ-управление МСП»</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>Собственный код (чтобы уметь управлять разработчиками)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>Партнёрства с TT Consulting и Combox Technology</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>Опыт трёх стартапов в сфере ИИ</span>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-base text-text-body font-medium">
                  <span className="text-primary">Фокус:</span> архитектура, логика, связность процессов, защищённые контуры, многоагентные системы, RAG, локальные модели.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* My Position */}
        <section ref={positionRef} className="py-10 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className={`section-title text-center mb-12 ${positionAnimation('animate-fade-in-up')}`}>
              Моя позиция
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-card p-6 gradient-border gradient-border-hover transition-all duration-300 hover:shadow-hover hover:scale-[1.02]">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-heading mb-3">Независимость</h3>
                <p className="text-base text-text-body leading-relaxed">
                  Я не продаю платформы. Не лоббирую решения. Для одной компании подходит Perplexity, для другой — Make, для третьей — закрытая LLM. Я работаю на результат, не на комиссионные.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-card p-6 gradient-border gradient-border-hover transition-all duration-300 hover:shadow-hover hover:scale-[1.02]">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-heading mb-3">Инженерность</h3>
                <p className="text-base text-text-body leading-relaxed">
                  ИИ — это архитектура, а не эффектность. Я собираю системы, которые живут после моего ухода.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-card p-6 gradient-border gradient-border-hover transition-all duration-300 hover:shadow-hover hover:scale-[1.02]">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-heading mb-3">Человечность</h3>
                <p className="text-base text-text-body leading-relaxed">
                  Я объясняю технологии так, что их понимают управленцы и сотрудники. ИИ не должен пугать — он должен помогать.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Block */}
        <section ref={quoteRef} className="py-10 md:py-16 lg:py-20 bg-[#FAFBFC]">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className={`bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 border-l-4 border-primary ${quoteAnimation('animate-fade-in-up')}`}>
              <blockquote className="space-y-6">
                <p className="text-xl md:text-2xl font-medium text-text-heading leading-relaxed italic">
                  «Работа с ИИ — это отражение вашего внутреннего. Как вы работаете — так ИИ будет работать с вами.»
                </p>
                <div className="text-base text-text-body leading-relaxed space-y-2">
                  <p>Если в компании порядок — ИИ усиливает порядок.</p>
                  <p>Если хаотичность — ИИ усиливает хаотичность.</p>
                  <p className="font-medium text-primary">Поэтому я начинаю с архитектуры, а не с кнопок.</p>
                </div>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Weak Sides - Collapsible */}
        <section className="py-10 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Collapsible open={weakSidesOpen} onOpenChange={setWeakSidesOpen}>
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 gradient-border gradient-border-hover transition-all duration-300 hover:shadow-hover">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl md:text-3xl font-semibold text-text-heading text-left">
                      Мои слабые стороны <span className="text-base font-normal text-text-body">(и почему это важно)</span>
                    </h2>
                    <ChevronDown className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${weakSidesOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="mt-6 space-y-4 text-base text-text-body">
                    <li className="flex items-start gap-3">
                      <span className="text-primary flex-shrink-0 mt-1">—</span>
                      <span>Я слишком много работаю. Иногда теряю баланс.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary flex-shrink-0 mt-1">—</span>
                      <span>Боюсь больших сцен — но беру ответственность, когда это важно.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary flex-shrink-0 mt-1">—</span>
                      <span>Я добрая. Иногда это мешает в переговорах, но помогает в работе с людьми.</span>
                    </li>
                  </ul>
                  <p className="mt-6 text-base text-text-body italic">
                    Эти качества делают меня живым человеком, а не «идеальным экспертом».
                  </p>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        </section>

        {/* Credentials */}
        <section ref={credentialsRef} className="py-10 md:py-16 lg:py-20 bg-[#FAFBFC]">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className={`section-title text-center mb-12 ${credentialsAnimation('animate-fade-in-up')}`}>
              Где мой профессионализм проверен фактами
            </h2>
            
            <div ref={statsRef as any} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Резидент ИТ-парка Казани",
                "Резидент КРИТБИ Красноярска",
                "Победитель «Бизнес-Успех» (2025)",
                "Член Национального Фонда Искусственного Интеллекта",
                "Спикер AI-Summit, Kazan Digital Week, NeuroTechRussia",
                "Сертификат SDS KAEO, уровень 5"
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-card p-4 text-center text-sm md:text-base text-text-body font-medium transition-all duration-300 hover:shadow-hover hover:scale-[1.02]"
                >
                  {item}
                </div>
              ))}
              
              {/* Animated metrics */}
              <div className="bg-white rounded-xl shadow-card p-4 text-center text-sm md:text-base font-medium transition-all duration-300 hover:shadow-hover hover:scale-[1.02]">
                <span className="text-primary text-xl md:text-2xl font-bold block mb-1">
                  {projectsCount}
                </span>
                <span className="text-text-body">ИИ-проектов</span>
              </div>
              
              <div className="bg-white rounded-xl shadow-card p-4 text-center text-sm md:text-base font-medium transition-all duration-300 hover:shadow-hover hover:scale-[1.02]">
                <span className="text-primary text-xl md:text-2xl font-bold block mb-1">
                  {auditsCount}
                </span>
                <span className="text-text-body">аудитов</span>
              </div>
              
              <div className="bg-white rounded-xl shadow-card p-4 text-center text-sm md:text-base font-medium transition-all duration-300 hover:shadow-hover hover:scale-[1.02]">
                <span className="text-primary text-xl md:text-2xl font-bold block mb-1">
                  {roiMinCount}–{roiMaxCount}%
                </span>
                <span className="text-text-body">ROI клиентов</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-10 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="section-title text-center mb-12">
              Отзывы клиентов
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-card p-6 gradient-border gradient-border-hover">
                <div className="mb-4 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-base text-text-body italic leading-relaxed">
                  «У Александры чёрный пояс по нейронкам — она укладывает ИИ на лопатки.»
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-card p-6 gradient-border gradient-border-hover">
                <div className="mb-4 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-base text-text-body italic leading-relaxed">
                  «Спасибо за настойчивость. Если бы ты не настояла — мы бы так и остались в старых процессах.»
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-card p-6 gradient-border gradient-border-hover">
                <div className="mb-4 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-base text-text-body italic leading-relaxed">
                  «Первый человек, который сказал нам правду, а не красивую презентацию».
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How I Work Now */}
        <section className="py-10 md:py-16 lg:py-20 bg-[#FAFBFC]">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="section-title text-center mb-8">
              Как я работаю сейчас
            </h2>
            <p className="text-lg text-text-body text-center mb-8">
              Формат, который я выбираю на 2026 год:<br/>
              <span className="font-semibold">индивидуальная работа + партнёрские команды → глубина вместо масштаба.</span>
            </p>
            
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 gradient-border gradient-border-hover">
              <ul className="space-y-4 text-base text-text-body">
                <li className="flex items-start gap-3">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>Я + помощница</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>Разработчик под задачи</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>TT Consulting и Combox Technology для крупных проектов</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>Контроль архитектуры и результата — на мне</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Energy & Recovery */}
        <section className="py-10 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="section-title text-center mb-8">
              Моя энергия и восстановление
            </h2>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 md:p-8 text-center">
              <Home className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-base md:text-lg text-text-body leading-relaxed">
                Когда проект закрыт — я ухожу в природу, выключаю телефон или смотрю сериал с мороженым.
                <br/><br/>
                <span className="font-medium text-text-heading">
                  Это мой способ сохранять ясность и тот самый спокойный стиль работы.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Resume */}
        <section className="py-10 md:py-16 lg:py-20 bg-[#FAFBFC]">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="section-title mb-6">
              Полное резюме
            </h2>
            <p className="text-base text-text-body mb-6">
              Моё официальное резюме доступно здесь
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://hh.ru', '_blank')}
              className="gap-2"
            >
              Смотреть резюме на HH.ru
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* Partners Marquee */}
        <Partners />

        {/* Final CTA */}
        <section className="py-10 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-text-heading mb-6">
              Хотите понять, какие ИИ-решения действительно нужны вашей компании?
            </h2>
            <p className="text-lg text-text-body mb-8">
              Начнём с аудита-анализа — это самый честный формат знакомства.
            </p>
            <Button 
              size="lg"
              onClick={() => window.open('https://calendar.app.google/Zb3NNbpFm3Yh1uA59', '_blank')}
            >
              Запросить аудит-анализ
            </Button>
          </div>
        </section>

        <Footer />
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default About;