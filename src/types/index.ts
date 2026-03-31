import {type Request} from "express"

export type RequestBody<T> = Request<{}, {}, T>
export type RequestWithQuery<T> = Request<{}, {}, {}, T>
export type RequestWithParams<T> = Request<T>
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>

export interface IProduct {
    id: number
    title: string
    productCount: number
}
export interface IAddress {
    id: number
    value: string
}