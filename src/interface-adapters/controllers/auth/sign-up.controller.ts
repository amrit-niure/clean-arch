import { sendVerificationEmailUseCase } from "@/src/application/use-cases/send-verification-email.use-case";
import { signUpUseCase } from "@/src/application/use-cases/sign-up.use-case";
import { storeVerificationTokenUseCase } from "@/src/application/use-cases/store-verification-token.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { ISignUp, userSchema } from "@/src/entities/models/users";


export async function signUpController(input: ISignUp,): Promise<ReturnType<typeof signUpUseCase>> {
  const { data, error: inputParseError } = userSchema.safeParse(input);
  if (inputParseError) {
    throw new InputParseError("Invalid data", { cause: inputParseError });
  }
  const signUpUser = await signUpUseCase(data);
  const verificationEmailResponse = await sendVerificationEmailUseCase(signUpUser.user.email, signUpUser.user.id)
  await storeVerificationTokenUseCase(verificationEmailResponse)

  return signUpUser
}