import { Request, Response } from "express";
import {LocalStorage} from 'node-localstorage'
const localStorage = new LocalStorage('./scratch')
import {GoogleVerify} from '../helpers/google-verify'
import Usuario from "../models/usuario";
import { generarJWT } from '../helpers/jwt';

export const Auth = (req:Request, res:Response) => {
    res.render('auth/')
}
export const Close = (req:Request, res:Response) => {
    localStorage.clear()
    res.redirect('login')
}

export const GoogleSignIn = async(req:Request, res:Response) => {
    const {id_token} = req.body;

    try{

        const {nombre, email} = await GoogleVerify(id_token)

        let usuario: any  = await Usuario.findOne({
            where:{ email }
        });

        if(!usuario){

            const password = 'NOP',
            usuario = await Usuario.create({nombre, email, password}); 

        }
    

            const userExist:any = await Usuario.findOne({
                where:{ email }
            });

            const token = await generarJWT( userExist.id )

            localStorage.setItem('token', token)
            
            res.redirect('register') 

    

      

    }catch(error){
        res.status(400).json({error})

    }
}