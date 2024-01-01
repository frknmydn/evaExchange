"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const BaseError_1 = __importDefault(require("./BaseError"));
class UserNotFoundError extends BaseError_1.default {
    constructor(description) {
        super("UserNotFoundError", 404, true, description);
    }
}
exports.UserNotFoundError = UserNotFoundError;
