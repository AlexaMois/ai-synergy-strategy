import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X, MessageCircle, MapPin } from "lucide-react";

// Типы источников отзывов
type ReviewSource = "telegram" | "yandex";

interface Review {
  id: string;
  image: string;
  source: ReviewSource;
  alt: string;
}

// Пустой массив - скриншоты будут добавлены после загрузки пользователем
const reviews: Review[] = [];

const SourceBadge = ({ source }: { source: ReviewSource }) => {
  if (source === "telegram") {
    return (
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#2AABEE] text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full shadow-soft">
        <MessageCircle className="w-3.5 h-3.5" />
        <span>Telegram</span>
      </div>
    );
  }
  return (
    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#FC3F1D] text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full shadow-soft">
      <MapPin className="w-3.5 h-3.5" />
      <span>Яндекс</span>
    </div>
  );
};

const Testimonials = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { ref, isMobile } = useMobileAnimations();

  // Если отзывов нет, показываем заглушку
  if (reviews.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-secondary" id="testimonials">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Что говорят клиенты</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Скриншоты реальных отзывов из Telegram и Яндекс.Карт
            </p>
          </div>
          
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center p-8 bg-card rounded-lg border border-border shadow-soft">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Загрузите скриншоты отзывов через чат
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-secondary" id="testimonials">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Что говорят клиенты</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Скриншоты реальных отзывов из Telegram и Яндекс.Карт
          </p>
        </div>

        {/* Mobile: Carousel */}
        <div className="block lg:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem
                  key={review.id}
                  className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2"
                >
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedImage(review.image)}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-card shadow-soft hover-lift-card transition-all duration-300">
                      <SourceBadge source={review.source} />
                      <img
                        src={review.image}
                        alt={review.alt}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="relative group cursor-pointer animate-fade-in"
              onClick={() => setSelectedImage(review.image)}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-card shadow-soft hover-lift-card transition-all duration-300">
                <SourceBadge source={review.source} />
                <img
                  src={review.image}
                  alt={review.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full-size view */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-transparent border-none shadow-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-12 right-0 md:top-2 md:right-2 z-50 p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-soft hover:bg-card transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Отзыв в полном размере"
              className="w-full h-auto rounded-2xl shadow-elevated"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Testimonials;
