import express from "express";
import productsRoutes from "./routes/products.routes";
import {addTestsRoutes} from "./routes/tests";

export const app = express()


app.use(express.json())

app.use("/products", productsRoutes)
addTestsRoutes(app)

export default app