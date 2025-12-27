import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";

// Импорт скриншотов отзывов
import reviewNeurotech from "@/assets/reviews/review-neurotech.jpg";
import reviewKirill from "@/assets/reviews/review-kirill.jpg";
import reviewGeneralGroup from "@/assets/reviews/review-general-group.jpg";
import reviewElena from "@/assets/reviews/review-elena.jpg";
import reviewOlgaElena from "@/assets/reviews/review-olga-elena.jpg";
import reviewElenaMarina from "@/assets/reviews/review-elena-marina.jpg";
import reviewNatalya from "@/assets/reviews/review-natalya.jpg";
import reviewFamilyUnion from "@/assets/reviews/review-family-union.jpg";
import reviewAnastasia from "@/assets/reviews/review-anastasia.jpg";
import reviewSalesGroup from "@/assets/reviews/review-sales-group.jpg";
import reviewPraktika1 from "@/assets/reviews/review-praktika-1.jpg";
import reviewPraktika2 from "@/assets/reviews/review-praktika-2.jpg";
import reviewPraktika3 from "@/assets/reviews/review-praktika-3.jpg";
import reviewPraktika4 from "@/assets/reviews/review-praktika-4.jpg";
import reviewGeneralOlga from "@/assets/reviews/review-general-olga.jpg";
import reviewGeneralTati from "@/assets/reviews/review-general-tati.jpg";
import reviewChatSmm from "@/assets/reviews/review-chat-smm.jpg";
import reviewChatDosug from "@/assets/reviews/review-chat-dosug.jpg";
import reviewChatProgress from "@/assets/reviews/review-chat-progress.jpg";
import reviewYuliyaBot from "@/assets/reviews/review-yuliya-bot.jpg";
// Письма и дипломы
import reviewSistemExpert from "@/assets/reviews/review-sistem-expert.png";
import review7NeboFestival from "@/assets/reviews/review-7nebo-festival.png";
import reviewAltPozhara from "@/assets/reviews/review-alt-pozhara.png";
import reviewTehrang from "@/assets/reviews/review-tehrang.png";
import reviewAntiterrorDiploma from "@/assets/reviews/review-antiterror-diploma.png";
import reviewKritbi from "@/assets/reviews/review-kritbi.png";

// Типы отзывов по визуальному виду
type ReviewType = "telegram-dark" | "telegram-light" | "letter" | "diploma";

interface Review {
  id: string;
  image: string;
  type: ReviewType;
  alt: string;
}

// Массив отзывов с типами
const reviews: Review[] = [
  // Telegram тёмная тема
  { id: "1", image: reviewNeurotech, type: "telegram-dark", alt: "Благодарность от NeuroTech Russia 2025" },
  { id: "2", image: reviewKirill, type: "telegram-dark", alt: "Отзыв Кирилла о практическом применении ИИ" },
  { id: "3", image: reviewGeneralGroup, type: "telegram-dark", alt: "Отзывы из группы General" },
  { id: "9", image: reviewAnastasia, type: "telegram-dark", alt: "Отзыв Анастасии об автоматизации" },
  { id: "10", image: reviewSalesGroup, type: "telegram-dark", alt: "Отзывы из группы Продажи" },
  { id: "11", image: reviewPraktika1, type: "telegram-dark", alt: "Чат практики — благодарности от участников" },
  { id: "12", image: reviewPraktika2, type: "telegram-dark", alt: "Чат практики — отзыв Алёны Рябцевой" },
  { id: "13", image: reviewPraktika3, type: "telegram-dark", alt: "Чат практики — отзывы Максима и Сергея" },
  { id: "14", image: reviewPraktika4, type: "telegram-dark", alt: "Чат практики — Dragon Born благодарность" },
  { id: "15", image: reviewGeneralOlga, type: "telegram-dark", alt: "General — отзывы Ольги, Артёма, Лидии, Михаила" },
  { id: "16", image: reviewGeneralTati, type: "telegram-dark", alt: "General — отзыв TaTi об ОГРОМНОЙ пользе" },
  { id: "20", image: reviewYuliyaBot, type: "telegram-dark", alt: "Отзыв Юлии о боте для постов" },
  
  // Telegram светлая тема
  { id: "4", image: reviewElena, type: "telegram-light", alt: "Отзыв Елены о семинаре" },
  { id: "5", image: reviewOlgaElena, type: "telegram-light", alt: "Отзывы от Ольги Плотниковой и Elena Kopytova" },
  { id: "6", image: reviewElenaMarina, type: "telegram-light", alt: "Отзывы с мероприятия" },
  { id: "7", image: reviewNatalya, type: "telegram-light", alt: "Отзыв Натальи Черкашиной" },
  { id: "8", image: reviewFamilyUnion, type: "telegram-light", alt: "Благодарность от Союза семей России" },
  { id: "17", image: reviewChatSmm, type: "telegram-light", alt: "Чат для общения — SMM помощник" },
  { id: "18", image: reviewChatDosug, type: "telegram-light", alt: "Чат для общения — генерация картинок" },
  { id: "19", image: reviewChatProgress, type: "telegram-light", alt: "Чат для общения — вот он прогресс" },
  
  // Благодарственные письма
  { id: "21", image: reviewSistemExpert, type: "letter", alt: "Письмо поддержки от ООО Систем Эксперт" },
  { id: "22", image: review7NeboFestival, type: "letter", alt: "Благодарность от фестиваля 7НЕБО" },
  { id: "23", image: reviewAltPozhara, type: "letter", alt: "Письмо поддержки от ООО Альт" },
  { id: "24", image: reviewTehrang, type: "letter", alt: "Письмо поддержки от ООО Техранг" },
  
  // Дипломы и сертификаты
  { id: "25", image: reviewAntiterrorDiploma, type: "diploma", alt: "Диплом форума Антитеррор 2024" },
  { id: "26", image: reviewKritbi, type: "diploma", alt: "Резидент бизнес-инкубатора КРИТБИ" },
];

