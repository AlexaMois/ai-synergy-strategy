const Footer = () => {
  return (
    <footer className="bg-dark-bg text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent">НейроРешения</h3>
            <p className="text-sm text-background/80">
              Независимый стратег по внедрению искусственного интеллекта
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="text-background/80 hover:text-accent transition-colors">
                  Услуги
                </a>
              </li>
              <li>
                <a href="#cases" className="text-background/80 hover:text-accent transition-colors">
                  Кейсы
                </a>
              </li>
              <li>
                <a href="#about" className="text-background/80 hover:text-accent transition-colors">
                  О себе
                </a>
              </li>
              <li>
                <a href="#contact" className="text-background/80 hover:text-accent transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ресурсы</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/80 hover:text-accent transition-colors">
                  Блог
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-accent transition-colors">
                  Чек-листы
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-accent transition-colors">
                  Вебинары
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Связаться</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>+7 (912) 345-67-89</li>
              <li>hello@neuro-solutions.ru</li>
              <li>Telegram: @alexmoiseeva</li>
              <li>г. Казань, Россия</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © 2025 Александра Моисеева. Все права защищены.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-background/60 hover:text-accent transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-background/60 hover:text-accent transition-colors">
              Договор оферты
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
