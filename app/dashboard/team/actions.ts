"use server";

import { ISignUp, userSchema } from "@/src/entities/models/users";
import { InputParseError } from "@/src/entities/errors/common";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/config";
import { signUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import { ApiResponse } from "@/src/entities/models/api-response";

export async function signUp(input: ISignUp): Promise<ApiResponse> {
  try {
    // Input validation with Zod
    const { data, error: inputParseError } = userSchema.safeParse(input);
    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }

    const sessionId = cookies().get(SESSION_COOKIE)?.value;
    const response = await signUpController(data, sessionId); // Call controller after validation

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    // Handle different error types and map them to the ApiResponse structure
    if (error instanceof InputParseError) {
      return {
        success: false,
        error: "Input validation failed. Invalid data",
      };
    }

    // Generic error handling
    console.log(error);
    return {
      success: false,
      error:
        (error as Error).message || "Unexpected error occurred during sign up.",
    };
  }
}
