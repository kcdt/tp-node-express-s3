import { Router } from "express";
import { createProduct, getProducts, getProduct } from "../controllers/product.controller";

const router = Router();

// [POST] http://localhost:3000/product
router.post('/', createProduct);

// [GET] http://localhost:3000/product
router.get('/', getProducts);

// [GET] http://localhost:3000/product/:id
router.get('/:id', getProduct);

export default router;