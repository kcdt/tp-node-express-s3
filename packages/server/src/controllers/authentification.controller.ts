import { Request, Response } from "express";
import { addUser, getUserByEmail } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import logger from "../utils/logger"
import APIResponse from "../utils/response"
import { env } from '../config/env';
import { userValidation } from "../validation/users.validation";

const { JWT_SECRET } = env;

export const registerUser = async (request: Request, response: Response) => {
    try {
        const { username, password, email } = userValidation.parse(request.body);
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = { username, email, password: hashedPassword };

        await addUser(newUser);
        APIResponse(response, newUser, "User created", 201);
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            return APIResponse(response, err.errors, "Le formulaire est invalide", 400)
        }
        logger.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`)
        APIResponse(response, null, "Erreur serveur", 500);
    }
};

export const loginUser = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return APIResponse(response, null, "Email et mot de passe sont requis", 400);
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return APIResponse(response, null, "Utilisateur non trouvé", 404);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return APIResponse(response, null, "Mot de passe incorrect", 401);
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        response.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000, // 1 heure
        });

        return APIResponse(response, token, "Connexion réussie", 200);
    } catch (error: any) {
        console.error("Erreur lors de la connexion :", error);
        return APIResponse(response, null, "Erreur interne lors de la connexion", 500);
    }
};

export const logoutUser = (request: Request, response: Response) => {
    response.clearCookie('accessToken');
    APIResponse(response, null, "Vous êtes déconnecté", 200);
}