"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockSchema = void 0;
const zod_1 = require("zod");
exports.StockSchema = zod_1.z.object({
    name: zod_1.z.string(),
    symbol: zod_1.z.string()
        .length(3, "Symbol must be exactly 3 characters long")
        .regex(/^[A-Z]+$/, "Symbol must be uppercase"),
    currentPrice: zod_1.z.number()
        .refine(val => {
        const stringVal = val.toString();
        const decimalPart = stringVal.includes('.') ? stringVal.split('.')[1] : '';
        return decimalPart.length <= 2; // Allow up to two decimal places
    }, {
        message: "Price can have up to 2 decimal places"
    }),
});
