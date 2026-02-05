import { users, type User, type UpsertUser } from "@shared/models/auth";
import { db } from "../../db";
import { eq } from "drizzle-orm";

// Interface for auth storage operations
// (IMPORTANT) These user operations are mandatory for Replit Auth.
export interface IAuthStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
}

class AuthStorage implements IAuthStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db!
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
}

class MemAuthStorage implements IAuthStorage {
    private users: Map<string, User> = new Map();

    async getUser(id: string): Promise<User | undefined> {
        return this.users.get(id);
    }

    async upsertUser(userData: UpsertUser): Promise<User> {
        const id = userData.id || "gen-" + Math.random().toString(36).substring(7);
        // We know id is string because of the default in schema but here it might be undefined in type
        
        const existing = this.users.get(id);
        const user: User = {
            ...(existing || {}),
            ...userData,
            id: id,
            createdAt: existing?.createdAt || new Date(),
            updatedAt: new Date(),
            // Handle potentially undefined vs null fields if strict
            email: userData.email || null,
            firstName: userData.firstName || null,
            lastName: userData.lastName || null,
            profileImageUrl: userData.profileImageUrl || null
        };
        
        this.users.set(id, user);
        return user;
    }
}

export const authStorage = process.env.DATABASE_URL ? new AuthStorage() : new MemAuthStorage();
