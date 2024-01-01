"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientFundsError = void 0;
const BaseError_1 = __importDefault(require("./BaseError"));
class InsufficientFundsError extends BaseError_1.default {
    constructor(description) {
        super("Insufficient Funds", 404, true, description);
    }
}
exports.InsufficientFundsError = InsufficientFundsError;
