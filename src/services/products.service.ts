import {IDbType} from "../types/db";
import {productsRepository} from "../repositories/products.repository";


export const createProductsService = (db: IDbType) => {

    const repo = productsRepository(db)

    return {
        getAllProducts: (title: string | undefined) =>  repo.findProducts(title),

        getProductById: (id: string) =>  repo.findProduct(+id),

        createProduct: (title: string) =>  repo.createProduct(title),

        updateProduct: (id: string, title: string) =>  repo.updateProduct(+id, title),

        deleteProduct: (id: string) =>  repo.deleteProduct(+id),

    }
}