import {IDbType} from "../types/db";
import {Router} from "express";
import {getAddressById, getAddresses} from "../controllers/clients-addresses.controller";


export const getAddressesRouter = (db: IDbType) => {
    const router = Router()

    // GET
    router.get("/", (req, res) => getAddresses(req, res, db))
    router.get("/:id", (req, res) => getAddressById(req, res, db))

    return router
}