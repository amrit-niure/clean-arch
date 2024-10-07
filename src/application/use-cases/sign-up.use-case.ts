import { hash } from "@node-rs/argon2";
import { getInjection } from "@/di/container";
import { AuthenticationError } from "@/src/entities/errors/auth";
import { Cookie, Session, User } from "lucia";
import { ISignUp } from "@/src/entities/models/users";


export async function signUpUseCase(input: ISignUp): Promise<{
    session: Session;
    cookie: Cookie;
    user: User;
}> {
    const usersRepository = getInjection("IUsersRepository");
    const user = await usersRepository.getUserByEmail(input.email);
    if (user) {
        throw new AuthenticationError("Email already in use.");
    }
    const hPw = await hash(input.password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    })
    const authenticationService = getInjection("IAuthenticationService");
    console.log("Signup Use case")

    const newUser = await usersRepository.createUser({
        firstName: input.firstName,
        lastName: input.lastName,
        middleName: input?.middleName,
        email: input.email,
        hashedPassword: hPw,
        role: input?.role
    });
    const { cookie, session } = await authenticationService.createSession(newUser) as { cookie: Cookie & { serialize: () => string }, session: Session };

    return {
        cookie,
        session,
        user: {
            id: newUser.id,
            firstName: newUser.firstName,
            middleName: newUser.middleName,
            lastName:  newUser.lastName,
            role: newUser.role,
        }
    };
}


