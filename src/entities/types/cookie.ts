import { CookieAttributes} from "lucia";

export interface SessionCookie {
    name: string;
    value: string;
    attributes: CookieAttributes;
}