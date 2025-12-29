import React from 'react';
import { Helmet } from 'react-helmet';
import NeuralTree from '@/components/newyear/NeuralTree';
import Snowfall from '@/components/newyear/Snowfall';
import GiftCard from '@/components/newyear/GiftCard';

const gifts = [
  {
    name: 'ИИ-Олег',
    description: 'Самопрезентация на максималках',
    url: 'https://chatgpt.com/g/g-67c57fc2efa08191a12afb92d5be172c-ii-oleg-samoprezentatsiia-na-maksimalkakh',
    emoji: '🎯',
  },
  {
    name: 'ИИ-Вася',
    description: 'Пиши / Сокращай',
    url: 'https://chatgpt.com/g/g-676432d60cb08191ab7710b67eb5a849-ii-vasia-pishi-sokrashchai',
    emoji: '✍️',
  },
  {
    name: 'ИИ-Крис',
    description: 'Креативный директор',
    url: 'https://chatgpt.com/g/g-hpTLTyhiG-ii-kris-kreativnyi-direktor',
    emoji: '🎨',
  },
];

const NewYearGreeting: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>С Новым 2026 годом! — Александра Моисеева</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f1d32] to-[#1a2744] text-white overflow-hidden">
        <Snowfall />

        <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          {/* Neural Tree */}
          <div className="mb-10 sm:mb-14">
            <NeuralTree />
          </div>

          {/* Main Greeting */}
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed">
              С наступающим Новым годом,
              <br />
              <span className="text-[#49BED8]">дорогие коллеги</span>
            </h1>

            <div className="space-y-6 text-white/80 text-base sm:text-lg leading-relaxed">
              <p>
                Этот год был разным.
                <br />
                Но в нём точно было много смыслов, решений и разговоров.
              </p>

              <p>
                Спасибо вам за диалоги, совместную работу, интерес и доверие.
                <br />
                Я искренне ценю каждого, и тех, с кем мы уже сотрудничаем, и тех, с кем только начинаем путь в 2026 году.
              </p>

              <p>
                От всего сердца поздравляю вас с наступающим 2026 годом.
                <br />
                Пусть новый год принесёт гармонию и ясность, уверенность в решениях и радости от того, что вы делаете.
                <br />
                Пусть рядом будут надёжные люди, интересные задачи и ощущение, что всё движется в правильную сторону.
              </p>

              <p>
                В знак моей благодарности я подготовила небольшой новогодний жест.
                <br />
                Ниже вы найдёте AI-ассистентов, которых я использую и создаю сама.
              </p>

              <p className="text-white font-medium">
                Вы можете забрать любой из них или сразу все три.
              </p>
            </div>

            <p className="text-white/60 italic">
              С теплом и признательностью,
              <br />
              <span className="text-white not-italic">Александра Моисеева</span>
            </p>
          </div>

          {/* Divider with note */}
          <div className="max-w-3xl mx-auto my-12 sm:my-16">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            <p className="text-center text-white/50 text-sm sm:text-base mt-6">
              Все агенты работают в чате GPT.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              Пожалуйста, включите VPN — доступно даже в бесплатной версии.
            </p>
          </div>

          {/* Gift Cards */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
            {gifts.map((gift) => (
              <GiftCard key={gift.name} {...gift} />
            ))}
          </div>

          {/* Footer */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-4">
              Пусть следующий год будет ясным
              <br />
              и с правильными решениями.
            </p>

            <p className="text-white/50">
              С теплом,
              <br />
              <span className="text-[#49BED8]">Александра Моисеева</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewYearGreeting;
