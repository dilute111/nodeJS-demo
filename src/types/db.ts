export interface IProduct {
    id: number
    title: string
    productCount: number
}

export interface IDbType {
    products: IProduct[]
}