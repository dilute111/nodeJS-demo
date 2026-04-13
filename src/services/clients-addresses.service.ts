import {IDbType} from "../types/db";


export const getAllAddresses = (db: IDbType) => {
    return db.addresses
}
export const getAddressById = (id: string, db: IDbType) => {
    return db.addresses.find(a => a.id === +id)
}