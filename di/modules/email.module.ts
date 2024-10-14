import { ContainerModule, interfaces } from "inversify";

import { IEmailService } from "@/src/application/services/email.service.interface";
import { EmailService } from "@/src/infrastructure/services/email.service";


import { DI_SYMBOLS } from "../types";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IEmailService>(DI_SYMBOLS.IEmailService).to(
    EmailService,
  );
};

export const EmailModule = new ContainerModule(initializeModule);
