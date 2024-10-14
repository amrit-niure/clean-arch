"use server"

import { SignUpInput } from "./signup/page";
import { InputParseError } from "@/src/entities/errors/common";
import { redirect } from "next/navigation";
import { signUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";

export async function signUp(data: SignUpInput) {
    const { email, firstName, lastName, password } = data;
    try {
   await signUpController({
            firstName,
            lastName,
            email,
            password,
            role: "USER"
        });

    } catch (error) {
        console.log(error)
        if (error instanceof InputParseError) {
            return {
                error:
                    "Invalid data. Make sure the Password and Confirm Password match.",
            };
        }
        return {
            error:
              "An error happened. The developers have been notified. Please try again later. Message: " +
              (error as Error).message,
          };
    }
      redirect("/dashboard");
}