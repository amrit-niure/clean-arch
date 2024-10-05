import { signUpUseCase } from "@/src/application/use-cases/sign-up.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { ISignUp, userSchema } from "@/src/entities/models/users";


export async function signUpController(input: ISignUp,): Promise<ReturnType<typeof signUpUseCase>> {
    const { data, error: inputParseError } = userSchema.safeParse(input);
    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }
    return await signUpUseCase(data);
}