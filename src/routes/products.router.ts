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
import {
    validateCreateProduct,
    validateGetProducts,
    validateProductId,
    validateUpdateProduct
} from "../validators/products.validator";


export const getProductsRouter = (db: IDbType) => {

    const router = express.Router()
    const productsService = createProductsService(db)

// GET
    router.get('/', validateGetProducts, (req: Request, res: Response) =>  getProducts(req, res, productsService))
    router.get('/:id', validateProductId, (req: Request, res: Response) =>  getProductById(req as any, res, productsService))

// POST
    router.post('/', validateCreateProduct, (req: Request, res: Response) =>  createProduct(req, res, productsService))

// PUT
    router.put('/:id', validateUpdateProduct, (req: Request, res: Response) =>  updateProduct(req as any, res, productsService))

// DELETE
    router.delete('/:id', validateProductId, (req: Request, res: Response) =>  deleteProduct(req as any, res, productsService))

    return router
}
