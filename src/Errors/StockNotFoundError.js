"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockNotFoundError = void 0;
const BaseError_1 = __importDefault(require("./BaseError"));
class StockNotFoundError extends BaseError_1.default {
    constructor(description) {
        super("StockNotFound", 404, true, description);
    }
}
exports.StockNotFoundError = StockNotFoundError;
