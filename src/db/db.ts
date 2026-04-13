import {IDbType} from "../types/db";


export const db: IDbType = {
    products: [
        {id: 1, title: "tomato", productCount: 7},
        {id: 2, title: "orange", productCount: 10},
    ],
    addresses: [
        {id: 1, userName: "Dimych", value: "Nezalejnasti 12"},
        {id: 2, userName: "Andrew", value:  "Selickaga 11"},
    ],
}