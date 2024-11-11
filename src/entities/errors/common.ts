export class DatabaseOperationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class NotFoundError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class InputParseError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}
export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserNotFoundError";
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
