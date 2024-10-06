
import { getInjection } from "@/di/container";
import { User } from 'lucia' // this user type has no type safety . it should have all the attributes i have returned form getAttributes function from \src\infrastructure\services\authentication.service.ts
export async function validateServerProtectedRoute() {
  const authenticationService = getInjection("IAuthenticationService");

  const { user, session } = await authenticationService.validateRequest()
  // check the type safety here user.role or user.email 
  // console.log(user.)
  // if (!session) {
  //   redirect('/signin');
  // }
  return { user, session };
}