import request from "supertest";
import * as productService from "../src/services/products.service";


beforeAll(async () => {
    productService.clearAllProducts()
})

beforeEach(async () => {
    productService.clearAllProducts()
})

// Очистка после каждого теста
afterEach(async () => {
    productService.clearAllProducts()
})

// Очистка после всех тестов
afterAll(async () => {
    productService.clearAllProducts()
})