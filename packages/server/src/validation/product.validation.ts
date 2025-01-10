import { z } from "zod";

export const productValidation = z.object({
    name: z.string().min(1, { message: "Le nom est requis"}),
    price: z.number().int().positive().min(0.01, { message: "Le prix est requis"})
});