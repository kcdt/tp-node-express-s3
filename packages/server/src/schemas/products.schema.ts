import { pgTable, uuid, varchar, decimal } from "drizzle-orm/pg-core";

export const products = pgTable('products', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    price: decimal('price').notNull()
});