import { getInjection } from "@/di/container";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "@/src/entities/errors/auth";
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
  try {
    const { user, session } = await authenticationService.validateRequest();

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
