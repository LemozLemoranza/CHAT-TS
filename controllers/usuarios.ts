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


    // export const getUsuarios = async(req: Request, res: Response) => {
        
    //     const usuarios = await Usuario.findAll();
    
    //     res.json({ usuarios })
    
    // }
    
    
    // export const getUsuario = async(req: Request, res: Response) => {
        
    //     const {id} = req.params;
    //     const usuario = await Usuario.findByPk( id );
    //     if(usuario){
    //         res.json({ usuario })
    //     }else{
    //         res.status(404).json(`No existe el usuario con id ${id}`)
    //     }
    
    // }
    
    // export const postUsuario = async(req: Request, res: Response) => {
    
    //     const {body} = req;
    
    //     try{
    
    //         const existeEmail = await Usuario.findOne({
    //             where:{
    //                 email: body.email
    //             }
    //         });
    
    //         if(existeEmail){
    //             return res.status(400).json({
    //                 msg: `El email ${body.email} ya existe`
    //             })
    
    //         }else{
    //             const usuario = await Usuario.create(body);
    //             res.json({usuario})
    //         }
    
    //     }catch(err){
    
    //         console.log(err)
    //         res.status(500).json({
    //             msg: 'Hable con el administrador'
    //         })
    
    //     }
    
    //     res.json({
    //         msg: 'postUsaurios',
    //         body
    //     })
    
    // }
    
    // export const putUsuario = async(req: Request, res: Response) => {
    
    //     const {id} = req.params
    //     const {...data} = req.body;
    //     try{
    //         const usuario = await Usuario.findByPk(id);
     
    //         if(!usuario){
    //             return res.status(400).json({
    //                 msg:`No existe un usuario con el id ${id}`
    //             });
    
    //         }else{
    
    //             const user  =  await Usuario.update(data, {where: {id: id}});
    //             res.status(201).json({
    //                 user
    //             });
    //         }
            
    //     }catch(error)
    //     {
    //         console.log(error);
    //         res.status(500).json({
    //             msg:'Hable con el admin'
    //         });
    //     }
    
    // }
    
    // export const deleteUsuario = async(req: Request, res: Response) => {
    
    //     const {id} = req.params
    //     const usuario = await Usuario.findByPk(id);
     
    //     if(!usuario){
    //         return res.status(400).json({
    //             msg:`No existe un usuario con el id ${id}`
    //         });
    //     }
    //     else{
    //         await usuario.update({ estado: false }) 
    //     }
    // }