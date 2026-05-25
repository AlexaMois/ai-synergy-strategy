import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useCountUp } from "@/hooks/use-count-up";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Target, TrendingUp, MessageCircle, Search } from "lucide-react";

const TrustAndPosition = () => {
  const { ref, getAnimationClass } = useMobileAnimations({ threshold: 0.2 });
  const { ref: counterRef, isVisible: counterVisible } = useIntersectionObserver({ threshold: 0.5 });
  const count12 = useCountUp({ end: 12, duration: 1800, isVisible: counterVisible });

  const trust = [
    {
      title: "Реальная польза",
      text: "Показываю, где цифровые инструменты дают измеримый эффект, а где создают лишние расходы. Смотрю на задачу через деньги, время, процессы и управляемость.",
    },
    {
      title: "Профессиональная база",
      text: "Дипломированный специалист по искусственному интеллекту, член ОПОРА России, резидент IT Park Казань, резидент КРИТБИ.",
    },
    {
      title: "Проверенная эффективность",
      text: "Ключевая метрика моей работы — сумма ненужных расходов, которых удалось избежать клиентам.",
    },
  ];

  const position = [
    { Icon: Target, title: "ИИ — инструмент управления", text: "ИИ усиливает процессы, помогает быстрее работать с данными, документами и решениями, когда у компании есть понятная задача и ответственность за результат." },
    { Icon: TrendingUp, title: "Инженерный подход", text: "Сначала задача, аудит, архитектура и экономика. Затем технологии, внедрение и конкретные решения под рабочие процессы компании." },
    { Icon: MessageCircle, title: "Честность решения", text: "Я прямо показываю, где инструмент даст пользу, где нужна подготовка процессов, а где выгоднее начать с аудита, стратегии или обучения команды. Мой приоритет — польза для процессов компании." },
    { Icon: Search, title: "Индивидуальность решений", text: "Подбираю решения под контекст компании: отрасль, команду, процессы, данные, бюджет, сроки и реальную готовность к изменениям." },
  ];

  return (
    <section ref={ref} className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 ${getAnimationClass(
          "animate-fade-in-up",
          "animate-mobile-slide-up"
        )}`}
      >
        {/* ЛЕВАЯ ПЛАШКА — тёмная с гигантским 12+ */}
        <div className="lg:col-span-7 rounded-[32px] md:rounded-[40px] bg-foreground text-background overflow-hidden shadow-plate ring-1 ring-foreground/5 p-8 md:p-12 lg:p-14 flex flex-col">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-5">
            Почему мне доверяют
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-background leading-[1.05] mb-10">
            Реальный опыт{" "}
            <span className="font-iriska font-normal italic text-accent">и честная позиция</span>
          </h2>

          {/* Hero-metric */}
          <div ref={counterRef as any} className="grid md:grid-cols-12 gap-6 items-end mb-10 pb-10 border-b border-background/15">
            <div className="md:col-span-5">
              <div className="font-iriska font-bold text-accent leading-none text-[7rem] md:text-[10rem]">
                {count12}<span className="text-5xl md:text-7xl align-top">+</span>
              </div>
            </div>
            <div className="md:col-span-7">
              <p className="text-xl md:text-2xl font-semibold text-background leading-snug mb-2">
                лет в управлении и операционной работе
              </p>
              <p className="text-sm md:text-base text-background/70 leading-relaxed">
                Понимаю ответственность руководителя, цену ошибки, работу команды, давление сроков и влияние решений на экономику компании.
              </p>
            </div>
          </div>

          {/* Три мини-блока в столбик с разделителями */}
          <div className="divide-y divide-background/15">
            {trust.map((t, i) => (
              <div key={t.title} className="grid md:grid-cols-12 gap-4 py-5 first:pt-0">
                <div className="md:col-span-1 font-iriska text-3xl md:text-4xl font-bold text-accent tabular-nums leading-none">
                  0{i + 2}
                </div>
                <div className="md:col-span-4">
                  <p className="text-base md:text-lg font-semibold text-background leading-snug">
                    {t.title}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <p className="text-sm md:text-base text-background/75 leading-relaxed">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ПРАВАЯ ПЛАШКА — светлая лавандовая, 4 принципа */}
        <div className="lg:col-span-5 rounded-[32px] md:rounded-[40px] bg-surface-lavender overflow-hidden shadow-plate ring-1 ring-foreground/5 p-8 md:p-12 flex flex-col">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-5">
            Моя позиция
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-8">
            Честный{" "}
            <span className="font-iriska font-normal italic text-accent">подход</span>
          </h2>

          <div className="space-y-3 flex-1">
            {position.map((p) => (
              <div
                key={p.title}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-background/55 backdrop-blur-md ring-1 ring-foreground/5 hover:bg-background hover:shadow-card transition-all duration-300"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-accent text-white shadow-sm">
                  <p.Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-base md:text-lg font-semibold text-foreground leading-snug mb-1">
                    {p.title}
                  </p>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustAndPosition;
