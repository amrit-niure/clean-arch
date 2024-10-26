import { getInjection } from "@/di/container";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "@/src/entities/errors/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
type Role = "USER" | "ADMIN";

export async function checkAuth(requiredRole: Role = "USER"): Promise<void> {
  const authenticationService = getInjection("IAuthenticationService");

  const { user, session } = await authenticationService.validateRequest();

  if (!session) {
    throw new UnauthenticatedError("Unauthenticated");
  }

  if (!user || user.role !== requiredRole) {
    throw new UnauthorizedError("Unauthorized");
  }
}

// export async function validateServerProtectedRoute() {
//   const authenticationService = getInjection("IAuthenticationService");
//   try {
//     const { user, session } = await authenticationService.validateRequest();

//     if (session === null) {
//       redirect("/signin");
//     }
//     return { user, session };
//   } catch (err) {
//     console.log(err);
//     return { user: null, session: null };
//   }
// }

export async function validateServerProtectedRoute() {
  const authenticationService = getInjection("IAuthenticationService");

  // Retrieve session ID from cookies immediately
  const sessionId = cookies().get("sessionId")?.value;

  // Check if session ID is missing and redirect if needed
  if (!sessionId) {
    redirect("/signin");
  }

  try {
    // Pass the session ID directly to validate the session
    const { user, session } =
      await authenticationService.validateSession(sessionId);

    // Redirect if no session is found
    if (!session) {
      redirect("/signin");
    }

    return { user, session };
  } catch (err) {
    console.log(err);
    return { user: null, session: null };
  }
}

export const validateAdminInServer = async () => {
  const authenticationService = getInjection("IAuthenticationService");

  const { user } = await authenticationService.validateRequest();
  if (user?.role !== "ADMIN") {
    redirect("/");
  }
  return { user };
};
