import request from "supertest";
import {app} from "../src";

beforeAll(async () => {
    await request(app).delete("/__test__/data")
})

beforeEach(async () => {  // 👈 ДОБАВЬ ЭТО
    await request(app).delete("/__test__/data")
})

// Очистка после каждого теста
afterEach(async () => {
    await request(app).delete("/__test__/data")
})

// Очистка после всех тестов
afterAll(async () => {
    await request(app).delete("/__test__/data")
})