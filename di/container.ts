import { Container } from "inversify";

import { AuthenticationModule } from "./modules/authentication.module";
import { EmailModule } from "./modules/email.module";

import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { UsersModule } from "./modules/users.module";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = () => {
  ApplicationContainer.load(AuthenticationModule);
  ApplicationContainer.load(UsersModule);
  ApplicationContainer.load(EmailModule);
};

export const destroyContainer = () => {
  ApplicationContainer.unload(AuthenticationModule);
  ApplicationContainer.unload(UsersModule);
  ApplicationContainer.unload(EmailModule);
};

if (process.env.NODE_ENV !== "test") {
  initializeContainer();
}

export function getInjection<
  K extends keyof typeof DI_SYMBOLS & keyof DI_RETURN_TYPES,
>(symbol: K): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
