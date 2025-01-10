import { relations } from "drizzle-orm";
import { users, products, orders, orderItems } from ".";

export const usersRelations = relations(users, ({ many }) => ({
    orders: many(orders),
}))

export const ordersRelations = relations(orders, ({ many }) => ({
    orderItem: many(orderItems),
}))

export const orderItemRelations = relations(orderItems, ({ one }) =>  ({
    orders: one(orders, {
        fields: [orderItems.order_id],
        references: [orders.id]
    }),
    
    products: one(products, {
        fields: [orderItems.product_id],
        references: [products.id]
    })
}));