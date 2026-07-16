import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2).max(50),

  phone: z.string().min(7).max(20),

  email: z.string().email(),

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
      id: z.string().optional(),

      quantity: z.number().int().positive(),

      price: z.number().positive(),

      signature: z.string().optional(),

      bases: z
        .array(
          z.object({
            id: z.string(),
            name: z.string(),
            price: z.number(),
          })
        )
        .optional(),

      proteins: z
        .array(
          z.object({
            id: z.string(),
            name: z.string(),
            price: z.number(),
          })
        )
        .optional(),

      sauce: z
        .object({
          id: z.string(),
          name: z.string(),
          price: z.number(),
        })
        .nullable()
        .optional(),

      toppings: z.array(z.string()).optional(),

      baseMode: z.string().optional(),

      proteinMode: z.string().optional(),
    })
  ),
});