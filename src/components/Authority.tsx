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
    <section ref={ref} className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h3 className="text-3xl md:text-4xl font-bold mb-12">
            Выступления и публикации
          </h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-lg md:text-xl text-muted-foreground">
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
