import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcryptjs from 'bcryptjs'
import {LocalStorage} from 'node-localstorage'
const localStorage = new LocalStorage('./scratch')
import { generarJWT } from '../helpers/jwt';
import { validationResult } from 'express-validator';


export const GetRegister = async(req : Request, res : Response) => {
    res.render('usuarios/register')
}

export const PostRegister = async(req : Request, res : Response) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const valores = req.body;
        const validaciones = errors.array();
        return res.render('usuarios/register',{ validaciones, valores })

    }else{
        
        const lowerName = req.body.nombre;
        const lowerEmail = req.body.email; 
        const lowerPassword = req.body.password; 
        
        const nombre = lowerName.toUpperCase()
        const email = lowerEmail.toUpperCase()

        const salt = bcryptjs.genSaltSync();
        const password = bcryptjs.hashSync(lowerPassword, salt)
        
        const usuario = await Usuario.create({nombre, email, password});

        
        return res.render('usuarios/register',{ nombre })
}

}

export const GetLogin = async(req : Request, res : Response) => {
    res.render('usuarios/login')
}

export const PostLogin = async(req:Request, res:Response) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const valores = req.body;
        const validaciones = errors.array();
        return res.render('usuarios/login',{ validaciones, valores })
    
    }else{


    const emailLower = req.body.email;
    const email = emailLower.toUpperCase();
    const password = req.body.password;

    const userExist:any = await Usuario.findOne({
        where:{ email }
    });
    
    const token = await generarJWT(userExist.id)

    localStorage.setItem('token', token)

    res.cookie('usuario', userExist.nombre)

    res.redirect('/auth')
               
    }
    

}

