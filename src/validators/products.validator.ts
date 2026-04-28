import {body, param, query, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import HttpStatus from "../constants/http-status";

const titleValidation = body("title")
        .notEmpty().withMessage("title is required")
        .trim()
        .isLength({min: 1, max: 30}).withMessage("title must be between 1 and 30 characters")

const queryTitleValidation = query("title")
    .optional()
    .isString().withMessage("title must be a string")
    .trim()
    .isLength({min: 1, max: 30}).withMessage("title must be between 1 and 30 characters")

const idValidation = param("id")
    .isInt({min: 1}).withMessage("id must be a positive integer")

const errorValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({errors: errors.array()})
        return
    }
    next()
}

export const validateGetProducts = [
    queryTitleValidation,
    errorValidation
]

export const validateCreateProduct = [
    titleValidation,
    errorValidation
]

export const validateProductId = [
    idValidation,
    errorValidation
]

export const validateUpdateProduct = [
    idValidation,
    titleValidation,
    errorValidation
]


