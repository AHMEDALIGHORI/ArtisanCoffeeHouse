import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollAnimation } from "@/components/scroll-animation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Coffee, Croissant, IceCream, Leaf } from "lucide-react";
import type { MenuItem } from "@shared/schema";

const categories = [
  { id: "all", label: "All", icon: Coffee },
  { id: "hot-coffee", label: "Hot Coffee", icon: Coffee },
  { id: "cold-coffee", label: "Cold Coffee", icon: IceCream },
  { id: "pastries", label: "Pastries", icon: Croissant },
  { id: "specialty", label: "Specialty", icon: Leaf },
];

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu"],
  });

  const filteredItems = menuItems?.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  return (
    <section id="menu" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fade-up" className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Menu
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Crafted with <span className="text-primary">Expertise</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Each item on our menu is carefully crafted to deliver an exceptional
            experience. From our signature espresso blends to artisanal pastries.
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="gap-2"
                data-testid={`button-category-${category.id}`}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </Button>
            ))}
          </div>
        </ScrollAnimation>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems?.map((item, index) => (
              <ScrollAnimation
                key={item.id}
                animation="scale-in"
                delay={((index % 3) * 100) as 0 | 100 | 200}
              >
                <Card
                  className="group overflow-hidden hover-elevate transition-all duration-300"
                  data-testid={`card-menu-item-${item.id}`}
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Coffee className="h-20 w-20 text-primary/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                    </div>
                    {item.featured && (
                      <Badge className="absolute top-4 right-4 bg-amber-500 text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-serif font-semibold text-xl">{item.name}</h3>
                      <span className="font-serif font-bold text-primary text-lg whitespace-nowrap">
                        ${parseFloat(item.price).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        )}

        {filteredItems?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Coffee className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No items in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
