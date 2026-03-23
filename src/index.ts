import express, {type Request, type Response} from "express"
import type {IAddress, IProduct} from "./types/index.js";

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const products: IProduct[] = [
    {id: 1, title: "tomato"},
    {id: 2, title: "orange"},
]
const addresses: IAddress[] = [
    {id: 1, value: "Nezalejnasti 12"},
    {id: 2, value: "Selickaga 11"},
]
// Получить данные
app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello World!.EU!';
    res.send(helloMessage)
})

app.get('/products', (req: Request, res: Response) => {
    const title = req.query.title
    if (title && typeof title === "string") {
        res.json(products.filter(p => p.title.toLowerCase().includes(title.toLowerCase())))
    } else {
        res.json(products)
    }
})
app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) {
        res.sendStatus(400)
        return
    }
    const queryProduct = products.find(p => p.id === +id)
    if (!queryProduct) {
        res.sendStatus(404)
        return
    }
    res.json(queryProduct)
})
app.get('/addresses', (req: Request, res: Response) => {
    res.json(addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) {
        res.sendStatus(400)
        return
    }
    const queryAddress = addresses.find(a => a.id === +id)
    if (!queryAddress) {
        res.sendStatus(404)
        return
    }
    res.json(queryAddress)
})
// Удалить данные
app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) {
        res.sendStatus(400)
        return
    } else {
        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            if (product && product.id === +id) {
                products.splice(i, 1)
                res.sendStatus(204)
                return
            }
        }
    }
    res.sendStatus(404)
})
// Установить данные
app.post('/products', (req: Request, res: Response) => {
    const newProduct: IProduct = {
        id: products.length + 1,
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
})
// Обновить данные
app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) {
        res.sendStatus(400)
        return
    }
    const queryProduct = products.find(p => p.id === +id)
    if (!queryProduct) {
        res.sendStatus(404)
        return
    } else {
        queryProduct.title = req.body.title
        res.status(201).json(queryProduct)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})