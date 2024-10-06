import db from "@/db/drizzle/db";
import { User, users } from "@/db/drizzle/schema/users";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { DatabaseOperationError, NotFoundError } from "@/src/entities/errors/common";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";

@injectable()
export class UsersRepository implements IUsersRepository {
    async getUser(id: string): Promise<User | undefined> {
        try {
            const user = await db.query.users.findFirst({
                where: eq(users.id, id)
            });
            if(!user){
                throw new NotFoundError("User Not found.")
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
            throw err
        }
    }

    async createUser(input: User): Promise<User> {
        try {

            console.log("here")
            const query =  db.insert(users).values(input).returning();

            const [created] = await query.execute();
            console.log("her 4e")

            if (created) {
                return created;
            } else {
                throw new DatabaseOperationError("Cannot create user.")
            }
        } catch (err) {
            throw err    // TODO: Convert to domain-specific error
        }
    }
}