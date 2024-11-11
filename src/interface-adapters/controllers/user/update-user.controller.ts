// interface-adapters>controllers>auth>update-user.controller.ts
import { User } from "@/db/drizzle/schema/users";
import { getInjection } from "@/di/container";
import { updateUserUseCase } from "@/src/application/use-cases/user/update-user.use-case";

import { UnauthenticatedError } from "@/src/entities/errors/auth";

export async function updateUserController(
  id: string,
  input: Partial<User>,
  sessionId: string | undefined,
) {
  const authenticationService = getInjection("IAuthenticationService");
  try {
    if (!sessionId) {
      throw new UnauthenticatedError("Must be logged in to update a user");
    }

    const { user } = await authenticationService.validateSession(sessionId);

    return await updateUserUseCase(id, input, user);
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      throw new UnauthenticatedError("Unauthenticated");
    }
    throw error;
  }
}
