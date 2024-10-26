import { signOutUseCase } from "@/src/application/use-cases/auth/sign-out.use-case";

export async function signOutController(sessionId: string) {
  await signOutUseCase(sessionId);
}
