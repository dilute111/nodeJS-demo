import express from "express";

import {getTestsRouter} from "./routes/tests.router";
import {getProductsRouter} from "./routes/products.router";
import {db} from "./db/db";
import {getAddressesRouter} from "./routes/clients-addresses.router";

export const app = express()

app.use(express.json())


app.use("/products", getProductsRouter(db))
app.use("/addresses", getAddressesRouter(db))
app.use("/__test__", getTestsRouter(db))



export default app