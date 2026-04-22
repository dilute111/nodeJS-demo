import app from "./app";
import {NextFunction, type Request, type Response} from "express";


const port = process.env.PORT || 3000




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})