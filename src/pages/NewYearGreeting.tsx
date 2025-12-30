import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navigation from '@/components/Navigation';
import NeuralTree from '@/components/newyear/NeuralTree';
import Snowfall from '@/components/newyear/Snowfall';
import Garland from '@/components/newyear/Garland';
import GiftCard from '@/components/newyear/GiftCard';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useTypewriter } from '@/hooks/use-typewriter';
const gifts = [{
  name: 'ИИ-Олег',
  description: 'Самопрезентация на максималках',
  url: 'https://chatgpt.com/g/g-67c57fc2efa08191a12afb92d5be172c-ii-oleg-samoprezentatsiia-na-maksimalkakh'
}, {
  name: 'ИИ-Вася',
  description: 'Пиши / Сокращай',
  url: 'https://chatgpt.com/g/g-676432d60cb08191ab7710b67eb5a849-ii-vasia-pishi-sokrashchai'
}, {
  name: 'ИИ-Крис',
  description: 'Креативный директор',
  url: 'https://chatgpt.com/g/g-hpTLTyhiG-ii-kris-kreativnyi-direktor'
}];
const NewYearGreeting: React.FC = () => {
  const { displayedText, isComplete } = useTypewriter({
    text: 'дорогие коллеги, партнёры и единомышленники',
    speed: 40,
    delay: 600
  });

  return <>
      <Helmet>
        <title>С Новым 2026 годом! — Александра Моисеева</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navigation />

      <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden pt-16 pb-2">
        {/* Garland at the top */}
        <Garland />
        
        {/* Snowflakes only on this section */}
        <Snowfall />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
        
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            
            {/* ЛЕВАЯ КОЛОНКА — текст */}
            <div className="text-left space-y-4 animate-fade-in-up">
              {/* Greeting header */}
              <div>
                <p className="text-xl sm:text-2xl lg:text-3xl text-foreground font-medium">
                  С наступающим Новым годом,
                </p>
                <p className="text-handwriting text-primary text-lg sm:text-xl min-h-[1.75rem]">
                  {displayedText}
                  {!isComplete && <span className="animate-blink ml-0.5">|</span>}
                </p>
              </div>

              {/* Letter body card */}
              <div 
                className="bg-secondary/60 rounded-xl shadow-card p-4 sm:p-5 backdrop-blur-sm border border-white/10 animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                <div className="space-y-2 text-foreground/90 text-sm sm:text-base leading-relaxed font-raleway">
                  {/* Block 1 - Year reflection and gratitude */}
                  <div className="space-y-1.5">
                    <p>
                      Этот год был разным. Но в нём точно было много смыслов, решений и разговоров.
                    </p>
                    <p>
                      Спасибо вам за диалоги, совместную работу, интерес и доверие. Я искренне ценю каждого — и тех, с кем мы уже сотрудничаем, и тех, с кем только начинаем путь в 2026 году.
                    </p>
                  </div>

                  {/* Block 2 - Greeting and gift with left accent */}
                  <div className="space-y-1.5 border-l-2 border-primary/30 pl-3 mt-3">
                    <p>
                      От всего сердца поздравляю вас с наступающим <strong className="text-foreground">2026 годом</strong>. Пусть новый год принесёт гармонию и ясность, уверенность в решениях и радость от того, что вы делаете.
                    </p>
                    <p>
                      В знак моей благодарности я подготовила небольшой новогодний жест — <strong className="text-foreground">AI-ассистенты</strong>, которых я использую и создаю сама. Вы можете забрать любой из них или сразу все три.
                    </p>
                  </div>
                </div>
              </div>

              {/* Signature */}
              <div className="text-sm animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <span className="text-handwriting text-primary/80">С теплом, </span>
                <span className="font-medium text-foreground">   Александра Моисеева</span>
              </div>

              {/* Back to home link */}
              <Link 
                to="/" 
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm animate-fade-in-up"
                style={{ animationDelay: '0.6s' }}
              >
                <Home className="w-3.5 h-3.5" />
                <span>На главную    </span>
              </Link>
            </div>

            {/* ПРАВАЯ КОЛОНКА — визуал */}
            <div className="flex flex-col items-center gap-4 animate-fade-in-up" style={{
            animationDelay: '0.15s'
          }}>
              <NeuralTree />
              
              {/* Gift Cards - вертикально */}
              <div className="flex flex-col gap-3 w-full max-w-[280px]">
                {gifts.map((gift, index) => (
                  <div 
                    key={gift.name}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                  >
                    <GiftCard {...gift} />
                  </div>
                ))}
              </div>
              
              <p className="text-muted-foreground text-xs text-center animate-fade-in-up" style={{ animationDelay: '0.85s' }}>
                Агенты работают в ChatGPT. Включите VPN.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      <Partners className="py-6" />
      <Contact />
      <Footer />
    </>;
};
export default NewYearGreeting;