import express from "express";
import { Request, Response } from "express";
import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductById,
    updateProduct
} from "../controllers/products.controller";
import {IDbType} from "../types/db";
import {createProductsService} from "../services/products.service";
import {validateCreateProduct, validateProductId} from "../validators/products.validator";


export const getProductsRouter = (db: IDbType) => {

    const router = express.Router()
    const productsService = createProductsService(db)

// GET
    router.get('/', (req, res) =>  getProducts(req, res, productsService))
    router.get('/:id', validateProductId, (req: Request, res: Response) =>  getProductById(req as any, res, productsService))

// POST
    router.post('/', validateCreateProduct, (req: Request, res: Response) =>  createProduct(req, res, productsService))

// PUT
    router.put('/:id', (req, res) =>  updateProduct(req, res, productsService))

// DELETE
    router.delete('/:id', (req, res) =>  deleteProduct(req, res, productsService))

    return router
}
