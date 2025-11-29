import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-dark-bg text-background py-12">
      <div className="container mx-auto px-4">
        {/* Основная информация */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Колонка 1: О компании */}
          <div>
            <p className="text-xl font-bold mb-2">Александра Моисеева</p>
            <p className="text-background/60 text-sm mb-4">AI-консультант</p>
            <p className="text-background/80 text-sm leading-relaxed">
              Помогаю компаниям внедрять AI без хаоса и иллюзий — через диагностику, архитектуру и сопровождение.
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <p className="text-lg font-semibold mb-4">Навигация</p>
            <div className="flex flex-col gap-2 text-background/80 text-sm">
              <Link to="/about" className="hover:text-accent transition-colors">Обо мне</Link>
              <a href="/#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-accent transition-colors">Услуги</a>
              <Link to="/cases" className="hover:text-accent transition-colors">Кейсы</Link>
              <a href="/#methodology" onClick={(e) => scrollToSection(e, '#methodology')} className="hover:text-accent transition-colors">Методология</a>
              <Link to="/blog" className="hover:text-accent transition-colors">Блог</Link>
              <a href="/#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-accent transition-colors">Контакты</a>
            </div>
          </div>

          {/* Колонка 3: Контакты */}
          <div>
            <p className="text-lg font-semibold mb-4">Контакты</p>
            <div className="flex flex-col gap-2 text-background/80 text-sm">
              <a href="mailto:neiroreshenia@yandex.com" className="hover:text-accent transition-colors">
                neiroreshenia@yandex.com
              </a>
              <a href="https://нейрорешения.рф" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                https://нейрорешения.рф
              </a>
            </div>
          </div>
        </div>

        {/* Юридическая информация */}
        <div className="border-t border-background/20 pt-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6 text-sm text-background/70">
            {/* Реквизиты */}
            <div>
              <p className="text-background/90 font-medium mb-2">Реквизиты ИП</p>
              <p>ИП Моисеева Александра Алексеевна</p>
              <p>ИНН: 245906802500</p>
              <p>ОГРНИП: 323246800027635</p>
            </div>

            {/* Юридические документы */}
            <div>
              <p className="text-background/90 font-medium mb-2">Юридические документы</p>
              <div className="flex flex-col gap-1">
                <Link to="/consent" className="hover:text-accent transition-colors">
                  Согласие на обработку персональных данных
                </Link>
                <Link to="/privacy-policy" className="hover:text-accent transition-colors">
                  Политика в отношении обработки персональных данных
                </Link>
                <Link to="/terms" className="hover:text-accent transition-colors">
                  Договор-оферта
                </Link>
              </div>
              <p className="mt-3">
                По вопросам ПДн: <a href="mailto:neiroreshenia@yandex.com" className="hover:text-accent transition-colors">neiroreshenia@yandex.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-background/20 pt-6 text-center text-background/60 text-sm">
          <p>© ИП Моисеева Александра Алексеевна, 2023–2025. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
