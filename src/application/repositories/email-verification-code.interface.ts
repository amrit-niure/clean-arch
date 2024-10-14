import { EmailResponse, EmailVerificationData } from '@/src/entities/email'

export interface IEmailVerificationCodeRepository {
 storeCode(data: EmailVerificationData) : Promise<EmailResponse> 
 verifyCode(decoded: {email: string, code: string}) : Promise<EmailVerificationData>
 deleteCode(decoded: {email: string, code: string}): Promise<EmailResponse>
}
