import { z } from "zod";

const orderSchema = z.object({
    client_id: z.string()
        .uuid({ message: "Le client_id doit être un UUID valide" })
        .min(1, { message: "Le client_id est requis" }), 
    price: z.number()
        .min(0.1, { message: "Le prix doit être supérieur ou égal à 0.1" })
        .max(100000, { message: "Le prix doit être inférieur ou égal à 100000" })
        .positive({ message: "Le prix doit être un nombre positif" })
        .finite({ message: "Le prix doit être un nombre valide" }),
});

const orderItemSchema = z.object({
    product_id: z.string()
        .uuid({ message: "Le product_id doit être un UUID valide" })
        .min(1, { message: "Le product_id est requis" }),
    product_quantity: z.number()
        .int({ message: "La quantité doit être un entier" })
        .min(1, { message: "La quantité doit être supérieure ou égale à 1" })
        .max(100000, { message: "La quantité doit être inférieure ou égale à 100000" })
        .positive({ message: "La quantité doit être un nombre positif" })
        .finite({ message: "La quantité doit être un nombre valide" }),
});

export const orderValidation = z.object({
    order: orderSchema,
    orderItemList: z.array(orderItemSchema).min(1, { message: "La liste des articles de commande doit contenir au moins un élément" }),
});