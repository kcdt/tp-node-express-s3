import { Request, Response } from "express";
import logger from "../utils/logger"
import APIResponse from "../utils/response"
import { createOrder, getAllOrders, getOrderById } from "../models/order.model";

export const newOrder = async (request: Request, response: Response) => {
    try {
        logger.info("[POST] /order - Ajouter une commande");
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
        logger.info("[GET] /order - Récupérer toutes les commandes");
        const orders = await getAllOrders();

        APIResponse(response, orders, "List of all orders", 200);
    } catch (error: any) {
        logger.error(`Erreur lors de la récupération des commandes: ${error.message}`);
        APIResponse(response, null, error.message, 500);
    }
};

export const getOrder = async (request: Request, response: Response) => {
    try {
        logger.info("[GET] /order - Récupérer une commande par id");
        const { id } = request.params;
        const order = await getOrderById(id);

        APIResponse(response, order, "order found");
    } catch (error: any) {
        logger.error(`Erreur lors de la récupération des commandes: ${error.message}`);
        APIResponse(response, null, error.message, 500);
    }
};