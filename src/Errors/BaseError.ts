class BaseError extends Error {
    public readonly name: string;
    public readonly statusCode: number;
    public readonly isOperational: boolean;
  
    constructor(name: string, statusCode: number, isOperational: boolean, description: string) {
      super(description);
  
      Object.setPrototypeOf(this, new.target.prototype);
  
      this.name = name;
      this.statusCode = statusCode;
      this.isOperational = isOperational; 
  
      Error.captureStackTrace(this);
    }
  }
  
  export default BaseError;
  