import { z } from "zod";
import { ReactNode } from "react";

// Define the Zod schema for Email
export const EmailSchema = z.object({
  to: z.string().email(), 
  subject: z.string().min(1), 
  body: z.any()
});

// Email interface
export interface Email {
  to: string;
  subject: string;
  html: ReactNode;
}

// EmailResponse interface
export interface EmailResponse {
  success: boolean;
  message: string;
}

export interface EmailVerificationData {
  code: string,
  email: string,
  expiresAt: Date,
  userId: string,
  sentAt: Date
}
