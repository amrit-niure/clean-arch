import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { IEmailService } from "@/src/application/services/email.service.interface";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  IEmailService: Symbol.for("IEmailService"),

  //Repositories
  IUsersRepository: Symbol.for("IUsersRepository"),
  IEmailVerificationCodeRepository: Symbol.for(
    "IEmailVerificationCodeRepository",
  ),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;
  IEmailService: IEmailService;

  //Repositories
  IUsersRepository: IUsersRepository;
}
