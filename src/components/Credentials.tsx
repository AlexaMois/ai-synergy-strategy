import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import diplomaImage from "@/assets/credentials/diploma-ai-2025.jpg";
import kaeoImage from "@/assets/credentials/certificate-kaeo-level5.png";

const credentials = [
  {
    id: 'diploma',
    image: diplomaImage,
    title: 'Диплом о профессиональной переподготовке',
    subtitle: 'Специалист по искусственному интеллекту',
    details: 'Международный Университет Цифровой Экономики и Технологий',
    year: '2025'
  },
  {
    id: 'kaeo',
    image: kaeoImage,
    title: 'Квалификационный сертификат KAEO',
    subtitle: 'Уровень 5 — максимальный',
    details: 'Постановка целей на этапе обучения нейронных сетей',
    year: '2025'
  }
];

const Credentials = () => {
  const [selectedCredential, setSelectedCredential] = useState<typeof credentials[0] | null>(null);
  
  const {
    ref,
    getStaggeredClass
  } = useMobileAnimations({
    threshold: 0.1
  });

  return (
    <section id="qualifications" ref={ref} className="py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className={`section-title text-center mb-8 ${getStaggeredClass(0, 'animate-fade-in-up')}`}>
          Профессиональное <span className="font-semibold">подтверждение</span>
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {credentials.map((credential, index) => (
            <button
              key={credential.id}
              onClick={() => setSelectedCredential(credential)}
              className={`group bg-card rounded-xl shadow-soft border border-border p-4 text-left transition-all duration-300 hover:shadow-card hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/50 ${getStaggeredClass(index + 1, 'animate-fade-in-up')}`}
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
      </div>

      {/* Modal for zoomed view */}
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
    </section>
  );
};

export default Credentials;
