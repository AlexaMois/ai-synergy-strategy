import { Link, useNavigate, useLocation } from "react-router-dom";
import { Phone, Mail, Send, MapPin, GraduationCap } from "lucide-react";
import DisabledLink from "@/components/DisabledLink";
const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const hash = href.includes('#') ? href.split('#')[1] : '';
    if (!hash) return;
    if (location.pathname !== '/') {
      navigate(`/#${hash}`);
      return;
    }
    const element = document.querySelector(`#${hash}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
  return <footer className="bg-dark-bg text-background py-12">
      <div className="container mx-auto px-4">
        {/* Основная информация */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* Колонка 1: О компании */}
          <div>
            <p className="text-xl font-bold mb-2">Александра Моисеева</p>
            <p className="text-background/80 text-base leading-relaxed">
              Инженер по ИИ и цифровой архитектуре<br />
              ​Гарантирую честную оценку, экономику и предсказуемый результат<br />
              ​
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <p className="text-lg font-semibold mb-4">Навигация</p>
            <div className="flex flex-col gap-2 text-background/80 text-sm">
              <DisabledLink to="/start" className="hover:text-primary transition-colors">С чего начать</DisabledLink>
              <DisabledLink to="/services" className="hover:text-primary transition-colors">Услуги</DisabledLink>
              <DisabledLink to="/cases" className="hover:text-primary transition-colors">Кейсы</DisabledLink>
              <DisabledLink to="/products" className="hover:text-primary transition-colors">Продукты</DisabledLink>
              <DisabledLink to="/about" className="hover:text-primary transition-colors">Обо мне</DisabledLink>
              <DisabledLink to="/materials/resources" className="hover:text-primary transition-colors">Материалы</DisabledLink>
              <DisabledLink to="/materials/blog" className="hover:text-primary transition-colors">Блог</DisabledLink>
              <a href="/#contact" onClick={e => scrollToSection(e, '#contact')} className="hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>

          {/* Колонка 3: Контакты */}
          <div>
            <p className="text-lg font-semibold mb-4">Контакты</p>
            <div className="flex flex-col gap-3 text-background/80">
              <a href="tel:+79937217367" className="flex items-center gap-2 text-base hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />
                +7 993 721 73 67
              </a>
              <a href="mailto:ai@aleksamois.ru" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" strokeWidth={1.5} />
                ai@aleksamois.ru
              </a>
              <a href="https://t.me/aleksamois" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <Send className="w-4 h-4 text-primary" strokeWidth={1.5} />
                Telegram: @aleksamois
              </a>
              <a href="https://yandex.ru/maps/org/neyroresheniya/57044710830/reviews/?ll=92.837947%2C56.021930&z=16" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/60 text-sm pt-2 hover:text-primary transition-colors">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={1.5} />
                <span>
                  Красноярск, ул. Красной Гвардии, 24, офис 224<br />
                  <span className="text-background/50">(работаю online/offline по России)</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Сертификаты и документы */}
        <div className="border-t border-background/20 pt-6 mb-6">
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-background/70">
            {/* Сертификаты */}
            <div>
              <p className="text-background/90 font-medium mb-2">Сертификаты</p>
              <p><Link to="/about#qualifications" className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"><GraduationCap className="w-4 h-4" />Дипломированный специалист по ИИ →</Link> / Член ОПОРА РОССИИ / Член НФИИ / Резидент КРИТБИ</p>
            </div>

            {/* Юридические документы */}
            <div>
              <p className="text-background/90 font-medium mb-2">Юридические документы</p>
              <div className="flex flex-col gap-1">
                <Link to="/consent" className="hover:text-primary transition-colors">
                  Согласие на обработку персональных данных
                </Link>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                  Политика в отношении обработки персональных данных
                </Link>
                <Link to="/legal/cookies" className="hover:text-primary transition-colors">
                  Политика использования cookies
                </Link>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Договор-оферта
                </Link>
              </div>
              <p className="mt-3 text-background/50 text-xs">
                ИП Моисеева А.А. / ИНН 245906802500 / ОГРНИП 323246800027635
              </p>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-background/20 pt-6 text-center text-background/60 text-sm">
          <p>© ИП Моисеева Александра Алексеевна, 2023–2025. Все права защищены.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;