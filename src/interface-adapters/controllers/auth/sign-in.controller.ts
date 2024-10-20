import { signInUseCase } from "@/src/application/use-cases/auth/sign-in.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { ISignIn, loginSchema } from "@/src/entities/models/users";

export async function signInController(
  input: ISignIn,
): Promise<ReturnType<typeof signInUseCase>> {
  const { data, error: inputParseError } = loginSchema.safeParse(input);
  if (inputParseError) {
    throw new InputParseError("Invalid data", { cause: inputParseError });
  }
  const result = await signInUseCase(data);
  return result;
}
