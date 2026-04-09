import express from "express";
import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductsById,
    updateProduct
} from "../controllers/products.controller";
import {IDbType} from "../types/db";


export const getProductsRoutes = (db: IDbType) => {

    const productsRouter = express.Router()

// GET
    productsRouter.get('/', (req, res) =>  getProducts(req, res, db))
    productsRouter.get('/:id', (req, res) =>  getProductsById(req, res, db))

// POST
    productsRouter.post('/', (req, res) =>  createProduct(req, res, db))

// PUT
    productsRouter.put('/:id', (req, res) =>  updateProduct(req, res, db))

// DELETE
    productsRouter.delete('/:id', (req, res) =>  deleteProduct(req, res, db))

    return productsRouter
}
