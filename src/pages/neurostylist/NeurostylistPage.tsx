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
            "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(295 38% 20%) 0%, hsl(295 35% 13%) 45%, hsl(300 22% 7%) 100%)",
          color: "#F7EDE3",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        {/* Soft background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full opacity-30 blur-[150px]"
          style={{ background: "#F3C7A5" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[38%] -left-40 w-[520px] h-[520px] rounded-full opacity-22 blur-[150px]"
          style={{ background: "#9B6CFF" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-1/4 w-[460px] h-[460px] rounded-full opacity-15 blur-[150px]"
          style={{ background: "#FFE9D2" }}
        />
        {/* Hero center glow — soft plum + rose-gold halo behind hero block */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[12%] w-[820px] h-[520px] rounded-full opacity-35 blur-[160px]"
          style={{
            background:
              "radial-gradient(ellipse at center, #F3C7A5 0%, rgba(155,108,255,0.5) 55%, transparent 75%)",
          }}
        />

        <div className="relative z-10">
          {/* Tiny header */}
          <header className="px-6 sm:px-10 py-6 flex items-center justify-between">
            <div className="text-sm tracking-[0.25em] uppercase" style={{ color: "rgba(247,237,227,0.72)" }}>
              НейроСтилист
            </div>
            <Link
              to="/"
              className="text-xs sm:text-sm hover:opacity-100 transition-opacity"
              style={{ color: "rgba(247,237,227,0.55)" }}
            >
              aleksamois.ru
            </Link>
          </header>

          {/* Hero */}
          <section className="px-6 sm:px-10 pt-10 sm:pt-16 pb-10 sm:pb-14">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="font-serif leading-[1.05] tracking-tight text-[40px] sm:text-6xl md:text-7xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#F7EDE3" }}
              >
                <span style={{ color: "#F7EDE3" }}>Собери образ,</span>
                <br />
                <span style={{ color: "#F3C7A5" }}>в котором ты узнаешь себя</span>
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(90deg, #F3C7A5 0%, #9B6CFF 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  сильнее.
                </span>
              </h1>
              <p
                className="mt-7 mx-auto"
                style={{
                  color: "rgba(247,237,227,0.72)",
                  fontSize: "clamp(16px, 1.6vw, 20px)",
                  lineHeight: 1.6,
                  maxWidth: 660,
                }}
              >
                Стиль-диагностика собирает твой образ по внешности, характеру, ритму жизни,
                цветам, силуэтам, макияжу и деталям.
              </p>

              <div className="mt-10 sm:mt-12">
                <CTAButton onClick={openQuiz}>Собрать для меня образ</CTAButton>
                <p
                  style={{
                    marginTop: 15,
                    fontSize: 13.5,
                    color: "rgba(247,237,227,0.48)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Заполнить анкету
                </p>
              </div>
            </div>
          </section>

          {/* What gets gathered */}
          <section className="px-6 sm:px-10 pt-6 sm:pt-10 pb-16 sm:pb-24">
            <div className="max-w-5xl mx-auto">
              <h2
                className="font-serif text-center text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#F7EDE3" }}
              >
                Образ складывается из деталей.
              </h2>

              <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
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
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#F7EDE3" }}
              >
                <span style={{ color: "#F7EDE3" }}>Ты отвечаешь на вопросы,</span>
                <br />
                <span style={{ color: "#F3C7A5" }}>а образ начинает складываться.</span>
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
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#F7EDE3" }}
              >
                Твой образ уже можно собрать.
              </h2>
              <div className="mt-10">
                <CTAButton onClick={openQuiz}>Собрать для меня образ</CTAButton>
                <p
                  style={{
                    marginTop: 15,
                    fontSize: 13.5,
                    color: "rgba(247,237,227,0.48)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Заполнить анкету
                </p>
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