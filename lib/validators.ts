import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2).max(50),

  phone: z.string().min(7).max(20),

  orderType: z.enum(["pickup", "delivery"]),

  address: z.string().optional(),

  pickupTime: z.string().optional(),

  notes: z.string().optional(),

  subtotal: z.number(),

  deliveryFee: z.number(),

  total: z.number().positive(),

  paymentMethod: z.string(),

  cart: z.array(
    z.object({
      quantity: z.number().int().positive(),
      price: z.number().positive(),
      signature: z.string().optional(),
      protein: z
        .object({
          name: z.string(),
        })
        .optional(),
    })
  ),
});