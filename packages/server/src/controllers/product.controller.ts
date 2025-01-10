import { Request, Response } from "express";
import logger from "../utils/logger"
import { z } from "zod";
import APIResponse from "../utils/response"
import { addProduct, getAllProducts, getProductById } from "../models/product.model";
import { productValidation } from "../validation/product.validation";

export const createProduct = async (request: Request, response: Response) => {
    try {
        const { name, price } = productValidation.parse(request.body);

        const newProduct = { name, price: price.toString() };

        await addProduct(newProduct);
        APIResponse(response, newProduct, "User created", 201);
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            return APIResponse(response, err.errors, "Le formulaire est invalide", 400)
        }
        logger.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`)
        APIResponse(response, null, "Erreur serveur", 500);
    }
};

export const getProducts = async (request: Request, response: Response) => {
    try {
        logger.info("[GET] /products - Récupérer tout les produits");
        const products = await getAllProducts();

        APIResponse(response, products, "List of all products", 200);
    } catch (error: any) {
        logger.error(`Erreur lors de la récupération des produits: ${error.message}`);
        APIResponse(response, null, error.message, 500);
    }
};

export const getProduct = async (request: Request, response: Response) => {
    const { id } = request.params;
    const product = await getProductById(id);

    if (product) {
        APIResponse(response, product, "Product found");
    } else {
        APIResponse(response, null, "Product not found", 404);
    }
};