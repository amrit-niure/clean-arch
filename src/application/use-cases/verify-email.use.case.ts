import { getInjection } from "@/di/container";
import { EmailVerificationData } from "@/src/entities/email";

export async function verifyEmailUseCase(decoded: {
  email: string;
  code: string;
}): Promise<EmailVerificationData | { success: boolean; message: string }> {
  try {
    const emailVerificationCode = getInjection(
      "IEmailVerificationCodeRepository",
    );
    return await emailVerificationCode.verifyCode(decoded);
  } catch (error) {
    return { success: false, message: "Email verification failed" };
  }
}
