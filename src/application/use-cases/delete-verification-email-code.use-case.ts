import { getInjection } from "@/di/container";
import { EmailResponse } from "@/src/entities/email";

export async function deleteVerificationEmailCodeUseCase(decoded: {
  email: string;
  code: string;
}): Promise<EmailResponse> {
  try {
    const emailVerificationCodeRepository = getInjection(
      "IEmailVerificationCodeRepository",
    );
    await emailVerificationCodeRepository.deleteCode(decoded);
    return { success: true, message: "Verification code deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete verification code" };
  }
}
