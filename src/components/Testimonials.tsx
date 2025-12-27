import { useState } from "react";
import { Helmet } from "react-helmet";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

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
// Новые отзывы
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
// Новые отзывы — письма и дипломы
import reviewSistemExpert from "@/assets/reviews/review-sistem-expert.png";
import review7NeboFestival from "@/assets/reviews/review-7nebo-festival.png";
import reviewAltPozhara from "@/assets/reviews/review-alt-pozhara.png";
import reviewTehrang from "@/assets/reviews/review-tehrang.png";
import reviewAntiterrorDiploma from "@/assets/reviews/review-antiterror-diploma.png";
import reviewKritbi from "@/assets/reviews/review-kritbi.png";

// Типы источников отзывов
type ReviewSource = "telegram" | "yandex";

interface Review {
  id: string;
  image: string;
  source: ReviewSource;
  alt: string;
}

// Массив отзывов из Telegram
const reviews: Review[] = [
  { id: "1", image: reviewNeurotech, source: "telegram", alt: "Благодарность от NeuroTech Russia 2025" },
  { id: "2", image: reviewKirill, source: "telegram", alt: "Отзыв Кирилла о практическом применении ИИ" },
  { id: "3", image: reviewGeneralGroup, source: "telegram", alt: "Отзывы из группы General" },
  { id: "4", image: reviewElena, source: "telegram", alt: "Отзыв Елены о семинаре" },
  { id: "5", image: reviewOlgaElena, source: "telegram", alt: "Отзывы от Ольги Плотниковой и Elena Kopytova" },
  { id: "6", image: reviewElenaMarina, source: "telegram", alt: "Отзывы с мероприятия" },
  { id: "7", image: reviewNatalya, source: "telegram", alt: "Отзыв Натальи Черкашиной" },
  { id: "8", image: reviewFamilyUnion, source: "telegram", alt: "Благодарность от Союза семей России" },
  { id: "9", image: reviewAnastasia, source: "telegram", alt: "Отзыв Анастасии об автоматизации" },
  { id: "10", image: reviewSalesGroup, source: "telegram", alt: "Отзывы из группы Продажи" },
  // Новые отзывы
  { id: "11", image: reviewPraktika1, source: "telegram", alt: "Чат практики — благодарности от участников" },
  { id: "12", image: reviewPraktika2, source: "telegram", alt: "Чат практики — отзыв Алёны Рябцевой" },
  { id: "13", image: reviewPraktika3, source: "telegram", alt: "Чат практики — отзывы Максима и Сергея" },
  { id: "14", image: reviewPraktika4, source: "telegram", alt: "Чат практики — Dragon Born благодарность" },
  { id: "15", image: reviewGeneralOlga, source: "telegram", alt: "General — отзывы Ольги, Артёма, Лидии, Михаила" },
  { id: "16", image: reviewGeneralTati, source: "telegram", alt: "General — отзыв TaTi об ОГРОМНОЙ пользе" },
  { id: "17", image: reviewChatSmm, source: "telegram", alt: "Чат для общения — SMM помощник" },
  { id: "18", image: reviewChatDosug, source: "telegram", alt: "Чат для общения — генерация картинок" },
  { id: "19", image: reviewChatProgress, source: "telegram", alt: "Чат для общения — вот он прогресс" },
  { id: "20", image: reviewYuliyaBot, source: "telegram", alt: "Отзыв Юлии о боте для постов" },
  // Письма поддержки и дипломы
  { id: "21", image: reviewSistemExpert, source: "telegram", alt: "Письмо поддержки от ООО Систем Эксперт" },
  { id: "22", image: review7NeboFestival, source: "telegram", alt: "Благодарность от фестиваля 7НЕБО" },
  { id: "23", image: reviewAltPozhara, source: "telegram", alt: "Письмо поддержки от ООО Альт" },
  { id: "24", image: reviewTehrang, source: "telegram", alt: "Письмо поддержки от ООО Техранг" },
  { id: "25", image: reviewAntiterrorDiploma, source: "telegram", alt: "Диплом форума Антитеррор 2024" },
  { id: "26", image: reviewKritbi, source: "telegram", alt: "Резидент бизнес-инкубатора КРИТБИ" },
];


const Testimonials = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Что говорят <span className="font-semibold">клиенты</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Скриншоты реальных отзывов из Telegram и Яндекс.Карт
          </p>
        </div>

        {/* Auto-scrolling gallery */}
        <div className="overflow-hidden -mx-4 px-4">
          <div className="flex gap-4 w-max animate-testimonials-scroll hover:[animation-play-state:paused]">
            {/* Дублируем массив для бесшовного цикла */}
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="relative group cursor-pointer flex-shrink-0 w-48 h-64 transition-all duration-300 hover:scale-110 hover:z-10"
                onClick={() => setSelectedImage(review.image)}
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-card shadow-soft transition-all duration-300 group-hover:shadow-elevated">
                  <img
                    src={review.image}
                    alt={review.alt}
                    className="w-full h-full object-cover object-top grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                    width="192"
                    height="256"
                  />
                </div>
              </div>
            ))}
          </div>
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
