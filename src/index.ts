import express, {type Request, type Response} from "express"
import type {
    IAddress,
    IProduct,
    RequestBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery
} from "./types";
import type {CreateProductModel} from "./models/CreateProductModel";
import type {UpdateProductModel} from "./models/UpdateProductModel";
import type {QueryProductsModel} from "./models/QueryProductsModel";
import type {ProductViewModel} from "./models/ProductViewModel";
import type {URIParamsProductIdModel} from "./models/URIParamsProductIdModel";

export const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

export const products: IProduct[] = [
    {id: 1, title: "tomato", productCount: 7},
    {id: 2, title: "orange", productCount: 10},
]
export const addresses: IAddress[] = [
    {id: 1, value: "Nezalejnasti 12"},
    {id: 2, value: "Selickaga 11"},
]
// Получить данные
app.get('/', (req: Request,
              res: Response<string>) => {
    let helloMessage = 'Hello World!';
    res.send(helloMessage)
})

app.get('/products', (req: RequestWithQuery<QueryProductsModel>,
                      res: Response<ProductViewModel[]>) => {
    const title = req.query.title
    let filteredProducts = products
    if (title) {
        filteredProducts = products
            .filter(p => p.title.toLowerCase().includes(title.toLowerCase()))
    }
        res.json(filteredProducts.map(p => {
            return {
                id: p.id,
                title: p.title
            }
        }))
})
app.get('/products/:id', (req: RequestWithParams<URIParamsProductIdModel>,
                          res: Response<ProductViewModel>) => {
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
    res.json( {
        id: queryProduct.id,
        title: queryProduct.title,
    })
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
// Установить данные
app.post('/products', (req: RequestBody<CreateProductModel>,
                       res: Response<ProductViewModel>) => {
    if (!req.body.title) {
        res.sendStatus(400)
        return
    }
    const newProduct: IProduct = {
        id: products.length + 1,
        title: req.body.title,
        productCount: 1
    }
    products.push(newProduct)
    res.status(201).json({
        id: newProduct.id,
        title: newProduct.title,
    })
})
// Обновить данные
app.put('/products/:id', (req: RequestWithParamsAndBody<URIParamsProductIdModel, UpdateProductModel>,
                          res: Response<ProductViewModel | {error: string}>) => {
    const id = req.params.id
    if (!id || !req.body.title) {
        res.sendStatus(400)
        return
    }
    const queryProduct = products.find(p => p.id === +id)
    if (!queryProduct) {
        res.sendStatus(404)
        return
    } else {
        queryProduct.title = req.body.title
        res.status(200).json(queryProduct)
    }
})
// Удалить данные
app.delete('/products/:id', (req: RequestWithParams<URIParamsProductIdModel>, res: Response) => {
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
app.delete("/__test__/data", (req, res) => {
    products.splice(0, products.length)
    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})