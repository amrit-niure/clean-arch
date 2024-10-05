import { Session, User } from "lucia";

export interface SessionProviderProps {
    user: User | null,
    session: Session | null,
}