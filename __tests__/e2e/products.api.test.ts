import request from "supertest"
import {app} from "../../src";
import type {CreateProductModel} from "../../src/models/CreateProductModel";
import type {UpdateProductModel} from "../../src/models/UpdateProductModel";

describe("/products",  () => {
    let createdProduct1: any = null

    // Check for correct work of getting data
    it("should return 200 and empty array", async () => {
        await request(app)
            .get("/products")
            .expect(200, [])
    })
    it("should return 404 for not existed product", async () => {
        await request(app)
            .get("/products/1")
            .expect(404)
    })
    // Check for correct work of posting data
    it("Shouldn't create product with incorrect input data", async () => {
        let data: CreateProductModel = { title: ""};
        await request(app)
            .post("/products")
            .send(data)
            .expect(400)

        await request(app)
            .get("/products")
            .expect(200, [])
    })
    it("Should create product with correct input data", async () => {
        let data: CreateProductModel = { title: "new product"};

        const createResponse = await request(app)
            .post("/products")
            .send(data)
            .expect(201)

        createdProduct1 = createResponse.body

        expect(createdProduct1).toEqual({
            id: expect.any(Number),
            title: "new product"
        })

        await request(app)
            .get("/products")
            .expect(200, [createdProduct1])
    })
    let createdProduct2: any = null
    it("create one more product", async () => {
        let data1: CreateProductModel = { title: "good new title 1"};
        let data2: CreateProductModel = { title: "good new title 2"};

        const createResponse1 = await request(app)
            .post("/products")
            .send(data1)
            .expect(201)
        const product1 = createResponse1.body

        const createResponse2 = await request(app)
            .post("/products")
            .send(data2)
            .expect(201)

        createdProduct2 = createResponse2.body

        expect(createdProduct2).toEqual({
            id: expect.any(Number),
            title: data2.title,
        })

        await request(app)
            .get(`/products`)
            .expect(200, [product1, createdProduct2])
    })
    // Check for correct work of updating data
    it("Shouldn't update product with incorrect input data", async () => {
        let data1: UpdateProductModel = { title: "test product"};
        let data2: UpdateProductModel = { title: ""};

        const createResponse = await request(app)
            .post("/products")
            .send(data1)
            .expect(201)

        const productToUpdate = createResponse.body

        await request(app)
            .put(`/products/${productToUpdate.id}`)
            .send(data2)
            .expect(400)

        await request(app)
            .get(`/products/${productToUpdate.id}`)
            .expect(200, productToUpdate)
    })
    it("Shouldn't update product that's not exist", async () => {
        let data: UpdateProductModel = { title: "good title"};

        await request(app)
            .put(`/products/${-100}`)
            .send(data)
            .expect(404)
    })
    it("Should update product with correct input data", async () => {
        let data: UpdateProductModel = { title: "good new title"};

        const createResponse = await request(app)
            .post("/products")
            .send(data)
            .expect(201)

        const productToUpdate = createResponse.body

        await request(app)
            .put(`/products/${productToUpdate.id}`)
            .send(data)
            .expect(200)

        await request(app)
            .get(`/products/${productToUpdate.id}`)
            .expect(200, {
                ...productToUpdate,
                title: "good new title"
            })
    })
    // Check for correct work of deleting data
    it("should delete both products", async () => {
        let data1: CreateProductModel = { title: "deletable product 1"};
        let data2: CreateProductModel = { title: "deletable product 2"};

        const createResponse1 = await request(app)
            .post("/products")
            .send(data1)
            .expect(201)
        const product1 = createResponse1.body
        await request (app)
            .get(`/products/${product1.id}`)
            .expect(200, product1)
        await request(app)
            .delete(`/products/${product1.id}`)
            .expect(204)

        const createResponse2 = await request(app)
            .post("/products")
            .send(data2)
            .expect(201)
        createdProduct2 = createResponse2.body
        await request (app)
            .get(`/products/${createdProduct2.id}`)
            .expect(200, createdProduct2)
        await request(app)
            .delete(`/products/${createdProduct2.id}`)
            .expect(204)

        await request(app)
            .get(`/products/${product1.id}`)
            .expect(404)

        await request(app)
            .get(`/products/${createdProduct2.id}`)
            .expect(404)

        await request(app)
            .get(`/products`)
            .expect(200, [])
    })

})