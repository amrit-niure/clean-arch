import { User } from "@/db/drizzle/schema/users";
import { getInjection } from "@/di/container";

export async function updateUserUseCase(
    id: string,
    input: Partial<User>
): Promise<User | null> {
    try {
        const updateUser = getInjection("IUsersRepository")
        const user: User | null = (await updateUser.updateUser(id, input)) ?? null
        if (!user) {
            throw new Error("User not found");
        }
        return user
    } catch (error) {
        throw new Error("Email verification failed");
    }
}