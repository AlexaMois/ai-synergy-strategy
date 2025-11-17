import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Cases = () => {
  const cases = [
    {
      title: "Крайпотребсоюз",
      result: "–92% времени на обработку",
      roi: "ROI 278%",
      description:
        "Автоматизация документооборота и аналитики для региональной организации. Сокращение рутинных операций с 8 часов до 40 минут.",
    },
    {
      title: "Голосовой ассистент",
      result: "Полная автоматизация",
      roi: "ROI 340%",
      description:
        "Разработка и внедрение голосового помощника для службы поддержки. Обработка 70% запросов без участия оператора.",
    },
    {
      title: "Грузовой экспресс",
      result: "Оптимизация логистики",
      roi: "ROI 215%",
      description:
        "Внедрение ИИ для прогнозирования маршрутов и загрузки. Снижение простоев на 35% и экономия топлива на 18%.",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Кейсы</h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className="p-8 rounded-lg bg-background border-l-4 border-accent hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-4">{caseItem.title}</h3>
              <div className="space-y-2 mb-4">
                <p className="text-accent font-semibold text-lg">
                  {caseItem.result}
                </p>
                <p className="text-accent font-semibold">{caseItem.roi}</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {caseItem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-accent text-foreground hover:bg-accent/10">
            Посмотреть все кейсы
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cases;
