import request from "supertest"
import {app} from "../../src";

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
        await request(app)
            .post("/products")
            .send({ title: ""})
            .expect(400)

        await request(app)
            .get("/products")
            .expect(200, [])
    })
    it("Should create product with correct input data", async () => {
        const createResponse = await request(app)
            .post("/products")
            .send({ title: "new product"})
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
    // Check for correct work of updating data
    it("Shouldn't update product with incorrect input data", async () => {
        const createResponse = await request(app)
            .post("/products")
            .send({ title: "test product" })
            .expect(201)

        const productToUpdate = createResponse.body

        await request(app)
            .put(`/products/${productToUpdate.id}`)
            .send({ title: ""})
            .expect(400)

        await request(app)
            .get(`/products/${productToUpdate.id}`)
            .expect(200, productToUpdate)
    })
    it("Shouldn't update product that's not exist", async () => {
        await request(app)
            .put(`/products/${-100}`)
            .send({ title: "good title"})
            .expect(404)
    })
    it("Should update product with correct input data", async () => {
        const createResponse = await request(app)
            .post("/products")
            .send({ title: "good new title" })
            .expect(201)

        const productToUpdate = createResponse.body

        await request(app)
            .put(`/products/${productToUpdate.id}`)
            .send({ title: "good new title"})
            .expect(200)

        await request(app)
            .get(`/products/${productToUpdate.id}`)
            .expect(200, {
                ...productToUpdate,
                title: "good new title"
            })
    })
    let createdProduct2: any = null
    it("let one more product", async () => {
        const createResponse1 = await request(app)
            .post("/products")
            .send({ title: "good new title 1" })
            .expect(201)
        const product1 = createResponse1.body

        const createResponse2 = await request(app)
            .post("/products")
            .send({ title: "good new title 2" })
            .expect(201)

        createdProduct2 = createResponse2.body

        expect(createdProduct2).toEqual({
            id: expect.any(Number),
            title: "good new title 2",
        })

        await request(app)
            .get(`/products`)
            .expect(200, [product1, createdProduct2])
    })
    // Check for correct work of deleting data
    it("should delete both products", async () => {
        const createResponse1 = await request(app)
            .post("/products")
            .send({ title: "deletable product 1" })
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
            .send({ title: "deletable product 2" })
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