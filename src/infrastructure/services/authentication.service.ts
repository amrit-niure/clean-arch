import { luciaAdapter } from "@/db/drizzle/db";
import { DI_SYMBOLS } from "@/di/types";
import type { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { UnauthenticatedError } from "@/src/entities/errors/auth";
import { inject, injectable } from "inversify";
import { Cookie, Lucia, Session, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  private _lucia;

  constructor(
    @inject(DI_SYMBOLS.IUsersRepository)
    private _usersRepository: IUsersRepository,
  ) {
    this._lucia = new Lucia(luciaAdapter, {
      sessionCookie: {
        name: "auth_session",
        expires: false,
        attributes: {
          secure: process.env.NODE_ENV === "production",
        },
      },
      getUserAttributes: (attributes) => {
        return {
          ...attributes,
        };
      },
    });
  }

  async validateSession(
    sessionId: string,
  ): Promise<{ user: User; session: Session }> {
    const result = await this._lucia.validateSession(sessionId);

    if (!result.user || !result.session) {
      throw new UnauthenticatedError("Unauthenticated");
    }
    const user = await this._usersRepository.getUser(result.user.id);

    if (!user) {
      throw new UnauthenticatedError("User doesn't exist");
    }

    return { user, session: result.session };
  }

  async createSession(
    user: User,
  ): Promise<{ session: Session; cookie: Cookie }> {
    const luciaSession: Session = await this._lucia.createSession(user.id, {});

    const cookie = this._lucia.createSessionCookie(luciaSession.id);

    return { session: luciaSession, cookie };
  }

  async invalidateSession(sessionId: string): Promise<{ blankCookie: Cookie }> {
    await this._lucia.invalidateSession(sessionId);

    const blankCookie = this._lucia.createBlankSessionCookie();

    return { blankCookie };
  }

  // Method to get a cookie by name
  private getCookie(cookieName: string): string | null {
    return cookies().get(cookieName)?.value ?? null;
  }

  // Method to set a cookie
  private setCookie(cookie: Cookie): void {
    cookies().set(cookie.name, cookie.value, cookie.attributes);
  }

  // Updated validateRequest function to avoid async context issues with cookies
  validateRequest = cache(
    async (): Promise<{ user: User | null; session: Session | null }> => {
      // Get the session ID cookie synchronously
      const sessionId = this.getCookie(this._lucia.sessionCookieName);

      if (!sessionId) {
        return { user: null, session: null };
      }

      try {
        // Proceed with async operations after reading the session ID
        const { user, session } = await this.validateSession(sessionId);

        if (session?.fresh) {
          const sessionCookie = this._lucia.createSessionCookie(session.id);
          this.setCookie(sessionCookie);
        } else if (!session) {
          const blankSessionCookie = this._lucia.createBlankSessionCookie();
          this.setCookie(blankSessionCookie);
        }

        return { user, session };
      } catch (error) {
        console.error("Error during session validation:", error);
        return { user: null, session: null };
      }
    },
  );

  async getSession(
    sessionId: string,
  ): Promise<{ user: User | null; session: Session | null }> {
    const result = await this._lucia.validateSession(sessionId);
    if (!result.user || !result.session) {
      return { user: null, session: null };
    }
    const user = await this._usersRepository.getUser(result.user.id);

    if (!user) {
      return { user: null, session: null };
    }
    return { user, session: result.session };
  }
}

declare module "lucia" {
  interface Register {
    Lucia: AuthenticationService["_lucia"];
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export interface DatabaseUserAttributes {
  firstName: string;
  middleName: string | null;
  lastName: string;
  id: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  role: "ADMIN" | "USER";
}
