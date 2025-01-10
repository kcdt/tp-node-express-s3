import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { orderItems, orders } from "../schemas";
import { Order, NewOrder, OrderColumns } from "../entities/order.entitie";
import logger from "../utils/logger";
import { NewOrderItem, PartialOrderItem } from "../entities/orderItem.entitie";

export const createOrderItem = async (orderItem: NewOrderItem) => {
    try {
        return await db.insert(orderItems).values(orderItem).returning({ id: orderItems.id }).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la création de orderItem ${JSON.stringify(orderItem)}: ${err.message}`);
        throw new Error("Impossible de créer orderItem");
    }
};

export const pushOrder = async (order: NewOrder): Promise<string> => {
    try {
        const result = await db.insert(orders).values(order).returning({ id: orders.id }).execute();
        if (!result[0]?.id) {
            throw new Error("Aucun ID retourné pour la commande créée");
        }
        return result[0].id;
    } catch (err: any) {
        logger.error(`Erreur lors de la création de la commande ${JSON.stringify(order)}: ${err.message}`);
        throw new Error("Impossible de créer la commande");
    }
};

export const createOrder = async (order: NewOrder, orderItems: PartialOrderItem[]) => {
    try {
        const orderId = await pushOrder(order);
        await Promise.all(
            orderItems.map(async (partialOrderItem) => {
                try {
                    const { product_id, product_quantity } = partialOrderItem;
                    const orderItem = { order_id: orderId, product_id, product_quantity };
                    await createOrderItem(orderItem);
                } catch (err: any) {
                    logger.error(`Erreur lors de la création de l'orderItem ${JSON.stringify(partialOrderItem)}: ${err.message}`);
                    throw err;
                }
            })
        );
        return orderId;
    } catch (err: any) {
        logger.error(`Erreur lors de la création de la commande ${JSON.stringify(order)}: ${err.message}`);
        throw new Error("Impossible de créer la commande");
    }
};

export const getAllOrders = (): Promise<object> => {
    try {
        return db.select({
            id: orders.id,
            client_id: orders.client_id,
            status: orders.status,
            price: orders.price,
            created_at: orders.created_at,
            orderItem: {
                id: orderItems.id,
                product_id: orderItems.product_id,
                product_quantity: orderItems.product_quantity
            }
        }).from(orders)
        .leftJoin(
            orderItems, eq(orderItems.order_id, orders.id)
        ).execute();
    } catch(err: any) {
        logger.error(`Erreur lors de la récupération des commandes: ${err.message}`);
        throw new Error("Impossible de récupérer les commandes")
    }
}

export const getOrderById = (id: string) => {
    try {
        return db.query.orderItems.findMany({
            where: eq(orderItems.order_id, id),
            columns: {
                id: true,
                order_id: true,
                product_id: true,
                product_quantity: true,
            },
        });
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération de la commande; ${err.message}`);
        throw new Error("Impossible de récupérer la commande")
    }
};
