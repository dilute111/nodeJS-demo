import express from "express";
import {clearTestData} from "../controllers/tests.controller";
import {IDbType} from "../types/db";


export const getTestsRouter = (db: IDbType) => {
    const router = express.Router();

    router.delete("/data", (req, res) => clearTestData(req, res, db))

    return router
}