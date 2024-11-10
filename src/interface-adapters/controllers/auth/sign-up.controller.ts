// interface-adapters>controllers>auth>sign-up.controller.ts
import { getInjection } from "@/di/container";
import { signUpUseCase } from "@/src/application/use-cases/auth/sign-up.use-case";
import { UnauthenticatedError } from "@/src/entities/errors/auth";
import { ISignUp } from "@/src/entities/models/users";

export async function signUpController(
  data: ISignUp,
  sessionId: string | undefined,
) {
  const authenticationService = getInjection("IAuthenticationService");
  try {
    if (!sessionId) {
      throw new UnauthenticatedError("Must be logged in to create a user");
    }

    const { user } = await authenticationService.validateSession(sessionId); // Validate session
    return await signUpUseCase(data, user); // Proceed to the use case for authorization and business logic
  } catch (error) {
    if (error instanceof UnauthenticatedError) {
      throw new UnauthenticatedError("Unauthenticated");
    }
    throw error;
  }
}
