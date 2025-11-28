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
    <footer className="bg-dark-bg text-background py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-xl font-bold mb-1">
              Александра <span className="text-accent">Моисеева</span>
            </p>
            <p className="text-background/60 text-sm">AI консультант</p>
          </div>

          <div className="flex gap-6 text-background/80 text-sm">
            <a href="#services" onClick={(e) => scrollToSection(e, "#services")} className="hover:text-accent transition-colors">Услуги</a>
            <a href="#cases" onClick={(e) => scrollToSection(e, "#cases")} className="hover:text-accent transition-colors">Кейсы</a>
            <a href="#about" onClick={(e) => scrollToSection(e, "#about")} className="hover:text-accent transition-colors">О себе</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")} className="hover:text-accent transition-colors">Контакты</a>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center text-background/60 text-sm">
          <p>© 2025 Александра Моисеева. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
