import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { products } from "./products.schema";
import { orders } from "./orders.schema";

export const orderItems = pgTable('orderItem', {
    id: uuid('id').defaultRandom().primaryKey(),
    order_id: uuid("order_id").references(() => orders.id).notNull(),
    product_id: uuid("product_id").references(() => products.id).notNull(),
    product_quantity: integer("product_quantity").notNull().default(1),
});