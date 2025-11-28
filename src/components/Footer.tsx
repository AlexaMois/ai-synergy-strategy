const Footer = () => {
  return (
    <footer className="bg-dark-bg text-background py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold mb-2">
              Александра <span className="text-accent">Моисеева</span>
            </p>
            <p className="text-background/60">AI консультант</p>
          </div>

          <div className="flex gap-8 text-background/80">
            <a href="#services" className="hover:text-accent transition-colors">Услуги</a>
            <a href="#cases" className="hover:text-accent transition-colors">Кейсы</a>
            <a href="#about" className="hover:text-accent transition-colors">О себе</a>
            <a href="#contact" className="hover:text-accent transition-colors">Контакты</a>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/60 text-sm">
          <p>© 2025 Александра Моисеева. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
