import { ScrollAnimation } from "@/components/scroll-animation";
import heroCoffee from "@/assets/images/hero-coffee.png";
import coffeeBeansImage from "@/assets/images/coffee-beans.png";
import cafeInteriorImage from "@/assets/images/cafe-interior.png";
import baristaImage from "@/assets/images/barista.png";

const galleryImages = [
  {
    src: heroCoffee,
    alt: "Latte art in premium ceramic cup",
    title: "Signature Latte Art",
    className: "col-span-2 row-span-2",
  },
  {
    src: coffeeBeansImage,
    alt: "Premium roasted coffee beans",
    title: "Artisan Beans",
    className: "col-span-1 row-span-1",
  },
  {
    src: baristaImage,
    alt: "Expert barista crafting coffee",
    title: "Master Craftsmanship",
    className: "col-span-1 row-span-1",
  },
  {
    src: cafeInteriorImage,
    alt: "Elegant cafe interior",
    title: "Welcoming Ambiance",
    className: "col-span-2 row-span-1",
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fade-up" className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Gallery
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Visual <span className="text-primary">Journey</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Step into our world of artisan coffee craftsmanship. Every image tells
            a story of dedication, quality, and the pursuit of perfection.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <ScrollAnimation
              key={image.alt}
              animation="scale-in"
              delay={(index * 100) as 0 | 100 | 200 | 300}
              className={image.className}
            >
              <div
                className="group relative h-full min-h-[200px] lg:min-h-[250px] rounded-xl overflow-hidden"
                data-testid={`gallery-image-${index}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif font-semibold text-white text-lg lg:text-xl text-shadow">
                    {image.title}
                  </h3>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
