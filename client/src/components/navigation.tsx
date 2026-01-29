import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reservations", label: "Reservations" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group" data-testid="link-home">
            <Coffee className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-serif text-xl lg:text-2xl font-bold tracking-tight">
              Ahmed's
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <ThemeToggle />
            
            {isLoading ? (
              <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.profileImageUrl || ""} alt={user.firstName || "User"} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {user.firstName?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="outline" 
                  size="sm" 
                  data-testid="button-logout"
                  onClick={() => window.location.href = "/api/logout"}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                size="sm" 
                data-testid="button-login"
                onClick={() => window.location.href = "/api/login"}
              >
                Sign In
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block px-4 py-3 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors duration-300"
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
