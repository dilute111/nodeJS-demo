import express from "express";

import {getTestsRouter} from "./routes/tests.routes";
import {getProductsRouter} from "./routes/products.routes";
import {db} from "./db/db";

export const app = express()

app.use(express.json())

const productsRouter = getProductsRouter(db)
const testsRouter = getTestsRouter(db)
app.use("/products", productsRouter)
app.use("/__test__", testsRouter)



export default app