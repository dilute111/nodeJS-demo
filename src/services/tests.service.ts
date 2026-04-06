import {products} from "../db/db";

export const clearAllProducts = () => {
    products.splice(0, products.length)
}