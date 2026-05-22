import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/data/services";

const ServicesDetailed = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const palettes = [
    { bg: "bg-surface-mint",     text: "text-foreground", muted: "text-foreground/65", border: "border-foreground/10", innerBg: "bg-background/60",   pillDark: false },
    { bg: "bg-accent",           text: "text-foreground", muted: "text-foreground/70", border: "border-foreground/15", innerBg: "bg-background/60",   pillDark: false },
    { bg: "bg-surface-sand",     text: "text-foreground", muted: "text-foreground/65", border: "border-foreground/10", innerBg: "bg-background/60",   pillDark: false },
    { bg: "bg-surface-lavender", text: "text-foreground", muted: "text-foreground/65", border: "border-foreground/10", innerBg: "bg-background/60",   pillDark: false },
    { bg: "bg-surface-blush",    text: "text-foreground", muted: "text-foreground/65", border: "border-foreground/10", innerBg: "bg-background/60",   pillDark: false },
    { bg: "bg-card",             text: "text-foreground", muted: "text-muted-foreground", border: "border-foreground/10", innerBg: "bg-muted/40",     pillDark: false },
    { bg: "bg-foreground",       text: "text-background", muted: "text-background/65", border: "border-background/15", innerBg: "bg-background/10",   pillDark: true  },
  ];

  return (
    <section ref={ref} className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className={`max-w-3xl mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-5">
          Форматы{" "}
          <span className="font-iriska font-normal italic text-accent">работы</span>
        </h2>
        <p className="text-base md:text-lg text-muted-foreground">
          Каждый формат закрывает конкретную управленческую задачу: от первого разбора до внедрения и регулярного сопровождения цифровых инструментов.
        </p>
      </div>

      <div className="space-y-5">
        {services.map((service, index) => {
          const p = palettes[index % palettes.length];
          return (
            <Link
              key={service.slug}
              to={service.href}
              className={`group block relative ${p.bg} rounded-[28px] md:rounded-[32px] ring-1 ring-foreground/5 shadow-card hover:shadow-plate hover:-translate-y-0.5 transition-all duration-300 overflow-hidden px-6 md:px-9 py-7 md:py-9 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className="flex items-start gap-5 md:gap-7 w-full relative">
                <img
                  src={service.sketch}
                  alt=""
                  width={512}
                  height={512}
                  loading="lazy"
                  className="hidden md:block absolute -bottom-6 -right-4 w-28 lg:w-36 h-auto object-contain opacity-90 pointer-events-none"
                />
                <span className={`font-iriska italic ${p.text} text-5xl md:text-6xl lg:text-7xl leading-none flex-shrink-0 min-w-[3rem]`}>
                  {service.number}
                </span>

                <div className="flex-1 text-left min-w-0 md:pr-28 lg:pr-36">
                  <h3 className={`${p.text} text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-2`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm md:text-base ${p.muted} leading-relaxed mb-5 max-w-3xl`}>
                    {service.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <span className={`text-base md:text-lg font-bold ${p.text}`}>
                      {service.price}
                    </span>
                    <span className={`inline-flex items-center gap-2 pl-4 pr-1 py-1 rounded-full font-semibold text-sm shadow-card group-hover:shadow-elevated group-hover:translate-x-0.5 transition-all ${
                      p.pillDark ? "bg-background text-foreground" : "bg-foreground text-background"
                    }`}>
                      Подробнее
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesDetailed;
