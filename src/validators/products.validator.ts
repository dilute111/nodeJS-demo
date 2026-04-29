import {body, param, query} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

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



export const validateGetProducts = [
    queryTitleValidation,
    inputValidationMiddleware
]

export const validateCreateProduct = [
    titleValidation,
    inputValidationMiddleware
]

export const validateProductId = [
    idValidation,
    inputValidationMiddleware
]

export const validateUpdateProduct = [
    idValidation,
    titleValidation,
    inputValidationMiddleware
]


