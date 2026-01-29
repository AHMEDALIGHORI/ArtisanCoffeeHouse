import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import heroCoffee from "@/assets/images/hero-coffee.png";

export function HeroSection() {
  const scrollToMenu = () => {
    const element = document.querySelector("#menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToReservations = () => {
    const element = document.querySelector("#reservations");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroCoffee})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-white/90">Ahmed's Premium Coffee</span>
          </div>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-shadow-lg mb-6 animate-fade-in-up delay-100">
          Crafted with
          <span className="block text-amber-400 mt-2">Passion</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/80 mb-10 animate-fade-in-up delay-200 font-sans leading-relaxed">
          Experience the finest handcrafted coffee in an elegant atmosphere.
          Every cup tells a story of dedication, precision, and artistry.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <Button
            size="lg"
            onClick={scrollToMenu}
            className="text-lg px-8 py-6 bg-amber-600 hover:bg-amber-700 border-amber-700"
            data-testid="button-explore-menu"
          >
            Explore Our Menu
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToReservations}
            className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
            data-testid="button-reserve-table"
          >
            Reserve a Table
          </Button>
        </div>

        <div className="mt-16 animate-fade-in delay-500">
          <div className="flex items-center justify-center gap-8 text-white/60 text-sm">
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-white">15+</div>
              <div>Years Experience</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-white">50k+</div>
              <div>Happy Customers</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-white">25+</div>
              <div>Coffee Varieties</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
          data-testid="link-scroll-down"
        >
          <span className="text-sm mb-2">Scroll</span>
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
