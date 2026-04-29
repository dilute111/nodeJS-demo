import {NextFunction, Request, Response} from 'express';
import {validationResult} from "express-validator";
import HttpStatus from "../constants/http-status";

export const inputValidationMiddleware = (req: Request,
                                          res: Response,
                                          next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({errors: errors.array()})

    } else {
        next()
    }

}