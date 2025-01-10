import { Router } from "express";
import { newOrder, getOrders, getOrder } from "../controllers/order.controller";
import { validateNewOrderSchema } from "../middleware/validateSchema";
import { authenticateToken } from "../middleware/authenticate";

const router = Router();

// [POST] http://localhost:3000/order
router.post('/', authenticateToken, validateNewOrderSchema, newOrder);

// [GET] http://localhost:3000/order
router.get('/', getOrders);

// [GET] http://localhost:3000/order/:id
router.get('/:id', getOrder);

export default router;