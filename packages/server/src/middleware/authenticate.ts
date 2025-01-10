import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';
import APIResponse from '../utils/response';

const { JWT_SECRET } = env;

export const authenticateToken = (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        if (!token) {
            return APIResponse(response, null, "Accès refusé : token manquant", 403);
        }

        jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
            if (err) {
                return response.status(401).json({ message: 'Token invalide' });
            }

            request.user = user;

            next();
        });
    } catch (err: any) {
        return APIResponse(response, err.errors, "Accès refusé : erreur lors de l'authentification", 400);
    }
};

