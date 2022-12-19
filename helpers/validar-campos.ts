import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"

export const ValidarCampos = (req:Request, res:Response, next:NextFunction) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const valores = req.body;
        const validaciones = errors.array();
        return res.status(400).send({ validaciones })

    }else{
        return next()
    }
}