import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Authority = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const achievements = [
    "Спикер AI Summit Russia",
    "Forbes: 'ИИ без иллюзий'",
    "YouTube канал",
    "Подкаст про ИИ",
  ];

  return (
    <section id="interviews" ref={ref} className="relative py-16 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h3 className="section-title mb-8 text-center">
            Выступления и публикации
          </h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`text-base text-text-body ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.2 + index * 0.07}s` }}
              >
                {achievement}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authority;
