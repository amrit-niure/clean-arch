import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import db from '@/db/drizzle/db';
import { cookies } from "next/headers";
import { EmailResponse, EmailVerificationData } from "@/src/entities/email";
import { verifyEmailUseCase } from "@/src/application/use-cases/verify-email.use.case";
import { deleteVerificationEmailCodeUseCase } from "@/src/application/use-cases/delete-verification-email-code.use-case";
import { updateUserUseCase } from "@/src/application/use-cases/update-user.use-case";

export const GET = async (req: NextRequest) => {
    const url = new URL(req.url)
    const searchParams = url.searchParams
    const token = searchParams.get("token")

    if (!token) {
        return Response.json({
            error: "Invalid token"
        }, {
            status: 400
        })
    }
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as {
            email: string;
            code: string;
        };
        const emailVerificationResult  = await verifyEmailUseCase(decoded)

        if (!emailVerificationResult) {
            return Response.json({
                error: "Invalid token",
            }, {
                status: 400
            })
        }
        // await prisma.emailVerificationCode.deleteMany({});
        await deleteVerificationEmailCodeUseCase(decoded)
        
        const user = await updateUserUseCase(emailVerificationResult)
        const session = await lucia.createSession(user.id, {});

        const sessionCookie: SessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
        return Response.redirect(new URL(process.env.NEXT_PUBLIC_BASE_URL!), 302)
    } catch (error) {
        if (error instanceof Error) {
            return Response.json({
                error: error.message
            }, {
                status: 400
            })
        } else {
            Response.json({
                error: "An unknown error occoured"
            }, {
                status: 400
            })
        }
    }
}