import type {RequestWithParams, RequestWithQuery} from "../types";
import {QueryAddressesModel} from "../models/addressesModel/QueryAddressesModel";
import {IAddress} from "../types/db";
import type {Response} from "express";
import {AddressViewModel} from "../models/addressesModel/AddressViewModel";
import {URIParamsAddressIdModel} from "../models/addressesModel/URIParamsAddressIdModel";
import HttpStatus from "../constants/http-status";

const getAddressesViewModel = (address: IAddress) => {
    return {
        id: address.id,
        userName: address.userName,
        value: address.value,
    }
}

export const getAddresses = (req: RequestWithQuery<QueryAddressesModel>,
                             res: Response<AddressViewModel[]>, addressService: any) => {
    const addresses = addressService.getAllAddresses()
    res.json(addresses.map(getAddressesViewModel))
}

export const getAddressById = (req: RequestWithParams<URIParamsAddressIdModel>,
                               res: Response<AddressViewModel>, addressService: any) => {
    const {id} = req.params

    if (!id) {
        res.sendStatus(HttpStatus.BAD_REQUEST)
        return
    }
    const address = addressService.getAddressById(id)
    if (!address) {
        res.sendStatus(HttpStatus.NOT_FOUND)
        return
    }
    res.json(getAddressesViewModel(address))
}