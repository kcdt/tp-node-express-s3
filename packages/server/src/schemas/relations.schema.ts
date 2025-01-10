import { relations } from "drizzle-orm";
import { users, products, orders, orderItem } from ".";

export const usersRelations = relations(users, ({ many }) => ({
    orders: many(orders),
}))

export const ordersRelations = relations(orders, ({ many }) => ({
    orderItem: many(orderItem),
}))

export const orderItemRelations = relations(orderItem, ({ one }) =>  ({
    orders: one(orders, {
        fields: [orderItem.order_id],
        references: [orders.id]
    }),
    
    products: one(products, {
        fields: [orderItem.product_id],
        references: [products.id]
    })
}));