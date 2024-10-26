import jwt from "jsonwebtoken";
import { getInjection } from "@/di/container";
import { Email, EmailVerificationData } from "@/src/entities/email";

export const sendVerificationEmailUseCase = async (
  email: string,
  userId: string,
): Promise<EmailVerificationData> => {
  const emailService = getInjection("IEmailService");

  const code = Math.random().toString(36).substring(2, 8);
  const token = jwt.sign({ email: email, code }, process.env.JWT_SECRET!, {
    expiresIn: "5m",
  });
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`;

  const mailData: Email = {
    html: `<a href="${url}">Verify your email</a>`,
    subject: "Email Verification link (Apply World CRM)",
    to: email,
  };
  await emailService.sendEmail(mailData);
  const data: EmailVerificationData = {
    code,
    email,
    expiresAt,
    userId,
    sentAt: new Date(),
  };
  return data;
};
