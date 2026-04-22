import express, {NextFunction, type Request, type Response} from "express";

import {getTestsRouter} from "./routes/tests.router";
import {getProductsRouter} from "./routes/products.router";
import {db} from "./db/db";
import {getAddressesRouter} from "./routes/clients-addresses.router";

export const app = express()

export let requestCounter = 0
const requestCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    requestCounter++
    next()
}
app.use(requestCounterMiddleware)

app.use(express.json())

//const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
//    if (req.query.token === "123") {
//        next()
//    } else {
//        res.sendStatus(401)
//    }
//}

app.get("/stats", (req, res) => {
    res.json({
        totalRequests: requestCounter,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    })
})

//app.use("/products", authGuardMiddleware)
app.use("/products", getProductsRouter(db))
app.use("/addresses", getAddressesRouter(db))
app.use("/__test__", getTestsRouter(db))



export default app