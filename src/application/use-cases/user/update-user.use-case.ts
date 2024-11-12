// application>use-cases>auth>update-user.use-case.ts
import { getInjection } from "@/di/container";
import { NotFoundError } from "@/src/entities/errors/common";
import { UnauthorizedError } from "@/src/entities/errors/auth";
import { User } from "lucia";

export async function updateUserUseCase(
  id: string,
  input: Partial<User>,
  user: User,
) {
  const usersRepository = getInjection("IUsersRepository");

  if (user.role !== "ADMIN" && user.id !== id) {
    throw new UnauthorizedError("You are not authorized to update this user");
  }

  try {
    console.log("Updating the user...");
    const updatedUser = await usersRepository.updateUser(id, input);
    return updatedUser;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new NotFoundError("User not found.");
    }
    throw error;
  }
}
