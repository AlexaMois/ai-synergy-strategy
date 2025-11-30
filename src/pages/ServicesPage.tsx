import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Services from "@/components/Services";
import HowIWorkProcess from "@/components/HowIWorkProcess";
import HowIWork from "@/components/HowIWork";

const ServicesPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-6">
              Мои услуги
            </h1>
            <p className="text-lg text-text-body leading-relaxed max-w-3xl mx-auto">
              Помогаю компаниям внедрять ИИ через диагностику, архитектуру и сопровождение — 
              без хаоса, с фокусом на реальные результаты и ROI
            </p>
          </div>
        </div>
      </section>

      <Services />
      <HowIWorkProcess />
      <HowIWork />
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default ServicesPage;
