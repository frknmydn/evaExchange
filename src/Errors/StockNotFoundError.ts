import BaseError from "./BaseError";

export class StockNotFoundError extends BaseError {
    constructor(description:string) {
      super("StockNotFound", 404, true, description);
    }
  }