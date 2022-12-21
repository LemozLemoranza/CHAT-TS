import { Request, Response } from "express";
import {LocalStorage} from 'node-localstorage'
const localStorage = new LocalStorage('./scratch')
import {GoogleVerify} from '../helpers/google-verify'
import Usuario from "../models/usuario";
import { generarJWT } from '../helpers/jwt';

export const Auth = (req:Request, res:Response) => {
    const usuario = req.cookies.usuario
    res.render('auth', {usuario})
}
export const Close = (req:Request, res:Response) => {
    localStorage.clear()
    res.redirect('/usuarios/login')
}

