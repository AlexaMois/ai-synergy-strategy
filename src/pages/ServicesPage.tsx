import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import BackToTop from "@/components/BackToTop";
import ServicesDetailed from "@/components/ServicesDetailed";
import AdditionalServices from "@/components/AdditionalServices";
import PageTransition from "@/components/PageTransition";

const ServicesPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navigation />
      
        <main>
        {/* Hero Section */}
        <section className="pt-32 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium text-text-heading mb-4 leading-tight">
                Услуги, <span className="font-semibold">инженерный подход к ИИ</span>
              </h1>
              <p className="text-base sm:text-lg text-text-body leading-relaxed max-w-3xl mx-auto mb-2">
                Который усиливает бизнес, а не усложняет его
              </p>
              <p className="text-base sm:text-lg text-text-body leading-relaxed max-w-3xl mx-auto">
                Работаю с компаниями от 3 до 300 сотрудников. Помогаю руководителям понять, какие ИИ-решения действительно дадут пользу, что можно усилить без больших инвестиций, и какие внедрения лучше отложить.
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
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default ServicesPage;
