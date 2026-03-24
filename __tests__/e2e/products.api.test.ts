import request from "supertest"
import {app} from "../../src";

describe("/products",  () => {
    beforeAll(async () => {
        await request(app).delete("/__test__/data")
    })

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
})