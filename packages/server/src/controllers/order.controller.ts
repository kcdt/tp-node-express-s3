import { Request, Response } from "express";
import logger from "../utils/logger"
import APIResponse from "../utils/response"
import { createOrder, getAllOrders } from "../models/order.model";

export const newOrder = async (request: Request, response: Response) => {
    try {
        const { order, orderItemList } = request.body;

        const { client_id, price } = order;
        const newOrder = { client_id, price: price.toString() };

        await createOrder(newOrder, orderItemList);
        APIResponse(response, order, "Order created", 201);
    } catch (err: any) {
        logger.error(`(Controller) Erreur lors de la création de la commande: ${err.message}`)
        APIResponse(response, null, "Erreur serveur", 500);
    }
};

export const getOrders = async (request: Request, response: Response) => {
    try {
        logger.info("[GET] /orders - Récupérer toutes les commandes");
        const orders = await getAllOrders();

        APIResponse(response, orders, "List of all orders", 200);
    } catch (error: any) {
        logger.error(`Erreur lors de la récupération des commandes: ${error.message}`);
        APIResponse(response, null, error.message, 500);
    }
};