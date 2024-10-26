import { getInjection } from "@/di/container";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "@/src/entities/errors/auth";
import { cookies } from "next/headers";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

export async function validateServerProtectedRoute() {
  const authenticationService = getInjection("IAuthenticationService");

  // Retrieve session ID from cookies immediately or we can also retrive the cookies in layout and send it through parameter to validateServerProtectedRoute
  const sessionId = cookies().get("auth_session")?.value;
  // Check if session ID is missing and redirect if needed
  if (!sessionId) {
    return { user: null, session: null };
  }

  try {
    const { user, session } =
      await authenticationService.validateSession(sessionId);

    if (session === null) {
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
