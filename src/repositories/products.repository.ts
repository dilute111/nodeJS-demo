import {IDbType, IProduct} from "../types/db";


export const productsRepository = (db: IDbType) => ({
    findProduct: (id: number) => db.products.find(p => p.id === +id),
    findProducts: (title: string | undefined) => {
        if (title) {
            return db.products.filter(p =>
                p.title.toLowerCase().includes(title.toLowerCase()))
        } else {
            return db.products
        }
    },
    createProduct: (title: string) => {
        const newProduct: IProduct = {
            id: db.products.length + 1,
            title: title,
            productCount: 1
        }
        db.products.push(newProduct)
        return newProduct
    },
    updateProduct: (id: number, title: string) => {
        const product = db.products.find(p => p.id === +id)
        if (product) {
            product.title = title
            return product
        } else {
            return null
        }

    },
    deleteProduct: (id: number) => {
        const index = db.products.findIndex(p => p.id === +id)
        if (index !== -1) {
            db.products.splice(index, 1)
            return true
        }
        return false
    }

})