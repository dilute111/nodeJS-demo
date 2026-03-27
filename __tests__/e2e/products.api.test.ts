import request from "supertest"
import {app} from "../../src";

describe("/products",  () => {
    let createdProduct: any = null

    beforeAll(async () => {
        await request(app).delete("/__test__/data")
    })

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
    it("Should'nt create product with incorrect input data", async () => {
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

        createdProduct = createResponse.body

        expect(createdProduct).toEqual({
            id: expect.any(Number),
            title: "new product"
        })

        await request(app)
            .get("/products")
            .expect(200, [createdProduct])
    })
    // Check for correct work of updating data
    it("Should'nt update product with incorrect input data", async () => {
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

        await request(app).delete("/__test__/data")
    })
})