// Функция умного перемешивания: чередует типы, чтобы соседние карточки были разными
function shuffleReviewsByType(reviews: Review[]): Review[] {
  const byType: Record<ReviewType, Review[]> = {
    "telegram-dark": [],
    "telegram-light": [],
    "letter": [],
    "diploma": [],
  };
  
  // Группируем по типам
  reviews.forEach(review => {
    byType[review.type].push(review);
  });
  
  // Перемешиваем внутри каждой группы
  Object.keys(byType).forEach(key => {
    byType[key as ReviewType].sort(() => Math.random() - 0.5);
  });
  
  const result: Review[] = [];
  const types: ReviewType[] = ["telegram-dark", "letter", "telegram-light", "diploma"];
  let typeIndex = 0;
  let attempts = 0;
  const maxAttempts = reviews.length * 4;
  
  while (result.length < reviews.length && attempts < maxAttempts) {
    const type = types[typeIndex % types.length];
    if (byType[type].length > 0) {
      result.push(byType[type].shift()!);
    }
    typeIndex++;
    attempts++;
  }
  
  // Добавляем оставшиеся, если есть
  Object.values(byType).forEach(arr => {
    result.push(...arr);
  });
  
  return result;
}

const Testimonials = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [shuffledReviews] = useState(() => shuffleReviewsByType(reviews));
  
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  // Schema.org structured data for reviews
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Александра Моисеева — Независимый инженер по ИИ",
    "description": "Консалтинг и внедрение ИИ-решений для бизнеса",
    "url": "https://aleksamois.ru",
    "image": "https://aleksamois.ru/og-image.png",
    "telephone": "+7 993 721 73 67",
    "email": "neiroreshenia@yandex.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Красноярск",
      "addressCountry": "RU"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": reviews.length.toString(),
      "reviewCount": reviews.length.toString()
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Organization", "name": "NeuroTech Russia" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Благодарность за вклад в развитие нейротехнологий в России"
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Кирилл" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Практическое применение ИИ — отличные результаты"
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Елена" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Семинар превзошёл ожидания, много практики"
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Наталья Черкашина" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Профессиональный подход к автоматизации бизнес-процессов"
      },
      {
        "@type": "Review",
        "author": { "@type": "Organization", "name": "Союз семей России" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Благодарим за помощь во внедрении ИИ-решений"
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Анастасия" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Автоматизация работает отлично, экономит время"
      }
    ]
  };

  // Если отзывов нет, показываем заглушку
  if (reviews.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-secondary" id="testimonials">
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(reviewSchema)}
          </script>
        </Helmet>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Что говорят <span className="font-semibold">клиенты</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Скриншоты реальных отзывов из Telegram и Яндекс.Карт
            </p>
          </div>
          
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center p-8 bg-card rounded-lg border border-border shadow-soft">
              <X className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
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
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      </Helmet>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Что говорят <span className="font-semibold">клиенты</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Скриншоты реальных отзывов из Telegram и Яндекс.Карт
          </p>
        </div>

        {/* Carousel with navigation */}
        <div className="relative px-12 md:px-16">
          {/* Left arrow */}
          <button
            onClick={() => api?.scrollPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-soft flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            aria-label="Предыдущий отзыв"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => api?.scrollNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-soft flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            aria-label="Следующий отзыв"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <Carousel
            opts={{
              loop: true,
              align: "start",
              dragFree: true,
              containScroll: "trimSnaps",
              duration: 30,
              skipSnaps: false,
            }}
            plugins={[autoplayPlugin.current]}
            setApi={setApi}
            className="w-full touch-pan-y"
          >
            <CarouselContent className="-ml-4 cursor-grab active:cursor-grabbing">
              {shuffledReviews.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4"
                >
                  <div
                    className="relative group cursor-pointer w-full h-64 md:h-72 transition-all duration-300 hover:scale-105 active:scale-95 hover:z-10 select-none"
                    onClick={() => setSelectedImage(review.image)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(review.image)}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-xl bg-card shadow-soft transition-all duration-300 group-hover:shadow-elevated group-active:shadow-soft">
                      <img
                        src={review.image}
                        alt={review.alt}
                        className="w-full h-full object-cover object-top grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-active:grayscale-0 group-active:opacity-100 pointer-events-none"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* Modal for full-size view */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-lg w-auto p-0 bg-transparent border-none shadow-none [&>button]:hidden data-[state=open]:animate-fade-in data-[state=open]:duration-200">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-10 right-0 z-50 p-2 rounded-full bg-card/90 backdrop-blur-sm shadow-soft hover:bg-card transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Отзыв в полном размере"
              className="max-h-[75vh] w-auto rounded-2xl shadow-elevated animate-scale-in"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Testimonials;
