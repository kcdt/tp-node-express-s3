import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authentification.controller";

const router = Router();

// [POST] http://localhost:3000/users/register
router.post('/register', registerUser);

// [POST] http://localhost:3000/users/login
router.post('/login', loginUser);

// [POST] http://localhost:3000/users/login
router.post('/logout', logoutUser)

export default router;