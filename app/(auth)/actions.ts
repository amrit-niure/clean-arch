"use server";
import { InputParseError } from "@/src/entities/errors/common";
import { signInController } from "@/src/interface-adapters/controllers/auth/sign-in.controller";
import { Cookie } from "lucia";
import { cookies } from "next/headers";
import { ISignIn } from "@/src/entities/models/users";
import { redirect } from "next/navigation";
import { signOutController } from "@/src/interface-adapters/controllers/auth/sign-out.controller";

export async function signIn(data: ISignIn) {
  const { email, password } = data;
  let sessionCookie: Cookie;
  try {
    const result = await signInController({
      email,
      password,
    });
    sessionCookie = result.cookie;
  } catch (error) {
    console.log(error);
    if (error instanceof InputParseError) {
      return {
        error:
          "Invalid data. Make sure the Password and Confirm Password match.",
      };
    }
    return {
      error: (error as Error).message,
    };
  }
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  redirect("/dashboard");
}

export async function signOut(sessionId: string) {
  await signOutController(sessionId);
  redirect("/signin");
}
