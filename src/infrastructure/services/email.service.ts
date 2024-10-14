import nodemailer from 'nodemailer';
import { IEmailService } from '@/src/application/services/email.service.interface';
import { Email, EmailResponse } from '@/src/entities/email';
import { injectable } from "inversify";

@injectable()
export class EmailService implements IEmailService {
  private _transporter;
  constructor() {
    // Set up the transporter with email configuration
    this._transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_SECRET,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  async sendEmail(email: Email): Promise<EmailResponse> {
    try {
    const info = await this._transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: email.to,
      subject: email.subject,
      html: email.html?.toString() || '',
    });

    const emailResponse: EmailResponse = {
      success: true,
      message: `Email sent: ${info.messageId}`,
    };

    return emailResponse;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to send email: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while sending email');
      }
    }
  }
}
