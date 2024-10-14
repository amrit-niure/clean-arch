import { Email, EmailResponse } from '@/src/entities/email';

export interface IEmailService {
  sendEmail(email: Email): Promise<EmailResponse>;
}
