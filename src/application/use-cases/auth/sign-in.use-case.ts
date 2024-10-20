import { getInjection } from "@/di/container";
import { verify } from "@node-rs/argon2";
import { AuthenticationError } from "@/src/entities/errors/auth";
import { ISignIn } from "@/src/entities/models/users";
import { Cookie, Session } from "lucia";

export async function signInUseCase(
  input: ISignIn,
): Promise<{ session: Session; cookie: Cookie }> {
  const usersRepository = getInjection("IUsersRepository");
  const authenticationService = getInjection("IAuthenticationService");
  try {
    const user = await usersRepository.getUserByEmail(input.email);
    if (!user) {
      throw new AuthenticationError("Wrong Credentials");
    }
    const isPasswordValid = await verify(user.hashedPassword, input.password);
    if (!isPasswordValid) {
      throw new AuthenticationError("Wrong Credentials");
    }
    return await authenticationService.createSession(user);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new AuthenticationError("An error occurred during sign-in");
  }
}
