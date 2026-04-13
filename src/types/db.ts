export interface IProduct {
    id: number
    title: string
    productCount: number
}
export interface IAddress {
    id: number
    userName: string
    value: string
}

export interface IDbType {
    products: IProduct[]
    addresses: IAddress[]
}