import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DisabledLink from "@/components/DisabledLink";
import logoHorizontal from "@/assets/logo-horizontal.png";

interface NavLink {
  href: string;
  label: string;
  isScroll: boolean;
  submenu?: { href: string; label: string }[];
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const phoneNumber = "+7 993 721 73 67";
  const phoneLink = "tel:+79937217367";

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

  const navLinks: NavLink[] = [
    {
      href: "/checklist",
      label: "С чего начать",
      isScroll: false
    },
    {
      href: "/services",
      label: "Услуги",
      isScroll: false
    },
    {
      href: "/cases",
      label: "Кейсы",
      isScroll: false
    },
    {
      href: "/golossok-pricing",
      label: "Продукты",
      isScroll: false
    },
    {
      href: "/resources",
      label: "Материалы",
      isScroll: false,
      submenu: [
        { href: "/resources", label: "Ресурсы" },
        { href: "/blog", label: "Блог" }
      ]
    },
    {
      href: "/about",
      label: "Экспертный подход",
      isScroll: false
    }
  ];

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/#contact');
      return;
    }
    
    const element = document.querySelector('#contact');
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

  const handleMouseEnter = (label: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setOpenSubmenu(label);
  };

  const handleMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setOpenSubmenu(null);
    }, 150);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileOpenSubmenu(mobileOpenSubmenu === label ? null : label);
  };

  return <>
    {/* Desktop Header */}
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-card border-b border-border ${isScrolled ? "shadow-soft" : ""}`}>
      {/* Row 1: Navigation */}
      <div className="container mx-auto px-4">
        <div className="hidden lg:flex items-center justify-between h-20">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center overflow-visible">
              <img src={logoHorizontal} alt="Нейрорешения" className="h-40 xl:h-48 w-auto" />
            </Link>

            <nav className="flex items-center gap-6">
              {navLinks.map(link => {
                if (link.submenu) {
                  return (
                    <div 
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(link.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button 
                        className={`flex items-center gap-1 transition-colors duration-200 text-base font-medium relative py-2 ${
                          location.pathname === link.href || link.submenu.some(s => location.pathname === s.href)
                            ? "text-primary font-semibold" 
                            : "text-foreground hover:text-primary"
                        }`}
                      >
                        {link.label}
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-200 ${openSubmenu === link.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      
                      {/* Dropdown */}
                      <div 
                        className={`absolute top-full left-0 mt-1 bg-card border border-border rounded-xl shadow-card py-2 min-w-[160px] transition-all duration-200 ${
                          openSubmenu === link.label 
                            ? 'opacity-100 visible translate-y-0' 
                            : 'opacity-0 invisible -translate-y-2'
                        }`}
                      >
                        {link.submenu.map(subItem => (
                          <DisabledLink
                            key={subItem.href}
                            to={subItem.href}
                            className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                              location.pathname === subItem.href
                                ? "text-primary bg-muted"
                                : "text-foreground hover:text-primary hover:bg-muted"
                            }`}
                            onClick={() => setOpenSubmenu(null)}
                          >
                            {subItem.label}
                          </DisabledLink>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                return link.isScroll ? (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    onClick={e => scrollToSection(e, link.href)} 
                    className={`transition-colors duration-200 text-base font-medium relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 after:ease-out after:rounded-full ${activeSection === link.href ? "text-primary after:w-full after:opacity-100 font-semibold" : "text-foreground hover:text-primary after:w-0 after:opacity-0 hover:after:w-full hover:after:opacity-50"}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <DisabledLink 
                    key={link.href} 
                    to={link.href} 
                    className={`transition-colors duration-200 text-base font-medium relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 after:ease-out after:rounded-full ${location.pathname === link.href ? "text-primary after:w-full after:opacity-100 font-semibold" : "text-foreground hover:text-primary after:w-0 after:opacity-0 hover:after:w-full hover:after:opacity-50"}`}
                  >
                    {link.label}
                  </DisabledLink>
                );
              })}
            </nav>
          </div>
          
          {/* Phone number and CTA button on the right */}
          <div className="flex items-center gap-4">
            <a 
              href={phoneLink} 
              className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              {phoneNumber}
            </a>
            <Button 
              size="sm" 
              onClick={scrollToContact}
            >
              Обсудить задачу
            </Button>
          </div>
        </div>
      </div>


      {/* Mobile Header Row */}
      <div className="lg:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center">
              <img src={logoHorizontal} alt="Нейрорешения" className="h-32 w-auto" />
            </Link>

          </div>
        </div>
      </div>
    </header>

    {/* Mobile Menu Button */}
    <button 
      className="lg:hidden fixed top-3 right-4 z-[70] text-foreground
                 pointer-events-auto touch-manipulation
                 w-10 h-10 flex items-center justify-center
                 bg-card rounded-full shadow-soft border border-border
                 transition-colors duration-200" 
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      aria-label="Toggle menu"
    >
      {isMobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
    </button>

    {/* Mobile Menu Backdrop */}
    {isMobileMenuOpen && (
      <div 
        className="fixed inset-0 bg-foreground/20 z-[55] lg:hidden animate-fade-in"
        onClick={() => setIsMobileMenuOpen(false)} 
      />
    )}

    {/* Mobile Navigation Drawer */}
    <div 
      className={`fixed top-0 right-0 h-full w-[280px] bg-card shadow-card z-[60] lg:hidden transition-transform duration-300 ease-out border-l border-border ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      onTouchStart={handleTouchStart} 
      onTouchMove={handleTouchMove} 
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex flex-col h-full pt-20 p-6 overflow-y-auto">
        <nav className="space-y-1 flex-1">
          {navLinks.map((link, index) => {
            if (link.submenu) {
              return (
                <div key={link.href} className={`${isMobileMenuOpen ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: `${index * 50}ms` }}>
                  <button
                    onClick={() => toggleMobileSubmenu(link.label)}
                    className={`flex items-center justify-between w-full py-3 px-4 rounded-xl transition-colors duration-200 font-medium ${
                      link.submenu.some(s => location.pathname === s.href)
                        ? "text-primary bg-muted"
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                  >
                    {link.label}
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform duration-200 ${mobileOpenSubmenu === link.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {/* Mobile submenu */}
                  <div className={`overflow-hidden transition-all duration-200 ${mobileOpenSubmenu === link.label ? 'max-h-40' : 'max-h-0'}`}>
                    <div className="pl-4 pt-1 space-y-1">
                      {link.submenu.map(subItem => (
                        <DisabledLink
                          key={subItem.href}
                          to={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                            location.pathname === subItem.href
                              ? "text-primary bg-muted"
                              : "text-foreground hover:text-primary hover:bg-muted"
                          }`}
                        >
                          {subItem.label}
                        </DisabledLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            
            return link.isScroll ? (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={e => scrollToSection(e, link.href)} 
                className={`block py-3 px-4 rounded-xl transition-colors duration-200 font-medium ${activeSection === link.href ? "text-white bg-primary" : "text-foreground hover:text-primary hover:bg-muted"} ${isMobileMenuOpen ? 'animate-fade-in-up' : ''}`} 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </a>
            ) : (
              <DisabledLink 
                key={link.href} 
                to={link.href} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`block py-3 px-4 rounded-xl transition-colors duration-200 font-medium ${location.pathname === link.href ? "text-white bg-primary" : "text-foreground hover:text-primary hover:bg-muted"} ${isMobileMenuOpen ? 'animate-fade-in-up' : ''}`} 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </DisabledLink>
            );
          })}
        </nav>
        
        {/* Phone number and CTA in mobile menu */}
        <div className="border-t border-border mt-4 pt-4 space-y-3">
          <a 
            href={phoneLink} 
            className="flex items-center gap-2 py-3 px-4 rounded-xl text-foreground hover:text-primary hover:bg-muted transition-colors duration-200 font-medium"
          >
            <Phone className="h-5 w-5" strokeWidth={1.5} />
            {phoneNumber}
          </a>
          <Button 
            size="sm" 
            className="w-full"
            onClick={scrollToContact}
          >
            Обсудить задачу
          </Button>
        </div>
      </div>
    </div>
  </>;
};

export default Navigation;
