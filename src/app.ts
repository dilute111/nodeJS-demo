import type {IProduct} from "./types";
import type {ProductViewModel} from "./models/ProductViewModel";
import express from "express";
import productsRoutes from "./routes/products.routes";

export const app = express()


export const getProductsViewModel = (newProduct: IProduct): ProductViewModel => {
    return {
        id: newProduct.id,
        title: newProduct.title,
    }
}

app.use(express.json())

app.use("/products", productsRoutes)



export default app