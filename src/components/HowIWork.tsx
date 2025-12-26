import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const HowIWork = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContact = () => {
    if (location.pathname !== '/') {
      navigate('/#contact');
      return;
    }
    const element = document.querySelector('#contact');
    if (element) {
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const steps = [
    {
      number: "1",
      title: "Подайте заявку",
      description: "Заполните форму или свяжитесь со мной напрямую",
    },
    {
      number: "2",
      title: "Диагностика процессов",
      description: "Изучаю ваши процессы, данные и определяю точки роста",
    },
    {
      number: "3",
      title: "Проектирование решения",
      description: "Создаю архитектуру и выбираю инструменты для внедрения",
    },
  ];

  return (
    <section id="how" ref={ref} className="relative py-10 md:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`section-title text-center leading-tight ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Как начать работу, <span className="font-semibold">три простых шага</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${0.2 + index * 0.07}s` }}
              >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-accent flex items-center justify-center shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/20 hover:border-primary">
                <span className="text-2xl sm:text-3xl font-semibold text-accent">{step.number}</span>
              </div>
                <h3 className="text-2xl font-medium mb-3 text-text-heading">{step.title}</h3>
                <p className="text-lg text-text-body leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={scrollToContact}>
              Начать сейчас
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
