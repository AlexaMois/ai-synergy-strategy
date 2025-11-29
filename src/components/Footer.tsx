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
              Александра Моисеева
            </p>
            <p className="text-background/60 text-sm">AI-консультант</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-background/80 text-sm">
            <a href="/about" className="hover:text-accent transition-colors">Обо мне</a>
            <span className="text-background/40">·</span>
            <a href="/#services" className="hover:text-accent transition-colors">Услуги</a>
            <span className="text-background/40">·</span>
            <a href="/cases" className="hover:text-accent transition-colors">Кейсы</a>
            <span className="text-background/40">·</span>
            <a href="/#methodology" className="hover:text-accent transition-colors">Методология</a>
            <span className="text-background/40">·</span>
            <a href="/blog" className="hover:text-accent transition-colors">Блог</a>
            <span className="text-background/40">·</span>
            <a href="/#contact" className="hover:text-accent transition-colors">Контакты</a>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center text-background/60 text-sm">
          <p>© Александра Моисеева, 2023–2025. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
