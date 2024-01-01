import BaseError from "./BaseError";

export class InsufficientFundsError extends BaseError {
    constructor(description:string) {
      super("Insufficient Funds", 404, true, description);
      
    }
  }

