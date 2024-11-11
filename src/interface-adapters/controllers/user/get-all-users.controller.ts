import { getInjection } from "@/di/container";
import { getAllUsersUseCase } from "@/src/application/use-cases/user/get-all-users.user-case";
import { UnauthenticatedError } from "@/src/entities/errors/auth";

export async function getAllUsersController(sessionId: string | undefined) {
  const authenticationService = getInjection("IAuthenticationService");

  if (!sessionId) {
    throw new UnauthenticatedError("Must be logged in to view user");
  }

  try {
    await authenticationService.validateSession(sessionId);
    return await getAllUsersUseCase();
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      throw new UnauthenticatedError("Unauthenticated");
    }
    throw error;
  }
}
