import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { orderItems } from "../schemas";

export type OrderItem = InferSelectModel<typeof orderItems>;

export type NewOrderItem = InferInsertModel<typeof orderItems>;

export type OrderItemColumns = { [K in keyof OrderItem]?: boolean };

export type PartialOrderItem = Omit<OrderItem, "id" | "order_id" >;
