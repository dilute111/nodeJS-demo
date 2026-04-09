import {IDbType, IProduct} from "../types/db";



export const getAllProducts = (title: string | undefined, db: IDbType) => {
    if (title) {
        return db.products
            .filter(p => p.title.toLowerCase().includes(title.toLowerCase()))
    }
    return db.products
}

export const getProductById = (id: string, db: IDbType) => {
    return db.products.find(p => p.id === +id)
}

export const createProduct = (title: string, db: IDbType) => {
    const newProduct: IProduct = {
        id: db.products.length + 1,
        title: title,
        productCount: 1
    }
    db.products.push(newProduct)
    return newProduct
}

export const updateProduct = (id: string, title: string, db: IDbType) => {
    const queryProduct = db.products.find(p => p.id === +id)
    if (queryProduct) {
        queryProduct.title = title

        return queryProduct
    }
    return null
}

export const deleteProduct = (id: string, db: IDbType) => {
    const index = db.products.findIndex(p => p.id === +id)
    if (index !== -1) {
        db.products.splice(index, 1)
        return true
    }
    return false
}

