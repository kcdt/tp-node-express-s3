import { NextFunction, Request, Response } from "express";
import APIResponse from "../utils/response"
import { orderValidation } from "../validation/order.validation";
import { userValidation } from "../validation/users.validation";
import { productValidation } from "../validation/product.validation";

export const validateNewOrderSchema = (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body = orderValidation.parse(request.body);
        next();
    } catch (err: any) {
        return APIResponse(response, err.errors, "Le formulaire est invalide", 400)
    }
};

export const validateNewUserSchema = (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body = userValidation.parse(request.body);
        next();
    } catch (err: any) {
        return APIResponse(response, err.errors, "Le formulaire est invalide", 400)
    }
};

export const validateProductSchema = (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body = productValidation.parse(request.body);
        next();
    } catch (err: any) {
        return APIResponse(response, err.errors, "Le formulaire est invalide", 400)
    }
};