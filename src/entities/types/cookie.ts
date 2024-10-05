import { CookieAttributes} from "lucia";

export interface Cookie {
    name: string;
    value: string;
    attributes: CookieAttributes;
}