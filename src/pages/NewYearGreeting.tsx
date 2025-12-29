import React from 'react';
import { Helmet } from 'react-helmet';
import NeuralTree from '@/components/newyear/NeuralTree';
import Snowfall from '@/components/newyear/Snowfall';
import GiftCard from '@/components/newyear/GiftCard';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import Partners from '@/components/Partners';
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
      
      <main className="bg-[#FAFAFA] min-h-screen">
        <Snowfall />

        {/* Main Content Card */}
        <div className="relative z-10 container mx-auto px-4 pt-28 sm:pt-32 pb-16">
          <div className="bg-white rounded-3xl shadow-card p-6 sm:p-10 lg:p-14 max-w-5xl mx-auto">
            
            {/* Two-column layout: Tree left, Text right */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
              
              {/* Neural Tree - Left */}
              <div className="flex-shrink-0 order-1 lg:order-none">
                <NeuralTree />
              </div>

              {/* Text Content - Right */}
              <div className="flex-1 text-center lg:text-left space-y-6">
                <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-medium leading-snug text-[#2A2D31]">
                  С наступающим Новым годом,
                  <br />
                  <span className="text-[#78C5E8]">дорогие коллеги</span>
                </h1>

                <div className="space-y-4 text-[#2A2D31]/80 text-base leading-relaxed">
                  <p>
                    Этот год был разным.
                    <br />
                    Но в нём точно было много смыслов, решений и разговоров.
                  </p>

                  <p>
                    Спасибо вам за диалоги, совместную работу, интерес и доверие.
                    Я искренне ценю каждого, и тех, с кем мы уже сотрудничаем, и тех, с кем только начинаем путь в 2026 году.
                  </p>

                  <p>
                    От всего сердца поздравляю вас с наступающим 2026 годом.
                    Пусть новый год принесёт гармонию и ясность, уверенность в решениях и радости от того, что вы делаете.
                    Пусть рядом будут надёжные люди, интересные задачи и ощущение, что всё движется в правильную сторону.
                  </p>

                  <p>
                    В знак моей благодарности я подготовила небольшой новогодний жест.
                    Ниже вы найдёте AI-ассистентов, которых я использую и создаю сама.
                  </p>

                  <p className="text-[#2A2D31] font-medium">
                    Вы можете забрать любой из них или сразу все три.
                  </p>
                </div>

                <p className="text-[#2A2D31]/60 italic text-sm">
                  С теплом и признательностью,
                  <br />
                  <span className="text-[#2A2D31] not-italic font-medium">Александра Моисеева</span>
                </p>
              </div>
            </div>

            {/* Divider with VPN note */}
            <div className="my-10 sm:my-12">
              <div className="h-px bg-[#2A2D31]/10" />
              <p className="text-center text-[#2A2D31]/50 text-sm mt-5">
                Все агенты работают в чате GPT. Пожалуйста, включите VPN — доступно даже в бесплатной версии.
              </p>
            </div>

            {/* Gift Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {gifts.map((gift) => (
                <GiftCard key={gift.name} {...gift} />
              ))}
            </div>

            {/* Footer message */}
            <div className="mt-10 sm:mt-12 text-center">
              <div className="h-px bg-[#2A2D31]/10 mb-6" />
              <p className="text-[#2A2D31]/70 text-base leading-relaxed">
                Пусть следующий год будет ясным
                <br />
                и с правильными решениями.
              </p>
              <p className="text-[#2A2D31]/50 text-sm mt-3">
                С теплом, <span className="text-[#78C5E8]">Александра Моисеева</span>
              </p>
            </div>
          </div>
        </div>
        
        <Contact />
        <Partners />
      </main>
      
      <Footer />
    </>
  );
};

export default NewYearGreeting;
