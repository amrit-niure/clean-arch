import { hash } from "@node-rs/argon2";
import { getInjection } from "@/di/container";
import { AuthenticationError } from "@/src/entities/errors/auth";
import { User } from "lucia";
import { ISignUp } from "@/src/entities/models/users";
import { DatabaseOperationError } from "@/src/entities/errors/common";

export async function signUpUseCase(input: ISignUp): Promise<{ user: User }> {
    const usersRepository = getInjection("IUsersRepository");
    
    const HASH_CONFIG = {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    };

    try {
        const user = await usersRepository.getUserByEmail(input.email);
        if (user) {
            throw new AuthenticationError("Email already in use.");
        }

        const hPw = await hash(input.password, HASH_CONFIG);

        const newUser = await usersRepository.createUser({
            firstName: input.firstName,
            lastName: input.lastName,
            middleName: input?.middleName,
            email: input.email,
            hashedPassword: hPw,
            role: input?.role || 'user',
        });

        return {
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                middleName: newUser.middleName,
                lastName: newUser.lastName,
                email: newUser.email,
                emailVerified: newUser.emailVerified,
                role: newUser.role,
            }
        };
    } catch (err) {
        if (err instanceof DatabaseOperationError) {
            throw new Error("Failed to create the user due to a database error.");
        }
        throw err;
    }
}
