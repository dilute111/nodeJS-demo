import type {IProduct} from "../types";
import {products} from "../db/db";



export const getAllProducts = (title?: string) => {
    if (title) {
        return products
            .filter(p => p.title.toLowerCase().includes(title.toLowerCase()))
    }
    return products
}

export const getProductById = (id: string) => {
    return products.find(p => p.id === +id)
}

export const createProduct = (title: string) => {
    const newProduct: IProduct = {
        id: products.length + 1,
        title: title,
        productCount: 1
    }
    products.push(newProduct)
    return newProduct
}

export const updateProduct = (id: string, title: string) => {
    const queryProduct = products.find(p => p.id === +id)
    if (queryProduct) {
        queryProduct.title = title

        return queryProduct
    }
    return null
}

export const deleteProduct = (id: string) => {
    const index = products.findIndex(p => p.id === +id)
    if (index !== -1) {
        products.splice(index, 1)
        return true
    }
    return false
}

