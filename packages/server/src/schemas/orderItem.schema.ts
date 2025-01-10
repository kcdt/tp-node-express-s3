import { pgTable, uuid } from "drizzle-orm/pg-core";
import { products } from "./products.schema";
import { orders } from "./orders.schema";

export const orderItem = pgTable('orderItem', {
    id: uuid('id').defaultRandom().primaryKey(),
    order_id: uuid("order_id").references(() => orders.id).notNull(),
    product_id: uuid("product_id").references(() => products.id).notNull(),
});