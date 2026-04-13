import {IDbType, IProduct} from "../types/db";
import {productsRepository} from "../repositories/products.repository";


export const createProductsService = (db: IDbType) => {

    const repo = productsRepository(db)

    return {
        getAllProducts: (title: string | undefined) => {
            const products = repo.findAllProducts()
            if (title) {
                return products.filter(p =>
                    p.title.toLowerCase().includes(title.toLowerCase()))
            }
            return products
        },

        getProductById: (id: string) => {
            return repo.findProduct(+id)
        },

        createProduct: (title: string) => {
            const newProduct: IProduct = {
                id: db.products.length + 1,
                title: title,
                productCount: 1
            }
            return repo.createProduct(newProduct)
        },

        updateProduct: (id: string, title: string) => {
            return repo.updateProduct(+id, title)
        },

        deleteProduct: (id: string) => {
            return repo.deleteProduct(+id)
        },
    }
}