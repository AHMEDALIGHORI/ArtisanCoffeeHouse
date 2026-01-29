import { db } from "./db";
import { menuItems } from "@shared/schema";

const seedMenuItems = [
  {
    name: "Signature Espresso",
    description: "Our house blend, featuring notes of dark chocolate and caramel with a smooth, velvety finish.",
    price: "4.50",
    category: "hot-coffee",
    featured: true,
    available: true,
  },
  {
    name: "Ahmed's Cappuccino",
    description: "Perfectly balanced espresso with silky microfoam, topped with delicate latte art.",
    price: "5.50",
    category: "hot-coffee",
    featured: true,
    available: true,
  },
  {
    name: "Single Origin Pour Over",
    description: "Ethiopian Yirgacheffe with bright citrus notes and floral undertones, brewed to perfection.",
    price: "6.00",
    category: "hot-coffee",
    featured: false,
    available: true,
  },
  {
    name: "Vanilla Oat Latte",
    description: "Creamy oat milk latte with house-made vanilla syrup, a plant-based delight.",
    price: "6.50",
    category: "hot-coffee",
    featured: false,
    available: true,
  },
  {
    name: "Classic Americano",
    description: "Bold espresso diluted with hot water, maintaining the rich flavor profile.",
    price: "4.00",
    category: "hot-coffee",
    featured: false,
    available: true,
  },
  {
    name: "Iced Caramel Macchiato",
    description: "Layered iced espresso with vanilla and caramel drizzle over cold milk.",
    price: "6.00",
    category: "cold-coffee",
    featured: true,
    available: true,
  },
  {
    name: "Cold Brew Nitro",
    description: "Our signature cold brew infused with nitrogen for a creamy, cascading pour.",
    price: "5.50",
    category: "cold-coffee",
    featured: true,
    available: true,
  },
  {
    name: "Iced Mocha",
    description: "Rich espresso blended with Belgian chocolate and cold milk, topped with whipped cream.",
    price: "6.50",
    category: "cold-coffee",
    featured: false,
    available: true,
  },
  {
    name: "Vanilla Cold Foam Latte",
    description: "Smooth cold brew topped with sweet vanilla cold foam, light and refreshing.",
    price: "5.75",
    category: "cold-coffee",
    featured: false,
    available: true,
  },
  {
    name: "Butter Croissant",
    description: "Flaky, golden French croissant made with premium European butter.",
    price: "4.50",
    category: "pastries",
    featured: true,
    available: true,
  },
  {
    name: "Almond Chocolate Croissant",
    description: "Filled with almond cream and dark chocolate, topped with sliced almonds.",
    price: "5.50",
    category: "pastries",
    featured: false,
    available: true,
  },
  {
    name: "Lemon Blueberry Scone",
    description: "Tender scone with fresh blueberries and a bright lemon glaze.",
    price: "4.75",
    category: "pastries",
    featured: false,
    available: true,
  },
  {
    name: "Cinnamon Roll",
    description: "Warm, gooey cinnamon roll with cream cheese frosting.",
    price: "5.25",
    category: "pastries",
    featured: false,
    available: true,
  },
  {
    name: "Matcha Oat Latte",
    description: "Ceremonial grade matcha whisked with creamy oat milk, earthy and soothing.",
    price: "6.00",
    category: "specialty",
    featured: true,
    available: true,
  },
  {
    name: "Lavender Honey Latte",
    description: "Espresso with house-made lavender syrup and local honey, floral and sweet.",
    price: "6.50",
    category: "specialty",
    featured: false,
    available: true,
  },
  {
    name: "Golden Turmeric Latte",
    description: "Anti-inflammatory turmeric blend with ginger, cinnamon, and steamed oat milk.",
    price: "5.75",
    category: "specialty",
    featured: false,
    available: true,
  },
  {
    name: "Rose Cardamom Mocha",
    description: "Dark chocolate mocha infused with rose water and cardamom, exotic and aromatic.",
    price: "7.00",
    category: "specialty",
    featured: true,
    available: true,
  },
];

export async function seedDatabase() {
  try {
    const existingItems = await db.select().from(menuItems);
    
    if (existingItems.length === 0) {
      console.log("Seeding menu items...");
      await db.insert(menuItems).values(seedMenuItems);
      console.log(`Seeded ${seedMenuItems.length} menu items`);
    } else {
      console.log(`Database already has ${existingItems.length} menu items, skipping seed`);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
