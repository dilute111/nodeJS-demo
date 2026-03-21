import express, {type Request, type Response} from "express"

const app = express()
const port = process.env.PORT || 3000

const products = [
    {id: 1, title: "tomato"},
    {id: 2, title: "orange"},
]
const addresses = [
    {id: 1, value: "Nezalejnasti 12"},
    {id: 2, value: "Selickaga 11"},
]

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

app.delete('/products/:id', (req: Request, res: Response) => {
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})