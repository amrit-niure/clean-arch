import { getInjection } from "@/di/container";
import { EmailVerificationData } from "@/src/entities/email";
import { DatabaseOperationError } from "@/src/entities/errors/common";

export async function storeVerificationTokenUseCase(data: EmailVerificationData) { 
      const emailVerificationCodeRepository = getInjection("IEmailVerificationCodeRepository")

      try {
        await emailVerificationCodeRepository.storeCode(data)
      } catch (err) {
        if (err instanceof DatabaseOperationError) {
            throw new Error("Failed to create the user due to a database error.");
        }
        throw err;
      }
}