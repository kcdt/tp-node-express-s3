import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authentification.controller";
import { authenticateToken } from "../middleware/authenticate";
import { validateNewUserSchema } from "../middleware/validateSchema";

const router = Router();

// [POST] http://localhost:3000/users/register
router.post('/register', validateNewUserSchema, registerUser);

// [POST] http://localhost:3000/users/login
router.post('/login', loginUser);

// [POST] http://localhost:3000/users/login
router.post('/logout', authenticateToken, logoutUser)

export default router;