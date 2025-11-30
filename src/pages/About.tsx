import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import portraitImage from "@/assets/alexandra-portrait.jpg";
import WhoIAm from "@/components/WhoIAm";
import WhoIWorkWith from "@/components/WhoIWorkWith";
import Partners from "@/components/Partners";

const About = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-6">
                Александра Моисеева
              </h1>
              <p className="text-xl text-accent font-medium mb-6">
                AI-консультант и инженер по внедрению ИИ
              </p>
              <p className="text-lg text-text-body leading-relaxed">
                15 лет опыта в управлении, финансах и операционной деятельности. 
                Помогаю компаниям внедрять ИИ без хаоса и иллюзий — через диагностику, 
                архитектуру и реальные результаты.
              </p>
            </div>
            <div className="relative">
              <OptimizedImage
                src={portraitImage}
                alt="Александра Моисеева"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={ref} className="py-10 md:py-14 lg:py-16 bg-[#FAFBFC]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-heading mb-12 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Путь и опыт
          </h2>
          
          <div className="space-y-8">
            <div className={`bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
              <h3 className="text-2xl font-semibold text-text-heading mb-4">
                15 лет в управлении и финансах
              </h3>
              <p className="text-lg text-text-body leading-relaxed">
                Начинала карьеру в управленческом консалтинге и финансах. Знаю бизнес-процессы изнутри — 
                не по презентациям, а по реальной работе с компаниями из разных отраслей.
              </p>
            </div>

            <div className={`bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-semibold text-text-heading mb-4">
                Переход в ИИ и цифровизацию
              </h3>
              <p className="text-lg text-text-body leading-relaxed">
                Последние годы полностью сосредоточена на внедрении ИИ-решений. Изучила архитектуру систем, 
                API, LLM, RAG, автоматизацию через Make и n8n. Проектирую решения, которые работают годами, 
                а не "умирают" через месяц.
              </p>
            </div>

            <div className={`bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <h3 className="text-2xl font-semibold text-text-heading mb-4">
                30+ проектов, 350+ консультаций
              </h3>
              <p className="text-lg text-text-body leading-relaxed">
                Работала с компаниями из логистики, PR, финансов, медицины, образования, ритейла. 
                Каждый проект — это диагностика, архитектура, внедрение и обучение команды. 
                ROI клиентов составляет от 200% до 400%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-10 md:py-14 lg:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-heading mb-12 text-center">
            Моя философия работы
          </h2>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F1F4F5] rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
              <h3 className="text-xl font-semibold text-text-heading mb-4">
                Инженерное мышление
              </h3>
              <p className="text-base text-text-body leading-relaxed">
                Я проектирую системы, а не набор инструментов. Если решение ломает процессы — 
                оно не внедряется.
              </p>
            </div>

            <div className="bg-[#F1F4F5] rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
              <h3 className="text-xl font-semibold text-text-heading mb-4">
                Фокус на экономике
              </h3>
              <p className="text-base text-text-body leading-relaxed">
                Считаю ROI до старта проекта. Показываю, что даст эффект в 2 недели, 
                а от чего лучше отказаться.
              </p>
            </div>

            <div className="bg-[#F1F4F5] rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
              <h3 className="text-xl font-semibold text-text-heading mb-4">
                Люди в центре
              </h3>
              <p className="text-base text-text-body leading-relaxed">
                Объясняю простым языком, снимаю страх перед технологиями. 
                Каждый проект завершается обучением команды.
              </p>
            </div>

            <div className="bg-[#F1F4F5] rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
              <h3 className="text-xl font-semibold text-text-heading mb-4">
                Честность превыше всего
              </h3>
              <p className="text-base text-text-body leading-relaxed">
                Не беру хайп-проекты ради галочки. Если автоматизация не окупится — 
                говорю сразу.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-10 md:py-14 lg:py-16 bg-[#FAFBFC]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-heading mb-12 text-center">
            Признание и достижения
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)] text-center">
              <p className="text-lg font-medium text-text-heading">Член НФИИ</p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)] text-center">
              <p className="text-lg font-medium text-text-heading">Резидент IT-Парк Казань</p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)] text-center">
              <p className="text-lg font-medium text-text-heading">Резидент КРИТБИ</p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)] text-center">
              <p className="text-lg font-medium text-text-heading">Бизнес-Успех 2025</p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)] text-center">
              <p className="text-lg font-medium text-text-heading">Зампред ИТ-комитета ОПОРЫ России</p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)] text-center">
              <p className="text-lg font-medium text-text-heading">Спикер AI Summit Russia</p>
            </div>
          </div>
        </div>
      </section>

      <WhoIAm />
      <WhoIWorkWith />
      <Partners />

      <Footer />
      <BackToTop />
    </div>
  );
};

export default About;