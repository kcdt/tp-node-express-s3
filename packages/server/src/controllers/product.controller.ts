import { Request, Response } from "express";
import logger from "../utils/logger"
import { z } from "zod";
import APIResponse from "../utils/response"
import { addProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from "../models/product.model";
import { productValidation } from "../validation/product.validation";

export const createProduct = async (request: Request, response: Response) => {
    try {
        logger.info("[POST] /product - Ajouter un produit");
        const { name, price } = productValidation.parse(request.body);

        const newProduct = { name, price: price.toString() };

        await addProduct(newProduct);
        APIResponse(response, newProduct, "Product created", 201);
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            return APIResponse(response, err.errors, "Le formulaire est invalide", 400)
        }
        logger.error(`Erreur lors de la création du produit: ${err.message}`)
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
    logger.info("[GET] /products - Récupérer un produit par id");
    const { id } = request.params;
    const product = await getProductById(id);

    if (product) {
        APIResponse(response, product, "Product found");
    } else {
        logger.error(`Erreur lors de la récupération du produit`);
        APIResponse(response, null, "Product not found", 404);
    }
};

export const updateProduct = async (request: Request, response: Response) => {
    logger.info("[UPDATE] /products - Modifier un produit");

    const { id } = request.params;

    try {
        const product = await updateProductById(id, request.body)

        APIResponse(response, product, "Product updated");
    } catch (error: any) {
        logger.error(`Erreur lors de la modification du produit: ${error.message}`);
        APIResponse(response, null, error.message, 500);
    }
};

export const deleteProduct = async (request: Request, response: Response) => {
    logger.info("[DELETE] /products - Supprimer un produit");

    const { id } = request.params;

    try {
        const product = await deleteProductById(id)

        APIResponse(response, product, "Product deleted");
    } catch (error: any) {
        logger.error(`Erreur lors de la suppression du produit: ${error.message}`);
        APIResponse(response, null, error.message, 500);
    }
};