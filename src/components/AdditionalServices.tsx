import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import chatHeartSketch from "@/assets/sketches/chat-heart-sketch.png";
import routeWarmSketch from "@/assets/sketches/route-warm-sketch.png";
import auditCareSketch from "@/assets/sketches/audit-care-sketch.png";

const formatCards = [
  {
    sketch: chatHeartSketch,
    title: "Нужен первый шаг",
    description:
      "Подходит стратегическая встреча по цифровизации для собственника. Формат помогает быстро понять текущую точку А, увидеть ручную нагрузку и определить первый управленческий шаг.",
    bg: "bg-surface-mint",
  },
  {
    sketch: routeWarmSketch,
    title: "Нужен план на 90 дней",
    description:
      "Подходит разработка стратегии цифрового развития бизнеса. Формат помогает собрать приоритеты, этапы, последовательность действий и понять, какие цифровые изменения запускать первыми.",
    bg: "bg-surface-lavender",
  },
  {
    sketch: auditCareSketch,
    title: "Нужен подробный разбор компании",
    description:
      "Подходит глубокий аудит компании для цифровизации. Формат помогает разобрать процессы, данные, документы, текущие инструменты, риски и готовность к внедрению.",
    bg: "bg-surface-blush",
  },
];

const AdditionalServices = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className={`max-w-3xl mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-5">
          Как{" "}
          <span className="font-iriska font-normal italic text-accent">выбрать формат</span>
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
          Если вы пока не знаете, с чего начать, ориентируйтесь на текущую задачу компании.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {formatCards.map((card, index) => (
          <div
            key={index}
            className={`relative ${card.bg} rounded-[28px] p-7 md:p-8 min-h-[280px] overflow-hidden shadow-card hover:shadow-plate hover:-translate-y-1 transition-all duration-300 ring-1 ring-foreground/5 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${0.15 + index * 0.08}s` }}
          >
            <img
              src={card.sketch}
              alt=""
              width={512}
              height={512}
              loading="lazy"
              className="absolute -bottom-4 -right-4 w-32 md:w-40 h-auto object-contain opacity-90 pointer-events-none"
            />
            <span className="font-iriska italic text-accent text-3xl md:text-4xl leading-none block mb-4">
              0{index + 1}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-3 max-w-[85%]">
              {card.title}
            </h3>
            <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-[85%]">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
        <Link
          to="/start"
          className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base md:text-lg bg-foreground text-background hover:bg-foreground/90 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300"
        >
          <span>Подобрать формат работы</span>
          <span className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-accent text-accent-foreground group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default AdditionalServices;
