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
  private _lucia: Lucia;

  constructor(
    @inject(DI_SYMBOLS.IAuthenticationService)
    private _usersRepository: IUsersRepository,
  ) {
    this._lucia = new Lucia(luciaAdapter, {
      sessionCookie: {
        name: 'auth_session',
        expires: false,
        attributes: {
          secure: process.env.NODE_ENV === "production",
        },
      },
      getUserAttributes: (attributes) => {
        return {
          id: attributes.id,
          name: attributes.firstName + attributes.middleName + attributes.lastName,
          email: attributes.email,
          role: attributes.email
        };
      },
    })
  }

  async validateSession(
    sessionId: string
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

  async createSession(user: User): Promise<{ session: Session; cookie: Cookie }> {
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

  // The validateRequest function now uses getCookie and setCookie methods
  validateRequest = cache(async (): Promise<{ user: User | null; session: Session | null }> => {
    const sessionId = this.getCookie(this._lucia.sessionCookieName);

    if (!sessionId) {
      return { user: null, session: null };
    }

    const { user, session } = await this.validateSession(sessionId);

    try {
      if (session && session.fresh) {
        const sessionCookie = this._lucia.createSessionCookie(session.id);
        this.setCookie(sessionCookie);
      } else if (!session) {
        const sessionCookie = this._lucia.createBlankSessionCookie();
        this.setCookie(sessionCookie);
      }
    } catch {
      // Handle Next.js error for setting cookies when rendering
    }

    return { user, session };
  });


}


declare module 'lucia' {
  interface Register {
    Lucia: Lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  firstName: string,
  middleName: string,
  lastName: string,
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
}