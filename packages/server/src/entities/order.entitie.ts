import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { orders } from "../schemas";

export type Order = InferSelectModel<typeof orders>;

export type NewOrder = InferInsertModel<typeof orders>;

export type OrderColumns = { [K in keyof Order]?: boolean };