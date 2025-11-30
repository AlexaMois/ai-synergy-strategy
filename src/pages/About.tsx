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
                  Независимая архитектура ИИ под задачи бизнеса: без привязки к платформам и без лишних затрат.
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
                      Кто я и почему мне доверяют
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
                  Подробнее обо мне →
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
                      Когда честность важнее должности
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-base text-text-body leading-relaxed">
                    В 27 лет я возглавила кредитный кооператив, где 60 пайщиков потеряли деньги из-за решений прошлого руководства. Мне пришлось выйти к людям, честно объяснить ситуацию и выстроить план возврата средств. Мы вернули доверие и большую часть вложений. Это сформировало мой стиль: взрослость, прямота, уважение к людям и к их деньгам.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-2xl shadow-card border-none gradient-border gradient-border-hover overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-3xl font-bold text-primary flex-shrink-0">02</span>
                    <h3 className="text-lg md:text-xl font-semibold text-text-heading">
                      Почему я ушла из банков: выбор ответственности
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
                      От маркетинга к инженерии ИИ: переход в глубину
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
                      Выгорание и вывод: зрелость важнее скорости
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
              Я не «освоила» ИИ. Я его изучила глубоко, как инженер.<br />
              За последние 3 года я вложила 2000+ часов в специализированное образование.
            </p>
            
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 gradient-border gradient-border-hover">
              <div className="space-y-8">
                {/* Education Section */}
                <div>
                  <h3 className="text-xl font-semibold text-text-heading mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎓</span> Образование (последние 3 года, 2000+ часов):
                  </h3>
                  <div className="space-y-4 ml-8">
                    <div>
                      <p className="font-medium text-text-heading mb-2">Сколково — Программа руководства проектами на основе ИИ</p>
                      <ul className="space-y-1 text-sm text-text-body ml-4">
                        <li>• Управление компаниями, которые используют ИИ</li>
                        <li>• Руководство проектами внедрения</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-text-heading mb-2">SDS KAEO — уровень 5 (максимальный)</p>
                      <ul className="space-y-1 text-sm text-text-body ml-4">
                        <li>• Это не просто сертификат, это квалификация специалиста высшей категории</li>
                        <li>• Включает: архитектуру, безопасность, управление проектами</li>
                        <li>• Переаттестация каждый год (нужно доказывать, что я в теме)</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-text-heading mb-2">Диплом на тему «Управление ИИ в малом бизнесе»</p>
                      <ul className="space-y-1 text-sm text-text-body ml-4">
                        <li>• На основе реального проекта Крайпотребсоюза</li>
                        <li>• Исследование: как ИИ меняет управление малым предприятием</li>
                        <li>• Практический результат: ROI 278% (подтверждено)</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-text-heading mb-2">Специализированные курсы (последние 12 месяцев):</p>
                      <ul className="space-y-1 text-sm text-text-body ml-4">
                        <li>• Инженерия подсказок: продвинутый уровень (от OpenAI и Anthropic)</li>
                        <li>• Продвинутые архитектуры поиска и генерации (Coursera)</li>
                        <li>• Multi-Agent Systems (учебная сеть)</li>
                        <li>• Локализация языковых моделей для русского языка (Глубокое обучение.ИИ)</li>
                      </ul>
                    </div>

                    <div className="mt-4 p-4 bg-primary-light/20 rounded-lg">
                      <p className="font-medium mb-2">Почему это важно?</p>
                      <p className="text-sm text-text-body">
                        Образование — это не «я прошла курс». Это постоянное совершенствование.
                        Каждый новый инструмент, каждая функция от OpenAI — я изучаю.
                        Это значит, что мой совет всегда свежий, не из 2023 года.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Practical Experience Section */}
                <div>
                  <h3 className="text-xl font-semibold text-text-heading mb-4 flex items-center gap-2">
                    <span className="text-2xl">💻</span> Практический опыт:
                  </h3>
                  <ul className="space-y-3 text-base text-text-body ml-8">
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
                  <h3 className="text-xl font-semibold text-text-heading mb-4 flex items-center gap-2">
                    <span className="text-2xl">🤝</span> Партнёрства (постоянные, не разовые):
                  </h3>
                  <div className="space-y-4 ml-8">
                    <div>
                      <p className="font-medium text-text-heading mb-2">TT Consulting</p>
                      <ul className="space-y-1 text-sm text-text-body ml-4">
                        <li>• Полное партнёрское соглашение</li>
                        <li>• Используем для крупных проектов: разработка + объединение систем</li>
                        <li>• Я проверяю архитектуру и результат лично</li>
                        <li>• Готовность: ответ в течение 48 часов, качество гарантировано</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium text-text-heading mb-2">Combox Technology</p>
                      <ul className="space-y-1 text-sm text-text-body ml-4">
                        <li>• Партнёр для интерфейсов и объединения систем</li>
                        <li>• Постоянная техническая поддержка</li>
                        <li>• Независимая проверка качества (не переносим ошибки клиенту)</li>
                        <li>• Используем для: объединение с CRM, платёжные системы, логистические интерфейсы</li>
                      </ul>
                    </div>

                    <div className="mt-4 p-4 bg-primary-light/20 rounded-lg">
                      <p className="font-medium mb-2">Моя роль: я не просто «нашла подрядчиков». Я контролирую:</p>
                      <ul className="space-y-1 text-sm text-text-body">
                        <li>✅ Архитектуру (правильный ли подход?)</li>
                        <li>✅ Сроки (вовремя ли?)</li>
                        <li>✅ Качество (работает ли как надо?)</li>
                        <li>✅ Результат (достигли ли целей?)</li>
                      </ul>
                      <p className="text-sm text-text-body mt-2 italic">
                        Если подрядчик не справляется → я беру на себя или ищу другого. Финальный результат — на мне.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Focus Section */}
                <div>
                  <h3 className="text-xl font-semibold text-text-heading mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎯</span> Мой фокус (это не пустые слова — примеры из реальных проектов):
                  </h3>
                  <div className="space-y-4 ml-8">
                    <div>
                      <p className="font-medium mb-1">🏗️ Архитектура</p>
                      <p className="text-sm text-text-body">Крайпотребсоюз: спроектировала рабочий процесс на Bpium</p>
                      <p className="text-sm text-text-body">Результат: экономия 92% времени, 8 человек → половина полной занятости, ROI 278%</p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">🔀 Логика процессов</p>
                      <p className="text-sm text-text-body">Грузовой Экспресс: спроектировала бот Telegram с разносом в таблицы</p>
                      <p className="text-sm text-text-body">Результат: экономия 4 часов/неделю, точность 99%, окупаемость 3 недели</p>
                    </div>

                    <div>
                      <p className="font-medium mb-1">🔗 Объединение систем (интеграции)</p>
                      <p className="text-sm text-text-body">GolossOK: голосовой помощник, объединённый с CRM, Telegram, таблицами</p>
                      <p className="text-sm text-text-body">Результат: ×5 скорость обработки заявок, точность распознавания 99%</p>
                    </div>

                    <div>
                      <p className="font-medium mb-1">🔐 Защищённые контуры (данные не в облаке)</p>
                      <p className="text-sm text-text-body">Используем локальные модели (LLaMA, Mistral) + закрытые интерфейсы</p>
                      <p className="text-sm text-text-body">Ваши данные остаются на вашем сервере</p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">🤖 Multi-Agent Systems (многоагентные системы)</p>
                      <p className="text-sm text-text-body">Когда одного ИИ недостаточно → координирую несколько самостоятельных систем</p>
                      <p className="text-sm text-text-body">Пример: система проверки договоров + согласований + архива (Крайпотребсоюз)</p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">📚 RAG (система поиска и генерации)</p>
                      <p className="text-sm text-text-body">ИИ ищет информацию в вашей базе, не фантазирует</p>
                      <p className="text-sm text-text-body">Пример: поиск по 5000+ договорам Крайпотребсоюза (точность 99%)</p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">🏠 Локальные модели</p>
                      <p className="text-sm text-text-body">Для России: Яндекс.ГПТ, собственные модели</p>
                      <p className="text-sm text-text-body">Для других стран: Mistral, LLaMA</p>
                      <p className="text-sm text-text-body">Главное: ваши данные не на серверах OpenAI</p>
                    </div>
                  </div>
                </div>
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
                  Выбираю решения под задачу, а не под платформу. Архитектура всегда независима — без привязки к вендорам. Для одной компании подходит Perplexity, для другой — Make, для третьей — закрытая LLM. Я работаю на результат, не на комиссионные.
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
              <blockquote>
                <p className="text-xl md:text-2xl font-medium text-text-heading leading-relaxed">
                  ИИ усиливает то, что уже есть в компании: порядок — усиливает порядок, перегруз — усиливает перегруз. Поэтому я начинаю с архитектуры, а не с инструментов.
                </p>
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
                      🔴 Мои слабые стороны <span className="text-base font-normal text-text-body">(и почему я про них говорю)</span>
                    </h2>
                    <ChevronDown className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${weakSidesOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-6 space-y-8 text-base text-text-body leading-relaxed">
                    {/* Weak Side 1 */}
                    <div>
                      <h3 className="text-lg font-semibold text-text-heading mb-3">
                        Я не работаю с компаниями меньше 15 человек
                      </h3>
                      <div className="space-y-3">
                        <p>
                          <span className="text-red-600 font-medium">❌ Почему?</span><br />
                          Слишком мало данных, чтобы построить качественное решение. ИИ работает на данных — если их мало, результат будет случайным. Плюс, невыгодно экономически (мой минимум затрат не окупится).
                        </p>
                        <p>
                          <span className="text-green-600 font-medium">✅ Что я рекомендую вместо этого?</span><br />
                          Если у вас 5–15 человек → используйте готовые инструменты типа ChatGPT, Make, n8n. Не переплачивайте за консультацию. Напишите мне всё равно — дам совет за час.
                        </p>
                      </div>
                    </div>

                    {/* Weak Side 2 */}
                    <div>
                      <h3 className="text-lg font-semibold text-text-heading mb-3">
                        Я не люблю спешку (и требую 4–8 недель на хорошее решение)
                      </h3>
                      <div className="space-y-3">
                        <p>
                          <span className="text-red-600 font-medium">❌ Почему?</span><br />
                          Спешка = 80% провалов внедрения. Я не рискну вашим бюджетом ради того, чтобы сказать «готово». Хорошее решение требует:
                        </p>
                        <ul className="ml-6 space-y-1">
                          <li>• Разбора существующих процессов (2–3 недели)</li>
                          <li>• Проектирования архитектуры (2–4 недели)</li>
                          <li>• Тестирования на малой группе (1–2 недели)</li>
                        </ul>
                        <p className="text-red-600 font-medium">
                          ❌ Если нужно быстро = я не ваш консультант.
                        </p>
                        <p>
                          <span className="text-green-600 font-medium">✅ Что это значит?</span><br />
                          Я не беру срочные проекты. Это раздражает клиентов, которые хотят результат «вчера», но это спасает от провалов тех, кто готов ждать.
                        </p>
                      </div>
                    </div>

                    {/* Weak Side 3 */}
                    <div>
                      <h3 className="text-lg font-semibold text-text-heading mb-3">
                        Я не беру проекты, где руководство не готово к переменам
                      </h3>
                      <div className="space-y-3">
                        <p>
                          <span className="text-red-600 font-medium">❌ Почему?</span><br />
                          ИИ — это не кнопка, которая нажимается и работает. Это изменение процессов. Если руководитель говорит «внедрите ИИ, но ничего не меняйте» → проект провалится.
                        </p>
                        <p>Мне нужно:</p>
                        <ul className="ml-6 space-y-1">
                          <li>• Руководство, которое готово менять процессы</li>
                          <li>• Команда, которая согласна использовать новые инструменты</li>
                          <li>• Понимание, что первый месяц будет медленнее (люди учатся)</li>
                        </ul>
                        <p className="text-red-600 font-medium">
                          ❌ Если «все должно остаться как было, но только с ИИ» = я отказываюсь от проекта.
                        </p>
                        <p>
                          <span className="text-green-600 font-medium">✅ Что это значит?</span><br />
                          Я предварительно провожу диагностику готовности команды. Если готовности нет → я скажу «нет» и не возьму деньги. Это экономит вам бюджет.
                        </p>
                      </div>
                    </div>

                    {/* Weak Side 4 */}
                    <div>
                      <h3 className="text-lg font-semibold text-text-heading mb-3">
                        Я не буду внедрять ИИ, если в процессах хаос
                      </h3>
                      <div className="space-y-3">
                        <p>
                          <span className="text-red-600 font-medium">❌ Почему?</span><br />
                          Помнишь мою фразу: «Если в компании порядок — ИИ усиливает порядок. Если хаос — ИИ усиливает хаос»?
                        </p>
                        <p>Вот это буквально. Если ваши процессы сейчас хаотичны:</p>
                        <ul className="ml-6 space-y-1">
                          <li>• Нет документирования</li>
                          <li>• Нет стандартов</li>
                          <li>• Каждый делает «как он хочет»</li>
                        </ul>
                        <p>
                          То ИИ просто усилит этот хаос. Вместо решения получите «красивый инструмент, который производит мусор».
                        </p>
                        <p className="text-red-600 font-medium">
                          ❌ Сначала нужно навести порядок, потом внедрять ИИ.
                        </p>
                        <p>
                          <span className="text-green-600 font-medium">✅ Что я делаю?</span><br />
                          На диагностике я смотрю на ваши процессы. Если вижу хаос → я рекомендую сначала навести порядок (может быть, за 1–2 недели), потом уже ИИ. Это экономит деньги и даёт результат.
                        </p>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="pt-6 border-t-2 border-green-200">
                      <h3 className="text-xl font-bold text-text-heading mb-4">
                        🟢 ИТОГ: Почему эти «слабые стороны» — это ваше преимущество?
                      </h3>
                      <p className="mb-4 font-semibold text-primary">
                        Если я отказываю в проекте → это значит, я берегу ваш бюджет.
                      </p>
                      <p className="mb-3">Мой подход:</p>
                      <ul className="ml-6 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 flex-shrink-0">✅</span>
                          <span>Я скажу «нет», если проект обречён</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 flex-shrink-0">✅</span>
                          <span>Я потребую времени, даже если вы спешите</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 flex-shrink-0">✅</span>
                          <span>Я потребую воли к переменам, даже если это неудобно</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 flex-shrink-0">✅</span>
                          <span>Я потребую порядка в процессах, даже если это требует переделки</span>
                        </li>
                      </ul>
                      <p className="mt-4 font-semibold">
                        Зато когда мы начнём работать → я гарантирую результат.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        </section>

        {/* Credentials */}
        <section ref={credentialsRef} className="py-10 md:py-16 lg:py-20 bg-[#FAFBFC]">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className={`section-title text-center mb-8 ${credentialsAnimation('animate-fade-in-up')}`}>
              ✅ Где мой профессионализм проверен фактами
            </h2>
            
            <div ref={statsRef as any} className="space-y-6">
              {/* Credentials Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Резидент IT Park Казани",
                  "Резидент центра поддержки и развития инноваций Красноярска",
                  "Победитель конкурса «Бизнес-Успех» (2025)",
                  "Член Национального фонда искусственного интеллекта",
                  "Сертификат SDS KAEO, уровень 5 (самый высокий)"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl shadow-card p-4 text-center text-sm md:text-base text-text-body font-medium transition-all duration-300 hover:shadow-hover hover:scale-[1.02]"
                  >
                    {item}
                  </div>
                ))}
                
                <div className="bg-white rounded-xl shadow-card p-4 text-center text-sm md:text-base text-text-body font-medium transition-all duration-300 hover:shadow-hover hover:scale-[1.02]">
                  <strong>Выступающая на конференциях:</strong>
                  <ul className="mt-2 text-xs space-y-1">
                    <li>• ИИ-Саммит (2024)</li>
                    <li>• Казанская неделя цифровизации (2024)</li>
                    <li>• Неделя нейротехнологий России (2025)</li>
                  </ul>
                </div>
              </div>

              {/* Projects Stats */}
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 gradient-border gradient-border-hover">
                <h3 className="text-xl font-semibold text-text-heading mb-6 text-center">
                  36+ проектов на основе ИИ за 7 лет:
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-[#FAFBFC] rounded-xl">
                    <div className="text-3xl font-bold text-primary mb-2">14</div>
                    <div className="text-sm text-text-body">в торговле (Крайпотребсоюз и сети магазинов)</div>
                    <div className="text-xs font-semibold text-primary mt-2">ROI 250–400%</div>
                  </div>
                  <div className="text-center p-4 bg-[#FAFBFC] rounded-xl">
                    <div className="text-3xl font-bold text-primary mb-2">12</div>
                    <div className="text-sm text-text-body">в логистике (Грузовой Экспресс и др.)</div>
                    <div className="text-xs font-semibold text-primary mt-2">ROI 180–320%</div>
                  </div>
                  <div className="text-center p-4 bg-[#FAFBFC] rounded-xl">
                    <div className="text-3xl font-bold text-primary mb-2">10</div>
                    <div className="text-sm text-text-body">в программных продуктах (SaaS)</div>
                    <div className="text-xs font-semibold text-primary mt-2">ROI 200–400%</div>
                  </div>
                </div>
              </div>

              {/* Consultations Stats */}
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 gradient-border gradient-border-hover">
                <div className="text-center mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-primary block mb-2">
                    {auditsCount}
                  </span>
                  <span className="text-lg text-text-body">консультаций и диагностик</span>
                  <p className="text-sm text-text-body mt-2">(среднее: 2–3 часа на диагностику)</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-[#FAFBFC] rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-2">60%</div>
                    <div className="text-sm text-text-body">компаний после диагностики начинают внедрение</div>
                  </div>
                  <div className="text-center p-4 bg-[#FAFBFC] rounded-xl">
                    <div className="text-2xl font-bold text-primary mb-2">40%</div>
                    <div className="text-sm text-text-body">понимают, что им ИИ вообще не нужен<br />(и это тоже результат!)</div>
                  </div>
                </div>
              </div>

              {/* ROI Highlight */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center border-2 border-primary/20">
                <div className="text-5xl md:text-6xl font-bold text-primary mb-3">
                  {roiMinCount}–{roiMaxCount}%
                </div>
                <div className="text-lg md:text-xl font-semibold text-text-heading mb-2">
                  ROI В ПЕРВЫЕ 3 МЕСЯЦА после запуска
                </div>
                <div className="text-sm text-text-body">
                  (не за год — за квартал!)
                </div>
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
                  «У Александры чёрный пояс по нейронкам — она показывает, как использовать ИИ инженерно, а не поверхностно.»
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-card p-6 gradient-border gradient-border-hover">
                <div className="mb-4 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-base text-text-body italic leading-relaxed">
                  «Спасибо за настойчивость — без твоего анализа мы бы не увидели реальные точки эффекта.»
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-card p-6 gradient-border gradient-border-hover">
                <div className="mb-4 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-base text-text-body italic leading-relaxed">
                  «Первый специалист, который показал реальные цифры и риски, а не красивую презентацию.»
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
                  <span>Инженер под конкретный проект</span>
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
                Когда проект закрыт — я ухожу в природу, просто выключаю телефон и даю мозгу тишину — в этот момент приходит новая ясность.
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
              Посмотреть полное резюме (PDF)
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