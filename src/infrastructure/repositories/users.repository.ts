import db from "@/db/drizzle/db";
import { User, users } from "@/db/drizzle/schema/users";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { NotFoundError } from "@/src/entities/errors/common";
import { handleDatabaseError } from "@/src/entities/errors/database";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";

@injectable()
export class UsersRepository implements IUsersRepository {
  async getUser(id: string): Promise<User | undefined> {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, id),
      });
      if (!user) {
        throw new NotFoundError("User Not found.");
      }
      return user;
    } catch (err) {
      throw err; // TODO: convert to Entities error
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = db.query.users.findFirst({
        where: eq(users.email, email),
      });
      return user;
    } catch (err) {
      // TODO: Convert to domain-specific error
      throw err;
    }
  }

  async createUser(input: User): Promise<User> {
    try {
      const query = db.insert(users).values(input).returning();
      const [created] = await query.execute();
      if (created) {
        return created;
      } else {
        throw new Error("User creation failed.");
      }
    } catch (err) {
      console.log(err);
      console.error("Error in createUser:", err);
      throw handleDatabaseError(err, "user creation", input);
    }
  }
  async updateUser(
    id: string,
    input: Partial<User>,
  ): Promise<User | undefined> {
    try {
      const query = db
        .update(users)
        .set(input)
        .where(eq(users.id, id))
        .returning();
      const [updated] = await query.execute();
      if (updated) {
        return updated;
      } else {
        throw new NotFoundError("User not found.");
      }
    } catch (err) {
      throw err; // TODO: Convert to domain-specific error
    }
  }
}
