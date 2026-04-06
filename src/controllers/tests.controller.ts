import type {Request, Response} from "express";
import * as testsService from "../services/tests.service";

export const clearTestData = (req: Request, res: Response) => {
    testsService.clearAllProducts()
    res.sendStatus(204)
}