import { pgTable, pgEnum, uuid, decimal, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schema";

export const orderStatusEnum = pgEnum("order_status", [
    "pending",    // Commande en attente de traitement
    "processing", // Commande en cours de traitement
    "shipped",    // Commande expédiée
    "delivered",  // Commande livrée
    "cancelled",  // Commande annulée
    "refunded"    // Commande remboursée
]);

export const orders = pgTable('orders', {
    id: uuid('id').defaultRandom().primaryKey(),
    client_id: uuid("client_id").references(() => users.id).notNull(),
    status: orderStatusEnum().default("pending"),
    price: decimal('price').notNull(),
    created_at: timestamp().defaultNow().notNull(),
});