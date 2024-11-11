"use server";

import { ISignUp, userSchema } from "@/src/entities/models/users";
import { InputParseError } from "@/src/entities/errors/common";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/config";
import { signUpController } from "@/src/interface-adapters/controllers/auth/sign-up.controller";
import { ApiResponse } from "@/src/entities/models/api-response";
import { updateUserController } from "@/src/interface-adapters/controllers/user/update-user.controller";
import { getUserController } from "@/src/interface-adapters/controllers/user/get-user.controller";
import { getAllUsersController } from "@/src/interface-adapters/controllers/user/get-all-users.controller";

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

export async function updateMember(
  userId: string,
  input: Partial<ISignUp>,
): Promise<ApiResponse> {
  try {
    // Create a modified schema for updates that makes password optional
    const updateUserSchema = userSchema.partial({ password: true });

    // Input validation with Zod
    const { data, error: inputParseError } = updateUserSchema.safeParse(input);
    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }

    // Get session ID from cookies
    const sessionId = cookies().get(SESSION_COOKIE)?.value;

    // Call controller after validation
    const response = await updateUserController(userId, data, sessionId);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    // Handle different error types
    if (error instanceof InputParseError) {
      return {
        success: false,
        error: "Input validation failed. Invalid data",
      };
    }

    // Generic error handling
    console.error("Update member error:", error);
    return {
      success: false,
      error:
        (error as Error).message || "Unexpected error occurred during update.",
    };
  }
}

export async function getUser(id: string, sessionId: string) {
  try {
    const user = await getUserController(id, sessionId);
    return user;
  } catch (error) {
    throw error;
  }
}
export async function getAllUsers() {
  try {
    const sessionId = cookies().get(SESSION_COOKIE)?.value;
    const user = await getAllUsersController(sessionId);
    return user;
  } catch (error) {
    throw error;
  }
}
