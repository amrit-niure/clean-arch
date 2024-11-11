// application/use-cases/user/get-user.use-case.ts
import { getInjection } from "@/di/container";
import { UserNotFoundError } from "@/src/entities/errors/common";

export async function getUserUseCase(id: string) {
  const usersRepository = getInjection("IUsersRepository");

  // Business logic to fetch user by ID
  const userData = await usersRepository.getUser(id);

  if (!userData) {
    throw new UserNotFoundError(`User with ID ${id} not found.`);
  }

  return userData;
}
