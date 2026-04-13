import {IDbType, IProduct} from "../types/db";


export const productsRepository = (db: IDbType) => ({
    findProduct: (id: number) => db.products.find(p => p.id === +id),
    findAllProducts: () => db.products,
    createProduct: (product: IProduct) => {
        db.products.push(product)
        return product
    },
    updateProduct: (id: number, title: string) => {
        const product = db.products.find(p => p.id === +id)
        if (product) {
            product.title = title
            return product
        }
        return null
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