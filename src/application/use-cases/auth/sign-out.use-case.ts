import { getInjection } from "@/di/container";

export async function signOutUseCase(sessionId: string) {
  const authenticationService = getInjection("IAuthenticationService");
  return await authenticationService.invalidateSession(sessionId);
}
