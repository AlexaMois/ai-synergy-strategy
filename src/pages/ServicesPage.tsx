import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet";
import ServicesDetailed from "@/components/ServicesDetailed";
import AdditionalServices from "@/components/AdditionalServices";
import PageTransition from "@/components/PageTransition";

const ServicesPage = () => {
  return (
    <PageTransition>
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
        <section className="pt-32 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium text-foreground mb-4 leading-tight">
                Услуги: <span className="font-semibold">инженерный подход к ИИ</span>
              </h1>
              <p className="text-base sm:text-lg text-foreground leading-relaxed max-w-3xl mx-auto mb-4">
                Три этапа: диагностика → архитектура → сопровождение. Помогаю внедрить ИИ так, чтобы он работал и приносил результаты. Смотрю на систему как целое: смысл задачи, люди, процессы, данные, архитектура.
              </p>
              <p className="text-base sm:text-lg text-foreground leading-relaxed max-w-3xl mx-auto">
                Работаю с компаниями от 3 до 300 человек. Помогаю внедрить ИИ без переделки процессов и остановки операционки. Смотрю на систему как целое: смысл задачи, люди, процессы, данные, архитектура — вместе. Защищаю бизнес от неправильных решений и лишних затрат.
              </p>
            </div>
          </div>
        </section>

        <ServicesDetailed />
        <AdditionalServices />
        <Contact />
        <Partners />
        </main>
      
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ServicesPage;
