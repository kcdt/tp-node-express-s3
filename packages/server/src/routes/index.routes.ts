import { Router } from 'express';

import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";

const router = Router();

// http://localhost:3000/users
router.use('/users', userRoutes);

// http://localhost:3000/auth
router.use('/auth', authRoutes);

// http://localhost:3000/product
router.use('/product', productRoutes);

router.get('/');

export default router;