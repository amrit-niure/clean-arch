import { SessionCookie } from "@/src/entities/types/cookie";
import { SignUpInput } from "./signup/page";
import { InputParseError } from "@/src/entities/errors/common";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(data: SignUpInput) {
    const { email, firstName, lastName, password } = data;
    let sessionCookie: SessionCookie;
    try {
        const { cookie } = await signUpController({
            firstName,
            lastName,
            email,
            password
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

      redirect("/");
}