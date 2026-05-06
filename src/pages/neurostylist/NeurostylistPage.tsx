import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Palette, Shirt, Sparkles, Scissors, Gem, Heart } from "lucide-react";
import StylistQuiz from "./StylistQuiz";
import heroImg from "@/assets/neurostylist-hero.jpg";

const NeurostylistPage = () => {
  const [quizOpen, setQuizOpen] = useState(false);
  const openQuiz = () => setQuizOpen(true);

  return (
    <>
      <Helmet>
        <title>НейроСтилист — собери образ, в котором узнаешь себя сильнее</title>
        <meta
          name="description"
          content="Стиль-диагностика собирает цвет, силуэт, макияж и детали в цельный образ под тебя."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aleksamois.ru/neurostylist" />
        <meta property="og:title" content="НейроСтилист — собери образ, в котором узнаешь себя сильнее" />
        <meta
          property="og:description"
          content="Стиль-диагностика собирает цвет, силуэт, макияж и детали в цельный образ под тебя."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aleksamois.ru/neurostylist" />
      </Helmet>

      <style>{`
        @keyframes ns-float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.05); }
        }
        @keyframes ns-float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 20px) scale(1.08); }
        }
        @keyframes ns-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ns-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ns-mirror-glow {
          0%, 100% { filter: drop-shadow(0 0 60px rgba(243,199,165,0.35)) drop-shadow(0 0 120px rgba(155,108,255,0.18)); }
          50% { filter: drop-shadow(0 0 90px rgba(243,199,165,0.5)) drop-shadow(0 0 160px rgba(155,108,255,0.28)); }
        }
        @keyframes ns-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .ns-fade-up { animation: ns-fade-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        .ns-fade-in { animation: ns-fade-in 1.2s ease-out both; }
        .ns-delay-1 { animation-delay: 0.15s; }
        .ns-delay-2 { animation-delay: 0.3s; }
        .ns-delay-3 { animation-delay: 0.45s; }
        .ns-delay-4 { animation-delay: 0.6s; }
        .ns-glow-1 { animation: ns-float-slow 14s ease-in-out infinite; }
        .ns-glow-2 { animation: ns-float-slower 18s ease-in-out infinite; }
        .ns-mirror { animation: ns-mirror-glow 6s ease-in-out infinite, ns-fade-in 1.4s ease-out both; }
        .ns-grain {
          background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.62 0 0 0 0 0.42 0 0 0 0.14 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }
        .ns-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .ns-bento-card {
          transition: transform 0.6s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.6s, border-color 0.6s;
        }
        .ns-bento-card:hover {
          transform: translateY(-6px);
          border-color: rgba(232,149,106,0.55) !important;
          box-shadow:
            inset 0 1px 0 rgba(247,237,227,0.12),
            0 1px 2px rgba(0,0,0,0.3),
            0 24px 70px rgba(232,149,106,0.25),
            0 12px 40px rgba(20,8,18,0.6) !important;
        }
        .ns-bento-card:hover .ns-bento-icon { color: #E8956A !important; }
        .ns-cta {
          background-image: linear-gradient(135deg, #FFF1DD 0%, #F5C9A0 35%, #E89A6A 70%, #F3C7A5 100%);
          background-size: 200% 100%;
          transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.5s, background-position 0.8s;
        }
        .ns-cta:hover {
          transform: translateY(-3px) scale(1.02);
          background-position: 100% 0;
          box-shadow:
            0 0 0 1px rgba(255,241,221,0.5) inset,
            0 0 80px rgba(232,154,106,0.9),
            0 0 160px rgba(232,154,106,0.45),
            0 20px 50px rgba(42,14,30,0.6);
        }
        @media (max-width: 767px) {
          .ns-hero-decor { opacity: 0.55 !important; }
        }
      `}</style>

      <div
        className="relative min-h-screen overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 75% 25%, hsl(340 35% 18%) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, hsl(270 35% 16%) 0%, transparent 65%), radial-gradient(ellipse 100% 80% at 50% 50%, hsl(310 25% 10%) 0%, hsl(300 30% 5%) 100%)",
          color: "#F7EDE3",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        {/* Layered background glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full blur-[140px] ns-glow-1"
            style={{ background: "radial-gradient(circle, #E8A87C 0%, transparent 70%)", opacity: 0.39 }}
          />
          <div
            className="absolute top-[40%] left-[-15%] w-[600px] h-[600px] rounded-full blur-[150px] ns-glow-2"
            style={{ background: "radial-gradient(ellipse, #C4785A 0%, transparent 70%)", opacity: 0.28 }}
          />
          <div
            className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] rounded-full opacity-20 blur-[140px] ns-glow-1"
            style={{ background: "radial-gradient(circle, #C77DFF 0%, transparent 70%)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(196,120,90,0.18) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[20%] left-[40%] w-[400px] h-[400px] rounded-full opacity-15 blur-[120px]"
            style={{ background: "radial-gradient(circle, #FFE9D2 0%, transparent 70%)" }}
          />
          {/* Grain */}
          <div className="absolute inset-0 ns-grain opacity-[0.12] mix-blend-overlay" />
        </div>

        <div className="relative z-10">
          {/* Top bar */}
          <header className="px-6 sm:px-10 lg:px-16 py-7 flex items-center justify-between">
            <div
              className="text-[11px] sm:text-xs tracking-[0.4em] uppercase font-medium"
              style={{ color: "rgba(247,237,227,0.78)" }}
            >
              <span style={{ color: "#E8956A" }}>◆</span>&nbsp;&nbsp;НейроСтилист
            </div>
            <Link
              to="/"
              className="text-[11px] sm:text-xs tracking-[0.25em] uppercase hover:opacity-100 transition-opacity"
              style={{ color: "rgba(247,237,227,0.55)" }}
            >
              aleksamois.ru
            </Link>
          </header>

          {/* HERO — full viewport, asymmetric */}
          <section className="relative px-6 sm:px-10 lg:px-16 min-h-[calc(100vh-90px)] flex items-center">
            {/* Big watermark word */}
            <div
              aria-hidden
              className="ns-hero-decor pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none ns-fade-in"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(180px, 28vw, 420px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "transparent",
                WebkitTextStroke: "1px rgba(247,237,227,0.06)",
                opacity: 0.9,
                whiteSpace: "nowrap",
              }}
            >
              ОБРАЗ
            </div>

            {/* Vertical STYLE MAP label */}
            <div
              aria-hidden
              className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 ns-vertical text-[10px] tracking-[0.6em] uppercase ns-fade-in ns-delay-2"
              style={{ color: "rgba(243,199,165,0.55)" }}
            >
              STYLE&nbsp;&nbsp;MAP&nbsp;&nbsp;·&nbsp;&nbsp;01
            </div>

            <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* LEFT: text */}
              <div className="lg:col-span-7 relative z-10">
                <div
                  className="ns-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 sm:mb-8"
                  style={{
                    background: "rgba(243,199,165,0.08)",
                    border: "1px solid rgba(243,199,165,0.25)",
                    color: "#F3C7A5",
                    fontSize: 11,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: "#F3C7A5" }} />
                  AI Fitting Room
                </div>

                <h1
                  className="ns-fade-up ns-delay-1 leading-[0.98] tracking-tight"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(44px, 7.2vw, 104px)",
                    fontWeight: 400,
                  }}
                >
                  <span style={{ color: "#FBF4EA" }}>Собери образ,</span>
                  <br />
                  <span style={{ color: "#F3C7A5", fontStyle: "italic", fontWeight: 300 }}>
                    в котором ты узнаёшь&nbsp;себя
                  </span>
                  <br />
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #FFD4A8 0%, #F3C7A5 30%, #E8956A 65%, #C49DFF 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextFillColor: "transparent",
                      fontSize: "clamp(56px, 9vw, 132px)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    сильнее.
                  </span>
                </h1>

                <p
                  className="ns-fade-up ns-delay-2 mt-7 sm:mt-8 max-w-xl"
                  style={{
                    color: "rgba(247,237,227,0.72)",
                    fontSize: "clamp(15px, 1.25vw, 18px)",
                    lineHeight: 1.65,
                  }}
                >
                  Стиль-диагностика собирает цвет, силуэт, макияж и детали в цельный образ под&nbsp;тебя.
                </p>

                <div className="ns-fade-up ns-delay-3 mt-9 sm:mt-11 flex flex-col items-start gap-3.5">
                  <button
                    onClick={openQuiz}
                    className="ns-cta inline-flex items-center justify-center rounded-full font-semibold"
                    style={{
                      padding: "22px 44px",
                      fontSize: "clamp(15px, 1.15vw, 17px)",
                      color: "#2A0E1E",
                      letterSpacing: "0.02em",
                      boxShadow:
                        "0 0 0 1px rgba(255,241,221,0.4) inset, 0 0 60px rgba(243,199,165,0.55), 0 0 120px rgba(243,199,165,0.25), 0 16px 44px rgba(42,14,30,0.55)",
                    }}
                  >
                    Собрать для меня образ
                    <span style={{ marginLeft: 4, fontSize: "1.1em" }}>→</span>
                  </button>
                  <button
                    onClick={openQuiz}
                    className="text-[13px] tracking-[0.08em] hover:opacity-100 transition-opacity ml-1"
                    style={{
                      color: "rgba(247,237,227,0.5)",
                      borderBottom: "1px solid rgba(247,237,227,0.2)",
                      paddingBottom: 2,
                    }}
                  >
                    Заполнить анкету
                  </button>
                </div>
              </div>

              {/* RIGHT: mirror visual */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                <div className="ns-mirror relative w-[280px] sm:w-[360px] lg:w-[440px] aspect-[4/5] rounded-[200px] overflow-hidden">
                  <img
                    src={heroImg}
                    alt="Цифровая примерочная"
                    width={1024}
                    height={1280}
                    className="w-full h-full object-cover"
                    style={{
                      mixBlendMode: "screen",
                      opacity: 0.92,
                    }}
                  />
                  {/* rose-gold rim */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-[200px] pointer-events-none"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px rgba(243,199,165,0.5), inset 0 0 40px rgba(243,199,165,0.25), inset 0 0 100px rgba(155,108,255,0.18)",
                    }}
                  />
                </div>
                {/* small caption */}
                <div
                  className="hidden lg:block absolute -bottom-2 right-0 text-[10px] tracking-[0.4em] uppercase ns-fade-in ns-delay-4"
                  style={{ color: "rgba(247,237,227,0.4)" }}
                >
                  Digital&nbsp;Mirror · 2026
                </div>
              </div>
            </div>

            {/* scroll hint */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase ns-fade-in ns-delay-4"
              style={{ color: "rgba(247,237,227,0.4)" }}
            >
              ↓&nbsp;&nbsp;Scroll
            </div>
          </section>

          {/* BENTO — детали образа */}
          <section className="px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 pb-20 sm:pb-28">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
                <div>
                  <div
                    className="text-[11px] tracking-[0.4em] uppercase mb-4"
                    style={{ color: "#F3C7A5" }}
                  >
                    <span style={{ color: "#E8956A" }}>◆</span>&nbsp;&nbsp;Style Map · 02
                  </div>
                  <h2
                    className="leading-[1.05] tracking-tight"
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "clamp(34px, 4.5vw, 64px)",
                      color: "#FBF4EA",
                      fontWeight: 400,
                    }}
                  >
                    Образ складывается
                    <br />
                    <span style={{ color: "#F3C7A5", fontStyle: "italic" }}>из деталей.</span>
                  </h2>
                </div>
                <p
                  className="max-w-sm sm:text-right"
                  style={{ color: "rgba(247,237,227,0.55)", fontSize: 15, lineHeight: 1.6 }}
                >
                  Шесть слоёв, из которых собирается твоя цельная картинка.
                </p>
              </div>

              {/* Bento grid */}
              <div className="grid grid-cols-12 auto-rows-[160px] sm:auto-rows-[180px] gap-4 sm:gap-5">
                <BentoCard
                  num="01"
                  icon={Palette}
                  title="Цвета"
                  description="Палитра, в которой ты звучишь чище всего."
                  className="col-span-12 sm:col-span-7 row-span-2"
                  large
                />
                <BentoCard
                  num="02"
                  icon={Shirt}
                  title="Силуэты"
                  description="Линии, которые подчёркивают тебя."
                  className="col-span-12 sm:col-span-5 row-span-1"
                />
                <BentoCard
                  num="03"
                  icon={Sparkles}
                  title="Макияж"
                  description="Акценты, которые работают на образ."
                  className="col-span-6 sm:col-span-5 row-span-1"
                />
                <BentoCard
                  num="04"
                  icon={Scissors}
                  title="Укладка"
                  description="Форма волос как часть характера."
                  className="col-span-6 sm:col-span-4 row-span-1"
                />
                <BentoCard
                  num="05"
                  icon={Gem}
                  title="Аксессуары"
                  description="Детали, которые завершают."
                  className="col-span-6 sm:col-span-4 row-span-1"
                />
                <BentoCard
                  num="06"
                  icon={Heart}
                  title="Настроение"
                  description="Ощущение, которое ты транслируешь."
                  className="col-span-6 sm:col-span-4 row-span-1"
                />
              </div>
            </div>
          </section>

          {/* PROCESS */}
          <section className="relative px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 sm:mb-20">
                <div
                  className="text-[11px] tracking-[0.4em] uppercase mb-4"
                  style={{ color: "#F3C7A5" }}
                >
                  <span style={{ color: "#E8956A" }}>◆</span>&nbsp;&nbsp;Process · 03
                </div>
                <h2
                  className="leading-[1.05] tracking-tight max-w-3xl mx-auto"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(32px, 4.2vw, 60px)",
                    color: "#FBF4EA",
                    fontWeight: 400,
                  }}
                >
                  Ты отвечаешь на вопросы,
                  <br />
                  <span style={{ color: "#F3C7A5", fontStyle: "italic" }}>
                    а образ начинает складываться.
                  </span>
                </h2>
              </div>

              {/* Steps path */}
              <div className="relative">
                {/* connecting glow line — desktop */}
                <div
                  aria-hidden
                  className="hidden md:block absolute top-[38px] left-[8%] right-[8%] h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, #E8956A 20%, #F3C7A5 50%, #E8956A 80%, transparent 100%)",
                    opacity: 0.5,
                  }}
                />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-6 relative">
                  <ProcessStep n="01" title="Настроение" desc="Ловим вектор образа." />
                  <ProcessStep n="02" title="Внешность" desc="Колорит и черты." />
                  <ProcessStep n="03" title="Цвет" desc="Палитра и оттенки." />
                  <ProcessStep n="04" title="Детали" desc="Силуэты и акценты." />
                  <ProcessStep n="05" title="Разбор" desc="Персональный ответ." />
                </div>
              </div>
            </div>
          </section>

          {/* FINAL CTA — closed style room */}
          <section className="relative px-6 sm:px-10 lg:px-16 py-28 sm:py-36">
            {/* spotlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full opacity-40 blur-[140px]"
              style={{
                background:
                  "radial-gradient(ellipse at center, #F3C7A5 0%, rgba(155,108,255,0.4) 50%, transparent 75%)",
              }}
            />
            <div className="relative max-w-4xl mx-auto text-center">
              <div
                className="text-[11px] tracking-[0.4em] uppercase mb-6"
                style={{ color: "#F3C7A5" }}
              >
                <span style={{ color: "#E8956A" }}>◆</span>&nbsp;&nbsp;Invitation · 04
              </div>
              <h2
                className="leading-[1.05] tracking-tight"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(36px, 5.5vw, 78px)",
                  color: "#FBF4EA",
                  fontWeight: 400,
                }}
              >
                Твой образ
                <br />
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg, #FFE9D2 0%, #F3C7A5 50%, #C77DFF 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    fontStyle: "italic",
                  }}
                >
                  уже можно собрать.
                </span>
              </h2>

              <div className="mt-12 flex flex-col items-center gap-4">
                <button
                  onClick={openQuiz}
                  className="ns-cta inline-flex items-center justify-center rounded-full font-semibold"
                  style={{
                    padding: "22px 44px",
                    fontSize: "clamp(15px, 1.15vw, 17px)",
                    color: "#2A0E1E",
                    letterSpacing: "0.02em",
                    boxShadow:
                      "0 0 0 1px rgba(255,241,221,0.4) inset, 0 0 70px rgba(243,199,165,0.6), 0 0 140px rgba(243,199,165,0.3), 0 18px 50px rgba(42,14,30,0.6)",
                  }}
                >
                  Собрать для меня образ
                  <span style={{ marginLeft: 4, fontSize: "1.1em" }}>→</span>
                </button>
                <button
                  onClick={openQuiz}
                  className="text-[13px] tracking-[0.08em] hover:opacity-100 transition-opacity"
                  style={{
                    color: "rgba(247,237,227,0.5)",
                    borderBottom: "1px solid rgba(247,237,227,0.2)",
                    paddingBottom: 2,
                  }}
                >
                  Заполнить анкету
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="px-6 sm:px-10 lg:px-16 py-10 border-t" style={{ borderColor: "rgba(247,237,227,0.08)" }}>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: "rgba(247,237,227,0.5)" }}>
              <div className="tracking-[0.15em]">© {new Date().getFullYear()} НейроСтилист</div>
              <div className="flex items-center gap-6">
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

const BentoCard = ({
  num,
  icon: Icon,
  title,
  description,
  className = "",
  large = false,
}: {
  num: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  className?: string;
  large?: boolean;
}) => (
  <div
    className={`ns-bento-card relative rounded-3xl p-6 sm:p-7 border overflow-hidden flex flex-col justify-between ${className}`}
    style={{
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
      borderColor: "rgba(243,199,165,0.18)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      boxShadow:
        "inset 0 1px 0 rgba(247,237,227,0.08), 0 1px 2px rgba(0,0,0,0.25), 0 14px 40px rgba(20,8,18,0.45)",
    }}
  >
    {/* inner glow */}
    <div
      aria-hidden
      className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-25 blur-[60px] pointer-events-none"
      style={{ background: "#F3C7A5" }}
    />
    <div className="relative flex items-start justify-between">
      <span
        style={{
          fontFamily: "Georgia, serif",
          fontSize: large ? "clamp(48px, 6vw, 80px)" : "clamp(28px, 3vw, 40px)",
          fontWeight: 300,
          lineHeight: 1,
          background: "linear-gradient(135deg, #F3C7A5 0%, rgba(243,199,165,0.3) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
        }}
      >
        {num}
      </span>
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{
          background: "rgba(243,199,165,0.12)",
          border: "1px solid rgba(243,199,165,0.3)",
        }}
      >
        <Icon className="ns-bento-icon w-4 h-4" style={{ color: "#F3C7A5", transition: "color 0.4s" }} />
      </div>
    </div>
    <div className="relative">
      <h3
        className={`tracking-tight ${large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}
        style={{
          color: "#FBF4EA",
          fontFamily: large ? "Georgia, serif" : "inherit",
          fontWeight: large ? 400 : 600,
        }}
      >
        {title}
      </h3>
      <p
        className={`mt-2 leading-relaxed ${large ? "text-base max-w-xs" : "text-sm"}`}
        style={{ color: "rgba(247,237,227,0.6)" }}
      >
        {description}
      </p>
    </div>
  </div>
);

const ProcessStep = ({ n, title, desc }: { n: string; title: string; desc: string }) => (
  <div className="relative flex flex-col items-center text-center">
    <div
      className="relative w-[76px] h-[76px] rounded-full flex items-center justify-center mb-5"
      style={{
        background:
          "radial-gradient(circle, #F5C9A0 0%, #E8956A 100%)",
        boxShadow:
          "0 0 0 1px rgba(255,241,221,0.4) inset, 0 0 30px rgba(232,149,106,0.55), 0 8px 24px rgba(42,14,30,0.5)",
      }}
    >
      <span
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 22,
          fontWeight: 500,
          color: "#1A0910",
          letterSpacing: "-0.02em",
        }}
      >
        {n}
      </span>
    </div>
    <h3
      className="text-base sm:text-lg tracking-tight mb-1.5"
      style={{ color: "#FBF4EA", fontWeight: 600 }}
    >
      {title}
    </h3>
    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(247,237,227,0.55)" }}>
      {desc}
    </p>
  </div>
);

export default NeurostylistPage;
