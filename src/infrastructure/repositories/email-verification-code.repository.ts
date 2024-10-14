import db from "@/db/drizzle/db";
import { emailVerificationCodes } from "@/db/drizzle/schema";
import { IEmailVerificationCodeRepository } from "@/src/application/repositories/email-verification-code.interface";
import { EmailVerificationData, EmailResponse } from "@/src/entities/email";
import { injectable } from "inversify";
import { eq, and, gt } from "drizzle-orm"
import { DatabaseOperationError } from "@/src/entities/errors/common";

@injectable()
export class EmailVerificationCodeRepository implements IEmailVerificationCodeRepository {
    async storeCode(data: EmailVerificationData): Promise<EmailResponse> {
        const { code, email, expiresAt, sentAt, userId } = data;
        try {
            await db.insert(emailVerificationCodes).values({
                code,
                email,
                userId,
                expiresAt,
                sentAt
            });

            const emailResponse: EmailResponse = {
                success: true,
                message: `Verification Code saved Successfully.`,
            };
            return emailResponse;

        } catch (err) {
            throw err; // TODO: convert to Entities error
        }
    }

    async verifyCode(decoded: { email: string; code: string; }): Promise<EmailVerificationData> {
        try {
            const currentTime = new Date();
            const result = await db
                .select()
                .from(emailVerificationCodes)
                .where(
                    and(
                        eq(emailVerificationCodes.email, decoded.email),
                        eq(emailVerificationCodes.code, decoded.code),
                        gt(emailVerificationCodes.expiresAt, currentTime)
                    )
                )
                .limit(1);

            return result[0]
        } catch (err) {
            throw new DatabaseOperationError("An error occurred while verifying the code.");
        }
    }
    async deleteCode(decoded: { email: string; code: string }): Promise<EmailResponse> {
        try {
            const result = await db.delete(emailVerificationCodes)
                .where(and(
                    eq(emailVerificationCodes.email, decoded.email),
                    eq(emailVerificationCodes.code, decoded.code)
                )
                );

            if (result.rowCount !== null && result.rowCount > 0) {
                const emailResponse: EmailResponse = {
                    success: true,
                    message: "Verification code deleted successfully.",
                };
                return emailResponse;
            } else {
                const emailResponse: EmailResponse = {
                    success: false,
                    message: "Verification code not found.",
                };
                return emailResponse;
            }
        } catch (err) {
            throw new DatabaseOperationError("An error occurred while deleting the verification code.");
        }
    }
}