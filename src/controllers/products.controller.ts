import type {RequestBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "../types";
import type {QueryProductsModel} from "../models/QueryProductsModel";
import type {Response} from "express";
import type {ProductViewModel} from "../models/ProductViewModel";
import * as productService from "../services/products.service";
import type {URIParamsProductIdModel} from "../models/URIParamsProductIdModel";
import type {CreateProductModel} from "../models/CreateProductModel";
import type {UpdateProductModel} from "../models/UpdateProductModel";
import {IDbType, IProduct} from "../types/db";


const getProductsViewModel = (newProduct: IProduct): ProductViewModel => {
    return {
        id: newProduct.id,
        title: newProduct.title,
    }
}

export const getProducts = (req: RequestWithQuery<QueryProductsModel>,
                            res: Response<ProductViewModel[]>, db: IDbType) => {
    const {title} = req.query
    let filteredProducts = productService.getAllProducts(title, db)

    res.json(filteredProducts.map(getProductsViewModel))
}

export const getProductsById = (req: RequestWithParams<URIParamsProductIdModel>,
                                res: Response<ProductViewModel>, db: IDbType) => {
    const {id} = req.params
    if (!id) {
        res.sendStatus(400)
        return
    }
    const queryProduct = productService.getProductById(id, db)
    if (!queryProduct) {
        res.sendStatus(404)
        return
    }
    res.json(getProductsViewModel(queryProduct))
}

export const createProduct = (req: RequestBody<CreateProductModel>,
                              res: Response<ProductViewModel>, db: IDbType) => {
    const {title} = req.body
    if (!title) {
        res.sendStatus(400)
        return
    }
    const newProduct: IProduct = productService.createProduct(title, db)
    res.status(201).json(getProductsViewModel(newProduct))
}

export const updateProduct = (req: RequestWithParamsAndBody<URIParamsProductIdModel, UpdateProductModel>,
                              res: Response<ProductViewModel | {error: string}>, db: IDbType) => {
    const {id} = req.params
    const {title} = req.body
    if (!id || !title) {
        res.sendStatus(400)
        return
    }
    const updateProduct = productService.updateProduct(id, title, db)
    if (!updateProduct) {
        res.sendStatus(404)
        return
    }
    res.status(200).json(updateProduct)
}

export const deleteProduct = (req: RequestWithParams<URIParamsProductIdModel>, res: Response, db: IDbType) => {
    const {id} = req.params
    if (!id) {
        res.sendStatus(400)
        return
    }
    const deleted = productService.deleteProduct(id, db)
    if (!deleted) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
}

