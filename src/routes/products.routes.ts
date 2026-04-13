import express from "express";
import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductsById,
    updateProduct
} from "../controllers/products.controller";
import {IDbType} from "../types/db";
import {createProductsService} from "../services/products.service";


export const getProductsRouter = (db: IDbType) => {

    const router = express.Router()
    const productsService = createProductsService(db)

// GET
    router.get('/', (req, res) =>  getProducts(req, res, productsService))
    router.get('/:id', (req, res) =>  getProductsById(req, res, productsService))

// POST
    router.post('/', (req, res) =>  createProduct(req, res, productsService))

// PUT
    router.put('/:id', (req, res) =>  updateProduct(req, res, productsService))

// DELETE
    router.delete('/:id', (req, res) =>  deleteProduct(req, res, productsService))

    return router
}
