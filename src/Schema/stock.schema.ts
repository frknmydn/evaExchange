import { z } from 'zod';

export const StockSchema = z.object({
  name: z.string(),
  symbol: z.string()
    .length(3, "Symbol must be exactly 3 characters long")
    .regex(/^[A-Z]+$/, "Symbol must be uppercase"),
  currentPrice: z.number()
    .refine(val => val.toFixed(2) === val.toString(), {
      message: "Price must have exactly 2 decimal places"
    }),
});
