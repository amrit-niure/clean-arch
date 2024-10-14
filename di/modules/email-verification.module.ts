import { ContainerModule, interfaces } from "inversify";

import { IEmailVerificationCodeRepository } from "@/src/application/repositories/email-verification-code.interface";
import { EmailVerificationCodeRepository } from "@/src/infrastructure/repositories/email-verification-code.repository";

import { DI_SYMBOLS } from "../types";

const initializeModule = (bind: interfaces.Bind) => {

  bind<IEmailVerificationCodeRepository>(DI_SYMBOLS.IEmailVerificationCodeRepository).to(
    EmailVerificationCodeRepository,
  );
};

export const EmailVerificationCodeModule = new ContainerModule(initializeModule);
