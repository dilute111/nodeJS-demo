import {IDbType} from "../types/db";
import {Router} from "express";
import {getAddressById, getAddresses} from "../controllers/clients-addresses.controller";
import {createAddressesService} from "../services/clients-addresses.service";


export const getAddressesRouter = (db: IDbType) => {
    const router = Router()
    const addressesService = createAddressesService(db)

    // GET
    router.get("/", (req, res) => getAddresses(req, res, addressesService))
    router.get("/:id", (req, res) => getAddressById(req, res, addressesService))

    return router
}