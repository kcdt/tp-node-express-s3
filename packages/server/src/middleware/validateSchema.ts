import { NextFunction, Request, Response } from "express";
import APIResponse from "../utils/response"
import { orderValidation } from "../validation/order.validation";

export const validateOrderItemsSchema = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { order, orderItemList } = orderValidation.parse(request.body);
        next();
    } catch (err: any) {
        return APIResponse(response, err.errors, "Le formulaire est invalide", 400)
    }
};
