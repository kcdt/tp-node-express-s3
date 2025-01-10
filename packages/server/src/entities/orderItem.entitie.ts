import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { orderItem } from "../schemas";

export type OrderItem = InferSelectModel<typeof orderItem>;

export type NewOrderItem = InferInsertModel<typeof orderItem>;

export type OrderItemColumns = { [K in keyof OrderItem]?: boolean };