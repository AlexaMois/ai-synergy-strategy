import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Palette, Shirt, Sparkles, Scissors, Gem, Heart } from "lucide-react";
import StylistQuiz from "./StylistQuiz";

const NeurostylistPage = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  const openQuiz = () => setQuizOpen(true);

  return (
    <>
      <Helmet>
        <title>НейроСтилист — собери образ, в котором узнаешь себя сильнее</title>
        <meta
          name="description"
          content="Стиль-диагностика собирает твой образ по внешности, характеру, ритму жизни, цветам, силуэтам, макияжу и деталям."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aleksamois.ru/neurostylist" />
        <meta property="og:title" content="НейроСтилист — собери образ, в котором узнаешь себя сильнее" />
        <meta
          property="og:description"
          content="Стиль-диагностика собирает твой образ по внешности, характеру, ритму жизни, цветам, силуэтам, макияжу и деталям."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aleksamois.ru/neurostylist" />
      </Helmet>

      <div
        className="relative min-h-screen overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at top, hsl(290 30% 18%) 0%, hsl(295 35% 12%) 45%, hsl(300 20% 8%) 100%)",
          color: "hsl(40 30% 95%)",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        {/* Soft background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-25 blur-[140px]"
          style={{ background: "hsl(20 60% 75%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[40%] -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-[140px]"
          style={{ background: "hsl(270 40% 65%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full opacity-15 blur-[140px]"
          style={{ background: "hsl(45 60% 88%)" }}
        />

        <div className="relative z-10">
          {/* Tiny header */}
          <header className="px-6 sm:px-10 py-6 flex items-center justify-between">
            <div className="text-sm tracking-[0.25em] uppercase opacity-70">НейроСтилист</div>
            <Link
              to="/"
              className="text-xs sm:text-sm opacity-60 hover:opacity-100 transition-opacity"
            >
              aleksamois.ru
            </Link>
          </header>

          {/* Hero */}
          <section className="px-6 sm:px-10 pt-10 sm:pt-20 pb-16 sm:pb-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="font-serif leading-[1.05] tracking-tight text-[40px] sm:text-6xl md:text-7xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Собери образ,<br />
                <span style={{ color: "hsl(20 60% 75%)" }}>в котором ты узнаешь себя</span>
                <br />
                сильнее.
              </h1>
              <p className="mt-7 text-base sm:text-lg md:text-xl opacity-75 leading-relaxed max-w-2xl mx-auto">
                Стиль-диагностика собирает твой образ по внешности, характеру, ритму жизни,
                цветам, силуэтам, макияжу и деталям.
              </p>

              <div className="mt-12">
                <CTAButton onClick={openQuiz}>Собрать для меня образ</CTAButton>
                <p className="mt-4 text-sm opacity-60">Заполнить анкету</p>
              </div>
            </div>
          </section>

          {/* What gets gathered */}
          <section className="px-6 sm:px-10 py-16 sm:py-24">
            <div className="max-w-5xl mx-auto">
              <h2
                className="font-serif text-center text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Образ складывается из деталей.
              </h2>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                <DetailCard icon={Palette} title="Цвета" description="Палитра, в которой ты звучишь чище всего." />
                <DetailCard icon={Shirt} title="Силуэты" description="Линии, которые подчёркивают тебя." />
                <DetailCard icon={Sparkles} title="Макияж" description="Акценты, которые работают на образ." />
                <DetailCard icon={Scissors} title="Укладка" description="Форма волос как часть характера." />
                <DetailCard icon={Gem} title="Аксессуары" description="Детали, которые завершают." />
                <DetailCard icon={Heart} title="Настроение образа" description="Ощущение, которое ты транслируешь." />
              </div>
            </div>
          </section>

          {/* How it goes */}
          <section className="px-6 sm:px-10 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto">
              <h2
                className="font-serif text-center text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Ты отвечаешь на вопросы,<br />
                <span style={{ color: "hsl(20 60% 75%)" }}>а образ начинает складываться.</span>
              </h2>

              <ol className="mt-12 space-y-5">
                <Step n={1}>Выбираешь настроение образа.</Step>
                <Step n={2}>Добавляешь данные о внешности и гардеробе.</Step>
                <Step n={3}>Отмечаешь цвета, силуэты и детали.</Step>
                <Step n={4}>Отправляешь ответы.</Step>
                <Step n={5}>Получаешь персональный разбор от Александры.</Step>
              </ol>
            </div>
          </section>

          {/* Repeat CTA */}
          <section className="px-6 sm:px-10 py-20 sm:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Твой образ уже можно собрать.
              </h2>
              <div className="mt-10">
                <CTAButton onClick={openQuiz}>Собрать для меня образ</CTAButton>
                <p className="mt-4 text-sm opacity-60">Заполнить анкету</p>
              </div>
            </div>
          </section>

          {/* Mini footer */}
          <footer className="px-6 sm:px-10 py-8 border-t border-white/10">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-60">
              <div>© {new Date().getFullYear()} НейроСтилист</div>
              <div className="flex items-center gap-5">
                <Link to="/legal/privacy-policy" className="hover:opacity-100 transition-opacity">
                  Политика конфиденциальности
                </Link>
                <Link to="/legal/consent" className="hover:opacity-100 transition-opacity">
                  Согласие
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {quizOpen && <StylistQuiz onClose={() => setQuizOpen(false)} />}
    </>
  );
};

// ===== Helpers =====

const CTAButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold transition-all duration-500 hover:scale-[1.03] hover:-translate-y-0.5"
    style={{
      background: "linear-gradient(135deg, hsl(20 60% 75%), hsl(45 60% 88%))",
      color: "hsl(300 20% 8%)",
      boxShadow: "0 0 50px hsl(20 60% 75% / 0.45), 0 8px 30px hsl(300 20% 8% / 0.4)",
    }}
  >
    {children}
  </button>
);

const DetailCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
}) => (
  <div
    className="rounded-3xl p-6 sm:p-7 border transition-all duration-500 hover:-translate-y-1"
    style={{
      background: "hsl(0 0% 100% / 0.04)",
      borderColor: "hsl(0 0% 100% / 0.1)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      boxShadow: "0 8px 40px hsl(300 20% 8% / 0.4)",
    }}
  >
    <div
      className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
      style={{
        background: "hsl(20 60% 75% / 0.15)",
        border: "1px solid hsl(20 60% 75% / 0.3)",
      }}
    >
      <Icon className="w-5 h-5" style={{ color: "hsl(20 60% 75%)" }} />
    </div>
    <h3 className="text-lg font-semibold tracking-tight" style={{ color: "hsl(45 60% 88%)" }}>
      {title}
    </h3>
    <p className="mt-2 text-sm opacity-70 leading-relaxed">{description}</p>
  </div>
);

const Step = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <li
    className="flex items-start gap-4 sm:gap-5 rounded-2xl px-5 sm:px-6 py-4 sm:py-5 border"
    style={{
      background: "hsl(0 0% 100% / 0.03)",
      borderColor: "hsl(0 0% 100% / 0.08)",
      backdropFilter: "blur(10px)",
    }}
  >
    <span
      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
      style={{
        background: "linear-gradient(135deg, hsl(20 60% 75%), hsl(45 60% 88%))",
        color: "hsl(300 20% 8%)",
        boxShadow: "0 0 18px hsl(20 60% 75% / 0.4)",
      }}
    >
      {n}
    </span>
    <span className="pt-1.5 text-base sm:text-lg leading-relaxed">{children}</span>
  </li>
);

export default NeurostylistPage;