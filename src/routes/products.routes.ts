import express from "express";
import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductsById,
    updateProduct
} from "../controllers/products.controller";
import {IDbType} from "../types/db";


export const getProductsRouter = (db: IDbType) => {

    const router = express.Router()

// GET
    router.get('/', (req, res) =>  getProducts(req, res, db))
    router.get('/:id', (req, res) =>  getProductsById(req, res, db))

// POST
    router.post('/', (req, res) =>  createProduct(req, res, db))

// PUT
    router.put('/:id', (req, res) =>  updateProduct(req, res, db))

// DELETE
    router.delete('/:id', (req, res) =>  deleteProduct(req, res, db))

    return router
}
