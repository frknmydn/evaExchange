import { z } from 'zod';

export const StockSchema = z.object({
  name: z.string(),
  symbol: z.string()
    .length(3, "Symbol must be exactly 3 characters long")
    .regex(/^[A-Z]+$/, "Symbol must be uppercase"),
    currentPrice: z.number()
    .refine(val => {
      const stringVal = val.toString();
      const decimalPart = stringVal.includes('.') ? stringVal.split('.')[1] : '';
      return decimalPart.length <= 2; // Allow up to two decimal places
    }, {
      message: "Price can have up to 2 decimal places"
    }),
});
