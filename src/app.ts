import express from "express";

import {getTestsRouter} from "./routes/tests.routes";
import {getProductsRouter} from "./routes/products.routes";
import {db} from "./db/db";

export const app = express()

app.use(express.json())


app.use("/products", getProductsRouter(db))
app.use("/__test__", getTestsRouter(db))



export default app