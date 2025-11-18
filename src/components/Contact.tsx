import { Button } from "@/components/ui/button";
import { Phone, Mail, Send, Youtube } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Contact = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  
  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Начните с малого
            </h2>
            <p className="text-xl text-muted-foreground">
              Узнайте, что можно автоматизировать уже сегодня
            </p>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
          </div>

          <div className={`grid md:grid-cols-2 gap-8 mb-12 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="p-8 rounded-lg bg-card border border-border">
              <h3 className="text-xl font-bold mb-6">Свяжитесь со мной</h3>
              <div className="space-y-4">
                <a
                  href="tel:+79123456789"
                  className="flex items-center gap-4 text-muted-foreground hover:text-accent transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+7 (912) 345-67-89</span>
                </a>
                <a
                  href="mailto:hello@neuro-solutions.ru"
                  className="flex items-center gap-4 text-muted-foreground hover:text-accent transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>hello@neuro-solutions.ru</span>
                </a>
                <a
                  href="https://t.me/alexmoiseeva"
                  className="flex items-center gap-4 text-muted-foreground hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="w-5 h-5" />
                  <span>Telegram</span>
                </a>
                <a
                  href="https://youtube.com/@alexmoiseeva"
                  className="flex items-center gap-4 text-muted-foreground hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-5 h-5" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>

            <div className="p-8 rounded-lg bg-accent/5 border-2 border-accent">
              <h3 className="text-xl font-bold mb-4">
                Бесплатная консультация
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                30 минут разбора вашей ситуации: узнайте, где ИИ может дать 
                максимальную отдачу в вашем бизнесе
              </p>
              <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                Записаться на консультацию
              </Button>
            </div>
          </div>

          <div className="text-center p-8 bg-secondary rounded-lg">
            <p className="text-2xl font-bold mb-4">
              Готовы начать трансформацию?
            </p>
            <p className="text-muted-foreground mb-6">
              Первый шаг — понять, что можно автоматизировать прямо сейчас
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                Запросить аудит процессов
              </Button>
              <Button size="lg" variant="outline" className="border-accent text-foreground hover:bg-accent/10 font-semibold">
                Скачать чек-лист
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
