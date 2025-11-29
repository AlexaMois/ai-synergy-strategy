import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
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
    };

    handleScroll(); // Initial call
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  const navLinks = [
    { href: "#services", label: "Услуги", isScroll: true },
    { href: "#how", label: "Как работаю", isScroll: true },
    { href: "#cases", label: "Кейсы", isScroll: true },
    { href: "/about", label: "Обо мне", isScroll: false },
    { href: "/blog", label: "Блог", isScroll: false },
    { href: "#contact", label: "Контакты", isScroll: true },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80; // Height of fixed navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="text-2xl font-bold text-text-heading">
            Александра <span className="text-accent">Моисеева</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => 
              link.isScroll ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`transition-all duration-300 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 after:ease-out ${
                    activeSection === link.href
                      ? "text-accent after:w-full after:opacity-100"
                      : "text-text-heading hover:text-accent after:w-0 after:opacity-0"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`transition-all duration-300 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 after:ease-out ${
                    location.pathname === link.href
                      ? "text-accent after:w-full after:opacity-100"
                      : "text-text-heading hover:text-accent after:w-0 after:opacity-0"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                Консультация
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-heading z-50 relative transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-20 right-0 bottom-0 w-[280px] bg-background shadow-2xl z-40 md:hidden transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          <nav className="space-y-2 flex-1">
            {navLinks.map((link, index) => 
              link.isScroll ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                    activeSection === link.href
                      ? "text-accent bg-[#D4EDFC] border-l-4 border-accent"
                      : "text-text-heading hover:text-accent hover:bg-[#F1F4F5]"
                  } ${isMobileMenuOpen ? 'animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                    location.pathname === link.href
                      ? "text-accent bg-[#D4EDFC] border-l-4 border-accent"
                      : "text-text-heading hover:text-accent hover:bg-[#F1F4F5]"
                  } ${isMobileMenuOpen ? 'animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          
          <div className={`pt-6 border-t border-border ${isMobileMenuOpen ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '350ms' }}>
            <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                Консультация
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
