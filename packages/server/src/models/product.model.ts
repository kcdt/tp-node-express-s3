import { db } from "../config/pool";
import { eq } from "drizzle-orm";
import { products } from "../schemas";
import { Product, NewProduct, ProductColumns } from "../entities/product.entitie";
import logger from "../utils/logger";

export const getAllProducts = (): Promise< Partial<Product>[]> => {
    try {
        return db.query.products.findMany({
            columns: {
                id: true,
                name: true,
                price: true
            }
        });
    } catch(err: any) {
        logger.error(`Erreur lors de la récupération des produits: ${err.message}`);
        throw new Error("Impossible de récupérer les produits")
    }
}

export const getProductById = (id: string) => {
    try {
        return db.query.products.findFirst({
            where: eq(products.id, id),
            columns: {
                id: true,
                name: true,
                price: true
            },
        });
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération du produit; ${err.message}`);
        throw new Error("Impossible de récupérer le produit")
    }
};

export const addProduct = (product: NewProduct) => {
    try {
        return db.insert(products).values(product).returning({ id: products.id }).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la création du produit; ${err.message}`);
        throw new Error("Impossible de créer le produit")
    }
};