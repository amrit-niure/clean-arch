import { getInjection } from "@/di/container";
import { NotFoundError } from "@/src/entities/errors/common";

export async function getAllUsersUseCase() {
  const usersRepository = getInjection("IUsersRepository");

  const userData = await usersRepository.getAllUsers();

  if (!userData) {
    throw new NotFoundError("Users not found.");
  }

  return userData;
}
