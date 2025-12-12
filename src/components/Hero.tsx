import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import alexandraHeadshot from "@/assets/alexandra-headshot.png";
import nPattern from "@/assets/n-pattern.png";
import { AVAILABLE_SLOTS_THIS_WEEK } from "@/config/availability";
import { toast } from "@/hooks/use-toast";
const Hero = () => {
  const tabsContent = {
    owner: {
      title: "Видишь маржу, простои, узкие места в реальном времени",
      description: "Растёшь по выручке, но не по прибыли?\nПрибыль +23% за год, директор вышел из аврала (80+ человек).",
      button1: "Разобрать один процесс",
      button2: "Сколько я теряю сейчас"
    },
    production: {
      title: "ИИ видит узкие места, прогнозирует закупки, ловит брак",
      description: "Люди вводят данные вручную, простои невидимы?\nБрак −40%, штрафы −80%, окупилось за 4 месяца.",
      button1: "Разобрать один процесс",
      button2: "Сколько я теряю сейчас"
    },
    sales: {
      title: "Автоответчик 24/7, квалификация 30 сек",
      description: "Заявки теряются, ответ 2 часа?\nРеакция 2ч → 3мин, конверсия +35%, чек +18%.",
      button1: "Разобрать один процесс",
      button2: "Сколько я теряю сейчас"
    }
  };
  return <section className="relative bg-background pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-20 md:pb-14 lg:pt-24 lg:pb-16 overflow-hidden overflow-x-hidden hero-skeleton">
      {/* N Pattern Background - static, no parallax to reduce reflows */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.01] pointer-events-none" style={{
      backgroundImage: `url(${nPattern})`,
      backgroundRepeat: 'repeat',
      backgroundSize: '120px'
    }} />
      <div className="container mx-auto">
        <Tabs defaultValue="owner" className="w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-6 items-center">
            
          
            {/* Правая колонка с фото */}
            <div className="lg:col-span-5 flex items-center justify-center animate-fade-in-right">
              
            </div>
          </div>
        </Tabs>
      </div>
    </section>;
};
export default Hero;