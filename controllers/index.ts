import { Request, Response } from "express"

export const Index = (req:Request, res:Response) => {
    res.render('index')
}