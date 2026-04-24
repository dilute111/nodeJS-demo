import {body, param, query, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import HttpStatus from "../constants/http-status";


export const validateGetProducts = [
    query("title")
        .optional()
        .isString().withMessage("title must be a string")
        .trim()
        .isLength({min: 1}).withMessage("title cannot be empty"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(HttpStatus.BAD_REQUEST).json({errors: errors.array()})
            return
        }
        next()
    }
]

export const validateCreateProduct = [
    body("title")
        .notEmpty().withMessage("title is required")
        .trim()
        .isLength({min: 1}).withMessage("title cannot be empty"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(HttpStatus.BAD_REQUEST).json({errors: errors.array()})
            return
        }
        next()
    }
]

export const validateProductId = [
    param("id")
        .isInt({min: 1}).withMessage("id must be a positive integer"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(HttpStatus.BAD_REQUEST).json({errors: errors.array()})
            return
        }
        next()
    }
]

export const validateUpdateProduct = [
    param("id")
        .isInt({min: 1}).withMessage("id must be a positive integer"),
    body("title")
        .notEmpty().withMessage("title is required")
        .trim()
        .isLength({min: 1}).withMessage("title cannot be empty"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(HttpStatus.BAD_REQUEST).json({errors: errors.array()})
            return
        }
        next()
    }
]


