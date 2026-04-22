import {body, param, validationResult} from "express-validator";
import {NextFunction, Request, Response } from "express";


export const validateCreateProduct = [
    body("title")
        .notEmpty().withMessage("title is required")
        .trim()
        .isLength({ min: 1}).withMessage("title cannot be empty"),

    (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array()})
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
            res.status(400).json({ errors: errors.array() })
            return
        }
        next()
    }
]