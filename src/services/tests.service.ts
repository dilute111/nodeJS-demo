import {db} from "../db/db";

export const clearAllProducts = () => {
    db.products.splice(0, db.products.length)
}