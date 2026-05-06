import { useState, useEffect, useRef, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Palette, Shirt, Sparkles, Scissors, Gem, Heart } from "lucide-react";
import StylistQuiz from "./StylistQuiz";
import heroImg from "@/assets/neurostylist-hero.jpg";

const NeurostylistPage = () => {
  const [quizOpen, setQuizOpen] = useState(false);
  const openQuiz = () => setQuizOpen(true);

  // -------- Scroll progress + active section label ----------
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<"01" | "02" | "03" | "04">("01");
  const sectionRefs = {
    s1: useRef<HTMLElement | null>(null),
    s2: useRef<HTMLElement | null>(null),
    s3: useRef<HTMLElement | null>(null),
    s4: useRef<HTMLElement | null>(null),
  };

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollProgress(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const map = new Map<Element, "01" | "02" | "03" | "04">();
    if (sectionRefs.s1.current) map.set(sectionRefs.s1.current, "01");
    if (sectionRefs.s2.current) map.set(sectionRefs.s2.current, "02");
    if (sectionRefs.s3.current) map.set(sectionRefs.s3.current, "03");
    if (sectionRefs.s4.current) map.set(sectionRefs.s4.current, "04");
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = map.get(visible.target);
          if (id) setActiveSection(id);
        }
      },
      { threshold: [0.2, 0.5, 0.8] }
    );
    map.forEach((_, el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------- Reveal-on-scroll for [data-reveal] ----------
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    // Подстраховка: всё, что попало во вьюпорт сразу после mount — раскрыть
    const t = window.setTimeout(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("is-revealed");
        }
      });
    }, 80);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);

  // -------- Hero mirror parallax + cursor light ----------
  const heroRef = useRef<HTMLElement | null>(null);
  const mirrorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Только для устройств с настоящим курсором — на touch отключаем,
    // чтобы зеркало не «прыгало» от тапов.
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsHover) return;
    const hero = heroRef.current;
    const mirror = mirrorRef.current;
    if (!hero || !mirror) return;
    let raf = 0;
    let tx = 0, ty = 0, rx = 0, ry = 0;
    let targetTx = 0, targetTy = 0, targetRx = 0, targetRy = 0;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      targetTx = px * 18;
      targetTy = py * 14;
      targetRy = px * 5;
      targetRx = -py * 4;
      const mr = mirror.getBoundingClientRect();
      const mx = ((e.clientX - mr.left) / mr.width) * 100;
      const my = ((e.clientY - mr.top) / mr.height) * 100;
      mirror.style.setProperty("--mx", `${mx}%`);
      mirror.style.setProperty("--my", `${my}%`);
    };
    const onLeave = () => {
      targetTx = 0; targetTy = 0; targetRx = 0; targetRy = 0;
    };
    const tick = () => {
      tx += (targetTx - tx) * 0.08;
      ty += (targetTy - ty) * 0.08;
      rx += (targetRx - rx) * 0.08;
      ry += (targetRy - ry) * 0.08;
      mirror.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const sectionLabels: Record<string, string> = useMemo(
    () => ({
      "01": "ВВЕДЕНИЕ",
      "02": "ДЕТАЛИ",
      "03": "ПРОЦЕСС",
      "04": "ПРИГЛАШЕНИЕ",
    }),
    []
  );

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
          0%, 100% { filter: drop-shadow(0 0 60px rgba(212,149,106,0.35)) drop-shadow(0 0 120px rgba(155,108,255,0.18)); }
          50% { filter: drop-shadow(0 0 90px rgba(212,149,106,0.5)) drop-shadow(0 0 160px rgba(155,108,255,0.28)); }
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
          border-color: rgba(196,123,69,0.55) !important;
          box-shadow:
            inset 0 1px 0 rgba(247,237,227,0.12),
            0 1px 2px rgba(0,0,0,0.3),
            0 24px 70px rgba(196,123,69,0.25),
            0 12px 40px rgba(20,8,18,0.6) !important;
        }
        .ns-bento-card:hover .ns-bento-icon { color: #D4956A !important; }
        .ns-cta {
          background-image: linear-gradient(135deg, #F5E6D0 0%, #D4956A 40%, #C07040 70%, #D4956A 100%);
          background-size: 200% 100%;
          transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.5s, background-position 0.8s;
        }
        .ns-cta:hover {
          transform: translateY(-3px) scale(1.02);
          background-position: 100% 0;
          box-shadow:
            0 0 0 1px rgba(255,241,221,0.5) inset,
            0 0 80px rgba(196,123,69,0.9),
            0 0 160px rgba(196,123,69,0.45),
            0 20px 50px rgba(42,14,30,0.6);
        }
        @media (max-width: 767px) {
          .ns-hero-decor { opacity: 0.55 !important; }
        }
        /* Сбрасываем глобальные h1/h2/h3 !important из index.css только на этой странице */
        .ns-page h1,
        .ns-page h2,
        .ns-page h3,
        .ns-page h4,
        .ns-page h5,
        .ns-page h6 {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
        }
        .ns-page h1 > span,
        .ns-page h2 > span,
        .ns-page h3 > span {
          font-family: inherit;
        }


        @keyframes ns-silk {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes ns-glow-pulse {
          0%, 100% { filter: drop-shadow(0 4px 24px rgba(139,78,30,0.35)) drop-shadow(0 0 20px rgba(212,149,106,0.4)) drop-shadow(0 0 60px rgba(212,149,106,0.15)); }
          50%      { filter: drop-shadow(0 4px 24px rgba(139,78,30,0.45)) drop-shadow(0 0 40px rgba(212,149,106,0.7)) drop-shadow(0 0 100px rgba(212,149,106,0.3)); }
        }
        @keyframes ns-breathe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 1px rgba(212,149,106,0.4) inset, 0 0 30px rgba(196,123,69,0.4), 0 0 60px rgba(196,123,69,0.15), 0 8px 24px rgba(42,14,30,0.5); }
          50%      { transform: scale(1.06); box-shadow: 0 0 0 1px rgba(212,149,106,0.5) inset, 0 0 50px rgba(196,123,69,0.7), 0 0 90px rgba(196,123,69,0.3), 0 8px 24px rgba(42,14,30,0.5); }
        }
        @keyframes ns-label-scroll {
          0%   { transform: translateY(-50%) translateX(0); }
          100% { transform: translateY(-50%) translateX(0) translateY(-12px); }
        }
        .ns-glow-pulse { animation: ns-glow-pulse 4s ease-in-out infinite; }
        .ns-breathe { animation: ns-breathe 3.5s ease-in-out infinite; }
        .ns-label-scroll { animation: ns-label-scroll 6s ease-in-out infinite alternate; }

        /* ---- Reveal on scroll ---- */
        [data-reveal] { opacity: 0; transform: translateY(28px); transition: opacity 1s cubic-bezier(0.2,0.8,0.2,1), transform 1s cubic-bezier(0.2,0.8,0.2,1); }
        [data-reveal].is-revealed { opacity: 1; transform: translateY(0); }
        [data-reveal-delay="1"] { transition-delay: 0.08s; }
        [data-reveal-delay="2"] { transition-delay: 0.16s; }
        [data-reveal-delay="3"] { transition-delay: 0.24s; }
        [data-reveal-delay="4"] { transition-delay: 0.32s; }
        [data-reveal-delay="5"] { transition-delay: 0.40s; }
        [data-reveal-delay="6"] { transition-delay: 0.48s; }

        /* ---- Cursive accent reveal: soft fade-up (compatible with gradient-text) ---- */
        .ns-cursive-accent {
          display: inline-block;
          background-image: linear-gradient(135deg, #F5E6D0 0%, #E8B888 25%, #D4956A 55%, #A0622A 85%, #8B4E1E 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 1.2s cubic-bezier(0.2,0.8,0.2,1), transform 1.2s cubic-bezier(0.2,0.8,0.2,1);
        }
        [data-reveal].is-revealed .ns-cursive-accent {
          opacity: 1;
          transform: translateY(0);
        }

        /* ---- Bento magnetic + spotlight ---- */
        .ns-bento-card { will-change: transform; }
        .ns-bento-card .ns-bento-spot {
          position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(245,230,208,0.18), transparent 55%);
          opacity: 0; transition: opacity 0.5s ease;
          pointer-events: none; z-index: 1;
        }
        .ns-bento-card:hover .ns-bento-spot { opacity: 1; }
        .ns-bento-card > * { position: relative; z-index: 2; }
        .ns-bento-card .ns-bento-spot { z-index: 1; }

        /* ---- Mirror parallax + cursor light ---- */
        .ns-mirror-wrap {
          perspective: 1200px;
          transform-style: preserve-3d;
        }
        .ns-mirror {
          transform-origin: center center;
          transition: transform 0.18s ease-out;
        }
        .ns-mirror::after {
          content: "";
          position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(255,236,210,0.32), transparent 60%);
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 3;
          opacity: 0.85;
        }

        /* ---- Process step hover details ---- */
        .ns-process-step .ns-step-detail {
          opacity: 0; transform: translateY(-6px);
          transition: opacity 0.45s ease, transform 0.45s ease;
          pointer-events: none;
        }
        .ns-process-step:hover .ns-step-detail {
          opacity: 1; transform: translateY(0);
        }
        .ns-process-step:hover .ns-breathe {
          animation-play-state: paused;
          transform: scale(1.08);
          box-shadow: 0 0 0 1px rgba(245,230,208,0.7) inset, 0 0 60px rgba(212,149,106,0.85), 0 0 120px rgba(212,149,106,0.4), 0 12px 36px rgba(42,14,30,0.6);
        }

        /* ---- Drawing line between process steps ---- */
        .ns-flow-line { stroke-dasharray: 1200; stroke-dashoffset: 1200; transition: stroke-dashoffset 2.4s cubic-bezier(0.2,0.8,0.2,1); }
        [data-reveal].is-revealed .ns-flow-line { stroke-dashoffset: 0; }

        /* ---- Side progress rail ---- */
        .ns-rail {
          position: fixed; left: 22px; top: 50%; transform: translateY(-50%);
          width: 1px; height: 220px;
          background: rgba(247,237,227,0.08);
          z-index: 30; pointer-events: none;
        }
        .ns-rail-fill {
          position: absolute; left: 0; top: 0; width: 1px;
          background: linear-gradient(180deg, transparent, #D4956A 30%, #F5E6D0 50%, #D4956A 70%, transparent);
          transform-origin: top;
        }
        .ns-rail-label {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          writing-mode: vertical-rl; text-orientation: mixed;
          font-size: 9px; letter-spacing: 0.55em; text-transform: uppercase;
          color: rgba(212,149,106,0.7); white-space: nowrap;
          transition: opacity 0.5s ease;
        }
        @media (max-width: 1023px) { .ns-rail { display: none; } }

        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1 !important; transform: none !important; }
          .ns-split .ns-letter { opacity: 1 !important; transform: none !important; }
          .ns-flow-line { stroke-dashoffset: 0 !important; }
        }

        /* ---- Touch-устройства: показываем детали шагов всегда,
               отключаем hover-залипание Bento/CTA, убираем magnetic. ---- */
        @media (hover: none), (pointer: coarse) {
          .ns-process-step .ns-step-detail { opacity: 1; transform: none; }
          .ns-bento-card:hover {
            transform: none !important;
          }
          .ns-cta:hover {
            transform: none !important;
          }
          .ns-bento-card .ns-bento-spot { display: none; }
          .ns-mirror::after { display: none; }
        }
      `}</style>

      <div
        className="ns-page relative min-h-screen overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 75% 25%, hsl(340 35% 18%) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, hsl(270 35% 16%) 0%, transparent 65%), radial-gradient(ellipse 100% 80% at 50% 50%, hsl(310 25% 10%) 0%, hsl(300 30% 5%) 100%)",
          color: "#F7EDE3",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {/* Side progress rail with dynamic section label */}
        <div aria-hidden className="ns-rail">
          <div
            className="ns-rail-fill"
            style={{ height: `${Math.round(scrollProgress * 100)}%` }}
          />
          <div className="ns-rail-label">
            КАРТА · {activeSection} · {sectionLabels[activeSection]}
          </div>
        </div>

        {/* Layered background glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full blur-[140px] ns-glow-1"
            style={{ background: "radial-gradient(circle, #C07040 0%, transparent 70%)", opacity: 0.39 }}
          />
          <div
            className="absolute top-[40%] left-[-15%] w-[600px] h-[600px] rounded-full blur-[150px] ns-glow-2"
            style={{ background: "radial-gradient(ellipse, #A0622A 0%, transparent 70%)", opacity: 0.28 }}
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
            style={{ background: "radial-gradient(circle, #F5E6D0 0%, transparent 70%)" }}
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
              <span style={{ color: "#D4956A" }}>◆</span>&nbsp;&nbsp;НейроСтилист
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
          <section
            ref={(el) => { heroRef.current = el; sectionRefs.s1.current = el; }}
            className="relative px-6 sm:px-10 lg:px-16 min-h-[calc(100vh-90px)] flex items-center"
          >
            {/* Big watermark word */}
            <div
              aria-hidden
              className="ns-hero-decor pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none ns-fade-in"
              style={{
                fontFamily: "'Outfit', sans-serif",
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

            <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* LEFT: text */}
              <div className="lg:col-span-7 relative z-10">
                <div
                  className="ns-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 sm:mb-8"
                  style={{
                    background: "rgba(212,149,106,0.08)",
                    border: "1px solid rgba(212,149,106,0.25)",
                    color: "#D4956A",
                    fontSize: 11,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: "#D4956A" }} />
                  Умная примерочная
                </div>

                <h1 className="ns-fade-up ns-delay-1 is-revealed" data-reveal>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(13px, 1vw, 15px)",
                      color: "rgba(247,237,227,0.55)",
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      marginBottom: "0.6em",
                    }}
                  >
                    Собери образ, в котором узнаёшь себя
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(80px, 11vw, 160px)",
                      lineHeight: 0.9,
                      letterSpacing: "0.01em",
                      backgroundImage:
                        "linear-gradient(135deg, #F5E6D0 0%, #E8B888 25%, #D4956A 55%, #A0622A 85%, #8B4E1E 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextFillColor: "transparent",
                      paddingBottom: "0.1em",
                    }}
                    className="ns-glow-pulse"
                  >
                    <span className="ns-cursive-accent">сильнее</span>
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
                        "0 0 0 1px rgba(255,241,221,0.4) inset, 0 0 60px rgba(212,149,106,0.55), 0 0 120px rgba(212,149,106,0.25), 0 16px 44px rgba(42,14,30,0.55)",
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
                <div className="ns-mirror-wrap relative w-[280px] sm:w-[360px] lg:w-[440px] aspect-[4/5]">
                <div
                  ref={mirrorRef}
                  className="ns-mirror relative w-full h-full rounded-[200px] overflow-hidden"
                >
                  {/* Атласная ткань — анимированный мягкий слой */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 'inherit',
                      background: 'linear-gradient(135deg, rgba(196,120,90,0.18), rgba(120,60,140,0.22), rgba(196,120,90,0.12))',
                      backgroundSize: '300% 300%',
                      animation: 'ns-silk 8s ease-in-out infinite',
                      mixBlendMode: 'overlay',
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  />
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
                        "inset 0 0 0 1px rgba(212,149,106,0.5), inset 0 0 40px rgba(212,149,106,0.25), inset 0 0 100px rgba(155,108,255,0.18)",
                    }}
                  />
                </div>
                </div>
                {/* small caption */}
                <div
                  className="hidden lg:block absolute -bottom-2 right-0 text-[10px] tracking-[0.4em] uppercase ns-fade-in ns-delay-4"
                  style={{ color: "rgba(247,237,227,0.4)" }}
                >
                  Цифровое&nbsp;зеркало · 2026
                </div>
              </div>
            </div>

            {/* scroll hint */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase ns-fade-in ns-delay-4"
              style={{ color: "rgba(247,237,227,0.4)" }}
            >
              ↓&nbsp;&nbsp;Пролистай
            </div>
          </section>

          {/* BENTO — детали образа */}
          <section ref={sectionRefs.s2} className="px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 pb-20 sm:pb-28">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
                <div>
                  <div
                    className="text-[11px] tracking-[0.4em] uppercase mb-4"
                    style={{ color: "#D4956A" }}
                  >
                    <span style={{ color: "#D4956A" }}>◆</span>&nbsp;&nbsp;Карта стиля · 02
                  </div>
                  <h2 data-reveal>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(13px, 1vw, 15px)",
                        color: "rgba(247,237,227,0.5)",
                        letterSpacing: "0.32em",
                        textTransform: "uppercase",
                        marginBottom: "0.5em",
                      }}
                    >
                      Образ складывается
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: "clamp(56px, 7vw, 110px)",
                        lineHeight: 0.95,
                        backgroundImage: "linear-gradient(135deg, #F5E6D0 0%, #E8B888 25%, #D4956A 55%, #A0622A 85%, #8B4E1E 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 3px 18px rgba(139,78,30,0.3))",
                        paddingBottom: "0.08em",
                      }}
                    >
                      <span className="ns-cursive-accent">из деталей</span>
                    </span>
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
          <section ref={sectionRefs.s3} className="relative px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 sm:mb-20">
                <div
                  className="text-[11px] tracking-[0.4em] uppercase mb-4"
                  style={{ color: "#D4956A" }}
                >
                  <span style={{ color: "#D4956A" }}>◆</span>&nbsp;&nbsp;Процесс · 03
                </div>
                <h2 className="max-w-4xl mx-auto" data-reveal>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(13px, 1vw, 15px)",
                      color: "rgba(247,237,227,0.5)",
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      marginBottom: "0.5em",
                    }}
                  >
                    Ты отвечаешь на вопросы
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(48px, 6vw, 92px)",
                      lineHeight: 0.95,
                      backgroundImage: "linear-gradient(135deg, #F5E6D0 0%, #E8B888 25%, #D4956A 55%, #A0622A 85%, #8B4E1E 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 3px 18px rgba(139,78,30,0.3))",
                      paddingBottom: "0.08em",
                    }}
                  >
                    <span className="ns-cursive-accent">а образ складывается</span>
                  </span>
                </h2>
              </div>

              {/* Steps path */}
              <div className="relative">
                {/* drawing connecting line — desktop */}
                <svg
                  aria-hidden
                  data-reveal
                  viewBox="0 0 1000 80"
                  preserveAspectRatio="none"
                  className="hidden md:block absolute top-[24px] left-[8%] right-[8%] h-[40px] w-[84%]"
                  style={{ pointerEvents: "none" }}
                >
                  <defs>
                    <linearGradient id="ns-flow-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#D4956A" stopOpacity="0" />
                      <stop offset="20%" stopColor="#D4956A" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#F5E6D0" stopOpacity="0.9" />
                      <stop offset="80%" stopColor="#D4956A" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#D4956A" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    className="ns-flow-line"
                    d="M 10 38 Q 250 8 500 40 T 990 38"
                    fill="none"
                    stroke="url(#ns-flow-grad)"
                    strokeWidth="1.2"
                  />
                </svg>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-6 relative">
                  <ProcessStep delay={0} n="01" title="Настроение" desc="Ловим вектор образа." detail="2 минуты · 4 вопроса" />
                  <ProcessStep delay={0.7} n="02" title="Внешность" desc="Колорит и черты." detail="фото + 3 вопроса" />
                  <ProcessStep delay={1.4} n="03" title="Цвет" desc="Палитра и оттенки." detail="индивидуальная палитра" />
                  <ProcessStep delay={2.1} n="04" title="Детали" desc="Силуэты и акценты." detail="силуэт · фактуры · аксессуары" />
                  <ProcessStep delay={2.8} n="05" title="Разбор" desc="Персональный ответ." detail="готовый образ за 24 ч" />
                </div>
              </div>
            </div>
          </section>

          {/* FINAL CTA — closed style room */}
          <section ref={sectionRefs.s4} className="relative px-6 sm:px-10 lg:px-16 py-28 sm:py-36">
            {/* spotlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full opacity-40 blur-[140px]"
              style={{
                background:
                  "radial-gradient(ellipse at center, #D4956A 0%, rgba(155,108,255,0.4) 50%, transparent 75%)",
              }}
            />
            <div className="relative max-w-4xl mx-auto text-center">
              <div
                className="text-[11px] tracking-[0.4em] uppercase mb-6"
                style={{ color: "#D4956A" }}
              >
                <span style={{ color: "#D4956A" }}>◆</span>&nbsp;&nbsp;Приглашение · 04
              </div>
              <h2 data-reveal>
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1vw, 15px)",
                    color: "rgba(247,237,227,0.5)",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    marginBottom: "0.5em",
                  }}
                >
                  Твой образ
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(64px, 8vw, 120px)",
                    lineHeight: 0.95,
                    backgroundImage: "linear-gradient(135deg, #F5E6D0 0%, #E8B888 25%, #D4956A 55%, #A0622A 85%, #8B4E1E 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 4px 22px rgba(139,78,30,0.35))",
                    paddingBottom: "0.1em",
                  }}
                >
                  <span className="ns-cursive-accent">уже можно собрать</span>
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
                      "0 0 0 1px rgba(255,241,221,0.4) inset, 0 0 70px rgba(212,149,106,0.6), 0 0 140px rgba(212,149,106,0.3), 0 18px 50px rgba(42,14,30,0.6)",
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
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const supportsHoverRef = useRef<boolean>(true);
  useEffect(() => {
    supportsHoverRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!supportsHoverRef.current) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    el.style.transform = `translate3d(${px * 8}px, ${py * 8 - 6}px, 0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };
  return (
  <div
    ref={ref}
    data-reveal
    onMouseMove={onMove}
    onMouseLeave={onLeave}
    className={`ns-bento-card relative rounded-3xl p-6 sm:p-7 border overflow-hidden flex flex-col justify-between ${className}`}
    style={{
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
      borderColor: "rgba(212,149,106,0.18)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      boxShadow:
        "inset 0 1px 0 rgba(247,237,227,0.08), 0 1px 2px rgba(0,0,0,0.25), 0 14px 40px rgba(20,8,18,0.45)",
    }}
  >
    <div className="ns-bento-spot" aria-hidden />
    {/* inner glow */}
    <div
      aria-hidden
      className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-25 blur-[60px] pointer-events-none"
      style={{ background: "#D4956A" }}
    />
    <div className="relative flex items-start justify-between">
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: large ? "clamp(48px, 6vw, 80px)" : "clamp(28px, 3vw, 40px)",
          fontWeight: 300,
          lineHeight: 1,
          background: "linear-gradient(135deg, #D4956A 0%, rgba(212,149,106,0.3) 100%)",
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
          background: "rgba(212,149,106,0.12)",
          border: "1px solid rgba(212,149,106,0.3)",
        }}
      >
        <Icon className="ns-bento-icon w-4 h-4" style={{ color: "#D4956A", transition: "color 0.4s" }} />
      </div>
    </div>
    <div className="relative">
      <h3
        className={`tracking-tight ${large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}
        style={{
          color: "#FBF4EA",
          fontFamily: "'Outfit', sans-serif",
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
};

const ProcessStep = ({ n, title, desc, detail, delay = 0 }: { n: string; title: string; desc: string; detail?: string; delay?: number }) => (
  <div className="ns-process-step relative flex flex-col items-center text-center" data-reveal>
    <div
      className="ns-breathe relative w-[76px] h-[76px] rounded-full flex items-center justify-center mb-5"
      style={{
        background:
          "radial-gradient(circle at 35% 35%, #F5E6D0 0%, #D4956A 45%, #8B4E1E 100%)",
        animationDelay: `${delay}s`,
        transition: "transform 0.5s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.5s ease",
      }}
    >
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
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
      style={{ color: "#F7EDE3", fontWeight: 600 }}
    >
      {title}
    </h3>
    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(247,237,227,0.55)" }}>
      {desc}
    </p>
    {detail && (
      <p
        className="ns-step-detail mt-2 text-[10px] tracking-[0.25em] uppercase"
        style={{ color: "rgba(212,149,106,0.85)" }}
      >
        {detail}
      </p>
    )}
  </div>
);

export default NeurostylistPage;
