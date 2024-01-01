import BaseError from './BaseError';

export class UserNotFoundError extends BaseError {
  constructor(description: string) {
    super("UserNotFoundError", 404, true, description);
  }
}
