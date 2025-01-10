import { Router } from "express";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/product.controller";
import { validateProductSchema } from "../middleware/validateSchema";
import { authenticateToken } from "../middleware/authenticate";

const router = Router();

// [POST] http://localhost:3000/product
router.post('/', validateProductSchema, createProduct);

// [GET] http://localhost:3000/product
router.get('/', getProducts);

// [GET] http://localhost:3000/product/:id
router.get('/:id', getProduct);

// [PATCH] http://localhost:3000/product/:id
router.patch('/:id', validateProductSchema, updateProduct);

// [DELETE] http://localhost:3000/product/id
router.delete('/:id', authenticateToken ,deleteProduct);

export default router;