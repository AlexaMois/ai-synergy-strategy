import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navigation from '@/components/Navigation';
import NeuralTree from '@/components/newyear/NeuralTree';
import Snowfall from '@/components/newyear/Snowfall';
import GiftCard from '@/components/newyear/GiftCard';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const gifts = [
  {
    name: 'ИИ-Олег',
    description: 'Самопрезентация на максималках',
    url: 'https://chatgpt.com/g/g-67c57fc2efa08191a12afb92d5be172c-ii-oleg-samoprezentatsiia-na-maksimalkakh',
  },
  {
    name: 'ИИ-Вася',
    description: 'Пиши / Сокращай',
    url: 'https://chatgpt.com/g/g-676432d60cb08191ab7710b67eb5a849-ii-vasia-pishi-sokrashchai',
  },
  {
    name: 'ИИ-Крис',
    description: 'Креативный директор',
    url: 'https://chatgpt.com/g/g-hpTLTyhiG-ii-kris-kreativnyi-direktor',
  },
];

const NewYearGreeting: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>С Новым 2026 годом! — Александра Моисеева</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navigation />

      <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden pt-20">
        {/* Snowflakes only on this section */}
        <Snowfall />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
        
        <div className="container max-w-6xl mx-auto px-6 py-8 lg:py-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            
            {/* Left - Neural Tree */}
            <div className="flex-shrink-0 animate-fade-in-up">
              <NeuralTree />
            </div>

            {/* Right - Text + Cards */}
            <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              {/* Greeting header */}
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl text-foreground font-medium">
                  С наступающим Новым годом,
                </p>
                <p className="text-handwriting text-primary">
                  дорогие коллеги, партнёры и единомышленники
                </p>
              </div>

              {/* Letter body card */}
              <div className="bg-secondary/50 rounded-xl shadow-soft p-6 sm:p-8 max-w-[720px] mx-auto lg:mx-0">
                <div className="space-y-4 text-foreground/90 text-base lg:text-lg leading-relaxed font-raleway">
                  {/* Block 1 - Year reflection and gratitude */}
                  <div className="space-y-3">
                    <p>
                      Этот год был разным. Но в нём точно было много смыслов, решений и разговоров.
                    </p>
                    <p>
                      Спасибо вам за диалоги, совместную работу, интерес и доверие.
                      Я искренне ценю каждого — и тех, с кем мы уже сотрудничаем, и тех, с кем только начинаем путь в 2026 году.
                    </p>
                  </div>

                  {/* Block 2 - Greeting and gift with left accent */}
                  <div className="space-y-3 border-l-2 border-primary/30 pl-4 mt-5">
                    <p>
                      От всего сердца поздравляю вас с наступающим <strong className="text-foreground">2026 годом</strong>.
                      Пусть новый год принесёт гармонию и ясность, уверенность в решениях и радость от того, что вы делаете.
                    </p>
                    <p>
                      В знак моей благодарности я подготовила небольшой новогодний жест — <strong className="text-foreground">AI-ассистенты</strong>, которых я использую и создаю сама. Вы можете забрать любой из них или сразу все три.
                    </p>
                  </div>
                </div>
              </div>

              {/* Signature */}
              <div className="pt-2">
                <p className="text-handwriting text-xl text-primary/80">
                  С теплом и признательностью,
                </p>
                <p className="font-medium text-foreground mt-1">
                  Александра Моисеева
                </p>
              </div>

              {/* Divider with VPN note */}
              <div className="pt-2">
                <div className="h-px bg-border" />
                <p className="text-muted-foreground text-sm mt-3">
                  Все агенты работают в ChatGPT. Пожалуйста, включите VPN — доступно даже в бесплатной версии.
                </p>
              </div>

              {/* Gift Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2" style={{ animationDelay: '0.3s' }}>
                {gifts.map((gift) => (
                  <GiftCard key={gift.name} {...gift} />
                ))}
              </div>

              {/* Back to home link */}
              <div className="pt-4 flex justify-center lg:justify-start">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Home className="w-4 h-4" />
                  <span>На главную</span>
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <Partners />
      <Contact />
      <Footer />
    </>
  );
};

export default NewYearGreeting;
