import {IDbType} from "../types/db";

export const clearAllProducts = (db: IDbType) => {
    db.products.splice(0, db.products.length)
}