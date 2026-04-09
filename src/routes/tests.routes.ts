import {Express} from "express";
import {clearTestData} from "../controllers/tests.controller";


export const addTestsRoutes = (app: Express) => {
    app.delete("/__test__/data", clearTestData)
}