import { Router } from "express";
import { newOrder, getOrders } from "../controllers/order.controller";

const router = Router();

// [POST] http://localhost:3000/order
router.post('/', newOrder);

// [GET] http://localhost:3000/order
router.get('/', getOrders);

export default router;