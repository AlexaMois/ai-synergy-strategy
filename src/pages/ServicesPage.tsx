import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet";
import ServicesDetailed from "@/components/ServicesDetailed";
import AdditionalServices from "@/components/AdditionalServices";
import PageTransition from "@/components/PageTransition";
import systemInfographic from "@/assets/system-infographic.png";

const ServicesPage = () => {
  return <PageTransition>
      <Helmet>
        <title>Услуги — Александра Моисеева, Инженер по ИИ</title>
        <meta name="description" content="Три этапа: диагностика → архитектура → сопровождение. Помогаю внедрить ИИ так, чтобы он работал и приносил результаты. Работаю с компаниями от 3 до 300 человек." />
        <meta name="keywords" content="услуги ИИ, внедрение AI, аудит процессов, AI архитектура, консалтинг искусственный интеллект" />
        <link rel="canonical" href="https://aleksamois.ru/services" />
        <meta property="og:title" content="Услуги — Александра Моисеева, Инженер по ИИ" />
        <meta property="og:description" content="Три этапа: диагностика → архитектура → сопровождение. Помогаю внедрить ИИ так, чтобы он работал и приносил результаты." />
        <meta property="og:url" content="https://aleksamois.ru/services" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
      
        <main>
        {/* Hero Section */}
        <section className="pt-20 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Two column layout: Text left, Infographic right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-10">
              {/* Left column - Text */}
              <div className="mb-0 mt-[20px] ml-[30px]">
                <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-medium text-foreground mb-6 leading-tight">
                  Услуги: <span className="font-semibold">стратегический и инженерный подход к ИИ</span>
                </h1>
                <ul className="text-base sm:text-lg text-foreground leading-relaxed mb-8 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Помогаю внедрить ИИ так, чтобы он работал и приносил результаты</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Работаю с компаниями от 3 до 300 человек</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Помогаю внедрить ИИ без переделки процессов и остановки операционки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Защищаю бизнес от неправильных решений и лишних затрат</span>
                  </li>
                </ul>
                
                {/* Three stages process */}
                
                
              </div>

              {/* Right column - Infographic */}
              <div className="flex justify-center lg:flex lg:items-center lg:justify-center">
                <img 
                  src={systemInfographic} 
                  alt="Система как целое - схема элементов: смысл задачи, люди, процессы, данные, архитектура" 
                  className="w-[380px] h-[380px] sm:w-[420px] sm:h-[420px] object-contain"
                />
              </div>
            </div>

            {/* Full width description block */}
            
          </div>
        </section>

        <ServicesDetailed />
        <AdditionalServices />
        <Contact />
        <Partners />
        </main>
      
        <Footer />
      </div>
    </PageTransition>;
};
export default ServicesPage;