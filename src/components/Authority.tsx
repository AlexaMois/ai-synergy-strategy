import { Award, Users, BookOpen, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const Authority = () => {
  const achievements = [
    {
      icon: Award,
      title: "Регалии",
      items: [
        "Член НФИИ (Национальная Федерация ИИ)",
        'Победитель "Бизнес-Успех 2024"',
        "Резидент IT-Парк Казань",
      ],
    },
    {
      icon: Users,
      title: "Конференции",
      items: [
        "Спикер AI Summit Russia 2024",
        "Эксперт Digital Transformation Forum",
        "Участник CIPR AI Conference",
      ],
    },
    {
      icon: BookOpen,
      title: "Публикации",
      items: [
        "Forbes: 'ИИ для бизнеса без иллюзий'",
        "VC.ru: Серия статей об AI Synergy Framework",
        "Habr: Кейсы внедрения ИИ",
      ],
    },
    {
      icon: Video,
      title: "Медиа",
      items: [
        "YouTube канал с практическими разборами",
        "Подкаст 'Честно про ИИ в бизнесе'",
        "Регулярные вебинары и мастер-классы",
      ],
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Авторитет и признание
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-background border border-border hover:border-accent transition-colors"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <achievement.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-4">{achievement.title}</h3>
              <ul className="space-y-2">
                {achievement.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-accent mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-accent text-foreground hover:bg-accent/10">
            Посмотреть интервью и публикации
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Authority;
