import { ScrollAnimation } from "@/components/scroll-animation";
import { Award, Leaf, Heart, Coffee } from "lucide-react";
import coffeeBeansImage from "@/assets/images/coffee-beans.png";

const features = [
  {
    icon: Coffee,
    title: "Artisan Roasting",
    description: "Small-batch roasting to bring out the unique character of every bean.",
  },
  {
    icon: Leaf,
    title: "Ethically Sourced",
    description: "Direct trade relationships with farmers who share our commitment to quality.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for excellence in craft coffee by industry leaders.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every cup is crafted with care and passion by our expert baristas.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollAnimation animation="slide-left" className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
              <img
                src={coffeeBeansImage}
                alt="Premium coffee beans"
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -right-6 glass-card rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-lg">Since 2010</div>
                    <div className="text-sm text-muted-foreground">Serving Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <div className="order-1 lg:order-2">
            <ScrollAnimation animation="fade-up">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mt-4 mb-6">
                A Legacy of
                <span className="text-primary"> Excellence</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Born from a deep passion for exceptional coffee, Ahmed's Coffee House has been
                crafting memorable experiences since 2010. Our journey began with a simple
                belief: that every cup of coffee should be a masterpiece.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                We source the finest beans from sustainable farms around the world, roast them
                with precision in small batches, and serve them in an atmosphere designed for
                those who appreciate the finer things in life.
              </p>
            </ScrollAnimation>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <ScrollAnimation
                  key={feature.title}
                  animation="fade-up"
                  delay={(index + 1) * 100 as 100 | 200 | 300 | 400}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-lg mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
