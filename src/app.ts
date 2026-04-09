import express from "express";

import {addTestsRoutes} from "./routes/tests.routes";
import {getProductsRoutes} from "./routes/products.routes";
import {db} from "./db/db";

export const app = express()

app.use(express.json())

const productsRouter = getProductsRoutes(db)
app.use("/products", productsRouter)

addTestsRoutes(app)

export default app