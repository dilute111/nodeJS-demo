import {IDbType} from "../types/db";
import {addressesRepository} from "../repositories/addresses.repository";


export const createAddressesService = (db: IDbType) => {
    const repo = addressesRepository(db)

    return {
        getAllAddresses: () => {
            return repo.findAllAddresses()
        },
        getAddressById: (id: string) => {
            return repo.findAddress(+id)
        },
    }
}