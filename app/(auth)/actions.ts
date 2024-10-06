"use server"

import { SignUpInput } from "./signup/page";
import { InputParseError } from "@/src/entities/errors/common";
import { signUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import { redirect } from "next/navigation";

export async function signUp(data: SignUpInput) {
    const { email, firstName, lastName, password } = data;
    console.log(data)
    try {
        const { user } = await signUpController({
            firstName,
            lastName,
            email,
            password,
            role: "USER"
        });
    } catch (error) {
        if (error instanceof InputParseError) {
            return {
                error:
                    "Invalid data.",
            };
        }
        console.log(error)
        return {
            error:
                "An error happened. The developers have been notified. Please try again later. Message: " +
                (error as Error).message,
        };
    }
    redirect('/signin')
 
}