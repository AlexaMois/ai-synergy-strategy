import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Услуги" },
    { href: "#how", label: "Как работаю" },
    { href: "#cases", label: "Кейсы" },
    { href: "#about", label: "О себе" },
    { href: "#contact", label: "Контакты" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-text-heading hover:text-accent transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Консультация
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-heading"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block py-3 text-text-heading hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
              Консультация
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
