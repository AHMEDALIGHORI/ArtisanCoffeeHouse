import { menuItems, reservations, type MenuItem, type InsertMenuItem, type Reservation, type InsertReservation } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  
  getReservations(): Promise<Reservation[]>;
  getReservation(id: string): Promise<Reservation | undefined>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  getUserReservations(userId: string): Promise<Reservation[]>;
}

export class DatabaseStorage implements IStorage {
  async getMenuItems(): Promise<MenuItem[]> {
    return db.select().from(menuItems);
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    const [item] = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return item;
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [created] = await db.insert(menuItems).values(item).returning();
    return created;
  }

  async getReservations(): Promise<Reservation[]> {
    return db.select().from(reservations);
  }

  async getReservation(id: string): Promise<Reservation | undefined> {
    const [reservation] = await db.select().from(reservations).where(eq(reservations.id, id));
    return reservation;
  }

  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const [created] = await db.insert(reservations).values(reservation).returning();
    return created;
  }

  async getUserReservations(userId: string): Promise<Reservation[]> {
    return db!.select().from(reservations).where(eq(reservations.userId, userId));
  }
}

export class MemStorage implements IStorage {
  private menuItems: Map<string, MenuItem>;
  private reservations: Map<string, Reservation>;

  constructor() {
    this.menuItems = new Map();
    this.reservations = new Map();
    // Pre-populate with some data
    this.seedParams();
  }

  private seedParams() {
      const seedMenuItems: InsertMenuItem[] = [
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
      ];

      seedMenuItems.forEach(item => {
          const id = Math.random().toString(36).substring(7);
          this.menuItems.set(id, { ...item, id, createdAt: new Date(), imageUrl: null } as MenuItem);
      });
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const id = Math.random().toString(36).substring(7);
    const newItem: MenuItem = { ...item, id, createdAt: new Date() };
    this.menuItems.set(id, newItem);
    return newItem;
  }

  async getReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values());
  }

  async getReservation(id: string): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const id = Math.random().toString(36).substring(7);
    const newReservation: Reservation = { 
        ...reservation, 
        id, 
        createdAt: new Date(),
        status: "pending", 
        specialRequests: reservation.specialRequests ?? null 
    };
    this.reservations.set(id, newReservation);
    return newReservation;
  }

  async getUserReservations(userId: string): Promise<Reservation[]> {
    return Array.from(this.reservations.values()).filter(r => r.userId === userId);
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
