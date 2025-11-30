import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ServicesDetailed from "@/components/ServicesDetailed";
import AdditionalServices from "@/components/AdditionalServices";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";

const ServicesPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navigation />
        <PageBreadcrumbs currentPage="Услуги" />
      
        {/* Hero Section */}
        <section className="pt-32 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold text-text-heading mb-6 leading-tight">
                Услуги: инженерный подход к ИИ, который усиливает бизнес, а не усложняет его
              </h1>
              <p className="text-base sm:text-lg text-text-body leading-relaxed max-w-3xl mx-auto">
                Работаю с компаниями от 3 до 300 сотрудников.<br />
                Помогаю руководителям понять, какие ИИ-решения действительно дадут пользу, что можно усилить без больших инвестиций, и какие внедрения лучше отложить.
              </p>
            </div>
          </div>
        </section>

        <ServicesDetailed />
        <AdditionalServices />
      
        <Footer />
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default ServicesPage;
