"use server"

import { SignUpInput } from "./signup/page";
import { InputParseError } from "@/src/entities/errors/common";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import { Cookie } from "lucia";

export async function signUp(data: SignUpInput) {
    const { email, firstName, lastName, password } = data;
    let sessionCookie: Cookie;
    try {
        const { cookie } = await signUpController({
            firstName,
            lastName,
            email,
            password,
            role: "USER"
        });
        sessionCookie = cookie;
    } catch (error) {
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

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      redirect("/dashboard");
}