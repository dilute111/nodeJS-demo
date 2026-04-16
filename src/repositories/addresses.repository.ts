import {IDbType} from "../types/db";


export const addressesRepository = (db: IDbType) => ({
    findAllAddresses: () =>  db.addresses,
    findAddress: (id: number) => db.addresses.find(a => a.id === +id)

})