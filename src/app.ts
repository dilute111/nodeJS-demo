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

/* TODO: вынести логику авторизации по токену во что-то реально работоспособное
    Сейчас используется упрощенная проверка ?token=123
    План:
    1. Создать эндпоинт POST /login для получения токена
    2. Сохранять токен на клиенте (localStorage)
    3. Передавать токен в заголовке Authorization
    4. Проверять токен через middleware
    Пример использования на фронте:
    localStorage.setItem('token', 'my-token')
    fetch(url, { headers: { 'Authorization': localStorage.getItem('token') } })
*/
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