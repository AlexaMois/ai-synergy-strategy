import { useState, useEffect } from "react";
import { Menu, X, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DisabledLink from "@/components/DisabledLink";
import logoHorizontal from "@/assets/logo-horizontal.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const phoneNumber = "+7 993 721 73 67";
  const phoneLink = "tel:+79937217367";
  const telegramLink = "https://t.me/AlexandraMois";

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          const sections = ["services", "how", "cases", "about", "methodology", "interviews", "contact"];
          const scrollPosition = window.scrollY + 100;
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetBottom = offsetTop + element.offsetHeight;
              if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                setActiveSection(`#${section}`);
                break;
              }
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [{
    href: "/services",
    label: "Услуги",
    isScroll: false
  }, {
    href: "/cases",
    label: "Кейсы",
    isScroll: false
  }, {
    href: "/resources",
    label: "Материалы",
    isScroll: false
  }, {
    href: "/about",
    label: "О подходе",
    isScroll: false
  }, {
    href: "/blog",
    label: "Блог",
    isScroll: false
  }, {
    href: "#contact",
    label: "Контакты",
    isScroll: true
  }];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStart - touchEnd < -75) {
      setIsMobileMenuOpen(false);
    }
  };

  return <>
    {/* Desktop Header - Two Rows */}
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-background/80 backdrop-blur-sm shadow-sm"}`}>
      {/* Row 1: Navigation */}
      <div className="container mx-auto px-4">
        <div className="hidden lg:flex items-center justify-between h-20">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center overflow-visible">
              <img src={logoHorizontal} alt="Нейрорешения" className="h-40 xl:h-48 w-auto" />
            </Link>

            <nav className="flex items-center gap-7">
              {navLinks.map(link => link.isScroll ? (
                <a 
                  key={link.href} 
                  href={link.href} 
                  onClick={e => scrollToSection(e, link.href)} 
                  className={`transition-all duration-300 text-base font-medium relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 after:ease-out after:rounded-full ${activeSection === link.href ? "text-accent after:w-full after:opacity-100 font-semibold" : "text-text-heading hover:text-accent after:w-0 after:opacity-0 hover:after:w-full hover:after:opacity-50"}`}
                >
                  {link.label}
                </a>
              ) : (
                <DisabledLink 
                  key={link.href} 
                  to={link.href} 
                  className={`transition-all duration-300 text-base font-medium relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 after:ease-out after:rounded-full ${location.pathname === link.href ? "text-accent after:w-full after:opacity-100 font-semibold" : "text-text-heading hover:text-accent after:w-0 after:opacity-0 hover:after:w-full hover:after:opacity-50"}`}
                >
                  {link.label}
                </DisabledLink>
              ))}
            </nav>
          </div>
          
          {/* Phone number and CTA button on the right */}
          <div className="flex items-center gap-4">
            <a 
              href={phoneLink} 
              className="flex items-center gap-2 text-base font-medium text-text-heading hover:text-accent transition-colors"
            >
              <Phone className="h-4 w-4" />
              {phoneNumber}
            </a>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg"
              onClick={(e) => scrollToSection(e as any, '#contact')}
            >
              <Phone size={14} />
              Заказать звонок
            </Button>
          </div>
        </div>
      </div>


      {/* Mobile Header Row */}
      <div className="lg:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center">
              <img src={logoHorizontal} alt="Нейрорешения" className="h-8 w-auto" />
            </Link>

          </div>
        </div>
      </div>
    </header>

    {/* Mobile Menu Button */}
    <button 
      className="lg:hidden fixed top-3 right-4 z-[70] text-text-heading
                 pointer-events-auto touch-manipulation
                 w-10 h-10 flex items-center justify-center
                 bg-background/90 backdrop-blur-sm rounded-full shadow-sm
                 transition-all duration-300 hover:scale-110 active:scale-95" 
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      aria-label="Toggle menu"
    >
      {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
    </button>

    {/* Mobile Menu Backdrop */}
    {isMobileMenuOpen && (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] lg:hidden animate-fade-in"
        onClick={() => setIsMobileMenuOpen(false)} 
      />
    )}

    {/* Mobile Navigation Drawer */}
    <div 
      className={`fixed top-0 right-0 h-full w-[280px] bg-background shadow-2xl z-[60] lg:hidden transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      onTouchStart={handleTouchStart} 
      onTouchMove={handleTouchMove} 
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex flex-col h-full pt-20 p-6 overflow-y-auto">
        <nav className="space-y-1 flex-1">
          {navLinks.map((link, index) => link.isScroll ? (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={e => scrollToSection(e, link.href)} 
              className={`block py-3 px-4 rounded-lg transition-all duration-300 font-medium ${activeSection === link.href ? "text-white bg-accent" : "text-text-heading hover:text-accent hover:bg-gray-50"} ${isMobileMenuOpen ? 'animate-fade-in-up' : ''}`} 
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.label}
            </a>
          ) : (
            <DisabledLink 
              key={link.href} 
              to={link.href} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`block py-3 px-4 rounded-lg transition-all duration-300 font-medium ${location.pathname === link.href ? "text-white bg-accent" : "text-text-heading hover:text-accent hover:bg-gray-50"} ${isMobileMenuOpen ? 'animate-fade-in-up' : ''}`} 
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.label}
            </DisabledLink>
          ))}
        </nav>
        
        {/* Phone number and CTA in mobile menu */}
        <div className="border-t border-gray-100 mt-4 pt-4 space-y-3">
          <a 
            href={phoneLink} 
            className="flex items-center gap-2 py-3 px-4 rounded-lg text-text-heading hover:text-accent hover:bg-gray-50 transition-all duration-300 font-medium"
          >
            <Phone className="h-5 w-5" />
            {phoneNumber}
          </a>
          <Button 
            size="sm" 
            className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg"
            onClick={(e) => scrollToSection(e as any, '#contact')}
          >
            <Phone size={14} />
            Заказать звонок
          </Button>
        </div>
      </div>
    </div>
  </>;
};

export default Navigation;
