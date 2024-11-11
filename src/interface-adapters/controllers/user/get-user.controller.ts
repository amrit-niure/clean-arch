// interface-adapters/controllers/user/get-user.controller.ts
import { getInjection } from "@/di/container";
import { getUserUseCase } from "@/src/application/use-cases/user/get-user.use-case";
import { UnauthenticatedError } from "@/src/entities/errors/auth";

export async function getUserController(id: string, sessionId: string) {
  const authenticationService = getInjection("IAuthenticationService");

  if (!sessionId) {
    throw new UnauthenticatedError("Must be logged in to view user");
  }

  try {
    const { user } = await authenticationService.validateSession(sessionId);
    return await getUserUseCase(id, user);
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      throw new UnauthenticatedError("Unauthenticated");
    }
    throw error;
  }
}
