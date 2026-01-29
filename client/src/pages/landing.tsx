import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { MenuSection } from "@/components/sections/menu-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { ReservationSection } from "@/components/sections/reservation-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/sections/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <GallerySection />
        <ReservationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
