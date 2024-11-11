// application>use-cases>auth>sign-up.use-case.ts
import { getInjection } from "@/di/container";
import { ISignUp } from "@/src/entities/models/users";
import * as argon from "@node-rs/argon2";
import { UnauthorizedError } from "@/src/entities/errors/auth";

export async function signUpUseCase(
  data: ISignUp,
  user: { role: "ADMIN" | "USER" },
) {
  const usersRepository = getInjection("IUsersRepository");
  // Authorization: Check if the user has admin rights
  if (user.role !== "ADMIN") {
    throw new UnauthorizedError("Only admins can create new users");
  }
  try {
    const { password, ...otherData } = data;
    const hashedPassword = await argon.hash(password);
    const userData = { ...otherData, hashedPassword };

    const user = await usersRepository.createUser(userData);
    return user;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw new UnauthorizedError("Unauthorized");
    }
    throw error;
  }
}
