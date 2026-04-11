import type {Request, Response} from "express";
import * as testsService from "../services/tests.service";
import {IDbType} from "../types/db";

export const clearTestData = (req: Request, res: Response, db: IDbType) => {
    testsService.clearAllProducts(db)
    res.sendStatus(204)
}