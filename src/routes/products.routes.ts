import {Router} from "express";
import {
    clearTestData,
    createProduct,
    deleteProduct,
    getProducts,
    getProductsById,
    updateProduct
} from "../controllers/products.controller";


const router = Router()

// GET
router.get('/', getProducts)
router.get('/:id', getProductsById)
// POST
router.post('/', createProduct)
// PUT
router.put('/:id', updateProduct)
// DELETE
router.delete('/:id', deleteProduct)
router.delete("/__test__/data", clearTestData)

export default router